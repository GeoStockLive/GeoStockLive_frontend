"use client";

import React from "react";
import { ArrowRight, Database, Server, Cpu, LayoutDashboard } from "lucide-react";

export function ArchitectureSection() {
  return (
    <section id="architecture" className="py-24 md:py-32 relative z-10 bg-background-secondary border-t border-white/5">
      <div className="max-w-[1440px] mx-auto px-5 md:px-8 xl:px-12 grid grid-cols-1 lg:grid-cols-12 gap-16">
        
        {/* Left Side */}
        <div className="lg:col-span-4 flex flex-col justify-center">
          <div className="section-label mb-4">05 / ARCHITECTURE</div>
          <h2 className="section-headline mb-6">
            BUILT FOR VELOCITY. <br/>
            ENGINEERED FOR SIGNAL.
          </h2>
          <p className="body-copy mb-10">
            A modern event-driven intelligence architecture designed for low-latency processing, persistent risk modeling and real-time signal delivery.
          </p>
          <button 
            onClick={(e) => {
              e.preventDefault();
              document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="btn-secondary w-fit text-[10px]"
          >
            TECH STACK <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Right Diagram */}
        <div className="lg:col-span-8 flex items-center justify-center">
          <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
            
            {/* Layer 1: Ingestion */}
            <div className="premium-panel p-6 flex flex-col items-center text-center h-full">
              <Database className="w-6 h-6 text-white/40 mb-4" />
              <div className="font-mono text-[10px] uppercase tracking-widest text-white mb-2">DATA SOURCES &<br/>INGESTION LAYER</div>
              <div className="text-xs text-white/40">24/7 Live Feeds<br/>Stream Normalization</div>
            </div>

            <div className="hidden md:flex justify-center text-white/20"><ArrowRight className="w-5 h-5" /></div>

            {/* Layer 2: Core (Takes 2 cols on md) */}
            <div className="md:col-span-2 grid grid-cols-1 gap-4">
              <div className="premium-panel p-6 border-gold-primary/20 bg-gold-primary/[0.02] flex flex-col items-center text-center">
                <Cpu className="w-6 h-6 text-gold-primary mb-4" />
                <div className="font-mono text-[10px] uppercase tracking-widest text-gold-primary mb-2">FASTAPI<br/>INTELLIGENCE CORE</div>
                <div className="text-xs text-white/40">8 AI MODULES<br/>&lt;200MS PROCESSING</div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="premium-panel p-4 flex flex-col items-center text-center">
                  <div className="font-mono text-[9px] uppercase tracking-widest text-white mb-1">PostgreSQL</div>
                  <div className="text-[10px] text-white/40">Historical Risk</div>
                </div>
                <div className="premium-panel p-4 flex flex-col items-center text-center">
                  <div className="font-mono text-[9px] uppercase tracking-widest text-white mb-1">Redis</div>
                  <div className="text-[10px] text-white/40">Real-Time Cache</div>
                </div>
              </div>
            </div>

            <div className="hidden md:flex justify-center text-white/20"><ArrowRight className="w-5 h-5" /></div>

            {/* Layer 3: Terminal */}
            <div className="premium-panel p-6 flex flex-col items-center text-center h-full">
              <LayoutDashboard className="w-6 h-6 text-white/40 mb-4" />
              <div className="font-mono text-[10px] uppercase tracking-widest text-white mb-2">NEXT.JS 14<br/>INTELLIGENCE TERMINAL</div>
              <div className="text-xs text-white/40">Real-Time UI<br/>Alerts</div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
