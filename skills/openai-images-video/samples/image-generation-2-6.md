# Image Generation with GPT-Image-2.6 (markup, SVG, GIF)

Markup-guided image edit with `gpt-image-2.6-flare` (official example), plus request shapes for SVG and animated GIF output.

## Signature / Usage

### Markup-guided edit

Download the kitchen photo (https://developers.openai.com/images/platform/guides/image-prompting/kitchen.webp) and the transparent overlay (https://developers.openai.com/images/platform/guides/image-prompting/markup-vase-overlay-gpt-image-2-6.png) into the same directory. The overlay circles the vase to recolor.

```python
import base64
from pathlib import Path

from openai import OpenAI

client = OpenAI()
overlay = Path("markup-vase-overlay-gpt-image-2-6.png")
with open("kitchen.webp", "rb") as image, overlay.open("rb") as markup:
    result = client.images.edit(
        model="gpt-image-2.6-flare",
        image=("kitchen.webp", image, "image/webp"),
        markup=(overlay.name, markup, "image/png"),
        quality="medium",
        prompt=(
            "Recolor the striped vase inside the red circle to solid cobalt blue ceramic. "
            "Keep its shape, the dried stems, and the rest of the kitchen unchanged. "
            "Remove the red circle from the finished photo."
        ),
    )

Path("vase.png").write_bytes(base64.b64decode(result.data[0].b64_json))
```

```bash
set -euo pipefail

curl --fail --silent --show-error https://api.openai.com/v1/images/edits \
  -H "Authorization: Bearer $OPENAI_API_KEY" \
  -F model=gpt-image-2.6-flare \
  -F quality=medium \
  -F 'image=@kitchen.webp;type=image/webp' \
  -F 'markup=@markup-vase-overlay-gpt-image-2-6.png;type=image/png' \
  -F 'prompt=Recolor the striped vase inside the red circle to solid cobalt blue ceramic. Keep its shape, the dried stems, and the rest of the kitchen unchanged. Remove the red circle from the finished photo.' |
  jq -er '.data[0].b64_json' | base64 --decode > vase.png
```

### SVG and GIF output

Adapted (not in the official docs): the official guide describes the `output_format` / `frame_count` / `frame_duration_ms` fields in prose without a request example; the snippet below is assembled from those field descriptions (prompts shortened).

```python
import base64
from openai import OpenAI

client = OpenAI()

svg = client.images.generate(
    model="gpt-image-2.6-flare",
    prompt="A flat bakery logo: a golden loaf above the wordmark Field & Flour.",
    output_format="svg",
    n=1,
)
with open("logo.svg", "wb") as f:
    f.write(base64.b64decode(svg.data[0].b64_json))

gif = client.images.generate(
    model="gpt-image-2.6-sunburst",
    prompt="A monkey in a green coat lifts a glowing lantern, blinks, and lowers it back to its starting pose.",
    output_format="gif",
    size="512x512",
    frame_count=9,
    frame_duration_ms=200,
)
with open("lantern.gif", "wb") as f:
    f.write(base64.b64decode(gif.data[0].b64_json))
```

## Notes

- Markup applies to the first input image only; do not send `mask` together with `markup`. The overlay must be a transparent PNG with the same width and height as the first image.
- SVG: `n` must be 1; no streaming, partial images, or `output_compression`; generations only (edits do not support SVG).
- GIF: `frame_count` 2-16 (default 9), `frame_duration_ms` 20-2000 rounded to 10 ms (default 200); no streaming, partial images, or custom `output_compression`.
- The SVG / GIF snippet is not an official example; check the field limits in `references/images/image-generation.md` before use.
- Source: https://developers.openai.com/api/docs/guides/image-generation (retrieved 2026-11-14).

## Related

- [image-generation.md](./image-generation.md)
- [image-editing-reference.md](./image-editing-reference.md)
