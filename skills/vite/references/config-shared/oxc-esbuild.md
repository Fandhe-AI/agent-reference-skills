---
source: https://vite.dev/config/shared-options#oxc
---

# oxc / esbuild (deprecated)

`oxc` configures the Oxc transformer used for JavaScript transformation. `esbuild` is the deprecated predecessor option.

## Signature / Usage

```js
export default defineConfig({
  oxc: {
    jsx: {
      runtime: 'classic',
      pragma: 'h',
      pragmaFrag: 'Fragment',
    },
  },
})
```

Inject JSX helper imports for every file transformed by Oxc:

```js
export default defineConfig({
  oxc: {
    jsxInject: `import React from 'react'`,
  },
})
```

## Options / Props

| Name | Type | Description |
| --- | --- | --- |
| `oxc` | `OxcOptions \| false` | `OxcOptions` extends Oxc Transformer's options. `false` disables transformation by Oxc. |
| `oxc.include` / `oxc.exclude` | regex, picomatch pattern, or array of either | Files to transform. By default transformation applies to `ts`, `jsx`, `tsx` files. |
| `oxc.jsxInject` | `string` | Automatically injects JSX helper imports for every file transformed by Oxc. |
| `esbuild` | `ESBuildOptions \| false` | Deprecated. Converted to the `oxc` option internally. |

## Notes

- `esbuild` is Deprecated: use `oxc` instead.
- Migration (v7 → v8): Oxc is now used for JavaScript transformation instead of esbuild. Mappings: `esbuild.jsxInject` / `include` / `exclude` -> `oxc.*`; `esbuild.jsx: 'preserve'` -> `oxc.jsx: 'preserve'`; `'automatic'` -> `oxc.jsx: { runtime: 'automatic' }` (`jsxImportSource` -> `oxc.jsx.importSource`); `'transform'` -> `oxc.jsx: { runtime: 'classic' }` (`jsxFactory` -> `oxc.jsx.pragma`, `jsxFragment` -> `oxc.jsx.pragmaFrag`); `esbuild.jsxDev` -> `oxc.jsx.development`; `esbuild.jsxSideEffects` -> `oxc.jsx.pure`; `esbuild.define` -> `oxc.define`; `esbuild.banner` / `footer` -> custom plugin using the transform hook.
- `esbuild.supported` is not supported by Oxc (oxc-project/oxc#15373). The Oxc transformer does not support lowering native decorators (oxc-project/oxc#9170).

## Related

- [define](./define.md)
- TypeScript
- Migration: Rolldown and Oxc
