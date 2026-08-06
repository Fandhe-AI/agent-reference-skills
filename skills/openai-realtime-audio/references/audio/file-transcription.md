# File transcription

Transcribe a completed recording or bounded audio request via `/v1/audio/transcriptions`. Use when audio is already recorded, not arriving live (for live audio use Realtime transcription, scope=realtime).

## Signature / Usage

```javascript
import fs from "fs";
import OpenAI from "openai";

const openai = new OpenAI();

const transcription = await openai.audio.transcriptions.create({
  file: fs.createReadStream("fixtures/audio.wav"),
  model: "gpt-transcribe",
});

console.log(transcription.text);
```

Response (JSON, includes detected languages):

```json
{
  "text": "Bonjour, pouvez-vous m'entendre ?",
  "languages": [{ "code": "fr" }]
}
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `model` | string | `gpt-transcribe` (recommended general-purpose), `gpt-4o-transcribe-diarize` (speaker labels), `whisper-1` (word timestamps, English-only translation), or legacy `gpt-4o-transcribe` / `gpt-4o-mini-transcribe`. |
| `file` | file | Up to 25 MB. Supported formats: `mp3`, `mp4`, `mpeg`, `mpga`, `m4a`, `wav`, `webm`. |
| `prompt` | string | Free-form context about the recording (topic, setting). Combine with `keywords`/`languages` for `gpt-transcribe`. 224-token limit for `whisper-1`. |
| `keywords` | string[] | Literal terms expected in the audio (product names, acronyms). Hints, not required output. `gpt-transcribe` / `gpt-live-transcribe` only. |
| `languages` | string[] | Expected input languages (ISO 639-1, selected ISO 639-3, or `zh-cn`/`zh-tw`/`zh-hk`). Replaces the singular `language` field for `gpt-transcribe`; don't send both. |
| `response_format` | string | `json` (default), `text`, `verbose_json`, or `diarized_json` (with `gpt-4o-transcribe-diarize`). |
| `timestamp_granularities[]` | string[] | `word` or `segment`; `whisper-1` only, requires `response_format: "verbose_json"`. |
| `stream` | boolean | Emits `transcript.text.delta` events, then a final `transcript.text.done`. Not supported by `whisper-1`. |
| `chunking_strategy` | string | `"auto"` or VAD config; required for diarization on audio longer than 30s. |
| `known_speaker_names[]` / `known_speaker_references[]` | string[] | Up to 4 reference clips (2-10s, data URLs) to map diarized segments to known speakers. |

## Notes

- Speaker diarization (`gpt-4o-transcribe-diarize`) is only available via `/v1/audio/transcriptions`, not in Realtime transcription sessions.
- Translation into English uses a separate endpoint, `/v1/audio/translations`, with `whisper-1` only (English output only).
- Keywords are hints — the transcript should include a keyword only when the audio actually contains it; requests are rejected if `prompt` exceeds the model's length limit or a keyword contains `<`, `>`, CR, or LF.
- For files over 25 MB, compress or split the file, avoiding sentence boundaries (e.g. with PyDub).
- For live audio (microphone, call, media stream), use the Realtime transcription guide instead (scope=realtime) — this file-streaming path (`stream: true`) is for completed recordings only, not live audio.

## Related

- [Choosing a transcription workflow](./transcription-workflow.md)
- [Audio and speech (concepts)](./audio-and-speech.md)
