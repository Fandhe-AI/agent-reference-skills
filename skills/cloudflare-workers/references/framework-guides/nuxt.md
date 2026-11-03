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

Autoconfig for an existing project generates `main` `.output/server/index.mjs`, `assets.directory` `.output/public`, `nodejs_compat`, observability, and `preset: cloudflare` in `nuxt.config.ts`.

## Notes

- Bindings: configuration and access in Nuxt event handlers are documented in the Nitro Cloudflare provider docs ("Direct access to Cloudflare bindings").

## Related

- [automatic-configuration.md](./automatic-configuration.md)
- [overview.md](./overview.md)
