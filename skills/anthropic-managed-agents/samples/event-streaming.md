<!-- source: https://platform.claude.com/docs/en/managed-agents/events-and-streaming / last verified: 2026-08-07 -->

# Subscribe to the Session Event Stream

Open a session's SSE stream, send a message into it, and branch on event `type` to render text and detect completion or errors.

```python
client = Anthropic()

# Open the stream first, then send the message (avoids a race condition)
with client.beta.sessions.events.stream(session.id) as stream:
    client.beta.sessions.events.send(
        session.id,
        events=[{"type": "user.message", "content": [{"type": "text", "text": "Summarize the repo README"}]}],
    )
    for event in stream:
        match event.type:
            case "agent.message":
                for block in event.content:
                    if block.type == "text":
                        print(block.text, end="")
            case "session.status_idle":
                break
            case "session.error":
                error_message = event.error.message if event.error else "unknown"
                print(f"\n[Error: {error_message}]")
                break

# Interrupt mid-execution, then redirect
client.beta.sessions.events.send(
    session.id,
    events=[
        {"type": "user.interrupt"},
        {"type": "user.message", "content": [{"type": "text", "text": "Instead, focus on fixing the bug in line 42."}]},
    ],
)
```

Reconnecting without missing events: seed a set of seen event IDs from history, then tail the live stream and skip anything already seen.

```python
with client.beta.sessions.events.stream(session.id) as stream:
    history = client.beta.sessions.events.list(session.id)
    seen_event_ids = {past_event.id for past_event in history}

    for event in stream:
        if event.type == "event_start" or event.type == "event_delta":
            continue
        if event.id in seen_event_ids:
            continue
        seen_event_ids.add(event.id)
        match event.type:
            case "agent.message":
                for block in event.content:
                    if block.type == "text":
                        print(block.text, end="")
            case "session.status_idle":
                break
```

Filter past events by type:

```python
events = client.beta.sessions.events.list(
    session.id,
    types=["agent.tool_use", "agent.tool_result"],
)
```

Opt in to incremental preview text with `event_deltas`:

```python
with client.beta.sessions.events.stream(session.id, event_deltas=["agent.message"]) as stream:
    ...
```

## Notes

- The interrupted turn ends with `session.status_idle` and `stop_reason: end_turn` — the same value as a turn finishing on its own; there is no interruption-specific stop reason.
- `event_deltas` accepts `agent.message` and `agent.thinking` (more than 100 values or any other value returns 400). The buffered `agent.message` event is always the authoritative record; deltas are a best-effort preview and may be shed under load.
- `event_start`/`event_delta` events have no `id`/`processed_at` of their own and are never persisted in event history.
- Managed Agents API requests require the `managed-agents-2026-04-01` beta header, except memory store endpoints (`agent-memory-2026-07-22`).
- Example from the Claude API (platform.claude.com) `managed-agents/events-and-streaming` page.
