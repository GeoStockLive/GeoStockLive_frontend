'use client';

import React, { useEffect, useRef, useCallback } from 'react';
import { createChart, ColorType, CandlestickData, CandlestickSeries } from 'lightweight-charts';

interface TradingChartProps {
  symbol: string;
  interval: string;
  apiKey: string;
}

export default function TradingChart({ symbol, interval, apiKey }: TradingChartProps) {
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<any>(null);
  const seriesRef = useRef<any>(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);
  
  // Fetch initial data
  const fetchHistory = useCallback(async () => {
    if (!seriesRef.current) return;
    
    setLoading(true);
    setError(null);
    try {
      const apiBase = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
      const url = `${apiBase}/market/history?symbol=${encodeURIComponent(symbol)}&interval=${interval}`;
      
      console.log(`[CHART] Fetching from: ${url}`);
      const response = await fetch(url);
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ error: 'Unknown API error' }));
        throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();

      if (data.status === 'error') {
        console.error('Twelve Data Error:', data.message);
        setError(data.message);
        return;
      }

      if (data.values && Array.isArray(data.values)) {
        const formattedData: CandlestickData[] = data.values
          .map((item: any) => ({
            time: item.datetime.includes(' ') ? new Date(item.datetime).getTime() / 1000 : item.datetime,
            open: parseFloat(item.open),
            high: parseFloat(item.high),
            low: parseFloat(item.low),
            close: parseFloat(item.close),
          }))
          .sort((a: any, b: any) => (typeof a.time === 'number' && typeof b.time === 'number' ? a.time - b.time : 0));

        if (seriesRef.current) {
          seriesRef.current.setData(formattedData);
        }
        if (chartRef.current) {
          chartRef.current.timeScale().fitContent();
        }
      }
    } catch (err: any) {
      console.error('Fetch error:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [symbol, interval]);

  useEffect(() => {
    if (!chartContainerRef.current) return;

    // Initialize Chart
    const chart = createChart(chartContainerRef.current, {
      layout: {
        background: { type: ColorType.Solid, color: 'transparent' },
        textColor: '#8ff5ff', // Cyan-like color for text
      },
      grid: {
        vertLines: { color: 'rgba(143, 245, 255, 0.05)' },
        horzLines: { color: 'rgba(143, 245, 255, 0.05)' },
      },
      width: chartContainerRef.current.clientWidth,
      height: 400,
      timeScale: {
        borderColor: 'rgba(143, 245, 255, 0.2)',
        timeVisible: true,
        secondsVisible: false,
      },
      rightPriceScale: {
        borderColor: 'rgba(143, 245, 255, 0.2)',
      },
    }) as any;

    const candlestickSeries = chart.addSeries(CandlestickSeries, {
      upColor: '#00fc40', // Neon Green
      downColor: '#ff716c', // Tactical Red
      borderVisible: false,
      wickUpColor: '#00fc40',
      wickDownColor: '#ff716c',
    });

    chartRef.current = chart;
    seriesRef.current = candlestickSeries;

    // Initial fetch
    fetchHistory();

    // Handle Window Resize
    const handleResize = () => {
      if (chart && chartContainerRef.current) {
        chart.applyOptions({ width: chartContainerRef.current.clientWidth });
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      chart.remove();
      chartRef.current = null;
      seriesRef.current = null;
    };
  }, [symbol, interval, fetchHistory]);

  return (
    <div className="relative w-full h-[400px] border border-white/5 rounded-sm overflow-hidden bg-obsidian/40">
      <div ref={chartContainerRef} className="absolute inset-0 w-full h-full" />
      
      {/* Loading Overlay */}
      {loading && (
        <div className="absolute inset-0 z-20 flex items-center justify-center bg-obsidian/60 backdrop-blur-[2px]">
          <div className="flex flex-col items-center gap-3">
            <div className="w-8 h-8 border-2 border-cyan/20 border-t-cyan rounded-full animate-spin" />
            <span className="text-[10px] font-mono text-cyan animate-pulse uppercase tracking-widest">Synchronizing Data...</span>
          </div>
        </div>
      )}

      {/* Error Overlay */}
      {error && (
        <div className="absolute inset-0 z-30 flex items-center justify-center bg-obsidian/80 backdrop-blur-sm">
          <div className="max-w-[80%] text-center p-4 border border-tactical/30 bg-tactical/5 rounded-sm">
            <div className="text-tactical text-xs font-mono mb-2 uppercase font-bold tracking-tighter">Request Failed</div>
            <div className="text-[10px] font-mono text-text-muted mb-4">{error}</div>
            <button 
              onClick={() => fetchHistory()}
              className="px-4 py-2 border border-cyan/40 text-cyan text-[10px] font-mono hover:bg-cyan/10 transition-colors uppercase"
            >
              Retry Connection
            </button>
          </div>
        </div>
      )}

      {/* Decorative Hud Element */}
      <div className="absolute top-2 left-2 z-10 flex gap-2">
        <span className="text-[10px] font-mono bg-obsidian/60 px-2 py-0.5 border border-cyan/20 rounded-sm text-cyan backdrop-blur-sm">
          {symbol} / {interval}
        </span>
        <span className="text-[10px] font-mono bg-obsidian/60 px-2 py-0.5 border border-neon/20 rounded-sm text-neon backdrop-blur-sm animate-pulse">
          LIVE FEED
        </span>
      </div>
    </div>
  );
}
