#!/usr/bin/env python3
"""Generate per-page Open Graph / LinkedIn Featured cards for swotbee.com.

1200x627, brand navy background, yellow accent, bee logo, left-aligned copy.
Run from the website repo root.
"""
from PIL import Image, ImageDraw, ImageFont

W, H = 1200, 627
NAVY = (33, 51, 67)        # brand primary  #213343
YELLOW = (255, 224, 102)   # brand secondary #ffe066
WHITE = (255, 255, 255)
MUTED = (200, 215, 228)    # primary-100 #c8d7e4

BOLD = "/usr/share/fonts/truetype/ubuntu/Ubuntu-B.ttf"
REG = "/usr/share/fonts/truetype/ubuntu/Ubuntu-R.ttf"
LOGO = "public/assets/home-images/swotbee.png"

MARGIN = 84
TEXT_MAX = 800  # leaves room for the logo on the right

CARDS = [
    {
        "file": "og-nrr-grr-guide.png",
        "eyebrow": "GUIDE",
        "headline": "How to get NRR, GRR and renewal rate right in HubSpot",
        "size": 56,
        "sub": "HubSpot has no native NRR or GRR report. Here is how to build them correctly, and the traps to avoid.",
    },
    {
        "file": "og-renewal-scorecard.png",
        "eyebrow": "FREE INTERACTIVE TOOL",
        "headline": "Score your renewal operation in 10 minutes",
        "size": 62,
        "sub": "Six dimensions. See where revenue is leaking and what to fix first.",
    },
    {
        "file": "og-renewal-audit-call.png",
        "eyebrow": "BOOK A CALL",
        "headline": "Free 30-minute renewal review",
        "size": 66,
        "sub": "No pitch. If a full audit helps, it is a fixed $600, credited toward any build.",
    },
    {
        "file": "og-renewal-leakage-tool.png",
        "eyebrow": "FREE INTERACTIVE TOOL",
        "headline": "See what your renewals are leaking",
        "size": 64,
        "sub": "Adjust the inputs. Get a number worth taking to your CFO.",
    },
]


def track(text, spacing=" "):
    """Crude letter-spacing for the eyebrow, since PIL has none."""
    return spacing.join(list(text))


def wrap(draw, text, font, max_w):
    words, lines, cur = text.split(), [], ""
    for w in words:
        trial = f"{cur} {w}".strip()
        if draw.textlength(trial, font=font) <= max_w:
            cur = trial
        else:
            if cur:
                lines.append(cur)
            cur = w
    if cur:
        lines.append(cur)
    return lines


def build(card):
    img = Image.new("RGB", (W, H), NAVY)
    d = ImageDraw.Draw(img)

    # bee logo, top right, subtle
    logo = Image.open(LOGO).convert("RGBA")
    lh = 150
    logo = logo.resize((int(logo.width * lh / logo.height), lh), Image.LANCZOS)
    img.paste(logo, (W - MARGIN - logo.width, MARGIN - 20), logo)

    f_eye = ImageFont.truetype(BOLD, 22)
    f_head = ImageFont.truetype(BOLD, card["size"])
    f_sub = ImageFont.truetype(REG, 27)

    head_lines = wrap(d, card["headline"], f_head, TEXT_MAX)
    sub_lines = wrap(d, card["sub"], f_sub, TEXT_MAX + 90) if card.get("sub") else []

    lh_step = int(card["size"] * 1.22)
    EYE_GAP, SUB_GAP, SUB_STEP = 52, 26, 38

    block_h = EYE_GAP + len(head_lines) * lh_step
    if sub_lines:
        block_h += SUB_GAP + len(sub_lines) * SUB_STEP

    # centre the block between the logo band and the footer wordmark
    top, bottom = 140, H - 130
    y = top + max(0, ((bottom - top) - block_h) // 2)

    d.text((MARGIN, y), track(card["eyebrow"]), font=f_eye, fill=YELLOW)
    y += EYE_GAP

    for line in head_lines:
        d.text((MARGIN, y), line, font=f_head, fill=WHITE)
        y += lh_step

    if sub_lines:
        y += SUB_GAP - lh_step + int(card["size"] * 1.0)
        for line in sub_lines:
            d.text((MARGIN, y), line, font=f_sub, fill=MUTED)
            y += SUB_STEP

    # footer wordmark
    f_foot = ImageFont.truetype(BOLD, 26)
    d.text((MARGIN, H - 100), "swotbee.com", font=f_foot, fill=YELLOW)

    # accent bar
    d.rectangle([0, H - 12, W, H], fill=YELLOW)

    out = f"public/assets/home-images/{card['file']}"
    img.save(out, "PNG", optimize=True)
    print("wrote", out)


for c in CARDS:
    build(c)
