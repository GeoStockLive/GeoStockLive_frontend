'use client';
import React, { useState, useEffect } from 'react';
import { useAuth } from '@clerk/nextjs';

interface Holding {
  asset: string;
  total_quantity: number;
}

interface Trade {
  asset: string;
  action: string;
  quantity: number;
  execution_price: number;
  timestamp: string;
}

interface PortfolioData {
  portfolio_id: number;
  name: string;
  holdings: Holding[];
  recent_trades: Trade[];
}

export default function PortfolioPanel() {
  const { isLoaded, userId } = useAuth();
  const [portfolio, setPortfolio] = useState<PortfolioData | null>(null);
  const [loading, setLoading] = useState(false);
  const [tradeStatus, setTradeStatus] = useState<string | null>(null);
  const [livePrices, setLivePrices] = useState<Record<string, number>>({});

  const ASSETS_TO_TRACK = ['Gold', 'Brent Crude', 'TSMC', 'Equities'];

  const fetchLivePrices = async () => {
    try {
      const apiBase = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
      const prices: Record<string, number> = {};
      
      for (const asset of ASSETS_TO_TRACK) {
        const res = await fetch(`${apiBase}/market/price?symbol=${encodeURIComponent(asset)}`);
        if (res.ok) {
          const data = await res.json();
          prices[asset] = data.price;
        }
      }
      setLivePrices(prices);
    } catch (err) {
      console.error("[PORTFOLIO] Failed to fetch live prices:", err);
    }
  };

  const fetchPortfolio = async () => {
    if (!userId) return;
    setLoading(true);
    try {
      const apiBase = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
      const res = await fetch(`${apiBase}/portfolio/${userId}`);
      if (res.ok) {
        const data = await res.json();
        setPortfolio(data);
      }
    } catch (err) {
      console.error("[PORTFOLIO] Failed to fetch:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isLoaded && userId) {
      fetchPortfolio();
      fetchLivePrices();
      // Optionally refresh prices every minute
      const interval = setInterval(fetchLivePrices, 60000);
      return () => clearInterval(interval);
    }
  }, [isLoaded, userId]);

  const executeTrade = async (asset: string, action: 'BUY' | 'SELL') => {
    if (!userId) return;
    
    // Check if we can sell
    if (action === 'SELL') {
      const holding = portfolio?.holdings.find(h => h.asset === asset);
      if (!holding || holding.total_quantity < 10) {
        setTradeStatus(`Insufficient ${asset} to SELL.`);
        setTimeout(() => setTradeStatus(null), 3000);
        return;
      }
    }

    setTradeStatus(`Executing ${action} ${asset}...`);
    try {
      const apiBase = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
      
      const res = await fetch(`${apiBase}/portfolio/${userId}/trade`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          asset,
          action,
          quantity: 10,
          execution_price: 0 // Backend now securely fetches the live price itself
        })
      });

      if (res.ok) {
        setTradeStatus(`Success: ${action} ${asset}`);
        fetchPortfolio(); // Refresh holdings
      } else {
        const err = await res.json();
        setTradeStatus(`Failed: ${err.detail}`);
      }
    } catch (err) {
      console.error("[PORTFOLIO] Trade execution failed:", err);
      setTradeStatus("Trade execution failed.");
    }

    setTimeout(() => setTradeStatus(null), 3000);
  };

  if (!isLoaded) return <div className="p-4 text-xs font-mono text-text-muted">LOADING TERMINAL...</div>;

  return (
    <div className="flex flex-col h-full bg-[#07070A] border border-white/5 rounded-sm p-4 overflow-hidden relative">
      <div className="flex justify-between items-center mb-4 border-b border-white/10 pb-2">
        <h2 className="font-space font-bold text-xs tracking-widest text-text-base uppercase">
          {portfolio ? portfolio.name : 'Tactical Portfolio'}
        </h2>
        <span className="text-[9px] font-mono text-neon bg-neon/10 px-2 py-0.5 rounded-sm border border-neon/20 animate-pulse">
          PAPER TRADING
        </span>
      </div>

      {tradeStatus && (
        <div className="absolute top-12 left-4 right-4 bg-tactical/20 border border-tactical/50 text-tactical text-[10px] font-mono p-2 rounded-sm z-10 text-center animate-fade-in-out">
          {tradeStatus}
        </div>
      )}

      {loading && !portfolio ? (
        <div className="flex-1 flex justify-center items-center">
          <div className="text-[10px] font-mono text-text-muted animate-pulse">SYNCING LEDGER...</div>
        </div>
      ) : (
        <div className="flex-1 flex flex-col gap-6 overflow-y-auto scrollbar-thin">
          
          {/* HOLDINGS */}
          <div>
            <h3 className="text-[9px] font-mono text-text-muted tracking-widest mb-2">ACTIVE HOLDINGS</h3>
            <div className="space-y-2">
              {portfolio?.holdings.length ? portfolio.holdings.map((h, i) => (
                <div key={i} className="flex justify-between items-center bg-white/5 p-2 rounded-sm border border-white/5">
                  <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-gold-primary" />
                    <span className="text-[10px] font-space font-bold text-text-base">{h.asset}</span>
                  </div>
                  <span className="text-[10px] font-mono text-text-muted">
                    QTY: <span className="text-white">{h.total_quantity}</span>
                  </span>
                </div>
              )) : (
                <div className="text-[10px] font-mono text-text-sub italic">No active holdings.</div>
              )}
            </div>
          </div>

          {/* QUICK EXECUTION */}
          <div>
            <h3 className="text-[9px] font-mono text-text-muted tracking-widest mb-2">QUICK EXECUTION (QTY: 10)</h3>
            <div className="grid grid-cols-2 gap-2">
              {ASSETS_TO_TRACK.map(asset => (
                <div key={asset} className="flex flex-col gap-1 bg-white/[0.02] p-2 border border-white/5 rounded-sm hover:border-white/10 transition-colors">
                  <div className="text-[9px] font-space text-text-base truncate flex justify-between">
                    <span>{asset}</span>
                    <span className="text-white">${livePrices[asset] ? livePrices[asset].toFixed(2) : '---'}</span>
                  </div>
                  <div className="flex gap-1">
                    <button 
                      onClick={() => executeTrade(asset, 'BUY')}
                      className="flex-1 bg-neon/10 hover:bg-neon/20 text-neon text-[8px] font-mono py-1 rounded-[1px] border border-neon/20 transition-colors"
                    >
                      BUY
                    </button>
                    <button 
                      onClick={() => executeTrade(asset, 'SELL')}
                      className="flex-1 bg-tactical/10 hover:bg-tactical/20 text-tactical text-[8px] font-mono py-1 rounded-[1px] border border-tactical/20 transition-colors"
                    >
                      SELL
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* RECENT TRADES */}
          <div>
            <h3 className="text-[9px] font-mono text-text-muted tracking-widest mb-2">LEDGER HISTORY</h3>
            <div className="space-y-1">
              {portfolio?.recent_trades.length ? portfolio.recent_trades.map((t, i) => (
                <div key={i} className="flex justify-between text-[9px] font-mono py-1 border-b border-white/5">
                  <span className={t.action === 'BUY' ? 'text-neon' : 'text-tactical'}>{t.action}</span>
                  <span className="text-text-base">{t.asset} ({t.quantity})</span>
                  <span className="text-text-muted">${t.execution_price.toFixed(2)}</span>
                </div>
              )) : (
                <div className="text-[9px] font-mono text-text-sub italic">No history.</div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
