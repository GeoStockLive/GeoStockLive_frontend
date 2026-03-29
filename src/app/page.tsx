'use client';
import { useState } from 'react';
import Sidebar from '@/components/Sidebar';
import Header from '@/components/Header';
import IntelligencePanel from '@/components/IntelligencePanel';
import GlobeSentinel from '@/components/GlobeSentinel';
import AlertPanel from '@/components/AlertPanel';
import AlertToast from '@/components/AlertToast';
import { useWebSocket } from '@/hooks/useWebSocket';

export default function DashboardPage() {
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
  const [isAlertPanelOpen, setIsAlertPanelOpen] = useState(false);
  const { alerts, isConnected } = useWebSocket();

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
          <GlobeSentinel onCountryClick={(name) => setSelectedCountry(name)} />
          <IntelligencePanel selectedCountry={selectedCountry} />
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

