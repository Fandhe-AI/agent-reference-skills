---
source: https://developers.cloudflare.com/pages/framework-guides/deploy-a-react-site/, https://developers.cloudflare.com/pages/framework-guides/deploy-a-preact-site/, https://developers.cloudflare.com/pages/framework-guides/deploy-a-remix-site/
---

# React, Preact and Remix

React and Preact deploy as static SPAs with `dist` output. Remix is no longer recommended for new projects; use React Router on Workers.

## Signature / Usage

React with C3:

```
npm create cloudflare@latest -- my-react-app --framework=react --platform=pages
```

Preact (no C3 command in the guide):

```sh
npm init preact
cd your-project-name
```

During Preact initialization, accept `Prerender app (SSG)?` to produce static HTML pages and assets for production builds, which suits Pages.

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| Production branch | — | — | `main` (React and Preact) |
| React build command | — | — | `npm run build` |
| React build directory | — | — | `dist` |
| Preact build command | — | — | `npm run build` |
| Preact build directory | — | — | `dist` |

## Notes

- For new projects Cloudflare recommends Workers; see cloudflare-workers framework-guides.
- Remix: the authors no longer recommend it for new projects and its successor React Router should be used. For a new React Router project use the React Router Workers guide (https://developers.cloudflare.com/workers/framework-guides/web-apps/react-router); for an existing Remix app consider migrating as described in the official upgrade docs (https://reactrouter.com/upgrading/remix). The Remix page contains no code or build settings. Snippets above come from the React and Preact guides.
- SPA rendering: by default Pages assumes a single-page application. See [serving-pages.md](../configuration/serving-pages.md).
- React, Preact and React Router APIs belong to the react, react-router and tanstack-start skills, not this one.
- C3 installs the Wrangler CLI and the Cloudflare Pages adapter, and can deploy immediately.

## Related

- [overview.md](./overview.md)
- [vue.md](./vue.md)
