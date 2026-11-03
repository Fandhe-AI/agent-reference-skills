---
source: https://developers.cloudflare.com/pages/framework-guides/deploy-a-hexo-site/, https://developers.cloudflare.com/pages/framework-guides/deploy-an-eleventy-site/, https://developers.cloudflare.com/pages/framework-guides/deploy-a-gatsby-site/, https://developers.cloudflare.com/pages/framework-guides/deploy-an-elderjs-site/, https://developers.cloudflare.com/pages/framework-guides/deploy-a-brunch-site/, https://developers.cloudflare.com/pages/framework-guides/deploy-an-emberjs-site/
---

# Hexo, Eleventy, Gatsby, Elder.js, Brunch and Ember

Node.js-based static site generators and front-end build tools deployed through Git integration.

## Signature / Usage

Hexo:

```sh
npm install hexo-cli -g
hexo init my-hexo-site
cd my-hexo-site
```

Eleventy:

```sh
git clone https://github.com/11ty/eleventy-base-blog.git my-blog-name
cd my-blog-name
npm install
```

Gatsby:

```sh
npx gatsby new my-gatsby-site https://github.com/alxshelepenok/gatsby-starter-lumen
```

Gatsby dynamic routes: set up a proxy redirect (status 200) for them. Adapted (not in the official docs): the official rule `/users/* /users/:id 200` uses `:id` in the destination without defining it in the source; the source below declares the `:id` placeholder and proxies to the route's page (see Notes). Example for `/users/[id]`:

```plaintext
/users/:id /users/ 200
```

Elder.js:

```sh
npx degit Elderjs/template elderjs-app
cd elderjs-app
```

Brunch:

```sh
npm install -g brunch
brunch new proj -s es6
```

Ember:

```sh
npm install -g ember-cli
npx ember new ember-quickstart --lang en
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| Production branch | — | — | `main` (all guides) |
| Hexo build command | — | — | `npm run build` |
| Hexo build directory | — | — | `public` |
| Eleventy framework preset | — | — | *Eleventy* |
| Eleventy build command | — | — | `npx @11ty/eleventy` |
| Eleventy build directory | — | — | `_site` |
| Gatsby framework preset | — | — | *Gatsby* |
| Gatsby build command | — | — | `npx gatsby build` |
| Gatsby build directory | — | — | `public` |
| Elder.js framework preset | — | — | *Elder.js* |
| Elder.js build command | — | — | `npm run build` |
| Elder.js build directory | — | — | `public` |
| Brunch build command | — | — | `npx brunch build --production` |
| Brunch build directory | — | — | `public` |
| Ember framework preset | — | — | *Ember.js* |
| Ember build command | — | — | `npx ember-cli build` |
| Ember build directory | — | — | `dist` |
| `NODE_VERSION` | — | — | Environment variable for Hexo themes or plugins needing a specific Node.js version (the guide's example is `14.3`); set under **Settings** > **Environment variables** |

## Notes

- For new projects Cloudflare recommends Workers; see cloudflare-workers framework-guides.
- Corrected from the official docs: the official Gatsby rule is `/users/* /users/:id 200`, whose destination uses `:id` although the `*` source defines no `:id` placeholder (a wildcard is referenced as `:splat`; placeholders are declared as `:name` in the source, see [redirects.md](../configuration/redirects.md)). The rule above declares `:id` in the source and proxies (status 200) to `/users/`; this assumes your client-only route is served from the page generated at `/users/`, so adjust the destination to the page your Gatsby build emits for that route.
- Elder.js is built on SvelteKit; the template is deployable as generated.
- Brunch and Ember pages carry the standard dashboard flow only.
- These generators are out of scope for this skill beyond the Cloudflare-side settings above.

## Related

- [docs-site-generators.md](./docs-site-generators.md)
- [hugo-zola.md](./hugo-zola.md)
- [overview.md](./overview.md)
