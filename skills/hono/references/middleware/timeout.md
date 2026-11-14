# Timeout Middleware

Rejects requests that exceed a specified duration. Throws an `HTTPException` (default `504`) on timeout.

## Signature / Usage

```ts
import { timeout } from 'hono/timeout'
import { HTTPException } from 'hono/http-exception'

app.use('/api/*', timeout(5000))

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
- The path must be a wildcard such as `/api/*` to cover sub-paths (the official example was corrected from `/api`).
### Fresh error stacks

Use a factory when timeout errors are reported to an observability service; passing an exception instance reuses its construction-time stack for every timeout, which can affect stack attribution and error fingerprinting.

```ts
timeout(
  5000,
  () => new HTTPException(504, { message: 'Gateway Timeout' })
)
```
- Source: https://hono.dev/docs/middleware/builtin/timeout (honojs/website@20aab4e0, retrieved 2026-11-14)
