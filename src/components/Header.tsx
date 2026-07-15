"use client";

import React from 'react';
import { SignInButton, UserButton, useAuth } from "@clerk/nextjs";

interface HeaderProps {
  brand?: string;
  subtitle?: string;
  onAlertClick?: () => void;
  unreadAlertCount?: number;
}

export default function Header({ brand = 'GeoStockLive', subtitle, onAlertClick, unreadAlertCount = 0 }: HeaderProps) {
  const { isLoaded, userId } = useAuth();

  return (
    <header className="dash-header">
      <div className="flex items-center gap-3">
        <div className="w-6 h-6 rounded-sm bg-gold-primary/10 border border-gold-primary/30 flex items-center justify-center">
          <span className="font-space font-bold text-xs text-gold-primary">G</span>
        </div>
        <div className="text-text-primary font-display font-medium tracking-tight text-xl flex items-center">GEO<span className="text-gold-primary px-0.5">°</span>STOCK <span className="text-text-muted mx-2">/</span> LIVE</div>
        {subtitle && <>
          <div className="w-px h-4 bg-text-muted opacity-25 ml-2" />
          <span className="font-mono text-[10px] text-text-muted tracking-[0.15em] uppercase">{subtitle}</span>
        </>}
      </div>

      <div className="flex items-center gap-8">
        {/* Stats hidden until live connection */}
      </div>

      <div className="flex items-center gap-4">
        {/* Bell */}
        <button 
          onClick={onAlertClick}
          className={`relative w-8 h-8 flex items-center justify-center transition-colors ${unreadAlertCount > 0 ? 'text-tactical' : 'text-text-muted hover:text-gold-primary'}`}
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
        
        {/* Auth Section */}
        <div className="flex items-center gap-2.5">
          {!isLoaded ? (
            <div className="w-8 h-8 animate-pulse bg-surface-high rounded-sm" />
          ) : !userId ? (
            <div className="px-3 py-1.5 border border-gold-primary/30 bg-gold-primary/5 hover:bg-gold-primary/10 transition-colors cursor-pointer">
              <SignInButton mode="modal">
                <div className="px-3 py-1.5 border border-gold-primary/30 bg-gold-primary/5 hover:bg-gold-primary/10 transition-colors cursor-pointer">
                  <span className="text-[10px] font-space font-bold text-gold-primary uppercase tracking-wider">Authorize System</span>
                </div>
              </SignInButton>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <div className="text-right hidden sm:block">
                <div className="text-[9px] font-mono text-text-sub uppercase tracking-widest">Operator</div>
                <div className="text-xs font-semibold text-text-base">ACTIVE_SESSION</div>
              </div>
              <div className="w-8 h-8 flex items-center justify-center">
                <UserButton appearance={{
                  elements: {
                    userButtonAvatarBox: "w-8 h-8 rounded-sm border border-gold-primary/30"
                  }
                }} />
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
