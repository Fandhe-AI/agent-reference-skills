---
source: https://developers.cloudflare.com/hyperdrive/concepts/connection-lifecycle/
---

# Connection lifecycle

How connections are managed between Workers, Hyperdrive, and the origin database; clients must be created inside handlers.

## Signature / Usage

```ts
import { Client } from "pg";

export default {
	async fetch(request, env, ctx): Promise<Response> {
		const client = new Client({
			connectionString: env.HYPERDRIVE.connectionString,
		});
		await client.connect();

		const result = await client.query("SELECT * FROM pg_tables");

		// No need to call client.end() — Hyperdrive automatically cleans
		// up the client connection when the request ends. The underlying
		// pooled connection to your origin database remains open for reuse.
		return Response.json(result.rows);
	},
} satisfies ExportedHandler<Env>;
```

Bad vs good (global scope):

```ts
import { Client } from "pg";

// 🔴 Bad: Client created in the global scope persists across requests.
// Workers do not allow I/O across request contexts, so this client
// becomes stale and subsequent queries will throw hard errors.
const globalClient = new Client({
	connectionString: env.HYPERDRIVE.connectionString,
});
await globalClient.connect();

export default {
	async fetch(request, env, ctx): Promise<Response> {
		// ✅ Good: Client created inside the handler, scoped to this request.
		// Hyperdrive pools the underlying connection to your origin database,
		// so creating a new client per request is fast and reliable.
		const client = new Client({
			connectionString: env.HYPERDRIVE.connectionString,
		});
		await client.connect();

		const result = await client.query("SELECT * FROM pg_tables");
		return Response.json(result.rows);
	},
} satisfies ExportedHandler<Env>;
```

## Notes

- Steps: (1) edge connection setup between driver and Hyperdrive; (2) a single cross-region round trip since auth is already done; (3) reuse a pooled connection near the database; (4) create a new connection from a region near the database if none available; (5) run query; (6) the client connection is garbage collected when the invocation ends while Hyperdrive keeps the origin connection in the pool.
- You do not need to call `client.end()`, `sql.end()`, `connection.end()`. Cleanup is automatic when the request or invocation ends, including Workflow or Queue consumer completion and Durable Object hibernation or idle eviction.
- Always create database clients inside handlers (`fetch`, `queue`, ...), never in global scope. A driver-level pool (`new Pool()`, `createPool()`) in global scope leaves stale connections that cause failed queries and hard errors.
- Durable Objects can hold clients across requests; each open connection consumes Hyperdrive pool resources. Close connections when idle, use timeouts, and limit the number of Durable Objects holding connections.
- Hyperdrive uses transaction pooling mode, so long-running transactions hold a connection until they finish and can exhaust the pool. Keep transactions short and avoid external API calls or heavy computation inside them.
- Durable Objects, Workflows and Queues are covered by the cloudflare-stateful skill (https://developers.cloudflare.com/durable-objects/, https://developers.cloudflare.com/workflows/, https://developers.cloudflare.com/queues/).

## Related

- [How Hyperdrive works](./how-hyperdrive-works.md)
- [Connection pooling](./connection-pooling.md)
- [Limits](./limits.md)
- [Troubleshoot and debug](./troubleshooting.md)
