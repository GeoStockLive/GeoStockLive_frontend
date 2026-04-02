'use client';
import React, { useState, useEffect } from 'react';
import { getRiskColor, getRiskLevel } from '../utils/risk-logic';

interface BackendEvent {
  id: string;
  event_type: string;
  title: string;
  content: string;
  sentiment_score: number;
  source_count: number;
  assets: string[];
  timestamp: string;
}

interface CountryIntel {
  country: string;
  risk: {
    risk_score: number;
    last_updated?: string;
  };
  events: BackendEvent[];
}

interface IntelligencePanelProps {
  selectedCountry?: string | null;
}

const IntelligencePanel = ({ selectedCountry }: IntelligencePanelProps) => {
  const [intel, setIntel] = useState<CountryIntel | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!selectedCountry) {
      setIntel(null);
      return;
    }

    const fetchIntel = async () => {
      setLoading(true);
      try {
        const apiBase = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
        const res = await fetch(`${apiBase}/risk/country/${encodeURIComponent(selectedCountry)}`);
        const data = await res.json();
        setIntel(data);
      } catch (err) {
        console.error('[INTEL] Failed to fetch country data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchIntel();
  }, [selectedCountry]);

  if (!selectedCountry) {
    return (
      <div className="w-80 h-full bg-surface-low border-l border-surface-high flex flex-col items-center justify-center p-8 text-center opacity-40">
        <div className="w-12 h-12 border border-cyan/20 rounded-full flex items-center justify-center mb-4">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/></svg>
        </div>
        <div className="font-space font-bold text-xs uppercase tracking-widest text-cyan mb-2 text-glow-cyan">Global Sentinel Standby</div>
        <p className="text-[10px] font-mono leading-relaxed uppercase">Select a deployment zone on the globe to initiate intelligence uplink</p>
      </div>
    );
  }

  const score = intel?.risk?.risk_score || 0.5;
  const color = getRiskColor(score);
  const level = getRiskLevel(score);

  return (
    <div className="w-80 h-full bg-surface-low border-l border-surface-high flex flex-shrink-0 flex-col overflow-y-auto scrollbar-thin p-5 gap-6 animate-slide-in-right">
      {/* Header */}
      <div>
        <div className="section-label">Intelligence Uplink: v4.2</div>
        <h2 className="section-title text-glow-cyan text-lg leading-tight mb-1 uppercase font-space font-bold text-text-base">
          {selectedCountry}
        </h2>
        <div className="text-[9px] text-text-muted font-mono uppercase tracking-tighter animate-pulse">
          {loading ? 'Decrypting Secure Feed...' : 'Live Monitoring Active'}
        </div>
      </div>

      {/* Risk Metrics */}
      <div className="flex flex-col gap-3">
        <div className="card-high border-l-2 p-4 bg-surface-high/50 group" style={{ borderColor: color }}>
          <div className="flex justify-between items-start mb-2">
            <div>
              <div className="section-label">Model Prediction</div>
              <div className="font-space font-bold text-2xl group-hover:scale-105 transition-transform" style={{ color: color }}>
                {(score * 100).toFixed(1)}%
              </div>
            </div>
            <span className="px-2 py-0.5 rounded-[1px] text-[8px] font-mono font-bold uppercase" 
                  style={{ backgroundColor: `${color}20`, color: color, border: `1px solid ${color}40` }}>
              {level} THREAT
            </span>
          </div>
          <div className="progress-track mt-2 bg-obsidian/40 h-1 overflow-hidden">
            <div className="h-full transition-all duration-1000 ease-out" style={{ width: `${score * 100}%`, backgroundColor: color }} />
          </div>
        </div>

        {/* Dynamic Affected Stocks Section — BUY / HOLD / SELL */}
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-2 px-1">
             <div className="w-1 h-3 bg-neon rounded-full" />
             <span className="font-space font-bold text-[9px] text-text-base uppercase tracking-widest">Stock Signal</span>
          </div>
          
          <div className="grid grid-cols-2 gap-2">
             {intel?.events?.[0]?.assets?.map(asset => {
                const signal = score > 0.6 ? 'SELL' : score >= 0.3 ? 'HOLD' : 'BUY';
                const sigColor = score > 0.6 ? '#ef4444' : score >= 0.3 ? '#eab308' : '#22c55e';
                const sigBg = score > 0.6 ? 'bg-tactical' : score >= 0.3 ? 'bg-yellow-500' : 'bg-neon';
                return (
                  <div key={asset} className="p-2.5 bg-obsidian/40 border border-white/5 rounded-sm hover:border-cyan/30 transition-colors">
                     <div className="text-[10px] font-space font-bold text-text-base mb-1">{asset}</div>
                     <div className="flex items-center gap-1.5">
                        <div className={`w-1.5 h-1.5 rounded-full ${sigBg} ${score > 0.6 ? 'animate-pulse' : ''}`} />
                        <span className="text-[9px] font-mono font-bold uppercase" style={{ color: sigColor }}>
                          {signal}
                        </span>
                     </div>
                  </div>
                );
             }) || (
               <div className="col-span-2 py-4 text-center border border-dashed border-white/5 opacity-30 text-[8px] font-mono uppercase">Analyzing Sector Correlation...</div>
             )}
          </div>
        </div>
      </div>

      {/* Consensus Feed */}
      <div className="flex flex-col gap-4">
        <div className="flex justify-between items-center px-1 border-b border-white/5 pb-2">
           <span className="font-space font-bold text-[9px] text-text-base uppercase tracking-widest">Verified Consensus</span>
           <span className="text-[8px] font-mono text-cyan/60 animate-signal">SYNCING</span>
        </div>

        <div className="flex flex-col gap-4">
          {intel?.events.map((e) => (
            <div key={e.id} className="relative pl-3 flex flex-col gap-2">
              <div className={`absolute left-0 top-0 bottom-0 w-0.5 ${e.sentiment_score < 0 ? 'bg-tactical' : 'bg-neon'}`} />
              
              <div className="flex justify-between items-start">
                <span className="font-space font-bold text-[11px] text-text-base leading-tight">{e.title}</span>
                <span className="text-[8px] font-mono text-text-muted">{new Date(e.timestamp).toLocaleDateString()}</span>
              </div>
              
              <p className="text-[9px] text-text-sub leading-relaxed line-clamp-2 italic">
                "{e.content}"
              </p>

              {/* Multi-Source Verification UI */}
              <div className="flex items-center justify-between mt-1 pt-2 border-t border-white/5">
                <div className="flex gap-2 grayscale brightness-150 opacity-40">
                  {/* Icons represent News, Social */}
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 11V1m3 0a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1h3m3 4h12m-9 4h9m-9 4h9"/></svg>
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg>
                  {/* YOUTUBE DISABLED — icon commented out
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-1.94C18.88 4 12 4 12 4s-6.88 0-8.6.48a2.78 2.78 0 0 0-1.94 1.94C1 8.14 1 12 1 12s0 3.86.48 5.58a2.78 2.78 0 0 0 1.94 1.94C5.12 20 12 20 12 20s6.88 0 8.6-.48a2.78 2.78 0 0 0 1.94-1.94C23 15.86 23 12 23 12s0-3.86-.48-5.58z"/><polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02"/></svg>
                  */}
                </div>
                <span className="text-[8px] font-mono font-bold text-cyan uppercase tracking-widest">
                  Verified by {e.source_count}+ Sources
                </span>
              </div>
            </div>
          ))}
          {(!intel?.events || intel.events.length === 0) && (
            <div className="py-10 text-center opacity-20">
               <span className="text-[9px] font-mono uppercase tracking-widest block mb-2">No Active Consensus</span>
               <div className="w-1 h-1 bg-cyan mx-auto rounded-full animate-ping" />
            </div>
          )}
        </div>
      </div>

      <div className="mt-auto pt-6 border-t border-white/5">
        <div className="text-center text-[7px] font-mono text-text-muted uppercase tracking-widest opacity-40">
          GSL-ALPHA CLEARANCE: LEVEL 5 REQUIRED FOR DEEP SECTOR ANALYSIS
        </div>
      </div>
    </div>
  );
};

export default IntelligencePanel;

