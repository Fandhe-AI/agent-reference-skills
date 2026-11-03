---
source: https://developers.cloudflare.com/workers/databases/third-party-integrations/turso/
---

# Turso

Connect Workers to Turso, an edge-hosted distributed database based on libSQL (an open-source SQLite fork), using `@libsql/client/web`.

## Signature / Usage

```sh
turso db show my-db --url
turso db tokens create my-db
npx wrangler secret put TURSO_URL
npx wrangler secret put TURSO_AUTH_TOKEN
npm i @libsql/client
```

```ts
import { Client as LibsqlClient, createClient } from "@libsql/client/web";

export interface Env {
	TURSO_URL?: string;
	TURSO_AUTH_TOKEN?: string;
}

export default {
	async fetch(request, env, ctx): Promise<Response> {
		const client = buildLibsqlClient(env);

		try {
			const res = await client.execute("SELECT * FROM elements");
			return new Response(JSON.stringify(res), {
				status: 200,
				headers: { "Content-Type": "application/json" },
			});
		} catch (error) {
			console.error("Error executing SQL query:", error);
			return new Response(
				JSON.stringify({ error: "Internal Server Error" }),
				{
					status: 500,
				},
			);
		}
	},
} satisfies ExportedHandler<Env>;

function buildLibsqlClient(env: Env): LibsqlClient {
	const url = env.TURSO_URL?.trim();
	if (url === undefined) {
		throw new Error("TURSO_URL env var is not defined");
	}

	const authToken = env.TURSO_AUTH_TOKEN?.trim();
	if (authToken == undefined) {
		throw new Error("TURSO_AUTH_TOKEN env var is not defined");
	}

	return createClient({ url, authToken });
}
```

## Notes

- Import `@libsql/client/web` exactly as shown; the non-web import does not work in Workers.
- Setup uses the Turso CLI: `brew install tursodatabase/tap/turso` (or the scripted installer), `turso auth login` (GitHub), `turso db create <name>`, `turso db shell <name>`.
- The docs say the `Env` interface "caches the libSQL client object and router", but the example code does not cache anything; the client is built per request.

## Related

- [connecting-to-databases.md](./connecting-to-databases.md)
- [third-party-integrations.md](./third-party-integrations.md)
