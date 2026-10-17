---
source: https://vite.dev/guide/features#css-pre-processors
---

# CSS Pre-processors / Lightning CSS

Vite has built-in support for `.scss`, `.sass`, `.less`, `.styl` and `.stylus` files. Lightning CSS minifies CSS in production builds by default.

## Signature / Usage

No Vite-specific plugins are needed, but the pre-processor itself must be installed:

```bash
# .scss and .sass
npm add -D sass-embedded # or sass

# .less
npm add -D less

# .styl and .stylus
npm add -D stylus
```

Opt into experimental Lightning CSS processing with `css.transformer: 'lightningcss'`; pass Lightning CSS options via `css.lightningcss`.

## Notes

- Because Vite targets modern browsers only, native CSS variables with PostCSS plugins implementing CSSWG drafts (e.g. `postcss-nesting`) are recommended.
- If using Vue single file components, this also enables `<style lang="sass">` et al.
- Vite improves `@import` resolving for Sass and Less so aliases are respected; relative `url()` references inside imported Sass/Less files in different directories are rebased. Rebasing `url()` references that start with a variable or an interpolation is not supported.
- `@import` alias and url rebasing are not supported for Stylus due to its API constraints.
- Lightning CSS: PostCSS is still used for other CSS processing by default. Full Lightning CSS processing via `css.transformer: 'lightningcss'` is experimental.

## Related

- [css.transformer / css.lightningcss](../config-shared/css-transformer-lightningcss.md)
- [CSS Modules](./css-modules.md)
