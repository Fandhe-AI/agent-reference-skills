---
source: https://developers.cloudflare.com/workers-ai/guides/tutorials/build-a-retrieval-augmented-generation-ai/
---

# Tutorial: Retrieval Augmented Generation (RAG)

Build a notes tool with Workers AI (embeddings and text generation), Vectorize, D1, a Workflow, and Hono.

## Signature / Usage

Wrangler bindings (the AI binding is marked remote as in the tutorial):

```jsonc
{
	"ai": {
		"binding": "AI",
		"remote": true
	}
}
```

```toml
[ai]
binding = "AI"
remote = true
```

Create the index and database, then add the `vectorize`, `d1_databases` and `workflows` bindings from the source:

```sh
npx wrangler vectorize create vector-index --dimensions=768 --metric=cosine
npx wrangler d1 create database
npx wrangler d1 execute database --remote --command "CREATE TABLE IF NOT EXISTS notes (id INTEGER PRIMARY KEY, text TEXT NOT NULL)"
```

Workflow that stores a note and its embedding:

```js
import { WorkflowEntrypoint } from "cloudflare:workers";

export class RAGWorkflow extends WorkflowEntrypoint {
	async run(event, step) {
		const env = this.env;
		const { text } = event.payload;

		const record = await step.do(`create database record`, async () => {
			const query = "INSERT INTO notes (text) VALUES (?) RETURNING *";

			const { results } = await env.DB.prepare(query).bind(text).run();

			const record = results[0];
			if (!record) throw new Error("Failed to create note");
			return record;
		});

		const embedding = await step.do(`generate embedding`, async () => {
			const embeddings = await env.AI.run("@cf/baai/bge-base-en-v1.5", {
				text: text,
			});
			const values = embeddings.data[0];
			if (!values) throw new Error("Failed to generate vector embedding");
			return values;
		});

		await step.do(`insert vector`, async () => {
			return env.VECTOR_INDEX.upsert([
				{
					id: record.id.toString(),
					values: embedding,
				},
			]);
		});
	}
}
```

Routes (Hono). Adapted (not in the official docs): a fail-closed bearer-token middleware protects every route (the official tutorial has none); see Notes.

```js
import { Hono } from "hono";
const app = new Hono();

// Fail closed: reject every request unless API_TOKEN is configured and matches.
// Set it with `npx wrangler secret put API_TOKEN` (local dev: .dev.vars, gitignored).
app.use("*", async (c, next) => {
	const expected = c.env.API_TOKEN;
	const header = c.req.header("Authorization") ?? "";
	const enc = new TextEncoder();
	const a = enc.encode(header);
	const b = enc.encode(`Bearer ${expected}`);
	if (!expected || a.byteLength !== b.byteLength || !crypto.subtle.timingSafeEqual(a, b)) {
		return c.text("Unauthorized", 401);
	}
	await next();
});

app.post("/notes", async (c) => {
	const { text } = await c.req.json();
	if (!text) return c.text("Missing text", 400);
	await c.env.RAG_WORKFLOW.create({ params: { text } });
	return c.text("Created note", 201);
});

app.get("/", async (c) => {
	const question = c.req.query("text") || "What is the square root of 9?";

	const embeddings = await c.env.AI.run("@cf/baai/bge-base-en-v1.5", {
		text: question,
	});
	const vectors = embeddings.data[0];

	const vectorQuery = await c.env.VECTOR_INDEX.query(vectors, { topK: 1 });
	let vecId;
	if (
		vectorQuery.matches &&
		vectorQuery.matches.length > 0 &&
		vectorQuery.matches[0]
	) {
		vecId = vectorQuery.matches[0].id;
	} else {
		console.log("No matching vector found or vectorQuery.matches is empty");
	}

	let notes = [];
	if (vecId) {
		const query = `SELECT * FROM notes WHERE id = ?`;
		const { results } = await c.env.DB.prepare(query).bind(vecId).run();
		if (results) notes = results.map((vec) => vec.text);
	}

	const contextMessage = notes.length
		? `Context:\n${notes.map((note) => `- ${note}`).join("\n")}`
		: "";

	const systemPrompt = `When answering the question or responding, use the context provided, if it is provided and relevant.`;

	const { response: answer } = await c.env.AI.run(
		"@cf/meta/llama-3-8b-instruct",
		{
			messages: [
				...(notes.length ? [{ role: "system", content: contextMessage }] : []),
				{ role: "system", content: systemPrompt },
				{ role: "user", content: question },
			],
		},
	);

	return c.text(answer);
});

export default app;
```

Delete a note and its vector (register it before `export default app`; it is covered by the bearer-token middleware above). Adapted (not in the official docs): `c.status(204)` only sets the status and does not return a Response; `c.body(null, 204)` does, and the id is validated as numeric.

```js
app.delete("/notes/:id", async (c) => {
	const { id } = c.req.param();
	if (!/^\d+$/.test(id)) return c.text("Invalid id", 400);

	const query = `DELETE FROM notes WHERE id = ?`;
	await c.env.DB.prepare(query).bind(id).run();

	await c.env.VECTOR_INDEX.deleteByIds([id]);

	return c.body(null, 204);
});
```

## Options / Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| VECTOR_INDEX | Vectorize binding | — | Index `vector-index` (768 dimensions, cosine). |
| DB | D1 binding | — | Database `database`, table `notes`. |
| RAG_WORKFLOW | Workflow binding | — | Name `rag`, class `RAGWorkflow`. |
| topK | number | — | Number of vectors returned by `query`; `1` returns the most similar vector only. |

## Notes

- Corrected from the official docs: `return c.status(204)` in the delete route does not return a Response (changed to `c.body(null, 204)`); the `app.onError(... c.text(err))` handler was omitted because `err` is an Error object, not a string.
- Adapted from the official docs: the tutorial exposes `POST /notes`, `GET /` and `DELETE /notes/:id` publicly, so anyone could create or delete shared notes and spend Workers AI usage. The middleware authenticates all routes with a single shared secret `API_TOKEN` (rejects when unset). It does not provide per-user ownership: for multi-user data add an owner column to `notes`, filter every query by the authenticated user, and verify ownership before deleting.
- This page keeps the Workers AI steps; the C3 project creation, `wrangler dev`/`deploy`, Hono install, and the optional text-splitting step (`@langchain/textsplitters` `RecursiveCharacterTextSplitter`, then one workflow step per chunk) are in the source.
- Optional step 8 calls Anthropic through `@anthropic-ai/sdk` with model `claude-3-5-sonnet-latest` (transcribed as written; model IDs are not normalized) when `ANTHROPIC_API_KEY` is set (`npx wrangler secret put ANTHROPIC_API_KEY`), otherwise falls back to `@cf/meta/llama-3.1-8b-instruct`. The Anthropic SDK API belongs to anthropic-api-core.
- D1 and the `wrangler d1` commands are covered by cloudflare-storage (`wrangler d1 execute` is local by default; `--remote` is used here). Vectorize is a sibling category of this skill. Workflows (cloudflare-stateful skill) and AI Search, the managed RAG option (how-ai-search-works.md (https://developers.cloudflare.com/ai-search/)), are separate products. Hono API: hono.
- Source calls `AI` bindings remote; with Wrangler, AI models always run remotely in `wrangler dev` (see cloudflare-wrangler).
- Finished code: https://github.com/kristianfreeman/cloudflare-retrieval-augmented-generation-example/

## Related

- [Binding and env.AI.run()](./bindings-and-run.md)
- [Tutorials index](./tutorials-index.md)
