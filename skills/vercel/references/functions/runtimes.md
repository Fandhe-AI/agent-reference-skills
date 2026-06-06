# Runtimes

Runtimes transform source code into Vercel Functions. Each runtime provides different APIs, performance characteristics, and trade-offs.

## Official Runtimes

| Runtime | Description |
|---------|-------------|
| [Node.js](./node-js-runtime.md) | Full Node.js API access; JS/TS; bundles up to 250 MB |
| Bun | Bun-compatible runtime; most Node.js features supported |
| Python | Single HTTP handler; bundles up to 500 MB |
| Rust | Uses `vercel_runtime` crate; compiled to Vercel Function |
| Go | Single HTTP handler |
| Ruby | Single HTTP handler |
| Wasm | Pre-compiled WebAssembly |
| [Edge](./edge-runtime.md) | V8-based; no container/VM; runs closest to user |

## Community Runtimes

Specify via `functions` property in `vercel.json`:

| Runtime | Module | Docs |
|---------|--------|------|
| Bash | `vercel-bash` | https://github.com/importpw/vercel-bash |
| Deno | `vercel-deno` | https://github.com/vercel-community/deno |
| PHP | `vercel-php` | https://github.com/vercel-community/php |

## Bundle Size Limits

| Runtime | Max uncompressed size |
|---------|----------------------|
| Node.js, Edge, Bun, etc. | 250 MB |
| Python | 500 MB |

## Features

| Feature | Value |
|---------|-------|
| Default region | `iad1` (Washington D.C., USA) |
| Multi-region (Pro) | Up to 5 regions |
| Multi-region (Enterprise) | All regions |
| Isolation boundary | microVM |
| `/tmp` scratch space | 500 MB (read-only filesystem) |
| Concurrency (Hobby/Pro) | Auto-scales up to 30,000 |
| Concurrency (Enterprise) | Auto-scales up to 100,000+ |
| Cache (build artifacts) | Up to 100 MB per runtime |
| Env vars total per deployment | 64 KB |

## Archiving

| Deployment type | Archived after |
|----------------|---------------|
| Production | 2 weeks of no invocations |
| Preview | 48 hours of no invocations |

Archived functions incur at least 1 second additional cold start on next invocation.

## Functions per Deployment

| Plan | Limit |
|------|-------|
| Hobby | 12 functions (framework-dependent for Next.js/SvelteKit) |
| Pro / Enterprise | No limit |

## Notes

- Streaming supported by Node.js (default), Python, and Edge runtimes
- `waitUntil()` available for Node.js and Edge runtimes
- Cron jobs call a Vercel Function when triggered
- Edge Config allows low-latency reads at the edge without querying a database

## Related

- [node-js-runtime.md](./node-js-runtime.md)
- [edge-runtime.md](./edge-runtime.md)
- [configuring-functions.md](./configuring-functions.md)
- [limitations.md](./limitations.md)
