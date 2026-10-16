# Vercel

Deploy Hono to Vercel with zero configuration. Export the Hono application as a default export; no adapter import is needed.

## Signature / Usage

```ts
import { Hono } from 'hono'

const app = new Hono()

app.get('/', (c) => c.text('Hello Hono!'))

export default app
```

## Notes

- Initialize with `npm create hono@latest my-app` and select the `vercel` template
- Development: `vercel dev` (port `3000`); production: `vercel deploy`
- Zero-configuration deployment — no extra Vercel config needed
- Put the app in `index.ts` or `src/index.ts` as the default export; the `vercel` template already sets this up
- For Next.js (`handle` from `@hono/vercel`), see [Next.js](./nextjs.md)

## Related

- [Basic](./basic.md)
- [Next.js](./nextjs.md)
