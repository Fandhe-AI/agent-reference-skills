# Deno

Run Hono on Deno or deploy to Deno Deploy. Uses `Deno.serve()` as the entry point.

## Signature / Usage

```ts
import { Hono } from 'hono'

const app = new Hono()
app.get('/', (c) => c.text('Hello Deno!'))

Deno.serve(app.fetch)
// or with port:
Deno.serve({ port: 8787 }, app.fetch)
```

## Notes

- Initialize with `deno init --npm hono --template=deno my-app`
- Static files: import `serveStatic` from `hono/deno`; options include `root`, `rewriteRequestPath`, `mimes`, `onFound`, `onNotFound`, `precompressed`
- When importing middleware, use the same registry (npm or JSR) throughout to ensure correct TypeScript types
- Testing: use `Deno.test` with `@std/assert`
- Default dev command: `deno task start`

## Related

- [Basic](./basic.md)
- [Supabase Functions](./supabase-functions.md)
- [Netlify](./netlify.md)
