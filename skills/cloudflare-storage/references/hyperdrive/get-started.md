---
source: https://developers.cloudflare.com/hyperdrive/get-started/
---

# Getting started

Create a Hyperdrive configuration with Wrangler, bind it to a Worker, and query a public Postgres or MySQL database.

## Signature / Usage

```sh
npx wrangler login
npm create cloudflare@latest -- hyperdrive-tutorial
cd hyperdrive-tutorial
npx wrangler hyperdrive create <YOUR_CONFIG_NAME> --connection-string="postgres://user:password@HOSTNAME_OR_IP_ADDRESS:PORT/database_name"
```

MySQL connection string and create command:

```sh
npx wrangler hyperdrive create <YOUR_CONFIG_NAME> --connection-string="mysql://user:password@HOSTNAME_OR_IP_ADDRESS:PORT/database_name"
```

Output of `hyperdrive create`:

```json
{
	"hyperdrive": [
		{
			"binding": "HYPERDRIVE",
			"id": "<example id: 57b7076f58be42419276f058a8968187>"
		}
	]
}
```

Bind the configuration in the Wrangler configuration file:

```jsonc
{
	"hyperdrive": [
		{
			"binding": "HYPERDRIVE",
			"id": "<YOUR_DATABASE_ID>" // the ID associated with the Hyperdrive you just created
		}
	]
}
```

Worker (node-postgres):

```typescript
// pg 8.16.3 or later is recommended
import { Client } from "pg";

export interface Env {
	// If you set another name in the Wrangler config file as the value for 'binding',
	// replace "HYPERDRIVE" with the variable name you defined.
	HYPERDRIVE: Hyperdrive;
}

export default {
	async fetch(request, env, ctx): Promise<Response> {
		// Create a new client on each request. Hyperdrive maintains the underlying
		// database connection pool, so creating a new client is fast.
		const sql = new Client({
			connectionString: env.HYPERDRIVE.connectionString,
		});

		try {
			// Connect to the database
			await sql.connect();

			// Sample query
			const results = await sql.query(`SELECT * FROM pg_tables`);

			// Return result rows as JSON
			return Response.json(results.rows);
		} catch (e) {
			console.error(e);
			return Response.json(
				{ error: e instanceof Error ? e.message : e },
				{ status: 500 },
			);
		}
	},
} satisfies ExportedHandler<Env>;
```

Worker (mysql2):

Adapted (not in the official docs): the `Access-Control-Allow-Origin: *` response header is removed; see Notes.

```typescript
// mysql2 v3.13.0 or later is required
import { createConnection } from "mysql2/promise";

export interface Env {
	// If you set another name in the Wrangler config file as the value for 'binding',
	// replace "HYPERDRIVE" with the variable name you defined.
	HYPERDRIVE: Hyperdrive;
}

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

			// The following line is needed for mysql2 compatibility with Workers
			// mysql2 uses eval() to optimize result parsing for rows with > 100 columns
			// Configure mysql2 to use static parsing instead of eval() parsing with disableEval
			disableEval: true,
		});

		try {
			// Sample query
			const [results, fields] = await connection.query("SHOW tables;");

			// Return result rows as JSON
			return new Response(JSON.stringify({ results, fields }), {
				headers: {
					"Content-Type": "application/json",
				},
			});
		} catch (e) {
			console.error(e);
			return Response.json(
				{ error: e instanceof Error ? e.message : e },
				{ status: 500 },
			);
		}
	},
} satisfies ExportedHandler<Env>;
```

Local development and deploy:

```sh
export CLOUDFLARE_HYPERDRIVE_LOCAL_CONNECTION_STRING_HYPERDRIVE="postgres://user:password@your-database-host:5432/database"
npx wrangler dev
npx wrangler deploy
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `binding` | string | Binding name; must be a valid JavaScript variable name; available at `env.<BINDING_NAME>` |
| `id` | string | ID of the Hyperdrive configuration |
| `localConnectionString` | string | Connection string used by `wrangler dev` (must include SSL/TLS mode if required: `sslmode=require` for Postgres, `sslMode=REQUIRED` for MySQL) |
| `--caching-disabled` | flag | Disables caching of eligible read query results |
| `--max-age` | number (seconds) | Maximum cache duration; default 60 |

## Notes

- Adapted from the official docs: the official mysql2 example returns `Access-Control-Allow-Origin: *`, which lets any website read the database result in a browser; the header is removed (add a specific origin only if the data is meant for that site).
- Hyperdrive removes seven round-trips before a query can be sent: TCP handshake (1x), TLS negotiation (3x), database authentication (3x).
- Node.js compatibility is required for database drivers. For compatibility dates of `2026-08-04` or later, Workers and Pages projects enable both `nodejs_compat` and `nodejs_compat_v2` by default. For earlier dates add `"compatibility_flags": ["nodejs_compat"]`. To turn it off for `2026-08-04`+, add both `no_nodejs_compat` and `no_nodejs_compat_v2`.
- Minimum driver versions: `pg` 8.16.3 (`@types/pg` 8.13.0), `mysql2` 3.13.0.
- Hyperdrive tests the connection with the supplied credentials before creating a configuration.
- Hyperdrive does not invalidate cached read results on writes; use a separate cache-disabled configuration for reads that must be fresh (see [query-caching](./query-caching.md)).
- With `localConnectionString` or `CLOUDFLARE_HYPERDRIVE_LOCAL_CONNECTION_STRING_HYPERDRIVE`, caching does not take effect locally; `wrangler dev --remote` uses the deployed configuration with caching.
- Placement: if a Worker makes multiple sequential queries per request, set `placement.region` (for example `"aws:us-east-1"`, `"gcp:us-east4"`, `"azure:eastus"`) to match the database region (20-30ms per query from a distant region vs 1-3ms nearby). One query per request gains nothing.
- Private databases: see [connect-private-database-vpc](./connect-private-database-vpc.md).
- Wrangler configuration file details and bindings: see the cloudflare-wrangler and cloudflare-workers skills.

## Related

- [How Hyperdrive works](./how-hyperdrive-works.md)
- [Query caching](./query-caching.md)
- [Troubleshoot and debug](./troubleshooting.md)
- [Local development](./local-development.md)
- [Wrangler commands](./wrangler-commands.md)
