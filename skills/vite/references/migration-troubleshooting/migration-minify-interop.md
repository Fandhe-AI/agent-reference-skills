---
source: https://vite.dev/guide/migration#consistent-commonjs-interop
---

# Minification & CommonJS Interop Changes

JavaScript minification moves to the Oxc Minifier, CSS minification to Lightning CSS, and CommonJS `default` import handling, `browser` / `module` field resolution, `require` calls for externals, and `import.meta.url` in UMD / IIFE change behavior.

## Signature / Usage

Preserved `require` calls for externalized modules can be converted to `import` statements with the Rolldown built-in plugin re-exported from `vite`:

```js
import { defineConfig, esmExternalRequirePlugin } from 'vite'

export default defineConfig({
  // ...
  plugins: [
    esmExternalRequirePlugin({
      external: ['react', 'vue', /^node:/],
    }),
  ],
})
```

## Options / Props

| Change | Old / switch back | New |
| --- | --- | --- |
| JS minification | `build.minify: 'esbuild'` (deprecated; needs `esbuild` as `devDependency`) | Oxc Minifier |
| `esbuild.minify*` options | `esbuild.minify*` | `build.rolldownOptions.output.minify` |
| `esbuild.drop` | `esbuild.drop` | `build.rolldownOptions.output.minify.compress.drop*` |
| CSS minification | `build.cssMinify: 'esbuild'` (needs `esbuild` as `devDependency`) | Lightning CSS |
| CJS default import interop | `legacy.inconsistentCjsInterop: true` (deprecated, temporary) | consistent rules (see Notes) |
| `import.meta.url` in UMD / IIFE | polyfilled | replaced with `undefined` |

## Notes

- Oxc Minifier does not support property mangling and related options (`mangleProps`, `reserveProps`, `mangleQuoted`, `mangleCache`); see oxc-project/oxc#15375. `build.minify: 'esbuild'` is deprecated and will be removed in the future.
- Lightning CSS supports better syntax lowering and the CSS bundle size might increase slightly.
- Consistent CommonJS interop: the `default` import is the `module.exports` value of the importee CJS module if any of these holds; otherwise it is `module.exports.default`: the importer is `.mjs` or `.mts`; the closest `package.json` of the importer has `type: "module"`; `module.exports.__esModule` of the importee is not `true`. This may break existing code importing CJS modules. Report affected packages to the package author, linking the Rolldown doc "Ambiguous `default` import from CJS modules" (https://rolldown.rs/in-depth/bundling-cjs#ambiguous-default-import-from-cjs-modules).
- Previous behavior in dev: the first two conditions applied only when the importer was included in dependency optimization. In build the conditions were: `module.exports.__esModule` not `true`, and `default` property of `module.exports` does not exist (assuming `build.commonjsOptions.defaultIsModuleExports` was the default `'auto'`).
- Removed format sniffing: when both `browser` and `module` fields exist in `package.json`, Vite no longer picks the ESM file by content; it always respects the order of `resolve.mainFields`. Use `resolve.alias` to map the field to the desired file, or patch with your package manager (`patch-package`, `pnpm patch`).
- Require calls for externalized modules are now preserved as `require` calls and are not converted to `import` statements.
- `import.meta.url` is no longer polyfilled in UMD / IIFE output formats. To restore the previous behavior use `define` together with `build.rolldownOptions.output.intro` (see Rolldown docs "Well-known import.meta properties").
- Migration (v7 -> v8): see also `config-build/build-minify.md` and `config-build/build-css-options.md`.

## Related

- [migration-v7-overview.md](./migration-v7-overview.md)
- [migration-build-api-changes.md](./migration-build-api-changes.md)
- [../config-build/build-minify.md](../config-build/build-minify.md)
- [../config-build/build-css-options.md](../config-build/build-css-options.md)
