# Vercel Edge Config (renamed to Global Config)

Global key-value data store for ultra-low latency reads. Reads typically complete in less than a millisecond on Vercel; observed latency depends on usage patterns (see Notes). Available on all plans.

> Vercel renamed this product from **Edge Config** to **Global Config**. Docs now live at `/docs/global-config`. The `vercel edge-config` CLI command continues to work as an alias for `vercel global-config`; see [Notes](#notes) below for SDK/env var status.

## Use Cases

- Feature flags / A/B testing
- Critical redirects and IP blocking
- Runtime configuration that must not require redeployment

## Comparison with Alternatives

| Solution | Read Latency | Write Latency | Redeployment Required |
|----------|-------------|---------------|----------------------|
| **Global Config (formerly Edge Config)** | **Ultra-low** | Seconds | No |
| Remote JSON files | Varies | Varies | No |
| Embedded JSON / Env Vars | Lowest (at deploy time) | Highest | Yes |

## Architecture

- Reads optimized via Vercel's CDN — works in Middleware and Vercel Functions (Edge + Node.js)
- Write optimizations available for other runtimes (Ruby, Go, Python) upon request
- Two distinct API endpoints:
  - `api.vercel.com` — management API (create, update, delete)
  - `global-config.vercel.com` — optimized read endpoint (no rate limits; formerly `edge-config.vercel.com`)

## Getting Started

```bash
npm i @vercel/global-config
vercel env pull  # pulls GLOBAL_CONFIG connection string
```

```ts
import { get } from '@vercel/global-config';
const greeting = await get('greeting');
```

```ts
import { getAll, has } from '@vercel/global-config';
const config = await getAll();
const hasRegion = await has('region');
```

## Key Concepts

- **Connection string**: `https://global-config.vercel.com/<id>?token=<read-token>` — stored as `GLOBAL_CONFIG` env var
- **Read access token**: Required for reads; auto-created when connecting Global Config to a project
- **Writes**: Via Vercel REST API only (SDK is read-only)
- **Backups**: Taken on every change; restorable from the dashboard

## Notes

- As of the current docs (2026-07-29), Vercel renamed Edge Config to **Global Config**: SDK package is `@vercel/global-config` (was `@vercel/edge-config`), read endpoint is `global-config.vercel.com` (was `edge-config.vercel.com`), connection-string env var is `GLOBAL_CONFIG` (was `EDGE_CONFIG`)
- Backward compatibility (Global Config migration guide, last_updated 2026-07-29): the old connection strings (`edge-config.vercel.com`), `api.vercel.com/v1/edge-config`, the `@vercel/edge-config` package, the `vercel edge-config` CLI command and the `EDGE_CONFIG` environment variable all still work, with no removal timeline. The new SDK reads `GLOBAL_CONFIG` by default and falls back to `EDGE_CONFIG`; the legacy `@vercel/edge-config` reads only `EDGE_CONFIG` by default. Upgrade the SDK before connecting a new store to a project (connecting now creates `GLOBAL_CONFIG`). See [migration-guide.md](./migration-guide.md)
- Read latency: Vercel replicates Global Config alongside your function's code, so even cold starts can read the latest replicated configuration without a network request. Active cache invalidation injects the configuration version into a request header; when it identifies a newer version, the local value is served and the update is fetched in the background, and if the local version is too far behind the read becomes blocking. Observed latency depends on the number of functions reading, read distribution over time and geography, and update frequency.
- Production example (vercel.com/docs, reads on every request globally): fastest 0.01 ms, p50 0.34 ms, p75 0.57 ms, p99 1.50 ms, about 0.1% of reads involved cold starts. Not a latency guarantee; measure with representative traffic.
- Read optimizations are only available on the Edge and Node.js runtimes; they can be enabled for other runtimes (Ruby, Go, Python) upon request.
- Workflow facts: one or more Global Configs per account depending on plan; multiple Global Configs in one project; each Global Config can be used by multiple projects; environments can be scoped with environment variables; reading needs a read access token, writing needs an API token. Create and manage via REST API or Dashboard; scope to a Hobby team or team.
- Comparison caveats: remote JSON files can be hundreds of milliseconds slower and carry the external provider's uptime risk; embedded JSON and environment variables need a redeploy for changes; Global Config has no added downtime risk (hosted by Vercel).
- Source: https://vercel.com/docs/global-config (fetched 2026-11-14)
- Local development reads go over the public internet (100ms+ slower than production)
- Set the connection string as an environment variable (not hard-coded) for Vercel's optimizations to apply
- Avoid Global Config for data that changes frequently or needs immediate consistency after writes (propagation: up to 10s)

## Related

- [@vercel/edge-config SDK](./edge-config-sdk.md)
- [Vercel REST API for Edge Config](./vercel-api.md)
- [Limits and Pricing](./limits.md)
- [Using Edge Config](./using-edge-config.md)
- [Migration Guide](./migration-guide.md)
