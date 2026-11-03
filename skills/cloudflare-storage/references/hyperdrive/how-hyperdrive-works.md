---
source: https://developers.cloudflare.com/hyperdrive/concepts/how-hyperdrive-works/
---

# How Hyperdrive works

Hyperdrive accelerates database queries by doing connection setup near Workers, pooling connections near the database, and caching read query results.

## Signature / Usage

Placement example for Workers that make multiple sequential queries per request:

```jsonc
{
	"placement": {
		"region": "aws:us-east-1", // Match your database region, for example "gcp:us-east4" or "azure:eastus"
	},
}
```

## Notes

- 1. Edge connection setup: the TCP/TLS/auth handshake happens between the Worker and Hyperdrive at the edge, close to the Worker, instead of over multiple round trips to the database.
- 2. Connection pooling: the pool is placed in one or more regions closest to the origin database; existing warm connections are reused, new ones created only when needed. Hyperdrive manages pool properties automatically, including the total connection limit.
- 3. Query caching: Hyperdrive parses each query to decide whether it is mutating (write) or non-mutating (read); read responses are cached for the configured `max_age`. Hyperdrive does not invalidate cached results when your application writes (see [query-caching](./query-caching.md)).
- Pooling mode: transaction mode. The client uses a single connection for the duration of a transaction, then the connection is returned to the pool.
- `SET` statements apply for the duration of a transaction or a query (`BEGIN`/`COMMIT`, or `SET X; SELECT foo FROM bar;`). When a connection returns to the pool it is `RESET`, so `SET` does not carry to later queries. A single Worker invocation may obtain multiple connections and may need to `SET` per query or transaction. Wrapping multiple operations in one transaction to keep `SET` state is not recommended (the connection cannot be reused by other isolates).
- Named prepared statements as implemented in `postgres.js` and `node-postgres` are supported; other drivers may perform worse or not work.
- Placement: with multiple sequential queries per request, each query adds 20-30ms from a distant region or 1-3ms when placed nearby. With only one query per request, placement does not improve end-to-end latency.
- Workers placement configuration in general: see the cloudflare-workers skill.

## Related

- [Connection lifecycle](./connection-lifecycle.md)
- [Connection pooling](./connection-pooling.md)
- [Query caching](./query-caching.md)
