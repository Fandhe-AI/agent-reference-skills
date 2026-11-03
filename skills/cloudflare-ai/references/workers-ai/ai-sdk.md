---
source: https://developers.cloudflare.com/workers-ai/configuration/ai-sdk/
---

# Vercel AI SDK (createAI)

Use Workers AI models with the AI SDK through `createAI` from `agents/models/ai-sdk`.

## Signature / Usage

```sh
npm i agents ai @ai-sdk/provider
```

```ts
import { createAI } from "agents/models/ai-sdk";

const ai = createAI({ binding: env.AI });

const model = ai("@cf/zai-org/glm-4.7-flash");
```

```ts
import { createAI } from "agents/models/ai-sdk";
import { generateText } from "ai";

export default {
	async fetch(request: Request, env: Env) {
		const ai = createAI({ binding: env.AI });

		const { text } = await generateText({
			model: ai("@cf/zai-org/glm-4.7-flash"),
			prompt: "Write a 50-word essay about hello world.",
		});

		return new Response(text);
	},
};
```

Streaming:

```ts
import { createAI } from "agents/models/ai-sdk";
import { streamText } from "ai";

export default {
	async fetch(request: Request, env: Env) {
		const ai = createAI({ binding: env.AI });

		const result = streamText({
			model: ai("@cf/zai-org/glm-4.7-flash"),
			prompt: "Write a 50-word essay about hello world.",
		});

		return result.toTextStreamResponse();
	},
};
```

Structured output:

```ts
import { createAI } from "agents/models/ai-sdk";
import { generateText, Output } from "ai";
import { z } from "zod";

export default {
	async fetch(request: Request, env: Env) {
		const ai = createAI({ binding: env.AI });

		const { output } = await generateText({
			model: ai("@cf/zai-org/glm-4.7-flash"),
			prompt: "Generate a lasagna recipe.",
			output: Output.object({
				schema: z.object({
					recipe: z.object({
						ingredients: z.array(z.string()),
						description: z.string(),
					}),
				}),
			}),
		});

		return Response.json(output);
	},
};
```

Other model types:

```ts
import {
	embedMany,
	generateImage,
	generateSpeech,
	rerank,
	transcribe,
} from "ai";

const { embeddings } = await embedMany({
	model: ai.embedding("@cf/baai/bge-base-en-v1.5"),
	values: ["hello", "world"],
});

const { image } = await generateImage({
	model: ai.image("@cf/black-forest-labs/flux-1-schnell"),
	prompt: "A cyberpunk lizard",
});

const { audio } = await generateSpeech({
	model: ai.speech("@cf/deepgram/aura-1"),
	text: "Hello from Cloudflare.",
});

const { text } = await transcribe({
	model: ai.transcription("@cf/openai/whisper-large-v3-turbo"),
	audio: audio.uint8Array,
});

const { rerankedDocuments } = await rerank({
	model: ai.reranking("@cf/baai/bge-reranker-base"),
	documents: ["a cyberpunk lizard", "a rainy Tuesday"],
	query: "Which one is cooler?",
});
```

## Options / Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| binding | Ai | — | The Workers AI binding, for example `env.AI`. |
| id | string | `default` | AI Gateway ID; requests go through AI Gateway. |

## Notes

- The `workers-ai-provider` package is deprecated per the source; use `createAI` instead.
- Requires `ai@^7` and `@ai-sdk/provider@^4`. The `AI` binding must be in the Wrangler config (`"ai": { "binding": "AI" }`).
- Model IDs start with `@cf/` and autocomplete from `@cloudflare/workers-types`.
- `createAI({ binding: env.AI, id: "my-gateway" })` selects another gateway; the same provider also calls AI Gateway catalog models such as `anthropic/claude-opus-5.5`. Gateway options, caching, fallback: cloudflare-agents skill (models: ai-sdk; https://developers.cloudflare.com/agents/)
- The `ai` package API (`generateText`, `streamText`, `Output.object`, `embedMany`, ...) belongs to vercel-ai-sdk; `z.object` schemas belong to zod. This page covers only the Workers AI provider setup.
- Provider SDKs for the underlying vendors (OpenAI, Anthropic, Gemini): openai-api-core, anthropic-api-core, google-gemini-api.

## Related

- [Pi AI](./pi-ai.md)
- [Binding and env.AI.run()](./bindings-and-run.md)
- [JSON Mode](./json-mode.md)
