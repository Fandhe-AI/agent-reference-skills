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

Adapted (not in the official docs): bearer-token authentication (fail-closed) runs before any database access, `limit` is validated and defaulted (a missing `limit` was passed as `NULL`), unmatched routes return 404, responses use `Response.json`, and invalid JSON bodies (400) and query failures (500) are handled; see Notes.

```ts
import { Client } from "pg";

export interface Env {
	HYPERDRIVE: Hyperdrive;
	// Secret (for example `npx wrangler secret put API_TOKEN`); requests are rejected when unset or empty
	API_TOKEN: string;
}

export default {
	async fetch(request, env, ctx): Promise<Response> {
		// Fail closed: require a configured non-empty secret and a matching Bearer token
		// before touching the database
		if (
			typeof env.API_TOKEN !== "string" ||
			env.API_TOKEN.length === 0 ||
			request.headers.get("Authorization") !== `Bearer ${env.API_TOKEN}`
		) {
			return Response.json({ error: "Unauthorized" }, { status: 401 });
		}

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
			let productData;
			try {
				productData = await request.json();
			} catch {
				return Response.json({ error: "Invalid JSON body" }, { status: 400 });
			}
			if (!Array.isArray(productData)) {
				return Response.json({ error: "Body must be a JSON array of readings" }, { status: 400 });
			}

			// Write the raw query. You are using jsonb_to_recordset to expand the JSON
			// to PG INSERT format to insert all items at once, and using coalesce to
			// insert with the current timestamp if no ts field exists
			const insertQuery = `
      INSERT INTO readings (ts, sensor, metadata, value)
      SELECT coalesce(ts, now()), sensor, metadata, value FROM jsonb_to_recordset($1::jsonb)
      AS t(ts timestamptz, sensor UUID, metadata jsonb, value numeric)
  `;

			try {
				const insertResult = await client.query(insertQuery, [
					JSON.stringify(productData),
				]);

				// Collect the raw row count inserted to return
				return Response.json(insertResult.rowCount);
			} catch (e) {
				console.error(e);
				return Response.json({ error: "Insert failed" }, { status: 500 });
			}

			// Create a route for querying within a time-frame
		} else if (request.method === "GET" && url.pathname === "/readings") {
			// Validate the limit param (default 100, at most 1000)
			const parsedLimit = Number.parseInt(url.searchParams.get("limit") ?? "100", 10);
			const limit = Number.isNaN(parsedLimit)
				? 100
				: Math.min(Math.max(parsedLimit, 1), 1000);

			// Query the readings table using the limit param passed
			try {
				const result = await client.query(
					"SELECT * FROM readings ORDER BY ts DESC LIMIT $1",
					[limit],
				);

				// Return the result as JSON
				return Response.json(result.rows);
			} catch (e) {
				console.error(e);
				return Response.json({ error: "Query failed" }, { status: 500 });
			}
		}

		return new Response("Not found", { status: 404 });
	},
} satisfies ExportedHandler<Env>;
```

## Notes

- Install `pg` (`npm i pg`) and enable `nodejs_compat`. Pass `env.HYPERDRIVE.connectionString` straight to the driver; Hyperdrive owns the pool, so a new `Client` per request is cheap. Per-database/driver connection examples live in the hyperdrive references.
- Corrected from the official docs: the official handler passes `url.searchParams.get("limit")` straight to `LIMIT $1` (a missing `limit` becomes `NULL`, i.e. no limit, and a non-numeric value makes the query fail), and returns `undefined` for unmatched routes (a Worker `fetch` must return a `Response`). `limit` is now parsed, defaulted to 100 and capped at 1000, unmatched routes return 404, and `Response.json` replaces the manual `JSON.stringify` responses. The sample also returns 400 for a body that is not valid JSON or not an array (the official code would throw an unhandled exception) and 500 when the database query fails. The POST body is still only shape-checked (array), not schema-validated, as in the tutorial.
- Adapted from the official docs: the official tutorial serves both routes publicly. This sample rejects every request with 401 unless `env.API_TOKEN` is a non-empty secret and the `Authorization: Bearer <token>` header matches, before the database client is created. Store the token with `npx wrangler secret put API_TOKEN` (for local dev put it in `.dev.vars` and gitignore that file).
- Known page defect (unchanged): the official page says to note the deployed URL for a "GitHub webhook" (leftover from another tutorial).
- Clients are created per request and not closed (see the connection-lifecycle reference).
- Related: [Hyperdrive README](../references/hyperdrive/README.md), [get-started](../references/hyperdrive/get-started.md), [connection-pooling](../references/hyperdrive/connection-pooling.md).
