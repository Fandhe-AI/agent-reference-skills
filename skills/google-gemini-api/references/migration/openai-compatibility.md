---
source: https://ai.google.dev/gemini-api/docs/openai
---

# OpenAI compatibility

Gemini models are reachable through the OpenAI libraries (Python and TypeScript / JavaScript) and REST by changing three lines: API key, `base_url`, and model. If you are not already using the OpenAI libraries, the source recommends calling the Gemini API directly.

## Signature / Usage

```python
import os
from openai import OpenAI

client = OpenAI(
    api_key=os.environ["GEMINI_API_KEY"],
    base_url="https://generativelanguage.googleapis.com/v1beta/openai/"
)

response = client.chat.completions.create(
    model="gemini-3.8-flash",
    messages=[
        {   "role": "system",
            "content": "You are a helpful assistant."
        },
        {
            "role": "user",
            "content": "Explain to me how AI works"
        }
    ]
)

print(response.choices[0].message)
```

```javascript
import OpenAI from "openai";

const openai = new OpenAI({
    apiKey: process.env.GEMINI_API_KEY,
    baseURL: "https://generativelanguage.googleapis.com/v1beta/openai/"
});
```

```bash
curl "https://generativelanguage.googleapis.com/v1beta/openai/chat/completions" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $GEMINI_API_KEY" \
  -d '{
    "model": "gemini-3.8-flash",
    "messages": [
      {
        "role": "user",
        "content": "Explain to me how AI works"
      }
    ]
  }'
```

Thinking via `reasoning_effort`:

```python
response = client.chat.completions.create(
    model="gemini-3.8-flash",
    reasoning_effort="low",
    messages=[
        {   "role": "system",
            "content": "You are a helpful assistant."
        },
        {
            "role": "user",
            "content": "Explain to me how AI works"
        }
    ]
)
```

Gemini-specific fields via `extra_body`:

```python
response = client.chat.completions.create(
    model="gemini-3.8-flash",
    messages=[{"role": "user", "content": "Explain to me how AI works"}],
    extra_body={
      'extra_body': {
        "google": {
          "thinking_config": {
            "thinking_level": "low",
            "include_thoughts": True
          }
        }
      }
    }
)
```

Other sections of the page (each with Python / JavaScript / REST samples): Streaming (`stream=True`), Function calling, Image understanding, Generate an image (`client.images.generate`), Generate a video (Sora-compatible `/v1/videos` endpoint), Audio understanding, Structured output, Embeddings (`client.embeddings.create`), Batch API, Flex and Priority inference (`service_tier`), List models, Retrieve a model.

Embeddings example:

```python
response = client.embeddings.create(
    input="Your text string goes here",
    model="gemini-embedding-2-preview"
)

print(response.data[0].embedding)
```

REST endpoints shown on the page: `https://generativelanguage.googleapis.com/v1beta/openai/chat/completions`, `.../openai/images/generations`, `.../openai/embeddings`, `.../openai/models`, `.../openai/models/gemini-3.8-flash`.

## Options / Props

Thinking mapping (`reasoning_effort` -> Gemini):

| `reasoning_effort` (OpenAI) | `thinking_level` (Gemini 4 Argon) | `thinking_level` (Gemini 3.1 Flash-Lite) | `thinking_level` (Gemini 3 Flash) | `thinking_budget` (Gemini 2.5) |
|---|---|---|---|---|
| `minimal` | `low` | `minimal` | `minimal` | `1,024` |
| `low` | `low` | `low` | `low` | `1,024` |
| `medium` | `medium` | `medium` | `medium` | `8,192` |
| `high` | `high` | `high` | `high` | `24,576` |

`extra_body` parameters (enable Gemini features not available on OpenAI models):

| Parameter | Type | Endpoint | Description |
|---|---|---|---|
| `cached_content` | Text | Chat | Corresponds to Gemini's general content cache. |
| `thinking_config` | Object | Chat | Corresponds to Gemini's ThinkingConfig. |
| `aspect_ratio` | Text | Images | Output aspect ratio (e.g., `"16:9"`, `"1:1"`, `"9:16"`). |
| `generation_config` | Object | Images | Gemini generation config object (e.g., `{"responseModalities": ["IMAGE"], "candidateCount": 2}`). |
| `safety_settings` | List | Images | Custom safety threshold filters (e.g., `[{"category": "HARM_CATEGORY_HATE_SPEECH", "threshold": "BLOCK_NONE"}]`). |
| `tools` | List | Images | Enables grounding (e.g., `[{"google_search": {}}]`). Only for `gemini-3-pro-image-preview`. |
| `aspect_ratio` | Text | Video | Dimensions of the output video (`16:9` landscape, `9:16` portrait). Maps from `size` if not specified. |
| `resolution` | Text | Video | Output resolution (`720p`, `1080p`, `4K`). `1080p` and `4K` trigger the upsampler pipeline. |
| `duration_seconds` | Integer | Video | Generation length (values: `4`, `6`, `8`). Must be `8` when using `reference_images`, interpolation, or extension. |
| `frame_rate` | Text | Video | Frame rate for video output (e.g., `"24"`). |
| `input_reference` | Text | Video | Reference input for video generation. |
| `extend_video_id` | Text | Video | ID of an existing video to extend. |
| `negative_prompt` | Text | Video | Items to exclude (e.g., `"shaky camera"`). |
| `seed` | Integer | Video | Integer for deterministic generation. |
| `style` | Text | Video | Visual styling (`cinematic` default, `creative` for social-media optimized). |
| `person_generation` | Text | Video | Controls generation of people (`allow_adult`, `allow_all`, `dont_allow`). |
| `reference_images` | List | Video | Up to 3 images for style/character reference (base64 assets). |
| `image` | Text | Video | Base64-encoded initial input image to condition the video generation. |
| `last_frame` | Object | Video | Final image for interpolation (requires `image` as first frame). |

## Notes

- Availability: OpenAI-compatible endpoint under `v1beta` (`/v1beta/openai/`). This page is an OpenAI SDK compatibility layer for Gemini models, not the Gemini-native API.
- Distance: the OpenAI SDK itself, Responses API, and OpenAI Chat Completions / Realtime / image / Sora APIs are covered by openai-api-core (and openai-images-video / openai-realtime-audio). This page only shows how to point those clients at the Gemini endpoint.
- If no `reasoning_effort` is specified, Gemini uses the model's default level or budget. Set `reasoning_effort` to `"none"` to disable thinking for 2.5 models; reasoning cannot be turned off for Gemini 2.5 Pro or 3 models.
- `reasoning_effort` and `thinking_level` / `thinking_budget` overlap and cannot be used at the same time.
- Gemini 3 supports OpenAI compatibility for thought signatures in chat completion APIs (see the thought signatures page of the Gemini docs).
- Image generation: models `gemini-2.5-flash-image` or `gemini-3-pro-image-preview`; supported parameters are `prompt`, `model`, `n`, `size`, and `response_format`; other parameters not listed here or in `extra_body` are silently ignored. Grounding with Google Search is only available on Gemini 3 and newer models.
- Video generation: `veo-3.1-generate-preview` via the Sora-compatible `/v1/videos` endpoint; top-level parameters are `prompt` and `model`; others go in `extra_body`.
- Embeddings: `gemini-embedding-2-preview` for multimodal embeddings, `gemini-embedding-001` for text-only.
- The source passes the literal string `"GEMINI_API_KEY"` as the API key; it is read from the `GEMINI_API_KEY` environment variable here.
- Per the deprecations page (fetched 2026-10-16): `gemini-3-pro-image-preview` shut down June 25, 2026 (use `gemini-3-pro-image`); the `embedding-2-preview` row (released March 10, 2026; the ID spelling differs from the card) shut down August 10, 2026 (use `gemini-embedding-2`); `veo-3.1-generate-preview` shuts down October 22, 2026 (replacement `gemini-omni-1.1-flash`). Whether the compatibility layer accepts the replacements is not stated.
- Batch API: OpenAI compatibility supports creating a batch, monitoring status, and viewing results; upload / download compatibility is not supported, so the regular `genai` client handles file upload / download. JSONL uses OpenAI input format; for embeddings switch the `create` `endpoint` and the JSONL `url` / `model` keys.
- `service_tier` (`priority` / `flex`) matches OpenAI's parameter in name and logic; default is `standard` (equivalent to `default` for OpenAI).
- Source typos transcribed as written: the extra_body `cached_content` example sets `base_url="https://generativelanguage.googleapis.com/v1beta/"` (without `/openai/`); the thinking table repeats its header row; the batch embeddings JSONL comment shows `"ggemini-embedding-001"` in one line.
- Support for the OpenAI libraries is stated to be in beta while feature support is extended.

## Related

- [api-versions.md](./api-versions.md)
- [migrate-genai-sdk.md](./migrate-genai-sdk.md)
