# Sass

Built-in support for styling with Sass (`.scss`/`.sass`) after installing the `sass` package, including component-level Sass via CSS Modules.

## Signature / Usage

```bash
npm install --save-dev sass
```

```ts filename="next.config.ts"
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  sassOptions: {
    additionalData: `$var: red;`,
  },
}

export default nextConfig
```

```scss filename="app/variables.module.scss"
$primary-color: #64ff00;

:export {
  primaryColor: $primary-color;
}
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `sassOptions.additionalData` | `string` | Prepends Sass code (e.g. shared variables) to every compiled file |
| `sassOptions.implementation` | `string` | Selects the Sass implementation (default `sass`; e.g. `'sass-embedded'`) |

## Notes

- `.scss` uses SCSS syntax (superset of CSS); `.sass` uses the Indented Syntax — `.scss` is recommended if unsure.
- Component-level Sass uses CSS Modules with `.module.scss`/`.module.sass` extensions.
- Sass variables can be exported from a `:export` block in a module file and imported as a plain JS object in a component.

## Related

- [Tailwind CSS v3](./tailwind-v3-css.md)
- [CSS-in-JS](https://nextjs.org/docs/app/guides/css-in-js)
