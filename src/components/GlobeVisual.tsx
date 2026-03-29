'use client';

import React, { useEffect, useState, useRef } from 'react';
import dynamic from 'next/dynamic';

// Dynamic import for the Globe component as it uses browser-only APIs
const Globe = dynamic(() => import('react-globe.gl'), { ssr: false });

const RISK_COLORS = {
  CRITICAL: '#ff716c', // Tactical Red
  ELEVATED: '#fbbf24', // Amber
  GAURDED: '#a8abb3',  // Text Muted
  LOW: '#00fc40',      // Neon Green
};

// Mock risk data by country ISO code (A3)
const COUNTRY_RISK: Record<string, string> = {
  RUS: 'CRITICAL',
  UKR: 'CRITICAL',
  SAU: 'CRITICAL',
  IRN: 'CRITICAL',
  IRQ: 'ELEVATED',
  CHN: 'ELEVATED',
  USA: 'LOW',
  CAN: 'LOW',
  AUS: 'LOW',
  GBR: 'LOW',
  FRA: 'LOW',
  DEU: 'LOW',
  AFG: 'CRITICAL',
  SYR: 'CRITICAL',
  ISR: 'CRITICAL',
  PSE: 'CRITICAL',
};

interface GlobeVisualProps {
  onCountryClick?: (countryName: string) => void;
}

export default function GlobeVisual({ onCountryClick }: GlobeVisualProps) {
  const [countries, setCountries] = useState({ features: [] });
  const globeEl = useRef<any>();

  useEffect(() => {
    // Load GeoJSON data for countries
    fetch('https://raw.githubusercontent.com/vasturiano/react-globe.gl/master/example/datasets/ne_110m_admin_0_countries.geojson')
      .then(res => res.json())
      .then(setCountries);
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
    const risk = COUNTRY_RISK[d.properties.ISO_A3] || 'GAURDED';
    return RISK_COLORS[risk as keyof typeof RISK_COLORS] || RISK_COLORS.GAURDED;
  };

  return (
    <div className="w-full h-full flex items-center justify-center">
      <Globe
        ref={globeEl}
        backgroundColor="rgba(0,0,0,0)"
        showAtmosphere={true}
        atmosphereColor="#8ff5ff"
        atmosphereAltitude={0.15}
        
        // Country Polygons
        polygonsData={countries.features}
        polygonCapColor={getCountryColor}
        polygonSideColor={() => 'rgba(15, 20, 26, 0.4)'}
        polygonStrokeColor={() => '#0a0e14'}
        polygonAltitude={0.01}
        onPolygonClick={(polygon: any) => {
          if (onCountryClick) {
            onCountryClick(polygon.properties.NAME || polygon.properties.ADMIN);
          }
        }}
        
        // Aesthetic
        globeImageUrl="//unpkg.com/three-globe/example/img/earth-night.jpg"
        bumpImageUrl="//unpkg.com/three-globe/example/img/earth-topology.png"
        
        width={600}
        height={600}
      />
    </div>
  );
}

