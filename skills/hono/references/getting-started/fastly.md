# Fastly Compute

Deploy Hono to Fastly Compute using `@fastly/hono-fastly-compute`.

## Signature / Usage

```ts
import { Hono } from 'hono'
import { fire } from '@fastly/hono-fastly-compute'

const app = new Hono()
app.get('/', (c) => c.text('Hello Fastly!'))

fire(app)
```

**With Fastly resource bindings (KV Store, Config Store, etc.):**

```ts
import { buildFire } from '@fastly/hono-fastly-compute'

const fire = buildFire({
  siteData: 'KVStore:site-data',
})

const app = new Hono<{ Bindings: typeof fire.Bindings }>()

app.put('/upload/:key', async (c) => {
  const key = c.req.param('key')
  await c.env.siteData.put(key, c.req.body)
  return c.text(`Put ${key} successfully!`)
})

fire(app)
```

## Notes

- When using `fire()` at the top level, import `Hono` from `'hono'`, **not** `'hono/quick'`; `fire` builds the router during initialization
- Use `buildFire()` instead of `fire()` when you need access to Fastly resources (KV Stores, Config Stores, Secrets)
- Resources are accessed via `c.env` with their SDK types
- Dev server runs on port `7676`; deploy with the Fastly CLI

## Related

- [Basic](./basic.md)
