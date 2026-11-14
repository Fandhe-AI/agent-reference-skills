# Pre-Rendering

Render pages at build time instead of runtime to speed up initial loads for static content. Pre-rendered routes use the same `loader` functions as SSR routes.

**Available in:** Framework mode only.

## Signature / Usage

1. Add a `prerender` key to `react-router.config.ts`
2. Set it to `true` (all static paths), an array of paths, or an async function returning paths
3. Configure `ssr: true` (default) to keep a runtime server alongside pre-rendered pages, or `ssr: false` to deploy a fully static site (experimental `ssr: "unstable_api-only"` is also supported, see Notes)

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

// Parallel pre-rendering with concurrency control
export default {
  prerender: {
    paths: ["/", "/blog"],
    concurrency: 4,
  },
} satisfies Config;
```

### Pre-rendering with API-only Mode (unstable)

```ts filename=react-router.config.ts
import type { Config } from "@react-router/dev/config";

export default {
  ssr: "unstable_api-only",
  prerender: ["/"],
} satisfies Config;
```

## Notes

- Build output: `[url].html` for document requests, `[url].data` for client-side navigations
- With `ssr: false`, `headers` and `action` exports are not allowed (no runtime server)
- Pre-rendered files are only saved during `react-router build`, not during development
- For a static host SPA fallback, add a `_redirects` rule: `/* /index.html 200`
- 8.5.0 (experimental): `prerender` can also be combined with `ssr: "unstable_api-only"` to generate documents at build time while keeping a runtime server for loaders, actions, and route discovery. Document generation follows the same behavior as `ssr: false`: selected paths produce HTML and `.data` files, and other paths use a SPA fallback (`__spa-fallback.html` when `/` is prerendered, `index.html` otherwise). Prerendered pages hydrate using their build-time data; pages using the fallback fetch server loader data during initialization. Server loaders and actions are available on all routes, including those outside the prerender list. Not supported in RSC Framework Mode
- Source: https://reactrouter.com/how-to/pre-rendering (docs/how-to/pre-rendering.md at tag react-router@8.5.1: https://github.com/remix-run/react-router/blob/react-router@8.5.1/docs/how-to/pre-rendering.md)

## Related

- [./spa.md](./spa.md)
- [./server-bundles.md](./server-bundles.md)
