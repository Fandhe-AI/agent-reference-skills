---
source: https://vite.dev/config/shared-options#css-transformer
---

# css.transformer / css.lightningcss

Select the CSS processing engine and configure Lightning CSS.

## Signature / Usage

```js
import type {
  CSSModulesConfig,
  Drafts,
  Features,
  NonStandard,
  PseudoClasses,
  Targets,
} from 'lightningcss'
```

```js
{
  targets?: Targets
  include?: Features
  exclude?: Features
  drafts?: Drafts
  nonStandard?: NonStandard
  pseudoClasses?: PseudoClasses
  unusedSymbols?: string[]
  cssModules?: CSSModulesConfig,
  // ...
}
```

## Options / Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `css.transformer` | `'postcss' \| 'lightningcss'` | `'postcss'` | Engine used for CSS processing. |
| `css.lightningcss` | object (`targets`, `include`, `exclude`, `drafts`, `nonStandard`, `pseudoClasses`, `unusedSymbols`, `cssModules`, ...) | — | Lightning CSS configuration. Full transform options are in the Lightning CSS repo (`node/index.d.ts`). |

## Notes

- Experimental (both options).
- postcss (postcss-import) behaves differently from browsers with duplicated `@import`s (postcss/postcss-import#462).
- When Lightning CSS is used, `css.modules` has no effect; use `css.lightningcss.cssModules`.
- Migration (v7 → v8): Lightning CSS is now the default for CSS minification (see `build.cssMinify`).

## Related

- [css.modules](./css-modules-options.md)
- [CSS Pre-processors / Lightning CSS](../features/css-preprocessors-lightningcss.md)
- [build.cssMinify](../config-build/build-css-options.md)
