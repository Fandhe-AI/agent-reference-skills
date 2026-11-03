---
source: https://developers.cloudflare.com/hyperdrive/tutorials/serverless-timeseries-api-with-timescale/
---

# Serverless time-series API with Timescale and Hyperdrive

Worker that ingests and queries time-series readings in Timescale (PostgreSQL) through a Hyperdrive binding and the `pg` driver.

```sh
npx wrangler hyperdrive create hyperdrive --connection-string="SERVICEURL"
```

```jsonc
{
	"$schema": "./node_modules/wrangler/config-schema.json",
	"name": "timescale-api",
	"main": "src/index.ts",
	"upload_source_maps": true,
	// Set this to today's date
	"compatibility_date": "2026-11-03",
	"compatibility_flags": [
		"nodejs_compat"
	],
	"hyperdrive": [
		{
			"binding": "HYPERDRIVE",
			"id": "your-id-here"
		}
	]
}
```

```sql
CREATE TABLE readings(
  ts timestamptz DEFAULT now() NOT NULL,
  sensor UUID NOT NULL,
  metadata jsonb,
  value numeric NOT NULL
 );

SELECT create_hypertable('readings', 'ts');
```

```ts
import { Client } from "pg";

export interface Env {
	HYPERDRIVE: Hyperdrive;
}

export default {
	async fetch(request, env, ctx): Promise<Response> {
		// Create a new client on each request. Hyperdrive maintains the underlying
		// database connection pool, so creating a new client is fast.
		const client = new Client({
			connectionString: env.HYPERDRIVE.connectionString,
		});
		await client.connect();

		const url = new URL(request.url);
		// Create a route for inserting JSON as readings
		if (request.method === "POST" && url.pathname === "/readings") {
			// Parse the request's JSON payload
			const productData = await request.json();

			// Write the raw query. You are using jsonb_to_recordset to expand the JSON
			// to PG INSERT format to insert all items at once, and using coalesce to
			// insert with the current timestamp if no ts field exists
			const insertQuery = `
      INSERT INTO readings (ts, sensor, metadata, value)
      SELECT coalesce(ts, now()), sensor, metadata, value FROM jsonb_to_recordset($1::jsonb)
      AS t(ts timestamptz, sensor UUID, metadata jsonb, value numeric)
  `;

			const insertResult = await client.query(insertQuery, [
				JSON.stringify(productData),
			]);

			// Collect the raw row count inserted to return
			const resp = new Response(JSON.stringify(insertResult.rowCount), {
				headers: { "Content-Type": "application/json" },
			});

			return resp;

			// Create a route for querying within a time-frame
		} else if (request.method === "GET" && url.pathname === "/readings") {
			const limit = url.searchParams.get("limit");

			// Query the readings table using the limit param passed
			const result = await client.query(
				"SELECT * FROM readings ORDER BY ts DESC LIMIT $1",
				[limit],
			);

			// Return the result as JSON
			const resp = new Response(JSON.stringify(result.rows), {
				headers: { "Content-Type": "application/json" },
			});

			return resp;
		}
	},
} satisfies ExportedHandler<Env>;
```

## Notes

- Install `pg` (`npm i pg`) and enable `nodejs_compat`. Pass `env.HYPERDRIVE.connectionString` straight to the driver; Hyperdrive owns the pool, so a new `Client` per request is cheap. Per-database/driver connection examples live in the hyperdrive references.
- Known page defects: it says to note the deployed URL for a "GitHub webhook" (leftover from another tutorial), and the handler returns nothing for unmatched routes.
- Related: [Hyperdrive README](../references/hyperdrive/README.md), [get-started](../references/hyperdrive/get-started.md), [connection-pooling](../references/hyperdrive/connection-pooling.md).
