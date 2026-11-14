---
source: https://developers.cloudflare.com/workers-ai/platform/errors/
---

# Errors

Workers AI error names, internal codes, HTTP statuses, and descriptions.

## Signature / Usage

Snippet taken from https://developers.cloudflare.com/workers-ai/features/reject-if-busy/ (a request that can yield error `3040`):

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

## Options / Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| No such model | `5007` / HTTP `400` | — | No such model `${model}` or task. |
| Invalid data | `5004` / HTTP `400` | — | Invalid data type for base64 input: `${type}`. |
| Finetune missing required files | `3039` / HTTP `400` | — | Finetune is missing required files `(model.safetensors and config.json)`. |
| Incomplete request | `3003` / HTTP `400` | — | Request is missing headers or body: `{what}`. |
| Account not allowed for private model | `5018` / HTTP `403` | — | The account is not allowed to access this model. |
| Model agreement | `5016` / HTTP `403` | — | User has not agreed to Llama3.2 model terms. |
| Account blocked | `3023` / HTTP `403` | — | Service unavailable for account. |
| Account not allowed for private model | `3041` / HTTP `403` | — | The account is not allowed to access this model. |
| Model requires Workers Paid plan | `5035` / HTTP `403` | — | This model requires a Workers Paid plan. |
| Deprecated SDK version | `5019` / HTTP `405` | — | Request trying to use deprecated SDK version. |
| LoRa unsupported | `5005` / HTTP `405` | — | The model `${this.model}` does not support LoRa inference. |
| Invalid model ID | `3042` / HTTP `404` | — | The model name is invalid. |
| Model deprecated | `5028` / HTTP `410` | — | `${model}` was deprecated on `${date}`. See the [model catalog](https://developers.cloudflare.com/workers-ai/models/) for alternatives. |
| Request too large | `3006` / HTTP `413` | — | Request is too large. |
| Timeout | `3007` / HTTP `408` | — | Request timeout. |
| Aborted | `3008` / HTTP `408` | — | Request was aborted. |
| Account limited | `3036` / HTTP `429` | — | You have used up your daily free allocation of 10,000 neurons. Upgrade to Workers Paid to continue. |
| Out of capacity | `3040` / HTTP `429` | — | `Capacity temporarily exceeded, please try again.` Also returned when `rejectIfBusy` rejects a request because capacity is unavailable. |

## Notes

- The `Model agreement` error (`5016`) is resolved by agreeing to Meta's license, as shown in the Llama vision tutorial.
- `${model}`, `${type}`, `{what}`, `${date}` are placeholders in the messages.
- `5028` / HTTP `410 Gone`: starting 2026-11-20, models listed in the planned-deprecation announcement stop returning responses and fail with this error. The date was moved from November 15 to November 20, 2026. Source: https://developers.cloudflare.com/changelog/post/2026-11-05-planned-model-deprecations/ and https://developers.cloudflare.com/workers-ai/platform/errors/ (pin 34d908a / fetched 2026-11-14).
- Batch failures surface as `batch.failed` events with `internalCode` and `httpCode`.

## Related

- [Reject busy requests](./reject-if-busy.md)
- [Limits](./limits.md)
- [Pricing](./pricing.md)
- [Event subscriptions](./event-subscriptions.md)
- [Tutorial: Llama 3.2 Vision](./tutorial-llama-vision.md)
