"""Render the two HybridRAG workflow loops and static reduced-motion posters."""
from math import hypot
from pathlib import Path

from PIL import Image, ImageDraw, ImageFont

OUT = Path(__file__).resolve().parents[1] / "dist" / "media"
OUT.mkdir(parents=True, exist_ok=True)
FONT = ImageFont.truetype("DejaVuSans.ttf", 17)
SMALL = ImageFont.truetype("DejaVuSans.ttf", 13)
BG, LINE, TEAL = "#0c192c", "#438b99", "#75fff1"
SCENES = {
    "etl": (
        [(24, 48, 147, 90, "Images"), (24, 134, 147, 176, "Documents"),
         (24, 220, 147, 262, "Data sources"), (242, 126, 405, 184, "ETL pipeline"),
         (482, 126, 616, 184, "Dataset")],
        [[(147, 69), (191, 69), (191, 155), (242, 155)],
         [(147, 155), (242, 155)],
         [(147, 241), (191, 241), (191, 155), (242, 155)],
         [(405, 155), (482, 155)]],
        "CLEANSE  /  TRANSFORM  /  STRUCTURE",
    ),
    "search": (
        [(18, 134, 100, 176, "Query"), (130, 125, 232, 185, "Retrieve"),
         (278, 48, 409, 90, "Vector"), (278, 134, 409, 176, "Full-text"),
         (278, 220, 409, 262, "Tensor"), (450, 125, 544, 185, "Rerank"),
         (571, 134, 652, 176, "Answer")],
        [[(100, 155), (130, 155)],
         [(232, 155), (254, 155), (254, 69), (278, 69)],
         [(232, 155), (278, 155)],
         [(232, 155), (254, 155), (254, 241), (278, 241)],
         [(409, 69), (431, 69), (431, 155), (450, 155)],
         [(409, 155), (450, 155)],
         [(409, 241), (431, 241), (431, 155), (450, 155)],
         [(544, 155), (571, 155)]],
        "RETRIEVE  /  SCORE  /  RERANK",
    ),
}


def point(path, distance):
    for (x, y), (u, v) in zip(path, path[1:]):
        length = hypot(u-x, v-y)
        if distance <= length:
            ratio = distance / length
            return x + (u-x)*ratio, y + (v-y)*ratio
        distance -= length
    return path[-1]


for name, (nodes, paths, caption) in SCENES.items():
    base = Image.new("RGB", (670, 312), BG)
    draw = ImageDraw.Draw(base)
    for x in range(12, 670, 20):
        for y in range(12, 312, 20):
            draw.point((x, y), fill="#25405a")
    draw.text((24, 22), caption, font=SMALL, fill="#8bacc8", anchor="lm")
    lengths = [sum(hypot(b[0]-a[0], b[1]-a[1]) for a, b in zip(path, path[1:]))
               for path in paths]
    for path, length in zip(paths, lengths):
        for start in range(0, int(length), 11):
            dots = [point(path, i) for i in range(start, min(start+6, int(length))+1)]
            draw.line(dots, fill=LINE, width=2)
    for left, top, right, bottom, label in nodes:
        accent = label in {"ETL pipeline", "Retrieve", "Rerank"}
        draw.rounded_rectangle((left, top, right, bottom), 11, fill="#163052" if accent else "#13233b",
                               outline="#59c4c8" if accent else "#405d7d", width=1)
        draw.text(((left+right)/2, (top+bottom)/2), label, font=FONT,
                  fill="#ebf6ff", anchor="mm")
    base.save(OUT / f"hybrid-{name}.png", optimize=True)
    frames = []
    for index in range(64):
        frame = base.copy()
        canvas = ImageDraw.Draw(frame)
        for lane, (path, length) in enumerate(zip(paths, lengths)):
            if name == "etl":
                phase = (index - (lane * 3 if lane < 3 else 27)) % 64
                duration = 23 if lane < 3 else 19
            else:
                starts = [0, 11, 13, 15, 34, 35, 36, 54]
                phase = (index - starts[lane]) % 64
                duration = 10 if lane in {0, 7} else 18
            if phase >= duration:
                continue
            for radius, offset, color in [(7, 0, "#1c5f6a"), (5, 0, "#379ea5"),
                                          (3, 0, TEAL), (2, 9, "#46bcbd")]:
                x, y = point(path, max(0, length*phase/(duration-1)-offset))
                canvas.ellipse((x-radius, y-radius, x+radius, y+radius), fill=color)
        frames.append(frame.quantize(colors=48))
    frames[0].save(OUT / f"hybrid-{name}.gif", save_all=True, append_images=frames[1:],
                   duration=80, loop=0, optimize=True)
