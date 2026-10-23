"""Export versioned icons in the character artwork palette, preserving geometry."""
import json
import xml.etree.ElementTree as ET
from pathlib import Path

DIRECTORY = Path('design-source/renewal-illustrations/homepage-v3-sharmi')
palette = json.loads((Path('public/assets/illustrations/renewals') / 'character-reference.json').read_text())['palette']
roles = {
    '#273d3f': 'outline',
    '#1871a8': 'blue',
    '#76cabb': 'tealLight',
    '#df462a': 'orange',
    '#fff8f5': 'paper',
    '#a7d8e8': 'groundMint',
}
ET.register_namespace('', 'http://www.w3.org/2000/svg')
sources = [path for path in DIRECTORY.glob('icon-*.svg') if '-palette-' not in path.stem]
if len(sources) != 11:
    raise RuntimeError(f'Expected eleven original icons, found {len(sources)}')
for source in sources:
    root = ET.parse(source).getroot()
    for element in root.iter():
        for attribute in ('fill', 'stroke'):
            value = element.get(attribute)
            if value is None or value == 'none':
                continue
            if value.lower() not in roles:
                raise RuntimeError(f'Unmapped {attribute} color {value} in {source.name}')
            element.set(attribute, palette[roles[value.lower()]])
    output = Path('public/assets/illustrations/renewals') / f'{source.stem}-palette-v3.svg'
    ET.ElementTree(root).write(output, encoding='unicode', xml_declaration=False)
    print(output.name)
