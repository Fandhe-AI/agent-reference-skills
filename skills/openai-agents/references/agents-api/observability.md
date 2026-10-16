# Observability and Usage

Track live agent activity, inspect completed work, identify delegated commands, and review token usage for root-agent and subagent turns.

## Signature / Usage

```python
from openai import OpenAI

client = OpenAI()
session_id = "sess_123"
with client.beta.agents.sessions.events.stream(session_id) as events:
    for event in events:
        if event.type in {
            "agent.session.turn.failed",
            "agent.session.turn.cancelled",
            "agent.session.failed",
            "agent.session.environment.failed",
            "error",
        }:
            raise RuntimeError(f"Agent lifecycle failure: {event.type}")
        print(event.to_json(indent=None))
```

Inspect turns and identify the agent that ran a command:

```python
turns = client.beta.agents.sessions.turns.list(session_id, limit=20, order="desc")
turn_id = "turn_123"
turn = client.beta.agents.sessions.turns.retrieve(turn_id, session_id=session_id)
print(turn.subagent_id)
```

Recorded usage object:

```json
{
  "input_tokens": 5000,
  "input_tokens_details": {
    "cached_tokens": 1500
  },
  "output_tokens": 900,
  "output_tokens_details": {
    "reasoning_tokens": 200
  },
  "total_tokens": 5900
}
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `GET /v1/agents/sessions/{id}/items` | endpoint | Saved items (`order`, `limit`) |
| `GET /v1/agents/sessions/{id}/turns` | endpoint | List turns (`limit`, `order`, `after`) |
| `GET /v1/agents/sessions/{id}/turns/{turn_id}` | endpoint | Retrieve a turn: status, `usage`, `subagent_id` |
| `usage` | object | Best-effort token counts on session and turn resources; may be `null` |
| `subagent_id` | string \| null | Delegated agent that ran the turn; `null` for root-agent work |

## Notes

- Dashboard: platform.openai.com/logs?api=agents (Agents tab); search by session ID to inspect turns, tool calls, subagents.
- Typical stream events: `agent.session.environment.connected`, `agent.session.turn.created`, `.in_progress`, `.item.added`, `.output_text.delta`, `.completed`, `agent.session.idle`. The stream stays open across idle events.
- Command items contain `turn_id`; retrieve that turn and read `subagent_id`. Command-output truncation is not reported. For manual pagination use `last_id` as `after` when `has_more` is `true`. Subagent turns are listed under each subagent.
- Dashboard trace endpoints are separate from the supported customer API; use the session trace export endpoint with a project API key.
- Cost: an agent may make several model calls; each follows the model's token pricing and prompt-caching rules. Cost inputs: input tokens (instructions, tool definitions, history, user input, files/images, tool results), cached input tokens (cached-input rate), output tokens (text, tool-call arguments, reasoning; reasoning tokens bill as output). Account for subagents, retries, tool, sandbox compute, and third-party charges. Usage fields do not expose a cache-write count.
- Prompt caching: reuse depends on a matching prompt prefix and the model's eligibility and lifetime rules; a session does not guarantee a hit. Keep instructions and tool definitions stable and put new task details in follow-ups; with tool search, discovered definitions are appended at the end of the conversation. A high cached percentage does not measure total savings.
- Usage can be `null` when unknown (not zero), values may change, and counts are not a final bill. Cached tokens are included in `input_tokens`; reasoning tokens in `output_tokens`.
- Source: https://developers.openai.com/api/docs/guides/agents-api/observability (fetched 2026-10).

## Related

- [Tracing (Agents API)](./tracing.md)
- [Events and Items](./session-events.md)
- [Multi-agent (Agents API)](./multi-agent.md)
- [Errors and Recovery](./errors.md)
