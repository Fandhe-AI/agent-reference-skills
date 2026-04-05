# Presets

Hono ships three preset entry points that differ only in the underlying router implementation. All expose the same `Hono` class API.

## Signature / Usage

```ts
import { Hono } from 'hono'         // default — SmartRouter (RegExpRouter + TrieRouter)
import { Hono } from 'hono/quick'   // SmartRouter (LinearRouter + TrieRouter)
import { Hono } from 'hono/tiny'    // PatternRouter
```

## Options / Props

| Preset | Router | Best for |
|--------|--------|----------|
| `hono` | SmartRouter (RegExpRouter + TrieRouter) | Long-running servers; best runtime performance after warm-up |
| `hono/quick` | SmartRouter (LinearRouter + TrieRouter) | Environments where the app is re-initialized per request (edge functions) |
| `hono/tiny` | PatternRouter | Resource-constrained environments; smallest bundle size |

## Notes

- `hono` (default) is recommended for most use cases: Cloudflare Workers, Bun, Deno, Node.js, Fastly Compute
- `hono/quick` prioritizes fast startup over peak throughput — suited to request-per-initialization runtimes
- `hono/tiny` trades routing capability for minimal overhead; not suitable for complex routing needs
- The API surface is identical across all three presets; switching is a one-line import change

## Related

- [hono.md](./hono.md)
