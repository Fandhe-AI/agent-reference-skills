---
source: https://tailwindcss.com/docs/block-size
---

# block-size

Utilities for setting the block size of an element.

## Signature / Usage

```html
<div class="block-96 ...">block-96</div>
<div class="block-1/2 ...">block-1/2</div>
<div class="block-dvh">
  <!-- ... -->
</div>
```

## Options / Props

| Class | Styles |
|-------|--------|
| `block-<number>` | `block-size: calc(var(--spacing) * <number>);` |
| `block-<fraction>` | `block-size: calc(<fraction> * 100%);` |
| `block-auto` | `block-size: auto;` |
| `block-px` | `block-size: 1px;` |
| `block-full` | `block-size: 100%;` |
| `block-screen` | `block-size: 100vh;` |
| `block-dvh` | `block-size: 100dvh;` |
| `block-dvw` | `block-size: 100dvw;` |
| `block-lvh` | `block-size: 100lvh;` |
| `block-lvw` | `block-size: 100lvw;` |
| `block-svh` | `block-size: 100svh;` |
| `block-svw` | `block-size: 100svw;` |
| `block-min` | `block-size: min-content;` |
| `block-max` | `block-size: max-content;` |
| `block-fit` | `block-size: fit-content;` |
| `block-lh` | `block-size: 1lh;` |
| `block-(<custom-property>)` | `block-size: var(<custom-property>);` |
| `block-[<value>]` | `block-size: <value>;` |

## Notes

- `block-*`, `min-block-*`, `max-block-*` utilities were added in v4.2.0 (CHANGELOG 4.2.0).
- The `block-*` classes here set `block-size`; they are not the `block` display utility (see the display page).
- Spacing scale: `block-<number>`. Percentage: `block-full` or `block-<fraction>`.
- `block-screen` spans the entire block size of the viewport; `block-dvh` matches the viewport block size as the browser UI expands or contracts; `block-lvh` is the largest possible size of the viewport; `block-svh` is the smallest possible size of the viewport.
- Custom value: `block-[32rem]`; for CSS variables `block-(--my-block-size)` (shorthand for `block-[var(--my-block-size)]`).
- Responsive: `block-1/2 md:block-full`.
- Theme: `block-<number>` is driven by the `--spacing` theme variable (`@theme { --spacing: 1px; }`).
- Transcribed from `tailwindlabs/tailwindcss.com@7f92c22` `src/docs/block-size.mdx` (fetched 2026-10-16).

```html
<div class="block-[32rem] ...">
  <!-- ... -->
</div>
<div class="block-(--my-block-size) ...">
  <!-- ... -->
</div>
<div class="block-1/2 md:block-full ...">
  <!-- ... -->
</div>
```

## Related

- [height](./height.md)
- [min-block-size](./min-block-size.md)
- [max-block-size](./max-block-size.md)
