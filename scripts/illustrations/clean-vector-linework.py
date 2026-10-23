"""Consolidate fragmented outline colors and shading without changing poses.

Uses the approved smooth-v2 geometry. Palette and identity rules are maintained in
the downloadable character-reference.json. Inkscape is used only for path bounds.
"""
import colorsys
import copy
import json
import os
import subprocess
import tempfile
import xml.etree.ElementTree as ET
from pathlib import Path

import numpy as np

TARGET = Path('design-source/renewal-illustrations/homepage-v3-sharmi')
REFERENCE = json.loads((Path('public/assets/illustrations/renewals') / 'character-reference.json').read_text())
PALETTE = REFERENCE['palette']
SVG = 'http://www.w3.org/2000/svg'
ET.register_namespace('', SVG)
HEADS = {
    'renewal-results': (130, 65, 435, 335),
    'quote-effort': (85, 135, 410, 385),
    'response-speed': (165, 105, 525, 415),
    'first-results': (75, 135, 410, 415),
}
FACES = {
    'renewal-results': (210, 125, 355, 305),
    'quote-effort': (185, 185, 340, 350),
    'response-speed': (290, 155, 465, 350),
    'first-results': (150, 190, 355, 380),
}
EYES = {
    'renewal-results': (245, 160, 345, 225),
    'quote-effort': (210, 235, 330, 300),
    'response-speed': (325, 185, 455, 260),
    'first-results': (205, 235, 335, 315),
}
SHIRTS = {
    'renewal-results': (85, 270, 540, 565),
    'quote-effort': (35, 350, 470, 610),
    'response-speed': (145, 340, 575, 590),
    'first-results': (105, 345, 510, 640),
}

def rgb(value):
    value = value.lstrip('#')
    if len(value) == 3:
        value = ''.join(c * 2 for c in value)
    return np.array([int(value[i:i + 2], 16) / 255 for i in (0, 2, 4)])

def oklab(value):
    linear = np.where(value <= .04045, value / 12.92, ((value + .055) / 1.055) ** 2.4)
    lms = np.array([[.4122214708, .5363325363, .0514459929], [.2119034982, .6806995451, .1073969566], [.0883024619, .2817188376, .6299787005]]) @ linear
    return np.array([[.2104542553, .7936177850, -.0040720468], [1.9779984951, -2.4285922050, .4505937099], [.0259040371, .7827717662, -.8086757660]]) @ np.cbrt(lms)

palette_values = list(PALETTE.values())
palette_labs = np.array([oklab(rgb(value)) for value in palette_values])
for name, head in HEADS.items():
    root = ET.parse(TARGET / f'{name}-smooth-v2.svg').getroot()
    colored = [e for e in root.iter() if e.tag == f'{{{SVG}}}path' and e.get('fill', '').startswith('#')]
    for index, element in enumerate(colored):
        element.set('id', f'color-path-{index}')
    with tempfile.TemporaryDirectory(prefix='swotbee-linework-') as temporary:
        source = Path(temporary) / 'bounds.svg'
        ET.ElementTree(root).write(source, encoding='unicode')
        environment = os.environ.copy()
        environment['INKSCAPE_PROFILE_DIR'] = str(Path(temporary) / 'inkscape-profile')
        query = subprocess.run(['inkscape', str(source), '--query-all'], env=environment, check=True, capture_output=True, text=True)
        bounds = {}
        for line in query.stdout.splitlines():
            fields = line.split(',')
            if len(fields) == 5:
                try:
                    bounds[fields[0]] = tuple(float(x) for x in fields[1:])
                except ValueError:
                    continue
    original_colors = {e.get('fill') for e in colored}
    parents = {child: parent for parent in root.iter() for child in parent}
    hair_edge_repairs = []
    for element in colored:
        color = rgb(element.get('fill'))
        box = bounds.get(element.get('id'))
        in_head = in_face = in_shirt = False
        if box:
            x, y, width, height = box
            in_head = x >= head[0] and y >= head[1] and x + width <= head[2] and y + height <= head[3]
            face = FACES[name]
            in_face = x < face[2] and x + width > face[0] and y < face[3] and y + height > face[1]
            shirt = SHIRTS[name]
            in_shirt = x >= shirt[0] and y >= shirt[1] and x + width <= shirt[2] and y + height <= shirt[3]
        hue, saturation, value = colorsys.rgb_to_hsv(*color)
        spread = float(color.max() - color.min())
        repair_hair_edge = spread < .14 and value > .66
        # Hair keeps two purposeful shades. Other low-chroma dark/grey fragments
        # become the same outline ink instead of many overlapping edge colors.
        if in_shirt and .23 < hue < .61 and value > .48 and color[1] >= color[0]:
            shirt_colors = [PALETTE[key] for key in ('shirt', 'shirtLight', 'shirtShade', 'shirtFold')]
            index = int(np.argmin([np.sum((oklab(rgb(candidate)) - oklab(color)) ** 2) for candidate in shirt_colors]))
            replacement = shirt_colors[index]
        elif in_head and not in_face and not in_shirt and spread < .11:
            replacement = PALETTE['hairHighlight'] if value > .23 else PALETTE['hair']
        elif spread < .085 and value < .83:
            replacement = PALETTE['hairHighlight'] if in_head and value > .23 else PALETTE['hair'] if in_head else PALETTE['outline']
        elif value < .32 and not (.02 < hue < .13 and saturation > .45):
            replacement = PALETTE['hair'] if in_head and spread < .15 else PALETTE['outline']
        else:
            index = int(np.argmin(np.sum((palette_labs - oklab(color)) ** 2, axis=1)))
            replacement = palette_values[index]
        element.set('fill', replacement)
        element.attrib.pop('id', None)
        if repair_hair_edge:
            hair_edge_repairs.append((parents[element], element, copy.deepcopy(element)))
    # Some tracing paths combine distant fragments of the same original color.
    # A geometric hair-only repair removes their pale fringe without repainting
    # eye whites, the face, clothing, or paper elsewhere in the same path.
    definitions = root.find(f'{{{SVG}}}defs')
    if definitions is None:
        definitions = ET.Element(f'{{{SVG}}}defs')
        root.insert(0, definitions)
    def rectangle(box):
        left, top, right, bottom = [value * 3 for value in box]
        return f'M{left} {top}H{right}V{bottom}H{left}Z'
    face_clip = ET.SubElement(definitions, f'{{{SVG}}}clipPath', {'id': 'clean-hair-area', 'clipPathUnits': 'userSpaceOnUse'})
    ET.SubElement(face_clip, f'{{{SVG}}}path', {'d': rectangle(head) + rectangle(EYES[name]), 'clip-rule': 'evenodd'})
    shirt_clip = ET.SubElement(definitions, f'{{{SVG}}}clipPath', {'id': 'outside-shirt', 'clipPathUnits': 'userSpaceOnUse'})
    ET.SubElement(shirt_clip, f'{{{SVG}}}path', {'d': 'M0 0H3366V4206H0Z' + rectangle(SHIRTS[name]), 'clip-rule': 'evenodd'})
    for parent, original, repaired in hair_edge_repairs:
        outer = ET.Element(f'{{{SVG}}}g', {'clip-path': 'url(#clean-hair-area)'})
        inner = ET.SubElement(outer, f'{{{SVG}}}g', {'clip-path': 'url(#outside-shirt)'})
        repaired.set('fill', PALETTE['hairHighlight'])
        inner.append(repaired)
        parent.insert(list(parent).index(original) + 1, outer)
    output = Path('public/assets/illustrations/renewals') / f'{name}-clean-v3.svg'
    ET.ElementTree(root).write(output, encoding='unicode')
    print(json.dumps({'scene': name, 'colors_before': len(original_colors), 'colors_after': len({e.get('fill') for e in colored})}), flush=True)
