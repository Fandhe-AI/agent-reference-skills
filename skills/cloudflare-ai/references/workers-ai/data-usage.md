---
source: https://developers.cloudflare.com/workers-ai/platform/data-usage/
---

# Data usage

How Cloudflare handles inputs, outputs, embeddings, and training data processed by Workers AI.

## Signature / Usage

Snippet taken from https://developers.cloudflare.com/workers-ai/features/batch-api/workers-binding/ (a stateful feature that stores content while it runs). Adapted (not in the official docs): shortened to one context.

```ts
const embeddings = await env.AI.run(
	"@cf/baai/bge-m3",
	{
		requests: [
			{
				query: "This is a story about Cloudflare",
				contexts: [{ text: "This is a story about an orange cloud" }],
			},
		],
	},
	{ queueRequest: true },
);
```

## Options / Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| Zero data retention | commitment | — | Customer Content is processed only as long as needed; for standard inference requests that do not invoke a stateful feature, inputs and outputs are not retained after the response is delivered, subject to limited exceptions. |
| No training | commitment | — | Customer Content processed by Workers AI is not used to train AI models. |
| Ownership | commitment | — | You own and are responsible for your Customer Content; it is not made available to other Cloudflare customers. |
| Stateful features | exception | — | Storage you direct or that a stateful feature needs (R2, KV, Durable Objects, Vectorize, AI Gateway logging or caching, application logs, async or batch features, uploaded files or adapters). |
| Operational metadata | retained | — | Account and model identifiers, timestamps, request and response sizes, token or neuron counts, latency, request source, normalized status or error codes. Does not include Customer Content. |

## Notes

- Customer Content includes inputs (text prompts, images, audio), outputs (generated text, images, translations), embeddings, and training or adaptation data you provide.
- If you use AI Gateway to send Customer Content to another provider, or connect Workers AI to another third-party service, that provider may process and retain content under its own terms.
- Legal or safety retention: such content is not used to train AI models or improve Cloudflare or third-party products.
- Cloudflare does not create or train the third-party models; review each model's license and acceptable use terms.

## Related

- [Batch API](./batch-api.md)
- [Fine-tunes: LoRA adapters](./fine-tunes-loras.md)
