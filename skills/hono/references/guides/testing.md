# Testing

Testing Hono applications using `app.request()` and the typed test client.

## Core Method: app.request()

Pass a path (or full `Request`) to `app.request()` and assert on the returned `Response`. No HTTP server is needed.

```ts
import { describe, expect, test } from 'vitest'
import app from './app'

test('GET /posts', async () => {
  const res = await app.request('/posts')
  expect(res.status).toBe(200)
  expect(await res.text()).toBe('Many posts')
})
```

## POST with JSON Body

```ts
test('POST /posts with JSON', async () => {
  const res = await app.request('/posts', {
    method: 'POST',
    body: JSON.stringify({ message: 'hello hono' }),
    headers: new Headers({ 'Content-Type': 'application/json' }),
  })
  expect(res.status).toBe(201)
})
```

## POST with FormData

```ts
test('POST /posts with FormData', async () => {
  const formData = new FormData()
  formData.append('message', 'hello')
  const res = await app.request('/posts', {
    method: 'POST',
    body: formData,
  })
  expect(res.status).toBe(201)
})
```

## Using a Request Instance

```ts
test('POST /posts', async () => {
  const req = new Request('http://localhost/posts', { method: 'POST' })
  const res = await app.request(req)
  expect(res.status).toBe(201)
})
```

## Mocking Environment Variables

Pass mock bindings (Cloudflare Workers env, D1, KV, etc.) as the third argument.

```ts
const MOCK_ENV = {
  API_HOST: 'example.com',
  DB: {
    prepare: () => ({ /* mocked D1 */ }),
  },
}

test('GET /posts with env', async () => {
  const res = await app.request('/posts', {}, MOCK_ENV)
  expect(res.status).toBe(200)
})
```

## Typed Test Client

Use the RPC `hc` client with the exported app type for end-to-end type-safe tests. See the testing helper documentation for details.

## Notes

- Always set `Content-Type: application/json` when sending JSON; without it Hono cannot parse the body.
- For Cloudflare Workers, the recommended test runner is Vitest with `@cloudflare/vitest-pool-workers`.
- `app.request()` accepts either a path string or a full `Request` object.

## Related

- [rpc.md](./rpc.md)
- [validation.md](./validation.md)
