---
source: https://developers.cloudflare.com/workers-ai/configuration/pi-ai/
---

# Pi AI (createAI)

Use Workers AI models with Pi AI through `createAI` from `agents/models/pi-ai`; it returns Pi AI `Model` objects.

## Signature / Usage

```sh
npm i agents @earendil-works/pi-ai
```

```ts
import { createAI } from "agents/models/pi-ai";

export default {
	async fetch(request: Request, env: Env) {
		const ai = createAI({ binding: env.AI });

		const reply = await ai.complete(ai("@cf/zai-org/glm-4.7-flash"), {
			messages: [
				{ role: "user", content: "What is Cloudflare?", timestamp: Date.now() },
			],
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

Streaming and model details:

```ts
const model = ai("@cf/zai-org/glm-4.7-flash");
const context = {
	messages: [{ role: "user", content: "Hi", timestamp: Date.now() }],
};

for await (const event of ai.stream(model, context)) {
	// text_delta, thinking_delta, toolcall_*, done, error
}
```

```ts
const model = ai("@cf/zai-org/glm-4.7-flash", {
	contextWindow: 131_072,
	maxTokens: 16_384,
});
```

Images and gateway:

```ts
const images = ai.images("@cf/black-forest-labs/flux-1-schnell", { steps: 8 });
const result = await ai.generateImages(images, {
	input: [{ type: "text", text: "A red bicycle" }],
});
```

```ts
const ai = createAI({ binding: env.AI, id: "my-gateway" });
```

## Options / Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| binding | Ai | — | Workers AI binding (`env.AI`). |
| id | string | `default` | AI Gateway ID; every request goes through AI Gateway. |
| accountId | string | — | With `apiToken`, call from outside a Worker instead of `binding`. |
| apiToken | string | — | With `accountId`, call from outside a Worker. |
| contextWindow | number | 128,000 (for ids Pi AI does not list) | Per-model override (second argument of `ai(id, ...)`). |
| maxTokens | number | 8,192 (for ids Pi AI does not list) | Per-model override. |

## Notes

- Requires `@earendil-works/pi-ai@~1.5.0` (docs at pin 34d908a; the 2026-11-03 pin said ~1.4.0), the `agents` package, and the `AI` binding in the Wrangler config.
- A Workers AI id that Pi AI does not list resolves with a 128,000 token context window, 8,192 output tokens, and zero cost.
- `ai.streamSimple()` and `ai.completeSimple()` take Pi AI's simple options (`reasoning`, `maxTokens`).
- Gateway options, catalog models, fallback: the cloudflare-agents skill (models: pi-ai; harnesses: pi; https://developers.cloudflare.com/agents/). The Agents SDK is outside this category.
- The Vercel `ai` package equivalent is on the ai-sdk page; its API belongs to vercel-ai-sdk.

## Related

- [AI SDK](./ai-sdk.md)
- [Binding and env.AI.run()](./bindings-and-run.md)
