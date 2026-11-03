---
source: https://developers.cloudflare.com/workers/databases/third-party-integrations/supabase/
---

# Supabase

Connect Workers to Supabase PostgreSQL with the Supabase client (`@supabase/supabase-js`) or directly through Hyperdrive.

## Signature / Usage

Supabase client (`npm i @supabase/supabase-js`; secrets `SUPABASE_URL`, `SUPABASE_KEY`):

```js
import { createClient } from "@supabase/supabase-js";

export default {
	async fetch(request, env) {
		const supabase = createClient(env.SUPABASE_URL, env.SUPABASE_KEY);
		const { data, error } = await supabase.from("countries").select("*");
		if (error) throw error;
		return new Response(JSON.stringify(data), {
			headers: {
				"Content-Type": "application/json",
			},
		});
	},
};
```

Hyperdrive with node-postgres (`npm i "pg@>=8.16.3"`; the range is quoted so the shell does not treat `>` as a redirect):

Adapted (not in the official docs): the client is closed in a `finally` block via `ctx.waitUntil`; see Notes.

```ts
import { Client } from "pg";

export default {
	async fetch(
		request: Request,
		env: Env,
		ctx: ExecutionContext,
	): Promise<Response> {
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

Create the configuration:

```sh
npx wrangler hyperdrive create <NAME_OF_HYPERDRIVE_CONFIG> --connection-string="postgres://user:password@HOSTNAME_OR_IP_ADDRESS:PORT/database_name"
```

## Notes

- Adapted from the official docs: the official node-postgres example never closes the client; it now calls `ctx.waitUntil(client.end())` in a `finally` block.
- Use the Supabase client when you need all Supabase features; use Hyperdrive for direct Postgres access with the lowest latency (global connection setup and pooling, included in all Workers plans).
- Hyperdrive needs `compatibility_flags: ["nodejs_compat"]` and a `hyperdrive` binding (`binding: "HYPERDRIVE"`). Minimum `pg` is 8.16.3. Use node-postgres or Postgres.js, not the Supabase client, with Hyperdrive.
- Get the Supabase URL and anon key under Settings > API; the database endpoint is on the database settings page. Hyperdrive connects as the project's Postgres user or a new user.
- This page covers connecting from a Worker. For Supabase itself (Auth, RLS, Edge Functions), see the supabase skill.

## Related

- [connecting-to-databases.md](./connecting-to-databases.md)
- [third-party-integrations.md](./third-party-integrations.md)
