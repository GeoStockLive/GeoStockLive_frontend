"use client";

import React from "react";
import { motion } from "framer-motion";

export function PhilosophySection() {
  return (
    <section className="relative w-full h-[70vh] min-h-[500px] flex items-center justify-center bg-background-primary overflow-hidden border-t border-white/5">
      
      {/* Animated Gold Line */}
      <motion.div 
        initial={{ width: 0 }}
        whileInView={{ width: "100%" }}
        transition={{ duration: 1.5, ease: "easeInOut" }}
        viewport={{ once: true, margin: "-100px" }}
        className="absolute bottom-0 left-0 h-[1px] bg-gradient-to-r from-transparent via-gold-primary to-transparent opacity-50" 
      />

      <div className="max-w-5xl mx-auto px-5 text-center flex flex-col md:flex-row items-center justify-center gap-4 md:gap-16">
        
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
    </section>
  );
}
