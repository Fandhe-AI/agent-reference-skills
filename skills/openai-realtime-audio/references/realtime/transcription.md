# Realtime transcription

Stream live transcript deltas from a microphone, call, or other live audio source without a spoken model response.

## Signature / Usage

```json
{
  "type": "session.update",
  "session": {
    "type": "transcription",
    "audio": {
      "input": {
        "format": { "type": "audio/pcm", "rate": 24000 },
        "transcription": { "model": "gpt-live-transcribe" },
        "turn_detection": null
      }
    }
  }
}
```

```javascript
ws.on("message", (data) => {
  const event = JSON.parse(data);
  if (event.type === "conversation.item.input_audio_transcription.delta") {
    process.stdout.write(event.delta);
  }
  if (event.type === "conversation.item.input_audio_transcription.completed") {
    console.log("\nFinal transcript:", event.transcript);
  }
});
```

## Options / Props

| Field | Description |
|------|-------------|
| `session.type` | Must be `"transcription"` |
| `audio.input.transcription.model` | `gpt-live-transcribe` (streaming deltas, no timestamps/speaker labels/confidence) or `gpt-transcribe` (begins after committed turn, WebSocket only, returns detected `languages`) |
| `audio.input.transcription.prompt` | Free-text context (recording setting, vocabulary) |
| `audio.input.transcription.keywords` | Literal terms/product names/acronyms as hints |
| `audio.input.transcription.languages` | Expected input languages (ISO 639-1, selected ISO 639-3, or `zh-cn`/`zh-tw`/`zh-hk`); `gpt-live-transcribe` uses this plural field, not `language` |
| `audio.input.transcription.delay` | `minimal` \| `low` \| `medium` \| `high` \| `xhigh` — latency/accuracy tradeoff |
| `conversation.item.input_audio_transcription.delta` | Server event with incremental transcript text |
| `conversation.item.input_audio_transcription.completed` | Server event with final `transcript` (and `languages` for `gpt-transcribe`) |

## Notes

- Connect via WebSocket for server-side pipelines or WebRTC for browser audio; stream chunks with `input_audio_buffer.append` and, with automatic turn detection off, explicitly `input_audio_buffer.commit`.
- Ordering between completion events across speech turns isn't guaranteed — correlate with `item_id`.
- `gpt-live-transcribe` never returns word-level timestamps, speaker labels, or confidence scores; use file transcription (scope=audio) or an application-level fallback if needed.
- Keywords must not contain `<`, `>`, CR, or LF, or the session update is rejected.

## Related

- [Overview](./overview.md)
- [Voice activity detection](./vad.md)
- [Translation](./translation.md)
