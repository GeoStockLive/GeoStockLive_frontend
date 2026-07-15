import { SignUp } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function SignUpPage() {
  return (
    <main className="min-h-screen bg-background-primary flex flex-col relative overflow-hidden">
      
      {/* Background styling matching the terminal aesthetic */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-grid-pattern radial-mask opacity-40" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gold-primary/[0.04] blur-[120px] rounded-full" />
      </div>

      {/* Top Navbar Area for Login */}
      <div className="relative z-10 w-full p-8 flex justify-between items-center">
        <Link href="/" className="flex items-center gap-2 text-text-secondary hover:text-white transition-colors text-xs font-mono tracking-widest uppercase">
          <ArrowLeft size={14} /> Back to Hub
        </Link>
        <div className="flex items-center gap-3">
          <div className="text-text-primary font-display font-medium tracking-tight text-xl flex items-center">
            GEO<span className="text-gold-primary px-0.5">°</span>STOCK <span className="text-text-muted mx-2">/</span> LIVE
          </div>
        </div>
      </div>

      {/* Main Authentication Box */}
      <div className="flex-1 flex items-center justify-center relative z-10 px-4">
        <div className="premium-panel p-1 rounded-sm shadow-2xl shadow-gold-primary/5">
          <SignUp 
            fallbackRedirectUrl="/pulse"
            forceRedirectUrl="/pulse"
            appearance={{
              baseTheme: dark,
              variables: {
                colorPrimary: '#E0B569', // gold-primary
                colorBackground: '#07070A', // background-primary
                colorInputBackground: '#FFFFFF08',
                colorInputText: '#FFFFFF',
                fontFamily: 'var(--font-inter)',
                fontFamilyButtons: 'var(--font-mono)',
                borderRadius: '2px',
              },
              elements: {
                card: "bg-transparent shadow-none border-none",
                headerTitle: "font-display text-2xl text-white",
                headerSubtitle: "font-mono text-[10px] text-text-muted tracking-widest uppercase",
                socialButtonsBlockButton: "border border-white/10 hover:border-gold-primary/40 bg-white/5 hover:bg-gold-primary/10 transition-all font-mono text-xs text-white",
                dividerLine: "bg-white/10",
                dividerText: "font-mono text-[10px] text-text-muted",
                formFieldLabel: "font-mono text-[10px] text-white/60 tracking-widest uppercase",
                formFieldInput: "border-white/10 focus:border-gold-primary focus:ring-gold-primary/20",
                formButtonPrimary: "bg-gold-primary text-[#030306] hover:bg-gold-bright font-mono text-xs tracking-widest uppercase transition-all",
                footerActionText: "font-sans text-xs text-text-muted",
                footerActionLink: "font-sans text-xs text-gold-primary hover:text-gold-bright",
              }
            }}
          />
        </div>
      </div>

    </main>
  );
}
