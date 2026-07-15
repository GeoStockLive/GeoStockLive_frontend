'use client';

import React, { useEffect, useState, useRef } from 'react';
import dynamic from 'next/dynamic';
import { RISK_COLORS } from '../utils/risk-logic';

// Dynamic import for the Globe component as it uses browser-only APIs
const Globe = dynamic(() => import('react-globe.gl'), { ssr: false });

// Standardized colors move to utils, using them here
const LOCAL_RISK_COLORS = {
  CRITICAL: RISK_COLORS.HIGH,
  ELEVATED: RISK_COLORS.MEDIUM,
  LOW: RISK_COLORS.LOW,
  UNKNOWN: '#1e293b', // Slate-800 for data gaps
};

// Note: COUNTRY_RISK removed in favor of dynamic API fetch
interface RiskData {
  [countryName: string]: number; // score 0 to 1
}

interface GlobeVisualProps {
  onCountryClick?: (countryName: string) => void;
}

export default function GlobeVisual({ onCountryClick }: GlobeVisualProps) {
  const [countries, setCountries] = useState({ features: [] });
  const [riskScores, setRiskScores] = useState<RiskData>({});
  const globeEl = useRef<any>(null);

  useEffect(() => {
    // Load GeoJSON data for countries
    fetch('https://raw.githubusercontent.com/vasturiano/react-globe.gl/master/example/datasets/ne_110m_admin_0_countries.geojson')
      .then(res => res.json())
      .then(setCountries);

    // Fetch real ML-predicted risk scores from backend
    const apiBase = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
    fetch(`${apiBase}/risk/`)
      .then(res => res.json())
      .then(data => {
        console.log('[GLOBE] Received initial risk scores:', data);
        setRiskScores(data);
      })
      .catch(err => console.error('[GLOBE] Failed to sync risk data:', err));

    // Listen for real-time risk updates from WebSocket
    const handleRiskUpdate = (event: any) => {
      const { country, risk_score } = event.detail;
      if (country && risk_score !== undefined) {
        setRiskScores(prev => ({
          ...prev,
          [country]: risk_score
        }));
      }
    };
    
    window.addEventListener('gt-risk-update', handleRiskUpdate);
    return () => {
      window.removeEventListener('gt-risk-update', handleRiskUpdate);
    };
  }, []);

  useEffect(() => {
    if (globeEl.current) {
      // Auto-rotate setting - DISABLED as per user request
      globeEl.current.controls().autoRotate = false;
      globeEl.current.controls().autoRotateSpeed = 0.5;
      
      // Enable zoom and pan for manual rotation
      globeEl.current.controls().enableZoom = true;
      globeEl.current.controls().enablePan = false;
      
      // Initial point of view
      globeEl.current.pointOfView({ lat: 20, lng: 0, altitude: 2 }, 1000);
    }
  }, [globeEl.current]);

  const getCountryColor = (d: any) => {
    const name = d.properties.NAME || d.properties.ADMIN;
    const score = riskScores[name]; // backend returns {"CountryName": score}
    
    // Default to LOW (Green) if no specific score found, ensuring all countries are colored
    if (score === undefined) return RISK_COLORS.LOW;
    
    // Internal color mapping
    if (score >= 0.7) return RISK_COLORS.HIGH;
    if (score >= 0.4) return RISK_COLORS.MEDIUM;
    return RISK_COLORS.LOW;
  };

  return (
    <div className="w-full h-full flex items-center justify-center">
      <Globe
        ref={globeEl}
        backgroundColor="rgba(0,0,0,0)"
        showAtmosphere={true}
        atmosphereColor="#C5A880"
        atmosphereAltitude={0.15}
        
        // Country Polygons
        polygonsData={countries.features}
        polygonCapColor={getCountryColor}
        polygonSideColor={() => 'rgba(15, 20, 26, 0.4)'}
        polygonStrokeColor={() => '#0a0e14'}
        // Interaction
        onPolygonClick={(polygon: any) => {
          const name = polygon?.properties?.NAME || polygon?.properties?.name || polygon?.properties?.ADMIN || polygon?.properties?.admin;
          console.info(`[GLOBE] Selection event fired for: ${name}`);
          
          if (typeof window !== 'undefined') {
            (window as any)._LAST_SELECTION = name;
            document.body.setAttribute('data-last-selection', name);
          }

          if (name && onCountryClick) {
            onCountryClick(name);
          }
        }}
        onGlobeClick={() => {
          console.info('[GLOBE] Background clicked - NOT clearing selection.');
        }}
        
        // Aesthetic
        globeImageUrl="//unpkg.com/three-globe/example/img/earth-night.jpg"
        bumpImageUrl="//unpkg.com/three-globe/example/img/earth-topology.png"
        
        width={500}
        height={500}
      />
    </div>
  );
}

