# Events and Items

Events report what happens as an agent works; items are the saved messages and tool calls retrievable later. Use events for real-time updates and items for saved history.

## Signature / Usage

```python
# Pass your saved session ID to this helper.
def stream_session(client: OpenAI, session_id: str, handle_event):
    with client.beta.agents.sessions.events.stream(session_id) as events:
        for event in events:
            handle_event(event)
            match event.type:
                case "agent.session.idle":
                    continue
                case "error":
                    raise RuntimeError(event.error.message)
                case "agent.session.failed" | "agent.session.environment.failed":
                    raise RuntimeError(f"Agent lifecycle failure: {event.type}")
                case "agent.session.turn.failed":
                    if event.turn.subagent_id is None:
                        detail = event.turn.error.message if event.turn.error else ""
                        raise RuntimeError(f"{event.type}: {detail}")
                case "agent.session.turn.cancelled":
                    if event.turn.subagent_id is None:
                        raise RuntimeError("The agent turn was cancelled")
                case "agent.session.turn.completed":
                    if event.turn.subagent_id is None:
                        return
    raise RuntimeError("Stream closed before a turn ended. Retrieve the saved state.")
```

Raw stream:

```bash
curl -N \
  "https://api.openai.com/v1/agents/sessions/$session_id/events?stream=true" \
  -H "OpenAI-Beta: agents=v1" \
  -H "Authorization: Bearer $OPENAI_API_KEY" \
  -H "Accept: text/event-stream"
```

Text delta and done events for one content part:

```json
{
  "type": "agent.session.turn.output_text.delta",
  "item_id": "msg_789",
  "output_index": 0,
  "content_index": 0,
  "delta": "Acme competes"
}
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `agent.session.idle` | event | Session idle; not by itself a success signal |
| `agent.session.turn.completed` / `.failed` / `.cancelled` | event | Turn outcome; `event.turn.subagent_id` is null for the root turn |
| `agent.session.turn.output_text.delta` / `.done` | event | Streaming text; `done` carries the complete `text` |
| `agent.session.requires_action` | event | Retrieve session and inspect `required_actions` |
| `agent.session.failed` / `agent.session.environment.failed` | event | Lifecycle failure |
| `error` | event | Error with `error.message` |
| `item_id`, `output_index`, `content_index` | fields | Connect text updates to one content part |
| `event_id` | field | Unique per event; the shared `item_id` identifies the saved item |

## Notes

- Subscribe before sending work so early events are received.
- Subagent turn events do not end the stream; only root-turn events (`subagent_id` null) do.
- Display text: append `output_text.delta` to the content part; on `output_text.done` replace it with the full text. Deltas may be absent.
- Required input: on `requires_action`, return a function result, connect an environment, or handle browser origin access / sign-in (computer use).
- Fetch saved work: list session items (root agent), list/retrieve turns (status, timestamps, usage, error), filter items by `turn_id`; each subagent has its own item history and per-turn items endpoint. List endpoints return one page at a time (SDK helpers or `after` cursor); use `order: "asc"` for oldest to newest.
- Recover a disconnected stream: (1) open a new stream and buffer events, (2) retrieve session and saved items while connected, (3) restore local state keyed by item ID, (4) apply buffered updates by `item_id`, discarding those for items already final, (5) resume live events. A reconnect to a failed session reports the saved failure and closes; stop reconnecting if `status: "failed"` or `agent.session.failed`.
- Restore pending input forms from `required_actions` (match browser approvals by `request_id`); do not resend the task or earlier approvals.
- Saved items recover completed work, not every missed intermediate event.
- Stream events are distinct from webhooks.
- Source: https://developers.openai.com/api/docs/guides/agents-api/sessions/events (fetched 2026-10).

## Related

- [Run and Continue Sessions](./sessions.md)
- [Manage Sessions](./manage-sessions.md)
- [Session Webhooks](./session-webhooks.md)
- [Errors and Recovery](./errors.md)
