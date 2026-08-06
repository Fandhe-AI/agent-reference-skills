# Voice activity detection (VAD)

Automatic detection of when the user starts/stops speaking, controlling how audio is chunked and (in conversation mode) when a response is triggered.

## Signature / Usage

```json
{
  "type": "session.update",
  "session": {
    "type": "realtime",
    "audio": {
      "input": {
        "turn_detection": {
          "type": "server_vad",
          "threshold": 0.5,
          "prefix_padding_ms": 300,
          "silence_duration_ms": 500,
          "create_response": true,
          "interrupt_response": true
        }
      }
    }
  }
}
```

## Options / Props

| Field | Type | Description |
|------|------|-------------|
| `turn_detection.type` | `"server_vad"` \| `"semantic_vad"` \| `null` | `server_vad` chunks on silence; `semantic_vad` chunks based on whether the utterance sounds complete; `null` disables VAD |
| `threshold` (server_vad) | number 0-1 | Activation threshold; higher requires louder audio (better in noisy environments) |
| `prefix_padding_ms` (server_vad) | ms | Audio to include before detected speech |
| `silence_duration_ms` (server_vad) | ms | Silence duration to detect speech stop; shorter = faster turn detection |
| `eagerness` (semantic_vad) | `"low"` \| `"medium"` \| `"high"` \| `"auto"` | Tunes max wait timeout; `auto` = `medium` |
| `create_response` / `interrupt_response` | boolean | Conversation-mode only; controls auto-response creation/interruption |

## Notes

- Enabled by default (`server_vad`) in speech-to-speech sessions; can be turned off.
- In transcription sessions, VAD support depends on the model — `gpt-realtime-whisper` requires `turn_detection` omitted or `null`; other transcription models default to `server_vad`.
- Server emits `input_audio_buffer.speech_started` / `input_audio_buffer.speech_stopped` when VAD detects turn boundaries.

## Related

- [Conversations](./conversations.md)
- [Transcription](./transcription.md)
