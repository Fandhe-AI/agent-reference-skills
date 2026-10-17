---
source: https://tailwindcss.com/docs/min-height
---

# min-height

Utilities for setting the minimum height of an element.

## Signature / Usage

```html
<div class="h-20 ...">
  <div class="min-h-80 ...">min-h-80</div>
  <div class="min-h-24 ...">min-h-24</div>
</div>
<div class="min-h-1/2 ...">min-h-1/2</div>
```

## Options / Props

| Class | Styles |
|-------|--------|
| `min-h-<number>` | `min-height: calc(var(--spacing) * <number>);` |
| `min-h-<fraction>` | `min-height: calc(<fraction> * 100%);` |
| `min-h-px` | `min-height: 1px;` |
| `min-h-full` | `min-height: 100%;` |
| `min-h-screen` | `min-height: 100vh;` |
| `min-h-dvh` | `min-height: 100dvh;` |
| `min-h-dvw` | `min-height: 100dvw;` |
| `min-h-lvh` | `min-height: 100lvh;` |
| `min-h-lvw` | `min-height: 100lvw;` |
| `min-h-svw` | `min-height: 100svw;` |
| `min-h-svh` | `min-height: 100svh;` |
| `min-h-auto` | `min-height: auto;` |
| `min-h-min` | `min-height: min-content;` |
| `min-h-max` | `min-height: max-content;` |
| `min-h-fit` | `min-height: fit-content;` |
| `min-h-lh` | `min-height: 1lh;` |
| `min-h-(<custom-property>)` | `min-height: var(<custom-property>);` |
| `min-h-[<value>]` | `min-height: <value>;` |

## Notes

- Spacing scale: `min-h-<number>` like `min-h-24` and `min-h-64`.
- Percentage: `min-h-full` or `min-h-<fraction>` like `min-h-1/2`, `min-h-2/5`.
- `min-h-lh` (`min-height: 1lh`) was added in v4.1.5 (CHANGELOG 4.1.5).
- Custom value: `min-h-[220px]`; for CSS variables `min-h-(--my-min-height)` (shorthand for `min-h-[var(--my-min-height)]`).
- Responsive: `h-24 min-h-0 md:min-h-full`.
- Theme: `min-h-<number>` is driven by the `--spacing` theme variable (`@theme { --spacing: 1px; }`).
- Transcribed from `tailwindlabs/tailwindcss.com@7f92c22` `src/docs/min-height.mdx` (fetched 2026-10-16).

```html
<div class="min-h-[220px] ...">
  <!-- ... -->
</div>
<div class="min-h-(--my-min-height) ...">
  <!-- ... -->
</div>
<div class="h-24 min-h-0 md:min-h-full ...">
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
- [max-height](./max-height.md)
- [min-block-size](./min-block-size.md)
