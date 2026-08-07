# WebSocket Mode

A persistent WebSocket transport for the Responses API, aimed at long-running, tool-call-heavy agentic workflows where repeated HTTP round trips add overhead.

## Signature / Usage

```text
wss://api.openai.com/v1/responses
```

```json
{
  "type": "response.create",
  "response": {
    "model": "gpt-5.6",
    "input": [{ "role": "user", "content": "Search docs and summarize." }],
    "previous_response_id": "resp_abc123"
  }
}
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `response.previous_response_id` | string | Continues a prior turn using the connection's cached response state instead of rebuilding the full conversation |
| `stream` | — | Not used in WebSocket mode (transport-specific HTTP fields like `stream` and `background` do not apply) |

## Notes

- Open a WebSocket connection to `wss://api.openai.com/v1/responses` and send a `response.create` event to start each turn; the payload mirrors a normal Responses API create body.
- For rollouts with 20+ tool calls, up to roughly 40% faster end-to-end execution compared to per-turn HTTP requests.
- The server keeps a connection-scoped, in-memory cache of the most recent response state; a follow-up `response.create` with `previous_response_id` reuses that cache instead of resending the whole conversation.
- Constraints: a single connection processes requests sequentially (no multiplexing); maximum connection duration is 60 minutes; parallel execution requires multiple connections; a failed turn evicts the cached response ID to prevent stale-state reuse.
- Supports both `store=false` and Zero Data Retention modes, though continuation behavior differs based on storage settings.
- After context compaction, start a fresh response chain by omitting `previous_response_id` and using the compacted output as the new base input.
- Reconnection options: reuse a persisted response ID, start a new response, or resume from compacted context.
- Relevant error codes: `previous_response_not_found`, `websocket_connection_limit_reached`.
- This is an OpenAI API (developers.openai.com) guide; it documents the Responses API's own WebSocket transport, not the separate Realtime API (WebSocket/WebRTC) used for audio conversations.

## Related

- [Streaming API Responses](./streaming-responses.md)
- [Function Calling](./function-calling.md)
