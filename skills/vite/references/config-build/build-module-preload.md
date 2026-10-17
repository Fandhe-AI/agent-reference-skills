---
source: https://vite.dev/config/build-options#build-modulepreload
---

# build.modulePreload / build.polyfillModulePreload

Module preload polyfill injection and control over the preloaded dependency list for dynamic imports.

## Signature / Usage

```js
import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    modulePreload: {
      resolveDependencies: (filename, deps, { hostId, hostType }) => {
        return deps.filter(condition)
      },
    },
  },
})
```

```ts
type ResolveModulePreloadDependenciesFn = (
  url: string,
  deps: string[],
  context: {
    hostId: string
    hostType: 'html' | 'js'
  },
) => string[]
```

If the build uses a non-HTML custom entry via `build.rolldownOptions.input`, import the polyfill manually in the entry:

```js
import 'vite/modulepreload-polyfill'
```

## Options / Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `build.modulePreload` | `boolean \| { polyfill?: boolean, resolveDependencies?: ResolveModulePreloadDependenciesFn }` | `{ polyfill: true }` | Module preload configuration. `{ polyfill: false }` disables the polyfill |
| `build.polyfillModulePreload` | `boolean` | `true` | Deprecated: use `build.modulePreload.polyfill` instead |

## Notes

- The polyfill is auto injected into the proxy module of each `index.html` entry.
- The polyfill does not apply to Library Mode. If you need to support browsers without native dynamic import, avoid using it in your library.
- Vite computes the chunks to preload for each dynamic import. By default an absolute path including `base` is used; if `base` is relative (`''` or `'./'`), `import.meta.url` is used at runtime.
- `resolveDependencies` is experimental. It is called for each dynamic import with the list of chunks it depends on, and also for each chunk imported in entry HTML files. Return a new array (filtered, extended, or with modified paths). `deps` paths are relative to `build.outDir`, and the return value must be relative to `build.outDir` as well.
- Resolved dependency paths can be further modified using `experimental.renderBuiltUrl`.
- `build.polyfillModulePreload` is deprecated.

## Related

- [build-chunk-import-map.md](./build-chunk-import-map.md)
- [build-lib.md](./build-lib.md)
