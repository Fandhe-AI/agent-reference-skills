---
source: https://tailwindcss.com/docs/min-block-size
---

# min-block-size

Utilities for setting the minimum block size of an element.

## Signature / Usage

```html
<div class="block-20 ...">
  <div class="min-block-80 ...">min-block-80</div>
  <div class="min-block-32 ...">min-block-32</div>
</div>
<div class="min-block-1/2 ...">min-block-1/2</div>
```

## Options / Props

| Class | Styles |
|-------|--------|
| `min-block-<number>` | `min-block-size: calc(var(--spacing) * <number>);` |
| `min-block-<fraction>` | `min-block-size: calc(<fraction> * 100%);` |
| `min-block-px` | `min-block-size: 1px;` |
| `min-block-full` | `min-block-size: 100%;` |
| `min-block-screen` | `min-block-size: 100vh;` |
| `min-block-dvh` | `min-block-size: 100dvh;` |
| `min-block-dvw` | `min-block-size: 100dvw;` |
| `min-block-lvh` | `min-block-size: 100lvh;` |
| `min-block-lvw` | `min-block-size: 100lvw;` |
| `min-block-svw` | `min-block-size: 100svw;` |
| `min-block-svh` | `min-block-size: 100svh;` |
| `min-block-auto` | `min-block-size: auto;` |
| `min-block-min` | `min-block-size: min-content;` |
| `min-block-max` | `min-block-size: max-content;` |
| `min-block-fit` | `min-block-size: fit-content;` |
| `min-block-lh` | `min-block-size: 1lh;` |
| `min-block-(<custom-property>)` | `min-block-size: var(<custom-property>);` |
| `min-block-[<value>]` | `min-block-size: <value>;` |

## Notes

- Added in v4.2.0 (CHANGELOG 4.2.0).
- Spacing scale: `min-block-<number>`. Percentage: `min-block-full` or `min-block-<fraction>`.
- Custom value: `min-block-[220px]`; for CSS variables `min-block-(--my-min-block-size)` (shorthand for `min-block-[var(--my-min-block-size)]`).
- Responsive: `block-24 min-block-0 md:min-block-full`.
- Theme: `min-block-<number>` is driven by the `--spacing` theme variable (`@theme { --spacing: 1px; }`).
- Transcribed from `tailwindlabs/tailwindcss.com@7f92c22` `src/docs/min-block-size.mdx` (fetched 2026-10-16).

```html
<div class="min-block-[220px] ...">
  <!-- ... -->
</div>
<div class="block-24 min-block-0 md:min-block-full ...">
  <!-- ... -->
</div>
```

## Related

- [block-size](./block-size.md)
- [max-block-size](./max-block-size.md)
- [min-height](./min-height.md)
