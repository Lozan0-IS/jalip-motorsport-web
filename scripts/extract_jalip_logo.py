from pathlib import Path
from PIL import Image

SOURCE = Path(r"C:\Users\msi2\AppData\Local\Temp\codex-clipboard-166a9fea-1e31-41d3-953c-2b6e05747ae2.png")
OUTPUT = Path(__file__).parents[1] / "public" / "images" / "jalip-motorsport-logo.png"

image = Image.open(SOURCE).convert("RGBA")
# The supplied artwork places the official mark across this central band.
image = image.crop((12, 430, 1035, 720))

pixels = []
for red, green, blue, _ in image.getdata():
    high = max(red, green, blue)
    low = min(red, green, blue)
    saturation = 0 if high == 0 else (high - low) / high
    luminance = 0.2126 * red + 0.7152 * green + 0.0722 * blue

    # Preserve the black/red official artwork; remove the pale photographic paper.
    if saturation > 0.32 or luminance < 42:
        alpha = 255
    elif luminance < 64:
        alpha = round(255 * (64 - luminance) / 22)
    else:
        alpha = 0
    pixels.append((red, green, blue, alpha))

image.putdata(pixels)
alpha = image.getchannel("A")
bounds = alpha.getbbox()
if not bounds:
    raise RuntimeError("No logo pixels were detected")

left, top, right, bottom = bounds
padding = 12
image = image.crop(
    (
        max(0, left - padding),
        max(0, top - padding),
        min(image.width, right + padding),
        min(image.height, bottom + padding),
    )
)
OUTPUT.parent.mkdir(parents=True, exist_ok=True)
image.save(OUTPUT, optimize=True)
print(f"Saved {OUTPUT} at {image.width}x{image.height}")
