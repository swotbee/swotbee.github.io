"""Preserve original RGB artwork in SVG containers; mask verified cream background."""
import base64
import io
import json
from pathlib import Path

import numpy as np
from PIL import Image, ImageDraw

source_dir = Path('design-source/renewal-illustrations/homepage-v2')
target_dir = Path('design-source/renewal-illustrations/homepage-v3-sharmi')
names = ['renewal-results', 'quote-effort', 'response-speed', 'first-results']
report = []
for name in names:
    source = source_dir / f'{name}-v1.webp'
    rgb = Image.open(source).convert('RGB')
    pixels = np.array(rgb).astype(np.int16)
    r, g, b = pixels[:, :, 0], pixels[:, :, 1], pixels[:, :, 2]
    cream = (r > 232) & (g > 224) & (b > 203) & (r - g < 28) & (g - b < 36)
    # Flood from an added border so every edge-connected cream region is removed.
    padded = np.pad(cream.astype(np.uint8) * 255, 1, constant_values=255)
    flood = Image.fromarray(padded).copy()
    ImageDraw.floodfill(flood, (0, 0), 128)
    # Verified negative spaces enclosed by the character and props.
    gaps = {'renewal-results': [(380, 600)], 'quote-effort': [(520, 900), (130, 515)], 'first-results': [(500, 1050)]}
    for x, y in gaps.get(name, []):
        if flood.getpixel((x + 1, y + 1)) == 255:
            ImageDraw.floodfill(flood, (x + 1, y + 1), 128)
    background = np.array(flood)[1:-1, 1:-1] == 128
    alpha = np.where(background, 0, 255).astype(np.uint8)
    rgba = np.dstack((np.array(rgb), alpha))
    raster = io.BytesIO()
    Image.fromarray(rgba).save(raster, format='PNG', optimize=True)
    image_data = base64.b64encode(raster.getvalue()).decode('ascii')
    width, height = rgb.size
    svg = f'''<svg xmlns="http://www.w3.org/2000/svg" width="{width}" height="{height}" viewBox="0 0 {width} {height}">
<title>{name.replace('-', ' ')}: original artwork</title>
<desc>Original raster artwork preserved inside an SVG container. Original RGB pixels are unchanged; only border-connected cream background receives transparency. This is not an editable vector trace.</desc>
<image width="{width}" height="{height}" href="data:image/png;base64,{image_data}"/>
</svg>
'''
    output = target_dir / f'{name}-original-transparent.svg'
    output.write_text(svg)
    rgba = np.dstack((np.array(rgb), alpha))
    Image.fromarray(rgba).save(f'/tmp/swotbee-original-{name}-transparent.png')
    report.append({'name': name, 'width': width, 'height': height, 'background_removed_percent': round(float(background.mean() * 100), 2), 'svg_bytes': output.stat().st_size, 'original_rgb_pixels_preserved': True})
Path('/tmp/swotbee-original-svg-mask-report.json').write_text(json.dumps(report, indent=2))
print(json.dumps(report, indent=2))
