# Adapter Helper

Runtime-agnostic utilities for accessing environment variables and identifying the current runtime.

## Signature / Usage

```ts
import { env, getRuntimeKey } from 'hono/adapter'

// Retrieve env vars regardless of runtime
app.get('/', (c) => {
  const { NAME } = env<{ NAME: string }>(c)
  return c.text(NAME)
})

// Branch on runtime
if (getRuntimeKey() === 'workerd') {
  // Cloudflare Workers specific logic
}
```

## Options / Props

### `env(c, runtime?)`

| Parameter | Type | Description |
|-----------|------|-------------|
| `c` | `Context` | Hono context |
| `runtime` | `string` (optional) | Force a specific runtime key (e.g., `'workerd'`) |

Returns: generic `T` — the environment bindings object.

### `getRuntimeKey()`

Returns: `string` — one of `workerd`, `deno`, `bun`, `node`, `edge-light`, `fastly`, `other`.

## Notes

- The shape of the value returned by `env(c)` differs per runtime (e.g., `process.env` on Node, `c.env` on Cloudflare Workers)
- Supported platforms: Cloudflare Workers, Deno, Bun, Node.js, Vercel, AWS Lambda, Lambda@Edge, Fastly Compute, Netlify

## Related

- [Proxy Helper](./proxy.md)
- [ConnInfo Helper](./conninfo.md)
