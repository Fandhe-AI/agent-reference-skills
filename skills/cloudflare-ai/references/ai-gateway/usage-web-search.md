---
source: https://developers.cloudflare.com/ai-gateway/usage/web-search/
---

# Web Search

AI Gateway proxies provider-native web search tools (Anthropic, OpenAI, xAI, Alibaba) and reaches search-first providers (Perplexity, Parallel) through their proxies. Search runs on the provider; gateway logging, caching, rate limiting, and guardrails apply.

## Signature / Usage

Anthropic via the Messages endpoint:

```bash
# Run `wrangler whoami` to get your account ID to replace $CLOUDFLARE_ACCOUNT_ID,
# and `wrangler auth token` to get an auth token to replace $CLOUDFLARE_API_TOKEN.
curl -X POST "https://api.cloudflare.com/client/v4/accounts/$CLOUDFLARE_ACCOUNT_ID/ai/v1/messages" \
  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
  --header "Content-Type: application/json" \
  --data '{
    "model": "anthropic/claude-haiku-4.5",
    "max_tokens": 4096,
    "messages": [
      {
        "role": "user",
        "content": "What were the top news stories about Cloudflare this week? Summarize in three bullets."
      }
    ],
    "tools": [
      {
        "type": "web_search_20250305",
        "name": "web_search",
        "max_uses": 3
      }
    ]
  }'
```

OpenAI via the AI binding (Responses API shape):

```js
const resp = await env.AI.run(
	"openai/gpt-4o-mini",
	{
		input:
			"What were the top news stories about Cloudflare this week? Summarize in three bullets.",
		max_output_tokens: 4096,
		tools: [{ type: "web_search_preview" }],
	},
	{
		gateway: {
			id: "default", // or use a specific gateway name
		},
	},
);
```

Search-first provider (Parallel):

```bash
curl https://gateway.ai.cloudflare.com/v1/{account_id}/{gateway_id}/parallel/v1beta/search \
  --header "x-api-key: $PARALLEL_API_TOKEN" \
  --header "Content-Type: application/json" \
  --data '{
    "objective": "Top news stories about Cloudflare this week.",
    "processor": "base",
    "max_results": 10
  }'
```

## Options / Props

### Activation per provider

| Provider | Endpoint | Activation | Example models (from the docs) |
|----------|----------|------------|--------------------------------|
| Anthropic | `POST /ai/v1/messages` | `tools: [{ "type": "web_search_20250305", "name": "web_search", "max_uses": N }]` | `anthropic/claude-haiku-4.5`, `anthropic/claude-sonnet-4.6`, `anthropic/claude-opus-4.8` |
| OpenAI | `POST /ai/v1/responses` | `tools: [{ "type": "web_search_preview" }]` (`web_search` also accepted) | `openai/gpt-4.1`, `openai/gpt-4o-mini`, `openai/gpt-5.5`, `openai/o3` |
| xAI | `POST /ai/v1/responses` | `tools: [{ "type": "web_search" }]` | `xai/grok-4.20-multi-agent-0309` (only supported xAI model) |
| Alibaba | `POST /ai/v1/chat/completions` | top-level `"enable_search": true` | `alibaba/qwen3-max`, `alibaba/qwen3.5-397b-a17b` |
| Perplexity | `/perplexity-ai/chat/completions` on `gateway.ai.cloudflare.com` | model `sonar` etc. | Sonar models |
| Parallel | `/parallel/v1beta/search` | Search API body | — |

### Models without web search through AI Gateway

| Model | Reason |
|-------|--------|
| Google Gemini | Not available through the unified tool; use native `google_search` on the provider-specific Vertex endpoint |
| `xai/grok-4.20-0309-non-reasoning`, `xai/grok-4.20-0309-reasoning`, `xai/grok-4.3` | Chat-completions endpoint does not accept `web_search` |
| DeepSeek `deepseek-v4-flash`, `deepseek-v4-pro`; MiniMax `m2.7`, `m3` | Function tools only |
| OpenAI `gpt-4.1-nano`, `o1-pro`, `o3-mini` | Upstream returns `invalid_request_error` for `web_search_preview` |
| OpenAI `gpt-4o-search-preview`, `gpt-4o-mini-search-preview` | Deprecated upstream |

## Notes

- OpenAI web search works only on the Responses API endpoint; `/ai/v1/chat/completions` does not accept `web_search_preview`.
- Anthropic results appear as `server_tool_use` and `web_search_tool_result` content blocks; tool parameters (`max_uses`, `allowed_domains`, `blocked_domains`, `user_location`) follow Anthropic's tool docs (anthropic-api-tools-mcp skill).
- Alibaba folds search context into the prompt, so `prompt_tokens` increases substantially.
- Billing: upstream provider web-search rates through Unified Billing; no separate gateway fee. Tool calls and results are visible in logs.
- AI Gateway has no provider-agnostic search abstraction. The official page also gives equivalent binding calls for Anthropic, xAI, and Alibaba, and a Perplexity chat completions example.

## Related

- [usage-rest-api.md](./usage-rest-api.md)
- [usage-worker-binding-methods.md](./usage-worker-binding-methods.md)
- [usage-providers-overview.md](./usage-providers-overview.md)
- [features-unified-billing.md](./features-unified-billing.md)
