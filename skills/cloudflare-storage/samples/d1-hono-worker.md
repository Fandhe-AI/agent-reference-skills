---
source: https://developers.cloudflare.com/d1/examples/d1-and-hono/
---

# Query D1 from Hono

Query a D1 binding through `c.env.DB` in a Hono app, as a Worker and as a Pages Function.

```ts
import { Hono } from "hono";

// This ensures c.env.DB is correctly typed
type Bindings = {
	DB: D1Database;
};

const app = new Hono<{ Bindings: Bindings }>();

// Accessing D1 is via the c.env.YOUR_BINDING property
app.get("/query/users/:id", async (c) => {
	const userId = c.req.param("id");
	try {
		let { results } = await c.env.DB.prepare(
			"SELECT * FROM users WHERE user_id = ?",
		)
			.bind(userId)
			.run();
		return c.json(results);
	} catch (e) {
		return c.json({ err: "Failed to query user" }, 500);
	}
});

// Export our Hono app: Hono automatically exports a
// Workers 'fetch' handler for you
export default app;
```

```ts
import { Hono } from "hono";
import { handle } from "hono/cloudflare-pages";

// This ensures c.env.DB is correctly typed
type Bindings = {
	DB: D1Database;
};

const app = new Hono<{ Bindings: Bindings }>().basePath("/api");

// Accessing D1 is via the c.env.YOUR_BINDING property
app.get("/query/users/:id", async (c) => {
	const userId = c.req.param("id");
	try {
		let { results } = await c.env.DB.prepare(
			"SELECT * FROM users WHERE user_id = ?",
		)
			.bind(userId)
			.run();
		return c.json(results);
	} catch (e) {
		return c.json({ err: "Failed to query user" }, 500);
	}
});

// Export the Hono instance as a Pages onRequest function
export const onRequest = handle(app);
```

## Notes

- Hono routing API itself: see the hono skill. Pages Functions bindings: see https://developers.cloudflare.com/pages/functions/bindings/#d1-databases.
- For Pages local development pass `--d1 DB=<DATABASE_ID>` to `wrangler pages dev <build-output-dir>` (e.g. `npx wrangler pages dev ./dist --d1 DB=<DATABASE_ID>`); the binding name must match the name used in code. The official page says `wrangler dev`, but `--d1` is a `wrangler pages dev` flag (see the cloudflare-wrangler skill, `commands/pages.md`).
- Related: [D1 README](../references/d1/README.md), [prepared-statements](../references/d1/prepared-statements.md).
