---
source: https://vite.dev/guide/features#css-modules
---

# CSS Modules

Any CSS file ending with `.module.css` is considered a CSS modules file. Importing it returns the corresponding module object.

## Signature / Usage

```css
/* example.module.css */
.red {
  color: red;
}
```

```js
import classes from './example.module.css'
document.getElementById('foo').className = classes.red
```

If `css.modules.localsConvention` enables camelCase locals (e.g. `localsConvention: 'camelCaseOnly'`), named imports also work:

```js
// .apply-color -> applyColor
import { applyColor } from './example.module.css'
document.getElementById('foo').className = applyColor
```

## Notes

- Behavior is configured via the `css.modules` option.
- CSS modules can be combined with pre-processors by prepending `.module` to the file extension, e.g. `style.module.scss`.
- When using Lightning CSS for CSS processing, configure CSS Modules via `css.lightningcss.cssModules` instead of `css.modules` (which configures how PostCSS handles CSS modules).

## Related

- [css.modules option](../config-shared/css-modules-options.md)
- [CSS Pre-processors / Lightning CSS](./css-preprocessors-lightningcss.md)
