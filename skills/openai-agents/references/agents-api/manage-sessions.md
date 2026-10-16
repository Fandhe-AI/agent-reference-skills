# Manage Sessions

Store each session ID in your data store; use it to retrieve current state, handle agent requests, or delete the session.

## Signature / Usage

```python
from openai import OpenAI

client = OpenAI()
page = client.beta.agents.sessions.list(limit=20)
print(page.to_json())
if page.has_next_page():
    page = page.get_next_page()
    print(page.to_json())

session = client.beta.agents.sessions.retrieve(session_id)
client.beta.agents.sessions.delete(session_id)
```

```bash
curl \
  "https://api.openai.com/v1/agents/sessions/$session_id" \
  -H "OpenAI-Beta: agents=v1" \
  -H "Authorization: Bearer $OPENAI_API_KEY"
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `GET /v1/agents/sessions` | endpoint | List sessions; `limit`, `order` (e.g. `desc`), `after` cursor; response has `has_more` and `last_id` |
| `GET /v1/agents/sessions/{id}` | endpoint | Retrieve status, agent configuration, environment, `required_actions` |
| `DELETE /v1/agents/sessions/{id}` | endpoint | Delete the session |
| `required_actions[].function_call` | action | Run function `name` with `arguments`; return the result using the action's `turn_id` and `call_id` |
| `required_actions[].environment_connection` | action | Connect the environment identified by `environment_id` |

## Notes

- A session with status `requires_action` needs your application to act before work continues. The `agent.session.requires_action` event says when to check; the retrieved session says what to do. After a restart or stream disconnect, retrieve the session to find pending actions.
- Deletion removes the session from the API; physical cleanup may continue asynchronously.
- To stop current work but keep the conversation, cancel the active turn instead of deleting.
- Source: https://developers.openai.com/api/docs/guides/agents-api/sessions/manage (fetched 2026-10).

## Related

- [Run and Continue Sessions](./sessions.md)
- [Events and Items](./session-events.md)
- [Functions](./functions.md)
- [Self-hosted Sandboxes](./self-hosted-sandboxes.md)
