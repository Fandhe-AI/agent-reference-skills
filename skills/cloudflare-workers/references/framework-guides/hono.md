---
source: https://developers.cloudflare.com/workers/framework-guides/web-apps/more-web-frameworks/hono/
---

# Hono

Full-stack Hono API plus React SPA on Workers using the Cloudflare Vite plugin and Workers Assets.

## Signature / Usage

```sh
npm create cloudflare@latest -- my-hono-app --template=cloudflare/templates/vite-react-template
```

Project layout: `src/worker/index.ts` (Hono app, single `/api` endpoint), `src/react-app/`, `index.html`, `vite.config.ts` (Cloudflare Vite plugin), `wrangler.jsonc`.

```sh
npm run dev
npm run deploy
```

## Notes

- `wrangler.jsonc` `main` is `src/worker/index.ts`; `assets.not_found_handling` is `single-page-application`, so SPA-handled routes do not invoke the Worker.
- Bindings: see the Hono docs section "Cloudflare Workers > Bindings".
- Hono APIs: see the hono skill. Cloudflare Vite plugin: cloudflare-wrangler.

## Related

- [react-vite.md](./react-vite.md)
- [overview.md](./overview.md)
