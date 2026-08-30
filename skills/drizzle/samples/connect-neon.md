---
source: https://orm.drizzle.team/docs/connect-neon
---

# Connect to Neon Postgres

Connect to Neon using the HTTP driver for fast single-statement serverless queries, or the WebSocket-based serverless driver when interactive transactions are needed.

```ts
// HTTP — fastest for single, non-interactive statements (serverless functions)
import { drizzle } from 'drizzle-orm/neon-http';

const db = drizzle(process.env.DATABASE_URL);

const result = await db.execute('select 1');
```

```ts
// WebSocket — supports session/interactive transactions, drop-in for 'pg'
import { drizzle } from 'drizzle-orm/neon-serverless';

const db = drizzle(process.env.DATABASE_URL);

const result = await db.execute('select 1');
```

## Notes

- `neon-http` and `neon-websockets` access Neon over HTTP/WebSocket instead of raw TCP, so they work from edge/serverless runtimes without a persistent connection.
- Use `neon-serverless` (WebSocket) when you need session-scoped or interactive transactions; `neon-http` is faster for one-shot non-interactive queries.
- In Node.js, WebSocket-based drivers require the `ws` and `bufferutil` packages and passing `ws` into the connection config, since the `WebSocket` global is not defined there.
- From a long-running (non-serverless) server, connect to Neon with the standard `node-postgres` or `postgres-js` drivers instead.
