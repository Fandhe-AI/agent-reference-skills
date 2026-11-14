# Upstash Vector Changelog

Dated feature history of Upstash Vector (January 2024 to August 2025).

## Signature / Usage

```typescript
await index.fetch({ prefix: "test-" });
```

## Options / Props

| Month | Change |
| --- | --- |
| August 2025 | API to rename a namespace (`namespace.md`) |
| March 2025 | Delete vectors by ID prefix or metadata filter; fetch and range over vectors by ID prefix |
| February 2025 | Official PHP and Laravel SDKs (`php-sdk.md`) |
| January 2025 | Sparse and hybrid indexes (`sparse-indexes.md`, `hybrid-indexes.md`) |
| September 2024 | Resumable query (`resumable-query.md`); embedding latency charts in the Console usage page |
| July 2024 | `HAS FIELD` / `HAS NOT FIELD` metadata filter operators (`filtering.md`) |
| June 2024 | Raw `data` stored next to metadata; update API; reset all namespaces; batch queries in one request |
| May 2024 | Namespaces; GCP US-Central1 region |
| April 2024 | Upsert and query raw data with the Upstash embedding service (`embedding-models.md`) |
| February 2024 | SQL-like metadata filtering |
| January 2024 | Initial release |

## Notes

- Release facts for the SDK: `@upstash/vector` 1.2.4 only bundles source and docs in the npm package (no API change) - Source: https://github.com/upstash/vector-js/releases (release notes, checked 2026-11-14)
- Source: https://upstash.com/docs/vector/overall/changelog (fetched 2026-11-14; no version pin on the site)

## Related

- [namespace.md](./namespace.md)
- [update.md](./update.md)
- [api-endpoints.md](./api-endpoints.md)
