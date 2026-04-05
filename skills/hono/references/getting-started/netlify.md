# Netlify

Deploy Hono to Netlify Edge Functions. Edge Functions run on Deno and are written in TypeScript.

## Signature / Usage

```ts
// netlify/edge-functions/index.ts
import { Hono } from 'jsr:@hono/hono'
import { handle } from 'jsr:@hono/hono/netlify'

const app = new Hono()
app.get('/', (c) => c.text('Hello Hono!'))

export default handle(app)
```

**Accessing Netlify Context:**

```ts
import type { Context } from 'https://edge.netlify.com/'

export type Env = { Bindings: { context: Context } }

const app = new Hono<Env>()

app.get('/country', (c) =>
  c.json({ 'You are in': c.env.context.geo.country?.name })
)
```

## Notes

- Import Hono from `jsr:@hono/hono` (JSR registry) for Netlify Edge Functions
- `handle(app)` wraps the Hono app for the Edge Functions export format
- Netlify Context (geo, etc.) is accessible via `c.env.context`
- Dev server: `netlify dev` on port `8888`; deploy: `netlify deploy --prod`

## Related

- [Basic](./basic.md)
- [Deno](./deno.md)
