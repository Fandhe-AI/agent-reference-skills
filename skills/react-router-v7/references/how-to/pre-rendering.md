# Pre-Rendering

Render pages at build time instead of runtime to speed up initial loads for static content. Pre-rendered routes use the same `loader` functions as SSR routes.

**Available in:** Framework mode only.

## 実装方法

1. Add a `prerender` key to `react-router.config.ts`
2. Set it to `true` (all static paths), an array of paths, or an async function returning paths
3. Configure `ssr: true` (default) to keep a runtime server alongside pre-rendered pages, or `ssr: false` to deploy a fully static site

## コード例

```ts
// react-router.config.ts

// Pre-render all static routes
export default { prerender: true } satisfies Config;

// Pre-render specific paths including dynamic ones
const slugs = getPostSlugs();
export default {
  prerender: ["/", "/blog", ...slugs.map((s) => `/blog/${s}`)],
} satisfies Config;

// Async function with CMS data
export default {
  async prerender({ getStaticPaths }) {
    const slugs = await getPostSlugsFromCMS();
    return [
      ...getStaticPaths(),
      ...slugs.map((s) => `/blog/${s}`),
    ];
  },
} satisfies Config;

// Experimental parallel pre-rendering
export default {
  prerender: {
    paths: ["/", "/blog"],
    unstable_concurrency: 4,
  },
} satisfies Config;
```

## 注意点

- Build output: `[url].html` for document requests, `[url].data` for client-side navigations
- With `ssr: false`, `headers` and `action` exports are not allowed (no runtime server)
- Pre-rendered files are only saved during `react-router build`, not during development
- For a static host SPA fallback, add a `_redirects` rule: `/* /index.html 200`

## 関連

- [./spa.md](./spa.md)
- [./server-bundles.md](./server-bundles.md)
