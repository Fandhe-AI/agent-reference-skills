<!-- source: https://platform.claude.com/docs/en/managed-agents/events-and-streaming / last verified: 2026-08-07 -->

# Handle Custom Tool Calls and Permission Confirmation

React to `stop_reason: requires_action` on `session.status_idle` to execute a custom tool and resume the session, or to approve/deny a pending tool call.

```python
with client.beta.sessions.events.stream(session.id) as stream:
    for event in stream:
        if event.type == "session.status_idle" and (stop_reason := event.stop_reason):
            match stop_reason.type:
                case "requires_action":
                    for event_id in stop_reason.event_ids:
                        # Look up the custom tool use event and execute it
                        tool_event = events_by_id[event_id]
                        result = call_tool(tool_event.name, tool_event.input)

                        # Send the result back
                        client.beta.sessions.events.send(
                            session.id,
                            events=[
                                {
                                    "type": "user.custom_tool_result",
                                    "custom_tool_use_id": event_id,
                                    "content": [{"type": "text", "text": result}],
                                },
                            ],
                        )
                case "end_turn":
                    break
```

Tool confirmation, when a permission policy requires approval before a tool runs:

```python
with client.beta.sessions.events.stream(session.id) as stream:
    for event in stream:
        if event.type == "session.status_idle" and (stop_reason := event.stop_reason):
            match stop_reason.type:
                case "requires_action":
                    for event_id in stop_reason.event_ids:
                        # Approve the pending tool call
                        client.beta.sessions.events.send(
                            session.id,
                            events=[
                                {
                                    "type": "user.tool_confirmation",
                                    "tool_use_id": event_id,
                                    "result": "allow",
                                },
                            ],
                        )
                case "end_turn":
                    break
```

## Notes

- Custom tool flow: `agent.custom_tool_use` fires with the tool name/input, the session pauses (`session.status_idle`, `stop_reason: requires_action`, blocking IDs in `stop_reason.event_ids`), you send `user.custom_tool_result` per blocking event with `custom_tool_use_id` set to the event ID, and the session resumes `running` once all blocking events are resolved.
- Tool confirmation flow: `agent.tool_use`/`agent.mcp_tool_use` fires, then `session.status_idle` with `stop_reason: requires_action`; send `user.tool_confirmation` per blocking `tool_use_id` with `result` set to `"allow"` or `"deny"` (`deny_message` optional).
- `events_by_id` and `call_tool` in the first snippet are application-defined: a lookup of previously-seen events by ID, and your own tool-execution function.
- Managed Agents API requests require the `managed-agents-2026-04-01` beta header.
- Example from the Claude API (platform.claude.com) `managed-agents/events-and-streaming` page.
