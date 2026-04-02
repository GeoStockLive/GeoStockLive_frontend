"use client";
import React, { useState } from 'react';
import dynamic from 'next/dynamic';

const GlobeVisual = dynamic(() => import('./GlobeVisual'), { ssr: false });

const modes = ['Satellite', 'Topographic', 'Thermal'];

interface GlobeSentinelProps {
  onCountryClick?: (countryName: string) => void;
}

const GlobeSentinel = ({ onCountryClick }: GlobeSentinelProps) => {
  const [activeMode, setActiveMode] = useState('Satellite');

  return (
    <div className="flex-1 relative flex items-center justify-center overflow-hidden bg-obsidian">
      {/* Background grid */}
      <div className="absolute inset-0 opacity-[0.025]"
        style={{ backgroundImage:'radial-gradient(#51555d 1px, transparent 0)', backgroundSize:'48px 48px' }} />

      {/* Cyan ambient glow */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ background:'radial-gradient(ellipse 60% 60% at 50% 50%, rgba(143,245,255,0.04), transparent 70%)' }} />

      {/* Page title */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 text-center pointer-events-none z-10 animate-fade-up">
        <div className="font-space font-bold text-xl text-cyan tracking-[0.15em] uppercase" style={{ textShadow:'0 0 30px rgba(143,245,255,0.5)' }}>
          Global Sentinel Active
        </div>
        <div className="text-[9px] font-mono text-text-muted tracking-[0.3em] uppercase mt-1 animate-signal">
          Real-Time Satellite Feed Sync
        </div>
      </div>

      {/* Globe HUD Wrap */}
      <div className="relative" style={{ width:500, height:500 }}>
        {/* RINGS REMOVED AS PER USER REQUEST */}

        {/* Left callout */}
        <div className="absolute -left-12 top-1/3 flex flex-col items-end gap-1 z-20">
          <span className="text-[8px] font-mono text-text-muted uppercase">Scanning Area</span>
          <span className="text-[10px] font-mono text-cyan border-r-2 border-cyan pr-2 py-0.5">38° 53′ 42″ N</span>
        </div>

        {/* Right callout */}
        <div className="absolute -right-12 bottom-1/3 flex flex-col items-start gap-1 z-20">
          <span className="text-[8px] font-mono text-text-muted uppercase">Identity Lock</span>
          <span className="text-[10px] font-mono text-neon border-l-2 border-neon pl-2 py-0.5">SAFE & WORK</span>
        </div>

        {/* 3D GLOBE CONTAINER */}
        <div className="absolute inset-[15%] rounded-full overflow-hidden shadow-cyan-lg flex items-center justify-center">
             <div className="absolute inset-0 z-0">
               <GlobeVisual onCountryClick={onCountryClick} />
             </div>
             
             {/* HUD Overlays on top of 3D globe */}
             <div className="absolute inset-0 pointer-events-none z-10">
               <div className="absolute left-0 right-0 h-px bg-cyan/10 animate-scan" style={{ top: '50%' }} />
               <div className="absolute inset-0 flex items-center justify-center">
                 <div className="relative flex items-center justify-center w-16 h-16">
                   <div className="absolute w-full h-px bg-cyan/50" />
                   <div className="absolute h-full w-px bg-cyan/50" />
                   <div className="w-3 h-3 rounded-full bg-cyan shadow-cyan-md animate-pulse-cyan" />
                 </div>
               </div>
             </div>
        </div>
      </div>

      {/* Bottom overlay */}
      <div className="absolute bottom-10 left-0 right-0 flex items-end justify-between px-12 z-10 pointer-events-none">
        <div className="flex gap-10 pointer-events-auto">
          <div>
            <div className="text-[8px] font-mono text-text-muted uppercase mb-1">System Status</div>
            <div className="font-space font-bold text-lg text-neon flex items-center gap-2">
              Online
              <div className="w-2 h-2 rounded-full bg-neon animate-signal" />
            </div>
          </div>
          <div>
            <div className="text-[8px] font-mono text-text-muted uppercase mb-1">Data Sources</div>
            <div className="font-space font-bold text-lg text-text-base">RSS · Reddit</div>
          </div>
        </div>
        <div className="flex bg-obsidian/70 backdrop-blur-tactical overflow-hidden pointer-events-auto">
          {modes.map(m => (
            <button key={m} onClick={() => setActiveMode(m)}
              className={`px-5 py-2 text-[9px] font-mono uppercase tracking-wider transition-all duration-300
                ${activeMode === m ? 'text-obsidian font-bold' : 'text-text-muted hover:text-text-base'}`}
              style={activeMode === m ? { background:'linear-gradient(135deg,#8ff5ff,#00deec)' } : {}}>
              {m}
            </button>
          ))}
        </div>
      </div>

      {/* Coords bar */}
      <div className="absolute pointer-events-none z-10"
           style={{ bottom:64, left:'50%', transform:'translateX(-50%)', whiteSpace:'nowrap' }}>
        <div className="flex items-center gap-3 bg-surface-low/90 backdrop-blur-tactical px-6 py-2">
          <span className="text-[9px] font-mono text-text-sub uppercase">Coordinates</span>
          <span className="text-[9px] font-mono text-text-base tracking-widest">LAT 38.8977° N · LONG 77.0365° W</span>
        </div>
      </div>
    </div>
  );
};

export default GlobeSentinel;

