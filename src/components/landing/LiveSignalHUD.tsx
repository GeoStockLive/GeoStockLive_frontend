"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

export function LiveSignalHUD() {
  const [confidence, setConfidence] = useState(0);

  useEffect(() => {
    // Animate confidence 0 to 91.4
    let current = 0;
    const interval = setInterval(() => {
      current += 1.5;
      if (current >= 91.4) {
        setConfidence(91.4);
        clearInterval(interval);
      } else {
        setConfidence(current);
      }
    }, 20);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="signals" className="py-24 md:py-32 relative z-10 bg-background-secondary">
      <div className="max-w-[1440px] mx-auto px-5 md:px-8 xl:px-12 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        
        {/* Left Side Copy */}
        <div>
          <div className="section-label mb-4">03 / LIVE SIGNAL INTELLIGENCE</div>
          <h2 className="section-headline mb-8 text-white max-w-lg">
            THE MARKET DOESN'T <br/>
            WAIT FOR THE HEADLINE.
          </h2>
          <p className="body-copy mb-8">
            Neither does GeoStockLive. Every geopolitical event is converted into structured risk intelligence and mapped against market exposure in real time.
          </p>
          <div className="space-y-6">
            {[
              { title: "REAL-TIME SIGNALS", desc: "Updated in under 200ms." },
              { title: "QUANTITATIVE EDGE", desc: "Data, not opinion." },
              { title: "ACTIONABLE INTEL", desc: "Built for traders, by traders." }
            ].map((feature, i) => (
              <div key={i} className="flex items-start gap-4">
                <div className="w-6 h-6 rounded-full border border-gold-primary/30 flex items-center justify-center shrink-0 mt-0.5">
                  <div className="w-1.5 h-1.5 bg-gold-primary rounded-full" />
                </div>
                <div>
                  <h4 className="font-mono text-xs uppercase tracking-widest text-white mb-1">{feature.title}</h4>
                  <p className="text-sm text-white/50">{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Side HUD */}
        <div className="premium-panel p-1 rounded-sm">
          <div className="bg-[#050508] p-6 md:p-8 relative overflow-hidden">
            
            {/* Top Bar */}
            <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-6">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-signal-buy animate-pulse" />
                <span className="font-mono text-[10px] text-white/60 tracking-widest">SYSTEM LIVE</span>
              </div>
              <span className="font-mono text-[10px] text-white/40">14:32:08 UTC</span>
            </div>

            {/* Main Signal */}
            <div className="mb-10">
              <div className="font-mono text-[10px] text-white/40 mb-1">ASSET</div>
              <div className="font-display text-3xl text-white mb-4">XAU/USD</div>
              
              <div className="flex items-end gap-6 mb-4">
                <div>
                  <div className="font-mono text-[10px] text-white/40 mb-1">SIGNAL</div>
                  <div className="font-display text-5xl text-signal-buy">BUY</div>
                </div>
                <div className="pb-1">
                  <div className="font-mono text-[10px] text-white/40 mb-1">CONFIDENCE</div>
                  <div className="font-display text-3xl text-white">{confidence.toFixed(1)}%</div>
                </div>
              </div>

              {/* Confidence Bar */}
              <div className="flex gap-1 h-2 w-full max-w-sm">
                {[...Array(20)].map((_, i) => (
                  <div 
                    key={i} 
                    className={`flex-1 h-full rounded-sm ${i < (confidence / 5) ? 'bg-signal-buy' : 'bg-white/10'}`} 
                  />
                ))}
              </div>
            </div>

            {/* Risk Vectors */}
            <div className="mb-10">
              <div className="font-mono text-[10px] text-white/40 mb-4 tracking-widest border-b border-white/10 pb-2">RISK VECTORS</div>
              <div className="space-y-3">
                {[
                  { label: "Geopolitical Risk", val: 82, filled: 16 },
                  { label: "Supply Risk", val: 74, filled: 14 },
                  { label: "Currency Pressure", val: 51, filled: 10 },
                  { label: "Event Velocity", val: 91, filled: 18 },
                ].map((v, i) => (
                  <div key={i} className="flex items-center justify-between font-mono text-xs">
                    <span className="text-white/60 w-40">{v.label}</span>
                    <div className="flex gap-1">
                      {[...Array(20)].map((_, j) => (
                        <div key={j} className={`w-1.5 h-2 ${j < v.filled ? 'bg-gold-primary' : 'bg-white/10'}`} />
                      ))}
                    </div>
                    <span className="text-white w-6 text-right">{v.val}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Signal Trace */}
            <div>
              <div className="font-mono text-[10px] text-white/40 mb-4 tracking-widest border-b border-white/10 pb-2">SIGNAL TRACE</div>
              <div className="font-mono text-[10px] space-y-2 text-white/50">
                <div className="flex gap-4"><span className="text-white/30">14:31:59</span> <span>Event cluster detected</span></div>
                <div className="flex gap-4"><span className="text-white/30">14:32:01</span> <span>Negative sentiment confirmed</span></div>
                <div className="flex gap-4"><span className="text-white/30">14:32:04</span> <span>Regional risk score increased</span></div>
                <div className="flex gap-4"><span className="text-white/30">14:32:07</span> <span>Gold exposure correlation detected</span></div>
                <div className="flex gap-4 text-signal-buy"><span className="text-signal-buy/50">14:32:08</span> <span>BUY signal generated</span></div>
              </div>
            </div>
            
          </div>
        </div>

      </div>
    </section>
  );
}
