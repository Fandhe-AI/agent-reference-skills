---
source: https://developers.cloudflare.com/ai-gateway/observability/custom-metadata/
---

# Custom metadata

Tag requests with user IDs, team names, or other identifiers via the `cf-aig-metadata` header (or the binding `metadata` option) for log search and filtering.

## Signature / Usage

```bash
# Run `wrangler whoami` to get your account ID to replace $CLOUDFLARE_ACCOUNT_ID,
# and `wrangler auth token` to get an auth token to replace $CLOUDFLARE_API_TOKEN.
curl -X POST "https://api.cloudflare.com/client/v4/accounts/$CLOUDFLARE_ACCOUNT_ID/ai/v1/chat/completions" \
  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
  --header "Content-Type: application/json" \
  --header 'cf-aig-metadata: {"team": "AI", "user": 12345, "test":true}' \
  --data '{"model": "openai/gpt-4.1", "messages": [{"role": "user", "content": "What should I eat for lunch?"}]}'
```

Adapted (not in the official docs): the official Worker examples return `new Response(aiResp)` / `new Response(e)`, which is not a valid body for an object or error; JSON responses and a generic error response are used instead.

OpenAI SDK in a Worker:

```js
import OpenAI from "openai";

export default {
	async fetch(request, env, ctx) {
		const openai = new OpenAI({
			apiKey: env.CLOUDFLARE_API_TOKEN,
			baseURL: `https://api.cloudflare.com/client/v4/accounts/${env.CLOUDFLARE_ACCOUNT_ID}/ai/v1`,
		});

		try {
			const chatCompletion = await openai.chat.completions.create(
				{
					model: "openai/gpt-4.1",
					messages: [{ role: "user", content: "What should I eat for lunch?" }],
					max_tokens: 50,
				},
				{
					headers: {
						"cf-aig-metadata": JSON.stringify({
							user: "JaneDoe",
							team: 12345,
							test: true,
						}),
					},
				},
			);

			const response = chatCompletion.choices[0].message;
			return Response.json(response);
		} catch (e) {
			console.log(e);
			return new Response("AI request failed", { status: 500 });
		}
	},
};
```

AI binding:

```javascript
export default {
	async fetch(request, env, ctx) {
		const aiResp = await env.AI.run(
			"@cf/mistral/mistral-7b-instruct-v0.1",
			{ prompt: "What should I eat for lunch?" },
			{
				gateway: {
					id: "gateway_id",
					metadata: { team: "AI", user: 12345, test: true },
				},
			},
		);

		return Response.json(aiResp);
	},
};
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| cf-aig-metadata | JSON object header | — | Up to 5 entries; values may be string, number, or boolean (no objects) |
| gateway.metadata | object (binding option) | — | Same entries via `env.AI.run()` |
| cf.user_id | reserved key | — | Added by Cloudflare for Access-authenticated requests (Access JWT `sub`) |

## Notes

- Corrected from the official docs: returned `Response.json(...)` rather than passing an object/error to `new Response`.
- Only the first five entries are saved; extras are ignored.
- Keys starting with `cf.` are reserved; AI Gateway removes customer-supplied `cf.*` keys. `cf.user_id` is guaranteed to be saved when a valid Access user ID exists, and may displace the last custom entry when five are already present. Service-token requests get no `cf.user_id`.
- Treat metadata sent from clients as untrusted when using it for authorization or budgets; set identifiers server-side.
- Metadata shows in logs, can drive spend limits, Dynamic Routing conditions, and OpenTelemetry span attributes.

## Related

- [features-spend-limits.md](./features-spend-limits.md)
- [features-dynamic-routing.md](./features-dynamic-routing.md)
- [observability-otel-integration.md](./observability-otel-integration.md)
- [configuration-cloudflare-access.md](./configuration-cloudflare-access.md)
