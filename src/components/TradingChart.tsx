'use client';

import React, { useEffect, useRef } from 'react';
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

    // Fetch initial data
    const fetchHistory = async () => {
      try {
        const url = `https://api.twelvedata.com/time_series?symbol=${encodeURIComponent(symbol)}&interval=${interval}&apikey=${apiKey}&outputsize=100`;
        const response = await fetch(url);
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();

        if (data.status === 'error') {
          console.error('Twelve Data Error:', data.message);
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
            .sort((a: any, b: any) => a.time - b.time);

          candlestickSeries.setData(formattedData);
          chart.timeScale().fitContent();
        }
      } catch (err) {
        console.error('Fetch error:', err);
      }
    };

    fetchHistory();

    // Handle Window Resize
    const handleResize = () => {
      if (chartRef.current && chartContainerRef.current) {
        chartRef.current.applyOptions({ width: chartContainerRef.current.clientWidth });
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      chart.remove();
    };
  }, [symbol, interval, apiKey]);

  return (
    <div className="relative w-full h-[400px]">
      <div ref={chartContainerRef} className="absolute inset-0 w-full h-full" />
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
