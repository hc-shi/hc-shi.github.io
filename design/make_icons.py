"""Rasterise the slab-serif H from src/app/icon.svg into favicon.ico (16, 32) and apple-icon.png (180).

src/app/icon.svg is the source of truth; keep RECTS in sync with it. Run from the repo root:
    python3 design/make_icons.py
"""
from PIL import Image, ImageDraw

PAPER = (255, 255, 255)
ACCENT = (45, 106, 79)
# (x, y, width, height) on the 64x64 grid of icon.svg
RECTS = [(17, 14, 8, 36), (39, 14, 8, 36), (25, 29, 14, 6),
         (12, 12, 18, 4), (12, 48, 18, 4), (34, 12, 18, 4), (34, 48, 18, 4)]


def render(size: int, rounded: bool) -> Image.Image:
    scale = 8 * size / 64  # draw large, then downsample for smooth edges
    big = round(64 * scale)
    im = Image.new("RGBA", (big, big), (0, 0, 0, 0))
    draw = ImageDraw.Draw(im)
    if rounded:
        draw.rounded_rectangle([0, 0, big - 1, big - 1], radius=12 * scale, fill=PAPER)
    else:  # iOS rounds the corners itself
        draw.rectangle([0, 0, big - 1, big - 1], fill=PAPER)
    for x, y, w, h in RECTS:
        draw.rectangle([x * scale, y * scale, (x + w) * scale - 1, (y + h) * scale - 1], fill=ACCENT)
    return im.resize((size, size), Image.LANCZOS)


render(180, rounded=False).convert("RGB").save("src/app/apple-icon.png")
render(32, rounded=True).save("src/app/favicon.ico", sizes=[(16, 16), (32, 32)])
print("wrote src/app/apple-icon.png and src/app/favicon.ico")
