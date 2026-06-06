# Vercel Edge Config

Global key-value data store for ultra-low latency reads. Most reads complete in <1ms; P99 reads under 15ms.

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
  - `edge-config.vercel.com` — optimized read endpoint (no rate limits)

## Getting Started

```bash
npm i @vercel/edge-config
vercel env pull  # pulls EDGE_CONFIG connection string
```

```ts
import { get } from '@vercel/edge-config';
const greeting = await get('greeting');
```

## Key Concepts

- **Connection string**: `https://edge-config.vercel.com/<id>?token=<read-token>` — stored as `EDGE_CONFIG` env var
- **Read access token**: Required for reads; auto-created when connecting Edge Config to a project
- **Writes**: Via Vercel REST API only (SDK is read-only)
- **Backups**: Taken on every change; restorable from the dashboard

## Notes

- Local development reads go over the public internet (100ms+ slower than production)
- Set the connection string as an environment variable (not hard-coded) for Vercel's optimizations to apply
- Avoid Edge Config for data that changes frequently or needs immediate consistency after writes (propagation: up to 10s)

## Related

- [@vercel/edge-config SDK](./edge-config-sdk.md)
- [Vercel REST API for Edge Config](./vercel-api.md)
- [Limits and Pricing](./limits.md)
- [Using Edge Config](./using-edge-config.md)
