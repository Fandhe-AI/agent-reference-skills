---
source: https://developers.cloudflare.com/ai-search/how-to/bring-your-own-generation-model/
---

# Retrieve with AI Search, generate with OpenAI

Use `search()` for retrieval and pass the chunks to an external model through the AI SDK.

## Signature / Usage

Create a Worker project with `npm create cloudflare@latest -- byo-model` (Hello World example, Worker only, TypeScript); C3 generates a Wrangler configuration file whose `main` is `src/index.ts`. In the project directory, install the AI SDK:

```sh
npm i ai @ai-sdk/openai
```

Add the binding to the Wrangler configuration file:

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

Store the OpenAI key as a secret:

```sh
npx wrangler secret put OPENAI_API_KEY
```

Also store the `API_TOKEN` secret that the adapted Worker checks (`npx wrangler secret put API_TOKEN`). For local development put both values in `.dev.vars` and keep that file out of git:

Adapted (not in the official docs): adds the `API_TOKEN` line for the bearer-token gate. See Notes.

```txt
OPENAI_API_KEY="<YOUR_OPENAI_API_KEY>"
API_TOKEN="<RANDOM_TOKEN>"
```

`src/index.ts`:

Adapted (not in the official docs): adds a fail-closed bearer-token gate (`API_TOKEN` secret) so anonymous callers cannot spend the OpenAI key. See Notes.

```ts
import { createOpenAI } from "@ai-sdk/openai";
import { generateText } from "ai";

export interface Env {
	AI_SEARCH: AiSearchNamespace;
	OPENAI_API_KEY: string;
	API_TOKEN?: string;
}

function isAuthorized(request: Request, token: string | undefined): boolean {
	if (!token) return false; // fail closed when the secret is unset
	const enc = new TextEncoder();
	const given = enc.encode(request.headers.get("authorization") ?? "");
	const expected = enc.encode(`Bearer ${token}`);
	return (
		given.byteLength === expected.byteLength &&
		crypto.subtle.timingSafeEqual(given, expected)
	);
}

export default {
	async fetch(request, env): Promise<Response> {
		if (!isAuthorized(request, env.API_TOKEN)) {
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

- Adapted from the official docs: added the bearer-token gate (`API_TOKEN` secret and `.dev.vars` entry).
- The source recommends configuring external models natively through AI Gateway and the AI Search model settings; this manual pattern still works.
- Retrieved chunk text is placed in a user message; treat indexed content as untrusted input to the model (prompt injection).
- AI SDK specifics (`generateText`, providers) belong to the vercel-ai-sdk skill.

## Related

- [Search](../references/ai-search/search.md)
- [Bindings configuration](../references/ai-search/bindings-configuration.md)
- [Bring your own keys (AI Gateway)](../references/ai-gateway/configuration-bring-your-own-keys.md)
