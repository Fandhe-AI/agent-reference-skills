---
source: https://developers.cloudflare.com/kv/platform/release-notes/
---

# Release notes

Changes, improvements, and fixes for Workers KV.

## Signature / Usage

2024-11-14: bulk write and bulk delete REST endpoints now return failed keys in the `result` field:

```
{
  "successful_key_count": number,
  "unsuccessful_keys": string[]
}
```

## Notes

- 2024-11-14, Workers KV REST API bulk operations provide granular errors: `unsuccessful_keys` lists keys not written successfully to all storage backends, which should be retried.
- 2024-08-08, New KV Analytics API: a new metrics dashboard and GraphQL-based analytics API provide per-account and per-namespace metrics for operations and storage, including read and write latency. The legacy Workers KV analytics REST API was turned off as of January 31st, 2025.

## Related

- [metrics-analytics.md](./metrics-analytics.md)
- [api-write.md](./api-write.md)
