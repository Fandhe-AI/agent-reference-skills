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

```sql
DROP TABLE IF EXISTS comments;
CREATE TABLE IF NOT EXISTS comments (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  author TEXT NOT NULL,
  body TEXT NOT NULL,
  post_slug TEXT NOT NULL
);
CREATE INDEX idx_comments_post_slug ON comments (post_slug);

-- Optionally, uncomment the below query to insert seed data
-- INSERT INTO comments (author, body, post_slug) VALUES ('Kristian', 'Great post!', 'hello-world');
```

```sh
npx wrangler d1 execute d1-comments-api --local --file schemas/schema.sql
npx wrangler d1 execute d1-comments-api --remote --file schemas/schema.sql
```

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
	const { author, body } = await c.req.json<{
		author: string;
		body: string;
	}>();

	if (!author) return c.text("Missing author value for new comment", 400);
	if (!body) return c.text("Missing body value for new comment", 400);

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
- `bind()` passes the slug as a parameter, which avoids SQL injection. Apply the schema locally first, then with `--remote`.
- Related: [D1 README](../references/d1/README.md), [prepared-statements](../references/d1/prepared-statements.md), [local-development](../references/d1/local-development.md).
