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
    "model": "gpt-6-astra",
    "stream_id": "main",
    "input": [{ "role": "user", "content": "Search docs and summarize." }],
    "previous_response_id": "resp_abc123"
  }
}
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `response.previous_response_id` | string | Continues a prior turn using the connection's cached response state instead of rebuilding the full conversation |
| `response.stream_id` | string | Names an ordered lane on the connection. 1–256 characters (letters, numbers, `_`, `-`, `.`); WebSocket `response.create` only (not HTTP). Omit it to use the implicit default lane (events then carry no `stream_id`); an empty string is invalid |
| `stream` | — | Not used in WebSocket mode (transport-specific HTTP fields like `stream` and `background` do not apply) |

## Notes

- Open a WebSocket connection to `wss://api.openai.com/v1/responses` and send a `response.create` event to start each turn; the payload mirrors a normal Responses API create body.
- For rollouts with 20+ tool calls, up to roughly 40% faster end-to-end execution compared to per-turn HTTP requests.
- The server keeps a connection-scoped, in-memory cache of the most recent response state; a follow-up `response.create` with `previous_response_id` reuses that cache instead of resending the whole conversation.
- Parallel lanes: `stream_id` multiplexes one connection. Requests with the same `stream_id` run first-in, first-out and never overlap; requests with different `stream_id` values can run concurrently, and their events can interleave (route by `stream_id` in one reader loop). `stream_id` controls event routing and ordering; `previous_response_id` controls conversation lineage.
- Limits per connection: up to 16 in-flight responses across named and default lanes (extra `response.create` events are queued), and up to 32 distinct named `stream_id` values (the default lane is not counted). Maximum connection duration is 60 minutes; a failed turn evicts the cached response ID to prevent stale-state reuse.
- Fork: send a completed response's ID as `previous_response_id` with a new `stream_id`; the new lane inherits its context while the original lane keeps going. With `store=false` / ZDR the parent must stay in the connection-local cache, so wait for the fork lane's `response.in_progress` before advancing the source lane (otherwise `previous_response_not_found`; retry with `previous_response_id` null and the full input). Reusing a `stream_id` without `previous_response_id` starts a new response.
- Errors that can be tied to a named lane include `stream_id`; other lanes continue after a request-scoped error. Reaching the 32 named-stream limit returns an error with `param` `stream_id`.
- Mid-turn steering over WebSocket (sending extra user instructions while the model is working, GPT-6) is covered by the steering page in this category.
- Supports both `store=false` and Zero Data Retention modes, though continuation behavior differs based on storage settings.
- After context compaction, start a fresh response chain by omitting `previous_response_id` and using the compacted output as the new base input.
- Reconnection options: reuse a persisted response ID, start a new response, or resume from compacted context.
- Relevant error codes: `previous_response_not_found`, `websocket_connection_limit_reached`.
- This is an OpenAI API (developers.openai.com) guide; it documents the Responses API's own WebSocket transport, not the separate Realtime API (WebSocket/WebRTC) used for audio conversations.

## Related

- [Streaming API Responses](./streaming-responses.md)
- [Function Calling](./function-calling.md)
