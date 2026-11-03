---
source: https://developers.cloudflare.com/hyperdrive/
---

# Hyperdrive (Postgres & MySQL)

Hyperdrive accelerates queries to existing regional Postgres and MySQL databases from Cloudflare Workers through global connection pooling and query caching. Available on Free and Paid plans.

## Signature / Usage

```ts
import { Client } from "pg";

export default {
	async fetch(request, env, ctx): Promise<Response> {
		// Create a new client instance for each request. Hyperdrive maintains the
		// underlying database connection pool, so creating a new client is fast.
		const client = new Client({
			connectionString: env.HYPERDRIVE.connectionString,
		});

		try {
			// Connect to the database
			await client.connect();
			// Sample SQL query
			const result = await client.query("SELECT * FROM pg_tables");

			return Response.json(result.rows);
		} catch (e) {
			return Response.json({ error: e instanceof Error ? e.message : e }, { status: 500 });
		}
	},
} satisfies ExportedHandler<{ HYPERDRIVE: Hyperdrive }>;
```

```jsonc
{
	"$schema": "node_modules/wrangler/config-schema.json",
	"name": "WORKER-NAME",
	"main": "src/index.ts",
	"upload_source_maps": true,
	"compatibility_date": "2025-02-04",
	"compatibility_flags": [
		"nodejs_compat"
	],
	"observability": {
		"enabled": true
	},
	"hyperdrive": [
		{
			"binding": "HYPERDRIVE",
			"id": "<YOUR_HYPERDRIVE_ID>",
			"localConnectionString": "<ENTER_LOCAL_CONNECTION_STRING_FOR_LOCAL_DEVELOPMENT_HERE>"
		}
	]
}
```

MySQL (mysql2) variant:

```ts
import { createConnection } from 'mysql2/promise';

export default {
  async fetch(request, env, ctx): Promise<Response> {
    // Create a new connection on each request. Hyperdrive maintains the
    // underlying database connection pool, so creating a new client is fast.
    const connection = await createConnection({
		 host: env.HYPERDRIVE.host,
		 user: env.HYPERDRIVE.user,
		 password: env.HYPERDRIVE.password,
		 database: env.HYPERDRIVE.database,
		 port: env.HYPERDRIVE.port,

     // This is needed to use mysql2 with Workers
     // This configures mysql2 to use static parsing instead of eval() parsing (not available on Workers)
     disableEval: true
  });

  const [results, fields] = await connection.query('SHOW tables;');

  return new Response(JSON.stringify({ results, fields }), {
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '\*',
    },
  });
}} satisfies ExportedHandler<{ HYPERDRIVE: Hyperdrive }>;
```

## Notes

- Hyperdrive supports any Postgres or MySQL database, including those hosted on AWS, Google Cloud, Azure, Supabase, Neon, and PlanetScale, plus Postgres-compatible databases like CockroachDB and Timescale.
- Features: connect your database ([get-started](./get-started.md)), PostgreSQL support, MySQL support, and default-on query caching ([query-caching](./query-caching.md)).
- Related products: Workers, Pages.
- Bindings concepts and Wrangler configuration in general: see the cloudflare-workers and cloudflare-wrangler skills.

## Related

- [Getting started](./get-started.md)
- [How Hyperdrive works](./how-hyperdrive-works.md)
- [Pricing](./pricing.md)
- [Limits](./limits.md)
