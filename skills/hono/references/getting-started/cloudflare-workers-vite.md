# Cloudflare Workers + Vite

Build full-stack Hono applications on Cloudflare Workers using Vite for both server-side rendering (via Hono's JSX renderer) and client-side bundling.

## Signature / Usage

```sh
npm create hono@latest my-app
# select the `cloudflare-workers+vite` template
cd my-app
npm i
npm run deploy
```

```tsx
// src/index.tsx
app.use(renderer)
app.get('/', (c) => {
  return c.render(<h1>Hello, Cloudflare Workers!</h1>)
})
```

## Notes

- Project layout includes `src/index.tsx` (server entry), `src/renderer.tsx`, `vite.config.ts`, and `wrangler.jsonc`
- `vite.config.ts` combines the `@cloudflare/vite-plugin` with `vite-ssr-components` for SSR support
- `npm run deploy` builds with Vite then publishes with Wrangler
- Bindings are configured in `wrangler.jsonc`; generate types with `cf-typegen` and access via `c.env`

## Related

- [Cloudflare Workers](./cloudflare-workers.md)
- [Basic](./basic.md)
