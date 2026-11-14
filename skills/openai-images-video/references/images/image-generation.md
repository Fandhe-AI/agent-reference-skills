# Image Generation (Images API)

Generate and edit images from text prompts using GPT Image models (`gpt-image-2.6-sunburst`, `gpt-image-2.6-flare`; earlier: `gpt-image-2.5-sunburst`, `gpt-image-2.5-flare`, `gpt-image-2`, `gpt-image-1.5`, `gpt-image-1`, `gpt-image-1-mini`) through the standalone Images API.

Two APIs can generate images:

- **Images API** (this page): `images.generate` / `images.edit` — best for a single image from one prompt.
- **Responses API `image_generation` tool** (see `image-generation-tool.md`): best for conversational, multi-turn, editable image experiences; also accepts File IDs as input images.

API Organization Verification may be required before using GPT Image models.

Choose `gpt-image-2.5-sunburst` for workflows where editing precision matters most, and `gpt-image-2.5-flare` for fast, high-quality everyday image generation. Both have a dated snapshot: `gpt-image-2.5-sunburst-2026-09-08` and `gpt-image-2.5-flare-2026-09-08`.

GPT-Image-2.6 (changelog 2026-11-04) adds `gpt-image-2.6-sunburst` (detailed visual work) and `gpt-image-2.6-flare` (fast iteration). Both support complexity control, markup-guided edits, SVG output, and animated GIF output through the Image API. The examples on this page use GPT-Image-2.5; the official guide states the same.

With the Images API, set `model` to `gpt-image-2.6-sunburst`, `gpt-image-2.6-flare`, `gpt-image-2.5-sunburst`, or `gpt-image-2.5-flare` directly. With the Responses API, select a supported mainline model at the top level and specify the GPT Image model in the image generation tool's `model` field.

## Signature / Usage

```javascript
import OpenAI from "openai";
const openai = new OpenAI();

const result = await openai.images.generate({
  model: "gpt-image-2.5-sunburst",
  prompt: "A children's book drawing of a veterinarian listening to a baby otter's heartbeat.",
});

const image_bytes = Buffer.from(result.data[0].b64_json, "base64");
```

```bash
curl -X POST "https://api.openai.com/v1/images/generations" \
    -H "Authorization: Bearer $OPENAI_API_KEY" \
    -H "Content-type: application/json" \
    -d '{"model": "gpt-image-2.5-sunburst", "prompt": "..."}' \
  | jq -r '.data[0].b64_json' | base64 --decode > otter.png
```

Set `n` to generate multiple images in one request (default: 1). Set `stream: true` with `partial_images` (0-3) to receive `image_generation.partial_image` streaming events before the final image.

### Streaming

- Adjust `partial_images` to receive 0-3 partial images.
- If you set `partial_images` to 0, you will only receive the final image.
- For values larger than zero, you may not receive the full number of partial images you requested if the full image is generated more quickly.
- Each partial image incurs an additional 100 image output tokens.

## Edit Images

`images.edit` (`POST /v1/images/edits`) lets you:

- Edit existing images
- Generate new images using one or more images as reference (pass `image[]` / `image: [...]` arrays)
- Edit parts of an image by supplying an image and an alpha-channel `mask` that marks the areas to replace

For GPT image models, you can provide up to 16 images (API reference). In a JSON body, images are passed as `images: [{ file_id, image_url }]`.

```python
result = client.images.edit(
    model="gpt-image-2.5-sunburst",
    image=[open("body-lotion.png", "rb"), open("bath-bomb.png", "rb")],
    prompt="Generate a photorealistic image of a gift basket...",
)
```

```python
result = client.images.edit(
    model="gpt-image-2.5-sunburst",
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

### Guide an edit with markup

Use `POST /v1/images/edits` for markup-guided edits with supported GPT-Image-2.5 and GPT-Image-2.6 models. For regional edits with the Responses API, use a mask. An annotation layer shows where a change should happen; describe the change in `prompt`.

1. Keep the original image as the first input image.
2. Create a separate transparent PNG containing the circles, sketches, or other annotations. After orientation, the annotation layer and the first image must have the same width and height. The PNG must contain transparent pixels; do not flatten it onto the original image.
3. Send the annotation layer as `markup`. Multipart requests accept a file upload. JSON requests accept an object containing exactly one of `image_url` or `file_id`; `image_url` can be an HTTPS URL or a base64 data URL. JSON edit requests use `images` for the input image array.
4. Describe the requested change and the details to preserve. Review the result before using it.

Markup applies to the first input image; additional images serve as references. The first input image and the annotation layer can each contain at most 16,777,216 pixels. The annotation file also has a 50 MB size limit. Do not combine `markup` with `mask`.

### Image input fidelity

`input_fidelity` controls how strongly a model preserves details from input images during edits/reference workflows. Omit this parameter for `gpt-image-2` — it always processes image inputs at high fidelity, which can raise input token cost on edit requests with reference images.

## Customize Image Output

| Name | Type | Description |
|------|------|-------------|
| `size` | string | Image dimensions, e.g. `1024x1024`, `1536x1024`, `1024x1536`, `2048x2048`, `3840x2160`; `gpt-image-2` accepts any resolution meeting its constraints. `auto` (default) lets the model choose. |
| `quality` | `low` \| `medium` \| `high` \| `xhigh` \| `max` \| `auto` | Rendering quality; `low` is fastest for drafts/thumbnails. `xhigh` and `max` are available on the GPT-Image-2.6 and GPT-Image-2.5 Sunburst / Flare models only (default `auto`); earlier GPT Image models go up to `high`. |
| `output_format` (Images API) | `png` (default) \| `jpeg` \| `webp` \| `svg` \| `gif` | File output format; base64-encoded in the response. `svg` and `gif` are GPT-Image-2.6 only (see below). |
| `complexity` | `low` \| `medium` \| `high` | GPT-Image-2.6 Sunburst / Flare: how much the model plans before rendering. Default `high`. No separate fee. |
| `markup` (edits) | file / object | GPT-Image-2.5 and GPT-Image-2.6 models: transparent annotation overlay for `POST /v1/images/edits`; not combinable with `mask`. |
| `frame_count` | 2-16 | GIF output only. Default 9. |
| `frame_duration_ms` | 20-2000 | GIF output only; rounded to 10 ms. Default 200. |
| `output_compression` | 0-100 | Compression level for `jpeg`/`webp` outputs. |
| `background` | `transparent` \| `opaque` \| `auto` | For transparent backgrounds with the GPT-Image-2.6 / GPT-Image-2.5 Sunburst and Flare models, set `background: "transparent"` with `output_format: "png"` or `"webp"` (`jpeg` does not support transparency). Transparent backgrounds for `gpt-image-2` and `gpt-image-2-2026-04-21` are in preview (changelog, Aug 20). |
| `moderation` | `auto` (default) \| `low` | Moderation strictness for GPT Image generations. |

### GPT-Image-2.6 options

Source: https://developers.openai.com/api/docs/guides/image-generation#gpt-image-26 (retrieved 2026-11-14).

- **Complexity**: the `complexity` request field controls how much the image model plans before rendering. Lower complexity can suit focused edits, such as changing a background or a sign; higher complexity can help with dense text, complex layouts, and relationships between objects, but can increase latency and introduce unwanted changes. Supported levels for Sunburst and Flare are `low`, `medium`, and `high`; omitted means `high`. The separate `quality` setting controls rendering quality. Adjusting complexity has no separate fee.
- **SVG output**: set `output_format: "svg"` on `POST /v1/images/generations`. Set `n` to `1`. SVG output does not support streaming, partial images, or `output_compression`. The image edit endpoint does not support SVG output, and an SVG is not a supported raster input for image edits. The API creates a reference image (controlled by `quality`) and uses it to produce the SVG. Decode `data[0].b64_json` as base64 and save the UTF-8 XML bytes with a `.svg` extension. The document contains static vector content: no scripts, external resources, or embedded raster images.
- **Animated GIF output**: set `output_format: "gif"` on `POST /v1/images/generations` or `POST /v1/images/edits`. Describe the subject, motion, and desired loop in the prompt; to guide the animation with still reference images, use the edit endpoint.

| Field | Values | Default |
| --- | --- | --- |
| `frame_count` | 2-16 frames | 9 |
| `frame_duration_ms` | 20-2000 milliseconds per frame, rounded to 10 ms | 200 |
| `size` | `auto`, or `WIDTHxHEIGHT` with positive dimensions that are multiples of 16 | `auto` |

`size` describes each finished frame. The frame count, frame dimensions, and number of animations must fit the model's size limits and the total request pixel budget; if exceeded, reduce `frame_count`, the frame dimensions, or `n`. Decode each result's `b64_json` as base64 and save the bytes with a `.gif` extension. GIF output does not support streaming, partial images, or custom `output_compression`. Use `frame_count` and `frame_duration_ms` only with GIF output.

### Custom size constraints (`gpt-image-2`, GPT-Image-2.5 and GPT-Image-2.6 models)

- Custom dimensions are `WIDTHxHEIGHT` strings, e.g. `1536x864`.
- Maximum edge length ≤ `3840px`; both edges must be multiples of `16px`.
- Long edge : short edge ratio must not exceed `3:1`.
- Total pixels between `655,360` and `8,294,400` (4K).
- Outputs over `2560x1440` (`3,686,400` px) are considered experimental.
- Recommended sizes: `1024x1024` (square), `1536x1024` (landscape), `1024x1536` (portrait).

## Cost and latency

Responses API requests include the mainline model's token usage in addition to image generation costs.

GPT-Image-2.6 image output costs $30 per million billable tokens; see image generation pricing (https://developers.openai.com/api/docs/pricing#image-generation) for text and image rates. Markup-guided edits use the same token rates as other edits, with no extra fee. For SVG output, you pay the image model's rate for the reference image and the authoring model's rate for the tokens it uses to produce the SVG; the total depends on how many tokens each model uses.

Both GPT Image 2.5 models use the same token rates (per 1M tokens):

| Token type | Price |
| --- | --- |
| Image input | $8 |
| Cached image input | $2 |
| Image output | $30 (Batch: $15, per the model page) |
| Text input | $5 |
| Cached text input | $1.25 |

Use the response's `usage` to measure token consumption for your prompts, sizes, and quality settings. Equal token rates don't mean equal cost per image: token consumption can differ by model and quality setting.

- For GPT Image 2 and GPT Image 2.5, cached input pricing applies only to the image generation tool in the Responses API. It doesn't apply to direct Images API requests, including `/v1/images/edits`.
- Cached image generation inputs are reflected in billing, but their cached token counts aren't included in the Responses API output. The response's `usage` can't verify these cache hits.
- Each partial image (see Streaming) incurs an additional 100 image output tokens.

### Earlier GPT Image models

The details below apply to earlier models, not Sunburst or Flare.

`gpt-image-2` accepts any resolution in `size` when it satisfies the size constraints above. Popular sizes: `1024x1024`, `1536x1024`, `1024x1536`, `2048x2048` (2K square), `2048x1152` (2K landscape), `3840x2160` (4K landscape), `2160x3840` (4K portrait), `auto` (default). Quality options: `low`, `medium`, `high`, `auto` (default). For `gpt-image-2`, omit `input_fidelity`; the API doesn't allow changing it because the model processes every image input at high fidelity automatically, so image input tokens can be higher for edit requests with reference images.

Models prior to `gpt-image-2` generate images by first producing image tokens; latency and cost are proportional to the number of tokens:

| Quality | Square (1024×1024) | Portrait (1024×1536) | Landscape (1536×1024) |
| --- | --- | --- | --- |
| Low | 272 tokens | 408 tokens | 400 tokens |
| Medium | 1056 tokens | 1584 tokens | 1568 tokens |
| High | 4160 tokens | 6240 tokens | 6208 tokens |

Per-image output pricing:

| Model | Quality | 1024 x 1024 | 1024 x 1536 | 1536 x 1024 |
| --- | --- | --- | --- | --- |
| GPT Image 2 | Low | $0.006 | $0.005 | $0.005 |
| GPT Image 2 | Medium | $0.053 | $0.041 | $0.041 |
| GPT Image 2 | High | $0.211 | $0.165 | $0.165 |
| GPT Image 1.5 | Low | $0.009 | $0.013 | $0.013 |
| GPT Image 1.5 | Medium | $0.034 | $0.05 | $0.05 |
| GPT Image 1.5 | High | $0.133 | $0.2 | $0.2 |
| GPT Image 1 | Low | $0.011 | $0.016 | $0.016 |
| GPT Image 1 | Medium | $0.042 | $0.063 | $0.063 |
| GPT Image 1 | High | $0.167 | $0.25 | $0.25 |
| GPT Image 1 Mini | Low | $0.005 | $0.006 | $0.006 |
| GPT Image 1 Mini | Medium | $0.011 | $0.015 | $0.015 |
| GPT Image 1 Mini | High | $0.036 | $0.052 | $0.052 |

The final cost is the sum of input text tokens, input image tokens (edits endpoint), and image output tokens. A larger non-square resolution can sometimes produce fewer output tokens than a smaller or square resolution at the same quality setting.

## Notes

- `POST /v1/images/variations` is retired and no longer available (API reference); use the image edits endpoint with a GPT Image model and a prompt instead. `dall-e-2` and `dall-e-3` were removed from the API on May 12, 2026.
- In the Responses API, `gpt-5` and newer models should support the image generation tool; check the model detail page to confirm.
- This is distinct from the `image_generation` built-in tool exposed through the Responses API (`image-generation-tool.md`) — the basic Responses API request/response shape itself is covered by the `openai-api-core` skill.
- Deprecations (official deprecations page, retrieved 2026-11-14): `gpt-image-1` was removed from the API on October 23, 2026 (its listed replacement is `gpt-image-2.5-sunburst` or `gpt-image-2.5-flare`). `gpt-image-1-mini`, `gpt-image-1.5` (and `gpt-image-1.5-2025-12-16`), and `chatgpt-image-latest` are removed on December 1, 2026; `gpt-image-2` and `gpt-image-2-2026-04-21` on February 10, 2027 (announced November 10, 2026). The listed replacement for these is `gpt-image-2.6-sunburst` or `gpt-image-2.6-flare`.
- Source (GPT-Image-2.6, complexity, SVG / GIF output, markup): https://developers.openai.com/api/docs/guides/image-generation (`.md` twin retrieved 2026-11-14); release date from https://developers.openai.com/api/docs/changelog (Nov 4).
- The per-type token rate table below is the guide's GPT-Image-2.5 table; for GPT-Image-2.6 the guide states only the $30 per million image output tokens rate and points to the pricing page for the rest.
- Complex prompts can take up to 2 minutes to process; text rendering, character/brand consistency, and precise layout placement remain limitations.
- All prompts and generated images are filtered per OpenAI's content policy; see `moderation-and-errors.md` for handling `moderation_blocked` errors.

## Related

- [image-generation-tool.md](./image-generation-tool.md)
- [image-prompting.md](./image-prompting.md)
- [moderation-and-errors.md](./moderation-and-errors.md)
