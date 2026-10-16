# Run and Continue Sessions

A session keeps an agent's configuration, conversation, and saved work over time. Reuse the same session to send follow-up messages.

## Signature / Usage

Send a follow-up message (send the key in the `Idempotency-Key` header):

```bash
curl \
  "https://api.openai.com/v1/agents/sessions/$session_id/events" \
  -H "OpenAI-Beta: agents=v1" \
  -H "Authorization: Bearer $OPENAI_API_KEY" \
  -H "Idempotency-Key: $submission_key" \
  -H "Content-Type: application/json" \
  -d '{
    "events": [
      {
        "type": "agent.session.input.message",
        "input": [
          {
            "role": "user",
            "content": [
              {
                "type": "input_text",
                "text": "List the files in the current directory."
              }
            ]
          }
        ]
      }
    ]
  }'
```

Retrieve saved items:

```python
def list_items(client: OpenAI, session_id: str):
    return client.beta.agents.sessions.items.list(session_id, order="asc", limit=100)
```

Cancel the active turn:

```python
client.beta.agents.sessions.events.create(
    session_id, events=[{"type": "agent.session.input.cancel"}]
)
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `stream` | boolean | On session create, `true` streams events from the first turn in the same request |
| `agent.session.input.message` | event | Message to the session; steers an active turn or starts a new turn if idle |
| `agent.session.input.cancel` | event | Cancels the current turn; session and prior work remain |
| `Idempotency-Key` | header | One key per logical message submission; reuse on retries |
| `items.list` `order` / `limit` | `"asc"` / number | Pagination for saved items |

## Notes

- A turn is one cycle of work. A message sent to an idle session starts a new turn; a message during an active turn steers it. Turns run asynchronously (stream or webhooks).
- Store the `session_id` with your application's conversation state.
- Sessions with `environment.type: "none"` require initial input.
- Input size: requests up to 4 MiB (4,194,304 bytes); `input` plus output schema (`agent.text.format.schema`) must stay below, with room for added metadata. Same limit for follow-ups.
- Files API attachments can return HTTP 429 `files_api_rate_limit_exceeded`.
- Check turn outcome via `agent.session.turn.completed` / `turn.failed` / `turn.cancelled`; an idle session alone does not mean success, and a completed turn does not guarantee every tool succeeded.
- If the session needs a function result or environment connection, retrieve it and inspect `required_actions`.
- Subscribe to the event stream before sending a message to receive early events. Streams do not replay missed events; after a disconnect retrieve the session and saved items.
- Use a different idempotency key for each distinct submission, even when message text is identical; on retry reuse the same key, session ID, and message.
- Events show live progress; items are saved messages and tool calls.
- Source: https://developers.openai.com/api/docs/guides/agents-api/sessions (fetched 2026-10).

## Related

- [Events and Items](./session-events.md)
- [Manage Sessions](./manage-sessions.md)
- [Session Webhooks](./session-webhooks.md)
- [Configuring Agents](./configuration.md)
- [Errors and Recovery](./errors.md)
