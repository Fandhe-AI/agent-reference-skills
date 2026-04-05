# Timeout Middleware

Rejects requests that exceed a specified duration. Throws an `HTTPException` (default `504`) on timeout.

## Signature / Usage

```ts
import { timeout } from 'hono/timeout'
import { HTTPException } from 'hono/http-exception'

app.use('/api', timeout(5000))

// With custom error
app.use('/api/long-process', timeout(60000, (c) =>
  new HTTPException(408, { message: 'Request timeout. Please try again later.' })
))
```

## Options / Props

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `duration` | `number` | Yes | Timeout duration in milliseconds |
| `customException` | `(c) => HTTPException` | No | Factory function returning a custom `HTTPException` on timeout |

## Notes

- The `customException` can be a factory function or a static `HTTPException` instance.
- Timeout middleware cannot be used with streaming responses. For streams, use `setTimeout` and `stream.close()` manually.
- Be cautious of middleware ordering when combining with error-handling middleware.
