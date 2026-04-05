# Validation

Input validation for Hono routes using built-in validators and third-party integrations.

## Signature / Usage

```ts
import { validator } from 'hono/validator'

app.post(
  '/posts',
  validator('form', (value, c) => {
    const body = value['body']
    if (!body || typeof body !== 'string') {
      return c.text('Invalid!', 400)
    }
    return { body }
  }),
  (c) => {
    const { body } = c.req.valid('form')
    return c.json({ message: 'Created!' }, 201)
  }
)
```

## Validation Targets

| Target | Description |
|--------|-------------|
| `'form'` | `application/x-www-form-urlencoded` or `multipart/form-data` |
| `'json'` | `application/json` request body |
| `'query'` | URL query string parameters |
| `'header'` | Request headers |
| `'param'` | Path parameters |
| `'cookie'` | Cookie values |

## Multiple Validators

Chain validators for different parts of the same request.

```ts
app.post(
  '/posts/:id',
  validator('param', ...),
  validator('query', ...),
  validator('json', ...),
  (c) => { /* all validated data available via c.req.valid() */ }
)
```

## Zod Integration (Manual)

```ts
import * as z from 'zod'

const schema = z.object({ body: z.string() })

app.post(
  '/posts',
  validator('form', (value, c) => {
    const parsed = schema.safeParse(value)
    if (!parsed.success) {
      return c.text('Invalid!', 400)
    }
    return parsed.data
  }),
  (c) => { /* handler */ }
)
```

## Zod Validator Middleware

Install `@hono/zod-validator` for a simpler API.

```ts
import { zValidator } from '@hono/zod-validator'
import * as z from 'zod'

app.post(
  '/posts',
  zValidator('form', z.object({ body: z.string() })),
  (c) => {
    const { body } = c.req.valid('form')
    return c.json({ message: 'Created!' }, 201)
  }
)
```

## Standard Schema Validator Middleware

`@hono/standard-validator` supports any Standard Schema-compatible library (Zod, Valibot, ArkType).

```ts
import { sValidator } from '@hono/standard-validator'
import * as z from 'zod'

const schema = z.object({ name: z.string(), age: z.number() })

app.post('/author', sValidator('json', schema), (c) => {
  const data = c.req.valid('json')
  return c.json({ success: true, message: `${data.name} is ${data.age}` })
})
```

## Notes

- `json` and `form` validators require the correct `Content-Type` header on the request; without it the body is empty.
- Header names must be **lowercase** when used as validation keys (e.g., `'idempotency-key'`, not `'Idempotency-Key'`).
- Validated data is accessed via `c.req.valid(target)` in the handler — not `c.req.json()` or `c.req.formData()`.

## Related

- [rpc.md](./rpc.md)
- [testing.md](./testing.md)
