import re
import os

files = [
    r'site\src\App.tsx',
    r'site\src\LandingPage.tsx',
    r'site\src\Blog.tsx',
    r'site\src\ContentPage.tsx',
    r'site\src\LlmRace.tsx'
]

# The sleek filled Zap SVG
OLD_SVG = r'<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="currentColor" stroke="none" className="opacity-90 group-hover:opacity-100 transition-opacity"><path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 9.81h6a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14.19H5a1 1 0 0 1-1-.19z"/></svg>'

# The Trophy SVG which perfectly describes a leaderboard/race
NEW_SVG = '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="opacity-90 group-hover:opacity-100 transition-opacity"><path d="M10 14.66V17a1 1 0 0 1-1 1 2 2 0 0 0-2 2v2"></path><path d="M14 14.66V17a1 1 0 0 0 1 1 2 2 0 0 1 2 2v2"></path><path d="M17.916 10H19.5A2.5 2.5 0 0 0 22 7.5V5a1 1 0 0 0-1-1h-3"></path><path d="M4 22h16"></path><path d="M6 9a6 6 0 0 0 12 0V3a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1z"></path><path d="M6.084 10H4.5A2.5 2.5 0 0 1 2 7.5V5a1 1 0 0 1 1-1h3"></path></svg>'

for filepath in files:
    if not os.path.exists(filepath): continue
    
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # Replace exactly
    if OLD_SVG in content:
        content = content.replace(OLD_SVG, NEW_SVG)
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"Improved SVG in {filepath}")

print("Done replacing Zap with Trophy!")
