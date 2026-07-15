"use client";

import React, { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";

// Dynamically import Globe to avoid SSR issues with Three.js
const Globe = dynamic(() => import("react-globe.gl"), { ssr: false });

export function IntelligenceGlobe() {
  const globeRef = useRef<any>();
  const [dimensions, setDimensions] = useState({ width: 600, height: 600 });
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    
    // Setup dimensions based on container
    const handleResize = () => {
      const container = document.getElementById("globe-container");
      if (container) {
        setDimensions({
          width: container.clientWidth,
          height: container.clientHeight
        });
      }
    };
    
    window.addEventListener('resize', handleResize);
    setTimeout(handleResize, 100);
    
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (globeRef.current) {
      // Auto-rotate safely
      if (typeof globeRef.current.controls === 'function' && globeRef.current.controls()) {
        globeRef.current.controls().autoRotate = true;
        globeRef.current.controls().autoRotateSpeed = 0.5;
        globeRef.current.controls().enableZoom = false;
      }
      
      if (typeof globeRef.current.pointOfView === 'function') {
        globeRef.current.pointOfView({ altitude: 2.2 });
      }

      // Transparent Material safely
      if (typeof globeRef.current.globeMaterial === 'function') {
        const globeMaterial = globeRef.current.globeMaterial();
        if (globeMaterial) {
          globeMaterial.transparent = true;
          globeMaterial.opacity = 0.1;
          globeMaterial.color = { set: () => {} }; // Safely ignore if no THREE
        }
      }
    }
  }, [isClient]);

  const [countries, setCountries] = useState({ features: [] });

  useEffect(() => {
    // Fetch country boundaries
    fetch('https://raw.githubusercontent.com/vasturiano/react-globe.gl/master/example/datasets/ne_110m_admin_0_countries.geojson')
      .then(res => res.json())
      .then(setCountries)
      .catch(err => console.error("Could not load countries", err));
  }, []);

  // Mock data for 12 traveling arcs
  const arcsData = [
    { startLat: 33.89, startLng: 35.50, endLat: 40.71, endLng: -74.00, color: '#D97868' },
    { startLat: 50.45, startLng: 30.52, endLat: 52.52, endLng: 13.40, color: '#C5A880' },
    { startLat: 40.71, startLng: -74.00, endLat: 51.50, endLng: -0.12, color: '#F5D061' },
    { startLat: 25.20, startLng: 55.27, endLat: 1.35, endLng: 103.81, color: '#C5A880' },
    { startLat: 35.67, startLng: 139.65, endLat: 37.77, endLng: -122.41, color: '#D97868' },
    { startLat: -23.55, startLng: -46.63, endLat: 40.71, endLng: -74.00, color: '#C5A880' },
    { startLat: 55.75, startLng: 37.61, endLat: 39.90, endLng: 116.40, color: '#F5D061' },
    { startLat: 28.61, startLng: 77.20, endLat: 51.50, endLng: -0.12, color: '#D97868' },
    { startLat: 1.35, startLng: 103.81, endLat: -33.86, endLng: 151.20, color: '#C5A880' },
    { startLat: 48.85, startLng: 2.35, endLat: 30.04, endLng: 31.23, color: '#D97868' },
    { startLat: 39.90, startLng: 116.40, endLat: 35.67, endLng: 139.65, color: '#F5D061' },
    { startLat: -33.86, startLng: 151.20, endLat: -23.55, endLng: -46.63, color: '#C5A880' },
  ];

  if (!isClient) return <div className="w-full h-full bg-transparent" />;

  return (
    <div id="globe-container" className="w-full h-full flex items-center justify-center relative z-10">
      <div className="absolute inset-0 bg-gold-primary/[0.03] blur-[100px] rounded-full pointer-events-none" />
      <Globe
        ref={globeRef}
        width={dimensions.width}
        height={dimensions.height}
        backgroundColor="rgba(0,0,0,0)"
        showGlobe={true}
        
        // Country Boundaries
        polygonsData={countries.features}
        polygonCapColor={() => 'rgba(0,0,0,0)'}
        polygonSideColor={() => 'rgba(0,0,0,0)'}
        polygonStrokeColor={() => '#C5A880'} // Golden boundaries
        
        // Aesthetics
        atmosphereColor="#D9A05B"
        atmosphereAltitude={0.15}
        
        // Arcs
        arcsData={arcsData}
        arcColor="color"
        arcDashLength={0.4}
        arcDashGap={0.2}
        arcDashAnimateTime={2500}
        arcStroke={0.6}
      />
    </div>
  );
}
