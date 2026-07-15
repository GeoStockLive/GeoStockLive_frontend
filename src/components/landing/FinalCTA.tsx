"use client";

import React from "react";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";

export function FinalCTA() {
  return (
    <section className="relative w-full overflow-hidden bg-background-primary border-t border-white/5">
      
      {/* 06 / PHILOSOPHY PART */}
      <div className="relative max-w-5xl mx-auto px-5 pt-32 pb-24 flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16 z-10">
        
        {/* Section Label */}
        <div className="absolute top-12 left-5 md:-left-20 xl:-left-40">
           <div className="section-label">06 / OUR PHILOSOPHY</div>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center md:text-right"
        >
          <h2 className="font-display text-2xl md:text-4xl lg:text-5xl font-medium tracking-tight text-white/60 leading-tight">
            NEWS TELLS YOU <br className="hidden md:block" />
            WHAT HAPPENED.
          </h2>
        </motion.div>

        <div className="hidden md:block w-[1px] h-32 bg-white/10" />

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-center md:text-left"
        >
          <h2 className="font-display text-2xl md:text-4xl lg:text-5xl font-medium tracking-tight text-white leading-tight">
            INTELLIGENCE TELLS YOU <br className="hidden md:block" />
            <span className="text-gold-primary">WHAT IT CHANGES.</span>
          </h2>
        </motion.div>
      </div>

      {/* Animated Gold Line Divider */}
      <div className="relative w-full h-[2px] flex justify-center z-20">
        <motion.div 
          initial={{ width: 0 }}
          whileInView={{ width: "100%" }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
          viewport={{ once: true, margin: "-100px" }}
          className="h-full bg-gradient-to-r from-transparent via-gold-primary to-transparent opacity-80" 
          style={{ boxShadow: "0 0 20px 2px rgba(197,168,128,0.4)" }}
        />
        {/* Center glowing dot */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-gold-bright rounded-full shadow-[0_0_10px_2px_rgba(255,230,160,0.8)]" />
      </div>

      {/* 07 / GET STARTED PART */}
      <div className="relative w-full py-24 md:py-32 flex items-center">
        {/* Background Graphic Globe */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[1200px] max-w-[150vw] pointer-events-none z-0">
          <img src="/assets/footer-globe.png" alt="Globe Horizon" className="w-full h-auto object-contain opacity-80 mix-blend-screen" />
        </div>

        <div className="max-w-[1440px] mx-auto px-5 md:px-8 xl:px-12 w-full relative z-10 flex flex-col md:flex-row justify-between items-end gap-12">
          
          <div className="w-full md:w-auto">
            <div className="section-label mb-4">07 / GET STARTED</div>
            <h2 className="section-headline mb-6">
              THE WORLD MOVES <br/>
              BEFORE THE MARKET DOES.
            </h2>
            <p className="body-copy mb-10">
              Track geopolitical risk. Understand market exposure. <br className="hidden sm:block"/> Generate intelligence at machine speed.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto relative z-10">
              <Link href="/sign-in" className="btn-primary w-full sm:w-auto">
                ENTER GEOSTOCKLIVE <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
              <button 
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById('architecture')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="btn-secondary w-full sm:w-auto"
              >
                VIEW SYSTEM ARCHITECTURE
              </button>
            </div>
          </div>

          {/* Telemetry metadata in corner */}
          <div className="hidden lg:flex flex-col items-end text-right">
            <div className="font-mono text-xs text-white/50 mb-6">
              17.3850° N<br/>78.4867° E
            </div>
            <div className="font-mono text-[10px] uppercase tracking-widest text-white/40 mb-2">SYSTEM STATUS</div>
            <div className="flex items-center gap-2 mb-6">
              <span className="font-mono text-[11px] text-signal-buy">OPERATIONAL</span>
              <div className="w-2 h-2 rounded-full bg-signal-buy animate-pulse" />
            </div>
            <div className="font-mono text-[10px] uppercase tracking-widest text-white/40 mb-1">UPTIME</div>
            <div className="font-mono text-sm text-white">99.98%</div>
          </div>

        </div>
      </div>
    </section>
  );
}
