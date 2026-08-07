# Image Editing with a Mask

Edit an existing image within a masked region using the Images API.

```python
from openai import OpenAI
import base64

client = OpenAI()

result = client.images.edit(
    model="gpt-image-2",
    image=open("sunlit_lounge.png", "rb"),
    mask=open("mask.png", "rb"),
    prompt="A sunlit indoor lounge area with a pool containing a flamingo",
)

image_base64 = result.data[0].b64_json
image_bytes = base64.b64decode(image_base64)

with open("composition.png", "wb") as f:
    f.write(image_bytes)
```

```javascript
import fs from "fs";
import OpenAI, { toFile } from "openai";

const client = new OpenAI();

const rsp = await client.images.edit({
  model: "gpt-image-2",
  image: await toFile(fs.createReadStream("fixtures/sunlit_lounge.png"), null, {
    type: "image/png",
  }),
  mask: await toFile(fs.createReadStream("fixtures/mask.png"), null, {
    type: "image/png",
  }),
  prompt: "A sunlit indoor lounge area with a pool containing a flamingo",
});

const image_base64 = rsp.data[0].b64_json;
const image_bytes = Buffer.from(image_base64, "base64");
fs.writeFileSync("lounge.png", image_bytes);
```

Add an alpha channel to a plain grayscale mask before uploading:

```python
from PIL import Image
from io import BytesIO

mask = Image.open("mask.png").convert("L")
mask_rgba = mask.convert("RGBA")
mask_rgba.putalpha(mask)

buf = BytesIO()
mask_rgba.save(buf, format="PNG")
mask_bytes = buf.getvalue()

with open("mask_alpha.png", "wb") as f:
    f.write(mask_bytes)
```

## Notes

- The transparent regions of `mask` mark where the model should repaint; opaque regions are preserved from `image`.
- `image` and `mask` must share the same format and dimensions, and each must be under 50 MB.
- The mask must include an alpha channel; if the source mask is a plain grayscale PNG, add one programmatically before sending it (see snippet above).
- To composite multiple reference images without a mask, use image editing with reference images instead (see `image-editing-reference.md`).
