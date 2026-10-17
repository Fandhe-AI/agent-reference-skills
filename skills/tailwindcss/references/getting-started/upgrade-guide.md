---
source: https://tailwindcss.com/docs/upgrade-guide
---

# Upgrade guide

Upgrading your Tailwind CSS projects from v3 to v4.

Tailwind CSS v4.0 is designed for Safari 16.4+, Chrome 111+, and Firefox 128+. If you need to support older browsers, stick with v3.4 until your browser support requirements change.

## Signature / Usage

```sh
npx @tailwindcss/upgrade
```

The upgrade tool automates most of the migration: updating dependencies, migrating the configuration file to CSS, and handling changes to template files. It requires Node.js 20 or higher. Run it in a new branch, then review the diff and test the project in the browser.

## Upgrading manually

PostCSS: the PostCSS plugin lives in `@tailwindcss/postcss`; imports and vendor prefixing are automatic, so remove `postcss-import` and `autoprefixer`.

```js
// postcss.config.mjs
export default {
  plugins: {
    // - "postcss-import": {},
    // - tailwindcss: {},
    // - autoprefixer: {},
    "@tailwindcss/postcss": {},
  },
};
```

Vite: migrate from the PostCSS plugin to the dedicated Vite plugin.

```ts
// vite.config.ts
import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [
    tailwindcss(),
  ],
});
```

CLI: update build commands to the dedicated package.

```sh
# before
npx tailwindcss -i input.css -o output.css
# after
npx @tailwindcss/cli -i input.css -o output.css
```

## Changes from v3 (overview)

| Change | Summary |
|--------|---------|
| Browser requirements | Safari 16.4, Chrome 111, Firefox 128; relies on `@property` and `color-mix()` |
| Removed `@tailwind` directives | Use `@import "tailwindcss";` |
| Removed deprecated utilities | `*-opacity-*`, `flex-shrink-*`, `flex-grow-*`, `overflow-ellipsis`, `decoration-slice`, `decoration-clone` |
| Renamed utilities | `shadow-sm`→`shadow-xs`, `shadow`→`shadow-sm`, same for `drop-shadow`, `blur`, `backdrop-blur`, `rounded`; `outline-none`→`outline-hidden`; `ring`→`ring-3` |
| Space-between / divide selector | Now `> :not(:last-child)` |
| Gradients with variants | Values preserved; use `via-none` to unset |
| Container configuration | `center` / `padding` removed; extend with `@utility container` |
| Default border color | `currentColor` instead of `gray-200` |
| Default ring width and color | 1px and `currentColor` |
| Preflight changes | Placeholder color, buttons `cursor: default`, dialog margins, `hidden` attribute priority |
| Prefix | Looks like a variant, at the start of the class name |
| Important modifier | `!` goes at the end of the class name |
| Custom utilities | `@utility` replaces `@layer utilities` / `@layer components` |
| Variant stacking order | Left to right |
| Variables in arbitrary values | `bg-(--brand-color)` |
| Grid / object-position arbitrary values | Underscores for spaces, not commas |
| Hover styles on mobile | `hover` only applies when the device supports hover |
| Transitioning outline-color | `transition` / `transition-colors` include `outline-color` |
| Individual transform properties | `rotate-*`, `scale-*`, `translate-*` use individual CSS properties |
| Disabling core plugins | `corePlugins` no longer supported |
| `theme()` function | Prefer CSS variables; use `--breakpoint-xl` variable names |
| JavaScript config file | Not auto-detected; load with `@config` |
| Theme values in JavaScript | `resolveConfig` removed |
| `@apply` with Vue, Svelte, CSS modules | Use `@reference` |
| Sass, Less, Stylus | Not supported |

## Removed @tailwind directives

```css
/* before */
@tailwind base;
@tailwind components;
@tailwind utilities;
/* after */
@import "tailwindcss";
```

## Removed deprecated utilities

| Deprecated | Replacement |
|------------|-------------|
| `bg-opacity-*` | Opacity modifiers like `bg-black/50` |
| `text-opacity-*` | Opacity modifiers like `text-black/50` |
| `border-opacity-*` | Opacity modifiers like `border-black/50` |
| `divide-opacity-*` | Opacity modifiers like `divide-black/50` |
| `ring-opacity-*` | Opacity modifiers like `ring-black/50` |
| `placeholder-opacity-*` | Opacity modifiers like `placeholder-black/50` |
| `flex-shrink-*` | `shrink-*` |
| `flex-grow-*` | `grow-*` |
| `overflow-ellipsis` | `text-ellipsis` |
| `decoration-slice` | `box-decoration-slice` |
| `decoration-clone` | `box-decoration-clone` |

## Renamed utilities

| v3 | v4 |
|----|----|
| `shadow-sm` | `shadow-xs` |
| `shadow` | `shadow-sm` |
| `drop-shadow-sm` | `drop-shadow-xs` |
| `drop-shadow` | `drop-shadow-sm` |
| `blur-sm` | `blur-xs` |
| `blur` | `blur-sm` |
| `backdrop-blur-sm` | `backdrop-blur-xs` |
| `backdrop-blur` | `backdrop-blur-sm` |
| `rounded-sm` | `rounded-xs` |
| `rounded` | `rounded-sm` |
| `outline-none` | `outline-hidden` |
| `ring` | `ring-3` |

Updated shadow, radius, and blur scales: the default shadow, radius and blur scales were renamed so every utility has a named value. The "bare" versions still work for backward compatibility, but the `<utility>-sm` utilities will look different unless updated to their `<utility>-xs` versions.

```html
<!-- before -->
<input class="shadow-sm" />
<!-- after -->
<input class="shadow-xs" />

<!-- before -->
<input class="shadow" />
<!-- after -->
<input class="shadow-sm" />
```

Renamed outline utility: `outline` now sets `outline-width: 1px` by default. All `outline-<number>` utilities default `outline-style` to `solid`, so no need to combine them with `outline`.

```html
<!-- before -->
<input class="outline outline-2" />
<!-- after -->
<input class="outline-2" />
```

`outline-none` previously set an invisible outline (still shown in forced colors mode). It was renamed `outline-hidden`, and a new `outline-none` actually sets `outline-style: none`.

```html
<!-- before -->
<input class="focus:outline-none" />
<!-- after -->
<input class="focus:outline-hidden" />
```

Default ring width change: `ring` was `3px` in v3 and is `1px` in v4. Replace `ring` with `ring-3`.

```html
<!-- before -->
<input class="ring ring-blue-500" />
<!-- after -->
<input class="ring-3 ring-blue-500" />
```

## Space-between selector

The selector used by `space-x-*` and `space-y-*` changed to address performance issues on large pages:

```css
/* Before */
.space-y-4 > :not([hidden]) ~ :not([hidden]) {
  margin-top: 1rem;
}

/* Now */
.space-y-4 > :not(:last-child) {
  margin-bottom: 1rem;
}
```

You might see changes if you used these utilities with inline elements, or added other margins to child elements. If this causes issues, migrate to a flex or grid layout and use `gap`:

```html
<!-- before -->
<div class="space-y-4 p-4">
<!-- after -->
<div class="flex flex-col gap-4 p-4">
  <label for="name">Name</label>
  <input type="text" name="name" />
</div>
```

## Divide selector

The selector used by `divide-x-*` and `divide-y-*` changed likewise:

```css
/* Before */
.divide-y-4 > :not([hidden]) ~ :not([hidden]) {
  border-top-width: 4px;
}

/* Now */
.divide-y-4 > :not(:last-child) {
  border-bottom-width: 4px;
}
```

## Using variants with gradients

In v3, overriding part of a gradient with a variant would "reset" the entire gradient. In v4 these values are preserved. You may need to explicitly use `via-none` to unset a three-stop gradient back to two stops in a specific state:

```html
<div class="bg-linear-to-r from-red-500 via-orange-400 to-yellow-400 dark:via-none dark:from-blue-500 dark:to-teal-400">
  <!-- ... -->
</div>
```

## Container configuration

The `center` and `padding` options of the v3 `container` utility no longer exist. Extend it with `@utility`:

```css
@utility container {
  margin-inline: auto;
  padding-inline: 2rem;
}
```

## Default border color

`border-*` and `divide-*` default to `currentColor` in v4 (v3: `gray-200`). Specify a color wherever you use them:

```html
<div class="border border-gray-200 px-2 py-3 ...">
  <!-- ... -->
</div>
```

Or add these base styles to preserve v3 behavior:

```css
@layer base {
  *,
  ::after,
  ::before,
  ::backdrop,
  ::file-selector-button {
    border-color: var(--color-gray-200, currentColor);
  }
}
```

## Default ring width and color

The `ring` width changed from 3px to 1px and the default color from `blue-500` to `currentColor`. Replace `ring` with `ring-3` and add `ring-blue-500` where you relied on the default color:

```html
<button class="focus:ring-3 focus:ring-blue-500 ...">
  <!-- ... -->
</button>
```

To preserve v3 behavior:

```css
@theme {
  --default-ring-width: 3px;
  --default-ring-color: var(--color-blue-500);
}
```

These variables are only supported for compatibility reasons, and are not considered idiomatic usage of Tailwind CSS v4.0.

## Preflight changes

New default placeholder color: v3 used `gray-400`; v4 uses the current text color at 50% opacity. To preserve v3:

```css
@layer base {
  input::placeholder,
  textarea::placeholder {
    color: var(--color-gray-400);
  }
}
```

Buttons use the default cursor: `cursor: default` instead of `cursor: pointer`. To keep pointer:

```css
@layer base {
  button:not(:disabled),
  [role="button"]:not(:disabled) {
    cursor: pointer;
  }
}
```

Dialog margins removed: Preflight now resets margins on `<dialog>` elements. To keep dialogs centered by default:

```css
@layer base {
  dialog {
    margin: auto;
  }
}
```

Hidden attribute takes priority: display classes like `block` or `flex` no longer take priority over the `hidden` attribute. Remove the `hidden` attribute to make an element visible. This does not apply to `hidden="until-found"`.

## Using a prefix

Prefixes look like variants and are always at the beginning of the class name:

```html
<div class="tw:flex tw:bg-red-500 tw:hover:bg-red-600">
  <!-- ... -->
</div>
```

Configure theme variables as if you aren't using a prefix:

```css
/* app.css */
@import "tailwindcss" prefix(tw);

@theme {
  --font-display: "Satoshi", "sans-serif";

  --breakpoint-3xl: 120rem;

  --color-avocado-100: oklch(0.99 0 0);
  --color-avocado-200: oklch(0.98 0.04 113.22);
  --color-avocado-300: oklch(0.94 0.11 115.03);

  /* ... */
}
```

The generated CSS variables will include a prefix:

```css
/* dist.css */
:root {
  --tw-font-display: "Satoshi", "sans-serif";

  --tw-breakpoint-3xl: 120rem;

  --tw-color-avocado-100: oklch(0.99 0 0);
  --tw-color-avocado-200: oklch(0.98 0.04 113.22);
  --tw-color-avocado-300: oklch(0.94 0.11 115.03);

  /* ... */
}
```

## The important modifier

Place the `!` at the very end of the class name (v3: beginning of the utility name, after variants). The old way is still supported for compatibility but is deprecated.

```html
<div class="flex! bg-red-500! hover:bg-red-600/50!">
  <!-- ... -->
</div>
```

## Adding custom utilities

In v4 native cascade layers are used and `@layer` is no longer hijacked, so `@utility` replaces `@layer utilities` / `@layer components` for custom utilities:

```css
/* before */
@layer utilities {
  .tab-4 {
    tab-size: 4;
  }
}
/* after */
@utility tab-4 {
  tab-size: 4;
}
```

Custom utilities are now sorted based on the amount of properties they define, so component utilities like `.btn` can be overwritten by other Tailwind utilities without additional configuration:

```css
/* before */
@layer components {
  .btn {
    border-radius: 0.5rem;
    padding: 0.5rem 1rem;
    background-color: ButtonFace;
  }
}
/* after */
@utility btn {
  border-radius: 0.5rem;
  padding: 0.5rem 1rem;
  background-color: ButtonFace;
}
```

## Variant stacking order

Stacked variants now apply left to right (v3: right to left). Reverse the order of order-sensitive stacked variants. The direct child variant (`*`) and typography plugin variants (`prose-headings`) are the most likely affected.

```html
<!-- before -->
<ul class="py-4 first:*:pt-0 last:*:pb-0">
<!-- after -->
<ul class="py-4 *:first:pt-0 *:last:pb-0">
  <li>One</li>
  <li>Two</li>
  <li>Three</li>
</ul>
```

## Variables in arbitrary values

The CSS variable shorthand uses parentheses instead of square brackets:

```html
<!-- before -->
<div class="bg-[--brand-color]"></div>
<!-- after -->
<div class="bg-(--brand-color)"></div>
```

## Arbitrary values in grid and object-position utilities

Commas are no longer replaced with spaces in `grid-cols-*`, `grid-rows-*`, and `object-*` arbitrary values. Use underscores to represent spaces:

```html
<!-- before -->
<div class="grid-cols-[max-content,auto]"></div>
<!-- after -->
<div class="grid-cols-[max-content_auto]"></div>
```

## Hover styles on mobile

The `hover` variant only applies when the primary input device supports hover:

```css
@media (hover: hover) {
  .hover\:underline:hover {
    text-decoration: underline;
  }
}
```

To restore the old implementation, override the variant:

```css
@custom-variant hover (&:hover);
```

## Transitioning outline-color

`transition` and `transition-colors` now include the `outline-color` property. Set the outline color unconditionally, or explicitly for both states:

```html
<!-- before -->
<button class="transition hover:outline-2 hover:outline-cyan-500"></button>
<!-- after -->
<button class="outline-cyan-500 transition hover:outline-2"></button>
```

## Individual transform properties

`rotate-*`, `scale-*`, and `translate-*` are based on the individual `rotate`, `scale`, and `translate` CSS properties.

Resetting transforms: `transform-none` no longer resets them; reset the individual properties.

```html
<!-- before -->
<button class="scale-150 focus:transform-none"></button>
<!-- after -->
<button class="scale-150 focus:scale-none"></button>
```

Transitions: if a custom transitioned-property list includes `transform` (e.g. `transition-[opacity,transform]`), these utilities no longer transition. Include the individual properties instead.

```html
<!-- before -->
<button class="transition-[opacity,transform] hover:scale-150"></button>
<!-- after -->
<button class="transition-[opacity,scale] hover:scale-150"></button>
```

## Disabling core plugins

The v3 `corePlugins` option is no longer supported in v4.

## Using the theme() function

Prefer CSS variables over `theme()`:

```css
.my-class {
  /* before */
  background-color: theme(colors.red.500);
  /* after */
  background-color: var(--color-red-500);
}
```

Where `theme()` is still needed (e.g. media queries), use the CSS variable name instead of dot notation:

```css
/* before: @media (width >= theme(screens.xl)) { */
@media (width >= theme(--breakpoint-xl)) {
  /* ... */
}
```

## Using a JavaScript config file

JS config files are still supported but no longer detected automatically. Load one explicitly with `@config`:

```css
@config "../../tailwind.config.js";
```

The `corePlugins`, `safelist`, and `separator` options are not supported in v4.0. To safelist utilities use `@source inline()`.

## Theme values in JavaScript

`resolveConfig` was removed. Use the generated CSS variables directly; for example Motion can animate to and from CSS variable values:

```jsx
<motion.div animate={{ backgroundColor: "var(--color-blue-500)" }} />
```

To read a resolved theme variable in JS, use `getComputedStyle` on the document root:

```js
let styles = getComputedStyle(document.documentElement);
let shadow = styles.getPropertyValue("--shadow-xl");
```

## Using @apply with Vue, Svelte, or CSS modules

Stylesheets bundled separately from your main CSS file (CSS modules, `<style>` blocks in Vue, Svelte, Astro) do not have access to theme variables, custom utilities, and custom variants defined elsewhere. Use `@reference` to import them without duplicating CSS:

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

Alternatively use theme variables directly instead of `@apply`:

```html
<template>
  <h1>Hello world!</h1>
</template>

<style>
  h1 {
    color: var(--text-red-500);
  }
</style>
```

## Using Sass, Less, and Stylus

Tailwind CSS v4.0 is not designed to be used with CSS preprocessors like Sass, Less, or Stylus, so they cannot be used for stylesheets or `<style>` blocks in Vue, Svelte, Astro, etc.

## Notes

- This page is the aggregation point for v3 → v4 changes; affected pages carry a per-page `Migration (v3 → v4): ...` note.
- Pages affected per the upgrade guide: box-shadow, filter-drop-shadow, filter-blur, backdrop-filter-blur, border-radius, outline-style / outline-width, border-width (divide, ring), border-color, margin (space-between), background-image (gradients), opacity (`*-opacity-*`), flex-grow, flex-shrink, text-overflow, box-decoration-break, transform / rotate / scale / translate, transition-property, grid-template-columns / grid-template-rows / object-position, hover-focus-and-other-states, functions-and-directives, adding-custom-styles, preflight, theme, detecting-classes-in-source-files.
- The `hover` variant, `@source inline()`, `@utility`, `@reference`, and `@config` are documented on their own pages in this skill.
- The official `@apply` alternative example uses `var(--text-red-500)` verbatim, but color theme variables live in the `--color-*` namespace (`--text-*` is for font sizes), so use `var(--color-red-500)` to get the red color.
- Transcribed from `tailwindlabs/tailwindcss.com@7f92c22` `src/docs/upgrade-guide.mdx` (fetched 2026-10-16).

## Related

- [Compatibility](./compatibility.md)
- [Using PostCSS](./using-postcss.md)
- [Using Vite](./using-vite.md)
- [Tailwind CLI](./tailwind-cli.md)
