<!-- source: https://platform.claude.com/docs/en/managed-agents/event-deltas / last verified: 2026-10-17 -->

# Preview responses with event deltas

Event deltas render the agent's response text incrementally as a live preview while the model is still generating it. By default, response text arrives only as buffered `agent.message` events, emitted after the model request finishes. Previews are a best-effort display aid; the buffered `agent.message` is always the authoritative record. Beta header: `managed-agents-2026-04-01`.

## Signature / Usage

Opt in per stream connection with the `event_deltas[]` query parameter (repeat once per event type):

```bash
curl --fail-with-body -sS -N \
  "https://api.anthropic.com/v1/sessions/$SESSION_ID/events/stream?beta=true&event_deltas%5B%5D=agent.message" \
  -H "x-api-key: $ANTHROPIC_API_KEY" \
  -H "anthropic-version: 2023-06-01" \
  -H "anthropic-beta: managed-agents-2026-04-01" \
  -H "accept: text/event-stream"
```

```python
with client.beta.sessions.events.stream(
    session.id, event_deltas=["agent.message"]
) as stream:
    for event in stream:
        match event.type:
            case "event_start":
                snapshot = accumulate_managed_agents_event(None, event)
                if snapshot is not None:
                    previews[event.event.id] = snapshot
            case "event_delta":
                preview = accumulate_managed_agents_event(previews.get(event.event_id), event)
                if preview is not None:
                    previews[event.event_id] = preview
            case "agent.message":
                # The buffered event is the record: it replaces and closes the preview
                preview = accumulate_managed_agents_event(previews.pop(event.id, None), event)
            case "span.model_request_end":
                previews.clear()
            case "session.status_idle":
                break
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `event_deltas[]` | query parameter (repeatable) | Event types to preview. Accepted values: `agent.message`, `agent.thinking`. Any other value, or more than 100 values, returns 400. |

Accepted on both stream endpoints:

- Session-level stream: `GET /v1/sessions/{session_id}/events/stream`
- Session thread stream: `GET /v1/sessions/{session_id}/threads/{thread_id}/stream`

`[]` is a shell glob, so quote the URL or percent-encode the brackets as `%5B%5D`.

Preview events:

```json
{
  "type": "event_start",
  "event": { "type": "agent.message", "id": "sevt_01abc..." }
}
```

```json
{
  "type": "event_delta",
  "event_id": "sevt_01abc...",
  "delta": {
    "type": "content_delta",
    "index": 0,
    "content": { "type": "text", "text": "Here is the summary" }
  }
}
```

| Event | Description |
|-------|-------------|
| `event_start` | Announces the upcoming event's type and `id`. |
| `event_delta` | For `agent.message`: incremental text. Names the event in `event_id` and the content block in `delta.index`. |

For `agent.thinking` only `event_start` is emitted (a signal a thinking block started); no `event_delta` follows, and the concluding buffered `agent.thinking` carries no thinking content.

## Accumulate and reconcile

Hold preview text in a temporary map keyed by `(event_id, index)`; treat the buffered event as the record. Per model request, events arrive in order: `span.model_request_start`, `event_start`, the `event_delta` events, the buffered `agent.message`, `span.model_request_end`.

1. On `event_start`, note the announced `id` (it equals every `event_delta.event_id` and the buffered `agent.message`'s `id`).
2. On each `event_delta`, append `delta.content.text` to the entry at `(event_id, delta.index)`; the first delta for an `index` creates it.
3. When the buffered `agent.message` arrives, match by `id`, discard the preview, render the message's content.
4. On `span.model_request_end`, close any preview not reconciled (the buffered event might never arrive on error or interrupt).

Guarantees: concatenating a preview's deltas in arrival order per `(event_id, index)` gives a prefix of `content[index].text` (not necessarily all, as deltas can be shed); a connection emits at most one `event_start` per `event_id`, and the buffered event is the last thing delivered for that `id`.

Every SDK with event-delta support ships an accumulator helper (e.g. `accumulate_managed_agents_event` in Python, `accumulateManagedAgentsEvent` in TypeScript, `BetaManagedAgentsEventAccumulator` in Go, `EventAccumulator::accumulate()` in PHP). Go, Java, Ruby, and C# helpers key the preview by event `id`; with Python, TypeScript, and PHP keep that map yourself.

## Notes

- `event_start` / `event_delta` have no `id` or `processed_at` of their own and their type strings are an exception to the `{domain}.{action}` naming of persisted events.
- Different wire format from Messages API streaming: one `event_start` followed only by `event_delta`; no per-content-block start/stop events and no stop event for the previewed event; delta type is `content_delta`, not `content_block_delta`. Messages API accumulator code does not carry over.
- Session thread previews: in a multiagent session each thread stream takes the same `event_deltas[]` with the same values. A connection previews only the thread it reads; a child thread's previews are never cross-posted to the session-level stream. The path ends in `/threads/{thread_id}/stream` (there is no `/threads/{thread_id}/events/stream`). Run one accumulator per stream connection.
- Limitations: best effort (under load the server can shed deltas, leaving a contiguous prefix; never treat a preview as final); no replay on reconnect (a connection opened after a request started gets no deltas for that in-flight event); text only on one thread (tool use, tool results, MCP results never previewed); never persisted (absent from `GET /v1/sessions/{session_id}/events` and thread event history).
- Troubleshooting: no `event_start`/`event_delta` means the connection did not opt in or the turn never touched the streamed thread; a dropped stream means reopen and list event history (follow the reconnect procedure in the event stream docs); a 404 on a thread stream URL means a wrong path/ID or a missing managed-agents beta header; a 400 naming `event_deltas` means a value other than `agent.message` / `agent.thinking`.
- Beta feature (`managed-agents-2026-04-01`).

## Related

- [Session Event Stream](./events-and-streaming.md)
- [Multiagent orchestration](./multiagent-orchestration.md)
- [Session threads](./session-threads.md)
