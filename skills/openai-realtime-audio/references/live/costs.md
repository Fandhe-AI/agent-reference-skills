# GPT-Live usage and costs

GPT-Live separates the voice conversation (billed by duration) from the backend that reasons and runs tools (billed by model and tool usage). Estimate the two separately.

## Signature / Usage

Cumulative voice duration event (each update replaces the previous snapshot; do not sum):

```json
{
  "type": "session.usage.updated",
  "event_id": "event_usage_1",
  "usage": { "seconds": 12 },
  "context_window": { "usage_ratio": 0.42 }
}
```

Restore a conversation in a new session with saved context:

```json
{
  "type": "session.start",
  "session": {
    "model": "gpt-live-1",
    "instructions": "Help the user review completed work and delegate follow-up tasks.",
    "input": [
      {
        "type": "message",
        "role": "developer",
        "content": [
          {
            "type": "input_text",
            "text": "Saved task: add CSV export. Result: code is ready for review."
          }
        ]
      }
    ],
    "delegation": { "type": "client" }
  }
}
```

## Options / Props

Total cost = (billable voice seconds / 60 x voice rate per minute) + backend costs. Worked example from the guide at an illustrative $0.05 per minute:

| Component | Calculation | Cost |
|-----------|-------------|------|
| Voice session | 90 seconds / 60 x $0.05 | $0.075 |
| Backend work | Total model and tool costs | $0.02 |
| Conversation total | $0.075 + $0.02 | $0.095 |

## Notes

- Voice sessions bill per second at the model rate (`gpt-live-1`: $0.05 per minute, billed per second, per the model page); duration is not rounded up to a whole minute. Active session time covers user speech, assistant speech, silence, and backend work. Muting microphone input does not close the session.
- A `POST /v1/live/sessions` request creating a WebRTC session bills 15 seconds of voice duration during initialization, credited against duration charges once the session runs; do not add another 15 seconds (a 90-second session already includes it and is not billed as 105 seconds). Account for this when evaluating reconnects.
- Backend calls bill separately: model input/output tokens, cached input where supported, image or tool charges, and any other services your app calls. Use prompt caching by keeping reusable instructions and tool definitions at the start of the prompt.
- Strategies: provide relevant context before the session; reduce waiting on tools (Fast mode, parallel independent tool calls, speculative lookups from transcript fragments, counting unused speculative work); close the session during long tasks and resume with saved context or a fork (`store: true`); choose the backend model by cost per successful task including retries.
- Closing saves $0.05 per minute of idle voice time; compare that with reconnection cost and user interruption.
- Monitor: record voice duration and backend usage separately per session. After `session.close`, keep receiving until `session.closed` and record its final `usage.seconds` once. With Responses delegation, read backend `usage` from nested `response.completed` events delivered via `response.event`, counting each response once by response ID.
- This is the GPT-Live variant of the cost guide; the Realtime API bills per-Response tokens instead.

## Related

- [Overview](./overview.md)
- [Sessions](./sessions.md)
- [Delegation](./delegation.md)
- [WebRTC](./webrtc.md)
