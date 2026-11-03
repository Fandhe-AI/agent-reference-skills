---
source: https://developers.cloudflare.com/workers/databases/third-party-integrations/mongodb/
---

# MongoDB

Connect Workers to MongoDB with the native Node.js driver or Mongoose, optionally persisting the client in a Durable Object.

## Signature / Usage

```sh
npm i mongodb
npx wrangler secret put MONGODB_URI
```

Direct connection:

Adapted (not in the official docs): the client is closed in a `finally` block via `ctx.waitUntil` so the connection is not leaked; see Notes.

```ts
import { MongoClient } from "mongodb";

export interface Env {
	MONGODB_URI: string;
}

export default {
	async fetch(request, env, ctx): Promise<Response> {
		const client = new MongoClient(env.MONGODB_URI);
		try {
			await client.connect();

			const movie = await client
				.db("sample_mflix")
				.collection("movies")
				.findOne(
					{ title: "The Room" },
					{ projection: { _id: 0, title: 1, imdb: 1 } },
				);

			return Response.json({ movie });
		} finally {
			// Close the connection without delaying the response.
			ctx.waitUntil(client.close());
		}
	},
} satisfies ExportedHandler<Env>;
```

Durable Object holding the client:

Adapted (not in the official docs): `DurableObjectState` removed from the `cloudflare:workers` import because it is a global type; see Notes.

```ts
import { DurableObject } from "cloudflare:workers";
import { MongoClient } from "mongodb";

interface Env {
	MONGODB_URI: string;
}

export class MongoDBConnection extends DurableObject {
	private client: MongoClient;

	constructor(state: DurableObjectState, env: Env) {
		super(state, env);
		this.client = new MongoClient(env.MONGODB_URI, {
			maxPoolSize: 1,
			minPoolSize: 0,
			serverSelectionTimeoutMS: 5000,
			maxIdleTimeMS: 20_000,
		});
	}

	async getMovie() {
		const start = Date.now();
		await this.client.connect();
		const movie = await this.client
			.db("sample_mflix")
			.collection("movies")
			.findOne(
				{ title: "The Room" },
				{ projection: { _id: 0, title: 1, imdb: 1 } },
			);
		return { movie, queryTime: Date.now() - start };
	}
}
```

Route to it from the Worker:

```ts
const id = env.MONGODB_CONNECTION.idFromName("mongodb-connection");
const stub = env.MONGODB_CONNECTION.get(id, { locationHint: "enam" });
const result = await stub.getMovie();
return Response.json(result);
```

Wrangler configuration:

```jsonc
{
  "compatibility_flags": ["nodejs_compat"],
  "durable_objects": {
    "bindings": [
      { "name": "MONGODB_CONNECTION", "class_name": "MongoDBConnection" }
    ]
  },
  "migrations": [
    { "tag": "v1", "new_classes": ["MongoDBConnection"] }
  ]
}
```

## Notes

- Adapted from the official docs: the official direct-connection example never closes the `MongoClient`; since a plain Worker cannot reuse the connection across requests, it is closed with `ctx.waitUntil(client.close())` in a `finally` block.
- Corrected from the official docs: the official Durable Object example imports `DurableObjectState` from `cloudflare:workers`, but it is a global type (not a runtime export of that module), so only `DurableObject` is imported and the constructor references the global `DurableObjectState` type.
- Hyperdrive does not support MongoDB (PostgreSQL and MySQL only). A plain Worker opens a new TCP and TLS connection per invocation (about 300 ms overhead); Workers cannot reuse I/O objects across requests, so pooling does not work. A Durable Object persists the client (about 35 ms warm).
- Node.js compatibility: for compatibility dates `2026-08-04` or later `nodejs_compat` and `nodejs_compat_v2` are on by default; before that, add `nodejs_compat`. The driver uses `node:net` and `node:tls`, available with `nodejs_compat` and a compatibility date of `2025-03-20` or later. To turn it off for `2026-08-04`+, add both `no_nodejs_compat` and `no_nodejs_compat_v2`.
- Create the `MongoClient` in the constructor and call `connect()` in the method so a warm Durable Object reuses the connection. Use `locationHint` (`wnam`, `enam`, `sam`, `weur`, `eeur`, `apac`, `oc`, `afr`, `me`) near the cluster.
- Durable Object lifecycle: evicts after roughly 70-140 seconds idle; TCP connections do not survive hibernation; do not return `MongoClient` / `Db` / `Collection` over RPC; soft limit about 1,000 requests per second per instance.
- Mongoose 9+ works with Node.js compatibility enabled (earlier versions needed a `package.json` exports patch); connect with `mongoose.connect(this.env.MONGODB_URI, { dbName: "sample_mflix" })` when `mongoose.connection.readyState === 0`.
- The docs' direct-connection section ends with "Use this approach for latency-sensitive applications", which actually refers to the Durable Object approach that follows.

## Related

- [connecting-to-databases.md](./connecting-to-databases.md)
- [third-party-integrations.md](./third-party-integrations.md)
