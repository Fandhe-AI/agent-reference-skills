<!-- source: https://platform.claude.com/docs/en/managed-agents/events-and-streaming / last verified: 2026-10-17 -->

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

Event deltas render response text incrementally as a best-effort preview while the model is still generating; the buffered `agent.message` is always the authoritative record. Opt in per stream connection with the `event_deltas[]` query parameter (accepted values: `agent.message`, `agent.thinking`; >100 values or any other value returns 400). Works on both the session-level stream and each session-thread stream.

```python
with client.beta.sessions.events.stream(session.id, event_deltas=["agent.message"]) as stream:
    ...
```

`event_start` / `event_delta` are never persisted. For opting in, accumulating (key the buffer by `(event_id, index)`), and reconciling previews, see Event deltas.

## Respond when the session goes idle

A `session.status_idle` event means the agent has stopped and is waiting for input. Its `stop_reason.type` says why:

| `stop_reason.type` | Why the session stopped | What to do |
|--------------------|-------------------------|------------|
| `end_turn` | The agent finished its turn, or you interrupted it. | Send a `user.message` when you have more work for the agent. |
| `requires_action` | One or more tool calls need an answer from you, such as a custom tool call or a confirmation request. | Answer each blocking tool call. |
| `budget_reached` | The session's tracked list cost reached its budget. | Change or remove the budget. |

No event you send resumes a session paused at its budget. The work that the budget paused resumes automatically when you change the budget to a value above the consumed list cost, or remove it; the session then emits a `workflow_run.status_running` event for each workflow run the budget paused. A run that an interrupt paused stays paused.

## Resume an idle session

Sessions persist between interactions. To resume one, send a `user.message` event to it as usual.

```python
client.beta.sessions.events.send(
    session.id,
    events=[{"type": "user.message", "content": [{"type": "text", "text": "Continue with the next step."}]}],
)
```

Conversation history is preserved unless the session is explicitly deleted. When a session goes idle, its sandbox is checkpointed (filesystem, installed packages, files the agent created). Sandbox state is preserved for only 30 days after the sandbox is created, and activity does not extend this window; after 30 days a resumed session starts from a fresh sandbox. Have the agent write important artifacts to outputs before the window ends.

## Interrupt the agent

Send a `user.interrupt` event to stop the agent mid-execution, then follow up with a `user.message` to redirect it (see the interrupt example under Signature / Usage). The call returns as soon as the events are queued. The interrupt then takes effect in this order:

1. The agent applies the interrupt. Until then, the interrupt's `processed_at` stays null and the session stays `running`. A model response in progress stops immediately, but the interrupt can take longer while tool calls are running.
2. The `user.interrupt` event appears on the stream, and the interrupted turn ends with a `session.status_idle` event.
3. The agent starts its next turn with the `user.message` you sent after the interrupt.

The idle event's `stop_reason.type` is `end_turn`. If workflow runs are open, the interrupt ends none of them; a run that's running can keep the session `running`, so the `session.status_idle` event in step 2 might not arrive.

## Send system messages

On a supported model, send a `system.message` event to give the agent privileged system-level context that applies to the accompanying turn and all subsequent turns (for example a different persona, revised constraints, or context fetched at runtime). `content` accepts 1–1000 text items and is appended as a `role: "system"` turn; it doesn't replace the agent definition's `system` prompt.

```python
client.beta.sessions.events.send(
    session.id,
    events=[{"type": "system.message", "content": [{"type": "text", "text": "The user's current timezone is America/New_York."}]}],
)
```

Note: the example above sends `system.message` on its own, as in the guide. The API reference (`POST /v1/sessions/{id}/events`) states "At most one per request: it must be the final event and immediately follow the `user.message`, `user.tool_result`, or `user.custom_tool_result` it accompanies". If unsure, send it in the same request right after the `user.message`; see `../endpoints/sessions.md`.

### Supported models

`system.message` is supported by Claude Fable 5.1, Claude Mythos 5.1, Claude Fable 5, Claude Mythos 5, Claude Opus 5.5, Claude Opus 5, Claude Opus 4.8, Claude Sonnet 5.5, and Claude Haiku 5.5. If the agent's primary model does not support mid-conversation system injection, the event is rejected with a `model_does_not_support_mid_conversation_system` validation error. Subagent models are not checked, because `system.message` lands on the primary thread only.

### System messages while a tool call is pending

While the session is idle with a `requires_action` stop reason, a `system.message` must trail a tool result event in the same request. Sent on its own or with a `user.message`, it is rejected until the pending tool events are resolved.

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
- [Event deltas](./event-deltas.md)
- [Workflow runs](./workflow-runs.md)
