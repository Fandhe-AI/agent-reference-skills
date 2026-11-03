---
source: https://developers.cloudflare.com/workers/databases/third-party-integrations/planetscale/
---

# PlanetScale

Connect Workers to PlanetScale MySQL-compatible databases through Hyperdrive (recommended, `mysql2`) or the `@planetscale/database` serverless driver.

## Signature / Usage

```sh
npx wrangler hyperdrive create <NAME_OF_HYPERDRIVE_CONFIG> --connection-string="mysql://user:password@HOSTNAME_OR_IP_ADDRESS:PORT/database_name"
```

Worker using `mysql2` (`npm i "mysql2@>=3.13.0"`; the range is quoted so the shell does not treat `>` as a redirect):

Adapted (not in the official docs): the connection is closed in a `finally` block via `ctx.waitUntil`; see Notes.

```ts
// mysql2 v3.13.0 or later is required
import { createConnection } from "mysql2/promise";

export default {
	async fetch(request, env, ctx): Promise<Response> {
		// Create a new connection on each request. Hyperdrive maintains the underlying
		// database connection pool, so creating a new connection is fast.
		const connection = await createConnection({
			host: env.HYPERDRIVE.host,
			user: env.HYPERDRIVE.user,
			password: env.HYPERDRIVE.password,
			database: env.HYPERDRIVE.database,
			port: env.HYPERDRIVE.port,

			// Required to enable mysql2 compatibility for Workers
			disableEval: true,
		});

		try {
			const [results, fields] = await connection.query("SHOW tables;");
			return Response.json({ results, fields });
		} catch (e) {
			console.error(e);
			return Response.json(
				{ error: e instanceof Error ? e.message : e },
				{ status: 500 },
			);
		} finally {
			// Close the connection without delaying the response.
			ctx.waitUntil(connection.end());
		}
	},
} satisfies ExportedHandler<Env>;
```

Serverless driver (`npm i @planetscale/database`, secrets `DATABASE_HOST` / `DATABASE_USERNAME` / `DATABASE_PASSWORD`):

```js
import { connect } from "@planetscale/database";

export default {
	async fetch(request, env) {
		const config = {
			host: env.DATABASE_HOST,
			username: env.DATABASE_USERNAME,
			password: env.DATABASE_PASSWORD,
			// see https://github.com/cloudflare/workerd/issues/698
			fetch: (url, init) => {
				delete init["cache"];
				return fetch(url, init);
			},
		};

		const conn = connect(config);
		const data = await conn.execute("SELECT * FROM products;");
		return new Response(JSON.stringify(data.rows), {
			status: 200,
			headers: {
				"Content-Type": "application/json",
			},
		});
	},
};
```

## Notes

- Adapted from the official docs: the official `mysql2` example never closes the connection; it now calls `ctx.waitUntil(connection.end())` in a `finally` block.
- Hyperdrive config needs `compatibility_flags: ["nodejs_compat"]` and a `hyperdrive` binding; `mysql2` 3.13.0 or later is required and `disableEval: true` is required.
- Reduce latency with an explicit placement hint close to the database, for example `"placement": { "region": "gcp:us-east4" }` (or `aws:us-east-1`) in the Wrangler file.
- Create a PlanetScale password (for example `hyperdrive-user`) in the dashboard, choose "Other", and note host, database, username, and password (shown once).
- Docs inconsistency: a closing note recommends node-postgres or Postgres.js instead of the PlanetScale serverless driver, which is copied from the PostgreSQL pages; for the MySQL flow above, `mysql2` is used. PlanetScale PostgreSQL is covered in the Hyperdrive docs. Hyperdrive details: See the cloudflare-storage skill.

## Related

- [connecting-to-databases.md](./connecting-to-databases.md)
- [third-party-integrations.md](./third-party-integrations.md)
