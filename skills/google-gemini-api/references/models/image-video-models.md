---
source: https://ai.google.dev/gemini-api/docs/models/gemini-3.1-flash-image
---

# Nano Banana / Imagen / Veo / Omni model cards

Aggregated model cards for image generation (Nano Banana family, Imagen 4) and video generation (Gemini Omni Flash, Veo). One section per source page.

## Signature / Usage

The cards contain no code; model codes as listed on the pages:

```text
gemini-nano-banana-2.1
gemini-3.1-flash-image
gemini-3.1-flash-lite-image
gemini-3-pro-image
gemini-2.5-flash-image
imagen-4.0-generate-001 imagen-4.0-ultra-generate-001 imagen-4.0-fast-generate-001
gemini-omni-1.1-flash
veo-3.1-generate-preview veo-3.1-fast-generate-preview
veo-3.1-lite-generate-preview
veo-2.0-generate-001
```

## Options / Props

Image models (Nano Banana):

| Model code | Name | Inputs / Output | Input / output token limit | Status | Latest update |
| --- | --- | --- | --- | --- | --- |
| `gemini-nano-banana-2.1` | Nano Banana 2.1 | Text, Image, Video, PDF / Image and Text | 131,072 / 32,768 | Stable | October 2026 |
| `gemini-3.1-flash-image` | Nano Banana 2 | Text, Image, Video, PDF / Image and Text | 131,072 / 32,768 | Stable | February 2026 |
| `gemini-3.1-flash-lite-image` | Nano Banana 2 Lite | Text, Image, Video, PDF / Image and Text | 65,536 / 4,096 | Stable | June 2026 |
| `gemini-3-pro-image` | Nano Banana Pro | Image and Text / Image and Text | 65,536 / 32,768 | Stable | November 2025 |
| `gemini-2.5-flash-image` | Nano Banana | Image and Text / Image and Text | 65,536 / 32,768 | Stable (`gemini-2.5-flash-image-preview` deprecated) | October 2025 |

All five: Image generation Supported; Audio generation, Caching, Code execution, File search, Function calling, Maps grounding, Live API, Structured outputs, URL context Not supported; Batch API Supported; Flex and Priority inference Not supported. Search grounding Supported on 2.1, 2, and Pro (Not supported on Nano Banana 2 Lite and Nano Banana). Thinking: Supported on 2.1, 2, Pro; "Supported (minimal and high)" on 2 Lite; Not supported on Nano Banana.

Key updates quoted from cards:

| Model | Key updates |
| --- | --- |
| Nano Banana 2.1 | `1K`, `2K`, `4K` output (default `1K`); fixed tiling artifacts on `1:4`, `4:1`, `1:8`, `8:1` at 2K/4K; multi-image fusion up to 14 reference images (4 characters, 10 objects); Grounding with Google Web and Image Search; Thinking levels `minimal`, `medium` (default), `high` |
| Nano Banana 2 | 0.5K, 2K and 4K, default 1K; Image Search Grounding (with Thinking on or off); new 1:4, 4:1, 1:8, 8:1 aspect ratios |
| Nano Banana 2 Lite | Sub-2 second end-to-end latency; 14 aspect ratios; `image_size` `1024px` (1K) only (2K and 4K unsupported); SynthID watermarking (always on) + C2PA |

Imagen and video models:

| Model code | Inputs / Output | Limits | Status | Latest update |
| --- | --- | --- | --- | --- |
| `imagen-4.0-generate-001`, `imagen-4.0-ultra-generate-001`, `imagen-4.0-fast-generate-001` | Text / Images | Input 480 tokens (text); output images 1 to 4 (Ultra/Standard/Fast) | Deprecated; shut down on August 17, 2026 | June 2025 |
| `gemini-omni-1.1-flash` | Text, Image, Video (up to 10s for editing and extension) / Video | Context window 1,048,576 tokens; output video 3s-10s (360p/720p/1080p/4K, 24 FPS) | Stable; Preview: `gemini-omni-flash-preview` | August 2026 |
| `veo-3.1-generate-preview`, `veo-3.1-fast-generate-preview` | Text, Image / Video with audio | Text input 1,024 tokens; output video 1 | Preview (shutdown October 22, 2026 per deprecations; replacement `gemini-omni-1.1-flash`) | January 2026 |
| `veo-3.1-lite-generate-preview` | Text, Image / Video with audio | Text input 1,024 tokens; output video 1 | Preview (shutdown October 22, 2026 per deprecations; replacement `gemini-omni-1.1-flash`) | March 2026 |
| `veo-2.0-generate-001` | Text, image / Video | Image input any resolution and aspect ratio up to 20MB; output video up to 2 | Shut down June 30, 2026 | April 2025 |

## Notes

- Imagen 4 warning (source): "The Imagen 4 standard, ultra, and fast endpoints are deprecated and will be shut down on August 17, 2026; migrate to Gemini 3.1 Flash Image". The models catalog lists "Imagen 4 (Shut down)" as of the fetch date.
- Veo 3.1 Lite Preview does not support 4K outputs or Extension. Veo 2.0 shutdown warning: migrate to Veo 3.1 Preview or the GA models available through the Gemini Enterprise Agent Platform (Google Cloud side, out of scope for this skill).
- Gemini Omni Flash: fast conversational video generation and editing through the Interactions API, with video extension, resolution upscaling and interpolation. The video hub page's content is folded into the omni and veo guides.
- Docs fetched 2026-10-16. API surface: Nano Banana and Omni through the Interactions API (`response_format` `{"type": "image", ...}` appears in the Gemini 3 guide); Veo 3.1 through `generate_videos` / `predictLongRunning` (the source marks Veo as generateContent-API only); see `media-generation/veo.md` for the exact call shape.
- Per the deprecations page, the `veo-3.1-*-preview` IDs and `gemini-omni-flash-preview` shut down October 22, 2026 (replacement `gemini-omni-1.1-flash`).
- Distance: openai-images-video covers gpt-image and Sora, which are different products.

## Related

- [Models](./models-catalog.md)
- [TTS / native audio / Live / transcribe model cards](./audio-live-models.md)
- [Lyria model cards](./music-models.md)
