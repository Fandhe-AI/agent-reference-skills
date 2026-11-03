---
source: https://developers.cloudflare.com/ai-gateway/features/auto-router/
---

# Auto Router

Automatically selects a model per request, balancing quality and cost. Use model `cloudflare/auto` on the Unified (OpenAI-compatible) API or the AI binding.

## Signature / Usage

```bash
curl -i -X POST "https://gateway.ai.cloudflare.com/v1/$CLOUDFLARE_ACCOUNT_ID/$CLOUDFLARE_GATEWAY_ID/compat/chat/completions" \
  --header "cf-aig-authorization: Bearer $CLOUDFLARE_API_TOKEN" \
  --header "Content-Type: application/json" \
  --data '{
    "model": "cloudflare/auto",
    "messages": [
      {
        "role": "user",
        "content": "hello"
      }
    ]
  }'
```

Response headers show the decision:

```txt
cf-aig-routed-model: openai/gpt-6-luna
cf-aig-routing-reason: cost_optimal_within_pool
cf-aig-routing-decision-id: 91e0b970-33f0-4921-b8dc-127412e7b103
```

From a Worker:

```ts
const response = await env.AI.run(
	"cloudflare/auto",
	{
		messages: [
			{
				role: "user",
				content: "hello",
			},
		],
	},
	{
		gateway: {
			id: "my-gateway",
		},
	},
);
```

## Options / Props

### Request headers

| Name | Type | Default | Description |
|------|------|---------|-------------|
| cf-aig-session-id | string | — | Session the request belongs to; enables session affinity (same model for a whole turn, enabling prompt caching) |
| cf-aig-turn-id | string | — | Turn the request belongs to; overrides turn detection from message history |
| cf-aig-no-session-affinity | `true` | — | Select a model per request instead of pinning per turn |
| cf-aig-allowed-models | comma-separated string | — | Models Auto Router may choose from; supports `*` wildcard (e.g. `anthropic/*`) |
| cf-aig-allowed-providers | comma-separated string | — | Providers to choose from, e.g. `openai,anthropic` |

### Response headers

| Name | Description |
|------|-------------|
| cf-aig-routed-model | Model that served the request |
| cf-aig-routing-reason | Why it was chosen (below) |
| cf-aig-routing-decision-id | Routing decision identifier |
| cf-aig-request-id | Request identifier |

### Routing reasons

| Value | Description |
|-------|-------------|
| cost_optimal_within_pool | Best balance of expected quality and cost |
| forced_by_candidate_pool | Only one model eligible |
| pinned_by_turn | Reused the model selected earlier in the turn |
| fallback_candidate_unavailable | Selected model could not serve; another eligible model used |
| fallback_key_not_in_candidates | Routing decision invalid; model selected without it |
| fallback_router_error | Router unavailable |
| fallback_router_timeout | Router did not respond in time |
| fallback_unsupported_input | No text to classify |

### Default model pool (as listed in the docs; may change over time)

| Model | Provider |
|-------|----------|
| `@cf/deepseek-ai/deepseek-v4-flash-0731` | workers-ai |
| `anthropic/claude-haiku-5.5` | anthropic |
| `anthropic/claude-opus-5.5` | anthropic |
| `anthropic/claude-sonnet-5.5` | anthropic |
| `moonshotai/kimi-k3` | workers-ai |
| `openai/gpt-6-luna` | openai |
| `openai/gpt-6.1-sol` | openai |
| `xai/grok-4.7` | xai |

## Notes

- Selection: builds a pool of eligible models (excludes models that do not support the request format or inputs such as images; accounts for credentials, billing, spend limits; unhealthy providers are excluded and restored on recovery), classifies the task, scores quality vs cost, tries the top-ranked model and falls back to the next if a provider cannot serve.
- Supports Chat Completions and Responses API formats; the WebSockets API is not yet supported.
- `cf-aig-allowed-models` replaces the default models; entries may match "additional models" (a larger list on the official page, e.g. Anthropic, OpenAI, xAI, Fireworks, Alibaba, MiniMax, Google and further Workers AI models). `*` does not match `/`, so use `anthropic/*`, not `*`. An entry that matches nothing returns `400`. If both allow-list headers are sent, a model must match both.
- Without a session ID each request may go to a different model, so the prompt cache cannot be reused. Auto Router switches mid-conversation only when the expected benefit outweighs losing the cache.
- OpenCode: set `CLOUDFLARE_ACCOUNT_ID`, `CLOUDFLARE_GATEWAY_ID`, `CLOUDFLARE_API_TOKEN` as environment variables and reference them from `opencode.json` (see [integrations-coding-agents.md](./integrations-coding-agents.md)). The plugin `@cloudflare/aig-opencode-plugin` (OpenCode 1.18.29 or later) shows the selected model, adds `/aig-show` and `/aig-capture`; install with `opencode plugin add @cloudflare/aig-opencode-plugin`.
- Provider model semantics belong to openai-api-core, anthropic-api-core, google-gemini-api.

## Related

- [usage-chat-completion.md](./usage-chat-completion.md)
- [usage-worker-binding-methods.md](./usage-worker-binding-methods.md)
- [features-dynamic-routing.md](./features-dynamic-routing.md)
- [integrations-coding-agents.md](./integrations-coding-agents.md)
