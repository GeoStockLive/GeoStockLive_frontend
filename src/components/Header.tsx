import React from 'react';

interface HeaderProps {
  brand?: string;
  subtitle?: string;
  onAlertClick?: () => void;
  unreadAlertCount?: number;
}

export default function Header({ brand = 'ADER', subtitle, onAlertClick, unreadAlertCount = 0 }: HeaderProps) {
  return (
    <header className="dash-header">
      <div className="flex items-center gap-4">
        <span className="font-space font-bold text-lg tracking-tighter text-text-base">{brand}</span>
        {subtitle && <>
          <div className="w-px h-4 bg-text-muted opacity-25" />
          <span className="font-mono text-[10px] text-text-muted tracking-[0.15em] uppercase">{subtitle}</span>
        </>}
      </div>

      <div className="flex items-center gap-8">
        <div className="flex items-center gap-2.5">
          <span className="text-[10px] font-mono text-text-sub uppercase tracking-wider">Tension Index</span>
          <span className="font-space font-bold text-sm text-cyan">68.4</span>
          <div className="w-1.5 h-1.5 rounded-full bg-cyan animate-signal" />
        </div>
        <div className="flex items-center gap-2.5">
          <span className="text-[10px] font-mono text-text-sub uppercase tracking-wider">XAU/USD</span>
          <span className="font-space font-bold text-sm text-neon">+1.2%</span>
        </div>
      </div>

      <div className="flex items-center gap-4">
        {/* Bell */}
        <button 
          onClick={onAlertClick}
          className={`relative w-8 h-8 flex items-center justify-center transition-colors ${unreadAlertCount > 0 ? 'text-tactical' : 'text-text-muted hover:text-cyan'}`}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
            <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
          </svg>
          {unreadAlertCount > 0 && (
            <span className="absolute -top-0.5 -right-0.5 min-w-[12px] h-3 px-1 rounded-full bg-tactical text-[7px] font-bold text-white flex items-center justify-center animate-signal">
              {unreadAlertCount}
            </span>
          )}
        </button>
        {/* User */}
        <div className="flex items-center gap-2.5">
          <div className="text-right">
            <div className="text-[9px] font-mono text-text-sub uppercase tracking-widest">Operator</div>
            <div className="text-xs font-semibold text-text-base">ROOT_ADMIN</div>
          </div>
          <div className="w-8 h-8 rounded-sm bg-surface-high relative overflow-hidden">
            <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(143,245,255,0.15), transparent)' }} />
          </div>
        </div>
      </div>
    </header>
  );
}
