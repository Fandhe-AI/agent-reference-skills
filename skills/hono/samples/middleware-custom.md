# Custom Middleware

Creating reusable middleware with typed context variables using `createMiddleware`.

```ts
import { Hono } from 'hono'
import { createMiddleware } from 'hono/factory'

// Reusable logger middleware
const logger = createMiddleware(async (c, next) => {
  console.log(`[${c.req.method}] ${c.req.url}`)
  await next()
  console.log(`-> ${c.res.status}`)
})

// Middleware that injects typed variables
const authMiddleware = createMiddleware<{
  Variables: {
    userId: string
  }
}>(async (c, next) => {
  const token = c.req.header('Authorization')
  if (!token) {
    return c.text('Unauthorized', 401)
  }
  c.set('userId', 'user-123') // type-safe
  await next()
})

const app = new Hono()

app.use('*', logger)

app.use('/api/*', authMiddleware)

app.get('/api/me', (c) => {
  const userId = c.var.userId // typed as string
  return c.json({ userId })
})

export default app
```

## Notes

- Call `await next()` to continue the chain; omitting it short-circuits (useful for auth guards)
- Declare `Variables` in the `createMiddleware` generic to get typed `c.set()` / `c.var` access
- Code before `await next()` runs on the way in; code after runs on the way out
- Do not wrap `next()` in try/catch — Hono handles errors automatically
