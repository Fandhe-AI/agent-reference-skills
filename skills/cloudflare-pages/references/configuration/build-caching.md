---
source: https://developers.cloudflare.com/pages/configuration/build-caching/
---

# Build caching

Speed up Pages builds with a project-wide shared cache of package-manager and framework directories.

## Signature / Usage

Enable under Pages project > **Settings** > **Build** > **Build cache** > **Enable**. Hugo does not use `.cache` by default, so point it there:

```sh
hugo --minify --cacheDir=$PWD/.cache
```

## Options / Props

Package manager directories cached:

| Name | Type | Default | Description |
|------|------|---------|-------------|
| npm | directory | — | `.npm` |
| yarn | directory | — | `.cache/yarn` |
| pnpm | directory | — | `.pnpm-store` |
| bun | directory | — | `.bun/install/cache` |

Framework directories cached:

| Name | Type | Default | Description |
|------|------|---------|-------------|
| Astro | directory | — | `node_modules/.astro` |
| Docusaurus | directories | — | `node_modules/.cache`, `.docusaurus`, `build` |
| Eleventy | directory | — | `.cache` |
| Gatsby | directories | — | `.cache`, `public` |
| Hugo | directory | — | `.cache` |
| Next.js | directory | — | `.next/cache` |
| Nuxt | directory | — | `node_modules/.cache/nuxt` |
| SvelteKit | directory | — | `node_modules/.cache/imagetools` |

## Notes

- Cloudflare's Pages landing page says "Start new projects with Workers" (Workers + static assets supports most Pages use cases); see the cloudflare-workers skill (static-assets/migrate-from-pages).
- The first build after enabling saves to the cache; later builds restore from it.
- Build caching requires the V2 build system or later (see the build image page).
- Retention: cache is purged seven days after its last read; unread artifacts are purged seven days after creation. Storage: 10 GB per project, least recently read artifacts are deleted first.
- Hugo is detected by a `hugo.toml`, `hugo.yaml`, `hugo.yml` or `hugo.json` config file.
- Clear the cache under **Settings** > **Build** > **Build cache** > **Clear Cache**, for example when debugging build issues.

## Related

- [Build image](./build-image.md)
- [Build configuration](./build-configuration.md)
- [Debugging Pages](./debugging-pages.md)
