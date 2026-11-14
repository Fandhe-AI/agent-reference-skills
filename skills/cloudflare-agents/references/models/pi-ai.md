---
source: https://developers.cloudflare.com/agents/models/pi-ai/
---

# Pi AI provider (agents/models/pi-ai)

`createAI` from `agents/models/pi-ai` has the same factory and options as the AI SDK provider but returns Pi AI `Model` objects, for use with Pi AI's `stream` / `complete`, Pi Durable, the Pi harness, or any framework built on a Pi AI `Models` registry.

## Signature / Usage

Needs `@earendil-works/pi-ai@~1.5.0` (optional peer dependency of `agents`): `npm i agents @earendil-works/pi-ai`. Add the `AI` binding to Wrangler, or pass `accountId` and `apiToken`.

```ts
import { createAI } from "agents/models/pi-ai";

export default {
	async fetch(request: Request, env: Env) {
		const ai = createAI({ binding: env.AI });

		const reply = await ai.complete(ai("@cf/zai-org/glm-5.3-flash"), {
			messages: [{ role: "user", content: "Hello", timestamp: Date.now() }],
		});

		// `content` holds text, thinking, and tool call parts.
		const text = reply.content
			.filter((part) => part.type === "text")
			.map((part) => part.text)
			.join("");

		return Response.json({ text });
	},
};
```

Four ways to name a model:

```ts
import { createAI } from "agents/models/pi-ai";
import { getBuiltinModel } from "@earendil-works/pi-ai/providers/all";

const ai = createAI({ binding: env.AI, id: "my-gateway" });

// 1. A Workers AI model, by its @cf/ id.
ai("@cf/zai-org/glm-5.3-flash");

// 2. An AI Gateway dynamic route, by dynamic/<route>.
ai("dynamic/support");

// 3. A model from Pi AI's Cloudflare AI Gateway catalog, by <provider>/<id>.
ai("anthropic/claude-opus-5.5");
ai("openai/gpt-5.4");

// 4. Any Pi AI model object, from any Pi AI registry.
ai(getBuiltinModel("anthropic", "claude-opus-5-5"));
```

Streaming and the Pi harness:

```ts
const model = ai("anthropic/claude-opus-5.5");
const context = {
	messages: [{ role: "user", content: "Hi", timestamp: Date.now() }],
};

for await (const event of ai.stream(model, context)) {
	// text_delta, thinking_delta, toolcall_*, done, error
}

await ai.completeSimple(model, context, { reasoning: "low" });
```

```ts
import { createModels } from "@earendil-works/pi-ai/models";
import { createAI } from "agents/models/pi-ai";

const ai = createAI({ binding: env.AI });
const models = createModels();
models.setProvider(ai.provider);

// In PiHarness options:
// defaults: { model: ai("@cf/zai-org/glm-5.3-flash") }

// For one session:
await session.setModel(ai("anthropic/claude-opus-5.5"));
```

Options, fallback, metadata, and images:

```ts
const ai = createAI({ binding: env.AI, id: "prod", cacheTtl: 60 });

const model = ai("anthropic/claude-opus-5.5", {
	cacheTtl: 3600,
	cacheKey: "greeting-v1",
	metadata: { team: "growth" },
	eventId: "turn-17",
	requestTimeoutMs: 30_000,
	retries: { maxAttempts: 3, backoff: "exponential", retryDelayMs: 500 },
	byokAlias: "production",
});
```

```ts
ai(getBuiltinModel("anthropic", "claude-opus-5-5"), {
	fallback: ["@cf/zai-org/glm-5.3-flash"],
});
```

```ts
const message = await ai.complete(model, context);
const cloudflare = message.diagnostics?.find(
	(d) => d.type === "cloudflare",
)?.details;
// { model, gateway, provider?, specifier?, logId?, eventId?, cacheStatus?,
//   step?, traceId?, runId? }
```

```ts
const images = ai.images("@cf/black-forest-labs/flux-1-schnell", { steps: 8 });
const result = await ai.generateImages(images, {
	input: [{ type: "text", text: "A red bicycle" }],
});
```

## Options / Props

Same options as the AI SDK provider: `id`, `skipCache`, `cacheTtl`, `cacheKey`, `collectLog`, `metadata`, `eventId`, `requestTimeoutMs`, `retries`, `byokAlias`, `zdr`, `fallback`, `headers`, `sessionAffinity`, `reasoningEffort`, `chatTemplateKwargs` (`vendorKey` is AI SDK only).

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `ai.complete` / `ai.stream` | methods | — | Pi AI entry points; `stream` yields `AssistantMessageEvent`s. |
| `ai.completeSimple` / `ai.streamSimple` | methods | — | Take Pi AI simple options such as `reasoning` level and `maxTokens`. |
| `ai.streamFn` | function | — | `streamSimple`, bound, for frameworks taking a stream function (pi-agent-core `Agent({ streamFn })`). |
| `ai.provider` | provider | — | Register on a Pi `Models` registry with `models.setProvider(ai.provider)`. |
| `ai.images(id, opts)` / `ai.generateImages` | methods | — | Workers AI image generation. |
| `@cf/` metadata overrides | object | context window 128,000, output 8,192, cost 0 for unlisted ids | `name`, `contextWindow`, `maxTokens`, `reasoning`, `input`, `cost`, `streamIdleTimeoutMs`. |
| `onResponse` | callback | — | Receives status and headers of every request. |

## Notes

- Any string other than the four forms throws `TypeError`. Catalog ids use the catalog spelling (`anthropic/claude-opus-5.5`); model objects from a vendor registry keep vendor spelling. A dynamic route runs under the gateway you created it on (set `id`).
- Routing by model `api`: `cloudflare-ai` (`@cf/` and dynamic) via `env.AI.run()`; `anthropic-messages` and `openai-responses` for catalog models via `env.AI.run()` in native format; other model objects via the binding's `fetch` to the provider-native endpoint. Only `cloudflare-ai`, `anthropic-messages`, `openai-responses`, and `openai-completions` route; `mistral-conversations`, `google-generative-ai`, `google-vertex`, `amazon-bedrock`, `azure-openai-responses`, `openai-codex` end with an `error` event naming the `api`.
- On the `openai-completions` wire reasoning is sent only as `reasoning_effort`; other `compat.thinkingFormat` values (`deepseek`, `qwen`, `openrouter`) are dropped and recorded in a `cloudflare-compat` diagnostic. `reasoningEffort` and `chatTemplateKwargs` are dropped on third-party models.
- Sessions store only provider and id: use the `@cf/`, `dynamic/`, `<provider>/<id>` forms with the Pi harness (provider id `CLOUDFLARE_PROVIDER_ID`); options passed to `ai(model, options)` do not reach a session, so set them on `createAI`. A model object keeps its vendor provider id, unknown to the registry. Per-model options are stored under symbol keys that `JSON.stringify` / `structuredClone` drop; re-apply with `ai(model, options)` after loading.
- Transient errors (cut-off stream, or silence for `streamIdleTimeoutMs`) are retried by the Pi harness. Catalog and dynamic-route streams resume through the binding (up to five drops, run id in the `cloudflare` diagnostic's `runId`); `@cf/` streams and off-catalog model objects do not.
- Fallback: tried in order only before any output; the answer has a `cloudflare-fallback` diagnostic and `message.model` names the answering model. Failed requests produce a `cloudflare-error` diagnostic (`status`, `code`, `logId`); gateway failures become `CloudflareAIError`.
- Account-id mode needs a token with **Workers AI Read** and **AI Gateway Run**; it is sent only to the AI Gateway REST API and `gateway.ai.cloudflare.com`. Keep it a secret. Third-party models use Unified Billing or a key stored on the gateway; the Worker holds no provider key. `flux-1-schnell` drops `width`, `height`, `seed`, `guidance`, `negativePrompt` (listed in `cloudflare-compat`).
- Pi AI is the third-party `earendil-works/pi` library; Pi harness: [pi.md](../harnesses/pi.md). Workers AI / AI Gateway products are in the cloudflare-ai skill (workers-ai; https://developers.cloudflare.com/workers-ai/).

## Related

- [Models overview](./overview.md)
- [AI SDK provider](./ai-sdk.md)
