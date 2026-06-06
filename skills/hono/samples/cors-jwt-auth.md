# CORS and JWT Authentication

Applying CORS and JWT middleware to protect API routes.

```ts
import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { jwt } from 'hono/jwt'
import type { JwtVariables } from 'hono/jwt'

type Env = { Variables: JwtVariables }

const app = new Hono<Env>()

// CORS must be registered before routes
app.use('/api/*', cors({
  origin: ['https://app.example.com', 'https://admin.example.com'],
  allowMethods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
}))

// JWT validation for protected routes
app.use('/api/private/*', jwt({ secret: process.env.JWT_SECRET! }))

// Public route
app.get('/api/public', (c) => c.json({ message: 'Public data' }))

// Protected route — JWT payload is available via c.get('jwtPayload')
app.get('/api/private/profile', (c) => {
  const payload = c.get('jwtPayload')
  return c.json({ sub: payload.sub, email: payload.email })
})

export default app
```

## Notes

- CORS middleware must be registered before route definitions; order matters
- JWT middleware responds with `401` automatically when the token is missing or invalid
- The `Authorization` header must use the `Bearer <token>` scheme
- Use a dynamic `origin` callback (`(origin, c) => string`) to allow origins stored in `c.env`
