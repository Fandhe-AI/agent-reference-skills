---
source: https://vite.dev/guide/features#npm-dependency-resolving-and-pre-bundling
---

# npm Dependency Resolving and Pre-Bundling

Vite detects bare module imports in all served source files, pre-bundles them, and rewrites the imports to valid URLs the browser can import.

## Signature / Usage

Native ES imports do not support bare module imports like the following (the browser throws an error):

```js
import { someMethod } from 'my-dep'
```

Vite rewrites such imports to URLs like `/node_modules/.vite/deps/my-dep.js?v=f3sf2ebd`.

## Notes

- Vite performs two steps on every detected bare import: (1) pre-bundle to improve page loading speed and convert CommonJS / UMD modules to ESM, performed with Rolldown, which makes cold start significantly faster than any JavaScript-based bundler; (2) rewrite the imports to valid URLs.
- Dependencies are strongly cached via HTTP headers. To locally edit/debug a dependency, follow the Browser Cache steps in dep-caching.md.

## Related

- [Dependency Pre-Bundling](./dep-pre-bundling.md)
- [Dependency Caching](./dep-caching.md)
