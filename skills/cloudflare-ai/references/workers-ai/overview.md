---
source: https://developers.cloudflare.com/workers-ai/
---

# Workers AI overview

Run machine learning models on serverless GPUs on Cloudflare's network from Workers, Pages, or the Cloudflare API.

## Signature / Usage

Snippet taken from https://developers.cloudflare.com/workers-ai/configuration/bindings/

```javascript
const answer = await env.AI.run('@cf/meta/llama-3.1-8b-instruct', {
    prompt: "What is the origin of the phrase 'Hello, World'"
});
```

## Options / Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| Models | catalog | — | 50+ open-source models (https://developers.cloudflare.com/workers-ai/models/). |
| Pricing | model | — | Serverless, pay-for-what-you-use (Neurons); available on Free and Paid plans. |
| AI Gateway | related product | — | Caching, rate limiting, retries, model fallback (separate category of this skill). |
| Vectorize | related product | — | Vector database for semantic search and RAG (separate category of this skill). |
| Workers, Pages, R2, D1, Durable Objects, KV | related products | — | Application and storage platform (cloudflare-workers, cloudflare-storage for R2/D1/KV). |

## Notes

- Workers AI is generally available. Custom requirements (private custom models, higher limits): https://forms.gle/axnnpGDb6xrmR31T6
- Feedback: the `#workers-ai` channel on https://discord.cloudflare.com ; Wrangler issues in https://github.com/cloudflare/workers-sdk/issues/new/choose
- Use cases: https://developers.cloudflare.com/use-cases/ai/

## Related

- [Binding and env.AI.run()](./bindings-and-run.md)
- [REST API](./rest-api.md)
- [Pricing](./pricing.md)
- [Limits](./limits.md)
