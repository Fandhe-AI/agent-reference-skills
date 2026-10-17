---
source: https://ai.google.dev/gemini-api/docs/media-resolution
---

# Media resolution

The `media_resolution` parameter controls how the Gemini API processes images, videos, audio and PDF documents by setting the maximum number of tokens allocated for media inputs, trading response quality against latency and cost. Visual and document inputs scale token allocation with the setting; audio is tokenized at a fixed rate per second at all levels.

## Signature / Usage

Per-content-item resolution (Gemini 3 only), Python:

```python
from google import genai

client = genai.Client()

myfile = client.files.upload(file="path/to/image.jpg")

interaction = client.interactions.create(
    model="gemini-3.8-flash",
    input=[
        {"type": "text", "text": "Describe this image:"},
        {
            "type": "image",
            "uri": myfile.uri,
            "mime_type": myfile.mime_type,
            "resolution": "high"
        }
    ]
)
print(interaction.output_text)
```

JavaScript:

```javascript
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({});

async function main() {
  const myfile = await ai.files.upload({
    file: "path/to/image.jpg",
    config: { mimeType: "image/jpeg" },
  });

  const interaction = await ai.interactions.create({
    model: "gemini-3.8-flash",
    input: [
      { type: "text", text: "Describe this image:" },
      {
        type: "image",
        uri: myfile.uri,
        mime_type: myfile.mimeType,
        resolution: "high"
      }
    ],
  });
  console.log(interaction.output_text);
}

await main();
```

REST:

```bash
# First upload the file using the Files API, then use the URI:
curl -X POST "https://generativelanguage.googleapis.com/v1beta/interactions" \
  -H "x-goog-api-key: $GEMINI_API_KEY" \
  -H 'Content-Type: application/json' \
  -d '{
    "model": "gemini-3.8-flash",
    "input": [
      {"type": "text", "text": "Describe this image:"},
      {
        "type": "image",
        "uri": "YOUR_FILE_URI",
        "mime_type": "image/jpeg",
        "resolution": "high"
      }
    ]
  }'
```

## Options / Props

Available resolution values:

| Value | Description |
|---|---|
| `unspecified` | The default setting. The token count for this level varies significantly between Gemini 3 and earlier Gemini models. |
| `low` | Lower token count, faster processing and lower cost, but less detail. |
| `medium` | A balance between detail, cost, and latency. |
| `high` | Higher token count, more detail, at the expense of increased latency and cost. |
| `ultra_high` | (Per content item only) Highest token count, required for specific use cases such as computer use. |

Approximate token counts, Gemini 3 models:

| MediaResolution | Image | Video | Audio | PDF |
|---|---|---|---|---|
| `unspecified` (Default) | 1120 | 70 | 25 (per second) | 560 |
| `low` | 280 | 70 | 25 (per second) | 280 + Native Text |
| `medium` | 560 | 70 | 25 (per second) | 560 + Native Text |
| `high` | 1120 | 280 | 25 (per second) | 1120 + Native Text |
| `ultra_high` | 2240 | N/A | N/A | N/A |

Recommended settings:

| Media Type | Recommended Setting | Max Tokens | Usage Guidance |
|---|---|---|---|
| Images | `high` | 1120 | Recommended for most image analysis tasks to ensure maximum quality. |
| PDFs | `medium` | 560 | Optimal for document understanding; quality typically saturates at `medium`. Increasing to `high` rarely improves OCR results for standard documents. |
| Video (General) | `low` (or `medium`) | 70 (per frame) | For video, `low` and `medium` are treated identically (70 tokens) to optimize context usage. |
| Video (Text-heavy) | `high` | 280 (per frame) | Required only for dense text (OCR) or small details within video frames. |
| Audio | `unspecified` (Default) | 25 (per second) | Fixed rate of 25 tokens per second across all resolution settings. |

## Notes

- Setting `resolution` on individual content items is exclusive to Gemini 3 models; levels can be mixed in a single request (for example `high` for a complex diagram and `low` for a simple contextual image).
- Exact token counts depend on both the media type and the model version. `high` provides the optimal performance for most use cases. Always test the impact of different settings.
- `ultra_high` is only available for per content item setting; recommended for computer use or where testing shows a clear enhancement over `high`.
- Relationship with video processing: `media_resolution` controls the resolution of each frame (tokens per frame); `processing` / `media_processing` controls which content from the video is loaded into context. Both can be set on the same video input (for example agentic processing with low media resolution).
- The source JS upload example uses `config.mime_type`; changed to `mimeType`, the upload config field used by other official examples and the JS SDK.
- In the Interactions OpenAPI the `MediaResolution` enum is `low` / `medium` / `high` / `ultra_high`; `unspecified` in the tables above means omitting the `resolution` field. Only `ImageContent` and `VideoContent` carry a `resolution` field; the PDF and Audio columns are the page's stated token counts, not a per-item setting. In the Interactions API the per-item field is `resolution`; `media_resolution` is the name of the setting.
- The fixed rates on other pages (audio 32 tokens/s, 258 tokens per image or PDF page, 66/258 tokens per video frame) differ from the Gemini 3 figures above; the source pages do not reconcile them. Treat these figures as Gemini 3 specific.
- Page also has Java and Go examples; not reproduced here.
- API availability: Interactions API (per-content-item `resolution`). Docs fetched 2026-10-16.

## Related

- [video-understanding](./video-understanding.md)
- [image-understanding](./image-understanding.md)
- [document-processing](./document-processing.md)
- [tokens](./tokens.md)
