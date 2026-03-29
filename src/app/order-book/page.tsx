'use client';
import { useState } from 'react';
import Sidebar from '@/components/Sidebar';
import TradingChart from '@/components/TradingChart';

const SYMBOLS = [
  { id: 'AAPL', name: 'Apple Inc.', type: 'Stock' },
  { id: 'NVDA', name: 'NVIDIA Corp.', type: 'Stock' },
  { id: 'MSFT', name: 'Microsoft', type: 'Stock' },
  { id: 'TSLA', name: 'Tesla, Inc.', type: 'Stock' },
  { id: 'GOOGL', name: 'Alphabet Inc.', type: 'Stock' },
  { id: 'AMZN', name: 'Amazon.com', type: 'Stock' },
  { id: 'META', name: 'Meta Platforms', type: 'Stock' },
  { id: 'NFLX', name: 'Netflix, Inc.', type: 'Stock' },
  { id: 'BTC/USD', name: 'Bitcoin / USD', type: 'Crypto' },
  { id: 'ETH/USD', name: 'Ethereum / USD', type: 'Crypto' },
  { id: 'XAU/USD', name: 'Gold / USD', type: 'Forex' },
  { id: 'EUR/USD', name: 'Euro / USD', type: 'Forex' },
];

const API_KEY = '7c48d5d9a40542aa853b812fba65dff7';

const bids = [
  ['2319.42','14.8','22.40'],['2316.95','6.3','13.90'],
  ['2530.09','29.1','62.20'],['2524.65','42.5','14.30'],
  ['2321.10','8.2','3.70'],
];
const asks = [
  ['2315.39','10.5','42.30'],['2316.40','20.1','71.40'],
  ['2317.99','34.8','115.10'],['2317.58','13.2','18.20'],
  ['2317.13','32.4','52.90'],['2316.99','6.4','14.80'],
];

export default function OrderBookPage() {
  const [symbol, setSymbol] = useState(SYMBOLS[0]);
  const [interval, setInterval] = useState('5min');
  const [orderType, setOrderType] = useState('Limit Order');
  const [qty, setQty] = useState('1.00');
  const [price, setPrice] = useState('2318.42');

  return (
    <div className="shell">
      {/* Mini Sidebar */}
      <Sidebar />

      <div className="main-area">
        {/* Header */}
        <header className="dash-header">
          <span className="font-space font-bold text-lg tracking-tighter text-cyan text-glow-cyan">GEOTRADER</span>
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono text-text-muted uppercase">Tension Index</span>
              <span className="font-space font-bold text-sm text-cyan">68.4</span>
            </div>
            <div className="flex items-center gap-2 px-3 py-1 bg-neon/10 rounded-sm">
              <div className="w-1.5 h-1.5 rounded-full bg-neon animate-signal" />
              <span className="text-[10px] font-mono text-neon font-bold uppercase">{symbol.id} LIVE</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            {['ML STABLE','ATC CONNECTED'].map(s => (
              <span key={s} className="text-[9px] font-mono text-neon bg-neon/10 px-2 py-0.5 rounded-sm">{s}</span>
            ))}
            <button className="nav-icon"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg></button>
          </div>
        </header>

        <div className="body-viewport bg-obsidian">
          <div className="flex-1 flex flex-col min-w-0 p-5 gap-4">
            {/* Asset Row */}
            <div className="flex items-center gap-4 animate-fade-up">
              <div>
                <div className="flex items-center gap-3">
                  <select 
                    value={symbol.id} 
                    onChange={(e) => setSymbol(SYMBOLS.find(s => s.id === e.target.value) || SYMBOLS[0])}
                    className="bg-transparent border-none text-text-base font-space font-bold text-xl outline-none cursor-pointer hover:text-cyan transition-colors"
                  >
                    {SYMBOLS.map(s => <option key={s.id} value={s.id} className="bg-obsidian">{s.id}</option>)}
                  </select>
                  <span className="badge-green">+1.24%</span>
                </div>
                <div className="text-[9px] font-mono text-text-muted uppercase">{symbol.name} | {symbol.type}</div>
              </div>
              <div className="ml-auto flex gap-2">
                {['1min', '5min', '15min', '1h', '1day'].map(t => (
                  <button 
                    key={t} 
                    onClick={() => setInterval(t)}
                    className={`text-[9px] font-mono px-2.5 py-1 rounded-sm transition-all ${interval === t ? 'bg-cyan text-obsidian font-bold' : 'text-text-muted hover:text-cyan'}`}
                  >
                    {t.toUpperCase()}
                  </button>
                ))}
              </div>
            </div>

            {/* TradingView Chart */}
            <div className="flex-1 bg-surface-low rounded-sm p-4 relative overflow-hidden min-h-[400px] animate-slide-in-left border border-white/5">
              <TradingChart symbol={symbol.id} interval={interval} apiKey={API_KEY} />
            </div>

            {/* Execute Panel */}
            <div className="bg-surface-low rounded-sm p-4 animate-fade-up">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-1.5 h-1.5 rounded-full bg-cyan animate-signal" />
                <span className="text-[9px] font-mono text-text-muted uppercase tracking-widest">Execute Trade Logic</span>
              </div>
              <div className="grid grid-cols-2 gap-3 mb-3">
                <div>
                  <label className="text-[8px] font-mono text-text-muted uppercase block mb-1">Order Type</label>
                  <select value={orderType} onChange={e => setOrderType(e.target.value)}
                    className="w-full bg-obsidian text-text-base text-xs font-mono px-3 py-2 rounded-sm border border-surface-bright outline-none cursor-pointer">
                    <option>Limit Order</option><option>Market Order</option><option>Stop Loss</option>
                  </select>
                </div>
                <div>
                  <label className="text-[8px] font-mono text-text-muted uppercase block mb-1">Price/Bid</label>
                  <input value={price} onChange={e => setPrice(e.target.value)}
                    className="w-full bg-obsidian text-text-base text-xs font-mono px-3 py-2 rounded-sm border border-surface-bright outline-none" />
                </div>
              </div>
              <div className="mb-3">
                <label className="text-[8px] font-mono text-text-muted uppercase block mb-1">Quantity (Lot)</label>
                <input value={qty} onChange={e => setQty(e.target.value)}
                  className="w-full bg-obsidian text-text-base text-xs font-mono px-3 py-2 rounded-sm border border-surface-bright outline-none" />
              </div>
              <div className="flex gap-2 mb-4">
                {['25%','50%','MAX'].map(p => (
                  <button key={p} className="flex-1 py-1.5 text-[9px] font-mono text-text-muted border border-surface-bright rounded-sm hover:border-cyan hover:text-cyan transition-all">{p}</button>
                ))}
              </div>
              <div className="flex gap-2">
                <button className="flex-1 py-3 font-space font-bold text-xs rounded-sm flex items-center justify-center gap-2 transition-all hover:brightness-110"
                  style={{ background: 'linear-gradient(135deg,#00fc40,#00c832)', color:'#001a0a' }}>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14"/><path d="M12 5l7 7-7 7"/></svg>
                  BUY XAU
                </button>
                <button className="flex-1 py-3 font-space font-bold text-xs rounded-sm flex items-center justify-center gap-2 transition-all hover:brightness-110"
                  style={{ background: 'linear-gradient(135deg,#ff716c,#e84040)', color:'#1a0000' }}>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14"/><path d="M12 19l-7-7 7-7"/></svg>
                  SELL XAU
                </button>
              </div>
            </div>
          </div>

          {/* Order Book Panel */}
          <div className="w-60 bg-surface-low shadow-panel flex flex-col animate-slide-in-right">
            <div className="flex items-center justify-between px-4 py-3 border-b border-surface-high">
              <span className="text-[9px] font-mono text-text-muted uppercase tracking-widest">Live Order Book</span>
              <div className="w-1.5 h-1.5 rounded-full bg-neon animate-signal" />
            </div>

            {/* Asks */}
            <div className="flex flex-col">
              {asks.map((r,i) => (
                <div key={i} className="grid grid-cols-3 gap-px relative group cursor-pointer"
                     style={{ animationDelay:`${i*40}ms` }}>
                  <div className="absolute right-0 top-0 bottom-0 bg-tactical/8 transition-all duration-300 group-hover:bg-tactical/15"
                       style={{ width:`${20+i*8}%` }} />
                  <div className="px-3 py-1.5 text-[9px] font-mono text-tactical z-10">{r[0]}</div>
                  <div className="px-3 py-1.5 text-[9px] font-mono text-text-sub z-10 text-center">{r[1]}</div>
                  <div className="px-3 py-1.5 text-[9px] font-mono text-text-muted z-10 text-right">{r[2]}</div>
                </div>
              ))}
            </div>

            {/* Spread */}
            <div className="flex items-center gap-3 px-4 py-2 bg-obsidian border-y border-surface-high">
              <span className="font-space font-bold text-sm text-text-base">2398.92</span>
              <span className="text-[8px] font-mono text-text-muted">←</span>
              <span className="badge-cyber">SPREAD 4.13</span>
            </div>

            {/* Bids */}
            <div className="flex flex-col">
              {bids.map((r,i) => (
                <div key={i} className="grid grid-cols-3 gap-px relative group cursor-pointer">
                  <div className="absolute right-0 top-0 bottom-0 bg-neon/8 transition-all duration-300 group-hover:bg-neon/15"
                       style={{ width:`${15+i*10}%` }} />
                  <div className="px-3 py-1.5 text-[9px] font-mono text-neon z-10">{r[0]}</div>
                  <div className="px-3 py-1.5 text-[9px] font-mono text-text-sub z-10 text-center">{r[1]}</div>
                  <div className="px-3 py-1.5 text-[9px] font-mono text-text-muted z-10 text-right">{r[2]}</div>
                </div>
              ))}
            </div>

            {/* Footer */}
            <div className="mt-auto p-4 border-t border-surface-high">
              <div className="text-[8px] font-mono text-text-muted">LATENCY: <span className="text-neon">14ms</span></div>
              <div className="text-[8px] font-mono text-text-muted">2024-05-16 14:32:15 SYS</div>
            </div>
          </div>
        </div>

        {/* Status bar */}
        <div className="h-8 bg-surface-low flex items-center px-8 gap-8 flex-shrink-0">
          {['ML: STABLE','LATENCY: 14ms','ATC: CONNECTED','CONSOLE READY'].map(s => (
            <span key={s} className="text-[8px] font-mono text-text-muted">{s}</span>
          ))}
        </div>
      </div>
    </div>
  );
}
