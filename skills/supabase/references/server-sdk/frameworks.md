# Framework bridges

`@supabase/server` middleware runs inside Hono, H3, Elysia, NestJS, and TanStack Start through a bridge: one file you copy into your project.

## Signature / Usage

The bridge runs a `@supabase/middleware` entry array in the framework's own middleware slot. Your route handlers then read `supabase`, `jwtClaims`, and any other key the entries contribute from the place your framework keeps per-request state.

The framework adapters (`@supabase/server/adapters/*`) predate the middleware engine. They are deprecated and will be removed on December 1, 2026. The bridges on this page replace them. If you use an adapter today, read "Moving off the adapters" (migrating-off-adapters.md) before you change anything. One step in that migration can open an endpoint up without an error.

The bridges need `@supabase/server` 1.6.0 or later and Node 22 or later. `withRequiredClaims` shipped in 1.5.1 and the entry form of `withSupabase` in 1.6.0. Releases before 1.5.1 have no `/middleware/*` exports.

The bridge file imports `@supabase/middleware`, so add it to your project as a direct dependency. `@supabase/server` depends on it, but a strict package manager such as pnpm does not let your code import a transitive dependency.

The bridge files live in the server repository under `examples/frameworks` (https://github.com/supabase/server/tree/main/examples/frameworks), next to a minimal app for each. Copy the file for your framework as is, comments included. Some lines look redundant and are not. The comments say why.

### What a bridge gives you

An entry does three jobs. How many of them survive depends on the framework.

- Context. The entries contribute typed keys such as `supabase` and `jwtClaims`, and your handler reads them.
- Short-circuit. An entry can return a `Response`, and your route never runs. That is how `withRequiredClaims` rejects a request.
- Response phase. An entry written as `async function*` can `yield`, see the response on the way out, and rewrite it. `withCors` needs this to stamp headers.

| Framework | Context | Short-circuit | Response phase | Pattern |
| --- | --- | --- | --- | --- |
| Hono | Yes | Yes | Yes | middleware slot |
| H3 / Nuxt | Yes | Yes | Yes | middleware slot |
| Elysia | Yes | Yes | Yes | wrap `app.handle` |
| NestJS | Yes | Yes | No | guard |
| TanStack Start | Yes | Yes | Yes | middleware slot |

If you only read `supabase` inside a handler, every row works for you. Ignore the response-phase column.

Each bridge folds the entry array once, when you call it, so entries keep their state across requests. Each bridge also checks the array at compile time. Two entries that contribute the same key, or an entry whose prerequisite is missing, fail to compile at the call site.

A gated group of routes takes `withRequiredClaims()` and a public group takes `withClaims()`. The two cannot share an array, because both contribute `jwtClaims`. Each framework scopes an array to a group of routes in its own way.

| Framework | One array per route group |
| --- | --- |
| Hono | One sub-app per array, mounted with `app.route()`. A second `app.use()` statement is not enough. |
| H3 / Nuxt | `app.use('/path', toH3(entries))` before the routes under that path |
| Elysia | One Elysia instance per array, each wrapped with `wrapElysia`, behind a fetch handler that dispatches by path |
| NestJS | `@UseGuards()` on the controller or the handler |
| TanStack Start | `.middleware([...])` on each server function or server route |

### Hono

Copy `hono/supabase-middleware.ts` into your project. `toHono` returns Hono middleware. Register it with `.use()` in a chain, and the contributed keys type through to `c.var` with no `Env` declaration of your own. Register it before the routes it gates. Hono applies middleware only to routes added after it, so a route added first runs with no gate and no error. `withSupabaseClient()` threads the generic through, so `c.var.supabase` is a `SupabaseClient`.

Hono carries the contributed keys through the return value of a chained call. `app.use(...)` on one line and `app.get(...)` on the next typecheck the middleware but leave `c.var` untyped. The gate still runs, so a failing typecheck is the only signal. A second array for other routes goes in its own sub-app, mounted with `app.route()`. Each sub-app chains its own `.use()` into its routes.

One line in the bridge looks redundant: `c.res` is cleared before it is assigned. When a response-phase entry returns a new `Response`, Hono's `res` setter copies the previous response's headers onto it, which reverts any header the entry rewrote. Clearing first makes the assignment final. Keep the line and its comment.

On Cloudflare Workers the bridge seeds the pipeline with `c.env`, so `getEnv` inside the entries reads your bindings.

```ts
import { Hono } from 'hono'
import { withRequiredClaims } from '@supabase/server/middleware/required-claims'
import { withSupabaseClient } from '@supabase/server/middleware/client'

import { toHono } from './lib/supabase-middleware.js'

const app = new Hono()
  .use('*', toHono([withRequiredClaims(), withSupabaseClient()]))
  .get('/todos', async (c) => {
    const { data, error } = await c.var.supabase.from('todos').select()
    if (error) return c.json({ error: error.message }, 500)
    return c.json(data)
  })
  .get('/me', (c) => c.json({ id: c.var.jwtClaims.sub }))

export default { fetch: app.fetch }
```

```ts
import { withClaims } from '@supabase/server/middleware/claims'

const me = new Hono()
  .use('*', toHono([withRequiredClaims(), withSupabaseClient()]))
  .get('/', (c) => c.json({ id: c.var.jwtClaims.sub }))

const feed = new Hono()
  .use('*', toHono([withClaims(), withSupabaseClient()]))
  .get('/', (c) => c.json({ anonymous: c.var.jwtClaims === null }))

const app = new Hono().route('/me', me).route('/feed', feed)
```

### H3 / Nuxt

Copy `h3/supabase-middleware.ts` into your project. `toH3` returns H3 middleware. H3 middleware return the response directly, so no workaround is needed.

`event.context` is not generic. Hoist the entry array to a `const` and read the keys through `Contributions<typeof entries>` from `@supabase/middleware`, or wrap that in a small typed accessor of your own.

```ts
import { H3 } from 'h3'
import type { Contributions } from '@supabase/middleware'
import { withRequiredClaims } from '@supabase/server/middleware/required-claims'
import { withSupabaseClient } from '@supabase/server/middleware/client'

import { toH3 } from './lib/supabase-middleware.js'

const entries = [withRequiredClaims(), withSupabaseClient()] as const

const app = new H3()
app.use(toH3(entries))

app.get('/todos', async (event) => {
  const { supabase } = event.context as Contributions<typeof entries>
  const { data, error } = await supabase.from('todos').select()
  if (error) throw error
  return data
})

export default { fetch: app.fetch }
```

### Elysia

Copy `elysia/supabase-middleware.ts` into your project. Elysia's lifecycle hooks run in the request phase only. A `.resolve()` hook has no `next()` and never sees the outgoing response. So `wrapElysia` composes the entries around `app.handle`, and `supabaseCtx()` is a plugin that hands the context back to your routes per request.

`supabaseCtx<typeof entries>()` types the route context. Pass the same tuple type that `wrapElysia` receives. Because the entries wrap the whole app, they apply app-wide. A second array for other routes needs its own Elysia instance, wrapped separately, with a fetch handler in front that dispatches by path to the wrapped apps.

The two functions work only as a pair. If you serve the app without `wrapElysia`, with `app.listen()` or `export default app`, the entries never run and `supabaseCtx()` throws on every route.

```ts
import { Elysia } from 'elysia'
import { withRequiredClaims } from '@supabase/server/middleware/required-claims'
import { withSupabaseClient } from '@supabase/server/middleware/client'

import { supabaseCtx, wrapElysia } from './lib/supabase-middleware.js'

const entries = [withRequiredClaims(), withSupabaseClient()] as const

const app = new Elysia()
  .use(supabaseCtx<typeof entries>())
  .get('/todos', async (c) => {
    const { data, error } = await c.supabase.from('todos').select()
    if (error) throw error
    return data
  })

export default {
  fetch: wrapElysia(entries, (req) => app.handle(req)),
}
```

### NestJS

Copy `nestjs/supabase.guard.ts` into your project. `toNestGuard` returns a guard class. A guard covers context and short-circuit. The response phase is not available: Nest's interceptors receive the controller's return value, not a `Response`, so an entry's `yield` has nothing to act on. `withCors` in the array stamps a short-circuit only: the 401 carries the headers and a successful response does not. A preflight never reaches a guard either. Guards run after routing, and no `OPTIONS` route exists, so the preflight 404s. CORS on Nest is `app.enableCors()`. Leave `withCors` out of the guard's array.

Call `toNestGuard` once and reuse the class on every route, so the pipeline folds once. On a short-circuit the guard copies the entry's headers onto the response, then throws an `HttpException` with the entry's status and its `{ message, code }` body. The bridge builds a Web `Request` from Nest's request with the headers and method. The body is not forwarded. An entry that reads it sees an empty body and runs as if that were the payload, so a signature check or a body audit in the array passes with nothing checked. Put those in Nest middleware. A contribution whose key matches a property Nest's request already has, such as `body` or `query`, throws instead of overwriting it. `Injectable()` is applied as a call, so the file works without a decorator transform. The controller does not. Nest is built on decorators, so running the example needs swc, ts-node, or a build step. Node's built-in type stripping rejects the `@Controller()` line. Nest also answers a `POST` with 201 by default, where the other frameworks answer 200.

```ts
import { Controller, Get, Req, UseGuards } from '@nestjs/common'
import type { Contributions } from '@supabase/middleware'
import { withRequiredClaims } from '@supabase/server/middleware/required-claims'
import { withSupabaseClient } from '@supabase/server/middleware/client'

import { toNestGuard } from './lib/supabase.guard.js'

const entries = [withRequiredClaims(), withSupabaseClient()] as const
const SupabaseGuard = toNestGuard(entries)

@Controller('todos')
export class TodosController {
  @Get()
  @UseGuards(SupabaseGuard)
  async list(@Req() req: Contributions<typeof entries>) {
    const { data, error } = await req.supabase.from('todos').select()
    if (error) throw error
    return data
  }
}
```

### TanStack Start

TanStack Start never had an adapter, so this section is integration guidance. The migration steps in migrating-off-adapters.md do not apply to it. Copy `tanstack-start/supabase-middleware.ts` into your project. `toTanStackStart` returns a request middleware.

`request` is already a Web `Request`, and `next()` resolves to an object carrying the downstream `Response`, so the fit is close. Two details in the bridge carry the typing. `.server<Contributions>` is what types `context` downstream; the generic has no constraint, so leaving it off types the context as `undefined`. And `<const Entries>` keeps the tuple, so every `context.*` read stays typed.

The engine buffers a request body only when it seeds the context itself. The bridge seeds, so it buffers too, and it does so in place. `next()` accepts `context` only, so the bridge cannot hand a different `Request` downstream, and Start gives the route handler the same object the middleware saw. The bridge installs cached readers on that object, and an entry and the handler read the same body.

`createMiddleware({ type: 'request' })` is the right kind here. Its server function may return a `Response`, which is what lets an entry short-circuit, and `createServerFn().middleware([...])` accepts request middleware.

On a server function, Start's fetcher returns any `application/json` body as the call's value without checking the status. It checks `response.ok` only when the body is not JSON. A 401 from `withRequiredClaims()` would resolve the caller's promise with `{ message, code }` where it expects its own result type: the same silent-200 class of failure as the auth trap, one layer further out. So when an entry short-circuits on a server function, the bridge rethrows it as an error carrying `status` and `code`. Server routes get the `Response` back unchanged.

The file that calls `.middleware([...])` ships to the client, so the entry modules it references are client-reachable. Read configuration through `getEnv` per request and keep secrets out of module scope.

Vite's dev server answers CORS on its own. A route with no `withCors` entry works in development and fails once the app is built and served. Compose `withCors` on every route a browser calls, and check the preflight against a production build.

```ts
import { createServerFn } from '@tanstack/react-start'
import { withRequiredClaims } from '@supabase/server/middleware/required-claims'
import { withSupabaseClient } from '@supabase/server/middleware/client'

import { toTanStackStart } from './lib/supabase-middleware.js'

const supabase = toTanStackStart([withRequiredClaims(), withSupabaseClient()])

export const getTodos = createServerFn()
  .middleware([supabase])
  .handler(async ({ context }) => {
    const { data, error } = await context.supabase.from('todos').select()
    if (error) throw error
    return data
  })

export const whoAmI = createServerFn()
  .middleware([supabase])
  .handler(async ({ context }) => ({ id: context.jwtClaims.sub }))
```

## Notes

- Source: https://supabase.com/docs/reference/server/frameworks (original: https://supabase.com/llms/server.txt, fetched 2026-10)
- If you use an adapter today, read the auth trap in migrating-off-adapters.md first (an endpoint can be opened up without an error).
- The TanStack Start bridge is a Supabase-side bridge implementation, separate from the `createServerFn` / middleware APIs of the TanStack Start skill.

## Related

- [migrating-off-adapters](./migrating-off-adapters.md)
- [middleware](./middleware.md)
- [adapters](./adapters.md)
