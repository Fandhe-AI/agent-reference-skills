# Runtimes

Runtimes transform source code into Vercel Functions. Each runtime provides different APIs, performance characteristics, and trade-offs.

## Official Runtimes

| Runtime | Description |
|---------|-------------|
| [Node.js](./node-js-runtime.md) | Full Node.js API access; JS/TS; bundles up to 250 MB |
| [Bun](./bun-runtime.md) (Beta) | Takes a Bun function entrypoint, builds its dependencies and bundles them into a Vercel Function |
| [Python](./python-runtime.md) | Runs ASGI and WSGI applications such as FastAPI, Flask, and Django as Vercel Functions; bundles up to 500 MB. Generally available (changelog 2026-10-15) |
| [Rust](./rust-runtime.md) (Beta) | Uses `vercel_runtime` crate; compiled to Vercel Function |
| [Go](./go-runtime.md) (Beta) | Single HTTP handler |
| [Ruby](./ruby-runtime.md) (Beta) | Single HTTP handler |
| [Wasm](./wasm-runtime.md) | Pre-compiled WebAssembly |
| [Edge](./edge-runtime.md) | V8-based; no container/VM; runs closest to user |
| [Container](./container-runtime.md) (Beta) | Runs any code and library from an OCI container image built from a `Dockerfile.vercel` file |

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
| Node.js, Bun, Python with [Large functions](./limitations.md) (Beta) | Up to 5 GB (requires Fluid compute with Active CPU) |

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
- Global Config (formerly Edge Config) allows low-latency reads at the edge without querying a database
- Availability labels come from each runtime's docs banner: Go, Ruby, Rust, Bun and Container show "(Beta) is available on all plans"; Node.js, Python, Wasm and Edge have no Beta banner
- Related pages: [functions-api-reference.md](./functions-api-reference.md), [vercel-sdk-python.md](./vercel-sdk-python.md), [concurrency-scaling.md](./concurrency-scaling.md), [websockets.md](./websockets.md)

## Related

- [node-js-runtime.md](./node-js-runtime.md)
- [edge-runtime.md](./edge-runtime.md)
- [configuring-functions.md](./configuring-functions.md)
- [limitations.md](./limitations.md)
