---
source: https://developers.cloudflare.com/pages/framework-guides/, https://developers.cloudflare.com/pages/framework-guides/deploy-anything/
---

# Framework guides overview

Every Pages framework guide follows one flow: scaffold with `create-cloudflare` (C3) or bring an existing project, push to a Git repository, then import the repository as a Pages project with a framework-specific build command and build output directory.

## Signature / Usage

Scaffold a Pages project for a supported framework with C3 (example: Nuxt):

```
npm create cloudflare@latest -- my-nuxt-app --framework=nuxt --platform=pages
```

Dashboard flow shared by the Git-integration guides:

1. In the Cloudflare dashboard, go to **Workers & Pages**.
2. Select **Create application**, then the **Pages** tab, then **Import an existing Git repository**.
3. Select the GitHub repository and **Begin setup**.
4. Enter the build command and build directory (or pick a **Framework preset**) from the table below, then **Save and Deploy**.

## Options / Props

### Build settings per framework

Production branch is `main` in every guide.

| Name | Type | Default | Description |
|------|------|---------|-------------|
| Next.js (static export) | — | — | Preset *Next.js (Static HTML Export)*. Build command `npx next build`, build directory `out`. See [nextjs.md](./nextjs.md) |
| Nuxt | — | — | Build command `npm run build`, build directory `dist`. C3: `--framework=nuxt --platform=pages`. See [nuxt.md](./nuxt.md) |
| SvelteKit | — | — | Preset *SvelteKit*. Build command `npm run build`, build directory `.svelte-kit/cloudflare`. C3: `--framework=svelte --platform=pages`. See [sveltekit.md](./sveltekit.md) |
| Astro | — | — | Build command `npm run build`, build directory `dist`. C3: `--framework=astro --platform=pages`. See [astro.md](./astro.md) |
| React | — | — | Build command `npm run build`, build directory `dist`. C3: `--framework=react --platform=pages`. See [react-preact-remix.md](./react-preact-remix.md) |
| Preact | — | — | Build command `npm run build`, build directory `dist`. Scaffold with `npm init preact`. See [react-preact-remix.md](./react-preact-remix.md) |
| Qwik | — | — | Build command `npm run build`, build directory `dist`. C3: `--framework=qwik --platform=pages`. See [qwik.md](./qwik.md) |
| SolidStart | — | — | Build command `npm run build`, build directory `dist`. C3: `--framework=solid --platform=pages` (the official page omits `--platform=pages`). See [solid-start.md](./solid-start.md) |
| Angular | — | — | Build command `npm run build`, build directory `dist/cloudflare`. C3: `--framework=angular --platform=pages`. See [angular.md](./angular.md) |
| Vue | — | — | Build command `npm run build`, build directory `dist`. C3: `--framework=vue --platform=pages`. See [vue.md](./vue.md) |
| Gridsome | — | — | Preset *Gridsome*. Build command `npx gridsome build`, build directory `dist`. See [vue.md](./vue.md) |
| Hono | — | — | Build command `npm run build`, build directory `dist`. C3: `--framework=hono --platform=pages`. See [hono.md](./hono.md) |
| Docusaurus | — | — | Preset *Docusaurus*. Build command `npm run build`, build directory `build`. See [docs-site-generators.md](./docs-site-generators.md) |
| VitePress | — | — | Preset *VitePress*. Build command `npx vitepress build`, build directory `.vitepress/dist`. See [docs-site-generators.md](./docs-site-generators.md) |
| Hugo | — | — | Build command `hugo`, build directory `public`. See [hugo-zola.md](./hugo-zola.md) |
| Zola | — | — | Build command `zola build`, build directory `public`. See [hugo-zola.md](./hugo-zola.md) |
| Jekyll | — | — | Build command `jekyll build`, build directory `_site`. See [jekyll.md](./jekyll.md) |
| Sphinx | — | — | Build command `make html`, build directory `build/html`. See [python-generators.md](./python-generators.md) |
| MkDocs | — | — | Build command `mkdocs build`, build directory `site`. See [python-generators.md](./python-generators.md) |
| Pelican | — | — | Build command `pelican content`, build directory `output`. See [python-generators.md](./python-generators.md) |
| Hexo | — | — | Build command `npm run build`, build directory `public`. See [node-static-generators.md](./node-static-generators.md) |
| Eleventy | — | — | Preset *Eleventy*. Build command `npx @11ty/eleventy`, build directory `_site`. See [node-static-generators.md](./node-static-generators.md) |
| Gatsby | — | — | Preset *Gatsby*. Build command `npx gatsby build`, build directory `public`. See [node-static-generators.md](./node-static-generators.md) |
| Elder.js | — | — | Preset *Elder.js*. Build command `npm run build`, build directory `public`. See [node-static-generators.md](./node-static-generators.md) |
| Brunch | — | — | Build command `npx brunch build --production`, build directory `public`. See [node-static-generators.md](./node-static-generators.md) |
| Ember | — | — | Preset *Ember.js*. Build command `npx ember-cli build`, build directory `dist`. See [node-static-generators.md](./node-static-generators.md) |
| Blazor WebAssembly | — | — | Build command `./build.sh`, build directory `output/wwwroot`. See [blazor.md](./blazor.md) |
| Static HTML | — | — | Build command `exit 0` (optional), build directory is your own. See [static-html.md](./static-html.md) |

### Guides that redirect to Workers

| Name | Type | Default | Description |
|------|------|---------|-------------|
| Next.js (full-stack) | — | — | Cloudflare recommends vinext on Workers for SSR, React Server Components, Server Actions, route handlers and middleware: https://developers.cloudflare.com/workers/framework-guides/web-apps/nextjs/ |
| Remix | — | — | No longer recommended for new projects by its authors; use React Router on Workers: https://developers.cloudflare.com/workers/framework-guides/web-apps/react-router |
| Analog | — | — | Deploy via the Analog Workers guide: https://developers.cloudflare.com/workers/framework-guides/web-apps/more-web-frameworks/analog/ |

## Notes

- For new projects Cloudflare recommends Workers; see cloudflare-workers framework-guides.
- Framework APIs themselves (Next.js, Nuxt, SvelteKit, Astro, React Router, Hono, Vite and so on) are not covered here; use the matching skill (for example nextjs-app, react-router, tanstack-start, hono, vite). This category records only the Cloudflare-side deployment points: build command, build output directory, adapter or C3 command, and how bindings are reached.
- The guides assume basic Git knowledge. SSH clones require SSH keys on each machine.
- After deploying, the project gets a `*.pages.dev` subdomain, rebuilds on every pushed commit, and gets preview deployments for pull requests. Environment variables set for Production must also be added to Preview if previews need them.
- Where bindings and other project settings live depends on how the project is configured. If the project deploys with a Wrangler configuration file that contains `pages_build_output_dir`, that file is the source of truth and the fields it sets cannot be edited in the dashboard. Otherwise (no Wrangler file, or one without `pages_build_output_dir`) the dashboard manages bindings and the file is only used for local development. See [bindings.md](../functions/bindings.md) and [wrangler-configuration.md](../functions/wrangler-configuration.md).

## Related

- [nextjs.md](./nextjs.md)
- [static-html.md](./static-html.md)
- [README.md](./README.md)
