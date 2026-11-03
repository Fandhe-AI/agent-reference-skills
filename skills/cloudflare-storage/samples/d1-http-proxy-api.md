---
source: https://developers.cloudflare.com/d1/tutorials/build-an-api-to-access-d1/
---

# Build an API to access D1 using a proxy Worker

A bearer-authenticated Hono Worker that exposes D1 `run`, `exec` and `batch` over HTTP for clients outside Workers.

```ts
import { Hono } from "hono";
import { bearerAuth } from "hono/bearer-auth";
import { logger } from "hono/logger";
import { prettyJSON } from "hono/pretty-json";

type Bindings = {
	API_KEY: string;
};

const app = new Hono<{ Bindings: Bindings }>();

app.use("*", prettyJSON(), logger(), async (c, next) => {
	const auth = bearerAuth({ token: c.env.API_KEY });
	return auth(c, next);
});
```

Adapted (not in the official docs): leftover placeholder `return c.text(...)` lines removed, `bind()` receives spread values (it takes positional arguments, not an array), and the trailing `...` is replaced by `export default app;`; see Notes.

```ts
// Update the API routes

/**
* Executes the `stmt.run()` method.
* https://developers.cloudflare.com/d1/worker-api/prepared-statements/#run
*/

app.post('/api/all', async (c) => {
	try {
		let { query, params } = await c.req.json();
		let stmt = c.env.DB.prepare(query);
		if (params !== undefined && params !== null) {
			stmt = stmt.bind(...(Array.isArray(params) ? params : [params]));
		}

		const result = await stmt.run();
		return c.json(result);
	} catch (err) {
		return c.json({ error: `Failed to run query: ${err}` }, 500);
	}
});

/**
* Executes the `db.exec()` method.
* https://developers.cloudflare.com/d1/worker-api/d1-database/#exec
*/

app.post('/api/exec', async (c) => {
	try {
		let { query } = await c.req.json();
		let result = await c.env.DB.exec(query);
		return c.json(result);
	} catch (err) {
		return c.json({ error: `Failed to run query: ${err}` }, 500);
	}
});

/**
* Executes the `db.batch()` method.
* https://developers.cloudflare.com/d1/worker-api/d1-database/#batch
*/

app.post('/api/batch', async (c) => {
	try {
		let { batch } = await c.req.json();
		let stmts = [];
		for (let query of batch) {
			let stmt = c.env.DB.prepare(query.query);
			if (query.params !== undefined && query.params !== null) {
				stmts.push(
					stmt.bind(...(Array.isArray(query.params) ? query.params : [query.params])),
				);
			} else {
				stmts.push(stmt);
			}
		}
		const results = await c.env.DB.batch(stmts);
		return c.json(results);
	} catch (err) {
		return c.json({ error: `Failed to run query: ${err}` }, 500);
	}
});

export default app;
```

```ts
type Bindings = {
	DB: D1Database;
	API_KEY: string;
};
```

```sh
curl -H "Authorization: Bearer YOUR_API_KEY" "http://localhost:8787/api/all" --data '{"query": "SELECT title FROM posts WHERE id=?", "params":1}'
```

## Notes

- Corrected from the official docs: each official route starts with a leftover `return c.text("/api/... endpoint");` before the `try`, so the handlers return placeholder text and never reach D1; those lines were removed. The official `stmt.bind(params)` passes the whole `params` as a single value, but `bind()` takes positional values (the page's own `curl` sends `"params":1`, an array would be bound as one invalid value), so params are spread (a scalar is wrapped in an array). The trailing `...` placeholder is now `export default app;`. The first fence's `Bindings` omits `DB`; use the third fence's `Bindings` (`DB` and `API_KEY`) in the same file.
- This proxy executes arbitrary SQL from any holder of the bearer token (`/api/exec` runs multiple statements); treat `API_KEY` as a database-admin credential.
- Hono API itself: see the hono skill. Add the `d1_databases` binding (`DB`) to the Wrangler config, store `API_KEY` in `.dev.vars` locally and with `npx wrangler secret put API_KEY` in production.
- The built-in D1 REST API is for administrative use (global Cloudflare API rate limit); this proxy is for application access. The page recommends validating input with a library such as zod.
- Related: [D1 README](../references/d1/README.md), [d1-database](../references/d1/d1-database.md), [prepared-statements](../references/d1/prepared-statements.md).
