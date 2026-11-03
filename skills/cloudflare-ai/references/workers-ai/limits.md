---
source: https://developers.cloudflare.com/workers-ai/platform/limits/
---

# Limits

Default rate limits per task type, with per-model overrides and a lower tier for paid models.

## Signature / Usage

Snippet taken from https://developers.cloudflare.com/workers-ai/features/reject-if-busy/ (how to fail fast on a capacity limit):

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

### Rate limits by task type

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| Automatic Speech Recognition | requests per minute | 720 | |
| Image Classification | requests per minute | 3000 | |
| Image-to-Text | requests per minute | 720 | |
| Object Detection | requests per minute | 3000 | |
| Summarization | requests per minute | 1500 | |
| Text Classification | requests per minute | 2000 | |
| Text Embeddings | requests per minute | 3000 | `@cf/baai/bge-large-en-v1.5` is 1500 requests per minute. |
| Text Generation | requests per minute | 300 | Unless the model requires the Workers Paid plan. |
| Text-to-Image | requests per minute | 720 | `@cf/runwayml/stable-diffusion-v1-5-img2img` is 1500 requests per minute. |
| Translation | requests per minute | 720 | |

### Paid models (per account, per model)

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| Standard Workers AI billing | requests per minute | 20 | Models that require the Workers Paid plan (each model page states this). |
| Prepaid AI Gateway credits | requests per minute | 50 | Load prepaid credits and set the gateway's Workers AI billing setting to Unified billing. |

## Notes

- Model inferences in local mode using Wrangler also count towards these limits. Beta models may have lower rate limits.
- Paid models are the only models that do not receive the default per-task limit. The limits are designed for typical agentic and coding workloads, where requests to frontier models can take longer to complete.
- Exceeding a limit returns an error; see Errors (`429`).
- Custom requirements (private custom models or higher limits): Custom Requirements Form https://forms.gle/axnnpGDb6xrmR31T6
- Batch payloads must be under 10 MB (see Batch API); LoRA constraints are on the LoRA page.

## Related

- [Pricing](./pricing.md)
- [Errors](./errors.md)
- [Batch API](./batch-api.md)
- [Fine-tunes: LoRA adapters](./fine-tunes-loras.md)
