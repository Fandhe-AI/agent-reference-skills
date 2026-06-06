# Validation with Zod

Request body and query validation using `@hono/zod-validator`.

```ts
import { Hono } from 'hono'
import { zValidator } from '@hono/zod-validator'
import * as z from 'zod'

const app = new Hono()

// JSON body validation
const postSchema = z.object({
  title: z.string().min(1),
  body: z.string(),
})

app.post(
  '/posts',
  zValidator('json', postSchema),
  (c) => {
    const { title, body } = c.req.valid('json') // typed
    return c.json({ ok: true, title, body }, 201)
  }
)

// Query string validation
const searchSchema = z.object({
  q: z.string(),
  page: z.coerce.number().default(1),
})

app.get(
  '/search',
  zValidator('query', searchSchema),
  (c) => {
    const { q, page } = c.req.valid('query')
    return c.json({ q, page })
  }
)

// Multiple validators on one route
app.post(
  '/posts/:id/comment',
  zValidator('param', z.object({ id: z.string() })),
  zValidator('json', z.object({ content: z.string() })),
  (c) => {
    const { id } = c.req.valid('param')
    const { content } = c.req.valid('json')
    return c.json({ id, content }, 201)
  }
)

export default app
```

## Notes

- Use `c.req.valid(target)` to access validated data, not `c.req.json()` or `c.req.formData()`
- `zValidator` automatically returns 400 with Zod error details when validation fails
- Supported targets: `'json'`, `'form'`, `'query'`, `'param'`, `'header'`, `'cookie'`
- Install: `npm install @hono/zod-validator zod`
