import React from "react";
import { Navbar } from "@/components/landing/Navbar";
import { HeroSection } from "@/components/landing/HeroSection";
import { IntelligenceMetrics } from "@/components/landing/IntelligenceMetrics";
import { PipelineSection } from "@/components/landing/PipelineSection";
import { LiveSignalHUD } from "@/components/landing/LiveSignalHUD";
import { GlobalRiskMap } from "@/components/landing/GlobalRiskMap";
import { ArchitectureSection } from "@/components/landing/ArchitectureSection";
import { PricingSection } from "@/components/landing/PricingSection";
import { AboutSection } from "@/components/landing/AboutSection";

import { FinalCTA } from "@/components/landing/FinalCTA";
import { Footer } from "@/components/landing/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-background-primary text-text-primary selection:bg-gold-primary/20 selection:text-gold-bright">
      <Navbar />
      <HeroSection />
      <IntelligenceMetrics />
      <PipelineSection />
      <LiveSignalHUD />
      <GlobalRiskMap />
      <ArchitectureSection />
      <PricingSection />
      <AboutSection />
      <FinalCTA />
      <Footer />
    </main>
  );
}
