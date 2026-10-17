---
source: https://vite.dev/guide/migration#javascript-transforms-by-oxc
---

# Dependency Optimizer & JS Transforms (Rolldown / Oxc)

The dependency optimizer now uses Rolldown instead of esbuild, and JavaScript transformation uses Oxc instead of esbuild. The old `optimizeDeps.esbuildOptions` and `esbuild` options are converted automatically but deprecated.

## Signature / Usage

Inspect the options produced by the compatibility layer from the `configResolved` hook:

```js
const plugin = {
  name: 'log-config',
  configResolved(config) {
    console.log('options', config.optimizeDeps.rolldownOptions)
    // for the esbuild -> oxc layer:
    // console.log('options', config.oxc)
  },
}
```

## Options / Props

`optimizeDeps.esbuildOptions` -> `optimizeDeps.rolldownOptions` (converted automatically):

| esbuildOptions | rolldownOptions |
| --- | --- |
| `minify` | `output.minify` |
| `treeShaking` | `treeshake` |
| `define` | `transform.define` |
| `loader` | `moduleTypes` |
| `preserveSymlinks` | `!resolve.symlinks` |
| `resolveExtensions` | `resolve.extensions` |
| `mainFields` | `resolve.mainFields` |
| `conditions` | `resolve.conditionNames` |
| `keepNames` | `output.keepNames` |
| `platform` | `platform` |
| `plugins` | `plugins` (partial support) |

`esbuild` -> `oxc` (converted automatically):

| esbuild | oxc |
| --- | --- |
| `jsxInject` | `oxc.jsxInject` |
| `include` | `oxc.include` |
| `exclude` | `oxc.exclude` |
| `jsx: 'preserve'` | `oxc.jsx: 'preserve'` |
| `jsx: 'automatic'` | `oxc.jsx: { runtime: 'automatic' }` |
| `jsxImportSource` | `oxc.jsx.importSource` |
| `jsx: 'transform'` | `oxc.jsx: { runtime: 'classic' }` |
| `jsxFactory` | `oxc.jsx.pragma` |
| `jsxFragment` | `oxc.jsx.pragmaFrag` |
| `jsxDev` | `oxc.jsx.development` |
| `jsxSideEffects` | `oxc.jsx.pure` |
| `define` | `oxc.define` |
| `banner` / `footer` | custom plugin using the transform hook |

## Notes

- `optimizeDeps.esbuildOptions` is deprecated and will be removed in the future. Migrate to `optimizeDeps.rolldownOptions`.
- `esbuild` option is deprecated and will be removed in the future. Migrate to `oxc`.
- `esbuild.supported` is not supported by Oxc (see oxc-project/oxc#15373).
- The Oxc transformer does not support lowering native decorators yet (oxc-project/oxc#9170). Workaround: use Babel or SWC for the time being. The source gives these examples.
- esbuild fallbacks: `esbuild` is no longer directly used by Vite and is now an optional dependency. A plugin that uses `transformWithEsbuild` requires `esbuild` installed as a `devDependency`. `transformWithEsbuild` is deprecated and will be removed; migrate to `transformWithOxc`.
- Migration (v7 -> v8): see also `config-dev/optimize-deps-rolldown-esbuild-options.md`, `config-shared/oxc-esbuild.md` and `javascript-api/transform-with-oxc-esbuild.md`.

Workaround for lowering native decorators with Babel:

```ts
import babel from '@rolldown/plugin-babel'
import { defineConfig } from 'vite'

function decoratorPreset(options: Record<string, unknown>) {
  return {
    preset: () => ({
      plugins: [['@babel/plugin-proposal-decorators', options]],
    }),
    rolldown: {
      // Only run this transform if the file contains a decorator.
      filter: {
        code: '@',
      },
    },
  }
}

export default defineConfig({
  plugins: [babel({ presets: [decoratorPreset({ version: '2023-11' })] })],
})
```

Workaround with SWC (`npm install -D @rollup/plugin-swc @swc/core`):

```js
import swc from '@rollup/plugin-swc'
import { defineConfig, withFilter } from 'vite'

export default defineConfig({
  // ...
  plugins: [
    withFilter(
      swc({
        swc: {
          jsc: {
            parser: { decorators: true, decoratorsBeforeExport: true },
            transform: { decoratorVersion: '2023-11' },
          },
        },
      }),
      // Only run this transform if the file contains a decorator.
      { transform: { code: '@' } },
    ),
  ],
})
```

## Related

- [migration-v7-overview.md](./migration-v7-overview.md)
- [migration-minify-interop.md](./migration-minify-interop.md)
- [../config-dev/optimize-deps-rolldown-esbuild-options.md](../config-dev/optimize-deps-rolldown-esbuild-options.md)
- [../config-shared/oxc-esbuild.md](../config-shared/oxc-esbuild.md)
