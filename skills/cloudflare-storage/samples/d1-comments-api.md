---
source: https://developers.cloudflare.com/d1/tutorials/build-a-comments-api/
---

# Build a Comments API

JSON API on Workers with Hono and D1: create the schema, then GET and POST comments per post slug.

```jsonc
{
  "$schema": "./node_modules/wrangler/config-schema.json",
  "name": "d1-comments-api",
  "main": "src/index.ts",
  "upload_source_maps": true,
  // Set this to today's date
  "compatibility_date": "2026-11-03",
  "d1_databases": [
    {
      "binding": "DB",
      "database_name": "d1-comments-api",
      "database_id": "<YOUR_DATABASE_ID>"
    }
  ]
}
```

Adapted (not in the official docs): the leading `DROP TABLE IF EXISTS comments;` is removed and the index uses `IF NOT EXISTS` so the schema is safe to re-run; see Notes.

```sql
CREATE TABLE IF NOT EXISTS comments (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  author TEXT NOT NULL,
  body TEXT NOT NULL,
  post_slug TEXT NOT NULL
);
CREATE INDEX IF NOT EXISTS idx_comments_post_slug ON comments (post_slug);

-- Optionally, uncomment the below query to insert seed data
-- INSERT INTO comments (author, body, post_slug) VALUES ('Kristian', 'Great post!', 'hello-world');
```

```sh
npx wrangler d1 execute d1-comments-api --local --file schemas/schema.sql
npx wrangler d1 execute d1-comments-api --remote --file schemas/schema.sql
```

Adapted (not in the official docs): the POST handler validates the JSON body at runtime (object, non-empty string `author` / `body`, length limits) and returns 400 otherwise; see Notes.

```ts
import { Hono } from "hono";
import { cors } from "hono/cors";

type Bindings = {
	DB: D1Database;
};

const app = new Hono<{ Bindings: Bindings }>();
app.use("/api/*", cors());

app.get("/api/posts/:slug/comments", async (c) => {
	const { slug } = c.req.param();
	const { results } = await c.env.DB.prepare(
		"SELECT * FROM comments WHERE post_slug = ?",
	)
		.bind(slug)
		.run();
	return c.json(results);
});

app.post("/api/posts/:slug/comments", async (c) => {
	const { slug } = c.req.param();
	let payload: unknown;
	try {
		payload = await c.req.json();
	} catch {
		return c.text("Request body must be valid JSON", 400);
	}
	if (typeof payload !== "object" || payload === null || Array.isArray(payload)) {
		return c.text("Request body must be a JSON object", 400);
	}
	const { author, body } = payload as { author?: unknown; body?: unknown };

	if (typeof author !== "string" || author.trim() === "" || author.length > 100) {
		return c.text("author must be a non-empty string (max 100 characters)", 400);
	}
	if (typeof body !== "string" || body.trim() === "" || body.length > 5000) {
		return c.text("body must be a non-empty string (max 5000 characters)", 400);
	}

	const { success } = await c.env.DB.prepare(
		"INSERT INTO comments (author, body, post_slug) VALUES (?, ?, ?)",
	)
		.bind(author, body, slug)
		.run();

	if (success) {
		c.status(201);
		return c.text("Created");
	} else {
		c.status(500);
		return c.text("Something went wrong");
	}
});

export default app;
```

## Notes

- Hono API itself: see the hono skill. Create the database with `npx wrangler@latest d1 create d1-comments-api`; accept the prompt to add the `DB` binding.
- Adapted from the official docs: the official `schemas/schema.sql` begins with `DROP TABLE IF EXISTS comments;` and uses a plain `CREATE INDEX`; running that with `--remote` against a database with data deletes all comments. It is removed here. If you need a reset, run `DROP TABLE IF EXISTS comments;` as a separate, local-only step (`npx wrangler d1 execute d1-comments-api --local --command "DROP TABLE IF EXISTS comments;"`), never with `--remote` on data you want to keep. `cors()` with no options allows any origin.
- Adapted from the official docs: the official handler only checks `!author` / `!body` after `c.req.json<{...}>()`; the generic type argument is not runtime validation, so objects, arrays or numbers pass the check and break `bind()` or get coerced to strings. The sample validates type, non-emptiness and length (100 / 5000 are arbitrary limits; adjust them) and returns 400 on invalid input.
- Adapted from the official docs: the comments API is intentionally public (anyone can read and POST), as in the tutorial. Before exposing it beyond a demo, add abuse controls such as authentication, rate limiting (for example Cloudflare WAF rate limiting rules) and an origin allowlist for `cors()`.
- `bind()` passes the slug as a parameter, which avoids SQL injection. Apply the schema locally first, then with `--remote`.
- Related: [D1 README](../references/d1/README.md), [prepared-statements](../references/d1/prepared-statements.md), [local-development](../references/d1/local-development.md).
