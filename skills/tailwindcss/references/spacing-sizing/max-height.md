---
source: https://tailwindcss.com/docs/max-height
---

# max-height

Utilities for setting the maximum height of an element.

## Signature / Usage

```html
<div class="h-96 ...">
  <div class="h-full max-h-80 ...">max-h-80</div>
  <div class="h-full max-h-1/2 ...">max-h-1/2</div>
</div>
```

## Options / Props

| Class | Styles |
|-------|--------|
| `max-h-<number>` | `max-height: calc(var(--spacing) * <number>);` |
| `max-h-<fraction>` | `max-height: calc(<fraction> * 100%);` |
| `max-h-none` | `max-height: none;` |
| `max-h-px` | `max-height: 1px;` |
| `max-h-full` | `max-height: 100%;` |
| `max-h-screen` | `max-height: 100vh;` |
| `max-h-dvh` | `max-height: 100dvh;` |
| `max-h-dvw` | `max-height: 100dvw;` |
| `max-h-lvh` | `max-height: 100lvh;` |
| `max-h-lvw` | `max-height: 100lvw;` |
| `max-h-svh` | `max-height: 100svh;` |
| `max-h-svw` | `max-height: 100svw;` |
| `max-h-min` | `max-height: min-content;` |
| `max-h-max` | `max-height: max-content;` |
| `max-h-fit` | `max-height: fit-content;` |
| `max-h-lh` | `max-height: 1lh;` |
| `max-h-(<custom-property>)` | `max-height: var(<custom-property>);` |
| `max-h-[<value>]` | `max-height: <value>;` |

## Notes

- Spacing scale: `max-h-<number>` like `max-h-24` and `max-h-64`.
- Percentage: `max-h-full` or `max-h-<fraction>` like `max-h-1/2`, `max-h-2/5`.
- `max-h-lh` (`max-height: 1lh`) was added in v4.1.5 (CHANGELOG 4.1.5).
- Custom value: `max-h-[220px]`; for CSS variables `max-h-(--my-max-height)` (shorthand for `max-h-[var(--my-max-height)]`).
- Responsive: `h-48 max-h-full md:max-h-screen`.
- Theme: `max-h-<number>` is driven by the `--spacing` theme variable (`@theme { --spacing: 1px; }`).
- Transcribed from `tailwindlabs/tailwindcss.com@7f92c22` `src/docs/max-height.mdx` (fetched 2026-10-16).

```html
<div class="max-h-[220px] ...">
  <!-- ... -->
</div>
<div class="max-h-(--my-max-height) ...">
  <!-- ... -->
</div>
<div class="h-48 max-h-full md:max-h-screen ...">
  <!-- ... -->
</div>
```

```css
@theme {
  --spacing: 1px;
}
```

## Related

- [height](./height.md)
- [min-height](./min-height.md)
- [max-block-size](./max-block-size.md)
