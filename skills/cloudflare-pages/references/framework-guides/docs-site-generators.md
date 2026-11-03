---
source: https://developers.cloudflare.com/pages/framework-guides/deploy-a-docusaurus-site/, https://developers.cloudflare.com/pages/framework-guides/deploy-a-vitepress-site/
---

# Docusaurus and VitePress

Documentation-site generators selected by **Framework preset** in the Pages dashboard.

## Signature / Usage

Docusaurus with C3:

```
npm create cloudflare@latest -- my-docusaurus-app --framework=docusaurus --platform=pages
```

VitePress:

```
npx vitepress@latest init
```

Then install the dependency and create a `.gitignore`:

```
npm i -D vitepress@latest
```

```plaintext
node_modules
.vitepress/cache
.vitepress/dist
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| Production branch | — | — | `main` |
| Docusaurus framework preset | — | — | *Docusaurus* |
| Docusaurus build command | — | — | `npm run build` |
| Docusaurus build directory | — | — | `build` |
| VitePress framework preset | — | — | *VitePress* |
| VitePress build command | — | — | `npx vitepress build` |
| VitePress build directory | — | — | `.vitepress/dist` |

## Notes

- For new projects Cloudflare recommends Workers; see cloudflare-workers framework-guides.
- Docusaurus: C3 installs the Wrangler CLI and any necessary adapters, and can deploy immediately.
- VitePress: if setup fails, check local prerequisites in the VitePress guide (https://vitepress.dev/guide/getting-started#prerequisites).
- Docusaurus and VitePress themselves (Vite-based VitePress configuration belongs to the vite skill where relevant) are out of scope here.

## Related

- [python-generators.md](./python-generators.md)
- [node-static-generators.md](./node-static-generators.md)
- [overview.md](./overview.md)
