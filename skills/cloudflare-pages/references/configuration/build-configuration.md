---
source: https://developers.cloudflare.com/pages/configuration/build-configuration/
---

# Build configuration

Build command, build output directory, root directory, framework presets and injected environment variables for a Pages project.

## Signature / Usage

Snippet taken from https://developers.cloudflare.com/pages/configuration/build-caching/

```sh
hugo --minify --cacheDir=$PWD/.cache
```

Pages marks a build failed on any non-zero exit code of the build command. An exit code of 0 marks it successful and assets are uploaded even if errors were written to standard error. Leave **Build command** blank when working without a framework; if you are not using a preset, the page says to use `exit 0` as the build command.

## Options / Props

Framework presets (build command, build directory):

| Name | Type | Default | Description |
|------|------|---------|-------------|
| React (Vite) | preset | — | `npm run build`, `dist` |
| Gatsby | preset | — | `npx gatsby build`, `public` |
| Next.js (Static HTML Export) | preset | — | `npx next build`, `out` |
| Nuxt.js | preset | — | `npm run build`, `dist` |
| Qwik | preset | — | `npm run build`, `dist` |
| Remix | preset | — | `npm run build`, `build/client` |
| Svelte | preset | — | `npm run build`, `public` |
| SvelteKit | preset | — | `npm run build`, `.svelte-kit/cloudflare` |
| Vue | preset | — | `npm run build`, `dist` |
| Analog | preset | — | `npm run build`, `dist/analog/public` |
| Astro | preset | — | `npm run build`, `dist` |
| Angular | preset | — | `npm run build`, `dist/cloudflare` |
| Brunch | preset | — | `npx brunch build --production`, `public` |
| Docusaurus | preset | — | `npm run build`, `build` |
| Elder.js | preset | — | `npm run build`, `public` |
| Eleventy | preset | — | `npx @11ty/eleventy`, `_site` |
| Ember.js | preset | — | `npx ember-cli build`, `dist` |
| GitBook | preset | — | `npx gitbook-cli build`, `_book` |
| Gridsome | preset | — | `npx gridsome build`, `dist` |
| Hugo | preset | — | `hugo`, `public` |
| Jekyll | preset | — | `jekyll build`, `_site` |
| MkDocs | preset | — | `mkdocs build`, `site` |
| Pelican | preset | — | `pelican content`, `output` |
| React Static | preset | — | `react-static build`, `dist` |
| Slate | preset | — | `./deploy.sh`, `build` |
| Umi | preset | — | `npx umi build`, `dist` |
| VitePress | preset | — | `npx vitepress build`, `.vitepress/dist` |
| Zola | preset | — | `zola build`, `public` |

System environment variables injected by default (can be overridden):

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `CI` | string | `true` | Change build behaviour on CI versus locally. |
| `CF_PAGES` | string | `1` | Change build behaviour on Pages versus locally. |
| `CF_PAGES_COMMIT_SHA` | string | `<sha1-hash-of-current-commit>` | Pass the commit ID to error reporting such as Sentry. |
| `CF_PAGES_BRANCH` | string | `<branch-name-of-current-deployment>` | Customize the build per branch. |
| `CF_PAGES_URL` | string | `<url-of-current-deployment>` | Tell build tools the URL the page will be deployed at. |

## Notes

- Cloudflare's Pages landing page says "Start new projects with Workers" (Workers + static assets supports most Pages use cases); see the cloudflare-workers skill (static-assets/migrate-from-pages).
- The root directory defaults to the repository root; set it for monorepos.
- Custom environment variables: Pages project > **Settings** > **Environment variables**.

## Related

- [Build image](./build-image.md)
- [Build caching](./build-caching.md)
- [Build watch paths](./build-watch-paths.md)
- [Monorepos](./monorepos.md)
