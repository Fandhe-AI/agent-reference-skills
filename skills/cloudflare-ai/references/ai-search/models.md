---
source: https://developers.cloudflare.com/ai-search/configuration/models/, https://developers.cloudflare.com/ai-search/configuration/models/supported-models/, https://developers.cloudflare.com/ai-search/configuration/models/ai-gateway/
---

# Models and AI Gateway

Models used for embedding, generation, reranking, and query rewriting; every instance connects to an AI Gateway.

## Signature / Usage

Snippet taken from https://developers.cloudflare.com/ai-search/api/instances/workers-binding/

```ts
const updated = await env.AI_SEARCH.get("my-instance").update({
	ai_search_model: "@cf/meta/llama-3.3-70b-instruct-fp8-fast",
	reranking: true,
});
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `embedding_model` | string | `@cf/qwen/qwen3-embedding-0.6b` | Set at creation only. |
| `ai_search_model` | string | Smart Default | Generation model; changeable any time; per-request `model` override. |
| `rewrite_model` | string | — | Query rewriting model. |
| `reranking_model` | string | `@cf/baai/bge-reranker-base` | 512 input tokens. |
| `ai_gateway_id` | string | — | Gateway for generation, rewriting, external-provider calls. |

Embedding models (dimensions / input tokens / images): `google-ai-studio/gemini-embedding-001` (1,536 / 2,048 / no), `google-ai-studio/gemini-embedding-2` (1,536 / 8,192 / yes), `openai/text-embedding-3-small` and `-large` (1,536 / 8,192 / no), `@cf/baai/bge-m3` (1,024 / 512 / no), `@cf/baai/bge-large-en-v1.5` (1,024 / 512 / no), `@cf/qwen/qwen3-embedding-0.6b` (1,024 / 8,192 / no), `@cf/qwen/qwen3-vl-embedding-2b` (1,024 / 32,768 / yes), `@cf/google/embeddinggemma-300m` (768 / 512 / no). All cosine.

Workers AI generation models (context tokens): `@cf/meta/llama-3.3-70b-instruct-fp8-fast` (24,000), `@cf/meta/llama-3.1-8b-instruct-fast` (60,000), `@cf/meta/llama-3.1-8b-instruct-fp8` (32,000), `@cf/meta/llama-4-scout-17b-16e-instruct` (131,000), `@cf/deepseek-ai/deepseek-v4-flash-0731` (1,048,576), `@cf/deepseek-ai/deepseek-v4-pro-0813` (1,048,576), `@cf/openai/gpt-oss-120b` (128,000), `@cf/openai/gpt-oss-20b` (128,000), `@cf/qwen/qwen3.8-27b` (262,144), `@cf/moonshotai/kimi-k2.7-code` (262,144), `@cf/zai-org/glm-4.7-flash` (131,072), `@cf/zai-org/glm-5.3-flash` (1,048,576), `@cf/zai-org/glm-5.3` (1,310,720), `@cf/qwen/qwen3-30b-a3b-fp8` (32,000).

## Notes

- External providers (OpenAI, Anthropic, ...): add provider keys to AI Gateway (bring your own keys), connect that gateway on creation or under **Settings** > **Resources**. Embedding and reranking models must be in the supported list; generation and rewriting accept any AI Gateway model ID compatible with OpenAI Chat Completions.
- Models on this page flagged on the Workers AI planned-deprecation list (2026-11-20; requests then fail with HTTP 410, error 5028): `@cf/google/embeddinggemma-300m`, `@cf/meta/llama-3.1-8b-instruct-fp8`, `@cf/deepseek-ai/deepseek-v4-flash-0731`, `@cf/deepseek-ai/deepseek-v4-pro-0813`, `@cf/moonshotai/kimi-k2.7-code`, `@cf/zai-org/glm-5.3-flash`, and `@cf/qwen/qwen3-30b-a3b-fp8`. The lists above are not updated for that. An embedding model cannot be changed after the instance is created, so avoid `@cf/google/embeddinggemma-300m` for new instances. Source: https://developers.cloudflare.com/changelog/post/2026-11-05-planned-model-deprecations/ (pin 34d908a / fetched 2026-11-14).
- Smart Default picks a Cloudflare-recommended model and upgrades it over time. The AI Search pages themselves list no end-of-life models; deprecated models return a clear error after their end-of-life date.
- Workers AI embedding and reranking run under AI Search (not in AI Gateway logs, not billed as Workers AI). Rewriting, generation, external calls go through the gateway; you can use Guardrails, DLP, retries/fallbacks.
- Do not enable AI Gateway caching (stale embeddings degrade the index) or rate limiting (interrupts indexing) on the connected gateway.
- Native image embedding: `@cf/qwen/qwen3-vl-embedding-2b` or `google-ai-studio/gemini-embedding-2`; text-only models caption images.
- AI Gateway features and Workers AI models are documented in the sibling categories.

## Related

- [AI Gateway overview](../ai-gateway/overview.md)
- [Text generation models](../workers-ai-models/text-generation.md)
- [Similarity cache](./similarity-cache.md)
