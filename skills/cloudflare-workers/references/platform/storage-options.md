---
source: https://developers.cloudflare.com/workers/platform/storage-options/
---

# Choose a data or storage product

Guide to the storage and database products available with Workers and their recommended use cases.

## Signature / Usage

Storage products are reached from a Worker through bindings:

```js
export default {
	async fetch(request, env) {
		const object = await env.MY_BUCKET.get("my-file");

		if (!object) {
			return new Response("Not found", { status: 404 });
		}

		return new Response(object.body, {
			headers: {
				"Content-Type":
					object.httpMetadata?.contentType ?? "application/octet-stream",
			},
		});
	},
};
```

Snippet taken from https://developers.cloudflare.com/workers/best-practices/workers-best-practices/#use-bindings-for-cloudflare-services-not-rest-apis.

## Options / Props

| Use-case | Product | Ideal for |
| --- | --- | --- |
| Key-value storage | Workers KV | Configuration data, service routing metadata, personalization (A/B testing) |
| Object storage / blob storage | R2 | User-facing web assets, images, ML and training datasets, analytics datasets, log and event data |
| Accelerate a Postgres or MySQL database | Hyperdrive | Connecting to an existing database in a cloud or on-premises using existing drivers & ORMs |
| Global coordination & stateful serverless | Durable Objects | Collaborative applications; global coordination; real-time WebSocket apps; strongly consistent, transactional storage |
| Lightweight SQL database | D1 | Relational data: user profiles, product listings and orders, customer data |
| Task processing, batching and messaging | Queues | Background job processing, message queuing, deferred tasks |
| Event streaming | K2 | High-volume event data read by multiple independent consumers; replaying retained events |
| Vector search & embeddings queries | Vectorize | Storing embeddings from AI models for semantic search and classification |
| Streaming ingestion | Basin Pipelines | Streaming ingestion and processing: clickstream, telemetry/log data |
| Time-series metrics | Analytics Engine | High-cardinality time-series data, usage metrics, service telemetry via Workers and/or SQL |

For KV, D1, R2, and Hyperdrive, see the cloudflare-storage skill. Official docs for the others:

- Durable Objects: https://developers.cloudflare.com/durable-objects/
- Queues: https://developers.cloudflare.com/queues/
- K2: https://developers.cloudflare.com/k2/
- Vectorize: https://developers.cloudflare.com/vectorize/
- Basin Pipelines: https://developers.cloudflare.com/basin-pipelines/
- Analytics Engine: https://developers.cloudflare.com/analytics/analytics-engine/

## Notes

- SQL options: Hyperdrive for an existing Postgres/MySQL database, very large single databases (1 TB, 100 TB or more), or existing tools (PlanetScale, Neon, Supabase); D1 for lightweight, read-heavy apps with global users benefiting from read replication; Durable Objects for stateful workloads, per-user/per-customer SQL state, and distributed systems (D1 and Queues are built on Durable Objects).
- Session storage: use Workers KV for session data, credentials, and configuration. These are read at high rates, rarely modified (KV limit: 1 write RPS per unique key), and need not be immediately consistent. Hot keys typically see 500µs to 10ms latencies.
- D1 maximum database size is 10 GB; split larger working sets into multiple databases.
- Queues vs K2: use Queues when each message is a unit of work completed, retried, and tracked individually; use K2 when producing and consuming records in bulk where every record being processed matters more than any one record's state.
- D1 vs SQLite in Durable Objects: D1 is a managed database ("batteries included": HTTP API, schema management, import/export, query insights; use Smart Placement to reduce latency). SQLite in Durable Objects is a lower-level building block accessed only from Workers, requiring a front-end Worker plus the Durable Object. SQL pricing and limits are intended to be identical between the two.
- Pages Functions can use the same storage options (see https://developers.cloudflare.com/pages/functions/bindings/).
- Docs inconsistency: in the source, "Basin Pipelines" is an H2 heading while sibling product overviews are H3.
- The source page contains no code; the snippet above is borrowed from Workers Best Practices.

## Related

- [pricing.md](./pricing.md)
- [limits.md](./limits.md)
- [best-practices.md](./best-practices.md)
- [../bindings-rpc/README.md](../bindings-rpc/README.md)
