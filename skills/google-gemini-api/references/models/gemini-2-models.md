---
source: https://ai.google.dev/gemini-api/docs/models/gemini-2.5-pro
---

# Gemini 2.5 / 2.0 model cards

Aggregated model cards for Gemini 2.5 Pro, 2.5 Flash, 2.5 Flash-Lite (stable and 09-2025 previews) and Gemini 2.0 Flash / Flash-Lite. One section per source page.

## Signature / Usage

The cards contain no code; model codes and version rows as listed on the pages:

```text
gemini-2.5-pro   Versions: Stable: gemini-2.5-pro
gemini-2.5-flash   Versions: Stable: gemini-2.5-flash; Shut down: gemini-2.5-flash-preview-09-2025
gemini-2.5-flash-lite   Versions: Stable: gemini-2.5-flash-lite; Shut down: gemini-2.5-flash-lite-preview-09-2025
gemini-2.0-flash   Versions: Shut down: gemini-2.0-flash, gemini-2.0-flash-001, gemini-2.0-flash-exp
gemini-2.0-flash-lite   Versions: Shut down: gemini-2.0-flash-lite, gemini-2.0-flash-lite-001
```

## Options / Props

| Model code | Inputs / Output | Input / output token limit | Status | Latest update | Knowledge cutoff |
| --- | --- | --- | --- | --- | --- |
| `gemini-2.5-pro` | Audio, images, video, text, and PDF / Text | 1,048,576 / 65,536 | Stable | June 2025 | January 2025 |
| `gemini-2.5-flash` | Text, images, video, audio / Text | 1,048,576 / 65,536 | Stable | June 2025 | January 2025 |
| `gemini-2.5-flash-preview-09-2025` | Text, images, video, audio / Text | 1,048,576 / 65,536 | Shut down (as of February 17, 2026; migrate to Gemini 2.5 Flash) | September 2025 | January 2025 |
| `gemini-2.5-flash-lite` | Text, image, video, audio, PDF / Text | 1,048,576 / 65,536 | Stable | July 2025 | January 2025 |
| `gemini-2.5-flash-lite-preview-09-2025` | Text, image, video, audio, PDF / Text | 1,048,576 / 65,536 | Shut down (as of March 31, 2026; migrate to Gemini 3.1 Flash-Lite) | September 2025 | January 2025 |
| `gemini-2.0-flash` | Audio, images, video, and text / Text | 1,048,576 / 8,192 | Shut down June 1, 2026 (migrate to Gemini 3.8 Flash) | February 2025 | August 2024 |
| `gemini-2.0-flash-lite` | Audio, images, video, and text / Text | 1,048,576 / 8,192 | Shut down June 1, 2026 (migrate to Gemini 3.1 Flash-Lite) | February 2025 | August 2024 |

Capabilities:

| Model code | Caching | Code execution | File search | Maps grounding | Search grounding | Structured outputs | Thinking | URL context |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| `gemini-2.5-pro` / `gemini-2.5-flash` / `gemini-2.5-flash-lite` | Supported | Supported | Supported | Supported | Supported | Supported | Supported | Supported |
| `gemini-2.5-flash-preview-09-2025` / `gemini-2.5-flash-lite-preview-09-2025` | Supported | Supported | Supported | Not supported | Supported | Supported | Supported | Supported |
| `gemini-2.0-flash` | Supported | Supported | Not supported | Supported | Supported | Supported | Experimental | Not supported |
| `gemini-2.0-flash-lite` | Supported | Not supported | Not supported | Not supported | Not supported | Supported | Not Supported | Not supported |

On every card: Audio generation, Image generation and Live API are Not supported; Function calling is Supported. Consumption options: Batch API Supported on all; Flex inference and Priority inference Supported on 2.5 Pro / Flash / Flash-Lite stable, Not supported on the 09-2025 previews and the 2.0 models.

## Notes

- The deprecations table lists `gemini-3.6-flash` as the replacement for both `gemini-2.0-flash` and the 2.5 Flash 09 preview, while the cards recommend Gemini 3.8 Flash and Gemini 2.5 Flash respectively (see migration/deprecations.md).
- Source note on stable 2.5 models: "we are limiting access to the 2.5 models to users who have actively used them in the past. These models are not deprecated and will continue to be served until further notice through the API. For any new projects, use our latest models: 3.5 Flash-Lite or 3.8 Flash."
- Gemini 2.0 Flash and 2.0 Flash-Lite warnings: "deprecated and has been shut down June 1, 2026."
- Descriptions: 2.5 Pro is the state-of-the-art thinking model for complex problems in code, math, and STEM and long-context analysis; 2.5 Flash is the best price-performance model for large scale, low-latency, high volume tasks that require thinking and agentic use cases; 2.5 Flash-Lite is the most cost-efficient multimodal model for high-volume classification, simple data extraction and extremely low-latency applications.
- Gemini 3 guides recommend Gemini 2.5 Flash with thinking off for image segmentation, which Gemini 3.x does not support.
- Docs fetched 2026-10-16. API surface: model cards apply to both the Interactions API and generateContent.

## Related

- [Models](./models-catalog.md)
- [Gemini 4 / 3.x model cards](./gemini-4-3-models.md)
- [TTS / native audio / Live / transcribe model cards](./audio-live-models.md)
