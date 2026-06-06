# serve()

Creates an HTTP endpoint that exposes Inngest functions to the Inngest platform for remote invocation and configuration reading.

## Signature / Usage

```ts
// Next.js App Router (app/api/inngest/route.ts)
import { serve } from "inngest/next";
import { inngest } from "@/inngest/client";
import { myFunction } from "@/inngest/functions";

export const { GET, POST, PUT } = serve({
  client: inngest,
  functions: [myFunction],
});
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `client` | `Inngest` | **Required.** Your Inngest client instance. |
| `functions` | `InngestFunction[]` | **Required.** Array of functions created with `inngest.createFunction()`. |
| `serveOrigin` | `string` | Your application's domain with protocol (e.g. `https://myapp.com`). Used when auto-inference fails. |
| `servePath` | `string` | Endpoint path; defaults to `/api/inngest`. |
| `streaming` | `boolean` | Enable streaming responses to extend serverless timeouts. |

## Notes

- The endpoint responds to three HTTP methods: `GET` (function metadata), `POST` (function invocation), `PUT` (function registration).
- Mount the endpoint at `/api/inngest` by default; change via `servePath` or `INNGEST_SERVE_PATH` env var.
- Framework-specific imports are available: `inngest/next`, `inngest/express`, `inngest/hono`, `inngest/lambda`, etc.
- Security settings (`signingKey`) are configured on the Inngest client, not on `serve()`.
- Allow requests up to **4 MB** in size — configure this in your framework settings.
- Streaming support (`streaming: true`) can significantly extend timeout limits on Vercel Fluid compute (up to 800 s) and Remix Edge Functions (15 min).
- In v4, options like `signingKey` and `baseUrl` moved from `serve()` to the Inngest client constructor.

## Framework Imports

| Framework | Import path |
|-----------|-------------|
| Next.js | `inngest/next` |
| Express | `inngest/express` |
| Hono | `inngest/hono` |
| Fastify | `inngest/fastify` |
| Remix | `inngest/remix` |
| SvelteKit | `inngest/sveltekit` |
| Nuxt / H3 | `inngest/h3` |
| Koa | `inngest/koa` |
| NestJS | `inngest/express` |
| AWS Lambda | `inngest/lambda` |
| Cloudflare Workers | `inngest/cloudflare` |
| Supabase Edge Functions | `inngest/edge` |

## Related

- [Inngest Client](./inngest-client.md)
- [connect()](./connect.md)
- [Next.js Integration](./framework-nextjs.md)
- [Express Integration](./framework-express.md)
- [Hono Integration](./framework-hono.md)
- [Environment Variables](./environment-variables.md)
