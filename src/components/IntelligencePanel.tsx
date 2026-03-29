'use client';
import React from 'react';

interface Signal {
  id: number;
  severity: 'high' | 'medium' | 'low';
  title: string;
  time: string;
  body: string;
  tags: string[];
}

const globalSignals: Signal[] = [
  { id: 1, severity: 'high', title: 'Energy Pipeline Disruption', time: '3m ago', body: 'Significant drop in flow rates across Gulf Coast infrastructure following regional tension spike.', tags: ['CRITICAL RISK', 'WTI -2.4%'] },
  { id: 2, severity: 'low', title: 'Diplomatic Accord Shift', time: '14m ago', body: 'Renewal of trade agreements with northern territories expected to stabilize supply chain volatility.', tags: ['STABILIZING', 'USD +0.1%'] },
  { id: 3, severity: 'medium', title: 'Cyber Infrastructure Ping', time: '42m ago', body: 'Unusual packet density detected targeting financial exchange clusters in NY hub.', tags: ['HIGH THREAT'] },
];

const countrySpecificData: Record<string, { title: string, tension: string, signals: Signal[] }> = {
  'Russia': {
    title: 'Regional Hub: Moscow',
    tension: '98.2',
    signals: [
      { id: 101, severity: 'high', title: 'Supply Chain Sanction Update', time: '1m ago', body: 'New export restrictions detected on localized manufacturing components.', tags: ['TRADE BARRIER', 'RUB -1.2%'] },
    ]
  },
  'United States of America': {
    title: 'Regional Hub: Washington DC',
    tension: '42.4',
    signals: [
      { id: 201, severity: 'low', title: 'Domestic Policy Shift', time: '6h ago', body: 'Internal legislative update suggests long-term stability in energy sector.', tags: ['STABLE', 'SPX +0.4%'] },
    ]
  },
  'China': {
    title: 'Regional Hub: Beijing',
    tension: '76.1',
    signals: [
      { id: 301, severity: 'medium', title: 'Tech Sector Volatility', time: '12m ago', body: 'Market fluctuations in semiconductor output following regional training exercises.', tags: ['MARKET ALERT', 'CNY -0.2%'] },
    ]
  }
};

interface IntelligencePanelProps {
  selectedCountry?: string | null;
}

const IntelligencePanel = ({ selectedCountry }: IntelligencePanelProps) => {
  const data = selectedCountry && countrySpecificData[selectedCountry] 
    ? countrySpecificData[selectedCountry] 
    : { title: 'Global Sentinel Overview', tension: '68.4', signals: globalSignals };

  const isCritical = parseFloat(data.tension) > 80;

  return (
    <div className="w-80 h-full bg-surface-low border-l border-surface-high flex flex-shrink-0 flex-col overflow-y-auto scrollbar-thin p-5 gap-6 animate-slide-in-right">
      {/* Header Section */}
      <div>
        <div className="section-label">Intelli-Core v4.2</div>
        <h2 className="section-title text-glow-cyan text-lg leading-tight mb-2">
          {selectedCountry || 'Global Pulse Feed'}
        </h2>
        <div className="text-[10px] text-text-muted font-mono uppercase tracking-wide">
          {data.title}
        </div>
      </div>

      {/* Primary Metrics Group */}
      <div className="flex flex-col gap-3">
        <div className="card border-l-2 border-cyan bg-surface-high/50 p-4 transition-all hover:bg-surface-high">
          <div className="flex justify-between items-start mb-2">
            <div>
              <div className="section-label">Region Tension</div>
              <div className={`font-space font-bold text-2xl ${isCritical ? 'text-tactical' : 'text-cyan'}`}>
                {data.tension}
              </div>
            </div>
            <span className={`badge-${isCritical ? 'red' : 'green'} mt-1`}>
              {isCritical ? 'Critical Threshold' : 'Stable Range'}
            </span>
          </div>
          <div className="progress-track mt-2">
            <div className={`progress-fill-${isCritical ? 'red' : 'cyan'}`} style={{ width: `${data.tension}%` }} />
          </div>
        </div>

        <div className="card-low border-l-2 border-neon bg-surface-high/30 p-4">
          <div className="flex justify-between items-center">
            <div>
              <div className="section-label">Stability Score</div>
              <div className="font-space font-bold text-lg text-neon uppercase italic">OPTIMAL_SYNC</div>
            </div>
            <div className="w-8 h-8 rounded-full border border-neon/30 flex items-center justify-center animate-pulse-cyan">
               <div className="w-1.5 h-1.5 rounded-full bg-neon" />
            </div>
          </div>
        </div>
      </div>

      {/* Signals Feed */}
      <div className="flex flex-col gap-4">
        <div className="flex justify-between items-center px-1">
          <div className="flex items-center gap-2">
            <div className="w-1 h-3 bg-cyan rounded-full animate-pulse-cyan" />
            <span className="font-space font-bold text-[10px] text-text-base uppercase tracking-widest">Priority Signals</span>
          </div>
          <span className="text-[8px] font-mono text-cyan opacity-60 animate-signal">LIVE FEED SYNC</span>
        </div>

        <div className="flex flex-col gap-3">
          {data.signals.map((s) => (
            <div key={s.id} className="signal-card group">
              {/* Severity edge */}
              <div className={`absolute left-0 top-0 bottom-0 w-1 ${s.severity === 'high' ? 'bg-tactical shadow-[0_0_10px_#ff716c]' : s.severity === 'medium' ? 'bg-amber-400' : 'bg-cyan'}`} />
              
              <div className="flex justify-between items-start mb-1.5">
                <span className="font-space font-bold text-[11px] text-text-base group-hover:text-cyan transition-colors">{s.title}</span>
                <span className="text-[8px] font-mono text-text-muted">{s.time}</span>
              </div>
              
              <p className="text-[9px] text-text-sub leading-relaxed mb-3 line-clamp-2">
                {s.body}
              </p>
              
              <div className="flex flex-wrap gap-1.5">
                {s.tags.map(tag => (
                  <span key={tag} className={`text-[8px] font-mono px-1.5 py-0.5 rounded-sm ${tag.includes('RISK') || s.severity==='high' ? 'bg-tactical/10 text-tactical border border-tactical/20' : 'bg-cyan-dim text-cyan border border-cyan/20'}`}>
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Action Area */}
      <div className="mt-auto pt-4">
        <button className="btn-cyan group relative overflow-hidden">
          <span className="relative z-10 flex items-center justify-center gap-2">
            EXECUTE RISK MITIGATION 
            <svg className="w-3 h-3 transition-transform group-hover:translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </span>
          <div className="absolute inset-0 bg-white/10 translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-500" />
        </button>
        <div className="text-center text-[8px] font-mono text-text-muted mt-3 uppercase tracking-tighter">
          GT-OMEGA CLEARANCE REQUIRED FOR PROTOCOL 0
        </div>
      </div>
    </div>
  );
};

export default IntelligencePanel;
