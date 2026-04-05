# Context Storage Middleware

Stores the Hono `Context` in `AsyncLocalStorage`, enabling access to it outside of request handlers (e.g. in service functions).

## Signature / Usage

```ts
import { contextStorage, getContext } from 'hono/context-storage'

type Env = { Variables: { message: string }; Bindings: { KV: KVNamespace } }

const app = new Hono<Env>()
app.use(contextStorage())
app.use(async (c, next) => { c.set('message', 'Hello'); await next() })

// Accessible anywhere in the call stack
const getMessage = () => getContext<Env>().var.message
```

## Functions

| Function | Signature | Description |
|----------|-----------|-------------|
| `contextStorage()` | `contextStorage()` | Middleware that enables global context access; no parameters |
| `getContext<Env>()` | `() => Context<Env>` | Returns the current Context; throws if unavailable |
| `tryGetContext<Env>()` | `() => Context<Env> \| undefined` | Returns Context or `undefined` (safe version of `getContext`) |

## Notes

- Requires `AsyncLocalStorage` support from the runtime.
- On Cloudflare Workers, add `nodejs_compat` or `nodejs_als` compatibility flag to `wrangler.toml`.
- Use `tryGetContext` when the function may be called outside of a request context.
