---
source: https://ai.google.dev/gemini-api/docs/models/gemini-3.8-flash-tts
---

# TTS / native audio / Live / transcribe model cards

Aggregated model cards for text-to-speech, Live API (native audio), live translation and speech-to-text models. One section per source page.

## Signature / Usage

Explicit raw-PCM output on Gemini 3.8 TTS (Interactions API `response_format`, quoted from the TTS migration guide):

```json
{"response_format": {"type": "audio", "mime_type": "audio/l16"}}
```

In `generateContent` the corresponding enum values are `AUDIO_L16`, `AUDIO_MULAW`, `AUDIO_ALAW` (default for Gemini 3.8 TTS unary requests is `audio/wav` / `AUDIO_WAV`).

## Options / Props

| Model code | Inputs / Outputs | Input / output token limit | Status | Latest update |
| --- | --- | --- | --- | --- |
| `gemini-3.8-flash-tts` | Text / Audio | 8,192 / 16,384 (Gemini API serving limit) | Current (no preview label) | September 2026 |
| `gemini-3.8-flash-lite-tts` | Text / Audio | 8,192 / 16,384 (Gemini API serving limit) | Current | September 2026 |
| `gemini-3.1-flash-tts-preview` | Text / Audio | 8,192 / 16,384 | Legacy preview; migrate to 3.8 TTS | April 2026 |
| `gemini-2.5-flash-preview-tts` | Text / Audio | 8,192 / 16,384 | Preview | December 2025 |
| `gemini-2.5-pro-preview-tts` | Text / Audio | 8,192 / 16,384 | Preview | December 2025 |
| `gemini-2.5-flash-native-audio-preview-12-2025` | Audio, video, text / Audio and text | 131,072 / 8,192 | Preview | September 2025 |
| `gemini-3.1-flash-live-preview` | Text, images, audio, video / Text and audio | 131,072 / 65,536 | Legacy preview; update to Gemini 3.8 Live | March 2026 |
| `gemini-3.8-live` | Text, images, audio, video / Text and audio | 131,072 / 65,536 | Stable | September 2026 |
| `gemini-3.8-live-extended-thinking` | Text, images, audio, video / Text and audio | 131,072 / 65,536 | Stable | September 2026 |
| `gemini-3.5-live-translate-preview` | Audio (speech) / Audio (translated speech) and Text (transcript) | 131,072 / 65,536 | Preview | June 2026 |
| `gemini-3.5-transcribe` (unary) / `gemini-3.5-transcribe-live` (Live API) | Audio (up to 1 hour) / Text, Word annotations | Unary audio limit up to 1 hour (30 minutes with diarization or word timestamps); live 10 minutes per session | not listed (the card's Versions row names the unary and Live IDs) | August 2026 |

TTS selection (card table): Flash TTS (130 languages) for maximum fidelity, acting nuance, dialects (audiobooks, studio narration, multi-speaker dialogue); Flash-Lite TTS (101 languages) for throughput, latency and cost (voice agent cascades, read-aloud, voice replication). Flash-Lite TTS is the recommended replacement for `gemini-3.1-flash-tts-preview`; both share the same API schema.

Capabilities:

| Model code | Thinking | Function calling | Search grounding | Batch API | Flex / Priority |
| --- | --- | --- | --- | --- | --- |
| `gemini-3.8-flash-tts`, `gemini-3.8-flash-lite-tts` | Not supported | Not supported | Not supported | Supported | Supported / Supported |
| `gemini-3.1-flash-tts-preview`, `gemini-2.5-pro-preview-tts` | Not supported | Not supported | Not supported | Supported | Not supported |
| `gemini-2.5-flash-preview-tts` | Not supported | Not supported | Not supported | Not supported | Not supported |
| `gemini-2.5-flash-native-audio-preview-12-2025` | Supported | Supported | Supported | Not supported | Not supported |
| `gemini-3.1-flash-live-preview` | Supported | Supported | Supported | Not supported | — |
| `gemini-3.8-live` | Supported (interleaved reasoning) | Supported | Supported | Not supported | — |
| `gemini-3.8-live-extended-thinking` | Supported | Supported (Async only) | Supported | Not supported | — |
| `gemini-3.5-live-translate-preview` | Not supported | Not supported | Not supported | Not supported | Not supported |

`gemini-3.5-transcribe`: audio transcription, speaker diarization (up to 8 speakers; attribution for 3+ speakers is experimental), word-level timestamps, custom vocabulary (up to 1,000 terms; best results with up to 100) and Smart transcription Supported; 85+ languages auto-detected; word timestamps degrade accuracy and are incompatible with custom vocabulary; custom vocabulary is incompatible with diarization and timestamps. Live streaming (`gemini-3.5-transcribe-live`) does not support word timestamps or diarization.

## Notes

- Gemini 3.8 TTS migration from `gemini-3.1-flash-tts-preview`: input text is treated strictly as a verbatim transcript. Move sustained delivery (`style`) and speaker labels (`speaker`) into `speech_metadata` (Interactions API: an annotation with `"type": "speech_metadata"` on each text content block; generateContent: `"speech_metadata": {"speaker": "...", "style": "..."}` on each `part`). Use angle-bracket inline tags only for point-in-time vocal events (`<laugh>`, `<sigh>`, `<cough>`, `<breath>`, `<short pause>`). Every turn in a multi-speaker request must include `speaker`. Design personas with Voice design (`voice_...` ID). Unary default output is WAV (`audio/wav`) instead of raw PCM `audio/l16`; set `response_format.mime_type` to `audio/l16`, `audio/mulaw` or `audio/alaw` when headerless audio is needed. Voices: prebuilt, Extended Voice Library (`GET /v1beta/voices`), Voice design, Voice replication.
- Migrating `gemini-2.5-flash-native-audio-preview-12-2025` to `gemini-3.1-flash-live-preview`: `thinkingLevel` (default `minimal`) replaces `thinkingBudget`; one `BidiGenerateContentServerContent` event can contain multiple parts; `send_client_content` is supported for the whole session and `turn_complete=true` unconditionally interrupts generation; turn coverage defaults to `TURN_INCLUDES_AUDIO_ACTIVITY_AND_ALL_VIDEO`; async function calling, proactive audio and affective dialogue not supported.
- Migrating `gemini-3.1-flash-live-preview` to `gemini-3.8-live`: omit `thinking_level` / `thinking_config`; async function calling (`behavior: NON_BLOCKING`) is the default, `BLOCKING` available, scheduling `SILENT` / `WHEN_IDLE` / `INTERRUPT` supported; proactive audio permanently enabled (`proactive_audio: false` returns an error); affective dialogue removed (`enable_affective_dialog`); audio is the supported response modality (enable output audio transcription for text).
- `gemini-3.8-live-extended-thinking`: `turnComplete: true` no longer indicates the model is idle; monitor `interaction_status` (`IN_PROGRESS` / `IDLE`); only `NON_BLOCKING` function calls (blocking returns a hard error); set `thinking_config` `thinking_level` `low`, `medium` or `high` (`MINIMAL` not supported).
- The source model page spells the scheduling value `INTERRUPTED`; the FunctionResponse API reference and the live-tools examples use `INTERRUPT`, so this page uses `INTERRUPT`.
- Per the deprecations page, `gemini-3.1-flash-tts-preview`, `gemini-2.5-flash-preview-tts`, `gemini-2.5-pro-preview-tts`, `gemini-3.1-flash-live-preview` and `gemini-2.5-flash-native-audio-preview-12-2025` shut down on November 17, 2026 (replacements: `gemini-3.8-flash-tts` / `gemini-3.8-flash-lite-tts` or `gemini-3.8-live`); the model cards do not show this.
- Live API is v1beta only per the api-versions table; Live models are not available through the Batch API.
- Docs fetched 2026-10-16. Supported-language tables (130 languages for Flash TTS, 101 for Flash-Lite TTS, BCP-47 table for Transcribe) are on the source pages and not reproduced here.
- Distance: Gemini Live / TTS differ from the Realtime API and TTS in openai-realtime-audio.

## Related

- [Models](./models-catalog.md)
- [Gemini 2.5 / 2.0 model cards](./gemini-2-models.md)
- [Nano Banana / Imagen / Veo / Omni model cards](./image-video-models.md)
