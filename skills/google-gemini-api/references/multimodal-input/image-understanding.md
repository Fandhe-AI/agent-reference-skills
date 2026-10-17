---
source: https://ai.google.dev/gemini-api/docs/image-understanding
---

# Image understanding

Gemini models are multimodal from the ground up: image captioning, classification, visual question answering, object detection and segmentation without training specialized ML models. Images are passed as items of type `image` in the `input` array of an Interactions API call.

## Signature / Usage

Upload with the Files API, then reference the file URI (Python):

```python
from google import genai

client = genai.Client()

uploaded_file = client.files.upload(file="path/to/organ.jpg")

interaction = client.interactions.create(
    model="gemini-3.8-flash",
    input=[
        {"type": "text", "text": "Caption this image."},
        {
            "type": "image",
            "uri": uploaded_file.uri,
            "mime_type": uploaded_file.mime_type
        }
    ]
)
print(interaction.output_text)
```

JavaScript:

```javascript
import { GoogleGenAI } from "@google/genai";

const client = new GoogleGenAI({});

const uploadedFile = await client.files.upload({
    file: "path/to/organ.jpg",
    config: { mimeType: "image/jpeg" }
});

const interaction = await client.interactions.create({
    model: "gemini-3.8-flash",
    input: [
        {type: "text", text: "Caption this image."},
        {
            type: "image",
            uri: uploadedFile.uri,
            mime_type: uploadedFile.mimeType
        }
    ]
});
console.log(interaction.output_text);
```

REST (inline base64 data):

```bash
IMG_PATH="/path/to/your/image1.jpg"

base64 < "${IMG_PATH}" | tr -d '\n' > image.b64

jq -n --rawfile data image.b64 '{
  model: "gemini-3.8-flash",
  input: [
    {type: "text", text: "Caption this image."},
    {type: "image", data: $data, mime_type: "image/jpeg"}
  ]
}' > request.json

curl -X POST "https://generativelanguage.googleapis.com/v1beta/interactions" \
  -H "x-goog-api-key: ${GEMINI_API_KEY}" \
  -H 'Content-Type: application/json' \
  --data-binary @request.json
```

Inline base64 (Python):

```python
import base64
from google import genai

with open('path/to/small-sample.jpg', 'rb') as f:
    image_bytes = f.read()

client = genai.Client()

interaction = client.interactions.create(
    model="gemini-3.8-flash",
    input=[
        {"type": "text", "text": "Caption this image."},
        {
            "type": "image",
            "data": base64.b64encode(image_bytes).decode('utf-8'),
            "mime_type": "image/jpeg"
        }
    ]
)
print(interaction.output_text)
```

Multiple images in one prompt (Python):

```python
interaction = client.interactions.create(
    model="gemini-3.8-flash",
    input=[
        {"type": "text", "text": "What is different between these two images?"},
        {
            "type": "image",
            "uri": "https://example.com/image1.jpg",
            "mime_type": "image/jpeg"
        },
        {
            "type": "image",
            "uri": "https://example.com/image2.jpg",
            "mime_type": "image/jpeg"
        }
    ]
)
print(interaction.output_text)
```

Object detection with structured output (Python):

```python
from google import genai
from pydantic import BaseModel, Field
from typing import List
import json

client = genai.Client()
prompt = "Detect the all of the prominent items in the image. The box_2d should be [ymin, xmin, ymax, xmax] normalized to 0-1000."

class BoundingBox(BaseModel):
    box_2d: List[int] = Field(description="The 2D bounding box of the item as [ymin, xmin, ymax, xmax] normalized to 0-1000.")
    mask: List[List[int]] = Field(description="The segmentation mask of the item as a polygon of [x,y] coordinates, normalized to 0-1000.")
    label: str = Field(description="A descriptive label for the item.")

class BoundingBoxes(BaseModel):
    boxes: List[BoundingBox]

interaction = client.interactions.create(
    model="gemini-3.8-flash",
    input=[
        {"type": "text", "text": prompt},
        {
            "type": "image",
            "uri": "https://example.com/image.png",
            "mime_type": "image/png"
        }
    ],
    response_format={
        "type": "text",
        "mime_type": "application/json",
        "schema": BoundingBoxes.model_json_schema()
    }
)

bounding_boxes = BoundingBoxes.model_validate_json(interaction.output_text)
print(bounding_boxes)
```

Segmentation (JavaScript; thinking level `minimal`):

```javascript
import { GoogleGenAI } from "@google/genai";
import * as z from "zod";

const client = new GoogleGenAI({});
const prompt = `
Give the segmentation masks for the wooden and glass items.
Output a JSON list of segmentation masks where each entry contains the 2D
bounding box in the key "box_2d", the segmentation mask in key "mask", and
the text label in the key "label". Use descriptive labels.
`;

const boundingBoxesSchema = z.object({
  boxes: z.array(z.object({
    box_2d: z.array(z.number()),
    mask: z.array(z.array(z.number())),
    label: z.string()
  }))
});

const interaction = await client.interactions.create({
  model: "gemini-3.8-flash",
  input: [
    { type: "text", text: prompt },
    {
      type: "image",
      uri: "https://example.com/image.png",
      mime_type: "image/png"
    }
  ],
  response_format: {
    type: 'text',
    mime_type: 'application/json',
    schema: z.toJSONSchema(boundingBoxesSchema)
  },
  generation_config: {
    thinking_level: "minimal"
  }
});

const result = boundingBoxesSchema.parse(JSON.parse(interaction.output_text));
console.log(result);
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `input[].type` | `"image"` | Image content item; combine with `"text"` items in the same `input` array |
| `uri` | string | Files API file URI (or URL as shown in the multi-image example) |
| `data` | string | Base64-encoded image bytes (inline) |
| `mime_type` | string | `image/png`, `image/jpeg`, `image/webp`, `image/heic`, `image/heif` |
| `response_format` | object | Structured output for bounding boxes / masks (`type: "text"`, `mime_type: "application/json"`, `schema`) |
| `generation_config.thinking_level` | string | For segmentation the page recommends `"minimal"` |

## Notes

- Input methods: URL / Files API upload (recommended for larger files or reuse across requests) / inline base64.
- "Inline image data limits your total request size (text prompts, system instructions, and inline bytes) to 20MB. For larger requests, upload image files using the File API."
- Object detection: coordinates are relative to image dimensions and scale to [0, 1000]; descale to the original image size. The model also supports custom instructions such as "Show bounding boxes of all green objects in this image".
- Segmentation: the model predicts a JSON list; each item has `box_2d` as `[ymin, xmin, ymax, xmax]` normalized 0-1000, a `label`, and a `mask` polygon of `[x, y]` coordinates normalized 0-1000. For better results disable thinking by setting the thinking level to "minimal".
- Using Zod for structured output schema validation in TypeScript/JavaScript requires `npm install zod`.
- Limits: maximum of 3,600 image files per request. Token calculation: 258 tokens if both dimensions <= 384 pixels; larger images are tiled into 768x768 tiles, each costing 258 tokens. Rough tile count: crop unit size = `floor(min(width, height) / 1.5)`; divide each dimension by the crop unit size and multiply (960x540 -> crop unit 360 -> 3 * 2 = 6 tiles).
- Gemini 3 adds the `media_resolution` parameter (max tokens per input image or video frame); see media-resolution.md.
- Tips: verify images are correctly rotated; use clear, non-blurry images; with a single image plus text, place the text prompt before the image in the `input` array.
- The source REST sample inlines the base64 image in a single `-d` argument with unquoted variables; this page builds the body with `jq --rawfile` and sends it with `--data-binary @request.json`.
- This page states 20 MB for inline data; files-api / file-input-methods state 100 MB per request (50 MB for PDFs); the source pages disagree.
- The Files API prompting guide recommends the opposite order (image first) for single-image prompts; the source pages disagree.
- The fixed 258-token figure differs from the Gemini 3 per-image figures in media-resolution.md; the source pages do not reconcile them.
- Page also has Java and Go examples (Interactions API content builders); not reproduced here.
- API availability: Interactions API (`client.interactions.create`). The generateContent counterpart is a separate page under the generate-content category. Docs fetched 2026-10-16.
- Distinct from OpenAI vision inputs (openai-images-video skill) and the gpt-image models.

## Related

- [files-api](./files-api.md)
- [file-input-methods](./file-input-methods.md)
- [media-resolution](./media-resolution.md)
- [tokens](./tokens.md)
