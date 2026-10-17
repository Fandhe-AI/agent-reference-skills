# Bun Runtime

Bun runtime (Beta, all plans) for Vercel Functions: an all-in-one JavaScript runtime alternative to Node.js. Configured with `bunVersion` in `vercel.json`.

## Signature / Usage

```json
{
  "$schema": "https://openapi.vercel.sh/vercel.json",
  "bunVersion": "1.4.x"
}
```

```ts
// server.ts — Bun framework preset
Bun.serve({
  routes: {
    '/health': () => Response.json({ status: 'ok' }),
  },
  fetch() {
    return new Response('Hello from Bun on Vercel');
  },
});
```

## Options / Props

`bunVersion` values (Vercel manages patch versions automatically):

| Value | Description |
|-------|-------------|
| `"1.4.x"` | Complete rewrite of Bun from Zig to Rust, with several breaking changes. Set explicitly once the app is migrated |
| `"1.x"` | Previous latest Bun version (currently `1.3.14`) |

## Deployment models

| Model | Requirements | Routing |
|-------|--------------|---------|
| Bun framework preset | `bunVersion`, `bun.lock`, `server.{js,cjs,mjs,ts,cts,mts}` in project root or `src/` | One `Bun.serve()` server routes all requests |
| `api/server.ts` | `bunVersion` only (no preset, no `bun.lock`) | Only `/api/server` |

```ts
// api/server.ts
Bun.serve({
  fetch(request) {
    const url = new URL(request.url);

    return Response.json({
      message: 'Hello from Bun on Vercel',
      pathname: url.pathname,
    });
  },
});
```

## Notes

- Call `Bun.serve()` once during module startup; supported options are `fetch`, `routes`, `error`, and `websocket`
- `port` and `hostname` only apply locally; Unix sockets and HTML imports in `routes` are not supported
- With Bun 1.2+, run `bun install` to create `bun.lock`; for older versions `bun install --save-text-lockfile`. The preset does not detect legacy `bun.lockb`
- Custom routing with an `/api` server needs route overrides in `vercel.json` using the full path including `/api/server`
- Next.js with ISR: change scripts to `"dev": "bun run --bun next dev"` and `"build": "bun run --bun next build"`
- Routing Middleware works like the Node.js runtime once `bunVersion` is set; also set the runtime config to `nodejs` in `middleware.ts`
- Large functions (uncompressed bundles up to 5 GB) and extended max duration (up to 30 minutes) are supported, both in beta
- Differences from Node.js: no automatic source maps, no bytecode caching, no request metrics on `node:http` / `node:https` (`fetch` metrics work with both)
- Both runtimes run on Fluid compute
- WebSocket handling with `Bun.serve()` is covered in websockets.md
- Source: https://vercel.com/docs/functions/runtimes/bun

## Related

- [websockets.md](./websockets.md)
- [node-js-runtime.md](./node-js-runtime.md)
- [wasm-runtime.md](./wasm-runtime.md)
- [runtimes.md](./runtimes.md)
