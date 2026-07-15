import re

# globals.css replacements
with open('src/app/globals.css', 'r') as f:
    css = f.read()

css = css.replace('bg-obsidian', 'bg-background-primary')
css = css.replace('bg-surface-low', 'bg-background-secondary')
css = css.replace('bg-surface-high', 'bg-background-elevated')
css = css.replace('bg-surface-highest', 'bg-background-elevated')
css = css.replace('bg-surface-bright', 'bg-white/5')
css = css.replace('text-cyan', 'text-gold-primary')
css = css.replace('hover:text-cyan', 'hover:text-gold-primary')
css = css.replace('bg-cyan-dim', 'bg-gold-primary/10')
css = css.replace('border-cyan/40', 'border-gold-primary/40')
css = css.replace('border-cyan/30', 'border-gold-primary/30')
css = css.replace('border-cyan', 'border-gold-primary')
css = css.replace('rgba(143,245,255', 'rgba(197,168,128')
css = css.replace('#8ff5ff', '#C5A880')
css = css.replace('#00deec', '#E0C49A')
css = css.replace('text-glow-cyan', 'text-glow-gold')
css = css.replace('animate-pulse-cyan', 'animate-pulse-gold')

with open('src/app/globals.css', 'w') as f:
    f.write(css)

# Header.tsx replacements
with open('src/components/Header.tsx', 'r') as f:
    header = f.read()

header = header.replace('bg-cyan/10 border border-cyan/30', 'bg-gold-primary/10 border border-gold-primary/30')
header = header.replace('text-cyan', 'text-gold-primary')
header = header.replace('hover:text-cyan', 'hover:text-gold-primary')
header = header.replace('border-cyan/30', 'border-gold-primary/30')
header = header.replace('bg-cyan/5', 'bg-gold-primary/5')
header = header.replace('hover:bg-cyan/10', 'hover:bg-gold-primary/10')

logo_old = '<span className="font-space font-bold text-base tracking-tighter text-text-base uppercase">GEOSTOCKLIVE</span>'
logo_new = '<div className="text-text-primary font-display font-medium tracking-tight text-xl flex items-center">GEO<span className="text-gold-primary px-0.5">°</span>STOCK <span className="text-text-muted mx-2">/</span> LIVE</div>'
header = header.replace(logo_old, logo_new)

with open('src/components/Header.tsx', 'w') as f:
    f.write(header)

# Sidebar.tsx replacements
with open('src/components/Sidebar.tsx', 'r') as f:
    sidebar = f.read()

sidebar = sidebar.replace('bg-surface-low', 'bg-background-secondary')
sidebar = sidebar.replace('text-cyan', 'text-gold-primary')
sidebar = sidebar.replace('hover:text-cyan', 'hover:text-gold-primary')
sidebar = sidebar.replace('animate-pulse-cyan', 'animate-pulse-gold')

logo_old_sidebar = """      <div className="w-9 h-9 mb-8 flex-shrink-0 animate-pulse-cyan"
           style={{ background: '#8ff5ff', display:'flex', alignItems:'center', justifyContent:'center' }}>
        <div style={{ width:12, height:12, background:'#0a0e14' }} />
      </div>"""
logo_new_sidebar = """      <div className="w-9 h-9 mb-8 flex-shrink-0 animate-pulse-gold rounded-sm border border-gold-primary/30 bg-gold-primary/10"
           style={{ display:'flex', alignItems:'center', justifyContent:'center' }}>
        <span className="font-space font-bold text-lg text-gold-primary">G</span>
      </div>"""

if logo_old_sidebar in sidebar:
    sidebar = sidebar.replace(logo_old_sidebar, logo_new_sidebar)
else:
    # Fallback if already modified
    pass

with open('src/components/Sidebar.tsx', 'w') as f:
    f.write(sidebar)

print("Theme updated successfully!")
