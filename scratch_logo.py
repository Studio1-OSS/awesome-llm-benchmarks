import os, base64
from PIL import Image

input_path = r'd:\New folder (3)\llm-arena\site\public\icon.png'
webp_path = r'd:\New folder (3)\llm-arena\site\public\icon-white.webp'
svg_path = r'd:\New folder (3)\llm-arena\site\public\icon-white.svg'

# Load image and make white silhouette
img = Image.open(input_path).convert('RGBA')
white_rgb = Image.new('L', img.size, 255)
_, _, _, a = img.split()
img_white = Image.merge('RGBA', (white_rgb, white_rgb, white_rgb, a))

# Save as WebP
img_white.save(webp_path, 'WEBP')

# Save as SVG (embedding the PNG base64 data)
import io
buffered = io.BytesIO()
img_white.save(buffered, format='PNG')
img_str = base64.b64encode(buffered.getvalue()).decode()

svg_data = f'''<svg width="{img.width}" height="{img.height}" xmlns="http://www.w3.org/2000/svg">
  <image href="data:image/png;base64,{img_str}" width="{img.width}" height="{img.height}"/>
</svg>'''

with open(svg_path, 'w') as f:
    f.write(svg_data)

print('Generated WebP and SVG')
