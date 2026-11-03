---
source: https://developers.cloudflare.com/agents/models/ai-sdk/
---

# AI SDK provider (agents/models/ai-sdk)

`createAI` returns a full AI SDK `ProviderV4` for Workers AI and AI Gateway. Models work anywhere the AI SDK takes a model: `generateText`, `streamText`, tools, structured output, Think, embeddings, images, speech, transcription, and reranking.

## Signature / Usage

Requires `ai@^7` and `@ai-sdk/provider@^4` (optional peer dependencies of `agents`): `npm i agents ai @ai-sdk/provider`. Add a vendor package (for example `@ai-sdk/anthropic`) only for vendor model objects.

```ts
import { createAI } from "agents/models/ai-sdk";
import { generateText } from "ai";

export default {
	async fetch(request: Request, env: Env) {
		const ai = createAI({ binding: env.AI });

		const { text } = await generateText({
			model: ai("@cf/zai-org/glm-4.7-flash"),
			prompt: "Say hello in three words",
		});

		return Response.json({ text });
	},
};
```

Catalog model, dynamic route, and vendor model objects (AI Gateway holds the credential, so the vendor `apiKey` is a placeholder):

```ts
const ai = createAI({ binding: env.AI, id: "my-gateway" });

await generateText({ model: ai("dynamic/support"), prompt: "Hi" });
```

```ts
import { createAnthropic } from "@ai-sdk/anthropic";
import { createOpenAI } from "@ai-sdk/openai";
import { createAI } from "agents/models/ai-sdk";
import { generateText } from "ai";

export default {
	async fetch(request: Request, env: Env) {
		const ai = createAI({ binding: env.AI });
		const anthropic = createAnthropic({ apiKey: "cloudflare" });
		const openai = createOpenAI({ apiKey: "cloudflare" });

		const claude = await generateText({
			model: ai(anthropic("claude-opus-5-5")),
			prompt: "Say hello in three words",
		});

		const gpt = await generateText({
			model: ai(openai.responses("gpt-5-mini")),
			prompt: "Say hello in three words",
		});

		return Response.json({ claude: claude.text, gpt: gpt.text });
	},
};
```

Bring your own vendor key and options:

```ts
const anthropic = createAnthropic({ apiKey: env.ANTHROPIC_API_KEY });
const model = ai(anthropic("claude-opus-5-5"), { vendorKey: "request" });
```

```ts
const model = ai(anthropic("claude-opus-5-5"), {
	byokAlias: "production",
	zdr: true,
});
```

Use in Think, cache, fallback, per-call options:

```ts
import { Think } from "@cloudflare/think";
import { createAI } from "agents/models/ai-sdk";

export class Assistant extends Think<Env> {
	getModel() {
		return createAI({ binding: this.env.AI })("@cf/moonshotai/kimi-k2.7-code");
	}
}
```

```ts
const model = ai(anthropic("claude-opus-5-5"), {
	fallback: ["openai/gpt-5.5", "dynamic/support", "@cf/zai-org/glm-4.7-flash"],
});
```

```ts
// Provider
const ai = createAI({ binding: env.AI, id: "prod", metadata: { app: "demo" } });

// Model
const model = ai("anthropic/claude-opus-5.5", { cacheTtl: 3600 });

// Call
await generateText({
	model,
	prompt: "hi",
	providerOptions: {
		cloudflare: { skipCache: true, metadata: { userId: "u1" } },
	},
});
```

Errors and other modalities:

```ts
import { CloudflareAIError } from "agents/models/ai-sdk";

try {
	await generateText({ model: ai("@cf/zai-org/glm-4.7-flash"), prompt: "hi" });
} catch (error) {
	if (error instanceof CloudflareAIError) {
		console.log(error.status, error.code, error.logId, error.model);
		// error.attempts lists every fallback model that failed.
	}
}
```

```ts
const { embeddings } = await embedMany({
	model: ai.embedding("@cf/baai/bge-base-en-v1.5"),
	values: ["hello", "world"],
});

const { image } = await generateImage({
	model: ai.image("@cf/black-forest-labs/flux-1-schnell"),
	prompt: "A cyberpunk lizard",
});
```

## Options / Props

Set on the provider, a model, or a call (`providerOptions.cloudflare`); call wins over model wins over provider. Flat or nested under `gateway`.

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `binding` | `Ai` | — | The `AI` binding. Provider only. |
| `accountId` | string | — | Account for account-id mode. Provider only. |
| `apiToken` | string | — | Cloudflare API token (Workers AI Read for strings, AI Gateway Run for model objects). Provider only. |
| `id` | string | `"default"` | Gateway id; created on first use. |
| `gateway` | `string` or `GatewayOptions` | — | Gateway id or options nested. |
| `skipCache` | boolean | — | Bypass the gateway cache. |
| `cacheTtl` | number | — | Cache lifetime in seconds. |
| `cacheKey` | string | — | Cache key instead of the derived one. |
| `collectLog` | boolean | — | Whether the gateway stores request and response in its log. |
| `metadata` | `Record<string, string or number or boolean or null>` | — | Values attached to the log entry; merged key by key. |
| `eventId` | string | — | Groups requests into one gateway event. |
| `requestTimeoutMs` | number | — | Upstream request timeout. |
| `retries` | `{ maxAttempts, retryDelayMs, backoff }` | — | Gateway retry policy; `maxAttempts` 1 to 5. |
| `byokAlias` | string | — | Stored BYOK key by alias (catalog models and model objects). |
| `zdr` | boolean | — | Zero Data Retention for a Unified Billing request (model objects only). |
| `vendorKey` | `"gateway"` or `"request"` | — | `"request"` forwards the vendor key; model objects only, per model; not inherited by fallbacks. |
| `fallback` | array | — | Models tried in order if the primary fails before any output. Model and call only. |
| `headers` | `Record<string, string>` | — | Extra request headers, merged last. Model and call only. |
| `sessionAffinity` | string | — | Workers AI only: same key goes to one replica for prefix caching. |
| `reasoningEffort` | `"low"`, `"medium"`, `"high"`, `null` | — | Sent as `reasoning_effort`; `null` turns reasoning off where allowed. Ignored with a warning on model objects. |
| `chatTemplateKwargs` | `Record<string, unknown>` | — | Workers AI only; sent as `chat_template_kwargs`. Dropped with a warning on catalog models and dynamic routes. |

`providerMetadata.cloudflare` fields: `model` (always present), `gateway`, `provider`, `logId`, `eventId`, `requestId`, `traceId`, `runId`, `cacheStatus` (`HIT` or `MISS`), `step`.

Modality options (`providerOptions.cloudflare`): image `steps`, `guidance`, `negativePrompt`, `strength`; transcription `language`, `task`, `initialPrompt`, `prefix`, `vadFilter`; speech and reranking none. Unsupported options are listed in `warnings`.

`CloudflareAIError.code`: `auth`, `rate-limit`, `not-found`, `bad-request`, `provider-error`, `gateway-error`, `unknown`.

## Notes

- Routing: strings run on `env.AI.run()`; catalog and dynamic calls use the OpenAI chat completions format. Model objects are sent unchanged to `https://workers-binding.ai/ai-gateway/gateways/{gateway}/{provider}/{endpoint}` through the binding; the gateway provider comes from the request host and unknown hosts throw `TypeError`. A string that is not a `@cf/` id, catalog id, or dynamic route throws `TypeError`. A dynamic route is language-model only and belongs to one gateway.
- Catalog ids use the catalog spelling (`anthropic/claude-opus-5.5`, not `anthropic/claude-opus-5-5`); vendor model objects use the vendor id.
- Unified Billing needs gateway authentication, otherwise error `2049`. In account-id mode the token goes only to the AI Gateway REST API (strings) and `gateway.ai.cloudflare.com` via the `cf-aig-authorization` header (objects). Keep tokens and vendor keys in secrets; `apiKey: "cloudflare"` is a placeholder, not a credential.
- `ai()` clones the model and rejects models already wrapped in middleware: wrap with `ai()` first (`wrapLanguageModel({ model: ai(anthropic("claude-opus-5-5")), middleware })`). `providerOptions.cloudflare` is stripped before reaching a vendor model.
- Resume: through the binding, catalog and dynamic-route streams reconnect and replay from the last complete event using `cf-aig-run-id`; gives up after five drops or when the gateway no longer holds the run (kept a few minutes); aborting never resumes. `@cf/` streams and model objects do not resume.
- Fallback runs in your Worker across models; each fallback uses the chain's gateway options (`headers`, Workers AI options, `vendorKey` stay its own); once output has been produced the answer is final.
- Limitations: `@cf/deepgram/flux` (websocket only) throws `CloudflareAIError` (use `nova-3` or `whisper-large-v3-turbo`); the non-chat methods accept `@cf/` ids only (use `ai.routed(model)` for vendor media models); `flux-1-schnell` takes only prompt and `steps`; `generateImage` with `n > 1` sends parallel requests.
- Provider registry: `createProviderRegistry({ cloudflare: ai })`, or set `globalThis.AI_SDK_DEFAULT_PROVIDER` so bare strings resolve through it.
- Workers AI and AI Gateway products are in the cloudflare-ai skill (workers-ai; https://developers.cloudflare.com/workers-ai/); AI SDK core APIs (`generateText`, `tool()`, `embedMany`) are in vercel-ai-sdk; vendor APIs are in openai-api-core / anthropic-api-core. Dynamic routing and provider-native endpoints: cloudflare-ai skill (ai-gateway; https://developers.cloudflare.com/ai-gateway/).

## Related

- [Models overview](./overview.md)
- [Pi AI provider](./pi-ai.md)
