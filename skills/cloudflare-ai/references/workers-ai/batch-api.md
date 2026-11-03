---
source: https://developers.cloudflare.com/workers-ai/features/batch-api/, https://developers.cloudflare.com/workers-ai/features/batch-api/workers-binding/, https://developers.cloudflare.com/workers-ai/features/batch-api/rest-api/
---

# Asynchronous Batch API

Queue a collection of inference requests in one call and poll for the results later with a `request_id`.

## Signature / Usage

Send a batch with the Workers binding (`queueRequest: true` in the third argument):

```ts
export interface Env {
	AI: Ai;
}
export default {
	async fetch(request, env): Promise<Response> {
		const embeddings = await env.AI.run(
			"@cf/baai/bge-m3",
			{
				requests: [
					{
						query: "This is a story about Cloudflare",
						contexts: [
							{
								text: "This is a story about an orange cloud",
							},
							{
								text: "This is a story about a llama",
							},
							{
								text: "This is a story about a hugging emoji",
							},
						],
					},
				],
			},
			{ queueRequest: true },
		);

		return Response.json(embeddings);
	},
} satisfies ExportedHandler<Env>;
```

```json
{
	"status": "queued",
	"model": "@cf/baai/bge-m3",
	"request_id": "000-000-000"
}
```

Poll with the binding:

```typescript
export interface Env {
	AI: Ai;
}

export default {
	async fetch(request, env): Promise<Response> {
		const status = await env.AI.run("@cf/baai/bge-m3", {
			request_id: "000-000-000",
		});

		return Response.json(status);
	},
} satisfies ExportedHandler<Env>;
```

Send and poll over REST (`$ACCOUNT_ID` / `$API_TOKEN` are shell variables):

```bash
curl "https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/ai/run/@cf/baai/bge-m3?queueRequest=true" \
 --header "Authorization: Bearer $API_TOKEN" \
 --header 'Content-Type: application/json' \
 --json '{
    "requests": [
        {
            "query": "This is a story about Cloudflare",
            "contexts": [
                {
                    "text": "This is a story about an orange cloud"
                },
                {
                    "text": "This is a story about a llama"
                },
                {
                    "text": "This is a story about a hugging emoji"
                }
            ],
            "external_reference": "reference-1"
        }
    ]
  }'
```

```bash
curl "https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/ai/run/@cf/baai/bge-m3?queueRequest=true" \
 --header "Authorization: Bearer $API_TOKEN" \
 --header 'Content-Type: application/json' \
 --json '{
    "request_id": "<uuid>"
  }'
```

Completed response (REST, wrapped in `result`; binding returns the inner object):

```json
{
	"result": {
		"responses": [
			{
				"id": 0,
				"result": {
					"response": [
						{ "id": 0, "score": 0.73974609375 },
						{ "id": 1, "score": 0.642578125 },
						{ "id": 2, "score": 0.6220703125 }
					]
				},
				"success": true,
				"external_reference": "reference-1"
			}
		],
		"usage": { "prompt_tokens": 12, "completion_tokens": 0, "total_tokens": 12 }
	},
	"success": true,
	"errors": [],
	"messages": []
}
```

## Options / Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| queueRequest | boolean | — | Binding third argument; controls queueing behavior. REST uses the `?queueRequest=true` query parameter. |
| requests | array | — | Array of individual inference requests. |
| external_reference | string | — | Unique ID per request, returned in the response (REST example). |
| request_id | string | — | Identifier returned when queued; used to poll. |
| status | string | — | `queued` or `running` while processing. |
| model | string | — | Model used for the batch. |

## Notes

- Requests are fulfilled eventually instead of erroring when capacity is short at a given time; useful for summarization and embeddings with no human in the loop.
- Ensure the total payload is under 10 MB.
- On completion the API returns HTTP `200` with an array of responses; each `id` maps to the index of the prompt in the original request.
- As documented, the binding poll example omits `queueRequest` while the REST poll keeps `?queueRequest=true`; both are recorded as written.
- Supported models: filter the catalog by the Batch capability (https://developers.cloudflare.com/workers-ai/models/?capabilities=Batch).
- Template: https://github.com/craigsdennis/batch-please-workers-ai
- Batch events (`batch.queued`, `batch.succeeded`, `batch.failed`) can be delivered through event subscriptions.
- Batch input is stored while processing; see data usage for retention of stateful features.

## Related

- [Event subscriptions](./event-subscriptions.md)
- [Data usage](./data-usage.md)
- [Binding and env.AI.run()](./bindings-and-run.md)
- [Reject busy requests](./reject-if-busy.md)
