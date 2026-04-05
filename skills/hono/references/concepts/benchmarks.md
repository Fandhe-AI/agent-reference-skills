# Benchmarks

Hono publishes benchmark results comparing its routing speed and request handling efficiency against other JavaScript routers and web frameworks across multiple runtimes.

## Methodology

- Registers a realistic set of routes (12 total) across each router implementation
- Tests route types: static paths, dynamic routes with parameters, mixed static/dynamic, POST requests, deeply nested routes, and wildcard patterns
- Runs on Node.js, Bun, Cloudflare Workers, and Deno
- Uses standardized load-testing tools (e.g., `bombardier`)

## Notes

- Hono claims to be **the fastest** framework for Cloudflare Workers and Deno environments
- For Bun, Hono is described as **one of the fastest** frameworks
- Compared implementations include: `@medley/router`, `find-my-way`, `koa-tree-router`, `trek-router`, `express`, `koa-router`, `itty-router`, `sunder`, `worktop`, and Deno-native frameworks
- The `RegExpRouter` (single-pass RegExp matching) is the primary driver of Hono's routing performance advantage

## Related

- [Routers](./routers.md)
- [Motivation](./motivation.md)
