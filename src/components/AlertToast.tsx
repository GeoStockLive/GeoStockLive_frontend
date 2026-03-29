'use client';

import React, { useState, useEffect } from 'react';
import { Alert } from '@/hooks/useWebSocket';

export default function AlertToast() {
  const [activeAlert, setActiveAlert] = useState<Alert | null>(null);

  useEffect(() => {
    const handleNewAlert = (e: any) => {
      setActiveAlert(e.detail);
      
      // Auto-dismiss after 5 seconds as per PDF Page 123
      const timer = setTimeout(() => {
        setActiveAlert(null);
      }, 5000);
      
      return () => clearTimeout(timer);
    };

    window.addEventListener('gt-alert', handleNewAlert);
    return () => window.removeEventListener('gt-alert', handleNewAlert);
  }, []);

  if (!activeAlert) return null;

  const colorStyle = activeAlert.risk === 'HIGH' ? 'border-tactical text-tactical bg-tactical/10' : 'border-cyan text-cyan bg-obsidian/90';

  return (
    <div className={`fixed top-6 right-6 z-[100] w-80 animate-slide-in-right`}>
      <div className={`p-4 border-l-4 rounded shadow-2xl backdrop-blur-md ${colorStyle} border border-white/10`}>
        <div className="flex justify-between items-start mb-2">
          <span className="text-[10px] font-mono font-bold uppercase tracking-widest flex items-center gap-2">
            <span className={`w-1.5 h-1.5 rounded-full ${activeAlert.risk === 'HIGH' ? 'bg-tactical animate-pulse' : 'bg-cyan'}`} />
            {activeAlert.title}
          </span>
          <button onClick={() => setActiveAlert(null)} className="opacity-40 hover:opacity-100">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M18 6L6 18M6 6l12 12"/></svg>
          </button>
        </div>
        <p className="text-[11px] leading-relaxed mb-3 text-text-base">
          {activeAlert.message}
        </p>
        <div className="flex justify-between items-center">
          <span className="text-[8px] font-mono opacity-50 uppercase">{new Date(activeAlert.timestamp).toLocaleTimeString()}</span>
          <button className="text-[9px] font-mono font-bold uppercase hover:underline">Details →</button>
        </div>
      </div>
    </div>
  );
}
