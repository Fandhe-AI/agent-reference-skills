# Testing

Testing Hono routes with `app.request()` — no HTTP server required.

```ts
// app.ts
import { Hono } from 'hono'

const app = new Hono()

app.get('/posts', (c) => c.json([{ id: 1 }]))
app.post('/posts', async (c) => {
  const body = await c.req.json()
  return c.json({ ok: true, title: body.title }, 201)
})

export default app
```

```ts
// app.test.ts
import { describe, expect, test } from 'vitest'
import app from './app'

describe('GET /posts', () => {
  test('returns 200 with array', async () => {
    const res = await app.request('/posts')
    expect(res.status).toBe(200)
    expect(await res.json()).toEqual([{ id: 1 }])
  })
})

describe('POST /posts', () => {
  test('creates a post', async () => {
    const res = await app.request('/posts', {
      method: 'POST',
      body: JSON.stringify({ title: 'Hello' }),
      headers: new Headers({ 'Content-Type': 'application/json' }),
    })
    expect(res.status).toBe(201)
    const data = await res.json()
    expect(data.ok).toBe(true)
  })

  test('with FormData', async () => {
    const form = new FormData()
    form.append('title', 'Hello')
    const res = await app.request('/posts', { method: 'POST', body: form })
    expect(res.status).toBe(201)
  })
})

// Mocking Cloudflare Workers bindings
test('GET /posts with env binding', async () => {
  const MOCK_ENV = {
    DB: { prepare: () => ({ all: async () => ({ results: [] }) }) },
  }
  const res = await app.request('/posts', {}, MOCK_ENV)
  expect(res.status).toBe(200)
})
```

## Notes

- `app.request()` accepts a path string, full URL, or `Request` object
- Always set `Content-Type: application/json` when sending JSON; Hono cannot parse the body without it
- Pass mock bindings as the third argument to simulate Cloudflare Workers environment (KV, D1, etc.)
- For Cloudflare Workers, the recommended test runner is Vitest with `@cloudflare/vitest-pool-workers`
