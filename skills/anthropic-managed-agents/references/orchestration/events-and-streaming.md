<!-- source: https://platform.claude.com/docs/en/managed-agents/events-and-streaming / last verified: 2026-08-07 -->

# Session Event Stream

Communication with Claude Managed Agents is event-based: you send user events to the agent, and receive session/span/agent events back to track status. Every persisted event has a `processed_at` timestamp (null while queued; `user.define_outcome`, `user.custom_tool_result`, and `user.tool_result` are processed on receipt and echoed with `processed_at` already populated).

## Event types

- **User events** and **system events** — what you send: `user.*` start/steer a session; `system.message` appends system-level context applying to the current and subsequent turns.
- **Session, span, and agent events** — sent to you for observability; stream connections that opt in also receive event deltas (previews).

Type strings follow `{domain}.{action}` (the delta preview events `event_start`/`event_delta` are the exception).

## Signature / Usage

```python
# Send a message
client.beta.sessions.events.send(
    session.id,
    events=[{"type": "user.message", "content": [{"type": "text", "text": "Analyze the performance of the sort function in utils.py"}]}],
)

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
                print(f"\n[Error: {event.error.message if event.error else 'unknown'}]")
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

The interrupted turn ends with `session.status_idle` and `stop_reason: end_turn` — the same value as a turn finishing on its own; there is no interruption-specific stop reason.

## Reconnecting without missing events

1. Open a new stream.
2. List the full event history (`client.beta.sessions.events.list(session.id)`) to seed a set of seen event IDs.
3. Tail the live stream, skipping events already seen.

## Listing past events

```python
events = client.beta.sessions.events.list(session.id)
# or filtered:
events = client.beta.sessions.events.list(session.id, types=["agent.tool_use", "agent.tool_result"])
```

## Event deltas (previews)

By default, response text arrives as buffered `agent.message` events after the model request finishes. Event deltas let you render text incrementally as a best-effort preview while the model is still generating — the buffered `agent.message` is always the authoritative record.

Opt in per stream connection with the `event_deltas[]` query parameter (accepted values: `agent.message`, `agent.thinking`; >100 values or any other value returns 400). Works on both the session-level stream and each session-thread stream.

```python
with client.beta.sessions.events.stream(session.id, event_deltas=["agent.message"]) as stream:
    ...
```

- `event_start` announces the upcoming event's `type`/`id`.
- `event_delta` carries incremental text, keyed by `event_id` and `delta.index`.
- For `agent.thinking`, only `event_start` is emitted (no deltas follow; the buffered event carries no thinking content).
- `event_start`/`event_delta` have no `id`/`processed_at` of their own and are never persisted (absent from event history).

### Accumulate and reconcile

Key the preview buffer by `(event_id, index)`. Per model request: `span.model_request_start` → `event_start` → `event_delta`* → buffered `agent.message` → `span.model_request_end`. On `span.model_request_end`, close any preview whose buffered event never arrived (deltas may be shed under load — never treat an accumulated preview as final).

## Additional scenarios

### Handling custom tool calls

1. `agent.custom_tool_use` event carries the tool name and input.
2. Session pauses with `session.status_idle`, `stop_reason: requires_action`, blocking IDs in `stop_reason.event_ids`.
3. Execute the tool and send `user.custom_tool_result` per blocking event, with `custom_tool_use_id` set to the event ID.
4. Once all blocking events are resolved, the session resumes `running`.

```python
with client.beta.sessions.events.stream(session.id) as stream:
    for event in stream:
        if event.type == "session.status_idle" and (stop_reason := event.stop_reason):
            match stop_reason.type:
                case "requires_action":
                    for event_id in stop_reason.event_ids:
                        tool_event = events_by_id[event_id]
                        result = call_tool(tool_event.name, tool_event.input)
                        client.beta.sessions.events.send(
                            session.id,
                            events=[{"type": "user.custom_tool_result", "custom_tool_use_id": event_id,
                                      "content": [{"type": "text", "text": result}]}],
                        )
                case "end_turn":
                    break
```

### Tool confirmation

When a permission policy requires confirmation before a tool runs: `agent.tool_use`/`agent.mcp_tool_use` fires, then `session.status_idle` with `stop_reason: requires_action`. Send `user.tool_confirmation` per blocking `tool_use_id`, with `result` set to `"allow"` or `"deny"` (`deny_message` optional).

```python
client.beta.sessions.events.send(
    session.id,
    events=[{"type": "user.tool_confirmation", "tool_use_id": event_id, "result": "allow"}],
)
```

## Notes

- Managed Agents API requests require the `managed-agents-2026-04-01` beta header, except memory store endpoints (`agent-memory-2026-07-22`).

## Related

- [Multiagent orchestration](./multiagent-orchestration.md)
- [Define outcomes](../getting-started/define-outcomes.md)
- [Subscribe to webhooks](./webhooks.md)
