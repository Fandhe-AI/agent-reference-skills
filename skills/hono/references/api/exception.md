# HTTPException

A specialized `Error` subclass for throwing HTTP errors with a status code, human-readable message, optional custom `Response`, and an optional `cause`.

## Signature / Usage

```ts
import { HTTPException } from 'hono/http-exception'

throw new HTTPException(401, { message: 'Unauthorized' })
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `status` | `number` (1st arg) | HTTP status code |
| `message` | `string` | Short error message for simple responses |
| `res` | `Response` | Custom `Response` object (overrides `message`) |
| `cause` | `unknown` | Arbitrary value attached as `Error.cause` |

## Throwing

### With a message

```ts
throw new HTTPException(401, { message: 'Unauthorized' })
```

### With a custom Response

Use when you need non-standard headers or a structured body.

```ts
const errorResponse = new Response('Unauthorized', {
  status: 401,
  headers: { Authenticate: 'error="invalid_token"' },
})
throw new HTTPException(401, { res: errorResponse })
```

### With a cause

Chain to the original error for debugging.

```ts
try {
  await authorize(c)
} catch (cause) {
  throw new HTTPException(401, { message: 'Unauthorized', cause })
}
```

## Handling

Use `app.onError()` to intercept `HTTPException` instances. Call `err.getResponse()` to convert the exception into a `Response`.

```ts
app.onError((err, c) => {
  if (err instanceof HTTPException) {
    return err.getResponse()
  }
  console.error(err)
  return c.text('Internal Server Error', 500)
})
```

## Notes

- `getResponse()` is not context-aware; manually merge context-specific headers into the returned `Response` if needed
- When `res` is provided, `getResponse()` returns that `Response` directly

## Related

- [hono.md](./hono.md)
- [context.md](./context.md)
