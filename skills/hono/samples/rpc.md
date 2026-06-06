# RPC

Type-safe client-server communication by sharing API types via `hono/client`.

```ts
// server.ts
import { Hono } from 'hono'
import { zValidator } from '@hono/zod-validator'
import * as z from 'zod'

const app = new Hono()
  .get('/posts', (c) => c.json([{ id: 1, title: 'Hello' }]))
  .post(
    '/posts',
    zValidator('form', z.object({ title: z.string(), body: z.string() })),
    (c) => {
      const { title, body } = c.req.valid('form')
      return c.json({ ok: true, message: 'Created!' }, 201)
    }
  )
  .get('/posts/:id', (c) => c.json({ id: c.req.param('id') }))

export type AppType = typeof app
export default app
```

```ts
// client.ts
import type { AppType } from './server'
import { hc } from 'hono/client'

const client = hc<AppType>('http://localhost:8787/')

// GET /posts
const listRes = await client.posts.$get()
const posts = await listRes.json() // typed as { id: number; title: string }[]

// POST /posts
const createRes = await client.posts.$post({
  form: { title: 'Hello', body: 'Hono is cool' },
})
if (createRes.ok) {
  const data = await createRes.json() // typed
  console.log(data.message)
}

// GET /posts/:id
const postRes = await client.posts[':id'].$get({ param: { id: '1' } })
```

## Notes

- Route chaining on a single `app` instance (`.get().post()...`) is required for RPC types to work
- Set `"strict": true` in `tsconfig.json` on both server and client sides
- Use `c.json({ ... }, 404)` for error responses instead of `c.notFound()` to preserve type inference
- `InferRequestType` and `InferResponseType` helpers extract request/response types from client methods
