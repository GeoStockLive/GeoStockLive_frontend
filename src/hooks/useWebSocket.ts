import { useEffect, useState, useCallback, useRef } from 'react';

export interface Alert {
  id: string;
  title: string;
  message: string;
  risk: 'HIGH' | 'MEDIUM' | 'LOW';
  timestamp: string;
  signals?: string[];
}

export interface WebSocketMessage {
  type: 'alert' | 'signal' | 'risk_update';
  data: any;
}

export function useWebSocket() {
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [isConnected, setIsConnected] = useState(false);
  
  const wsBase = process.env.NEXT_PUBLIC_WS_URL || 'ws://localhost:8000';
  const url = `${wsBase}/live-updates`;
  
  const reconnectAttempts = useRef(0);
  const isIntentionalClose = useRef(false);

  const addAlert = useCallback((alert: Alert) => {
    setAlerts((prev) => [alert, ...prev].slice(0, 50)); // Keep last 50
  }, []);

  useEffect(() => {
    let socket: WebSocket | null = null;
    let reconnectTimeout: NodeJS.Timeout;

    const connect = () => {
      if (isIntentionalClose.current) return;

      console.log(`[WS] Attempting connection to: ${url}`);
      try {
        socket = new WebSocket(url);

        socket.onopen = () => {
          console.log('[WS] Connection established successfully');
          setIsConnected(true);
          reconnectAttempts.current = 0;
        };

        socket.onmessage = (event) => {
          try {
            const message: WebSocketMessage = JSON.parse(event.data);
            if (message.type === 'alert') {
              const newAlert: Alert = {
                id: Math.random().toString(36).substr(2, 9),
                title: message.data.title || 'Geopolitical Alert',
                message: message.data.message,
                risk: message.data.risk || 'MEDIUM',
                timestamp: message.data.timestamp || new Date().toISOString(),
                signals: message.data.signals,
              };
              addAlert(newAlert);
              window.dispatchEvent(new CustomEvent('gt-alert', { detail: newAlert }));
            } else if (message.type === 'risk_update') {
              // Dispatch risk_update event
              window.dispatchEvent(new CustomEvent('gt-risk-update', { detail: message.data }));
            } else if (message.type === 'live_signal') {
              // Dispatch live_signal event
              window.dispatchEvent(new CustomEvent('gt-live-signal', { detail: message.data }));
            }
          } catch (err) {
            console.error('[WS] Failed to parse message:', err);
          }
        };

        socket.onclose = (event) => {
          setIsConnected(false);
          if (!isIntentionalClose.current) {
            const delay = Math.min(1000 * Math.pow(2, reconnectAttempts.current), 30000);
            console.warn(`[WS] Connection closed (Code: ${event.code}, Reason: ${event.reason || 'None'}). Retrying in ${delay}ms...`);
            reconnectTimeout = setTimeout(connect, delay);
            reconnectAttempts.current += 1;
          }
        };

        socket.onerror = (err) => {
          console.error('[WS] Protocol/Handshake error:', err);
        };
      } catch (err) {
        console.error('[WS] Setup exception:', err);
      }
    };

    // Small delay to ensure hydration/env-vars are stable
    const timer = setTimeout(connect, 500);

    return () => {
      isIntentionalClose.current = true;
      clearTimeout(timer);
      if (socket) socket.close();
      clearTimeout(reconnectTimeout);
    };
  }, [url, addAlert]);

  return { alerts, isConnected };
}
