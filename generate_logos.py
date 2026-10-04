import os
games = [
    ('flappy-bird', 'FB', '#ff7675'),
    ('3d-gta-game', 'GTA', '#74b9ff'),
    ('2d-breakout', 'BRK', '#55efc4'),
    ('3d-game', '3D', '#a29bfe'),
    ('3d-snake', 'SNK', '#ffeaa7'),
    ('design-portfolio', 'DP', '#fd79a8'),
    ('endless-runner', 'RUN', '#00b894')
]
os.makedirs('public/games', exist_ok=True)
svg_template = """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <rect width="100" height="100" rx="20" fill="{color}"/>
  <text x="50" y="55" font-family="Arial" font-size="35" font-weight="bold" fill="white" text-anchor="middle" dominant-baseline="middle">{text}</text>
</svg>"""
for id, text, color in games:
    with open(f'public/games/{id}.svg', 'w') as f:
        f.write(svg_template.format(text=text, color=color))
print('Logos created.')
