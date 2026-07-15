"use client";

import React, { useEffect, useState } from "react";
import { motion, useScroll } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { useAuth, UserButton } from "@clerk/nextjs";

export function Navbar() {
  const { scrollY } = useScroll();
  const [isScrolled, setIsScrolled] = useState(false);
  const { isSignedIn } = useAuth();

  useEffect(() => {
    const unsubscribe = scrollY.on("change", (latest) => {
      setIsScrolled(latest > 50);
    });
    return () => unsubscribe();
  }, [scrollY]);

  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id.replace('#', ''));
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled ? "bg-black/40 backdrop-blur-xl border-b border-white/[0.06]" : "bg-transparent"
      }`}
    >
      <div className="max-w-[1440px] mx-auto px-8 xl:px-12 h-20 flex items-center justify-between">
        
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="text-text-primary font-display font-medium tracking-tight text-xl flex items-center">
            GEO<span className="text-gold-primary px-0.5">°</span>STOCK <span className="text-text-muted mx-2">/</span> LIVE
          </div>
          <div className="w-1.5 h-1.5 rounded-full bg-gold-primary animate-pulse" />
        </div>

        {/* Links */}
        <nav className="hidden md:flex items-center gap-10">
          {["Intelligence", "Pipeline", "Signals", "Pricing", "About"].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              onClick={(e) => handleScroll(e, `#${item.toLowerCase()}`)}
              className="text-sm font-sans text-text-secondary hover:text-white transition-colors duration-300"
            >
              {item}
            </a>
          ))}
        </nav>

        {/* CTA */}
        <div className="flex items-center gap-4">
          <AuthButtons />
        </div>

      </div>
    </motion.header>
  );
}

function AuthButtons() {
  const { isLoaded, isSignedIn } = useAuth();

  if (!isLoaded) {
    return <div className="h-10 w-40 bg-white/5 animate-pulse rounded-[3px]" />;
  }

  if (!isSignedIn) {
    return (
      <Link 
        href="/sign-in"
        className="h-10 px-6 border border-gold-primary/40 bg-gold-primary/[0.06] text-gold-bright hover:bg-gold-primary hover:text-[#030306] transition-all duration-500 rounded-[3px] text-xs font-mono uppercase tracking-widest flex items-center gap-2"
      >
        Launch Terminal
        <ArrowUpRight className="w-3.5 h-3.5" />
      </Link>
    );
  }

  return (
    <>
      <Link 
        href="/pulse"
        className="h-10 px-6 border border-gold-primary/40 bg-gold-primary/[0.06] text-gold-bright hover:bg-gold-primary hover:text-[#030306] transition-all duration-500 rounded-[3px] text-xs font-mono uppercase tracking-widest flex items-center gap-2"
      >
        Dashboard
        <ArrowUpRight className="w-3.5 h-3.5" />
      </Link>
      <UserButton appearance={{
        elements: {
          userButtonAvatarBox: "w-10 h-10 border-2 border-gold-primary/20",
        }
      }}/>
    </>
  );
}
