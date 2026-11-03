---
source: https://developers.cloudflare.com/workers/databases/third-party-integrations/neon/
---

# Neon

Connect Workers to Neon serverless PostgreSQL through Hyperdrive (recommended) or the `@neondatabase/serverless` driver.

## Signature / Usage

Create the Hyperdrive configuration:

```sh
npx wrangler hyperdrive create <NAME_OF_HYPERDRIVE_CONFIG> --connection-string="postgres://user:password@HOSTNAME_OR_IP_ADDRESS:PORT/database_name"
```

Wrangler configuration:

```jsonc
{
	"compatibility_flags": ["nodejs_compat"],
	// Set this to today's date
	"compatibility_date": "2026-11-03",
	"hyperdrive": [
		{
			"binding": "HYPERDRIVE",
			"id": "<your-hyperdrive-id-here>"
		}
	]
}
```

Worker using node-postgres (`npm i pg@>8.16.3`, `npm i -D @types/pg`):

```ts
import { Client } from "pg";

export default {
	async fetch(
		request: Request,
		env: Env,
		ctx: ExecutionContext,
	): Promise<Response> {
		// Create a new client instance for each request. Hyperdrive maintains the
		// underlying database connection pool, so creating a new client is fast.
		const client = new Client({
			connectionString: env.HYPERDRIVE.connectionString,
		});

		try {
			await client.connect();
			const result = await client.query("SELECT * FROM pg_tables");

			return Response.json({
				success: true,
				result: result.rows,
			});
		} catch (error: any) {
			console.error("Database error:", error.message);

			return new Response("Internal error occurred", { status: 500 });
		}
	},
};
```

Serverless driver alternative (`npm i @neondatabase/serverless`, secret `DATABASE_URL`):

```js
import { Client } from "@neondatabase/serverless";

export default {
	async fetch(request, env, ctx) {
		const client = new Client(env.DATABASE_URL);
		await client.connect();
		const { rows } = await client.query("SELECT * FROM elements");

		return new Response(JSON.stringify(rows));
	},
};
```

## Notes

- Create a dedicated role (for example `hyperdrive-user`) in the Neon dashboard, copy its password (shown once), and use the `psql` connection string with connection pooling unchecked.
- Hyperdrive minimum `pg` version is 8.16.3 (the docs' install command `pg@>8.16.3` technically excludes 8.16.3 itself).
- With Hyperdrive, use node-postgres or Postgres.js rather than the Neon serverless driver so Hyperdrive can pool and route.
- Hyperdrive validates credentials when creating a configuration; see Hyperdrive troubleshooting if it fails. Hyperdrive details: See the cloudflare-storage skill.

## Related

- [connecting-to-databases.md](./connecting-to-databases.md)
- [third-party-integrations.md](./third-party-integrations.md)
