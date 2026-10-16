# Image Prompting

Prompting guide for the GPT Image models: choosing a model, model parameters, migrating an existing workflow, prompt fundamentals, and a result checklist. Source: https://developers.openai.com/api/docs/guides/image-prompting

## Signature / Usage

The guide's "Run a complete example" (Python): generate four transparent PNG logo variations, then edit an input image into a transparent cutout. This runnable example remains pinned to `gpt-image-2`; use it as a baseline, then choose an available model and its supported request settings for your evaluation.

```python
import base64
from pathlib import Path

from openai import OpenAI

client = OpenAI()

prompt = """
Create an original, non-infringing logo for a company called Field & Flour, a local bakery.
The logo should feel warm, simple, and timeless. Use clean, vector-like shapes, a strong silhouette, and balanced negative space.
Favor simplicity over detail so it reads clearly at small and large sizes. Flat design, minimal strokes, no gradients unless essential.
Fully transparent background. Deliver a single centered logo with generous padding, clean alpha edges, and no solid backdrop, scenery, checkerboard, or watermark.
"""

result = client.images.generate(
    model="gpt-image-2",
    prompt=prompt,
    size="1024x1536",
    quality="medium",
    background="transparent",
    output_format="png",
    n=4,  # Generate 4 versions of the logo
)

# Preserve the returned PNG bytes, including the alpha channel.
for index, item in enumerate(result.data, start=1):
    Path(f"logo-generation-{index}-gpt-image-2.png").write_bytes(
        base64.b64decode(item.b64_json)
    )

# Extract a product from a reference image.
prompt = """
Extract the product from the input image and isolate it on a fully transparent background.
Output: centered product, crisp silhouette, no halos/fringing.
Preserve product geometry and label legibility exactly.
Add only light polishing. Do not add a solid backdrop, checkerboard, scenery, or shadow.
Do not restyle the product; remove the background and preserve clean alpha transparency.
"""

result = client.images.edit(
    model="gpt-image-2",
    image=[
        Path("input_images/shampoo.webp"),
    ],
    prompt=prompt,
    size="1024x1536",
    quality="medium",
    background="transparent",
    output_format="png",
)

Path("extract-product-gpt-image-2.png").write_bytes(
    base64.b64decode(result.data[0].b64_json)
)
```

## Choose a model

GPT Image 2.5 has two models:

- `gpt-image-2.5-flare`: the small model, optimized for speed; image quality comparable to GPT Image 2.
- `gpt-image-2.5-sunburst`: the base model, optimized for quality; higher image quality than GPT Image 2.

Both improve precise editing and subject preservation, and both support image generation, editing, and transparent backgrounds.

For a new workflow, start with GPT Image 2.5 Flare when speed is the priority, or GPT Image 2.5 Sunburst when demanding quality requirements are the priority. Once the output meets your requirements, look for opportunities to reduce latency.

For migrating from a current image model, use your current image quality as the starting point.

| Your current workflow | Start by testing |
| --- | --- |
| An existing, validated GPT Image 2 workflow already meets your quality requirements | GPT Image 2.5 Flare. Check whether you can retain acceptable quality while reducing latency. |
| A complex use case where GPT Image 2 does not meet your quality requirements | GPT Image 2.5 Sunburst. First establish that it delivers the quality you need. |

If GPT Image 2.5 Sunburst meets your quality requirements, then test GPT Image 2.5 Flare with the same prompts and inputs. Switch to Flare if it also meets those requirements and improves latency. Keep Sunburst when its quality advantage is necessary for your workflow.

Measure response time and quality on your own workload. Results depend on your prompts, reference images, output dimensions, and quality settings; a speed improvement on one workload doesn't establish a fixed improvement on another.

## Options / Props

### GPT Image 2.5 (`gpt-image-2.5-flare`, `gpt-image-2.5-sunburst`)

| Name | Type | Description |
|------|------|-------------|
| model | string | `gpt-image-2.5-flare` (small model) or `gpt-image-2.5-sunburst` (base model) |
| quality | string | `auto` (default), `low`, `medium`, `high`, `xhigh`, or `max` |
| size | string | `auto` or a custom resolution. Common sizes: `1024x1024` (square), `1536x1024` (landscape), `1024x1536` (portrait), `2048x2048` (2K square), `2048x1152` (2K landscape), `3840x2160` (4K landscape), and `2160x3840` (4K portrait). |
| background | string | `auto`, `opaque`, or `transparent` |

For a custom resolution, use `WIDTHxHEIGHT`: each edge at most 3,840 pixels, both edges multiples of 16 pixels, longer-to-shorter edge ratio at most 3:1, total pixel count between 655,360 and 8,294,400. Outputs with more than 3,686,400 total pixels (`2560x1440`) are experimental.

Choose the model using the workflow above before tuning `quality`. For the first comparison, keep an explicitly selected quality setting unchanged when both models support it, along with the prompt, reference images, and output dimensions. The same quality label does not imply the same image quality or response time across models.

If the output falls short, test a higher quality setting. Once it meets your requirements, test lower settings to see whether they preserve acceptable quality while reducing latency. Use `xhigh` or `max` only when they improve an unmet quality requirement within your latency budget. A higher setting doesn't guarantee a better result for every prompt.

For transparent assets, explicitly request `background="transparent"` and use PNG or WebP. Check the decoded image's alpha channel, including hair, glass, shadows, and object edges. Use `output_compression` only for JPEG or WebP output, not PNG.

### GPT Image 2 (`gpt-image-2`)

| Name | Type | Description |
|------|------|-------------|
| quality | string | `low`, `medium`, `high`, or `auto` |
| size | string | `auto` or a supported resolution; see size constraints in `image-generation.md` |
| input_fidelity | string | Omit it. Image inputs are always processed at high fidelity. |
| output_format | string | `png`, `jpeg`, or `webp` |
| background | string | For transparent output, explicitly set `transparent` and use PNG or WebP. |
| output_compression | string | Use only for JPEG or WebP output, not PNG. |

Transparent backgrounds are available in preview for `gpt-image-2`.

### GPT Image 1.5 (`gpt-image-1.5`) and GPT Image 1 (`gpt-image-1`)

| Name | Type | Description |
|------|------|-------------|
| quality | string | `low`, `medium`, `high`, or `auto` |
| size | string | `1024x1024`, `1024x1536`, `1536x1024`, or `auto` |
| output_format | string | `png`, `jpeg`, or `webp` |
| output_compression | integer | 0 to 100, JPEG or WebP only |
| background | string | Set `transparent` explicitly; use PNG or WebP |
| input_fidelity | string | `low` or `high`; `high` preserves input details, while `quality` controls output generation. GPT Image 1 only: high input fidelity uses more image input tokens. Omit this parameter when migrating to GPT Image 2, which always uses high input fidelity. |

Deprecated models: `gpt-image-1.5` is scheduled to shut down on December 1, 2026; `gpt-image-1` on October 23, 2026. Validate existing workflows with `gpt-image-2` before migrating.

## Prompting fundamentals

1. Define the result: subject, intended use, composition, aspect ratio, placement constraints. Complex requests benefit from labeled sections (scene, subject, details, constraints).
2. Use any format that is easy to read and update (short prompts, paragraphs, JSON-like structures, tagged sections).
3. Describe visible details: materials, lighting, colors, medium. Ask for "photorealistic" explicitly when wanted; treat camera specs as appearance cues, not exact simulations.
4. Specify people and actions: body framing, scale, gaze, interaction with objects.
5. Specify exact text: put wording in quotes, describe position and typography, spell unusual words letter by letter if needed, ask for no extra text, then check spelling. Compare `medium` and `high` quality for small or dense text.
6. For edits, state what should change and what must stay the same (identity, layout, lighting, labels); state exclusions such as watermarks or logos.
7. Assign each reference image a numbered role (subject, style, clothing, background) and explain how they combine.
8. Iterate: use the previous output as the next input, change one thing at a time, restate critical constraints if results drift.

## Migrate an existing workflow

1. Record a baseline with production prompts, reference images, and settings, including difficult cases.
2. Pick the first candidate by whether current GPT Image 2 quality is acceptable; keep inputs unchanged for the first comparison.
3. Check results for instruction following, identity and product preservation, text accuracy, unwanted changes, and transparency. Repeat requests to test consistency.
4. Test latency gains only after quality passes.
5. Change one setting at a time; track response times, failures, retries, and cost per accepted image. Confirm current pricing.
6. Roll out gradually by workflow, monitor the same measures, and keep the previous model available for rollback.

When migrating from GPT Image 1 or 1.5, use the reference tabs to check parameter differences and shutdown dates. Test the candidate model's supported request settings rather than copying older settings unchanged. For GPT Image 2, keep your existing resolution and transparency requirements in the comparison.

Repeated edits can still change details you intended to preserve. Restate those constraints and inspect each result. If a region must remain pixel-identical, composite the approved edit into the original image instead of relying on prompting alone.

## Check the result

- Required text is accurate and legible; diagram labels and relationships are correct.
- Identities, product shapes, labels, and reference details are intact.
- The edit changed only what was requested.
- Transparent outputs have a real alpha channel, not a painted background.
- When changing prompts or models, compare quality, latency, and cost on representative inputs.

## Notes

- Deprecations: `gpt-image-1` shuts down on October 23, 2026; `gpt-image-1.5`, `gpt-image-1-mini`, and `chatgpt-image-latest` on December 1, 2026 (official deprecations page). Validate existing workflows with `gpt-image-2` (or a GPT Image 2.5 model) before migrating.
- The guide also contains scenario examples (style and lighting, infographics, exact-text ads, reusable logos, comic strips, UI mockups, slides and charts, translation with layout preservation, style transfer, identity-preserving clothing edits, reference combining, transparent cutouts, sketch-to-render, object removal, multi-turn refinement). Each has a sample prompt and settings on the official page; they are not reproduced here. Original prompts and runnable workflows: the pinned cookbook notebook, https://github.com/openai/openai-cookbook/blob/d310dfa05d20fb653caa9c1c4b89ac1a4aeeeae4/examples/multimodal/image-gen-models-prompting-guide.ipynb

## Related

- [image-generation.md](./image-generation.md)
- [image-generation-tool.md](./image-generation-tool.md)
- [moderation-and-errors.md](./moderation-and-errors.md)
