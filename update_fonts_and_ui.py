import os
import re

css_filepath = r'd:\New folder (3)\llm-arena\site\src\index.css'
with open(css_filepath, 'r', encoding='utf-8') as f:
    css_content = f.read()

# 1. Update --font-sans to remove Switzer, and add --font-heading
# Find: --font-sans: 'Switzer', ui-sans-serif, system-ui, sans-serif;
# Replace with: 
#   --font-sans: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
#   --font-heading: 'Switzer', sans-serif;

css_content = re.sub(
    r"--font-sans:\s*'Switzer',\s*ui-sans-serif,\s*system-ui,\s*sans-serif;",
    "--font-sans: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif;\n  --font-heading: 'Switzer', sans-serif;",
    css_content
)

# 2. Add global styling for headings in @layer base
# Wait, let's just replace the whole @layer base block to be safe or inject it.
if 'h1, h2, h3, h4, h5, h6 {' not in css_content:
    layer_base_replacement = '''@layer base {
  h1, h2, h3, h4, h5, h6 {
    @apply font-heading;
  }
  * {'''
    css_content = css_content.replace('@layer base {\n  * {', layer_base_replacement)

with open(css_filepath, 'w', encoding='utf-8') as f:
    f.write(css_content)

# 3. Remove hover zoom and translation effects from Blog.tsx
blog_filepath = r'd:\New folder (3)\llm-arena\site\src\Blog.tsx'
with open(blog_filepath, 'r', encoding='utf-8') as f:
    blog_content = f.read()

# Remove hover:-translate-y-1
blog_content = blog_content.replace('hover:-translate-y-1', '')

# Remove group-hover:scale-105
blog_content = blog_content.replace('group-hover:scale-105', '')

# Remove group-hover:translate-x-1 from the arrow
blog_content = blog_content.replace('group-hover:translate-x-1', '')

# Remove transition-transform duration-700
blog_content = blog_content.replace('transition-transform duration-700', '')



with open(blog_filepath, 'w', encoding='utf-8') as f:
    f.write(blog_content)

# 4. Same for ContentPage.tsx just in case there are headings
content_filepath = r'd:\New folder (3)\llm-arena\site\src\ContentPage.tsx'
# Actually they don't have zoom effects, but I should ensure headings are font-heading if I used specific classes.
# But I styled h1,h2 globally in index.css so it's fine.
