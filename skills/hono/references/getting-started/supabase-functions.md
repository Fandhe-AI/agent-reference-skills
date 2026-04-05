# Supabase Functions

Deploy Hono to Supabase Edge Functions, which run on Deno.

## Signature / Usage

```ts
// supabase/functions/hello-world/index.ts
import { Hono } from 'jsr:@hono/hono'

const functionName = 'hello-world'
const app = new Hono().basePath(`/${functionName}`)

app.get('/hello', (c) => c.text('Hello from hono-server!'))

Deno.serve(app.fetch)
```

## Notes

- Import Hono from `jsr:@hono/hono` (JSR registry)
- The `basePath` must match the Supabase function name (e.g., `/hello-world`)
- Local dev: `supabase start` then `supabase functions serve --no-verify-jwt`; default URL `http://127.0.0.1:54321/functions/v1/{functionName}`
- The `--no-verify-jwt` flag is required for local testing without JWT auth
- Deploy: `supabase functions deploy` or `supabase functions deploy hello-world`
- Edge Functions run on Deno for improved security and modern JS/TS support

## Related

- [Basic](./basic.md)
- [Deno](./deno.md)
