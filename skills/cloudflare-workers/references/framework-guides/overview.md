---
source: https://developers.cloudflare.com/workers/framework-guides/
---

# Framework guides overview

Cloudflare-side setup for deploying web frameworks to Workers: C3 scaffold command, adapter or plugin, and how to reach bindings. Framework APIs themselves are out of scope.

## Signature / Usage

```sh
npm create cloudflare@latest -- my-app --framework=<framework>
```

| Framework | Create command (`npm create cloudflare@latest -- my-app ...`) | Adapter / plugin | Bindings access | Page |
| --- | --- | --- | --- | --- |
| React + Vite | `--framework=react` | Cloudflare Vite plugin (`@cloudflare/vite-plugin`) | Via Worker at `worker/index.ts` (React app calls it with `fetch()`) | [react-vite.md](./react-vite.md) |
| React Router | `--framework=react-router` | Cloudflare Vite plugin | `context.cloudflare.env` in loader / action | [react-router.md](./react-router.md) |
| TanStack Start | `--framework=tanstack-start` | Cloudflare Vite plugin | `import { env } from "cloudflare:workers"` | [tanstack-start.md](./tanstack-start.md) |
| Next.js | `--framework=next` | vinext | `cloudflare:workers` (server components, route handlers, server actions) | [nextjs-vinext.md](./nextjs-vinext.md) |
| Next.js (OpenNext) | manual setup | `@opennextjs/cloudflare` | see OpenNext docs | [opennext.md](./opennext.md) |
| Astro | `--framework=astro` | `@astrojs/cloudflare` | Astro `locals` (Astro docs) | [astro.md](./astro.md) |
| Hono | `--template=cloudflare/templates/vite-react-template` | Cloudflare Vite plugin | Hono docs (Cloudflare Workers bindings) | [hono.md](./hono.md) |
| SvelteKit | `--framework=svelte` | `@sveltejs/adapter-cloudflare` | SvelteKit hooks and endpoints (SvelteKit docs) | [sveltekit.md](./sveltekit.md) |
| Nuxt | `--framework=nuxt` | Built-in `cloudflare` preset | Nuxt event handlers (Nitro docs) | [nuxt.md](./nuxt.md) |
| RedwoodSDK | `npx create-rwsdk my-project-name` | `rwsdk` Vite plugin | see RedwoodSDK docs | [redwoodsdk.md](./redwoodsdk.md) |
| Vike | vike.dev/new (or add manually) | `vike-photon` + `@photonjs/cloudflare` | `import { env } from 'cloudflare:workers'` | [vike.md](./vike.md) |
| Vue | `--framework=vue` | Cloudflare Vite plugin | Via Worker at `server/index.ts` | (table only) |
| Solid Start (beta) | `--framework=solid --experimental` | Built-in Cloudflare preset | `getRequestEvent().nativeEvent.context.cloudflare.env` | (table only) |
| Angular | `--framework=angular` | none listed (assets `dist/browser`) | n/a (static assets) | (table only) |
| Analog | `--framework=analog` | Built-in Cloudflare preset (Nitro) | Nitro docs, in API routes | (table only) |
| Qwik | `--framework=qwik` | none listed | Qwik endpoint methods (Qwik docs) | (table only) |
| Waku | `--framework=waku` | none listed (main `dist/worker.js`) | Waku Cloudflare guide, in React Server Components | (table only) |
| Docusaurus | `--framework=docusaurus --platform=workers` | none (static assets `./build`) | n/a | (table only) |
| Gatsby | `--framework=gatsby` | none listed | n/a | (table only) |
| Foldkit | `npx create-foldkit-app@latest --name my-foldkit-app` | none (SPA / SSG assets, SSR `fetch` handler) | n/a | (table only) |
| fate (Void template) | `vp create fate -- my-app --template void` | Void | `VOID_LIVE` Durable Object binding in `wrangler.jsonc` | (table only) |

Table-only details:

- Vue: `main` is `server/index.ts` (backend API); `assets.not_found_handling` is `single-page-application`. Dev `npm run dev`, deploy `npm run deploy`.
- Solid Start: `main` `.output/server/index.mjs`, assets `.output/public`.
- Angular: generated config has `assets.directory` `dist/browser`; dev `npm run start`.
- Analog: `main` `.output/server/index.mjs`, assets `.output/public`.
- Waku: `main` `dist/worker.js`, assets `dist/public`; `.js`, `.css`, `.html`, `.txt` files in `./public/` are copied to the assets output.
- Docusaurus: `wrangler.jsonc` only sets `assets.directory` to `./build`; build with `npx docusaurus build` then `npx wrangler@latest deploy`.
- Gatsby: C3 scaffold then `npm run dev` / `npm run deploy`.
- Foldkit: SPA assets `./dist` with `single-page-application`; SSG assets `./dist/client`; SSR `main` `./dist/server/fetch.js` with assets `./dist/client`. Needs Node.js 22.22.2 or newer.
- fate: needs Node.js 24+ and Vite+; deploy with `vp exec void deploy --platform cloudflare`.

## Notes

- Not covered by a dedicated page here: Microfrontends is in [microfrontends.md](./microfrontends.md); automatic detection is in [automatic-configuration.md](./automatic-configuration.md).
- Mobile app and API (FastAPI etc.) guides are not present under `workers/framework-guides/` in the pinned docs snapshot.
- Framework APIs: see the relevant framework skill (react, react-router, tanstack-start, nextjs-app, hono, vite) where one exists.

## Related

- [automatic-configuration.md](./automatic-configuration.md)
- [microfrontends.md](./microfrontends.md)
