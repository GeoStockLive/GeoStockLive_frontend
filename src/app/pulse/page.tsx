'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@clerk/nextjs';
import Sidebar from '@/components/Sidebar';
import Header from '@/components/Header';
import IntelligencePanel from '@/components/IntelligencePanel';
import GlobeSentinel from '@/components/GlobeSentinel';
import PortfolioPanel from '@/components/PortfolioPanel';
import AlertPanel from '@/components/AlertPanel';
import AlertToast from '@/components/AlertToast';
import { useWebSocket } from '@/hooks/useWebSocket';

export default function PulsePage() {
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
  const [isAlertPanelOpen, setIsAlertPanelOpen] = useState(false);
  const [hasMounted, setHasMounted] = useState(false);
  const { alerts, isConnected } = useWebSocket();
  const router = useRouter();
  const { isLoaded, isSignedIn } = useAuth();

  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      router.push('/sign-in');
    }
  }, [isLoaded, isSignedIn, router]);

  // MOUNT GUARD: Prevents Hydration Mismatch by ensuring client-only logic only renders on browser
  useEffect(() => {
    setHasMounted(true);
    (window as any).SELECT_COUNTRY = (name: string) => {
      console.info(`[CONSOLE] Manually setting country: ${name}`);
      setSelectedCountry(name);
    };
    return () => { delete (window as any).SELECT_COUNTRY; };
  }, []);

  const handleCountrySelection = (name: string) => {
    console.info(`[PAGE] Selection event processed: ${name}`);
    setSelectedCountry(name);
  };

  if (!isLoaded || !isSignedIn) {
    return (
      <div className="min-h-screen bg-[#07070A] flex flex-col items-center justify-center">
        <div className="text-cyan font-mono text-[10px] animate-pulse uppercase tracking-[0.3em]">
          Verifying Authorization...
        </div>
      </div>
    );
  }

  return (
    <div className="shell">
      <Sidebar />
      <div className="main-area">
        <Header 
          subtitle={isConnected ? "LIVE_UPLINK_6T-1" : "SYNCING_6T-1"} 
          onAlertClick={() => setIsAlertPanelOpen(!isAlertPanelOpen)}
          unreadAlertCount={alerts.length}
        />
        <div className="body-viewport">
          {hasMounted ? (
            <>
              <GlobeSentinel onCountryClick={handleCountrySelection} />
              
              {/* Right Side Panels (Intelligence + Portfolio) */}
              <div className="flex flex-col w-80 h-full border-l border-surface-high bg-background-secondary flex-shrink-0 z-10 shadow-2xl shadow-black">
                 {/* Intelligence Panel (Top 60%) */}
                 <div className="h-[60%] overflow-hidden">
                    <IntelligencePanel selectedCountry={selectedCountry} />
                 </div>
                 
                 {/* Portfolio Panel (Bottom 40%) */}
                 <div className="h-[40%] border-t border-surface-high overflow-hidden bg-background-primary/50">
                    <PortfolioPanel />
                 </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-cyan font-mono text-[10px] animate-pulse uppercase tracking-[0.3em]">
                Initialising Neural Uplink...
              </div>
            </div>
          )}
        </div>
      </div>
      
      {/* Global Overlays */}
      <AlertPanel 
        alerts={alerts} 
        isOpen={isAlertPanelOpen} 
        onClose={() => setIsAlertPanelOpen(false)} 
      />
      <AlertToast />
    </div>
  );
}

