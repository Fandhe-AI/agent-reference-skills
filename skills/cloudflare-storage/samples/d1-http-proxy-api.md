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

```ts
// Update the API routes

/**
* Executes the `stmt.run()` method.
* https://developers.cloudflare.com/d1/worker-api/prepared-statements/#run
*/

app.post('/api/all', async (c) => {
		return c.text("/api/all endpoint");
	try {
		let { query, params } = await c.req.json();
		let stmt = c.env.DB.prepare(query);
		if (params) {
			stmt = stmt.bind(params);
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
		return c.text("/api/exec endpoint");
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
		return c.text("/api/batch endpoint");
	try {
		let { batch } = await c.req.json();
		let stmts = [];
		for (let query of batch) {
			let stmt = c.env.DB.prepare(query.query);
			if (query.params) {
				stmts.push(stmt.bind(query.params));
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
...
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

- Transcribed verbatim, including known defects: each route starts with a leftover `return c.text("/api/... endpoint");` before the `try`, so the handlers return the placeholder text and never reach D1 until that line is removed; the trailing `...` is a placeholder (the earlier fence ends with `export default app;`).
- Hono API itself: see the hono skill. Add the `d1_databases` binding (`DB`) to the Wrangler config, store `API_KEY` in `.dev.vars` locally and with `npx wrangler secret put API_KEY` in production.
- The built-in D1 REST API is for administrative use (global Cloudflare API rate limit); this proxy is for application access. The page recommends validating input with a library such as zod.
- Related: [D1 README](../references/d1/README.md), [d1-database](../references/d1/d1-database.md), [prepared-statements](../references/d1/prepared-statements.md).
