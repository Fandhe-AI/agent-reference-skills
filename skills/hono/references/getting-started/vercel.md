# Vercel

Deploy Hono to Vercel with zero configuration. Use the `hono/vercel` adapter to export route handlers.

## Signature / Usage

```ts
import { Hono } from 'hono'
import { handle } from 'hono/vercel'

const app = new Hono().basePath('/api')

app.get('/hello', (c) => c.json({ message: 'Hello Next.js!' }))

export const GET = handle(app)
export const POST = handle(app)
```

## Notes

- Initialize with `npm create hono@latest my-app` and select the `vercel` template
- Development: `vercel dev` (port `3000`); production: `vercel deploy`
- Zero-configuration deployment — no extra Vercel config needed
- For standalone Vercel (not Next.js), export `default app`; Hono handles routing automatically

## Related

- [Basic](./basic.md)
- [Next.js](./nextjs.md)
