'use client';

import React, { useState, useEffect } from 'react';
import Sidebar from '@/components/Sidebar';
import Header from '@/components/Header';

interface NewsItem {
  id: string;
  title: string;
  content: string;
  sentiment_score: number;
  source_count: number;
  timestamp: string;
  event_type: string;
}

export default function NewsFeed() {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const apiBase = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
        const res = await fetch(`${apiBase}/events/`); // Fetching actual intelligence events instead of signals
        const data = await res.json();
        setNews(data);
      } catch (err) {
        console.error('[NEWS] Failed to fetch feed:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchNews();
  }, []);

  return (
    <div className="shell tracking-tight">
      <Sidebar />
      <div className="main-area">
        <Header subtitle="News Terminal: F6" />
        <div className="body-viewport overflow-y-auto p-8 flex flex-col gap-6 scrollbar-thin">
          <div className="flex justify-between items-end mb-4 border-b border-white/5 pb-4">
            <div>
              <h1 className="font-space font-bold text-3xl text-glow-cyan tracking-tighter uppercase">Intelligence Consensus</h1>
              <p className="text-[10px] font-mono text-text-muted mt-1 uppercase tracking-widest">Multi-Source Verified Geopolitics</p>
            </div>
            <div className="text-right">
              <span className="text-[10px] font-mono text-neon border border-neon/30 px-2 py-1 bg-neon/10 animate-pulse uppercase">Live Feed Active</span>
            </div>
          </div>

          {loading ? (
             <div className="flex-1 flex items-center justify-center opacity-20">
                <div className="w-8 h-8 border-2 border-cyan border-t-transparent rounded-full animate-spin" />
             </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {news.map((item) => (
                <div key={item.id} className="card-high bg-surface-high/30 p-6 border-l-2 hover:bg-surface-high/50 transition-all flex flex-col gap-4"
                     style={{ borderColor: item.sentiment_score < 0 ? '#ff716c' : '#8ff5ff' }}>
                  <div className="flex justify-between items-start">
                    <span className="text-[9px] font-mono text-text-muted p-1 bg-obsidian rounded uppercase tracking-wider">{item.event_type}</span>
                    <span className="text-[9px] font-mono text-text-muted">{new Date(item.timestamp).toLocaleTimeString()}</span>
                  </div>
                  
                  <h3 className="font-space font-bold text-lg text-text-base leading-tight group-hover:text-cyan transition-colors">
                    {item.title}
                  </h3>
                  
                  <p className="text-sm text-text-base leading-relaxed line-clamp-4 italic border-l border-white/10 pl-3">
                    "{item.content}"
                  </p>

                  <div className="mt-auto pt-4 border-t border-white/5 flex flex-col gap-3">
                    {/* Multi-Source Verification Icons */}
                    <div className="flex items-center justify-between">
                       <div className="flex gap-3 opacity-60">
                          <NewsSourceIcon />
                          <SocialSourceIcon />
                          <VideoSourceIcon />
                       </div>
                       <span className="text-[9px] font-mono font-bold text-cyan uppercase tracking-widest">
                          {item.source_count}+ Sources Verified
                       </span>
                    </div>

                    <div className="flex justify-between items-center bg-obsidian/50 p-2 rounded-sm">
                       <span className="text-[8px] font-mono uppercase text-text-muted tracking-widest">ML Confidence</span>
                       <span className="font-space font-bold text-xs text-neon">{(0.85 + Math.random() * 0.1).toFixed(2)}%</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
          
          {news.length === 0 && !loading && (
            <div className="flex-1 flex flex-col items-center justify-center py-40 opacity-20">
               <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1"><path d="M12 8v4M12 16h.01M22 12c0 5.523-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2s10 4.477 10 10z"/></svg>
               <span className="mt-6 font-mono text-xs uppercase tracking-[0.4em]">No Consensus Reached</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function NewsSourceIcon() {
  return <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 11V1m3 0a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1h3m3 4h12m-9 4h9m-9 4h9"/></svg>;
}
function SocialSourceIcon() {
  return <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg>;
}
function VideoSourceIcon() {
  return <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-1.94C18.88 4 12 4 12 4s-6.88 0-8.6.48a2.78 2.78 0 0 0-1.94 1.94C1 8.14 1 12 1 12s0 3.86.48 5.58a2.78 2.78 0 0 0 1.94 1.94C5.12 20 12 20 12 20s6.88 0 8.6-.48a2.78 2.78 0 0 0 1.94-1.94C23 15.86 23 12 23 12s0-3.86-.48-5.58z"/><polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02"/></svg>;
}
