---
source: https://tailwindcss.com/docs/functions-and-directives
---

# Functions and directives

A reference for the custom functions and directives Tailwind exposes to your CSS.

## Signature / Usage

```css
@import "tailwindcss";

@theme {
  --color-avocado-500: oklch(0.84 0.18 117.33);
}

@utility tab-4 {
  tab-size: 4;
}

.my-element {
  background: white;
  color: --alpha(var(--color-lime-300) / 50%);
  margin: --spacing(4);

  @variant dark {
    background: black;
  }
}
```

## Options / Props

| Name | Kind | Description |
|------|------|-------------|
| `@import` | directive | Inline import CSS files, including Tailwind itself |
| `@theme` | directive | Define custom design tokens (fonts, colors, breakpoints) |
| `@source` | directive | Explicitly specify source files not picked up by automatic content detection |
| `@utility` | directive | Add custom utilities that work with variants like `hover`, `focus` and `lg` |
| `@variant` | directive | Apply a Tailwind variant to styles in your CSS |
| `@custom-variant` | directive | Add a custom variant |
| `@apply` | directive | Inline existing utility classes into your own custom CSS |
| `@reference` | directive | Import a stylesheet for reference without including its styles |
| `--alpha()` | function | Adjust the opacity of a color |
| `--spacing()` | function | Generate a spacing value based on your theme |
| `@config` | directive (compat) | Load a legacy JavaScript-based configuration file |
| `@plugin` | directive (compat) | Load a legacy JavaScript-based plugin |
| `theme()` | function (compat, deprecated) | Access theme values using dot notation |

## Notes

### @import / @theme / @source

```css
@import "tailwindcss";
```

```css
@theme {
  --font-display: "Satoshi", "sans-serif";

  --breakpoint-3xl: 120rem;

  --color-avocado-100: oklch(0.99 0 0);
  --color-avocado-200: oklch(0.98 0.04 113.22);
  --color-avocado-300: oklch(0.94 0.11 115.03);
  --color-avocado-400: oklch(0.92 0.19 114.08);
  --color-avocado-500: oklch(0.84 0.18 117.33);
  --color-avocado-600: oklch(0.53 0.12 118.34);

  --ease-fluid: cubic-bezier(0.3, 0, 0, 1);
  --ease-snappy: cubic-bezier(0.2, 0, 0, 1);

  /* ... */
}
```

```css
@source "../node_modules/@my-company/ui-lib";
```

### @utility / @variant / @custom-variant

```css
@custom-variant theme-midnight (&:where([data-theme="midnight"] *));
```

This lets you write `theme-midnight:bg-black` and `theme-midnight:text-white`.

### @apply

Useful when writing custom CSS (for example to override a third-party library) while still using design tokens and utility syntax.

```css
.select2-dropdown {
  @apply rounded-b-lg shadow-md;
}

.select2-search {
  @apply rounded border border-gray-300;
}

.select2-results__group {
  @apply text-lg font-bold text-gray-900;
}
```

### @reference

To use `@apply` or `@variant` in a Vue or Svelte `<style>` block or in CSS modules, import your theme variables, custom utilities and custom variants with `@reference` (no CSS is duplicated in the output). If you only use the default theme with no customizations (`@theme`, `@custom-variant`, `@plugin`, etc.), you can reference `tailwindcss` directly.

```html
<template>
  <h1>Hello world!</h1>
</template>

<style>
  @reference "../../app.css";

  h1 {
    @apply text-2xl font-bold text-red-500;
  }
</style>
```

```html
<style>
  @reference "tailwindcss";

  h1 {
    @apply text-2xl font-bold text-red-500;
  }
</style>
```

### Subpath imports

When using the CLI, Vite, or PostCSS, `@import`, `@reference`, `@plugin`, and `@config` support Node.js subpath imports (similar to bundler and TypeScript path aliases):

```json
{
  "imports": {
    "#app.css": "./src/css/app.css"
  }
}
```

```html
<style>
  @reference "#app.css";

  h1 {
    @apply text-2xl font-bold text-red-500;
  }
</style>
```

### Functions

```css
.my-element {
  color: --alpha(var(--color-lime-300) / 50%);
}
```

Compiled:

```css
.my-element {
  color: color-mix(in oklab, var(--color-lime-300) 50%, transparent);
}
```

```css
.my-element {
  margin: --spacing(4);
}
```

Compiled:

```css
.my-element {
  margin: calc(var(--spacing) * 4);
}
```

`--spacing()` is also useful in arbitrary values, especially with `calc()`:

```html
<div class="py-[calc(--spacing(4)-1px)]">
  <!-- ... -->
</div>
```

### Compatibility

`@config`, `@plugin`, and `theme()` exist solely for compatibility with Tailwind CSS v3.x. `@config` and `@plugin` can be used together with `@theme`, `@utility`, and other CSS-driven features to move incrementally to CSS; things defined in CSS are merged where possible and otherwise take precedence over config, presets, and plugins.

```css
@config "../../tailwind.config.js";
@plugin "@tailwindcss/typography";
```

- The `corePlugins`, `safelist`, and `separator` options of the JavaScript config are not supported in v4.0. To safelist utilities in v4 use `@source inline()`.
- `@plugin` accepts either a package name or a local path.
- `theme()` is deprecated; use CSS theme variables instead.

```css
.my-element {
  margin: theme(spacing.12);
}
```

- Migration (v3 → v4): `theme(colors.red.500)` becomes `var(--color-red-500)`; where `theme()` is still needed (for example media queries) use the CSS variable name, `theme(--breakpoint-xl)` instead of `theme(screens.xl)`. JavaScript config files are no longer detected automatically; load one explicitly with `@config`. `corePlugins` is no longer supported. `@layer utilities` / `@layer components` custom classes are replaced by `@utility`. `@reference` is needed for `@apply` in separately bundled stylesheets (Vue, Svelte, Astro `<style>`, CSS modules). Sass, Less, and Stylus are not supported.
- Biome parsing of Tailwind syntax (`@theme`, `@apply`, etc.) is configured through `css.parser.tailwindDirectives`; see the biome skill.
- Transcribed from `tailwindlabs/tailwindcss.com@7f92c22` `src/docs/functions-and-directives.mdx` (fetched 2026-10-16) and `upgrade-guide.mdx`.

## Related

- [Adding custom styles](./adding-custom-styles.md)
- [Detecting classes in source files](./detecting-classes-in-source-files.md)
- [Theme variables](./theme.md)
