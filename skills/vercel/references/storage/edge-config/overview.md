# Vercel Edge Config (renamed to Global Config)

Global key-value data store for ultra-low latency reads. Most reads complete in <1ms; P99 reads under 15ms.

> Vercel renamed this product from **Edge Config** to **Global Config**. Docs now live at `/docs/global-config`. The `vercel edge-config` CLI command continues to work as an alias for `vercel global-config`; see [Notes](#notes) below for SDK/env var status.

## Use Cases

- Feature flags / A/B testing
- Critical redirects and IP blocking
- Runtime configuration that must not require redeployment

## Comparison with Alternatives

| Solution | Read Latency | Write Latency | Redeployment Required |
|----------|-------------|---------------|----------------------|
| **Edge Config** | **Ultra-low** | Seconds | No |
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

## Key Concepts

- **Connection string**: `https://global-config.vercel.com/<id>?token=<read-token>` — stored as `GLOBAL_CONFIG` env var
- **Read access token**: Required for reads; auto-created when connecting Global Config to a project
- **Writes**: Via Vercel REST API only (SDK is read-only)
- **Backups**: Taken on every change; restorable from the dashboard

## Notes

- As of the current docs (2026-07-29), Vercel renamed Edge Config to **Global Config**: SDK package is `@vercel/global-config` (was `@vercel/edge-config`), read endpoint is `global-config.vercel.com` (was `edge-config.vercel.com`), connection-string env var is `GLOBAL_CONFIG` (was `EDGE_CONFIG`)
- The CLI command `vercel edge-config` continues to work as an alias for `vercel global-config` (confirmed in the CLI overview docs); no equivalent alias/fallback statement was found for the old SDK package name or `EDGE_CONFIG` env var — verify before assuming backward compatibility
- Local development reads go over the public internet (100ms+ slower than production)
- Set the connection string as an environment variable (not hard-coded) for Vercel's optimizations to apply
- Avoid Global Config for data that changes frequently or needs immediate consistency after writes (propagation: up to 10s)

## Related

- [@vercel/edge-config SDK](./edge-config-sdk.md)
- [Vercel REST API for Edge Config](./vercel-api.md)
- [Limits and Pricing](./limits.md)
- [Using Edge Config](./using-edge-config.md)
