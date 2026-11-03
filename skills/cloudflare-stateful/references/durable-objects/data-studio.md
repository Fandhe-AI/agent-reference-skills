---
source: https://developers.cloudflare.com/durable-objects/observability/data-studio/
---

# Data Studio

Data Studio is a dashboard UI editor to view and write the SQL-API data of SQLite-backed Durable Objects.

## Signature / Usage

Snippet taken from https://developers.cloudflare.com/durable-objects/api/sqlite-storage-api/

```ts
const rows = this.ctx.storage.sql.exec("SELECT * FROM users").toArray();
```

## Notes

- Only SQLite-backed objects are supported, and only data persisted via the SQL API is read/write; key-value data persisted via the KV API will be made read-only in the future.
- Access requires at least `Editor` on the Worker implementing the object. Steps: dashboard Durable Objects page, select a namespace, select Data Studio, then enter either a user-provided unique name or a Cloudflare-generated object ID.
- Queries go to your remote deployed objects and incur usage billing for requests, duration, rows read and rows written; treat it like production. In the Query tab, running all statements sends each SQL statement as a separate object request.
- Every query is logged with audit logging v1 as two actions, `query executed` and `query completed`, correlated by `query_id`.

## Related

- [SQLite-backed storage API](./sqlite-storage-api.md)
- [Pricing](./pricing.md)
- [Metrics and analytics](./metrics-and-analytics.md)
