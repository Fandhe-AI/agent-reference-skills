---
source: https://ai.google.dev/gemini-api/docs/models
---

# Models

Catalog of all models available through the Gemini API, grouped by generation and by purpose, with the model string naming patterns (stable / preview / latest / experimental).

## Signature / Usage

```text
| Model | Endpoint |
|---|---|
| Gemini 3.8 Flash | gemini-3.8-flash |
| Gemini 3.8 Live | gemini-3.8-live |
| Gemini 3.8 Live Extended Thinking | gemini-3.8-live-extended-thinking |
| Gemini 3.8 Flash TTS | gemini-3.8-flash-tts |
| Gemini 3.8 Flash-Lite TTS | gemini-3.8-flash-lite-tts |
| Gemini 3.6 Flash | gemini-3.6-flash |
| Gemini 3.5 Flash-Lite | gemini-3.5-flash-lite |
| Gemini 3.1 Flash-Lite | gemini-3.1-flash-lite |
| Nano Banana 2.1 | gemini-nano-banana-2.1 |
| Nano Banana 2 | gemini-3.1-flash-image |
| Nano Banana 2 Lite | gemini-3.1-flash-lite-image |
| Nano Banana Pro | gemini-3-pro-image |
| Gemini 3.1 Pro | gemini-3.1-pro-preview |
| Gemini 3 Flash | gemini-3-flash-preview |
| Gemini 3.5 Live Translate | gemini-3.5-live-translate-preview |
| Gemini 3.1 Flash Live | gemini-3.1-flash-live-preview |
| Gemini 3.1 Flash TTS | gemini-3.1-flash-tts-preview |
| Gemini Omni Flash | gemini-omni-1.1-flash |
| Gemini 3.5 Transcribe | gemini-3.5-transcribe gemini-3.5-transcribe-live |
```

## Options / Props

Other model groups on the page (model name to endpoint string):

| Group | Model | Endpoint |
| --- | --- | --- |
| Gemini 2.5 Flash | Gemini 2.5 Flash | `gemini-2.5-flash` |
| Gemini 2.5 Flash | Nano Banana | `gemini-2.5-flash-image` |
| Gemini 2.5 Flash | Gemini 2.5 Flash Live | `gemini-2.5-flash-native-audio-preview-12-2025` |
| Gemini 2.5 Flash | Gemini 2.5 Flash TTS | `gemini-2.5-flash-preview-tts` |
| Gemini 2.5 Flash-Lite | Gemini 2.5 Flash-Lite | `gemini-2.5-flash-lite` |
| Gemini 2.5 Pro | Gemini 2.5 Pro | `gemini-2.5-pro` |
| Gemini 2.5 Pro | Gemini 2.5 Pro TTS | `gemini-2.5-pro-preview-tts` |
| Generative media | Veo 3.1 | `veo-3.1-generate-preview` |
| Generative media | Veo 3.1 Lite | `veo-3.1-lite-generate-preview` |
| Generative media | Imagen 4 (Shut down) | `imagen-4.0-generate` |
| Music generation | Lyria 3.5 | `lyria-3.5` |
| Music generation | Lyria 3 Clip | `lyria-3-clip-preview` |
| Music generation | Lyria 3 Pro | `lyria-3-pro-preview` |
| Music generation | Lyria RealTime | `lyria-realtime-exp` |
| Tool and agent | Gemini Deep Research | `deep-research-preview-04-2026` |
| Tool and agent | Gemini Deep Research Max | `deep-research-max-preview-04-2026` |
| Tool and agent | Antigravity Agent | `antigravity-preview-09-2026` |
| Specialized task | Gemini Embedding 2 | `gemini-embedding-2-preview` |
| Specialized task | Gemini Embedding | `gemini-embedding-001` |
| Specialized task | Gemini Robotics ER 2 | `gemini-robotics-er-2-preview` |
| Specialized task | Gemini Robotics ER 1.6 | `gemini-robotics-er-1.6-preview` |
| Previous models (Shut down) | Computer Use | `gemini-2.5-computer-use-preview-10-2025` |
| Previous models (Shut down) | Gemini 2.0 Flash | `gemini-2.0-flash` |
| Previous models (Shut down) | Gemini 2.0 Flash-Lite | `gemini-2.0-flash-lite` |
| Previous models (Shut down) | Gemini 3.1 Flash-Lite Preview | `gemini-3.1-flash-lite-preview` |
| Previous models (Shut down) | Gemini 3 Pro Preview | `gemini-3-pro-preview` |

Model version name patterns:

| Pattern | Meaning (source wording) | Example |
| --- | --- | --- |
| Stable | Points to a specific stable model. Stable models usually don't change. Most production apps should use a specific stable model. | `gemini-3.6-flash` |
| Preview | May be used for production. Typically has billing enabled, might come with more restrictive rate limits and will be deprecated with at least 2 weeks notice. | `gemini-2.5-flash-preview-09-2025` |
| Latest | Points to the latest release for a specific model variation; hot-swapped with every new release. For breaking changes, a 2-week notice is provided through email before the version behind latest is changed. | `gemini-flash-latest` |
| Experimental | Typically not suitable for production, more restrictive rate limits; availability subject to change. | — |

## Notes

- The catalog row for Gemini Robotics ER 1.6 (`gemini-robotics-er-1.6-preview`) is past its August 31, 2026 shutdown date on the deprecations page (see migration/deprecations.md).
- The naming convention list is stated "as of September, 2025"; models released earlier may have different naming conventions.
- Source note for Gemini 2.5 models: access is limited to users who have actively used them in the past. "These models are not deprecated and will continue to be served until further notice through the API. For any new projects, use our latest models: 3.5 Flash-Lite or 3.8 Flash."
- Source note under "Previous models": "These models are deprecated and will be shut down soon; migrate to newer models to prevent service interruptions." Entries marked "(Shut down)" are listed in the table.
- Docs fetched 2026-10-16. The catalog page does not list `gemini-4-argon` (it is documented on the latest-model page); see `whats-new-gemini-4-argon.md`.
- Per-model specs are aggregated in `gemini-4-3-models.md`, `gemini-2-models.md`, `audio-live-models.md`, `image-video-models.md`, `music-models.md`, `embedding-models.md`, `agent-models.md`, `specialized-models.md`.
- API surface: model catalog applies to both the Interactions API and generateContent; the Interactions API is the recommended surface for new projects.

## Related

- [Gemini 3 developer guide](./gemini-3-developer-guide.md)
- [What's new in Gemini 4 Argon](./whats-new-gemini-4-argon.md)
- [Gemini 4 / 3.x model cards](./gemini-4-3-models.md)
