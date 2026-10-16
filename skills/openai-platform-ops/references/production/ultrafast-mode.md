# Ultrafast Mode

Fastest service tier in the OpenAI API, broadly available for GPT-6 Astra and GPT-6.1 Sol. Use it when speed justifies the higher cost.

WebSockets are strongly recommended, especially for agentic applications that make many tool calls in quick succession. Without a persistent connection, network overhead can reduce the latency gains.

## Signature / Usage

Set `model` to `gpt-6-astra` or `gpt-6.1-sol` and `service_tier` to `ultrafast`.

```python
from openai import OpenAI

client = OpenAI()

response = client.responses.create(
    model="gpt-6-astra",
    input="Explain why the sky is blue in one sentence.",
    service_tier="ultrafast",
)

print(response.output_text)
```

Multi-turn over one WebSocket (set `service_tier` in each `response.create` event):

```python
# Install: pip install --upgrade "openai[realtime]"
from openai import OpenAI

client = OpenAI()
previous_response_id: str | None = None
prompts = [
    "Explain why the sky is blue in one sentence.",
    "Now explain why sunsets look red.",
]

with client.responses.connect() as connection:
    for prompt in prompts:
        connection.response.create(
            model="gpt-6-astra",
            service_tier="ultrafast",
            previous_response_id=previous_response_id,
            input=prompt,
        )
        for event in connection:
            if event.type == "response.output_text.delta":
                print(event.delta, end="", flush=True)
            elif event.type == "response.completed":
                previous_response_id = event.response.id
                print()
                break
            elif event.type in {"response.failed", "response.incomplete", "error"}:
                raise RuntimeError(event.to_json())
        else:
            raise RuntimeError("Connection closed before the response finished.")
```

```bash
curl https://api.openai.com/v1/responses \
  -H "Authorization: Bearer $OPENAI_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "gpt-6-astra",
    "input": "Explain why the sky is blue in one sentence.",
    "service_tier": "ultrafast"
  }'
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `service_tier` | `"ultrafast"` | Request-level opt-in; set in each `response.create` event on WebSocket |
| `model` | `"gpt-6-astra"` \| `"gpt-6.1-sol"` | Models with Ultrafast support |

### Default Ultrafast rate limits

GPT-6.1 Sol (tokens per minute):

| API usage tier | TPM |
|----------------|-----|
| Build | 1,000,000 |
| Launch | 4,000,000 |
| Grow | 40,000,000 |

GPT-6 Astra (tokens per minute):

| API usage tier | TPM |
|----------------|-----|
| Build | 500,000 |
| Launch | 1,000,000 |
| Grow | 5,000,000 |

## Notes

- Source: https://developers.openai.com/api/docs/guides/ultrafast-mode (fetched 2026-10-17).
- Available to all API users for GPT-6 Astra and GPT-6.1 Sol.
- Ultrafast has separate rate limits from Standard and Fast modes. Check the organization's limits before increasing traffic; organizations with an OpenAI account team can contact them to request higher limits.
- Data residency: GPT-6.1 Sol supports US and EU data residency and global processing. GPT-6 Astra Ultrafast supports US data residency and global processing only.
- Input, cached input, cache write, and output prices are on the Ultrafast pricing table of the official pricing page.
- HTTP requests are supported through the SDK, but persistent WebSocket connections reduce overhead for agentic applications with frequent tool calls. Reuse the connection for later turns and tool results, passing the prior response ID as `previous_response_id`.

## Related

- [Fast mode](./fast-mode.md)
- [Latency optimization](./latency-optimization.md)
- [Cost optimization](./cost-optimization.md)
