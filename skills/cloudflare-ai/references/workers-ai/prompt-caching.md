---
source: https://developers.cloudflare.com/workers-ai/features/prompt-caching/
---

# Prompt caching

Prefix caching reuses computed input tensors for requests that share a prompt prefix; route related requests to one instance with the `x-session-affinity` header.

## Signature / Usage

```bash
curl -X POST \
  "https://api.cloudflare.com/client/v4/accounts/{account_id}/ai/run/@cf/moonshotai/kimi-k2.5" \
  -H "Authorization: Bearer {api_token}" \
  -H "Content-Type: application/json" \
  -H "x-session-affinity: ses_12345678" \
  -d '{
    "messages": [
      {
        "role": "system",
        "content": "You are a helpful assistant."
      },
      {
        "role": "user",
        "content": "What is prefix caching and why does it matter?"
      }
    ],
    "max_tokens": 2400,
    "stream": true
  }'
```

```js
const response = await env.AI.run(
	"@cf/moonshotai/kimi-k2.5",
	{
		messages: [
			{ role: "system", content: "You are a helpful assistant." },
			{ role: "user", content: "Explain prefix caching." },
		],
	},
	{
		extraHeaders: {
			"x-session-affinity": "ses_12345678",
		},
	},
);
```

## Options / Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| x-session-affinity | header (string) | — | Unique identifier for your session or agent; requests with the same value route to the same model instance. |
| extraHeaders | object | — | Binding third argument carrying the header. |

## Notes

- Enabled by default for select models; compatibility and pricing are on each model page. Cached input tokens are billed at a discounted rate (see Pricing).
- Prefix caching matches the exact token sequence from the start; a single token difference invalidates the cache from that point.
- Place static content first (system prompt, tool definitions, shared instructions); keep timestamps out of system prompts; keep tool definitions consistent within a session.
- Cached token counts appear in the response `usage` object. The first request is usually cold; inputs must be large enough to be cached because of block size. Cached tokens are billed lower and are totalled into your neuron count.
- Model IDs in the examples (`@cf/moonshotai/kimi-k2.5`) are from the source; check the catalog for current availability.

## Related

- [Pricing](./pricing.md)
- [Prompting](./prompting.md)
- [Binding and env.AI.run()](./bindings-and-run.md)
