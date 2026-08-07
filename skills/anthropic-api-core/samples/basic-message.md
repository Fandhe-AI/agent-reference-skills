<!-- source: https://platform.claude.com/docs/en/get-started / last verified: 2026-08-07 -->

# Basic Message

Send a minimal Messages API request via curl, Python, or TypeScript and read the assistant's text back.

```bash
curl https://api.anthropic.com/v1/messages \
  -H "content-type: application/json" \
  -H "x-api-key: $ANTHROPIC_API_KEY" \
  -H "anthropic-version: 2023-06-01" \
  -d '{
    "model": "claude-opus-5",
    "max_tokens": 1000,
    "messages": [
      {
        "role": "user",
        "content": "What should I search for to find the latest developments in renewable energy?"
      }
    ]
  }'
```

```python
import anthropic

client = anthropic.Anthropic()

message = client.messages.create(
    model="claude-opus-5",
    max_tokens=1000,
    messages=[
        {
            "role": "user",
            "content": "What should I search for to find the latest developments in renewable energy?",
        }
    ],
)

for block in message.content:
    if block.type == "text":
        print(block.text)
```

```typescript
import Anthropic from "@anthropic-ai/sdk";

const client = new Anthropic();

const message = await client.messages.create({
  model: "claude-opus-5",
  max_tokens: 1000,
  messages: [
    {
      role: "user",
      content: "What should I search for to find the latest developments in renewable energy?"
    }
  ]
});

for (const block of message.content) {
  if (block.type === "text") {
    console.log(block.text);
  }
}
```

## Notes

- The SDKs read `ANTHROPIC_API_KEY` from the environment automatically; curl requires passing it explicitly via `x-api-key`.
- Every request needs `model`, `max_tokens`, and `messages`; the response's `content` is a list of blocks, so iterate and check `block.type == "text"` rather than assuming a single string.
- `usage.input_tokens` / `usage.output_tokens` in the response report token consumption for the call.
- Example from the Claude API (platform.claude.com) `get-started` page.
