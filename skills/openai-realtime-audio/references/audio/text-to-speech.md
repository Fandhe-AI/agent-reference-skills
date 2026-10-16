# Text to speech

Convert text into spoken audio via the `speech` endpoint (`/v1/audio/speech`), based on the GPT-4o mini TTS model, with 13 built-in voices.

## Signature / Usage

```javascript
import fs from "fs";
import OpenAI from "openai";

const openai = new OpenAI();

const mp3 = await openai.audio.speech.create({
  model: "gpt-4o-mini-tts",
  voice: "coral",
  input: "Today is a wonderful day to build something people love!",
  instructions: "Speak in a cheerful and positive tone.",
});

const buffer = Buffer.from(await mp3.arrayBuffer());
await fs.promises.writeFile("speech.mp3", buffer);
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `model` | string | `gpt-4o-mini-tts` (recommended, controllable via `instructions`), or legacy `tts-1` (lower latency) / `tts-1-hd` (higher quality). |
| `input` | string | Text to convert to speech. |
| `voice` | string | One of `alloy`, `ash`, `ballad`, `coral`, `echo`, `fable`, `nova`, `onyx`, `sage`, `shimmer`, `verse`, `marin`, `cedar`. `tts-1`/`tts-1-hd` support a smaller subset (no `marin`/`cedar`). `marin` and `cedar` are recommended for best quality. Can also be `{ "id": "voice_123abc" }` for a custom voice. |
| `instructions` | string | Prompt to control accent, emotional range, intonation, speed, tone, whispering (`gpt-4o-mini-tts` only). |
| `response_format` | string | `mp3` (default), `opus`, `aac`, `flac`, `wav`, `pcm` (24kHz 16-bit raw samples, no header). Use `wav`/`pcm` for lowest latency streaming. |

## Notes

- Supports realtime streaming via chunk transfer encoding — audio can play before the full file is generated.
- Voices are optimized for English; language support otherwise follows Whisper's language list.
- Realtime API voice options differ slightly — see the realtime conversations guide (scope=realtime).
- Custom voices: the TTS guide now keeps only a short "Custom voices" section pointing to the dedicated guide (eligibility, consent phrases, constraints, use with GPT-Live). Created via `/v1/audio/voice_consents` then `/v1/audio/voices`. See [Custom voices](./custom-voices.md). (The consent-phrase table in that guide lists 16 languages, which matches the former note.)
- Deprecation ([deprecations](https://developers.openai.com/api/docs/deprecations) "2026-10-01: Text-to-speech models"): `tts-1`, `tts-1-hd`, `gpt-4o-mini-tts-2025-03-20`, and `gpt-4o-mini-tts-2025-12-15` are removed from the API on Jan 6, 2027; migrate to `gpt-realtime-2.1-mini`. The TTS guide body still recommends `gpt-4o-mini-tts`, so the guide and the deprecations page disagree.
- The source itself is inconsistent about voice count: the intro says "11 built-in voices", while the "Voice options" section says "13 built-in voices" and lists 13. The table above follows the list (13).
- OpenAI's usage policies require disclosing to end users that TTS voices are AI-generated, not human.

## Related

- [Audio and speech (concepts)](./audio-and-speech.md)
- [File transcription](./file-transcription.md)
