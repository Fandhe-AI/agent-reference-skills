# Managing Costs (Realtime API)

Monitoring and reducing token spend for Realtime API voice-agent sessions.

## Billing overview

Realtime sessions accrue input/output tokens across text, audio, and image modalities. Cost is incurred per Response created, from input + output token counts.

- Audio tokens (user messages): 1 token per 100ms.
- Audio tokens (assistant messages): 1 token per 50ms.
- The full conversation history is resent with every Response, so later turns in a session become progressively more expensive.
- Input transcription (e.g. Whisper-1) is billed separately from the conversation model.

## Cost optimization strategies

- **Prompt caching** — applied automatically when input tokens match a previous Response; can significantly reduce cost in multi-turn sessions.
- **Conversation truncation** — limit the context window via `token_limits.post_instructions`; set a `retention_ratio` less than 1 to bound growth.
- **Model selection** — choose mini-sized models for lower cost, trading off instruction-following capability.
- **Manual conversation editing** — delete old messages or replace them with summaries to reduce token consumption.
- **Testing** — measure actual token usage in the Realtime Playground before deploying.

## Streaming translation and transcription sessions

- Streaming translation and streaming transcription sessions (models `gpt-realtime-translate`, `gpt-realtime-whisper`) are billed by audio duration, not per-Response token usage. They use a different streaming architecture and don't use the normal Response lifecycle; estimate and monitor them with duration-based rates.
- There is currently no cost for network bandwidth or connections.
- Voice activity detection (VAD) filters out empty input audio, so empty audio doesn't count as input tokens unless the client adds it manually.

## Reading usage

- Per-Response token usage: the `usage` object in the `response.done` event.
- Input transcription token counts: the `conversation.item.input_audio_transcription.completed` event.

## Notes

- Source page moved: the official page is now https://developers.openai.com/api/docs/guides/voice-latency-cost (Realtime API tab); `/guides/realtime-costs` redirects there (checked 2026-10-17).
- Prompt caching is best-effort and not guaranteed. Removing or changing conversation content busts the cache up to the point of the change; changing instructions or tools mid-session lowers the cache rate for subsequent turns.
- Truncation can be completely disabled (an error is returned when the Conversation is too long to create a Response); useful for managing Conversation size manually. Old items can be removed with `conversation.item.delete`.
- GPT-Live (per-second voice session billing) is documented on the same official page under a separate tab and is not covered here; session mechanics belong to openai-realtime-audio.
- The official guide's snippet shows the key as `event`; Realtime client events are identified by `type` (consistent with the Realtime API client event schema), so the example here uses `type`.

```json
{
  "type": "session.update",
  "session": {
    "truncation": "disabled"
  }
}
```

## Related

- [Cost optimization](./cost-optimization.md)
- [Latency optimization](./latency-optimization.md)
