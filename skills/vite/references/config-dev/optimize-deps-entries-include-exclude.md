---
source: https://vite.dev/config/dep-optimization-options#optimizedeps-entries
---

# optimizeDeps.entries / include / exclude

Control which entries are crawled and which dependencies are (or are not) pre-bundled by the dependency optimizer. Unless noted, dep optimization options apply only to the dependency optimizer, which is only used in dev.

## Signature / Usage

```js
export default defineConfig({
  optimizeDeps: {
    include: ['esm-dep > cjs-dep'],
  },
})
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `optimizeDeps.entries` | `string \| string[]` | Custom crawl entries: a `tinyglobby` pattern or array relative to the project root. Overwrites default entries inference |
| `optimizeDeps.exclude` | `string[]` | Dependencies to exclude from pre-bundling |
| `optimizeDeps.include` | `string[]` | Force pre-bundling of linked packages not inside `node_modules` (not pre-bundled by default) |

## Notes

- Not inherited by environments (`optimizeDeps.entries` / `exclude` / `include`).
- Default crawl of `entries`: all `.html` files (ignoring `node_modules`, `build.outDir`, `__tests__` and `coverage`). If top-level `input` or `build.rolldownOptions.input` is specified, those entry points are crawled instead.
- When `entries` is explicitly defined, only `node_modules` and `build.outDir` are ignored by default. Ignore other folders with a `!`-prefixed pattern in the list. `node_modules` is not ignored for patterns that explicitly include the string `node_modules`.
- CommonJS dependencies should not be excluded. If an ESM dependency is excluded but has a nested CommonJS dependency, add the CommonJS dependency to `optimizeDeps.include` (e.g. `'esm-dep > cjs-dep'`).
- Experimental: `include` accepts a trailing glob (e.g. `include: ['my-lib/components/**/*.vue']`) to pre-bundle all deep imports at once and avoid repeated re-bundling when a new deep import is used.

## Related

- [optimize-deps-rolldown-esbuild-options.md](./optimize-deps-rolldown-esbuild-options.md)
- [optimize-deps-flags.md](./optimize-deps-flags.md)
