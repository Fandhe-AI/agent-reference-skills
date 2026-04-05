# Cloudflare Workers

Deploy Hono to Cloudflare Workers. The app is the default export; the Worker runtime calls `app.fetch` automatically.

## Signature / Usage

```ts
import { Hono } from 'hono'

const app = new Hono()
app.get('/', (c) => c.text('Hello Cloudflare Workers!'))

export default app
```

**Module Worker with additional handlers:**

```ts
export default {
  fetch: app.fetch,
  scheduled: async (batch, env) => {},
}
```

**Typed bindings:**

```ts
type Bindings = {
  MY_BUCKET: R2Bucket
  USERNAME: string
}

const app = new Hono<{ Bindings: Bindings }>()

app.get('/config', (c) => c.text(c.env.USERNAME))
```

## Notes

- Environment variables are accessed via `c.env`, not `process.env`
- Local secrets go in `.dev.vars` (dotenv syntax); install `@cloudflare/workers-types` for TypeScript
- Static assets: set `assets = { directory = "public" }` in `wrangler.toml`
- Dev server default port: `8787`; deploy with `npm run deploy`
- CI/CD: store `CLOUDFLARE_API_TOKEN` as a GitHub Actions secret

## Related

- [Basic](./basic.md)
- [Cloudflare Pages](./cloudflare-pages.md)
