---
source: https://developers.cloudflare.com/d1/
---

# Cloudflare D1

D1 is Cloudflare's managed, serverless database with SQLite's SQL semantics, built-in disaster recovery, and Worker and HTTP API access. Available on Free and Paid plans.

## Signature / Usage

```jsonc
{
  "d1_databases": [
    {
      "binding": "DB",
      "database_name": "prod-d1-tutorial",
      "database_id": "<unique-ID-for-your-database>"
    }
  ]
}
```

## Notes

- D1 supports separate databases for users, tenants, or projects. The Workers Paid plan includes 100,000 databases. Additional databases cost $0.10 per database per month, alongside query and storage charges.
- Features: SQLite SQL compatibility and D1 Client API, Time Travel (restore to any minute within the last 30 days), Global Read Replication (read-only copies across regions).
- Query D1 from Workers or Pages (Pages Functions bindings).
- Bindings (`env`) and Wrangler configuration in general are covered by the cloudflare-workers and cloudflare-wrangler skills.

## Related

- [Getting started](./get-started.md)
- [Workers Binding API](./worker-binding-api.md)
- [Time Travel and backups](./time-travel.md)
- [Global read replication](./read-replication.md)
- [Pricing](./pricing.md)
- [Limits](./limits.md)
