"""Trace the approved original scenes into native SVG paths using VTracer 0.6.15.

Run from the website root with an isolated VTracer installation on PYTHONPATH.
Source PNGs provide color detail; the approved SVG wrappers provide the alpha masks.
Then run optimize-traced-illustrations.mjs with an isolated SVGO 4.1.0 installation.
"""
import base64
import io
import json
import re
import tempfile
import xml.etree.ElementTree as ET
from pathlib import Path

import vtracer
from PIL import Image, ImageFilter

TARGET = Path('design-source/renewal-illustrations/homepage-v3-sharmi')
NAMES = ['renewal-results', 'quote-effort', 'response-speed', 'first-results']
SCALE = 3
OPTIONS = dict(
    colormode='color', hierarchical='stacked', mode='spline',
    filter_speckle=12, color_precision=7, layer_difference=8,
    corner_threshold=90, length_threshold=6, max_iterations=10,
    splice_threshold=45, path_precision=3,
)

for name in NAMES:
    original = Image.open(f'design-source/renewal-illustrations/homepage-v2/{name}-v1.png').convert('RGBA')
    wrapper = ET.parse(TARGET / f'{name}-original-transparent.svg').getroot()
    embedded = wrapper.find('{http://www.w3.org/2000/svg}image')
    approved = Image.open(io.BytesIO(base64.b64decode(embedded.attrib['href'].split(',', 1)[1]))).convert('RGBA')
    size = (original.width * SCALE, original.height * SCALE)
    # Slight color smoothing removes compression/texture noise. A separate binary
    # alpha resize avoids adding an opaque fringe around the transparent cutout.
    prepared = original.convert('RGB').filter(ImageFilter.GaussianBlur(.25)).resize(size, Image.Resampling.LANCZOS).convert('RGBA')
    prepared.putalpha(approved.getchannel('A').resize(size, Image.Resampling.NEAREST))
    output = TARGET / f'{name}-traced-v1.svg'
    with tempfile.TemporaryDirectory(prefix='swotbee-trace-') as temporary:
        raster = Path(temporary) / 'trace-input.png'
        prepared.save(raster)
        vtracer.convert_image_to_svg_py(str(raster), str(output), **OPTIONS)
    svg = output.read_text()
    svg = svg.replace(f'width="{size[0]}" height="{size[1]}"', f'width="{original.width}" height="{original.height}" viewBox="0 0 {size[0]} {size[1]}"')
    if re.search(r'<image\b|data:image|<foreignObject\b', svg, re.I):
        raise RuntimeError(f'Non-vector content in {output}')
    output.write_text(svg)
    print(json.dumps({'name': name, 'paths': svg.count('<path'), 'bytes_before_optimization': output.stat().st_size}), flush=True)
