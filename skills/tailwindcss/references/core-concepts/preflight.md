---
source: https://tailwindcss.com/docs/preflight
---

# Preflight

An opinionated set of base styles for Tailwind projects.

## Signature / Usage

Built on top of modern-normalize. When you import `tailwindcss`, Preflight is automatically injected into the `base` layer:

```css
@layer theme, base, components, utilities;

@import "tailwindcss/theme.css" layer(theme);
@import "tailwindcss/preflight.css" layer(base);
@import "tailwindcss/utilities.css" layer(utilities);
```

The complete reference of applied styles is the stylesheet `packages/tailwindcss/preflight.css` in `tailwindlabs/tailwindcss`.

## Notes

### Margins are removed

```css
*,
::after,
::before,
::backdrop,
::file-selector-button {
  margin: 0;
  padding: 0;
}
```

### Border styles are reset

The `border` class only sets `border-width`; this reset ensures it adds a solid `1px` border using `currentColor`. It can cause unexpected results with some third-party libraries (for example Google Maps); override in `@layer base`.

```css
*,
::after,
::before,
::backdrop,
::file-selector-button {
  box-sizing: border-box;
  border: 0 solid;
}
```

```css
@layer base {
  .google-map * {
    border-style: none;
  }
}
```

### Headings are unstyled

```css
h1,
h2,
h3,
h4,
h5,
h6 {
  font-size: inherit;
  font-weight: inherit;
}
```

This avoids accidentally deviating from your type scale and makes heading styling deliberate. Add default heading styles via your own base styles.

### Lists are unstyled

```css
ol,
ul,
menu {
  list-style: none;
}
```

Use the list-style-type and list-style-position utilities, for example `class="list-inside list-disc"`. Unstyled lists are not announced as lists by VoiceOver; add a list role if the content is truly a list:

```html
<ul role="list">
  <li>One</li>
  <li>Two</li>
  <li>Three</li>
</ul>
```

### Images are block-level and constrained

```css
img,
svg,
video,
canvas,
audio,
iframe,
embed,
object {
  display: block;
  vertical-align: middle;
}

img,
video {
  max-width: 100%;
  height: auto;
}
```

Use the `inline` utility to make one of these elements inline, and `max-w-none` to override the width constraint:

```html
<img class="inline" src="..." alt="..." />
<img class="max-w-none" src="..." alt="..." />
```

### Elements with a `hidden` attribute stay hidden

```css
[hidden]:where(:not([hidden="until-found"])) {
  display: none !important;
}
```

Elements with `hidden` stay invisible unless using `hidden="until-found"`.

### Extending Preflight

Add base styles to the `base` layer:

```css
@layer base {
  h1 {
    font-size: var(--text-2xl);
  }
  h2 {
    font-size: var(--text-xl);
  }
  h3 {
    font-size: var(--text-lg);
  }
  a {
    color: var(--color-blue-600);
    text-decoration-line: underline;
  }
}
```

### Disabling Preflight

Import only the parts of Tailwind you need; omit the `preflight.css` import:

```css
@layer theme, base, components, utilities;

@import "tailwindcss/theme.css" layer(theme);
@import "tailwindcss/utilities.css" layer(utilities);
```

When importing files individually, put options on the matching import: `source(…)` and `important` go on `utilities.css`, `theme(static)` / `theme(inline)` go on `theme.css`, and `prefix(tw)` goes on both.

```css
@import "tailwindcss/theme.css" layer(theme) theme(static);
@import "tailwindcss/utilities.css" layer(utilities) source(none);
@import "tailwindcss/utilities.css" layer(utilities) important;
@import "tailwindcss/theme.css" layer(theme) prefix(tw);
@import "tailwindcss/utilities.css" layer(utilities) prefix(tw);
```

### Migration (v3 → v4)

- Migration (v3 → v4): placeholder text uses the current text color at 50% opacity (v3 used `gray-400`). Restore with `@layer base { input::placeholder, textarea::placeholder { color: var(--color-gray-400); } }`.
- Migration (v3 → v4): buttons use `cursor: default` instead of `cursor: pointer`. Restore with `@layer base { button:not(:disabled), [role="button"]:not(:disabled) { cursor: pointer; } }`.
- Migration (v3 → v4): margins on `<dialog>` are reset. Restore centering with `@layer base { dialog { margin: auto; } }`.
- Migration (v3 → v4): display classes like `block` or `flex` no longer take priority over the `hidden` attribute (does not apply to `hidden="until-found"`).

```css
@layer base {
  button:not(:disabled),
  [role="button"]:not(:disabled) {
    cursor: pointer;
  }
}
```

- Transcribed from `tailwindlabs/tailwindcss.com@7f92c22` `src/docs/preflight.mdx` (fetched 2026-10-16) and `upgrade-guide.mdx`.

## Related

- [Adding custom styles](./adding-custom-styles.md)
- [Functions and directives](./functions-and-directives.md)
- [Theme variables](./theme.md)
