---
source: https://ai.google.dev/gemini-api/docs/image-generation
---

# Image generation (Nano Banana)

Nano Banana is the name for Gemini's native image generation and editing capabilities. Gemini generates and processes images conversationally from text, images, video, or a combination, through the Interactions API (`client.interactions.create`). All generated images include a SynthID watermark.

## Signature / Usage

```python
from google import genai
from PIL import Image
import base64

client = genai.Client()

interaction = client.interactions.create(
    model="gemini-nano-banana-2.1",
    input="Create a picture of a nano banana dish in a fancy restaurant with a Gemini theme",
)

with open("generated_image.png", "wb") as f:
    f.write(base64.b64decode(interaction.output_image.data))
```

```bash
curl -s -X POST \
  "https://generativelanguage.googleapis.com/v1beta/interactions" \
  -H "x-goog-api-key: $GEMINI_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "gemini-nano-banana-2.1",
    "input": [
      {"type": "text", "text": "Create a picture of a nano banana dish in a fancy restaurant with a Gemini theme"}
    ]
  }'
```

Image editing (text-and-image-to-image):

```python
with open("/path/to/cat_image.png", "rb") as f:
    image_bytes = f.read()

interaction = client.interactions.create(
    model="gemini-nano-banana-2.1",
    input=[
        {
          "type": "text",
          "text": "Create a picture of a nano banana dish in a fancy restaurant with a Gemini theme"
        },
        {
            "type": "image",
            "data": base64.b64encode(image_bytes).decode('utf-8'),
            "mime_type": "image/png"
        }
    ],
)
```

Multi-turn editing with `previous_interaction_id` and `response_format`:

```python
interaction_2 = client.interactions.create(
    model="gemini-nano-banana-2.1",
    input="Update this infographic to be in Spanish. Do not change any other elements of the image.",
    previous_interaction_id=interaction.id,
    response_format={
        "type": "image",
        "mime_type": "image/jpeg",
        "aspect_ratio": "16:9",
        "image_size": "2K"
    },
)

generated_image = interaction_2.output_image
```

```javascript
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({});

const interaction = await ai.interactions.create({
  model: "gemini-nano-banana-2.1",
  input: "Create a vibrant infographic that explains photosynthesis as if it were a recipe for a plant's favorite food. Show the \"ingredients\" (sunlight, water, CO2) and the \"finished dish\" (sugar/energy). The style should be like a page from a colorful kids' cookbook, suitable for a 4th grader.",
  tools: [{"type": "google_search"}],
});

const interaction2 = await ai.interactions.create({
  model: "gemini-nano-banana-2.1",
  input: "Update this infographic to be in Spanish. Do not change any other elements of the image.",
  previous_interaction_id: interaction.id,
  response_format: {
    type: "image",
    mime_type: "image/jpeg",
    aspect_ratio: "16:9",
    image_size: "2K"
  },
});
```

Grounding with Google Search (and Image Search on Nano Banana 2.1 / 3.1 Flash):

```python
prompt = "Visualize the current weather forecast for the next 5 days in San Francisco as a clean, modern weather chart. Add a visual on what I should wear each day"

interaction = client.interactions.create(
    model="gemini-nano-banana-2.1",
    input=prompt,
    tools=[{"type": "google_search"}],
    response_format={
        "type": "image",
        "mime_type": "image/jpeg",
        "aspect_ratio": "16:9"
    },
)

interaction = client.interactions.create(
    model="gemini-nano-banana-2.1",
    input="A detailed painting of a Timareta butterfly resting on a flower",
    tools=[{
      "type": "google_search",
      "search_types": ["web_search", "image_search"]
    }]
)
```

Video-to-image:

```python
interaction = client.interactions.create(
    model="gemini-nano-banana-2.1",
    input=[
        {
            "type": "video",
            "uri": "https://www.youtube.com/watch?v=UTdfxFyOQTI",
            "mime_type": "video/mp4"
        },
        {"type": "text", "text": "Generate a poster image that captures the key themes of this video."}
    ],
    response_format={"type": "image", "aspect_ratio": "16:9"}
)
```

Thinking level, thought parts, and interleaved output (iterate `steps`):

```python
interaction = client.interactions.create(
    model="gemini-nano-banana-2.1",
    input="A futuristic city built inside a giant glass bottle floating in space",
    generation_config={"thinking_level": "high"},
)

for step in interaction.steps:
    if step.type == "thought":
        for content_block in step.summary:
            if content_block.type == "text":
                print(content_block.text)

# Interleaved text and images (gemini-3-pro-image)
interaction = client.interactions.create(
    model="gemini-3-pro-image",
    input="Write the story of the lifecycle of a monarch butterfly, interleave illustrations",
)
for step in interaction.steps:
    if step.type == "model_output":
        for content_block in step.content:
            if content_block.type == "text":
                print(content_block.text)
            elif content_block.type == "image":
                ...  # base64-decode content_block.data
```

Output modalities:

```python
interaction = client.interactions.create(
    model="gemini-nano-banana-2.1",
    input="Write a short poem about a starry night and generate an image of it.",
    response_format=[
        {"type": "text"},
        {"type": "image"},
    ],
)
```

## Options / Props

Models:

| Model | Model ID | Notes (from source) |
|---|---|---|
| Nano Banana 2.1 | `gemini-nano-banana-2.1` | Primary high-efficiency workhorse; 1K, 2K, 4K; Google Search grounding |
| Nano Banana 2 Lite (Gemini 3.1 Flash Lite Image) | `gemini-3.1-flash-lite-image` | Fastest and cheapest; 1K only; not optimized for multiple reference inputs or multi-turn editing; no Search grounding |
| Nano Banana 2 (Gemini 3.1 Flash Image) | `gemini-3.1-flash-image` | Previous-generation workhorse; adds 512px (0.5K); new projects recommended to use 2.1 |
| Nano Banana Pro (Gemini 3 Pro Image) | `gemini-3-pro-image` | Premium; most complex visual tasks; interleaved text-and-image output |
| Nano Banana (Gemini 2.5 Flash Image) | `gemini-2.5-flash-image` | Legacy; recommended migration to Nano Banana 2 Lite |

`response_format` (when `type` is `"image"`):

| Name | Type | Description |
|------|------|-------------|
| type | string | `"image"`; pass an array (`[{"type": "text"}, {"type": "image"}]`) for multiple modalities. Default returns both text and image |
| mime_type | string | `"image/jpeg"` (API reference enum) |
| aspect_ratio | string | e.g. `"16:9"`, `"5:4"`, `"9:16"`; default matches input image size, otherwise 1:1 |
| image_size | string | `"512"` (0.5K / 512px; 3.1 Flash Image only), `"1K"` (default), `"2K"`, `"4K"`; uppercase K required, lowercase (for example `1k`) is rejected |

Thinking levels (`generation_config.thinking_level`):

| Model | Supported thinking levels | Default |
|---|---|---|
| Gemini Nano Banana 2.1 | `minimal`, `medium`, `high` | `medium` |
| Gemini 3.1 Flash Image | `minimal`, `high` | `minimal` |
| Gemini 3.1 Flash Lite Image | `minimal`, `high` | `minimal` |

Reference images (up to 14 total):

| Gemini 3.1 Flash Lite Image | Gemini Nano Banana 2.1 & Gemini 3.1 Flash Image | Gemini 3 Pro Image |
|---|---|---|
| Up to 14 images of objects with high-fidelity | Up to 10 images of objects with high-fidelity | Up to 6 images of objects with high-fidelity |
| N/A | Up to 4 images of characters for consistency | Up to 5 images of characters for consistency |
| N/A | N/A | Up to 3 images as style references |

Nano Banana 2.1 resolutions (aspect ratio: 1K / 2K / 4K; tokens 1120 / 1680 / 2520): 1:1 1024x1024 / 2048x2048 / 4096x4096; 16:9 1376x768 / 2752x1536 / 5504x3072; 9:16 768x1376 / 1536x2752 / 3072x5504; also 1:4, 1:8, 2:3, 3:2, 3:4, 4:1, 4:3, 4:5, 5:4, 8:1, 21:9. See the official page for the full tables for 3.1 Flash Image (with 512px, 747 tokens), 3.1 Pro Image, and Gemini 2.5 Flash Image (1290 tokens).

## Notes

- Availability: Interactions API (`v1beta` endpoint in the examples). A separate generateContent-based version of this guide exists in generate-content/image-generation.
- Convenience properties `interaction.output_image` / `output_text` return the last block; for interleaved or video-to-image output, iterate `steps` manually.
- The guide prose writes 512px for `image_size`; the API reference enum value is `"512"`. The guide JS sample sets `image/png` in `response_format`; the API reference enum lists only `image/jpeg`, used here.
- For Gemini 3 image models (Nano Banana 2.1 / 2 / 2 Lite / Pro), Thinking is on by default and cannot be disabled; Nano Banana (`gemini-2.5-flash-image`) does not support Thinking. The model generates up to two interim images, and the last image within Thinking is the final image; thinking tokens are billed by default.
- Google Search grounding: image-based search results are not passed to the generation model and are excluded from the response; the response includes `google_search_call` and `google_search_result` steps and `url_citation` annotations. When using Image Search you must display `search_suggestions` from the `google_search_result` step. Real-world images of people from web search are not supported.
- Video input is only supported by Gemini Nano Banana 2.1, Gemini 3.1 Flash Image, and Gemini 3.1 Flash Lite Image; audio inputs are not supported.
- Limitations: best languages EN, ar-EG, de-DE, es-MX, fr-FR, hi-IN, id-ID, it-IT, ja-JP, ko-KR, pt-BR, ru-RU, ua-UA, vi-VN, zh-CN; the model won't always follow the exact number of requested images; for text in images, generate the text first and then ask for an image with it.
- Batch: all capabilities can run via the Batch API (higher rate limits, turnaround up to 24 hours).
- Imagen is shut down; use Nano Banana for image generation (this page uses `client.interactions.create`). The separate Imagen page (/gemini-api/docs/imagen) describes the generateContent migration (`gemini-2.5-flash-image` or `gemini-3.1-flash-image`, `client.models.generate_content` instead of `generate_images`); the deprecations page lists `gemini-nano-banana-2.1` as the Imagen replacement and `gemini-2.5-flash-image` itself shuts down March 15, 2027.
- Prompt template (photorealistic): `A photorealistic [type of shot] of a [subject description] in a [setting description]. [Description of the light]. Shot from a [camera angle] with a [lens type].` Editing template: `Using the provided image of [subject], please [add/remove/modify] [element] to/from the scene. Ensure the change is [description of how the change should integrate].` The source also gives templates for stylized illustrations and stickers, accurate text in images, product mockups, minimalist negative space, sequential art, Search-grounded images, inpainting, style transfer, multi-image composition, detail preservation, bringing something to life, and character 360 views.
- Distinct from OpenAI gpt-image: see openai-images-video.

## Related

- [omni.md](./omni.md)
- [veo.md](./veo.md)
