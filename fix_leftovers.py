import os
import glob

files = glob.glob('src/components/**/*.tsx', recursive=True)

for filepath in files:
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    original = content
    
    # Replace hardcoded cyan hex codes with gold hex codes
    content = content.replace('#8ff5ff', '#C5A880')
    content = content.replace('#00deec', '#E0C49A')
    
    # Replace obsidian with background-primary (or the text equivalent)
    content = content.replace('bg-obsidian', 'bg-background-primary')
    content = content.replace('text-obsidian', 'text-[#030306]')
    
    # Replace cyan references
    content = content.replace('shadow-cyan-md', 'shadow-gold-md') # Assuming shadow-cyan exists, wait we don't have shadow-gold-md, let's just replace with a generic or remove
    content = content.replace('animate-pulse-cyan', 'animate-pulse-gold')
    content = content.replace('rgba(143,245,255,0.04)', 'rgba(197,168,128,0.04)')
    content = content.replace('rgba(143,245,255,0.5)', 'rgba(197,168,128,0.5)')
    
    if content != original:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f'Updated {filepath}')

# Remove brand from Sidebar.tsx
with open('src/components/Sidebar.tsx', 'r', encoding='utf-8') as f:
    sidebar = f.read()

import re
# Regex to remove the Brand div. It looks like:
#      {/* Brand */}
#      <div className="w-9 h-9 mb-8 flex-shrink-0 animate-pulse-gold"
#           style={{ background: '#8ff5ff', display:'flex', alignItems:'center', justifyContent:'center' }}>
#        <div style={{ width:12, height:12, background:'#0a0e14' }} />
#      </div>
sidebar = re.sub(r'\{\/\*\s*Brand\s*\*\/\}.*?<\/div>\s*<\/div>', '', sidebar, flags=re.DOTALL)
with open('src/components/Sidebar.tsx', 'w', encoding='utf-8') as f:
    f.write(sidebar)
print('Removed Brand from Sidebar.tsx')

