"use client";

import React from "react";
import { motion } from "framer-motion";

const metrics = [
  { value: "147+", label: "LIVE SOURCES", sub: "STREAMING 24/7" },
  { value: "23", label: "COUNTRIES", sub: "MONITORED" },
  { value: "8", label: "AI MODULES", sub: "RUNNING" },
  { value: "< 200ms", label: "SIGNAL LATENCY", sub: "END-TO-END" },
];

export function IntelligenceMetrics() {
  return (
    <section id="intelligence" className="w-full border-y border-white/[0.07] bg-background-secondary/50 backdrop-blur-sm relative z-10">
      <div className="max-w-[1440px] mx-auto px-5 md:px-8 xl:px-12">
        <div className="grid grid-cols-2 md:grid-cols-4">
          
          {metrics.map((metric, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className={`py-12 flex flex-col items-center justify-center text-center ${
                idx !== metrics.length - 1 ? "md:border-r border-white/[0.07]" : ""
              } ${
                idx % 2 === 0 ? "border-r md:border-r-0 border-white/[0.07]" : ""
              } ${
                idx < 2 ? "border-b md:border-b-0 border-white/[0.07]" : ""
              }`}
            >
              <div className="font-display text-4xl lg:text-5xl tracking-tight text-white mb-2">
                {metric.value}
              </div>
              <div className="font-mono text-[10px] tracking-[0.16em] text-white/40 uppercase mb-1">
                {metric.label}
              </div>
              <div className="font-mono text-[9px] tracking-wider text-gold-primary/60 uppercase">
                {metric.sub}
              </div>
            </motion.div>
          ))}
          
        </div>
      </div>
    </section>
  );
}
