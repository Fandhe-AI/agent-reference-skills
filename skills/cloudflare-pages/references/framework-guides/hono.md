---
source: https://developers.cloudflare.com/pages/framework-guides/deploy-a-hono-site/
---

# Hono

Create a Hono app for Pages with C3; the project has `public/static` for static files and `src/index.ts` as the server entrypoint.

## Signature / Usage

```
npm create cloudflare@latest -- my-hono-app --framework=hono --platform=pages
```

Run locally (served at `http://localhost:8788`):

```
npm run dev
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| Production branch | — | — | `main` |
| Build command | — | — | `npm run build` |
| Build directory | — | — | `dist` |

## Notes

- For new projects Cloudflare recommends Workers; see cloudflare-workers framework-guides.
- Hono APIs (routing, middleware, context) belong to the hono skill.
- C3 installs dependencies and can deploy immediately.

## Related

- [overview.md](./overview.md)
- [static-html.md](./static-html.md)
