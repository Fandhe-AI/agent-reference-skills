---
source: https://developers.cloudflare.com/ai-gateway/integrations/vercel-ai-sdk/, https://developers.cloudflare.com/ai-gateway/integrations/pi-ai/
---

# AI SDK and Pi AI integrations

Call AI Gateway from the Vercel AI SDK or Pi AI with `createAI` from the Cloudflare Agents SDK (`agents/models/ai-sdk`, `agents/models/pi-ai`). The older `ai-gateway-provider` package is deprecated.

## Signature / Usage

Vercel AI SDK (needs `ai@^7` and `@ai-sdk/provider@^4`):

```bash
npm i agents ai @ai-sdk/provider
```

```ts
import { createAI } from "agents/models/ai-sdk";
import { streamText } from "ai";

export default {
	async fetch(request: Request, env: Env) {
		const ai = createAI({ binding: env.AI, id: "my-gateway" });

		const result = streamText({
			model: ai("anthropic/claude-opus-5.5"),
			messages: [{ role: "user", content: "Write a short story" }],
		});

		return result.toTextStreamResponse();
	},
};
```

Vendor model object and fallbacks:

```ts
import { createAnthropic } from "@ai-sdk/anthropic";
import { createAI } from "agents/models/ai-sdk";

const ai = createAI({ binding: env.AI, id: "my-gateway" });
const anthropic = createAnthropic({ apiKey: "cloudflare" });

const model = ai(anthropic("claude-opus-5-5"), {
	fallback: ["openai/gpt-5.5", "@cf/zai-org/glm-4.7-flash"],
});
```

Gateway options, per provider or per call:

```ts
const ai = createAI({
	binding: env.AI,
	id: "my-gateway",
	cacheTtl: 60,
	metadata: { app: "support-bot" },
});

await generateText({
	model: ai("openai/gpt-5.5"),
	prompt: "Summarize this ticket",
	providerOptions: {
		cloudflare: { skipCache: true, metadata: { userId: "u_123" } },
	},
});
```

Pi AI (needs `@earendil-works/pi-ai@~1.4.0`; install with `npm i agents @earendil-works/pi-ai`):

```ts
import { createAI } from "agents/models/pi-ai";

export default {
	async fetch(request: Request, env: Env) {
		const ai = createAI({ binding: env.AI, id: "my-gateway" });

		const reply = await ai.complete(ai("anthropic/claude-opus-5.5"), {
			messages: [
				{ role: "user", content: "Write a short story", timestamp: Date.now() },
			],
		});

		return Response.json(reply.content);
	},
};
```

Outside a Worker or in another account (pass an API token from a secret, not a literal):

```ts
const ai = createAI({
	accountId: "<ACCOUNT_ID>",
	apiToken: env.CLOUDFLARE_API_TOKEN,
	gateway: "my-gateway",
});
```

## Options / Props

### `createAI` options (as shown in the examples)

| Name | Type | Default | Description |
|------|------|---------|-------------|
| binding | `env.AI` | — | AI binding (in a Worker) |
| id | string | `default` | Gateway ID when using a binding |
| accountId | string | — | Account ID when using an API token |
| apiToken | string | — | Token with **Workers AI Read** (model ids) and **AI Gateway Run** (model objects) |
| gateway | string | — | Gateway name when using `accountId` and `apiToken` |
| cacheTtl | number | — | Cache TTL in seconds |
| metadata | object | — | Metadata attached to requests |
| fallback (per model) | array | — | Models to try in order if the primary fails before producing output |
| byokAlias (Pi AI, per model) | string | — | Stored-key alias, e.g. `production` |
| providerOptions.cloudflare (AI SDK, per call) | object | — | e.g. `skipCache`, `metadata` |

## Notes

- Model ids use the catalog spelling (`anthropic/claude-opus-5.5`, `openai/gpt-5.5`); dynamic routes are `dynamic/<route>`, e.g. `ai("dynamic/support")`. A vendor model object keeps the vendor's own id (e.g. `claude-opus-5-5`) and goes to the provider-native endpoint; the vendor `apiKey` is a placeholder because AI Gateway holds the credential.
- Catalog models are billed through Unified Billing or use a key stored on the gateway; no vendor key is needed.
- Pi AI sends the model's own format (Anthropic Messages or OpenAI Responses). It has no `fallback`-specific differences beyond the AI SDK form.
- Full references live in the cloudflare-agents skill (models; https://developers.cloudflare.com/agents/).
- AI SDK concepts (`streamText`, `generateText`, provider packages) belong to the vercel-ai-sdk skill; this page covers only the gateway wiring.

## Related

- [usage-worker-binding-methods.md](./usage-worker-binding-methods.md)
- [features-dynamic-routing.md](./features-dynamic-routing.md)
- [features-unified-billing.md](./features-unified-billing.md)
- [configuration-bring-your-own-keys.md](./configuration-bring-your-own-keys.md)
