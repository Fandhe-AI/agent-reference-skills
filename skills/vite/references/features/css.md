---
source: https://vite.dev/guide/features#css
---

# CSS (@import, PostCSS, injection)

Importing `.css` files injects its content to the page via a `<style>` tag with HMR support.

## Signature / Usage

The automatic injection can be turned off via the `?inline` query parameter. The processed CSS string is returned as the default export, but the styles are not injected:

```js
import './foo.css' // will be injected into the page
import otherStyles from './bar.css?inline' // will not be injected
```

## Notes

- `@import` inlining: Vite is pre-configured to support CSS `@import` inlining via `postcss-import`. Vite aliases are respected for CSS `@import`. All CSS `url()` references are automatically rebased, even if the imported files are in different directories. Alias and rebasing are also supported for Sass and Less files.
- PostCSS: if the project contains a valid PostCSS config (any format supported by `postcss-load-config`, e.g. `postcss.config.js`), it is automatically applied to all imported CSS. CSS minification runs after PostCSS and uses the `build.cssTarget` option.
- Default and named imports from CSS files (e.g. `import style from './foo.css'`) are removed since Vite 5. Use the `?inline` query instead.

## Related

- [CSS Modules](./css-modules.md)
- [CSS Pre-processors / Lightning CSS](./css-preprocessors-lightningcss.md)
- [css.postcss / preprocessorOptions](../config-shared/css-postcss-preprocessor-options.md)
