---
source: https://developers.cloudflare.com/ai-search/how-to/bring-your-own-generation-model/
---

# Bring your own generation model

Use AI Search for retrieval only and an external model (here OpenAI through the Vercel AI SDK) for generation.

## Signature / Usage

```jsonc
{
  "$schema": "./node_modules/wrangler/config-schema.json",
  "ai_search_namespaces": [
    {
      "binding": "AI_SEARCH",
      "namespace": "default",
      "remote": true
    }
  ]
}
```

```sh
npx wrangler secret put OPENAI_API_KEY
```

Adapted (not in the official docs): adds a fail-closed bearer-token check (`API_TOKEN` secret) so anonymous callers cannot spend the OpenAI key; see Notes.

```ts
import { createOpenAI } from "@ai-sdk/openai";
import { generateText } from "ai";

export interface Env {
	AI_SEARCH: AiSearchNamespace;
	OPENAI_API_KEY: string;
	API_TOKEN?: string;
}

export default {
	async fetch(request, env): Promise<Response> {
		// Fail closed: every call spends OpenAI tokens.
		if (!env.API_TOKEN || request.headers.get("authorization") !== `Bearer ${env.API_TOKEN}`) {
			return new Response("Unauthorized", { status: 401 });
		}
		const url = new URL(request.url);
		const userQuery = url.searchParams.get("query") ?? "What is Cloudflare?";

		// Search for documents in AI Search.
		const searchResult = await env.AI_SEARCH.get("my-instance").search({
			messages: [{ role: "user", content: userQuery }],
		});

		if (searchResult.chunks.length === 0) {
			return Response.json({ text: `No data found for query "${userQuery}"` });
		}

		// Join the retrieved chunks into a single string.
		const chunks = searchResult.chunks
			.map((chunk) => `<file name="${chunk.item.key}">${chunk.text}</file>`)
			.join("\n\n");

		// Send the query and retrieved content to OpenAI for the answer.
		const openai = createOpenAI({ apiKey: env.OPENAI_API_KEY });
		const generateResult = await generateText({
			model: openai("gpt-4o-mini"),
			messages: [
				{
					role: "system",
					content:
						"You are a helpful assistant. Answer the user question using the provided files.",
				},
				{ role: "user", content: chunks },
				{ role: "user", content: userQuery },
			],
		});

		return Response.json({ text: generateResult.text });
	},
} satisfies ExportedHandler<Env>;
```

## Notes

- Adapted from the official docs: added the `API_TOKEN` bearer check (set with `npx wrangler secret put API_TOKEN`); the official Worker is unauthenticated.
- Local development: put `OPENAI_API_KEY` in `.dev.vars` (gitignored), not in source.
- Retrieved chunk text is untrusted content inserted into the prompt; treat it as data, not instructions, and do not expose this route publicly without authentication since each call spends model tokens.
- Alternative without code changes: connect OpenAI keys through AI Gateway and choose the model in AI Search (see models.md).
- Secrets and `.dev.vars`: cloudflare-workers skill. AI SDK: vercel-ai-sdk skill.

## Related

- [search()](./search.md)
- [Models](./models.md)
- [Agent integrations](./agent-sdks.md)
