# Managing Realtime API costs

How Realtime API billing works (per-Response tokens for voice-agent sessions, duration-based for translation/transcription) and strategies for reducing cost.

## Signature / Usage

```json
{
  "type": "session.update",
  "session": {
    "truncation": {
      "type": "retention_ratio",
      "retention_ratio": 0.8,
      "token_limits": { "post_instructions": 8000 }
    }
  }
}
```

## Options / Props

| Field | Description |
|------|-------------|
| `response.done.response.usage` | Per-turn `input_tokens` / `output_tokens`, split by text/audio/image and cached tokens |
| `conversation.item.input_audio_transcription.completed.usage` | Separate billing for input transcription (uses a different model, e.g. `whisper-1` / `gpt-4o-transcribe`) |
| `session.truncation.retention_ratio` | Fraction of the max token window retained after a truncation (default `1.0`; lower values reduce how often truncation busts the cache) |
| `session.truncation: "disabled"` | Disable automatic truncation; errors instead if the conversation exceeds the context limit |
| `conversation.item.delete` | Manually remove old items to shrink input token size |

## Notes

- The entire conversation is resent to the model on every Response, so later turns in a session cost more; prompt caching applies automatically when input tokens match a previous Response.
- Audio tokens: ~1 token per 100ms of user audio, ~1 token per 50ms of assistant audio.
- Voice-agent sessions bill per Response (input+output tokens); translation and transcription sessions bill by audio duration instead.
- Changing instructions/tools mid-session busts the cache for all subsequent turns (they sit at the start of the conversation).
- Mini-sized realtime speech-to-speech models are cheaper but weaker at instruction-following/function-calling — validate with the full-size model first.

## Related

- [Conversations](./conversations.md)
- [Overview](./overview.md)
