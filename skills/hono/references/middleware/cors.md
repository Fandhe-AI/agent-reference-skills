# CORS Middleware

Handles Cross-Origin Resource Sharing (CORS) headers. Must be applied before route definitions.

## Signature / Usage

```ts
import { cors } from 'hono/cors'

app.use('/api/*', cors())

// With configuration
app.use('/api/*', cors({
  origin: 'https://example.com',
  allowMethods: ['GET', 'POST'],
  credentials: true,
}))
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `origin` | `string \| string[] \| (origin, c) => string` | `'*'` | `Access-Control-Allow-Origin` value |
| `allowMethods` | `string[] \| (origin, c) => string[]` | `['GET','HEAD','PUT','POST','DELETE','PATCH']` | `Access-Control-Allow-Methods` value |
| `allowHeaders` | `string[]` | `[]` | `Access-Control-Allow-Headers` value |
| `maxAge` | `number` | — | `Access-Control-Max-Age` value in seconds |
| `credentials` | `boolean` | — | `Access-Control-Allow-Credentials` value |
| `exposeHeaders` | `string[]` | `[]` | `Access-Control-Expose-Headers` value |

## Notes

- CORS middleware must be called before route definitions.
- When using Hono with Vite, set `server.cors: false` in `vite.config.ts` to prevent conflicts.
- Use a callback for `origin` to allow multiple origins dynamically (e.g. read from `c.env`).

## Related

- [Secure Headers](./secure-headers.md)
