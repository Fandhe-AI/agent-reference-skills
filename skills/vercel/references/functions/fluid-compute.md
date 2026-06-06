# Fluid Compute

A hybrid execution model blending serverless flexibility with server-like concurrency. Multiple invocations share a single function instance, reducing cold starts, lowering latency, and saving compute costs.

## Signature / Usage

```json
// vercel.json — enable for specific deployments
{
  "$schema": "https://openapi.vercel.sh/vercel.json",
  "fluid": true
}
```

Enable project-wide via **Project Settings → Functions → Fluid Compute** toggle in the dashboard.

## Key Features

| Feature | Description |
|---------|-------------|
| Optimized concurrency | Multiple invocations share one instance; idle I/O time is reused |
| Background processing | `waitUntil()` continues tasks after response is sent |
| Bytecode caching | Node.js 20+ caches compiled bytecode to reduce cold starts (production only) |
| Multi-AZ failover | Automatically reroutes to another AZ or region on downtime |
| Error isolation | Uncaught exceptions don't crash concurrent requests on same instance |
| Dynamic scaling | Optimizes existing resources before spinning up new instances |

## Default Settings by Plan

| Setting | Hobby | Pro | Enterprise |
|---------|-------|-----|------------|
| CPU configuration | Standard | Standard / Performance | Standard / Performance |
| Default duration | 300s | 300s | 300s |
| Max duration | 300s | 800s | 800s |
| Multi-region failover | No | No | Yes |
| Multi-region functions | No | Up to 3 | All |

## Settings Precedence (highest → lowest)

| Order | Source | Can Override |
|-------|--------|-------------|
| 1 | Function code | `maxDuration` |
| 2 | `vercel.json` | `maxDuration`, `region` |
| 3 | Dashboard | `maxDuration`, `region`, `memory` |
| 4 | Fluid defaults | — |

## Supported Runtimes

Node.js, Python, Edge, Bun, Rust

## Notes

- Enabled by default for new projects created after April 23, 2025
- Optimized concurrency (in-function concurrency) is only available for Node.js and Python runtimes
- Bytecode caching only applies to production environments
- Global state is shared across concurrent requests; unhandled errors are isolated per request
- Use `waitUntil()` from `@vercel/functions` for background tasks

## Related

- [overview.md](./overview.md)
- [node-js-runtime.md](./node-js-runtime.md)
- [usage-and-pricing.md](./usage-and-pricing.md)
- [configuring-functions.md](./configuring-functions.md)
