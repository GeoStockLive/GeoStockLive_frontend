import React from 'react';

const DashboardOverlay = () => {
  const modes = ['Satellite', 'Topographic', 'Thermal'];
  const [activeMode, setActiveMode] = React.useState('Satellite');

  return (
    <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex items-center justify-between w-full max-w-4xl px-12 pointer-events-none">
      {/* Left Stats Overlay */}
      <div className="flex gap-12 pointer-events-auto">
        <div className="flex flex-col">
          <span className="text-[10px] font-mono text-text-muted uppercase">System Status</span>
          <div className="flex items-center gap-2">
            <span className="font-space font-bold text-lg text-secondary-neon-green uppercase tracking-tight">Online</span>
            <div className="w-2 h-2 rounded-full bg-secondary-neon-green animate-pulse" />
          </div>
        </div>
        
        <div className="flex flex-col">
          <span className="text-[10px] font-mono text-text-muted uppercase">Data Sources</span>
          <span className="font-space font-bold text-lg text-text-primary uppercase tracking-tight">RSS · Reddit</span>
        </div>
      </div>

      {/* Right Mode Toggle */}
      <div className="flex bg-surface-base/40 backdrop-blur-md rounded-sm no-border overflow-hidden pointer-events-auto border border-text-muted/10">
        {modes.map((mode) => (
          <button
            key={mode}
            onClick={() => setActiveMode(mode)}
            className={`px-6 py-2.5 font-mono text-[10px] uppercase tracking-widest transition-tactical ${
              activeMode === mode 
                ? 'bg-primary-cyan text-[#0a0e14] font-bold' 
                : 'text-text-muted hover:text-text-primary'
            }`}
          >
            {mode}
          </button>
        ))}
      </div>
    </div>
  );
};

export default DashboardOverlay;
