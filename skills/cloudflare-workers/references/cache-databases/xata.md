---
source: https://developers.cloudflare.com/workers/databases/third-party-integrations/xata/
---

# Xata

Connect Workers to a Xata PostgreSQL database through Hyperdrive.

## Signature / Usage

```sh
npx wrangler hyperdrive create <NAME_OF_HYPERDRIVE_CONFIG> --connection-string="postgres://user:password@HOSTNAME_OR_IP_ADDRESS:PORT/database_name"
```

Adapted (not in the official docs): the client is closed in a `finally` block via `ctx.waitUntil`; see Notes.

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
		} finally {
			// Close the client without delaying the response.
			ctx.waitUntil(client.end());
		}
	},
};
```

## Notes

- Adapted from the official docs: the official example never closes the client; it now calls `ctx.waitUntil(client.end())` in a `finally` block.
- Copy the `PostgreSQL` connection string from the Xata dashboard and use it for the Hyperdrive configuration (dashboard Hyperdrive page or the Wrangler command above).
- Install `pg@>8.16.3` (minimum 8.16.3) and `@types/pg`; the Wrangler file needs `compatibility_flags: ["nodejs_compat"]` and a `hyperdrive` binding named `HYPERDRIVE`.
- Hyperdrive details: See the cloudflare-storage skill.

## Related

- [connecting-to-databases.md](./connecting-to-databases.md)
- [third-party-integrations.md](./third-party-integrations.md)
