"""Smooth the v1 vector paths and their external silhouettes without redrawing.

Run from website root with isolated VTracer 0.6.15 on PYTHONPATH and Inkscape 1.2.2.
All output artwork and clipping boundaries are native SVG paths.
"""
import base64
import io
import json
import os
import subprocess
import tempfile
import xml.etree.ElementTree as ET
from pathlib import Path

import vtracer
from PIL import Image, ImageFilter

TARGET = Path('design-source/renewal-illustrations/homepage-v3-sharmi')
SVG = 'http://www.w3.org/2000/svg'
ET.register_namespace('', SVG)

def profile(directory, threshold):
    directory.mkdir(exist_ok=True)
    (directory / 'preferences.xml').write_text(
        f'<inkscape version="1.0"><group id="options">'
        f'<group id="simplifythreshold" value="{threshold}"/>'
        '<group id="simplifyjustcoalesce" value="0"/></group></inkscape>'
    )
    environment = os.environ.copy()
    environment['INKSCAPE_PROFILE_DIR'] = str(directory)
    return environment

def simplify(source, output, environment):
    subprocess.run([
        'inkscape', str(source), '--batch-process', '--export-type=svg',
        '--export-plain-svg', f'--export-filename={output}',
        '--actions=select-by-element:path;path-simplify;export-do',
    ], env=environment, capture_output=True, text=True, check=True)

with tempfile.TemporaryDirectory(prefix='swotbee-svg-smoothing-') as temporary:
    work = Path(temporary)
    path_environment = profile(work / 'path-profile', '0.0006')
    boundary_environment = profile(work / 'boundary-profile', '0.0003')
    for name in ['renewal-results', 'quote-effort', 'response-speed', 'first-results']:
        source = TARGET / f'{name}-traced-v1.svg'
        simplified = work / f'{name}-simplified.svg'
        simplify(source, simplified, path_environment)
        wrapper = ET.parse(TARGET / f'{name}-original-transparent.svg').getroot()
        image = wrapper.find(f'{{{SVG}}}image')
        approved = Image.open(io.BytesIO(base64.b64decode(image.attrib['href'].split(',', 1)[1]))).convert('RGBA')
        alpha = approved.getchannel('A').resize((approved.width * 3, approved.height * 3), Image.Resampling.LANCZOS)
        alpha = alpha.filter(ImageFilter.GaussianBlur(3.6))
        # A small inward boundary removes the traced fringe without adding a
        # background, bitmap mask, blur filter, or new character geometry.
        boundary = alpha.point(lambda value: 0 if value >= 190 else 255)
        boundary_png = work / f'{name}-boundary.png'
        boundary.save(boundary_png)
        boundary_svg = work / f'{name}-boundary.svg'
        vtracer.convert_image_to_svg_py(
            str(boundary_png), str(boundary_svg), colormode='binary', mode='spline',
            filter_speckle=18, corner_threshold=90, length_threshold=6,
            max_iterations=10, splice_threshold=45, path_precision=3,
        )
        smooth_boundary = work / f'{name}-smooth-boundary.svg'
        simplify(boundary_svg, smooth_boundary, boundary_environment)
        scene = ET.parse(simplified).getroot()
        silhouette = ET.parse(smooth_boundary).getroot()
        definitions = ET.Element(f'{{{SVG}}}defs')
        clip = ET.SubElement(definitions, f'{{{SVG}}}clipPath', {
            'id': 'smooth-boundary', 'clipPathUnits': 'userSpaceOnUse',
        })
        for child in silhouette:
            if child.tag in (f'{{{SVG}}}path', f'{{{SVG}}}g'):
                clip.append(child)
        artwork = ET.Element(f'{{{SVG}}}g', {'clip-path': 'url(#smooth-boundary)'})
        for child in list(scene):
            scene.remove(child)
            artwork.append(child)
        scene.append(definitions)
        scene.append(artwork)
        output = TARGET / f'{name}-smooth-v2.svg'
        ET.ElementTree(scene).write(output, encoding='unicode', xml_declaration=False)
        print(json.dumps({'name': name, 'bytes_before_optimization': output.stat().st_size}), flush=True)
