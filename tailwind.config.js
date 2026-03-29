/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        obsidian: '#0a0e14',
        'surface-low': '#0f141a',
        'surface-high': '#1b2028',
        'surface-highest': '#20262f',
        'surface-bright': '#262c36',
        cyan: { DEFAULT: '#8ff5ff', dim: 'rgba(143,245,255,0.12)' },
        neon: '#00fc40',
        tactical: '#ff716c',
        'text-base': '#f1f3fc',
        'text-sub': '#a8abb3',
        'text-muted': '#51555d',
      },
      fontFamily: {
        space: ['Space Grotesk', 'sans-serif'],
        inter: ['Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'Consolas', 'monospace'],
      },
      animation: {
        'pulse-cyan': 'pulse-cyan 2s infinite',
        'signal': 'signal-pulse 1.5s infinite ease-in-out',
        'spin-slow': 'spin 20s linear infinite',
        'spin-reverse': 'spin-reverse 30s linear infinite',
        'scan': 'scan-line 5s linear infinite',
        'slide-in-right': 'slide-in-right 0.4s ease-out',
        'slide-in-left': 'slide-in-left 0.4s ease-out',
        'fade-up': 'fade-up 0.5s ease-out',
        'glow-pulse': 'glow-pulse 3s ease-in-out infinite',
        'bar-fill': 'bar-fill 1s ease-out forwards',
        'float': 'float 6s ease-in-out infinite',
        'count-up': 'count-up 0.3s ease-out',
      },
      keyframes: {
        'pulse-cyan': {
          '0%': { boxShadow: '0 0 0 0 rgba(143,245,255,0.5)' },
          '70%': { boxShadow: '0 0 0 8px rgba(143,245,255,0)' },
          '100%': { boxShadow: '0 0 0 0 rgba(143,245,255,0)' },
        },
        'signal-pulse': {
          '0%,100%': { opacity: '1' },
          '50%': { opacity: '0.35' },
        },
        'spin-reverse': {
          from: { transform: 'rotate(360deg)' },
          to: { transform: 'rotate(0deg)' },
        },
        'scan-line': {
          '0%': { top: '-10%' },
          '100%': { top: '110%' },
        },
        'slide-in-right': {
          from: { opacity: '0', transform: 'translateX(24px)' },
          to: { opacity: '1', transform: 'translateX(0)' },
        },
        'slide-in-left': {
          from: { opacity: '0', transform: 'translateX(-24px)' },
          to: { opacity: '1', transform: 'translateX(0)' },
        },
        'fade-up': {
          from: { opacity: '0', transform: 'translateY(16px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        'glow-pulse': {
          '0%,100%': { boxShadow: '0 0 20px rgba(143,245,255,0.08)' },
          '50%': { boxShadow: '0 0 40px rgba(143,245,255,0.2)' },
        },
        'bar-fill': {
          from: { width: '0%' },
          to: { width: 'var(--bar-width)' },
        },
        'float': {
          '0%,100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        'pulse-ring': {
          '0%,100%': { transform: 'scale(1)', opacity: '0.5' },
          '50%': { transform: 'scale(1.04)', opacity: '1' },
        },
      },
      boxShadow: {
        'cyan-sm': '0 0 12px rgba(143,245,255,0.2)',
        'cyan-md': '0 0 30px rgba(143,245,255,0.25)',
        'cyan-lg': '0 0 60px rgba(143,245,255,0.15)',
        'tactical': '0 0 20px rgba(255,113,108,0.3)',
        'neon': '0 0 20px rgba(0,252,64,0.3)',
        'panel': '-1px 0 0 rgba(255,255,255,0.04)',
        'header': '0 1px 0 rgba(255,255,255,0.04)',
      },
      backdropBlur: {
        tactical: '16px',
      },
    },
  },
  plugins: [],
};
