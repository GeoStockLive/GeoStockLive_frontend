"use client";

import React from "react";
import { motion } from "framer-motion";
import { IntelligenceGlobe } from "./IntelligenceGlobe";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export function HeroSection() {
  return (
    <section className="relative w-full min-h-screen flex items-center pt-20 overflow-hidden bg-background-primary">
      
      {/* Background Architecture */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-grid-pattern radial-mask opacity-40" />
        <div className="absolute top-1/2 left-3/4 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-gold-primary/[0.07] blur-[160px] rounded-full" />
      </div>

      <div className="max-w-[1440px] mx-auto px-5 md:px-8 xl:px-12 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 relative z-10">
        
        {/* Left Side (55%) */}
        <div className="lg:col-span-7 flex flex-col justify-center">
          
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Eyebrow */}
            <div className="flex items-center gap-3 mb-6">
              <div className="w-1.5 h-1.5 rounded-full bg-gold-primary animate-pulse" />
              <span className="font-mono text-[11px] tracking-[0.18em] uppercase text-gold-primary">
                Geopolitical Intelligence System / Live
              </span>
            </div>

            {/* Headline */}
            <h1 className="section-headline mb-8">
              <span className="block overflow-hidden">
                <motion.span 
                  initial={{ y: "100%" }} 
                  animate={{ y: 0 }} 
                  transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                  className="block"
                >
                  FROM GLOBAL CHAOS
                </motion.span>
              </span>
              <span className="block overflow-hidden">
                <motion.span 
                  initial={{ y: "100%" }} 
                  animate={{ y: 0 }} 
                  transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                  className="block"
                >
                  TO MARKET SIGNAL.
                </motion.span>
              </span>
            </h1>

            {/* Subheadline */}
            <p className="body-copy mb-6">
              GeoStockLive transforms live geopolitical events into country-level risk intelligence and quantitative market signals—before information becomes reaction.
            </p>

            {/* Pipeline Flow text */}
            <div className="font-mono text-[11px] md:text-xs text-gold-primary/80 mb-10 tracking-[0.1em] flex items-center gap-3">
              <span>NEWS</span> <ArrowRight className="w-3 h-3" /> 
              <span>SENTIMENT</span> <ArrowRight className="w-3 h-3" /> 
              <span>RISK</span> <ArrowRight className="w-3 h-3" /> 
              <span>SIGNAL</span>
              <span className="ml-4 text-white/50">&lt; 200MS</span>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
              <Link href="/sign-in" className="btn-primary w-full sm:w-auto">
                ENTER GEOSTOCKLIVE <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
              <button 
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById('pipeline')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="btn-secondary w-full sm:w-auto"
              >
                VIEW PIPELINE
              </button>
            </div>
          </motion.div>
          
        </div>

        {/* Right Side (45%) */}
        <div className="lg:col-span-5 h-[50vh] lg:h-[80vh] relative flex items-center justify-end">
          
          {/* Globe */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5, delay: 0.5 }}
            className="absolute top-1/2 left-1/2 -translate-x-[60%] xl:-translate-x-[50%] -translate-y-1/2 w-[500px] h-[500px] md:w-[600px] md:h-[600px] xl:w-[700px] xl:h-[700px] z-0"
          >
            <IntelligenceGlobe />
          </motion.div>

          {/* Telemetry Cards */}
          <div className="relative z-20 flex flex-col gap-4 w-[220px] xl:w-[240px]">
            {/* Event Cluster */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 1 }}
              className="premium-panel p-4 bg-[#030306]/40 backdrop-blur-md border border-white/10 rounded-[2px]"
            >
              <div className="flex justify-between items-center mb-2">
                <div className="font-mono text-[10px] text-text-muted uppercase tracking-wider">Event Cluster</div>
              </div>
              <div className="font-mono text-xs text-text-primary mb-3">LAT 33.89 / LNG 35.50</div>
              <div className="font-mono text-[9px] text-text-muted mb-1 tracking-widest">INTENSITY</div>
              <div className="flex items-center gap-1">
                {[...Array(8)].map((_, i) => (
                  <div key={i} className={`h-1 flex-1 ${i < 6 ? 'bg-gold-primary' : 'bg-gold-primary/30'}`} />
                ))}
                <span className="font-mono text-[9px] text-gold-primary ml-2">HIGH</span>
              </div>
            </motion.div>

            {/* Risk Index */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 1.2 }}
              className="premium-panel p-4 bg-[#030306]/40 backdrop-blur-md border border-white/10 rounded-[2px]"
            >
              <div className="font-mono text-[10px] text-text-muted mb-3 uppercase tracking-wider">Risk Index</div>
              <div className="flex items-baseline gap-3 mb-4">
                <span className="font-display text-4xl text-white">72.4</span>
                <span className="font-mono text-[11px] text-gold-primary flex items-center"><ArrowRight className="w-3 h-3 -rotate-45 mr-1"/> 8.2%</span>
              </div>
              <div className="font-mono text-[9px] text-text-muted flex items-center justify-between">
                <span>TREND (1M)</span>
                <div className="h-[20px] w-[60px] opacity-60">
                   {/* Sparkline placeholder */}
                   <svg viewBox="0 0 100 30" className="w-full h-full stroke-gold-primary fill-none" strokeWidth="2">
                     <path d="M0,25 Q10,25 20,20 T40,25 T60,15 T80,10 T100,5" />
                   </svg>
                </div>
              </div>
            </motion.div>

            {/* Market Impact */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 1.4 }}
              className="premium-panel p-4 bg-[#030306]/40 backdrop-blur-md border border-white/10 rounded-[2px]"
            >
              <div className="font-mono text-[10px] text-text-muted mb-3 uppercase tracking-wider">Market Impact</div>
              <div className="flex items-center justify-between font-mono text-xs">
                <span className="text-white">XAU/USD</span>
                <span className="text-signal-buy">+0.84%</span>
              </div>
            </motion.div>
          </div>

        </div>

      </div>
    </section>
  );
}
