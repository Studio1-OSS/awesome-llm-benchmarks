import os
import re

filepath = r'd:\New folder (3)\llm-arena\site\src\ContentPage.tsx'
with open(filepath, 'r', encoding='utf-8') as f:
    content = f.read()

use_effect_scroll = '''
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);
'''

content = re.sub(r'(\}\s*,\s*\[\]\s*;\s*)', r'\1' + use_effect_scroll, content)

back_pattern = r'<Link\s+to="/"\s+className="[^"]*"\s*>\s*<svg.*?</svg>\s*Back to Home\s*</Link>'
content = re.sub(back_pattern, '', content, flags=re.DOTALL)

with open(filepath, 'w', encoding='utf-8') as f:
    f.write(content)


blog_path = r'd:\New folder (3)\llm-arena\site\src\Blog.tsx'
with open(blog_path, 'r', encoding='utf-8') as f:
    blog_content = f.read()

blog_back_pattern = r'<Link\s+to="/blog"\s+className="[^"]*"\s*>\s*<svg.*?</svg>\s*Back to Blog\s*</Link>'
blog_content = re.sub(blog_back_pattern, '', blog_content, flags=re.DOTALL)

with open(blog_path, 'w', encoding='utf-8') as f:
    f.write(blog_content)
