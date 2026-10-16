# Functions

Function tools let an agent call your application code. You define the function and its arguments; the agent requests a call, your code returns a result, and the harness continues the turn.

## Signature / Usage

Definition in `agent.tools`:

```json
{
  "type": "function",
  "name": "get_customer",
  "description": "Look up a customer by ID.",
  "parameters": {
    "type": "object",
    "properties": { "customer_id": { "type": "string" } },
    "required": ["customer_id"],
    "additionalProperties": false
  }
}
```

Pending entry in `required_actions`:

```json
{
  "type": "function_call",
  "turn_id": "turn_123",
  "call_id": "call_123",
  "name": "get_customer",
  "arguments": { "customer_id": "123" }
}
```

Return the result:

```python
import json

action = action.to_dict()

result = {
    "type": "agent.session.input.tool_result",
    "turn_id": action["turn_id"],
    "call_id": action["call_id"],
}

output = get_customer(action["arguments"])
result.update(success=True, output=json.dumps(output))

client.beta.agents.sessions.events.create(session_id, events=[result])
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `type` | `"function"` | Tool type |
| `name` / `description` | string | Function name and description |
| `parameters` | JSON Schema | Argument schema |
| `defer_loading` | boolean | Defer loading; requires `{ "type": "tool_search" }` in `agent.tools` |
| `agent.session.input.tool_result` | event | Fields `turn_id`, `call_id`, `success`, and `output` (string or supported content array) or `error` |

## Notes

- Your handler can run in an application server, a worker, or an environment you control. Attaching an environment does not automatically run function tools there.
- Function definitions from Responses API function calling can be reused with this session flow.
- When a result is needed the session emits `agent.session.requires_action`; read `event.session.required_actions`, or retrieve the session without streaming. Use `required_actions`, not a `function_call` item in history, to decide which calls are pending.
- Success: `success: true` with `output` as a string (serialize JSON objects) or supported content array. Error: `success: false` with an `error` message the agent can use.
- Result size: keep below 4 MiB (4,194,304 bytes); if rejected, reduce and retry with the same `turn_id` and `call_id` while the call is pending.
- Recover after a disconnect: retrieve the session for pending actions; resubmit saved results with the same `turn_id` and `call_id`. For side-effecting functions, store results durably by session, turn, call ID and check the outcome before re-running.
- Functions load eagerly by default.
- Source: https://developers.openai.com/api/docs/guides/agents-api/tools/functions (fetched 2026-10).

## Related

- [Manage Sessions](./manage-sessions.md)
- [Events and Items](./session-events.md)
- [Configuring Agents](./configuration.md)
