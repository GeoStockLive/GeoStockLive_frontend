'use client';
import Sidebar from '@/components/Sidebar';
import Header from '@/components/Header';

const barData = [42, 55, 48, 61, 58, 70, 67, 75, 80, 92];

const events = [
  { type: 'SHOCK EVENT', color: 'text-tactical bg-tactical/10', title: 'Central Bank Rate Shift: Unexpected Dovish Pivot', date: '2025.3.12 FRI 4:4:05', entry: '$2,520.40', exit: '$2,558.30', pnl: '+$2,840', pnlColor: 'text-neon' },
  { type: 'SIGNAL ENCODE', color: 'text-cyan bg-cyan-dim', title: 'XAU/USD Long Pulse', link: '$2,530.50 / $2,540.30', pnl: '', pnlColor: '' },
  { type: 'ACTIVE ANALYSIS', color: 'text-amber-400 bg-amber-400/10', title: 'WTI Crude Correction', desc: 'Expire chain distortion in front-month deliveries detected via satellite data.', age: '1h ago', pnl: '', pnlColor: '' },
];

const logs = [
  { ts: '2025.3.1 FRI 05:44:00', id: 'TX-R6558A', pair: 'USDJPY', type: 'Short – Scalp', pnl: '+$2.4 pips', status: 'EXEC' },
  { ts: '2025.3.1 FRI 03:31:14', id: 'TX-M65566', pair: 'ETH/USD', type: 'Long – Swing', pnl: '',            status: 'ACTIVE' },
  { ts: '2025.3.1 FRI 01:04:14', id: 'TX-R6U663', pair: 'BRENT CRUDE', type: 'Limit Order', pnl: '-4,320', status: 'EXPIRED' },
];

const statusColor: Record<string,string> = {
  EXEC: 'bg-neon/20 text-neon', ACTIVE: 'bg-cyan-dim text-cyan', EXPIRED: 'bg-tactical/20 text-tactical',
};

export default function HistoryPage() {
  return (
    <div className="shell">
      <Sidebar />
      <div className="main-area">
        <Header subtitle="Terminal ID 6T-1" />
        <div className="body-viewport overflow-y-auto scrollbar-thin bg-obsidian p-8 flex-col gap-6">

          {/* Header Row */}
          <div className="flex items-center justify-between mb-2 animate-fade-up">
            <div>
              <div className="section-label">System Audit: 16,386 Events Logged · Last Sync 0.01s ago</div>
              <h1 className="font-space font-bold text-2xl text-text-base uppercase">Historical Archive</h1>
            </div>
            <div className="flex gap-2">
              {['Last 30 Days','90 Assets','At Alerts'].map(f => (
                <button key={f} className="btn-outline text-[9px] px-3 py-1.5">{f}</button>
              ))}
              <button className="btn-cyan !w-auto px-5 py-1.5 text-[9px]">Apply Filters</button>
            </div>
          </div>

          {/* Chart + Stats Row */}
          <div className="grid grid-cols-3 gap-4 animate-slide-in-left">
            {/* Bar Chart */}
            <div className="col-span-2 card-low">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <div className="section-label">Signal Accuracy Over Time</div>
                  <div className="text-[10px] text-text-muted">Proprietary AI Prediction Success vs. Market Realization</div>
                </div>
                <div className="text-right">
                  <div className="font-space font-bold text-3xl text-cyan">92.4%</div>
                  <div className="text-[9px] font-mono text-neon">+12.4%</div>
                </div>
              </div>
              <div className="flex items-end gap-1.5 h-32">
                {barData.map((h, i) => (
                  <div key={i} className="flex-1 flex flex-col items-center gap-1">
                    <div className="w-full rounded-sm animate-candle"
                      style={{
                        height: `${h}%`,
                        background: i === barData.length - 1
                          ? 'linear-gradient(180deg, #8ff5ff, #00deec)'
                          : `rgba(143,245,255,${0.15 + i * 0.07})`,
                        animationDelay: `${i * 60}ms`,
                        transformOrigin: 'bottom',
                      }} />
                    <div className="text-[7px] font-mono text-text-muted">
                      {['OCT','','','NOV','','','DEC','','','JAN'][i]}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Stat Cards */}
            <div className="flex flex-col gap-3">
              {[
                { label: 'Win / Loss Ratio', val: '4.82 : 1', icon: '↗', color: 'text-neon' },
                { label: 'WFC Transaction',  val: '2.14%',    icon: '↘', color: 'text-tactical' },
                { label: 'Volatility Exposure', val: 'Low / Med', icon: '🛡', color: 'text-cyan' },
              ].map(s => (
                <div key={s.label} className="card-low flex items-center justify-between">
                  <div>
                    <div className="section-label">{s.label}</div>
                    <div className={`font-space font-bold text-lg ${s.color}`}>{s.val}</div>
                  </div>
                  <div className={`text-2xl ${s.color}`}>{s.icon}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Event Cards */}
          <div className="grid grid-cols-3 gap-3 animate-fade-up">
            {events.map((e, i) => (
              <div key={i} className="card-low border-l-2 border-l-surface-bright relative">
                <span className={`text-[8px] font-mono px-1.5 py-0.5 rounded-sm ${e.color}`}>{e.type}</span>
                {e.date && <div className="text-[8px] font-mono text-text-muted mt-1">{e.date}</div>}
                <div className="font-space font-semibold text-xs text-text-base mt-2 mb-2">{e.title}</div>
                {e.pnl && <div className={`font-space font-bold text-xl ${e.pnlColor}`}>{e.pnl}</div>}
                {e.desc && <p className="text-[9px] text-text-sub leading-relaxed">{e.desc}</p>}
              </div>
            ))}
          </div>

          {/* Raw Log Table */}
          <div className="animate-fade-up">
            <div className="flex justify-between items-center mb-3">
              <div className="flex items-center gap-2">
                <div className="w-1 h-5 bg-cyan rounded-full" />
                <span className="font-space font-semibold text-sm text-text-base uppercase tracking-wide">Raw Execution Log</span>
              </div>
              <button className="btn-outline text-[9px] px-3 py-1.5">Download CSV</button>
            </div>

            <div className="bg-surface-low rounded-sm overflow-hidden">
              <div className="grid grid-cols-6 gap-px bg-obsidian">
                {['Datetime', 'Transaction ID', 'Pair / Asset', 'Type', 'P&L Result', 'Status'].map(col => (
                  <div key={col} className="bg-surface-high px-4 py-2.5 text-[8px] font-mono uppercase tracking-widest text-text-muted">{col}</div>
                ))}
              </div>
              {logs.map((l, i) => (
                <div key={i} className={`grid grid-cols-6 gap-px bg-obsidian ${i % 2 === 0 ? '' : ''}`}>
                  <div className="bg-surface-low px-4 py-3 text-[9px] font-mono text-text-muted">{l.ts}</div>
                  <div className="bg-surface-low px-4 py-3 text-[9px] font-mono text-text-sub">{l.id}</div>
                  <div className="bg-surface-low px-4 py-3 text-[9px] font-mono text-text-base font-semibold">{l.pair}</div>
                  <div className="bg-surface-low px-4 py-3 text-[9px] font-mono text-text-sub">{l.type}</div>
                  <div className={`bg-surface-low px-4 py-3 text-[9px] font-mono font-bold ${l.pnl.startsWith('+') ? 'text-neon' : l.pnl.startsWith('-') ? 'text-tactical' : 'text-cyan'}`}>{l.pnl || '—'}</div>
                  <div className="bg-surface-low px-4 py-3">
                    <span className={`text-[8px] font-mono px-2 py-0.5 rounded-sm ${statusColor[l.status]}`}>{l.status}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            <div className="flex justify-center gap-2 mt-4">
              {['‹', '1', '2', '3', '...', '164', '›'].map((p, i) => (
                <button key={i} className={`w-7 h-7 text-[10px] font-mono rounded-sm transition-all ${p === '1' ? 'bg-cyan text-obsidian font-bold' : 'text-text-muted hover:text-cyan'}`}>{p}</button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
