---
source: https://developers.cloudflare.com/pages/framework-guides/nextjs/, https://developers.cloudflare.com/pages/framework-guides/nextjs/deploy-a-static-nextjs-site/
---

# Next.js (static export)

Pages hosts only a static Next.js export. Full-stack Next.js (SSR, React Server Components, Server Actions, route handlers, middleware) is directed to vinext on Workers.

## Signature / Usage

```sh
npx create-next-app --example with-static-export my-app
```

Project must be [configured for static exports](https://nextjs.org/docs/app/building-your-application/deploying/static-exports). After pushing to GitHub, import the repository as a Pages project and select *Next.js (Static HTML Export)* as the **Framework preset**.

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| Framework preset | — | — | *Next.js (Static HTML Export)* |
| Production branch | — | — | `main` |
| Build command | — | — | `npx next build` |
| Build directory | — | — | `out` |

## Notes

- For new projects Cloudflare recommends Workers; see cloudflare-workers framework-guides. For Next.js on Workers Cloudflare recommends vinext (which also supports static exports): https://developers.cloudflare.com/workers/framework-guides/web-apps/nextjs/
- Use this guide only when you specifically want a Next.js static export on Pages.
- Next.js APIs (App Router, `next.config`, route handlers) belong to the nextjs-app skill.
- Pages installs `next` and your dependencies, builds, and deploys; every commit triggers a rebuild and pull requests get preview deployments.

## Related

- [overview.md](./overview.md)
- [static-html.md](./static-html.md)
