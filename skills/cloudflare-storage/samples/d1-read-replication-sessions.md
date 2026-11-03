---
source: https://developers.cloudflare.com/d1/tutorials/using-read-replication-for-e-com/
---

# Use D1 read replication with sessions and bookmarks

Use `db.withSession()` and bookmarks stored in a cookie so reads from replicas stay consistent with earlier writes, with a retry helper.

```jsonc
{
	"d1_databases": [
		{
			"binding": "DB",
			"database_name": "fast-commerce",
			"database_id": "YOUR_DATABASE_ID"
		}
	]
}
```

```ts
export interface RetryConfig {
	maxRetries: number;
	initialDelay: number;
	maxDelay: number;
	backoffFactor: number;
}

const shouldRetry = (error: unknown): boolean => {
	const errMsg = error instanceof Error ? error.message : String(error);
	return (
		errMsg.includes("Network connection lost") ||
		errMsg.includes("storage caused object to be reset") ||
		errMsg.includes("reset because its code was updated")
	);
};

// Helper function for sleeping
const sleep = (ms: number): Promise<void> => {
	return new Promise((resolve) => setTimeout(resolve, ms));
};

export const defaultRetryConfig: RetryConfig = {
	maxRetries: 3,
	initialDelay: 100,
	maxDelay: 1000,
	backoffFactor: 2,
};

export async function withRetry<T>(
	operation: () => Promise<T>,
	config: Partial<RetryConfig> = defaultRetryConfig,
): Promise<T> {
	const maxRetries = config.maxRetries ?? defaultRetryConfig.maxRetries;
	const initialDelay = config.initialDelay ?? defaultRetryConfig.initialDelay;
	const maxDelay = config.maxDelay ?? defaultRetryConfig.maxDelay;
	const backoffFactor =
		config.backoffFactor ?? defaultRetryConfig.backoffFactor;

	let lastError: Error | unknown;
	let delay = initialDelay;

	for (let attempt = 0; attempt <= maxRetries; attempt++) {
		try {
			const result = await operation();
			return result;
		} catch (error) {
			lastError = error;

			if (!shouldRetry(error) || attempt === maxRetries) {
				throw error;
			}

			// Add randomness to avoid synchronizing retries
			// Wait for a random delay between delay and delay*2
			await sleep(delay * (1 + Math.random()));

			// Calculate next delay with exponential backoff
			delay = Math.min(delay * backoffFactor, maxDelay);
		}
	}

	throw lastError;
}
```

```ts
import { withRetry } from "./retry";
```

```ts
app.get("/api/products", async (c) => {
	const db = c.env.DB;

	// Get bookmark from the cookie
	const bookmark = getCookie(c, "product_bookmark") || "first-unconstrained";

	const session = db.withSession(bookmark);

	try {
		return await withRetry(async () => {
			const { results } = await session.prepare("SELECT * FROM products").run();

			const latestBookmark = session.getBookmark();

			// Set the bookmark in the cookie
			latestBookmark &&
				setCookie(c, "product_bookmark", latestBookmark, {
					maxAge: 60 * 60, // 1 hour
				});

			return c.json(results);
		});
	} catch (e) {
		console.error(e);
		return c.json([]);
	}
});
```

## Notes

- Fences are transcribed from the official page: the binding, `retry.ts`, the `withRetry` import and the `GET /api/products` route. The route assumes the page's skeleton: `import { Hono } from "hono"`, `import { getCookie, setCookie } from "hono/cookie"` and `const app = new Hono<{ Bindings: Env }>();`. The write route (`db.withSession("first-primary")`) is at the official URL.
- Hono API itself: see the hono skill. Read replication must be enabled on the database; D1 does not create replicas in local development (set `"remote": true` on the binding to test).
- The page cautions that retries can cause data inconsistency; only retry idempotent work.
- Related: [read-replication](../references/d1/read-replication.md), [retry-queries](../references/d1/retry-queries.md), [D1 README](../references/d1/README.md).
