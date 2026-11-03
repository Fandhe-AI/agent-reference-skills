---
source: https://developers.cloudflare.com/workers-ai/features/reject-if-busy/
---

# Reject busy requests

Set `rejectIfBusy` to fail a synchronous inference request instead of waiting in a capacity queue.

## Signature / Usage

```js
const response = await env.AI.run(
	"@cf/google/gemma-4-26b-a4b-it",
	{
		messages: [
			{
				role: "user",
				content: "Explain what a capacity queue is.",
			},
		],
	},
	{ rejectIfBusy: true },
);
```

REST (native API: `options` in the body):

```bash
curl --request POST \
  --url "https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/ai/run/@cf/google/gemma-4-26b-a4b-it" \
  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
  --header "Content-Type: application/json" \
  --data '{
    "messages": [
      {
        "role": "user",
        "content": "Explain what a capacity queue is."
      }
    ],
    "options": {
      "rejectIfBusy": true
    }
  }'
```

OpenAI-compatible Chat Completions (`options` at the top level):

```bash
curl --request POST \
  --url "https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/ai/v1/chat/completions" \
  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
  --header "Content-Type: application/json" \
  --data '{
    "model": "@cf/google/gemma-4-26b-a4b-it",
    "messages": [
      {
        "role": "user",
        "content": "Explain what a capacity queue is."
      }
    ],
    "options": {
      "rejectIfBusy": true
    }
  }'
```

## Options / Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| rejectIfBusy | boolean | — | Binding: third argument to `env.AI.run()`. REST and Chat Completions: `options.rejectIfBusy` in the request body. |

## Notes

- Do not add `rejectIfBusy` to the model input object; the binding only applies it from the third argument.
- Rejected requests return HTTP `429` with internal error code `3040` and the message `Capacity temporarily exceeded, please try again.`
- OpenAI clients that remove unknown fields do not apply the option; requests proceed normally.
- The batch API is the alternative that waits for capacity.

## Related

- [Errors](./errors.md)
- [Batch API](./batch-api.md)
- [OpenAI compatibility](./openai-compatibility.md)
- [Binding and env.AI.run()](./bindings-and-run.md)
