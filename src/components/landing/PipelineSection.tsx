"use client";

import React from "react";
import { motion } from "framer-motion";
import { Globe, BrainCircuit, ShieldAlert, Zap } from "lucide-react";

const pipelineStages = [
  {
    id: "01",
    title: "INGEST",
    subtitle: "THE WORLD",
    desc: "Live global news streams enter the pipeline continuously. Noise is filtered. Events are normalized. Intelligence begins.",
    icon: Globe,
    meta: [
      { label: "STATUS", value: "STREAMING", isGreen: true },
      { label: "SOURCES", value: "147+" },
      { label: "QUEUE", value: "ACTIVE" },
    ]
  },
  {
    id: "02",
    title: "NLP BRAIN",
    subtitle: "UNDERSTAND THE EVENT.",
    desc: "The NLP layer extracts sentiment, entities, countries, event intensity and geopolitical context from unstructured information.",
    icon: BrainCircuit,
    meta: [
      { label: "SENTIMENT", value: "-0.82", isRed: true },
      { label: "COUNTRY", value: "IR", isGold: true },
      { label: "SEVERITY", value: "HIGH" },
    ]
  },
  {
    id: "03",
    title: "RISK ENGINE",
    subtitle: "QUANTIFY THE RISK.",
    desc: "Country-level sentiment becomes a dynamic risk score, weighted by event severity, recency, confidence and market exposure.",
    icon: ShieldAlert,
    meta: [
      { label: "GEOPOLITICAL RISK", value: "" },
      { label: "INDEX", value: "72.4", isGold: true, large: true },
      { label: "TREND", value: "+8.2% / 1H" },
    ]
  },
  {
    id: "04",
    title: "SIGNAL GEN",
    subtitle: "CONVERT RISK INTO ACTION.",
    desc: "Risk intelligence is mapped against asset exposure to generate quantitative BUY, SELL and HOLD signals.",
    icon: Zap,
    meta: [
      { label: "XAU/USD", value: "BUY", isGreen: true },
      { label: "BRENT", value: "BUY", isGreen: true },
      { label: "EUR/USD", value: "SELL", isRed: true },
    ]
  }
];

export function PipelineSection() {
  return (
    <section id="pipeline" className="py-24 md:py-32 xl:py-40 relative z-10 overflow-hidden bg-background-primary">
      <div className="max-w-[1440px] mx-auto px-5 md:px-8 xl:px-12">
        
        {/* Header */}
        <div className="mb-20">
          <div className="section-label mb-4">02 / INTELLIGENCE ARCHITECTURE</div>
          <h2 className="section-headline mb-6 max-w-3xl">
            THE DISTANCE BETWEEN <br/>
            EVENT AND ACTION: <span className="text-gold-primary">200MS.</span>
          </h2>
          <p className="body-copy">
            An eight-module intelligence pipeline continuously ingests global information, extracts geopolitical sentiment, calculates country-level exposure, and converts risk into actionable market signals.
          </p>
        </div>

        {/* Pipeline Diagram */}
        <div className="relative">
          
          {/* Animated Data Rail (Horizontal Line) */}
          <div className="absolute top-1/2 left-0 w-full h-[1px] bg-white/5 hidden lg:block -translate-y-1/2 z-0">
            {/* Animated Packets */}
            <motion.div 
              className="absolute top-1/2 -translate-y-1/2 left-0 flex gap-2 items-center text-[9px] font-mono text-gold-bright"
              animate={{ x: ["0%", "800%"], opacity: [0, 1, 1, 0] }}
              transition={{ duration: 6, ease: "linear", repeat: Infinity }}
            >
              <div className="w-1.5 h-1.5 bg-gold-bright shadow-[0_0_10px_#C5A880]" />
              EVENT_1298
            </motion.div>
            <motion.div 
              className="absolute top-1/2 -translate-y-1/2 left-0 flex gap-2 items-center text-[9px] font-mono text-signal-sell"
              animate={{ x: ["0%", "800%"], opacity: [0, 1, 1, 0] }}
              transition={{ duration: 5, ease: "linear", repeat: Infinity, delay: 2 }}
            >
              <div className="w-1.5 h-1.5 bg-signal-sell shadow-[0_0_10px_#E87575]" />
              SENTIMENT_-0.82
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
            {pipelineStages.map((stage, idx) => (
              <motion.div 
                key={stage.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: idx * 0.15 }}
                className="premium-panel p-6 md:p-8 flex flex-col h-full group"
              >
                <div className="w-10 h-10 rounded border border-white/10 bg-white/5 flex items-center justify-center mb-8 group-hover:border-gold-primary/30 group-hover:text-gold-primary transition-colors text-white/50">
                  <stage.icon className="w-5 h-5" />
                </div>
                
                <div className="flex items-center gap-2 mb-2">
                  <span className="font-mono text-[10px] text-gold-primary">{stage.id} /</span>
                  <h3 className="font-mono text-xs uppercase tracking-widest text-white">{stage.title}</h3>
                </div>
                
                <p className="text-[10px] uppercase tracking-widest text-white/40 mb-4">{stage.subtitle}</p>
                <p className="text-sm text-white/50 leading-relaxed mb-8 flex-1">{stage.desc}</p>
                
                {/* Meta Terminal Data */}
                <div className="mt-auto space-y-2 border-t border-white/5 pt-4">
                  {stage.meta.map((m, i) => (
                    <div key={i} className="flex items-center justify-between font-mono text-[10px]">
                      <span className="text-white/30">{m.label}</span>
                      <span className={`
                        ${m.isGreen ? "text-signal-buy" : ""}
                        ${m.isRed ? "text-signal-sell" : ""}
                        ${m.isGold ? "text-gold-primary" : ""}
                        ${!m.isGreen && !m.isRed && !m.isGold ? "text-white" : ""}
                        ${m.large ? "text-2xl font-display" : ""}
                      `}>
                        {m.value}
                      </span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
