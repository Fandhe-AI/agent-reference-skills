---
source: https://developers.cloudflare.com/workers/databases/third-party-integrations/
---

# Third-party database integrations

Landing page for connecting Workers to third-party databases by storing connection strings and credentials as Worker secrets.

## Signature / Usage

Snippet taken from https://developers.cloudflare.com/workers/databases/connecting-to-databases/#authentication.

```sh
wrangler secret put <SECRET_NAME>
```

## Notes

- Regional databases: reduce query latency with Hyperdrive (global connection pooling) and Smart Placement (runs the Worker near the backend when that lowers latency); both are included in every Workers plan.
- When you rotate database credentials, update the corresponding secrets with `wrangler secret put` or in the dashboard.
- Connect to multiple databases with separate sets of secrets and descriptive names such as `DATABASE_URL_PROD` and `DATABASE_URL_STAGING`.
- Listed providers: MongoDB, Neon, PlanetScale, Supabase, Turso, Upstash, Xata.

## Related

- [connecting-to-databases.md](./connecting-to-databases.md)
- [mongodb.md](./mongodb.md)
- [neon.md](./neon.md)
- [planetscale.md](./planetscale.md)
- [supabase.md](./supabase.md)
- [turso.md](./turso.md)
- [upstash.md](./upstash.md)
- [xata.md](./xata.md)
