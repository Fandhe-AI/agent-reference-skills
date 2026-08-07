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

## Related

- [Cost optimization](./cost-optimization.md)
- [Latency optimization](./latency-optimization.md)
