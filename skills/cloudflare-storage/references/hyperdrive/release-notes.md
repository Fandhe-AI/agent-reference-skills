---
source: https://developers.cloudflare.com/hyperdrive/platform/release-notes/
---

# Release notes

Changelog of Hyperdrive changes from 2023-09-28 (public beta) to 2025-12-04.

## Signature / Usage

```sh
# Local development env var introduced 2024-03-19 (WRANGLER_...) and current form
export CLOUDFLARE_HYPERDRIVE_LOCAL_CONNECTION_STRING_<BINDING_NAME>="postgres://user:password@host:5432/db"
```

## Notes

- 2025-12-04: `localConnectionString` and `CLOUDFLARE_HYPERDRIVE_LOCAL_CONNECTION_STRING_<BINDING_NAME>` support remote databases over TLS with `wrangler dev` (no caching).
- 2025-07-03: Configurable connection counts (min 5, max by plan; soft maximum).
- 2025-05-05: Better regional caching of prepared statements, up to 5x faster cache hits.
- 2025-03-07: Egress from Cloudflare's IP address ranges; connection pools placed near the database (up to 90% less latency for uncached queries and new connections).
- 2025-01-28: Hyperdrive auto-creates Access, Service Token and Policies for private databases via Tunnel.
- 2024-12-11: Query caching in all Cloudflare locations (up to 90% lower hit latency).
- 2024-11-19: Clear-text password authentication over TLS supported.
- 2024-10-30: Tunnel-based configurations validated before creation.
- 2024-09-20: `node-postgres` (pg) supported for Pages without legacy `node_compat` (use `nodejs_compat_v2`).
- 2024-08-19: Improved Postgres.js caching. 2024-08-13: audit logs in dashboard.
- 2024-05-24: Up to 25 configurations per account (was 10).
- 2024-05-22: Postgres.js compatibility improvements; `prepare: false` no longer needed.
- 2024-04-01: Generally Available. 2023-09-28: public beta for Workers Paid.
- Note: the 2024-05-22 note says `prepare: false` is no longer required, while current driver docs warn against `prepare: false` with Postgres.js (it can hang or fail intermittently).

## Related

- [Limits](./limits.md)
- [Local development](./local-development.md)
- [Supported databases and features](./supported-databases-and-features.md)
