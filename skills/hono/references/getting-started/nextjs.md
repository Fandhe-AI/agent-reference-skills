# Next.js

Embed Hono inside a Next.js application using catch-all routes. Supports both App Router and Pages Router.

## Signature / Usage

**App Router (`app/api/[[...route]]/route.ts`):**

```ts
import { Hono } from 'hono'
import { handle } from 'hono/vercel'

const app = new Hono().basePath('/api')

app.get('/hello', (c) => c.json({ message: 'Hello Next.js!' }))

export const GET = handle(app)
export const POST = handle(app)
```

**Pages Router (`pages/api/[[...route]].ts`):**

```ts
import { Hono } from 'hono'
import { handle } from '@hono/node-server/vercel'
import type { PageConfig } from 'next'

export const config: PageConfig = { api: { bodyParser: false } }

const app = new Hono().basePath('/api')
app.get('/hello', (c) => c.json({ message: 'Hello Next.js!' }))

export default handle(app)
```

## Notes

- App Router: import `handle` from `hono/vercel`
- Pages Router: import `handle` from `@hono/node-server/vercel`; install `@hono/node-server`; set `bodyParser: false`
- For Pages Router on Vercel, set the environment variable `NODEJS_HELPERS=0` to disable Vercel Node.js helpers
- Dev server: `http://localhost:3000`

## Related

- [Basic](./basic.md)
- [Vercel](./vercel.md)
- [Node.js](./nodejs.md)
