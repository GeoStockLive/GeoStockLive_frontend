import re

# Fix tailwind.config.js
tailwind_content = """/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: {
          primary: '#030306',
          secondary: '#070709',
          elevated: '#0B0B0F',
        },
        surface: {
          glass: 'rgba(255, 255, 255, 0.035)',
          hover: 'rgba(255, 255, 255, 0.055)',
        },
        border: {
          default: 'rgba(255, 255, 255, 0.08)',
          strong: 'rgba(255, 255, 255, 0.14)',
        },
        gold: {
          primary: '#C5A880',
          bright: '#E0C49A',
          muted: '#806D52',
          glow: 'rgba(197, 168, 128, 0.18)',
        },
        text: {
          primary: '#F4F2EE',
          secondary: '#A3A3A8',
          muted: '#64646B',
        },
        signal: {
          buy: '#6ED6A0',
          sell: '#E87575',
          hold: '#D7B96E',
        },
        risk: {
          low: '#77C7A0',
          medium: '#D7B96E',
          high: '#D97868',
        },
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
      },
      fontFamily: {
        'space-grotesk': ['Space Grotesk', 'sans-serif'],
        'inter': ['Inter', 'sans-serif'],
        'ibm-plex-mono': ['IBM Plex Mono', 'monospace'],
        display: ['Space Grotesk', 'sans-serif'],
        sans: ['Inter', 'sans-serif'],
        mono: ['IBM Plex Mono', 'monospace'],
        space: ['Space Grotesk', 'sans-serif'],
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
"""

with open('tailwind.config.js', 'w') as f:
    f.write(tailwind_content)

dashboard_components_css = """
  .shell { @apply flex w-screen h-screen overflow-hidden bg-obsidian; }
  .main-area { @apply flex flex-col flex-1 min-w-0 h-screen overflow-hidden; }
  .body-viewport { @apply flex flex-1 min-h-0 overflow-hidden; }

  .sidebar {
    @apply flex flex-col items-center py-5 bg-surface-low z-50 flex-shrink-0;
    width: 68px;
  }
  .nav-icon {
    @apply w-10 h-10 flex items-center justify-center rounded cursor-pointer
           text-text-muted transition-all duration-300 hover:text-cyan hover:bg-cyan-dim;
  }
  .nav-icon.active { @apply text-cyan bg-cyan-dim; }

  .dash-header {
    @apply flex items-center justify-between px-8 bg-surface-low flex-shrink-0;
    height: 56px;
    box-shadow: 0 1px 0 rgba(255,255,255,0.04);
  }

  .badge-red    { @apply text-[9px] font-mono uppercase tracking-wide text-tactical bg-tactical/10 px-2 py-0.5 rounded-sm; }
  .badge-green  { @apply text-[9px] font-mono uppercase tracking-wide text-neon bg-neon/10 px-2 py-0.5 rounded-sm; }
  .badge-cyber  { @apply text-[9px] font-mono uppercase tracking-wide text-cyan bg-cyan-dim px-2 py-0.5 rounded-sm; }
  .badge-orange { @apply text-[9px] font-mono uppercase tracking-wide text-amber-400 bg-amber-400/10 px-2 py-0.5 rounded-sm; }

  .btn-cyan {
    @apply w-full py-3.5 font-space font-bold text-[11px] tracking-widest uppercase rounded-sm
           transition-all duration-300 cursor-pointer border-0;
    background: linear-gradient(135deg, #8ff5ff 0%, #00deec 100%);
    color: #001a1c;
  }
  .btn-cyan:hover { box-shadow: 0 0 30px rgba(143,245,255,0.25); filter: brightness(1.08); }

  .btn-outline {
    @apply px-4 py-2 font-mono text-[10px] uppercase tracking-widest text-text-sub
           border border-text-muted/20 rounded-sm transition-all duration-300 cursor-pointer bg-transparent;
  }
  .btn-outline:hover { @apply text-cyan border-cyan/40; }

  .card     { @apply bg-surface-high rounded-sm p-5; }
  .card-low { @apply bg-surface-low rounded-sm p-5; }

  .progress-track       { @apply w-full h-1 bg-surface-highest rounded-full overflow-hidden; }
  .progress-fill-red    { @apply h-full bg-tactical rounded-full; }
  .progress-fill-green  { @apply h-full bg-neon rounded-full; }
  .progress-fill-cyan   { @apply h-full rounded-full; background: linear-gradient(90deg,#8ff5ff,#00deec); }

  .risk-critical { @apply bg-tactical/20 text-tactical border border-tactical/30; }
  .risk-elevated { @apply bg-amber-500/20 text-amber-400 border border-amber-500/30; }
  .risk-guarded  { @apply bg-surface-bright text-text-sub border border-text-muted/20; }
  .risk-low      { @apply bg-neon/10 text-neon border border-neon/20; }

  .signal-card { @apply bg-surface-low p-4 relative transition-all duration-300 cursor-pointer; }
  .signal-card:hover { @apply bg-surface-high; }

  .section-title { @apply font-space font-bold text-text-base uppercase tracking-tight; }
"""

dashboard_utilities_css = """
  .font-space { font-family: 'Space Grotesk', sans-serif; }
  .text-glow-cyan { text-shadow: 0 0 20px rgba(143,245,255,0.5); }
"""

dashboard_keyframes_css = """
@keyframes pulse-ring {
  0%,100% { transform: scale(1); opacity: 0.4; }
  50% { transform: scale(1.03); opacity: 0.8; }
}
.animate-pulse-ring { animation: pulse-ring 3s ease-in-out infinite; }

@keyframes scan-v { 0% { top: 0; } 100% { top: 100%; } }
.animate-scan { animation: scan-v 5s linear infinite; }
"""

with open('src/app/globals.css', 'r') as f:
    globals_content = f.read()

# Insert components
globals_content = globals_content.replace(
    "@layer components {", 
    "@layer components {\\n" + dashboard_components_css
)

# Insert utilities
globals_content = globals_content.replace(
    "@layer utilities {", 
    "@layer utilities {\\n" + dashboard_utilities_css
)

# Append keyframes
globals_content += "\\n" + dashboard_keyframes_css

with open('src/app/globals.css', 'w') as f:
    f.write(globals_content)

print("Styles restored successfully!")
