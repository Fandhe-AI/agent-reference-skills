---
source: https://developers.cloudflare.com/ai-search/configuration/indexing/syncing/
---

# Syncing

External data sources (website, R2, D1) are synced by scheduled jobs; built-in storage is indexed per file immediately.

## Signature / Usage

```sh
npx wrangler ai-search jobs create <INSTANCE_NAME>
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `sync_interval` | number | `86400` (this page) | Seconds: `900`, `1800`, `3600`, `7200`, `14400`, `21600`, `43200`, `86400`. Dashboard: 15 min to 24 h. |
| Trigger sync | action | — | Manual job; at most every 30 seconds. |
| Cancel job | action | — | Cancel a running job. |
| Pause / Resume indexing | action | — | Stop or resume scheduled jobs (including auto-paused). |
| Sync individual file | action | — | Re-index one file. |

## Notes

- The instance create parameters now agree with this page: `900`-`86400`, default `86400` (24 hours). Check the instance via `info()` for its actual value.
- Trigger syncs from CI/CD, a CMS webhook, or a Worker using the Create job REST API (see rest-api-instances-items.md).
- An instance with no search request for 31 days has its scheduled syncs paused (external sources only: website, R2, or D1). It stays searchable and resumes when traffic returns or via **Resume indexing**.
- Indexing time depends on file count, sizes, formats (images are slower), and Workers AI latency.
- Keep files within size limits and supported formats, keep the service API token valid for R2 and D1, and clean up stale content.
- Source: https://developers.cloudflare.com/ai-search/configuration/indexing/syncing/ (pin 34d908a / fetched 2026-11-14)

## Related

- [Instance methods](./instance-methods.md)
- [Service API token](./service-api-token.md)
- [Error codes](./error-codes.md)
