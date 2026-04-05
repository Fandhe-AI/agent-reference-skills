# Cloudflare Pages

Deploy Hono to Cloudflare Pages with Vite and JSX support. Supports bindings (KV, R2, etc.) via `wrangler.toml`.

## Signature / Usage

```tsx
import { Hono } from 'hono'

const app = new Hono()

app.get('/', (c) => c.render(<h1>Hello, Cloudflare Pages!</h1>))

export default app
```

**Bindings:**

```ts
type Bindings = { MY_NAME: string; MY_KV: KVNamespace }
const app = new Hono<{ Bindings: Bindings }>()

app.get('/', async (c) => {
  await c.env.MY_KV.put('name', c.env.MY_NAME)
  const name = await c.env.MY_KV.get('name')
  return c.render(<h1>Hello! {name}</h1>)
})
```

**Pages middleware (`functions/_middleware.ts`):**

```ts
import { handleMiddleware } from 'hono/cloudflare-pages'
import { basicAuth } from 'hono/basic-auth'

export const onRequest = handleMiddleware(basicAuth({ username: 'hono', password: 'secret' }))
```

## Notes

- Dev server runs on `http://localhost:5173` (Vite)
- Build command for dashboard deployment: `npm run build`; build directory: `dist`
- Use `handleMiddleware` to apply Hono middleware to Cloudflare Pages Functions
- Multiple middleware: `export const onRequest = [handleMiddleware(m1), handleMiddleware(m2)]`
- Client-side scripts: toggle between `src/client.ts` (dev) and `/static/client.js` (prod) using `import.meta.env.PROD`

## Related

- [Basic](./basic.md)
- [Cloudflare Workers](./cloudflare-workers.md)
