# Choosing a transcription workflow

Decision guide for picking a transcription workflow (file vs. realtime) and a starting model based on required capabilities.

## Signature / Usage

Choose a workflow based on whether audio is already recorded or arriving live:

| Workflow | Use when | Recommended model |
|----------|----------|--------------------|
| File transcription | Completed recording or bounded audio request; upload and receive a transcript, or stream text while processing. | `gpt-transcribe` |
| Realtime transcription | Microphone, call, or other live audio stream needing text as speech arrives (scope=realtime). | `gpt-live-transcribe` |

Streaming output and live audio are separate decisions — a completed file's transcription can be streamed without opening a Realtime session.

## Options / Props

| If you need | Use |
|--------------|-----|
| Speaker-labeled transcripts | `gpt-4o-transcribe-diarize` with file transcription. |
| Word timestamps or `srt`/`vtt` subtitles | `whisper-1` with file transcription. |
| Translation of a completed recording into English | `whisper-1` with the audio translations endpoint. |
| Detected input languages | `gpt-transcribe` with file transcription. |
| Committed-turn transcription over WebSocket | `gpt-transcribe` with realtime transcription (scope=realtime). |

`gpt-transcribe` and `gpt-live-transcribe` accept three context inputs: `prompt` (free-form context), `keywords` (literal terms expected in the audio), and `languages` (expected input languages, plural field replacing the legacy singular `language`).

## Notes

- Legacy models `gpt-4o-transcribe`, `gpt-4o-mini-transcribe`, `gpt-realtime-whisper` remain supported for existing integrations but are not the recommended starting models for new work.
- When `gpt-transcribe` runs in a Realtime API session or dedicated transcription session, it automatically uses earlier transcribed turns as context.
- Test transcription with representative audio: target languages/accents/code-switching, background noise, telephony quality, names/numbers/domain terminology, short vs. long utterances. Track application-specific errors rather than relying only on word error rate.

## Related

- [File transcription](./file-transcription.md)
- [Audio and speech (concepts)](./audio-and-speech.md)
