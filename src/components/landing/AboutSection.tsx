"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, MapPin, Briefcase, Code, Users, Mail } from 'lucide-react';

export function AboutSection() {
  return (
    <section id="about" className="py-24 relative z-10 overflow-hidden bg-background-primary border-t border-white/5">
      {/* Ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-gold-primary/[0.03] rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-[1440px] mx-auto px-5 md:px-8 xl:px-12 relative z-10">

        {/* Label */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <div className="section-label mb-4 text-gold-primary">The Developer</div>
          <h2 className="section-headline">
            BUILT BY ONE, <br className="hidden md:block" />
            <span className="text-gold-primary">ENGINEERED FOR MANY.</span>
          </h2>
        </motion.div>

        {/* Card */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="max-w-4xl mx-auto"
        >
          <div className="relative p-8 md:p-12 premium-panel rounded-[2px] overflow-hidden">
            {/* Corner glow */}
            <div className="absolute -top-20 -right-20 w-64 h-64 bg-gold-primary/10 rounded-full blur-[80px] pointer-events-none" />
            <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-gold-bright/5 rounded-full blur-[80px] pointer-events-none" />

            <div className="relative z-10 flex flex-col sm:flex-row items-center sm:items-start gap-10">

              {/* Profile Photo */}
              <div className="shrink-0 flex flex-col items-center">
                <div className="w-32 h-32 md:w-40 md:h-40 rounded-[2px] bg-gradient-to-br from-gold-primary to-gold-primary/20 p-[1px] shadow-[0_0_20px_rgba(197,168,128,0.2)]">
                  <div className="w-full h-full rounded-[2px] overflow-hidden bg-background-primary flex items-center justify-center">
                    <img
                      src="/profile.jpg"
                      alt="Aviral Mishra"
                      className="w-full h-full object-cover"
                      onError={(e: any) => {
                        e.target.style.display = 'none';
                        e.target.parentElement.innerHTML = '<div class="w-full h-full flex items-center justify-center text-4xl font-display font-medium text-gold-primary bg-white/[0.02]">AM</div>';
                      }}
                    />
                  </div>
                </div>

                {/* Open to work */}
                <div className="mt-5">
                  <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-signal-buy/10 border border-signal-buy/30 text-[10px] font-mono font-bold uppercase tracking-widest text-signal-buy rounded-[2px]">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-signal-buy opacity-75" />
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-signal-buy" />
                    </span>
                    OPEN TO WORK
                  </span>
                </div>
              </div>

              {/* Text Content */}
              <div className="flex-1 text-center sm:text-left">
                <h3 className="text-2xl md:text-3xl font-display font-medium text-white mb-2 tracking-tight">
                  Aviral Mishra
                </h3>
                <p className="text-gold-primary font-mono text-xs uppercase tracking-widest mb-6">
                  Full-Stack Developer · Solo Builder
                </p>

                {/* Meta info */}
                <div className="flex flex-wrap justify-center sm:justify-start gap-x-6 gap-y-3 text-xs font-mono text-white/50 mb-6 uppercase tracking-wider">
                  <span className="flex items-center gap-2">
                    <GraduationCap size={14} className="text-gold-primary" />
                    NIT Warangal — MCA '27
                  </span>
                  <span className="flex items-center gap-2">
                    <MapPin size={14} className="text-gold-primary" />
                    Warangal, India
                  </span>
                  <span className="flex items-center gap-2">
                    <Briefcase size={14} className="text-gold-primary" />
                    Full-Stack · AI · Systems
                  </span>
                </div>

                <p className="body-copy max-w-xl text-white/60 mb-8">
                  I'm the solo developer behind GeoStockLive — a high-performance quantitative intelligence platform. I specialize in building low-latency data pipelines, real-time analytics, and enterprise-grade web applications.
                </p>

                {/* Tech pills */}
                <div className="flex flex-wrap justify-center sm:justify-start gap-2 mb-8">
                  {['React/Next.js', 'FastAPI', 'PostgreSQL', 'Redis', 'Kafka', 'WebSockets'].map(tech => (
                    <span key={tech} className="px-3 py-1 bg-white/[0.03] border border-white/[0.08] text-[10px] font-mono uppercase tracking-widest text-white/50 rounded-[2px]">
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Social links */}
                <div className="flex flex-wrap justify-center sm:justify-start gap-3">
                  <a
                    href="https://github.com/AviralNITW"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-5 py-2.5 bg-white/[0.03] border border-white/[0.08] hover:border-gold-primary/50 hover:bg-gold-primary/10 text-xs font-mono uppercase tracking-widest text-white/70 hover:text-gold-primary transition-all duration-200 rounded-[2px]"
                  >
                    <Code size={14} /> GitHub
                  </a>
                  <a
                    href="https://www.linkedin.com/in/aviral-mishra-482325324"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-5 py-2.5 bg-white/[0.03] border border-white/[0.08] hover:border-gold-primary/50 hover:bg-gold-primary/10 text-xs font-mono uppercase tracking-widest text-white/70 hover:text-gold-primary transition-all duration-200 rounded-[2px]"
                  >
                    <Users size={14} /> LinkedIn
                  </a>
                  <a
                    href="mailto:aviralmishra756@gmail.com"
                    className="flex items-center gap-2 px-5 py-2.5 bg-white/[0.03] border border-white/[0.08] hover:border-white/20 text-xs font-mono uppercase tracking-widest text-white/70 hover:text-white transition-all duration-200 rounded-[2px]"
                  >
                    <Mail size={14} /> Contact
                  </a>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
