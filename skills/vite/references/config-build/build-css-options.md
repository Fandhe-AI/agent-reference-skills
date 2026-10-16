---
source: https://vite.dev/config/build-options#build-csscodesplit
---

# build.cssCodeSplit / cssTarget / cssMinify

CSS code splitting, CSS minification target, and CSS minifier selection.

## Signature / Usage

```js
import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    cssCodeSplit: true,
    cssTarget: 'chrome61',
    cssMinify: 'lightningcss',
  },
})
```

```sh
npm add -D esbuild
```

## Options / Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `build.cssCodeSplit` | `boolean` | `true` | When enabled, CSS imported in async JS chunks is preserved as chunks and fetched together with the chunk. If disabled, all CSS in the project is extracted into a single CSS file |
| `build.cssTarget` | `string \| string[]` | same as `build.target` | Browser target for CSS minification, separate from the JavaScript target |
| `build.cssMinify` | `boolean \| 'lightningcss' \| 'esbuild'` | `'lightningcss'`, but `false` if `build.minify` is disabled for client build | Override CSS minification separately from `build.minify` |

## Notes

- If `build.lib` is specified, `build.cssCodeSplit` defaults to `false`.
- When `build.cssMinify` is `'lightningcss'` (the default), `build.cssTarget` takes precedence over `css.lightningcss.targets` for the minification step.
- `build.cssTarget` should only be used when targeting a non-mainstream browser. Example: Android WeChat WebView supports most modern JavaScript features but not the `#RGBA` hexadecimal color notation in CSS; set `build.cssTarget` to `chrome61` to prevent Vite from transforming `rgba()` colors into `#RGBA`.
- Lightning CSS is configurable using `css.lightningcss`. Set `'esbuild'` to use esbuild instead; esbuild must be installed.
- Migration (v7 → v8): Lightning CSS is now the default CSS minifier. Use `build.cssMinify: 'esbuild'` to switch back (install `esbuild` as a devDependency). Lightning CSS supports better syntax lowering and the CSS bundle size might increase slightly.

## Related

- [build-target.md](./build-target.md)
- [build-minify.md](./build-minify.md)
- [build-lib.md](./build-lib.md)
