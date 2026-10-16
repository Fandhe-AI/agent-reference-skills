# Image Generation

Generate an image from a text prompt using the Images API and save it to disk.

```python
from openai import OpenAI
import base64

client = OpenAI()

prompt = """
A children's book drawing of a veterinarian using a stethoscope to
listen to the heartbeat of a baby otter.
"""

result = client.images.generate(model="gpt-image-2.5-sunburst", prompt=prompt)

image_base64 = result.data[0].b64_json
image_bytes = base64.b64decode(image_base64)

with open("otter.png", "wb") as f:
    f.write(image_bytes)
```

```javascript
import OpenAI from "openai";
import fs from "fs";
const openai = new OpenAI();

const prompt = `
A children's book drawing of a veterinarian using a stethoscope to
listen to the heartbeat of a baby otter.
`;

const result = await openai.images.generate({
  model: "gpt-image-2.5-sunburst",
  prompt,
});

const image_base64 = result.data[0].b64_json;
const image_bytes = Buffer.from(image_base64, "base64");
fs.writeFileSync("otter.png", image_bytes);
```

## Notes

- The response returns base64-encoded image data in `data[0].b64_json`; decode and write it to a file.
- Use `n` to request multiple images per call, and `size` / `quality` / `background` / `output_format` to customize output. `quality` accepts `low` / `medium` / `high` / `auto`; `xhigh` and `max` are available only on `gpt-image-2.5-sunburst` and `gpt-image-2.5-flare` (earlier GPT Image models stop at `high`).
- Custom `WIDTHxHEIGHT` sizes (for example `1536x864`) are supported in addition to presets like `1024x1024`, including on GPT Image 2.5: width and height must be multiples of 16, the aspect ratio between 1:3 and 3:1, neither edge above 3840 pixels, and total pixels between 655,360 and 8,294,400. Resolutions above `2560x1440` are experimental.
- For conversational image generation with multi-turn refinement, use the `image_generation` tool on the Responses API instead (see `image-generation-tool.md`).
