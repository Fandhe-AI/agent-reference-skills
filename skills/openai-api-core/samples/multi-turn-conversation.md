# Multi-turn Conversation State

Chain turns either by passing `previous_response_id` (server-managed state) or by appending to a local `input` list and setting `store=False` (client-managed state).

```python
from openai import OpenAI

client = OpenAI()

response = client.responses.create(
    model="gpt-5.6",
    input="tell me a joke",
)
print(response.output_text)

second_response = client.responses.create(
    model="gpt-5.6",
    previous_response_id=response.id,
    input=[{"role": "user", "content": "explain why this is funny."}],
)
print(second_response.output_text)
```

## Notes

- `previous_response_id` lets the server thread conversation history automatically; each call still only needs the new turn's `input`.
- For fully client-managed history, pass `store=False` and append `response.output` (including encrypted reasoning items) back onto the running `history` list before the next call.
- For longer-lived, server-side threads spanning many responses, create a conversation object first (`openai.conversations.create()`) and pass `conversation=conversation.id` on each `responses.create` call instead of `previous_response_id`.
- Example from the OpenAI API (developers.openai.com) `guides/conversation-state` page.
