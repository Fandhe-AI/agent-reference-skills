---
source: https://tailwindcss.com/docs/compatibility
---

# Compatibility

Learn about browser support and compatibility with other tooling.

## Signature / Usage

```css
/* app.css */
@import "tailwindcss";
@import "./typography.css";
```

Tailwind bundles other CSS files included with `@import` without a separate preprocessing tool (no Sass or `postcss-import`).

## Browser support

Tailwind CSS v4.0 is designed for and tested on modern browsers. Core functionality depends on:

| Browser | Minimum version |
|---------|-----------------|
| Chrome | 111 (released March 2023) |
| Safari | 16.4 (released March 2023) |
| Firefox | 128 (released July 2024) |

Tailwind also includes support for bleeding-edge platform features like `field-sizing: content`, `@starting-style`, and `text-wrap: balance` that have limited browser support. If the browsers you target don't support them, don't use those utilities and variants.

## Sass, Less, and Stylus

Tailwind CSS v4.0 is not designed to be used with CSS preprocessors like Sass, Less, or Stylus. Think of Tailwind CSS itself as your preprocessor.

Variables: use native CSS variables.

```css
/* typography.css */
.typography {
  font-size: var(--text-base);
  color: var(--color-gray-700);
}
```

Nesting: Tailwind uses Lightning CSS to process nested CSS and flatten it for modern browsers.

```css
/* typography.css */
.typography {
  p {
    font-size: var(--text-base);
  }
  img {
    border-radius: var(--radius-lg);
  }
}
```

```css
/* output.css */
.typography p {
  font-size: var(--text-base);
}

.typography img {
  border-radius: var(--radius-lg);
}
```

Loops: classes like `col-span-1`, `col-span-2` are generated on-demand by Tailwind, so loops are not needed.

Color and math functions: use a predefined palette with light and dark shades (the default color palette), or modern CSS like `color-mix()`. Browsers support `min()`, `max()`, and `round()` natively.

```html
<button class="bg-indigo-500 hover:bg-indigo-600 ...">
  <!-- ... -->
</button>
```

## CSS modules

Tailwind is compatible with CSS modules, but using them together is not recommended if you can avoid it.

- Scoping concerns: CSS modules solve scoping problems that don't exist when composing utility classes; styles are naturally scoped with Tailwind.
- Performance: build tools like Vite, Parcel, and Turbopack process each CSS module separately, so with 50 CSS modules Tailwind needs to run 50 separate times.
- Explicit context sharing: CSS modules are each processed separately, so they have no `@theme` unless you import one. Features like `@apply` won't work unless you import your global styles as reference.

```css
/* Button.module.css */
@reference "../app.css";

button {
  @apply bg-blue-500;
}
```

Alternatively use CSS variables instead of `@apply` (lets Tailwind skip processing the file):

```css
/* Button.module.css */
button {
  background: var(--color-blue-500);
}
```

## Vue, Svelte, and Astro

`<style>` blocks in these frameworks behave like CSS modules and have the same drawbacks. Avoid `<style>` blocks and style with utility classes directly in markup. If you use them, import global styles as reference for `@apply`:

```html
<!-- Button.vue -->
<template>
  <button><slot /></button>
</template>

<style scoped>
  @reference "../app.css";

  button {
    @apply bg-blue-500;
  }
</style>
```

Or use global CSS variables instead of `@apply`:

```html
<!-- Button.vue -->
<template>
  <button><slot /></button>
</template>

<style scoped>
  button {
    background-color: var(--color-blue-500);
  }
</style>
```

## Notes

- Migration (v3 → v4): Sass, Less, and Stylus are not supported; `@apply` in separately bundled stylesheets requires `@reference`. See the upgrade guide.
- Transcribed from `tailwindlabs/tailwindcss.com@7f92c22` `src/docs/compatibility.mdx` (fetched 2026-10-16).

## Related

- [Upgrade guide](./upgrade-guide.md)
- [Editor setup](./editor-setup.md)
