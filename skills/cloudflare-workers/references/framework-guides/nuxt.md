---
source: https://developers.cloudflare.com/workers/framework-guides/web-apps/more-web-frameworks/nuxt/
---

# Nuxt

Deploy Nuxt to Workers with the built-in Nitro `cloudflare` preset and Workers Assets.

## Signature / Usage

```sh
npm create cloudflare@latest -- my-nuxt-app --framework=nuxt
```

```sh
npm run dev
npm run deploy
```

Autoconfig for an existing project generates `main` `.output/server/index.mjs`, `assets.directory` `.output/public`, observability, and `preset: cloudflare` in `nuxt.config.ts`.

## Notes

- Bindings: configuration and access in Nuxt event handlers are documented in the Nitro Cloudflare provider docs ("Direct access to Cloudflare bindings").

- Node.js compatibility: for compatibility dates before `2026-08-04`, automatic configuration also adds the `nodejs_compat` compatibility flag; the generated configuration for newer dates omits it (the official framework guide tables no longer list `compatibility_flags`).
- To move an existing Nuxt project from Vercel see [migrate-from-vercel-nuxt.md](../static-assets/migrate-from-vercel-nuxt.md).
- Source: https://developers.cloudflare.com/workers/framework-guides/web-apps/more-web-frameworks/nuxt/ (cloudflare-docs production 34d908a, fetched 2026-11-14)

## Related

- [automatic-configuration.md](./automatic-configuration.md)
- [overview.md](./overview.md)
