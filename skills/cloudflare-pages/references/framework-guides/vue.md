---
source: https://developers.cloudflare.com/pages/framework-guides/deploy-a-vue-site/, https://developers.cloudflare.com/pages/framework-guides/deploy-a-gridsome-site/
---

# Vue and Gridsome

Vue SPAs and Gridsome (Vue-based static generator) build to `dist`.

## Signature / Usage

```
npm create cloudflare@latest -- my-vue-app --framework=vue --platform=pages
```

Gridsome:

```sh
npm install --global @gridsome/cli
npx gridsome create my-gridsome-website
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| Production branch | — | — | `main` |
| Vue build command | — | — | `npm run build` |
| Vue build directory | — | — | `dist` |
| Gridsome framework preset | — | — | *Gridsome* |
| Gridsome build command | — | — | `npx gridsome build` |
| Gridsome build directory | — | — | `dist` |

## Notes

- For new projects Cloudflare recommends Workers; see cloudflare-workers framework-guides.
- Vue and Gridsome APIs are out of scope for this skill.
- The Gridsome page's own build-log description mentions installing `vuepress`; this is verbatim from the source and appears to be a copy error.
- Nuxt (Vue meta-framework) and VitePress have their own pages.

## Related

- [nuxt.md](./nuxt.md)
- [docs-site-generators.md](./docs-site-generators.md)
- [overview.md](./overview.md)
