"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function GlobalRiskMap() {
  return (
    <section id="map" className="py-24 md:py-32 relative z-10 bg-background-primary border-t border-white/5">
      <div className="max-w-[1440px] mx-auto px-5 md:px-8 xl:px-12">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Left Text */}
          <div className="lg:col-span-4 flex flex-col justify-center">
            <h2 className="section-label mb-4">04 / GLOBAL RISK HEATMAP</h2>
            <h3 className="section-headline mb-6">SEE THE CRISIS BEFORE IT SCALES.</h3>
            <p className="body-copy mb-8">
              Monitor active geopolitical friction points mapped to real-time asset volatility. The system highlights regions where emerging news events are currently impacting local equities or commodity supply chains.
            </p>
            <Link href="/sign-in" className="btn-secondary w-fit">
              ENTER GEOSTOCKLIVE <ArrowRight size={14} className="ml-2 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {/* Right Map/Data area */}
          <div className="lg:col-span-8">
            <div className="premium-panel p-1 rounded-sm w-full">
              <div className="bg-[#07070A] p-6 relative overflow-hidden flex flex-col md:flex-row gap-8 min-h-[400px]">
                
                {/* Global Risk Map Asset */}
                <div className="flex-1 relative flex items-center justify-center">
                   <img src="/assets/risk-map-bg.png" alt="Global Risk Map" className="w-full h-auto object-contain" />
                </div>

                {/* Highest Risk Regions Table */}
                <div className="w-full md:w-64 shrink-0 flex flex-col">
                  <h4 className="font-mono text-[10px] uppercase tracking-widest text-white/40 border-b border-white/10 pb-3 mb-4">HIGHEST RISK REGIONS</h4>
                  <div className="space-y-4 flex-1">
                    {[
                      { id: 1, name: "IRAN", val: 82.4, color: "text-risk-high" },
                      { id: 2, name: "UKRAINE", val: 79.8, color: "text-risk-high" },
                      { id: 3, name: "ISRAEL", val: 75.3, color: "text-risk-medium" },
                      { id: 4, name: "YEMEN", val: 71.6, color: "text-risk-medium" },
                      { id: 5, name: "TAIWAN STRAIT", val: 68.1, color: "text-risk-medium" },
                      { id: 6, name: "N. KOREA", val: 64.2, color: "text-risk-medium" },
                      { id: 7, name: "SUDAN", val: 61.7, color: "text-risk-medium" },
                    ].map((region) => (
                      <div key={region.id} className="flex items-center justify-between font-mono text-xs">
                        <div className="flex items-center gap-3">
                          <span className="text-white/30">{region.id}</span>
                          <span className="text-white/80">{region.name}</span>
                        </div>
                        <span className={region.color}>{region.val.toFixed(1)}</span>
                      </div>
                    ))}
                  </div>
                  <button 
                    onClick={(e) => {
                      e.preventDefault();
                      document.getElementById('map')?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="w-full py-3 mt-4 border border-white/10 bg-white/5 text-[9px] font-mono tracking-widest text-white/60 hover:text-white hover:bg-white/10 transition-colors"
                  >
                    VIEW FULL MAP
                  </button>
                </div>

              </div>
            </div>

            {/* Map Metadata Strip */}
            <div className="grid grid-cols-2 md:grid-cols-4 border border-white/5 bg-white/[0.01] mt-4">
              {[
                { label: "GLOBAL SENTIMENT INDEX", val: "-0.24", isRed: true },
                { label: "ACTIVE EVENT CLUSTERS", val: "38" },
                { label: "HIGH-RISK REGIONS", val: "07" },
                { label: "24H EVENT VELOCITY", val: "+14.2%", isRed: true },
              ].map((m, i) => (
                <div key={i} className={`p-4 ${i !== 3 ? 'border-r border-white/5' : ''}`}>
                  <div className="font-mono text-[9px] tracking-widest text-white/40 mb-2">{m.label}</div>
                  <div className={`font-display text-xl ${m.isRed ? 'text-signal-sell' : 'text-white'}`}>{m.val}</div>
                </div>
              ))}
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
