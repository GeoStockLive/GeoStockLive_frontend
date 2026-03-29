'use client';

import React from 'react';
import { Alert } from '@/hooks/useWebSocket';

interface AlertPanelProps {
  alerts: Alert[];
  isOpen: boolean;
  onClose: () => void;
}

export default function AlertPanel({ alerts, isOpen, onClose }: AlertPanelProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-y-0 right-0 w-80 bg-surface-low border-l border-surface-high z-[90] shadow-2xl flex flex-col animate-slide-in-right">
      <div className="p-4 border-b border-surface-high flex justify-between items-center bg-obsidian">
        <div>
          <h3 className="font-space font-bold uppercase text-xs tracking-widest text-cyan">Intelligence Log</h3>
          <span className="text-[8px] font-mono text-text-muted mt-0.5 block uppercase tracking-tighter">Live Session Feed</span>
        </div>
        <button onClick={onClose} className="p-1 hover:bg-surface-high rounded transition-colors text-text-muted">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6L6 18M6 6l12 12"/></svg>
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-3 scrollbar-thin">
        {alerts.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 opacity-20">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1"><path d="M22 17H2a3 3 0 0 0 3-3V9a7 7 0 0 1 14 0v5a3 3 0 0 0 3 3zM13.73 21a2 2 0 0 1-3.46 0"/></svg>
            <span className="text-[10px] mt-4 font-mono uppercase tracking-[0.2em]">Silence across sectors</span>
          </div>
        ) : (
          alerts.map((alert) => (
            <div key={alert.id} className={`p-3 border-l-2 rounded-sm bg-surface-high/50 transition-all hover:bg-surface-high ${alert.risk === 'HIGH' ? 'border-tactical shadow-[inset_4px_0_10px_-4px_#ff716c33]' : 'border-cyan'}`}>
              <div className="flex justify-between items-start mb-1">
                <span className={`text-[10px] font-space font-bold tracking-tight ${alert.risk === 'HIGH' ? 'text-tactical' : 'text-cyan'}`}>
                  {alert.title}
                </span>
                <span className="text-[8px] font-mono text-text-muted">{new Date(alert.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
              </div>
              <p className="text-[10px] text-text-sub leading-snug mb-2 line-clamp-3">
                {alert.message}
              </p>
              {alert.signals && alert.signals.length > 0 && (
                <div className="flex flex-wrap gap-1">
                  {alert.signals.map(s => (
                    <span key={s} className="px-1.5 py-0.5 rounded-[1px] bg-obsidian text-[8px] font-mono text-neon border border-neon/30">
                      {s}
                    </span>
                  ))}
                </div>
              )}
            </div>
          ))
        )}
      </div>

      <div className="p-4 bg-obsidian border-t border-surface-high">
        <button className="w-full py-2 bg-surface-high hover:bg-white/5 border border-white/5 text-[9px] font-mono uppercase tracking-[0.1em] text-text-muted transition-colors">
          Export Intelligence Log (PDF)
        </button>
      </div>
    </div>
  );
}
