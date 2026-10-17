---
source: https://github.com/vitejs/vite/tree/v8.3.4/packages/plugin-legacy
---

# @vitejs/plugin-legacy

Provides support for legacy browsers that lack native ESM dynamic import and `import.meta` when building for production.

## Signature / Usage

```js
// vite.config.js
import legacy from '@vitejs/plugin-legacy'

export default {
  plugins: [
    legacy({
      targets: ['defaults', 'not IE 11'],
    }),
  ],
}
```

By default the plugin:

- Generates a legacy chunk for every chunk in the final bundle, transformed with `@babel/preset-env` and emitted as SystemJS modules (code splitting still supported).
- Generates a polyfill chunk including the SystemJS runtime and any polyfills determined by browser targets and actual usage in the bundle.
- Injects `<script nomodule>` tags into generated HTML to conditionally load the polyfills and legacy bundle only in browsers without widely-available features support.
- Injects the `import.meta.env.LEGACY` env variable, `true` only in the legacy production build.

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `targets` | `string \| string[] \| { [key: string]: string }` | `'last 2 versions and not dead, > 0.3%, Firefox ESR'` | Passed to `@babel/preset-env` when rendering legacy chunks. Browserslist compatible; if unset, browserslist config sources are loaded, then the default is used |
| `modernTargets` | `string \| string[]` | `'edge>=105, firefox>=106, chrome>=105, safari>=16.4, chromeAndroid>=105, iOS>=16.4'` | Passed to `@babel/preset-env` when collecting polyfills for modern chunks; overrides `build.target`. Should not be set unless `renderLegacyChunks` is `false` |
| `polyfills` | `boolean \| string[]` | `true` | Polyfills chunk based on target ranges and actual usage (`useBuiltIns: 'usage'`). A string list explicitly controls polyfills; `false` skips polyfill generation (legacy chunks still get syntax transforms) |
| `additionalLegacyPolyfills` | `string[]` | — | Custom imports added to the legacy polyfills chunk (e.g. DOM API polyfills) |
| `additionalModernPolyfills` | `string[]` | — | Custom imports added to the modern polyfills chunk |
| `modernPolyfills` | `boolean \| string[]` | `false` | Generate a separate polyfills chunk for the modern build. A string list explicitly controls polyfills |
| `renderLegacyChunks` | `boolean` | `true` | Set `false` to disable legacy chunks (useful with `modernPolyfills` to inject polyfills into the modern build only) |
| `externalSystemJS` | `boolean` | `false` | Exclude `systemjs/dist/s.min.js` inside the polyfills-legacy chunk |
| `renderModernChunks` | `boolean` | `true` | Set `false` to output only legacy bundles supporting all target browsers; useful on the `file:` protocol where `type="module"` may trigger CORS restrictions |

Polyfill specifiers for `polyfills` / `modernPolyfills`:

```js
import legacy from '@vitejs/plugin-legacy'

export default {
  plugins: [
    legacy({
      polyfills: ['es.promise.finally', 'es/map', 'es/set'],
      modernPolyfills: ['es.promise.finally'],
    }),
  ],
}
```

## Notes

- Terser must be installed for minification (`npm add -D terser`) when using Vite versions older than 8.1.4 or when `build.minify` is explicitly set to `terser`.
- Specifiers are either `core-js` 3 sub import paths (`es/map` imports `core-js/es/map`) or individual `core-js` 3 modules (`es.array.iterator` imports `core-js/modules/es.array.iterator.js`).
- `modernPolyfills: true` without `modernTargets` is not recommended: `core-js@3` is aggressive and can inject about 15kb of polyfills even when targeting native ESM.
- Browsers with ESM but without widely-available features (e.g. legacy Edge): the plugin injects a runtime check and loads the legacy bundle with SystemJS if needed. Drawbacks: the modern bundle is downloaded in all ESM browsers, and throws in browsers lacking those features. Features considered widely-available: dynamic import, async generator, `import.meta.resolve`.
- CSP: the plugin requires inline scripts (Safari 10.1 `nomodule` fix, SystemJS initialization, dynamic import fallback). Add their hashes to `script-src`; the values (without `sha256-` prefix) are exported as `cspHashes`:

```js
import { cspHashes } from '@vitejs/plugin-legacy'
```

- The `cspHashes` values can change between minor versions; generate the CSP header from the export, or pin the minor version with `~` if copying manually.
- With the `regenerator-runtime` polyfill and no `globalThis`, a dynamic `Function(...)` call violates CSP; consider adding `core-js/proposals/global-this` to `additionalLegacyPolyfills`.

## Related

- [official-plugins.md](./official-plugins.md)
- [using-plugins.md](./using-plugins.md)
- [overview.md](./overview.md)
