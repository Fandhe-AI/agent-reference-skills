---
source: https://vite.dev/guide/migration#dependency-optimizer-now-uses-rolldown
---

# Migrate esbuild Options to Rolldown / Oxc (v7 to v8)

Inspect how Vite v8 converts deprecated `optimizeDeps.esbuildOptions` and `esbuild` options, then write the new options directly.

```js
const plugin = {
  name: 'log-config',
  configResolved(config) {
    console.log('options', config.optimizeDeps.rolldownOptions)
  },
}
```

```js
const plugin = {
  name: 'log-config',
  configResolved(config) {
    console.log('options', config.oxc)
  },
}
```

Automatic conversions documented for `optimizeDeps.esbuildOptions` to `optimizeDeps.rolldownOptions`:

```
esbuildOptions.minify           -> rolldownOptions.output.minify
esbuildOptions.treeShaking      -> rolldownOptions.treeshake
esbuildOptions.define           -> rolldownOptions.transform.define
esbuildOptions.loader           -> rolldownOptions.moduleTypes
esbuildOptions.preserveSymlinks -> !rolldownOptions.resolve.symlinks
esbuildOptions.resolveExtensions-> rolldownOptions.resolve.extensions
esbuildOptions.mainFields       -> rolldownOptions.resolve.mainFields
esbuildOptions.conditions       -> rolldownOptions.resolve.conditionNames
esbuildOptions.keepNames        -> rolldownOptions.output.keepNames
esbuildOptions.platform         -> rolldownOptions.platform
esbuildOptions.plugins          -> rolldownOptions.plugins (partial support)
```

And for `esbuild` to `oxc`:

```
esbuild.jsxInject  -> oxc.jsxInject
esbuild.include    -> oxc.include
esbuild.exclude    -> oxc.exclude
esbuild.jsx: 'preserve'  -> oxc.jsx: 'preserve'
esbuild.jsx: 'automatic' -> oxc.jsx: { runtime: 'automatic' }
esbuild.jsxImportSource  -> oxc.jsx.importSource
esbuild.jsx: 'transform' -> oxc.jsx: { runtime: 'classic' }
esbuild.jsxFactory       -> oxc.jsx.pragma
esbuild.jsxFragment      -> oxc.jsx.pragmaFrag
esbuild.jsxDev           -> oxc.jsx.development
esbuild.jsxSideEffects   -> oxc.jsx.pure
esbuild.define           -> oxc.define
esbuild.banner / footer  -> custom plugin using transform hook
```

## Notes

- The migration guide gives the mappings as lists, not before/after config files; the two `configResolved` snippets are the docs' way to view what the compatibility layer produced.
- The official migration guide ends both snippets with a trailing `},` (a fragment from a plugins array); it is written here as `}` so the standalone `const` declaration is valid.
- `optimizeDeps.esbuildOptions`, `esbuild`, `transformWithEsbuild` and `build.minify: 'esbuild'` are deprecated and planned for removal; `esbuild` is now an optional dependency (install it as a devDependency if a plugin still needs it).
- `esbuild.supported` is not supported by Oxc, and the Oxc transformer does not lower native decorators; the docs show Babel and SWC workarounds.
- Replacement for `esbuild.minify*` is `build.rolldownOptions.output.minify`; for `esbuild.drop` use `build.rolldownOptions.output.minify.compress.drop*`.
