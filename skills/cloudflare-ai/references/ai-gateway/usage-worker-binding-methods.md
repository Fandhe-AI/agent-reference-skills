---
source: https://developers.cloudflare.com/ai-gateway/usage/worker-binding-methods/
---

# Workers Bindings (env.AI)

The AI binding (`env.AI`) calls Workers AI and third-party models through AI Gateway and exposes gateway methods for feedback, log retrieval, and URLs.

## Signature / Usage

Wrangler configuration:

```jsonc
{
	"ai": {
		"binding": "AI",
	},
}
```

```toml
[ai]
binding = "AI"
```

```ts
const resp = await env.AI.run(
	"openai/gpt-4.1-mini",
	{
		messages: [{ role: "user", content: "tell me a joke" }],
	},
	{
		gateway: {
			id: "default", // or use a specific gateway name
		},
	},
);
```

Gateway instance methods:

```typescript
const gateway = env.AI.gateway("my-gateway");

await gateway.patchLog("my-log-id", {
	feedback: 1,
	score: 100,
	metadata: {
		user: "123",
	},
});

const log = await gateway.getLog("my-log-id");

const baseUrl = await gateway.getUrl();
// https://gateway.ai.cloudflare.com/v1/my-account-id/my-gateway/

const openaiUrl = await gateway.getUrl("openai");
// https://gateway.ai.cloudflare.com/v1/my-account-id/my-gateway/openai
```

## Options / Props

### `gateway` option (third argument to `env.AI.run()`)

| Name | Type | Default | Description |
|------|------|---------|-------------|
| id | string | required | Gateway name in the same account as the Worker; `"default"` auto-creates on first authenticated request |
| skipCache | boolean | false | Skip the cache for this request |
| cacheTtl | number | — | Cache TTL in seconds |
| cacheKey | string | — | Custom cache key |
| collectLog | boolean | — | Whether to collect logs for this request |
| metadata | object | — | Custom metadata for the log entry |

### Members

| Member | Returns | Description |
|--------|---------|-------------|
| `env.AI.run(model, input, { gateway })` | model response | Inference via AI Gateway; `@cf/` Workers AI, `{author}/{model}` third-party, or `dynamic/{route}` |
| `env.AI.aiGatewayLogId` | string | Log ID of the most recent `run()` request |
| `env.AI.gateway(id)` | gateway instance | Access gateway methods |
| `patchLog(logId, { feedback, score, metadata })` | `Promise<void>` | All properties optional |
| `getLog(logId)` | `Promise<AiGatewayLog>` | Log details; run `wrangler types` if the type is missing |
| `getUrl(provider?)` | `Promise<string>` | Base or provider-specific gateway URL (provider as string or `AIGatewayProviders` enum) |

## Notes

- Third-party models require an AI Gateway and use Unified Billing (Cloudflare-managed credentials, credits deducted); no provider keys needed. Only a BYOK key under the `default` alias is used on this path; other aliases are not consulted and the request falls through to Unified Billing. To use another alias, use provider-native endpoints with `cf-aig-byok-alias`.
- For prepaid credits with Workers AI, set the gateway's Workers AI billing to Unified billing and name that gateway in the request.
- A dynamic route needs `gateway.id` set to the gateway that owns it; routes are not shared across gateways, and only the OpenAI chat completions request shape is accepted.
- Run `wrangler types` after changing the Wrangler configuration to regenerate `env` types.
- `getUrl()` lets OpenAI / Vercel AI SDK clients point at the gateway: `new OpenAI({ baseURL: await env.AI.gateway("my-gateway").getUrl("openai") })` (provide the API key from a secret binding, e.g. `env.OPENAI_API_KEY`, not a literal). The same applies to `createOpenAI` / `createAnthropic` from the vercel-ai-sdk skill's packages.
- Binding requests are pre-authenticated within the account.
- Third-party models: pass the model's input object directly as the second argument to `env.AI.run()`; do not wrap it in an `input` field (AI Gateway rejects fields the model does not accept). Binding errors may only show `7003: User Input Error`; see the 7003 entry in [reference-troubleshooting.md](./reference-troubleshooting.md).
- Source: https://developers.cloudflare.com/ai-gateway/usage/worker-binding-methods/ (pin 34d908a / fetched 2026-11-14).

## Related

- [integrations-workers-ai-binding.md](./integrations-workers-ai-binding.md)
- [features-dynamic-routing.md](./features-dynamic-routing.md)
- [reference-troubleshooting.md](./reference-troubleshooting.md)
- [evaluations-human-feedback.md](./evaluations-human-feedback.md)
- [usage-rest-api.md](./usage-rest-api.md)
