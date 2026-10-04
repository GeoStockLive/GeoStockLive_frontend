import type { NextConfig } from "next";

const nextConfig: any = {
  // Turbopack for faster dev builds
  turbopack: {
    root: ".",
  },

  // Optimize heavy package imports — reduces bundle size via tree-shaking
  experimental: {
    optimizePackageImports: ['lucide-react', 'framer-motion', 'd3-geo', 'react-simple-maps'],
  },

  // Image optimization
  images: {
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 60 * 60 * 24 * 30, // 30 days cache
  },

  // Enable gzip/brotli compression
  compress: true,

  // Disable source maps in production (smaller payload)
  productionBrowserSourceMaps: false,

  // Security + caching headers
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'DENY' },
        ],
      },
      {
        // Long-term caching for static assets
        source: '/(.*)\\.(js|css|png|jpg|jpeg|svg|ico|woff|woff2)',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
        ],
      },
    ];
  },
};

export default nextConfig;
