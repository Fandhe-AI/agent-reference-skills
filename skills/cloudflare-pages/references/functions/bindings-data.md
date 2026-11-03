---
source: https://developers.cloudflare.com/pages/functions/bindings/
---

# Data bindings: KV, Durable Objects, R2, D1, Vectorize, Hyperdrive

Using storage and database bindings from a Pages Function via `context.env`.

## Signature / Usage

KV namespace bound as `TODO_LIST`:

```js
export async function onRequest(context) {
	const task = await context.env.TODO_LIST.get("Task:123");
	return new Response(task);
}
```

```ts
interface Env {
	TODO_LIST: KVNamespace;
}

export const onRequest: PagesFunction<Env> = async (context) => {
	const task = await context.env.TODO_LIST.get("Task:123");
	return new Response(task);
};
```

Durable Object bound as `DURABLE_OBJECT`:

```js
export async function onRequestGet(context) {
	const id = context.env.DURABLE_OBJECT.newUniqueId();
	const stub = context.env.DURABLE_OBJECT.get(id);

	// Pass the request down to the durable object
	return stub.fetch(context.request);
}
```

```ts
interface Env {
	DURABLE_OBJECT: DurableObjectNamespace;
}

export const onRequestGet: PagesFunction<Env> = async (context) => {
	const id = context.env.DURABLE_OBJECT.newUniqueId();
	const stub = context.env.DURABLE_OBJECT.get(id);

	// Pass the request down to the durable object
	return stub.fetch(context.request);
};
```

R2 bucket bound as `BUCKET`:

```js
export async function onRequest(context) {
	const obj = await context.env.BUCKET.get("some-key");
	if (obj === null) {
		return new Response("Not found", { status: 404 });
	}
	return new Response(obj.body);
}
```

```ts
interface Env {
	BUCKET: R2Bucket;
}

export const onRequest: PagesFunction<Env> = async (context) => {
	const obj = await context.env.BUCKET.get("some-key");
	if (obj === null) {
		return new Response("Not found", { status: 404 });
	}
	return new Response(obj.body);
};
```

D1 database bound as `NORTHWIND_DB`:

```js
export async function onRequest(context) {
	// Create a prepared statement with our query
	const ps = context.env.NORTHWIND_DB.prepare("SELECT * from users");
	const data = await ps.first();

	return Response.json(data);
}
```

```ts
interface Env {
	NORTHWIND_DB: D1Database;
}

export const onRequest: PagesFunction<Env> = async (context) => {
	// Create a prepared statement with our query
	const ps = context.env.NORTHWIND_DB.prepare("SELECT * from users");
	const data = await ps.first();

	return Response.json(data);
};
```

Vectorize index bound as `VECTORIZE_INDEX`. Adapted (not in the official docs): the handler returns a 404 for every other path, because the official one returns `undefined` (not a valid Response); see Notes.

```js
// Sample vectors: 3 dimensions wide.
//
// Vectors from a machine-learning model are typically ~100 to 1536 dimensions
// wide (or wider still).
const sampleVectors = [
	{
		id: "1",
		values: [32.4, 74.1, 3.2],
		metadata: { url: "/products/sku/13913913" },
	},
	{
		id: "2",
		values: [15.1, 19.2, 15.8],
		metadata: { url: "/products/sku/10148191" },
	},
	{
		id: "3",
		values: [0.16, 1.2, 3.8],
		metadata: { url: "/products/sku/97913813" },
	},
	{
		id: "4",
		values: [75.1, 67.1, 29.9],
		metadata: { url: "/products/sku/418313" },
	},
	{
		id: "5",
		values: [58.8, 6.7, 3.4],
		metadata: { url: "/products/sku/55519183" },
	},
];

export async function onRequest(context) {
	let path = new URL(context.request.url).pathname;
	if (path.startsWith("/favicon")) {
		return new Response("", { status: 404 });
	}

	// You only need to insert vectors into your index once
	if (path.startsWith("/insert")) {
		// Insert some sample vectors into your index
		// In a real application, these vectors would be the output of a machine learning (ML) model,
		// such as Workers AI, OpenAI, or Cohere.
		let inserted = await context.env.VECTORIZE_INDEX.insert(sampleVectors);

		// Return the number of IDs we successfully inserted
		return Response.json(inserted);
	}

	return new Response("Not found", { status: 404 });
}
```

```ts
export interface Env {
	// This makes our vector index methods available on context.env.VECTORIZE_INDEX.*
	// For example, context.env.VECTORIZE_INDEX.insert() or query()
	VECTORIZE_INDEX: VectorizeIndex;
}
```

Hyperdrive config bound as `HYPERDRIVE` (requires `nodejs_compat`). Adapted (not in the official docs): fixes the malformed `Response.json` call in the catch block (the official code is a syntax error) and returns a generic error message instead of `e.message`; see Notes.

```jsonc
{
	"compatibility_flags": [
		"nodejs_compat"
	],
	// Set this to today's date
	"compatibility_date": "2026-11-03"
}
```

```toml
compatibility_flags = [ "nodejs_compat" ]
# Set this to today's date
compatibility_date = "2026-11-03"
```

```ts
import postgres from "postgres";

interface Env {
	HYPERDRIVE: Hyperdrive;
}

type MyRecord = {
	id: number;
	name: string;
	value: string;
};

export const onRequest: PagesFunction<Env> = async (context) => {
	// create connection to postgres database
	const sql = postgres(context.env.HYPERDRIVE.connectionString);

	try {
		const result = await sql<MyRecord[]>`SELECT id, name, value FROM records`;

		return Response.json({ result: result });
	} catch (e) {
		console.error(e);
		return Response.json({ error: "Query failed" }, { status: 500 });
	}
};
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| KV dashboard path | — | — | **Settings** > **Bindings** > **Add** > **KV namespace**; select namespace. |
| Durable Object dashboard path | — | — | **Add** > **Durable Object**; select the Durable Object namespace. |
| R2 dashboard path | — | — | **Add** > **R2 bucket**. |
| D1 dashboard path | — | — | **Add** > **D1 database bindings**. |
| Vectorize dashboard path | — | — | Choose Production or Preview, then **Bindings** > **Add** > **Vectorize index**. |
| Hyperdrive dashboard path | — | — | **Add** > **Hyperdrive**; select configuration. |
| Hyperdrive local connection | env var | — | `CLOUDFLARE_HYPERDRIVE_LOCAL_CONNECTION_STRING_<BINDING_NAME>`, or `localConnectionString` in the Wrangler file, then `npx wrangler pages dev <OUTPUT_DIR>`. |

## Notes

- Cloudflare recommends Workers (with static assets) for new projects — see the cloudflare-workers skill (static-assets, including migrate-from-pages). Binding API details live in the cloudflare-storage skill (KV, D1, R2, Hyperdrive).
- Durable Objects: you must create a Durable Object Worker and bind it to the Pages project; you cannot create and deploy a Durable Object within a Pages project. Local: run `wrangler dev` in the Worker that exports the class, then `npx wrangler pages dev <OUTPUT_DIR> --do MY_DO=DurableObjectExample@do-worker` in the Pages directory.
- D1 local: `npx wrangler pages dev <OUTPUT_DIR> --d1 NORTHWIND_DB=xxxx-xxxx-xxxx-xxxx-xxxx`, where the id is your `database_id`.
- R2 local: `npx wrangler pages dev <OUTPUT_DIR> --r2=BUCKET`.
- Corrected from the official docs: the Vectorize example returned `undefined` for paths other than `/insert` and `/favicon`; a final 404 Response was added. The `/insert` route writes to the index with no authentication, so protect or remove it outside demos.
- Corrected from the official docs: the Hyperdrive example's catch block `Response.json({error: e.message, {status: 500}})` is a syntax error (the init object sat inside the body literal). It now passes `{ status: 500 }` as the second argument and does not echo `e.message` to clients. The JS variant on the official page has the same defect; the corrected TS above applies equally with the type annotations removed.
- Hyperdrive: PostgreSQL drivers such as `Postgres.js` depend on Node.js APIs, so Pages Functions with Hyperdrive bindings must be deployed with Node.js compatibility (`nodejs_compat`).
- Vectorize sample vectors in the official docs are 3 dimensions wide; real model vectors are typically ~100 to 1536 dimensions.

## Related

- [bindings.md](./bindings.md)
- [bindings-services.md](./bindings-services.md)
- [wrangler-configuration-keys.md](./wrangler-configuration-keys.md)
