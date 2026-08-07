# Image Generation (Images API)

Generate and edit images from text prompts using GPT Image models (`gpt-image-2`, `gpt-image-1.5`, `gpt-image-1`, `gpt-image-1-mini`) through the standalone Images API.

## Overview

Two APIs can generate images:

- **Images API** (this page): `images.generate` / `images.edit` — best for a single image from one prompt.
- **Responses API `image_generation` tool** (see `image-generation-tool.md`): best for conversational, multi-turn, editable image experiences; also accepts File IDs as input images.

API Organization Verification may be required before using GPT Image models.

## Signature / Usage

```javascript
import OpenAI from "openai";
const openai = new OpenAI();

const result = await openai.images.generate({
  model: "gpt-image-2",
  prompt: "A children's book drawing of a veterinarian listening to a baby otter's heartbeat.",
});

const image_bytes = Buffer.from(result.data[0].b64_json, "base64");
```

```bash
curl -X POST "https://api.openai.com/v1/images/generations" \
    -H "Authorization: Bearer $OPENAI_API_KEY" \
    -H "Content-type: application/json" \
    -d '{"model": "gpt-image-2", "prompt": "..."}' \
  | jq -r '.data[0].b64_json' | base64 --decode > otter.png
```

Set `n` to generate multiple images in one request (default: 1). Set `stream: true` with `partial_images` (0-3) to receive `image_generation.partial_image` streaming events before the final image.

## Edit Images

`images.edit` (`POST /v1/images/edits`) lets you:

- Edit existing images
- Generate new images using one or more images as reference (pass `image[]` / `image: [...]` arrays)
- Edit parts of an image by supplying an image and an alpha-channel `mask` that marks the areas to replace

```python
result = client.images.edit(
    model="gpt-image-2",
    image=[open("body-lotion.png", "rb"), open("bath-bomb.png", "rb")],
    prompt="Generate a photorealistic image of a gift basket...",
)
```

```python
result = client.images.edit(
    model="gpt-image-2",
    image=open("sunlit_lounge.png", "rb"),
    mask=open("mask.png", "rb"),
    prompt="A sunlit indoor lounge area with a pool containing a flamingo",
)
```

### Mask requirements

- The image to edit and the mask must share the same format and size, and be under 50 MB.
- The mask must contain an alpha channel; transparent areas mark what to edit.
- Masking is prompt-guided — the model may not follow the mask shape with complete precision.
- If multiple input images are provided, the mask applies to the first image.

### Image input fidelity

`input_fidelity` controls how strongly a model preserves details from input images during edits/reference workflows. Omit this parameter for `gpt-image-2` — it always processes image inputs at high fidelity, which can raise input token cost on edit requests with reference images.

## Customize Image Output

| Name | Type | Description |
|------|------|-------------|
| `size` | string | Image dimensions, e.g. `1024x1024`, `1536x1024`, `1024x1536`, `2048x2048`, `3840x2160`; `gpt-image-2` accepts any resolution meeting its constraints. `auto` (default) lets the model choose. |
| `quality` | `low` \| `medium` \| `high` \| `auto` | Rendering quality; `low` is fastest for drafts/thumbnails. |
| `output_format` (Images API) | `png` (default) \| `jpeg` \| `webp` | File output format; base64-encoded in the response. |
| `output_compression` | 0-100 | Compression level for `jpeg`/`webp` outputs. |
| `background` | `transparent` \| `opaque` \| `auto` | `gpt-image-2` does not support `transparent` backgrounds. |
| `moderation` | `auto` (default) \| `low` | Moderation strictness for GPT Image generations. |

### `gpt-image-2` size constraints

- Maximum edge length ≤ `3840px`; both edges must be multiples of `16px`.
- Long edge : short edge ratio must not exceed `3:1`.
- Total pixels between `655,360` and `8,294,400`.
- Outputs over `2560x1440` (`3,686,400` px) are considered experimental.

## Notes

- This is distinct from the `image_generation` built-in tool exposed through the Responses API (`image-generation-tool.md`) — the basic Responses API request/response shape itself is covered by the `openai-api-core` skill.
- Complex prompts can take up to 2 minutes to process; text rendering, character/brand consistency, and precise layout placement remain limitations.
- All prompts and generated images are filtered per OpenAI's content policy; see `moderation-and-errors.md` for handling `moderation_blocked` errors.

## Related

- [image-generation-tool.md](./image-generation-tool.md)
- [moderation-and-errors.md](./moderation-and-errors.md)
