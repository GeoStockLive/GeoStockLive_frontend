'use client';
import { useState } from 'react';
import Sidebar from '@/components/Sidebar';
import Header from '@/components/Header';
import IntelligencePanel from '@/components/IntelligencePanel';
import GlobeSentinel from '@/components/GlobeSentinel';

export default function DashboardPage() {
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);

  return (
    <div className="shell">
      <Sidebar />
      <div className="main-area">
        <Header subtitle="Terminal ID 6T-1" />
        <div className="body-viewport">
          <GlobeSentinel onCountryClick={(name) => setSelectedCountry(name)} />
          <IntelligencePanel selectedCountry={selectedCountry} />
        </div>
      </div>
    </div>
  );
}
