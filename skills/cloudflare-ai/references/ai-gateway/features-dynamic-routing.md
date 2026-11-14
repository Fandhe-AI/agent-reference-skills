---
source: https://developers.cloudflare.com/ai-gateway/features/routing/dynamic-routing/, https://developers.cloudflare.com/ai-gateway/features/routing/dynamic-routing/json-configuration/, https://developers.cloudflare.com/ai-gateway/features/routing/dynamic-routing/usage/
---

# Dynamic routing

Compose versioned request-routing flows (conditionals, percentage splits, rate/budget limits, model nodes with fallbacks) in a visual editor or JSON, then call a route as `dynamic/<route-name>` in place of a model.

## Signature / Usage

Adapted (not in the official docs): the official OpenAI SDK example hard-codes the token as a string literal; it is read from an environment variable here (see Notes).

```js
import OpenAI from "openai";

const cloudflareToken = process.env.CF_AIG_TOKEN;
const accountId = "{account_id}";
const gatewayId = "{gateway_id}";
const baseURL = `https://gateway.ai.cloudflare.com/v1/${accountId}/${gatewayId}/compat`;

const openai = new OpenAI({
	apiKey: cloudflareToken,
	baseURL,
});

try {
	const model = "dynamic/<your-dynamic-route-name>";
	const messages = [{ role: "user", content: "What is a neuron?" }];
	const chatCompletion = await openai.chat.completions.create({
		model,
		messages,
	});
	const response = chatCompletion.choices[0].message;
	console.log(response);
} catch (e) {
	console.error(e);
}
```

REST API (set `cf-aig-gateway-id` to the gateway that owns the route):

```bash
curl -X POST "https://api.cloudflare.com/client/v4/accounts/{account_id}/ai/v1/chat/completions" \
  --header 'Authorization: Bearer {CLOUDFLARE_API_TOKEN}' \
  --header 'cf-aig-gateway-id: {gateway_id}' \
  --header 'Content-Type: application/json' \
  --data '{
    "model": "dynamic/<your-dynamic-route-name>",
    "messages": [
      {
        "role": "user",
        "content": "What is Cloudflare?"
      }
    ]
  }'
```

Worker (AI binding):

```ts
export interface Env {
	AI: Ai;
}

export default {
	async fetch(request: Request, env: Env) {
		const response = await env.AI.run(
			"dynamic/<your-dynamic-route-name>",
			{
				messages: [{ role: "user", content: "What is Cloudflare?" }],
			},
			{
				gateway: {
					id: "{gateway_id}",
				},
			},
		);
		return Response.json(response);
	},
};
```

## Options / Props

### Route JSON

```json
{
  "id": "<route id>",
  "name": "<route name>",
  "elements": [<array of elements>]
}
```

### Element types

| Type | Inputs | Outputs | Properties |
|------|--------|---------|------------|
| `start` | none | `next` | — (every route must start with it) |
| `conditional` | Request | `true`, `false` | `conditions` using MongoDB-like operators `$eq`, `$ne`, `$in`, `$and`, `$or`, e.g. `{"metadata.plan": {"$eq": "free"}}` |
| `percentage` | Request | up to 5 outputs keyed by percentage (e.g. `"10%"`); keys must sum to 100% | — |
| `rate` | Request | `success`, optional `fallback` (route terminates if absent) | `limitType` ("count" or "cost"), `key` (e.g. `metadata.user_id`), `limit`, `window` (seconds) |
| `model` | Request | `success` (model starts streaming), optional `fallback` (after all retries/timeout) | `provider`, `model`, `timeout` (ms), `retries` |
| `end` | Request | none (empty `outputs`) | — returns last successful model response, else error |

### Element example (`rate`)

```json
{
	"id": "<id>",
	"type": "rate",
	"properties": {
		"limitType": "count",
		"key": "metadata.user_id",
		"limit": 100,
		"window": 3600
	},
	"outputs": {
		"success": { "elementId": "node_model_workers_ai" },
		"fallback": { "elementId": "node_model_openai_mini" }
	}
}
```

### Response headers

| Name | Description |
|------|-------------|
| cf-aig-model | Model used |
| cf-aig-provider | Slug of provider used |

## Notes

- Concepts: Route (named, versioned; used as the model name `dynamic/<name>`), Nodes (Start, Conditional, Percentage, Model, Rate Limit, Budget Limit, End), Metadata (key-value context from your app, referenced in rules), Versions (each change makes a draft; deploy to go live; instant rollback).
- Setup: gateway > **Routing** > **Create dynamic route** > Editor > define nodes > **Save** a version > deploy. Prerequisites: gateway authentication on and upstream provider keys stored with BYOK.
- Dynamic routes accept only the OpenAI chat completions request shape (via `/ai/v1/chat/completions`, the AI binding, or `/compat/chat/completions`); other formats such as Anthropic Messages return `400`. The `/ai/run` REST endpoint does not support dynamic routes; requests to it return `400` with error code `7003` (see [reference-troubleshooting.md](./reference-troubleshooting.md)).
- Routes are scoped to the gateway they were created on. On the REST API and AI binding, name that gateway explicitly (`cf-aig-gateway-id` / `gateway.id`); otherwise the request resolves against the default gateway and returns `404`.
- Adapted from the official docs: token read from `process.env.CF_AIG_TOKEN` instead of a literal; never commit real tokens.
- Source: https://developers.cloudflare.com/ai-gateway/features/routing/dynamic-routing/ (pin 34d908a / fetched 2026-11-14). The pages moved from `/ai-gateway/features/dynamic-routing/` into the Routing section and the product wording changed from "Dynamic Routing" to "dynamic routes"; the dashboard entry point is now the gateway's **Routing** page, shared with model aliases (see [features-model-aliases.md](./features-model-aliases.md)).
- Routes can also be defined via the REST API using the JSON structure above instead of the dashboard editor.

## Related

- [features-model-aliases.md](./features-model-aliases.md)
- [usage-chat-completion.md](./usage-chat-completion.md)
- [usage-worker-binding-methods.md](./usage-worker-binding-methods.md)
- [configuration-bring-your-own-keys.md](./configuration-bring-your-own-keys.md)
- [features-spend-limits.md](./features-spend-limits.md)
- [observability-custom-metadata.md](./observability-custom-metadata.md)
