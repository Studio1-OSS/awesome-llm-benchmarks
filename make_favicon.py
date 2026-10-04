import os
from PIL import Image, ImageDraw

input_path = r"d:\New folder (3)\llm-arena\public\image.png"
output_path = r"d:\New folder (3)\llm-arena\public\favicon.ico"

img = Image.open(input_path).convert("RGBA")
size = min(img.size)
# Crop to square first to ensure nice corners
img = img.crop(((img.width - size) // 2, (img.height - size) // 2, (img.width + size) // 2, (img.height + size) // 2))

# Curve edges by 20%
radius = int(size * 0.2)
mask = Image.new('L', img.size, 0)
draw = ImageDraw.Draw(mask)
draw.rounded_rectangle([(0, 0), img.size], radius=radius, fill=255)

rounded_img = Image.new('RGBA', img.size)
rounded_img.paste(img, (0, 0), mask)

icon_sizes = [(16, 16), (32, 32), (48, 48), (64, 64), (128, 128), (256, 256)]
rounded_img.save(output_path, format='ICO', sizes=icon_sizes)
print("Successfully generated curved favicon.ico")
