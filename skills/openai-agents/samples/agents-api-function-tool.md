# Agents API Function Tool

Let an Agents API session call your application code: define a function, handle `required_actions`, and return the result.

Define a function in `agent.tools`:

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

Handle the required action. The session emits `agent.session.requires_action`; a function entry in `event.session.required_actions` looks like this:

```json
{
  "type": "function_call",
  "turn_id": "turn_123",
  "call_id": "call_123",
  "name": "get_customer",
  "arguments": { "customer_id": "123" }
}
```

Return the result (Python). `action` is the entry from `required_actions`:

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

Return the result (JavaScript):

```javascript
const result = {
  turn_id: action.turn_id,
  call_id: action.call_id,
};
let outcome;

outcome = {
  success: true,
  output: JSON.stringify(getCustomer(action.arguments)),
};

await client.beta.agents.sessions.events.create(sessionId, {
  events: [
    { type: "agent.session.input.tool_result", ...result, ...outcome },
  ],
});
```

## Notes

- Beta: requests need the `OpenAI-Beta: agents=v1` header. The OpenAI SDKs add it automatically.
- The API key needs `api.agents.read`, `api.agents.write`, and `api.responses.write`.
- Copy `turn_id` and `call_id` from the pending action. For an error, send `success: false` with an `error` message instead of `output`. Serialize JSON objects to strings.
- Your handler runs in your own code; attaching an environment to a session does not run function tools there. `get_customer` is your own function (not defined here). Keep results under 4 MiB (4,194,304 bytes).
- Source: https://developers.openai.com/api/docs/guides/agents-api/tools/functions (fetched 2026-10).
