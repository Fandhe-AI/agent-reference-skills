---
source: https://developers.cloudflare.com/hyperdrive/planetscale/
---

# PlanetScale Postgres & MySQL

Cloudflare partners with PlanetScale to provide PlanetScale-hosted Postgres and MySQL (Vitess) databases to Workers, billed through your Cloudflare account and accelerated by Hyperdrive.

## Signature / Usage

The `wrangler hyperdrive planetscale signature` command is experimental, and its interface may change. It requires `pscale` v0.313.0 or newer.

```sh
npx wrangler hyperdrive planetscale signature
```

This prints a JSON payload:

```json
{
	"account_id": "<ACCOUNT_ID>",
	"timestamp": "<TIMESTAMP>",
	"signature": "<SIGNATURE>"
}
```

`pscale database create` accepts this payload through its `--cloudflare-billing` flag. Passing `@-` makes the PlanetScale CLI read it from standard input:

```sh
npx wrangler hyperdrive planetscale signature | \
  pscale database create <DATABASE_NAME> \
    --org <PLANETSCALE_ORG> \
    --engine postgresql \
    --cloudflare-billing @- \
    --format json
```

## Notes

- `pscale database create` defaults to Vitess, so pass `--engine postgresql` for a Postgres database; `--format json` is recommended when the output is consumed by an agent.
- The signature is a cryptographically signed token that authorizes creating a database billed to your Cloudflare account. Treat it as a credential and do not share it. Your PlanetScale credentials stay between you and `pscale`.
- You can also create a PlanetScale database from the Cloudflare dashboard (Hyperdrive page). Billing appears as a line item on your Cloudflare invoice at PlanetScale's standard pricing; pay-as-you-go accounts are billed daily from creation until deletion, whether or not queries run. Support is provided by PlanetScale.
- Request flow: (1) Worker runs near the user; (2) Hyperdrive sets up the connection locally (p90 4ms: TCP, TLS, authentication) and returns cached reads without leaving that location; (3) otherwise the query goes to a location near PlanetScale, where a second cache is checked; (4) only then the query goes to PlanetScale through the existing connection pool. Writes and uncacheable queries always reach PlanetScale.
- Hyperdrive does not invalidate cached reads on writes; use a separate cache-disabled configuration for authentication, sessions, permissions, or other critical-path reads (see [query-caching](./query-caching.md)).
- PlanetScale offers development branches, query insights, and an MCP server (PlanetScale product features, not Hyperdrive).

## Related

- [Connect PostgreSQL providers](./connect-postgres-providers.md)
- [Connect MySQL providers](./connect-mysql-providers.md)
- [Getting started](./get-started.md)
- [How Hyperdrive works](./how-hyperdrive-works.md)
- [Pricing](./pricing.md)
