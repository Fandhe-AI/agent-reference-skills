---
source: https://tailwindcss.com/docs/inline-size
---

# inline-size

Utilities for setting the inline size of an element.

## Signature / Usage

```html
<div class="inline-96 ...">inline-96</div>
<div class="inline-1/2 ...">inline-1/2</div>
<div class="inline-xl ...">inline-xl</div>
```

## Options / Props

| Class | Styles |
|-------|--------|
| `inline-<number>` | `inline-size: calc(var(--spacing) * <number>);` |
| `inline-<fraction>` | `inline-size: calc(<fraction> * 100%);` |
| `inline-3xs` | `inline-size: var(--container-3xs); /* 16rem (256px) */` |
| `inline-2xs` | `inline-size: var(--container-2xs); /* 18rem (288px) */` |
| `inline-xs` | `inline-size: var(--container-xs); /* 20rem (320px) */` |
| `inline-sm` | `inline-size: var(--container-sm); /* 24rem (384px) */` |
| `inline-md` | `inline-size: var(--container-md); /* 28rem (448px) */` |
| `inline-lg` | `inline-size: var(--container-lg); /* 32rem (512px) */` |
| `inline-xl` | `inline-size: var(--container-xl); /* 36rem (576px) */` |
| `inline-2xl` | `inline-size: var(--container-2xl); /* 42rem (672px) */` |
| `inline-3xl` | `inline-size: var(--container-3xl); /* 48rem (768px) */` |
| `inline-4xl` | `inline-size: var(--container-4xl); /* 56rem (896px) */` |
| `inline-5xl` | `inline-size: var(--container-5xl); /* 64rem (1024px) */` |
| `inline-6xl` | `inline-size: var(--container-6xl); /* 72rem (1152px) */` |
| `inline-7xl` | `inline-size: var(--container-7xl); /* 80rem (1280px) */` |
| `inline-auto` | `inline-size: auto;` |
| `inline-px` | `inline-size: 1px;` |
| `inline-full` | `inline-size: 100%;` |
| `inline-screen` | `inline-size: 100vw;` |
| `inline-dvw` | `inline-size: 100dvw;` |
| `inline-dvh` | `inline-size: 100dvh;` |
| `inline-lvw` | `inline-size: 100lvw;` |
| `inline-lvh` | `inline-size: 100lvh;` |
| `inline-svw` | `inline-size: 100svw;` |
| `inline-svh` | `inline-size: 100svh;` |
| `inline-min` | `inline-size: min-content;` |
| `inline-max` | `inline-size: max-content;` |
| `inline-fit` | `inline-size: fit-content;` |
| `inline-(<custom-property>)` | `inline-size: var(<custom-property>);` |
| `inline-[<value>]` | `inline-size: <value>;` |

## Notes

- `inline-*`, `min-inline-*`, `max-inline-*` utilities were added in v4.2.0 (CHANGELOG 4.2.0).
- The `inline-*` classes here set `inline-size`; they are not the `inline` display utility (see the display page).
- Spacing scale: `inline-<number>` like `inline-24` and `inline-64`. Percentage: `inline-full` or `inline-<fraction>`. Container scale: `inline-sm`, `inline-xl`.
- `inline-screen` spans the entire inline size of the viewport. `inline-auto` removes an assigned inline size under a condition (`inline-full md:inline-auto`).
- Custom value: `inline-[5px]`; for CSS variables `inline-(--my-inline-size)` (shorthand for `inline-[var(--my-inline-size)]`).
- Responsive: `inline-1/2 md:inline-full`.
- Theme: `inline-<number>` is driven by the `--spacing` theme variable (`@theme { --spacing: 1px; }`).
- Transcribed from `tailwindlabs/tailwindcss.com@7f92c22` `src/docs/inline-size.mdx` (fetched 2026-10-16).

```html
<div class="inline-full md:inline-auto">
  <!-- ... -->
</div>
<div class="inline-[5px] ...">
  <!-- ... -->
</div>
<div class="inline-(--my-inline-size) ...">
  <!-- ... -->
</div>
```

## Related

- [width](./width.md)
- [min-inline-size](./min-inline-size.md)
- [max-inline-size](./max-inline-size.md)
