---
source: https://ai.google.dev/gemini-api/docs/models/lyria-3.5
---

# Lyria model cards

Aggregated model cards for Lyria 3.5, Lyria 3 (Pro / Clip) and Lyria RealTime music generation models. One section per source page.

## Signature / Usage

The cards contain no code; model codes as listed on the pages:

```text
lyria-3.5
lyria-3.5-pro-preview
lyria-3.5-clip-preview
lyria-3-pro-preview
lyria-3-clip-preview
lyria-realtime-exp
```

## Options / Props

| Model code | Description (card) | Inputs / Output | Limits | Status | Latest update |
| --- | --- | --- | --- | --- | --- |
| `lyria-3.5` | Flagship; full-length songs with complex structural coherence (multiple verses, choruses, bridges); 44.1 kHz stereo audio from text prompts or image inputs | Text and Image / Audio (MP3), Text (Lyrics) | Input token limit 131,072 | Stable | September 2026 |
| `lyria-3.5-pro-preview` | Same description as Lyria 3.5 | Text and Image / Audio (MP3), Text (Lyrics) | Input token limit 131,072 | Preview | September 2026 |
| `lyria-3.5-clip-preview` | Short musical clips, loops, previews; 30-second 44.1 kHz stereo audio | Text and Image / Audio (MP3), Text (Lyrics) | Input token limit 131,072 | Preview | September 2026 |
| `lyria-3-pro-preview` | Full-length songs; 48kHz stereo audio | Text and Image / Audio (MP3), Text (Lyrics) | Input token limit 131,072 | Preview | March 2026 |
| `lyria-3-clip-preview` | Short clips, loops, previews; 30-second 48kHz stereo audio | Text and Image / Audio (MP3), Text (Lyrics) | Input token limit 131,072 | Preview | March 2026 |
| `lyria-realtime-exp` | Experimental engine for generating and transforming audio; AI-assisted songwriting, instrumental generation, no vocals | Text (Weighted prompts) / Audio (Raw 16-bit PCM) | Sample rate 48kHz (Stereo); control latency maximum 2 seconds | Experimental | May 2025 |

On all non-realtime Lyria cards: Audio generation Supported; Caching, Code execution, File search, Function calling, Maps grounding, Image generation, Live API, Search grounding, Structured outputs, Thinking, URL context Not supported; Batch API, Flex inference and Priority inference Not supported (the `lyria-3.5` card marks Audio generation Supported as well).

## Notes

- Source inconsistencies (reproduced from the pages): the `lyria-3.5-clip-preview` card's Model code row reads `lyria-3.5-pro-preview`, and the `lyria-3-pro-preview` card's Model code row reads `lyria-3-clip-preview`; the page titles and Versions rows list both preview codes. Use the page/endpoint names above, not the mislabelled Model code rows.
- The catalog page lists Lyria 3.5, Lyria 3 Clip, Lyria 3 Pro and Lyria RealTime under "Music generation models"; `lyria-3.5-pro-preview` and `lyria-3.5-clip-preview` appear only as card pages.
- Lyria RealTime is documented under "Realtime music generation" (Live API, v1beta only per the api-versions table).
- Docs fetched 2026-10-16. API surface: Lyria 3.x via the Music generation guide (Interactions API / generateContent have separate guides in this skill); Lyria RealTime via the Live API.

## Related

- [Models](./models-catalog.md)
- [Nano Banana / Imagen / Veo / Omni model cards](./image-video-models.md)
- [Embedding model cards](./embedding-models.md)
