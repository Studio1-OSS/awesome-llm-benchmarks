import os
import re

files = [
    r'd:\New folder (3)\llm-arena\site\src\LandingPage.tsx',
    r'd:\New folder (3)\llm-arena\site\src\Blog.tsx',
    r'd:\New folder (3)\llm-arena\site\src\ContentPage.tsx'
]

replacements = {
    'Benchmarks': '/dashboard',
    'Methodologies': '/methodologies',
    'About': '/about',
    'Contributors': '/contributors',
    'Documentation': '/documentation',
    'Updates': '/updates',
    'FAQ': '/faq',
    'Privacy Policy': '/privacy',
    'Terms of Service': '/terms',
}

for filepath in files:
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    for name, path in replacements.items():
        pattern = r'<Link to="[^"]*"([^>]*)>' + re.escape(name) + r'</Link>'
        replacement = f'<Link to="{path}"\\1>{name}</Link>'
        content = re.sub(pattern, replacement, content)

    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)

print('Updated footer links in all files.')
