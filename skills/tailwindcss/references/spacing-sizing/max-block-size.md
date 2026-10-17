---
source: https://tailwindcss.com/docs/max-block-size
---

# max-block-size

Utilities for setting the maximum block size of an element.

## Signature / Usage

```html
<div class="block-96 ...">
  <div class="block-full max-block-80 ...">max-block-80</div>
  <div class="block-full max-block-1/2 ...">max-block-1/2</div>
</div>
```

## Options / Props

| Class | Styles |
|-------|--------|
| `max-block-<number>` | `max-block-size: calc(var(--spacing) * <number>);` |
| `max-block-<fraction>` | `max-block-size: calc(<fraction> * 100%);` |
| `max-block-none` | `max-block-size: none;` |
| `max-block-px` | `max-block-size: 1px;` |
| `max-block-full` | `max-block-size: 100%;` |
| `max-block-screen` | `max-block-size: 100vh;` |
| `max-block-dvh` | `max-block-size: 100dvh;` |
| `max-block-dvw` | `max-block-size: 100dvw;` |
| `max-block-lvh` | `max-block-size: 100lvh;` |
| `max-block-lvw` | `max-block-size: 100lvw;` |
| `max-block-svh` | `max-block-size: 100svh;` |
| `max-block-svw` | `max-block-size: 100svw;` |
| `max-block-min` | `max-block-size: min-content;` |
| `max-block-max` | `max-block-size: max-content;` |
| `max-block-fit` | `max-block-size: fit-content;` |
| `max-block-lh` | `max-block-size: 1lh;` |
| `max-block-(<custom-property>)` | `max-block-size: var(<custom-property>);` |
| `max-block-[<value>]` | `max-block-size: <value>;` |

## Notes

- Added in v4.2.0 (CHANGELOG 4.2.0).
- Spacing scale: `max-block-<number>`. Percentage: `max-block-full` or `max-block-<fraction>`.
- Custom value: `max-block-[220px]`; for CSS variables `max-block-(--my-max-block-size)` (shorthand for `max-block-[var(--my-max-block-size)]`).
- Responsive: `block-48 max-block-full md:max-block-screen`.
- Theme: `max-block-<number>` is driven by the `--spacing` theme variable (`@theme { --spacing: 1px; }`).
- Transcribed from `tailwindlabs/tailwindcss.com@7f92c22` `src/docs/max-block-size.mdx` (fetched 2026-10-16).

```html
<div class="max-block-[220px] ...">
  <!-- ... -->
</div>
<div class="block-48 max-block-full md:max-block-screen ...">
  <!-- ... -->
</div>
```

## Related

- [block-size](./block-size.md)
- [min-block-size](./min-block-size.md)
- [max-height](./max-height.md)
