"use client";

import React from "react";
import { MessageSquare, Briefcase, GitBranch, Mail } from "lucide-react";

export function Footer() {
  return (
    <footer className="w-full bg-background-secondary pt-24 pb-8 border-t border-white/5 relative z-10">
      <div className="max-w-[1440px] mx-auto px-5 md:px-8 xl:px-12">
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-20">
          
          <div className="md:col-span-2">
            <div className="text-white font-display font-medium tracking-tight text-lg flex items-center mb-4">
              GEO<span className="text-gold-primary px-0.5">°</span>STOCK <span className="text-text-muted mx-2">/</span> LIVE
            </div>
            <p className="font-mono text-[10px] uppercase tracking-widest text-white/40 max-w-xs leading-relaxed">
              REAL-TIME GEOPOLITICAL<br/>MARKET INTELLIGENCE
            </p>
          </div>

          <div>
            <h4 className="font-mono text-[10px] uppercase tracking-widest text-gold-primary mb-6">PLATFORM</h4>
            <ul className="space-y-4 font-sans text-sm text-white/50">
              <li><a href="#" className="hover:text-white transition-colors">Intelligence</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Pipeline</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Signals</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Pricing</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-mono text-[10px] uppercase tracking-widest text-gold-primary mb-6">SYSTEM</h4>
            <ul className="space-y-4 font-sans text-sm text-white/50">
              <li><a href="#" className="hover:text-white transition-colors">API Status</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Architecture</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Documentation</a></li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="font-mono text-[10px] text-white/40">
            © 2026 GEOSTOCKLIVE
          </div>
          
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.02] border border-white/5">
            <span className="font-mono text-[9px] uppercase tracking-widest text-white/60">SYSTEM OPERATIONAL</span>
            <div className="w-1.5 h-1.5 rounded-full bg-signal-buy animate-pulse" />
          </div>

          <div className="flex items-center gap-6 text-white/40">
            <a href="#" className="hover:text-white transition-colors"><MessageSquare className="w-4 h-4" /></a>
            <a href="#" className="hover:text-white transition-colors"><Briefcase className="w-4 h-4" /></a>
            <a href="#" className="hover:text-white transition-colors"><GitBranch className="w-4 h-4" /></a>
            <a href="#" className="hover:text-white transition-colors"><Mail className="w-4 h-4" /></a>
          </div>
        </div>

      </div>
    </footer>
  );
}
