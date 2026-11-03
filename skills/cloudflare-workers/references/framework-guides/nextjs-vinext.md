---
source: https://developers.cloudflare.com/workers/framework-guides/web-apps/nextjs/
---

# Next.js (vinext)

Cloudflare recommends vinext, a Vite plugin that reimplements the Next.js API surface, for running Next.js on Workers.

## Signature / Usage

New project:

```sh
npm create cloudflare@latest -- my-next-app --framework=next
```

Existing Next.js app (non-destructive; your `next dev` keeps working):

```sh
npx vinext check
```

```sh
npx vinext init
```

```sh
npm run dev:vinext
npm run build:vinext
npx @vinext/cloudflare deploy
```

Agent-assisted migration:

```sh
npx skills add cloudflare/vinext
```

```txt
migrate this project to vinext
```

## Options / Props

| Feature | vinext support |
| --- | --- |
| App Router | Supported |
| Pages Router | Supported |
| React Server Components | Supported |
| Server Actions | Supported |
| Server-side rendering | Supported (streaming) |
| Static generation / export | Supported (`output: "export"`) |
| ISR | Supported (stale-while-revalidate) |
| Middleware and proxy routes | Supported (`middleware.ts`, `proxy.ts`) |
| `next/*` imports | Mostly supported |
| Cloudflare bindings | Supported via `cloudflare:workers` |
| Image optimization | Partially supported |

## Notes

- vinext is in beta; run `npx vinext check` and review the vinext compatibility dashboard before adopting it for production.
- `vinext init` installs vinext and Vite dependencies, adds vinext scripts, generates the Vite config, and creates the Cloudflare Workers configuration.
- Bindings: import `env` from `cloudflare:workers` in server components, route handlers, and server actions; generate types with `wrangler types`.
- Alternatives: [opennext.md](./opennext.md) for existing OpenNext apps; static exports on Cloudflare Pages (cloudflare-pages skill; https://developers.cloudflare.com/pages/framework-guides/nextjs/deploy-a-static-nextjs-site/).
- Next.js APIs: see the nextjs-app skill.

## Related

- [opennext.md](./opennext.md)
- [automatic-configuration.md](./automatic-configuration.md)
