---
source: https://vite.dev/config/ssr-options
---

# ssr.* Options

SSR configuration options. Unless noted, applied to both dev and build.

## Signature / Usage

```js
// vite.config.js
export default defineConfig({
  ssr: {
    external: ['linked-dep'],
    noExternal: [/^my-ui-/],
    target: 'node',
    resolve: {
      conditions: ['module', 'node', 'development|production'],
      externalConditions: ['node', 'module-sync'],
      mainFields: ['module', 'jsnext:main', 'jsnext'],
    },
  },
})
```

## Options / Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| ssr.external | `string[] \| true` | — | Externalize the given dependencies and their transitive dependencies for SSR. By default all dependencies are externalized except linked ones (for HMR). `true` externalizes all including linked. Explicit `string[]` entries take priority over `ssr.noExternal`. |
| ssr.noExternal | `string \| RegExp \| (string \| RegExp)[] \| true` | — | Prevent listed dependencies from being externalized (they get bundled in build). By default only linked dependencies are not externalized. `true`: no dependencies externalized, though explicit `ssr.external` (`string[]`) may still externalize. With `ssr.target: 'node'`, Node.js built-ins are also externalized by default. |
| ssr.target | `'node' \| 'webworker'` | `node` | Build target for the SSR server. |
| ssr.resolve.conditions | `string[]` | `['module', 'node', 'development\|production']` (`defaultServerConditions`); `['module', 'browser', 'development\|production']` (`defaultClientConditions`) for `ssr.target === 'webworker'` | Conditions used in the plugin pipeline; only affect non-externalized dependencies during the SSR build. |
| ssr.resolve.externalConditions | `string[]` | `['node', 'module-sync']` | Conditions used during ssr import (including `ssrLoadModule`) of externalized direct dependencies (external dependencies imported by Vite). |
| ssr.resolve.mainFields | `string[]` | `['module', 'jsnext:main', 'jsnext']` | `package.json` fields tried when resolving a package entry point. Lower precedence than conditional `exports`; only affects non-externalized dependencies. |

## Notes

- Related: SSR Externals (./ssr-externals.md); Resolve Conditions (../config-shared/resolve-options.md).
- If both `ssr.noExternal: true` and `ssr.external: true` are set, `ssr.noExternal` takes priority and no dependencies are externalized.
- `ssr.resolve.externalConditions`: run Node with the `--conditions` flag using the same values in dev and build for consistent behavior. For `['node', 'custom']`, run `NODE_OPTIONS='--conditions custom' vite` in dev and `NODE_OPTIONS="--conditions custom" node ./dist/server.js` after build.
- The usage snippet is assembled from the option names and defaults listed on the page; the page has no combined example.

## Related

- [SSR Externals](./ssr-externals.md)
- [SSR Target / Bundle](./ssr-target-bundle.md)
