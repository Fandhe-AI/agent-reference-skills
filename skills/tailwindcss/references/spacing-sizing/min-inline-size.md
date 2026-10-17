---
source: https://tailwindcss.com/docs/min-inline-size
---

# min-inline-size

Utilities for setting the minimum inline size of an element.

## Signature / Usage

```html
<div class="inline-20 ...">
  <div class="min-inline-80 ...">min-inline-80</div>
  <div class="min-inline-sm ...">min-inline-sm</div>
</div>
```

## Options / Props

| Class | Styles |
|-------|--------|
| `min-inline-<number>` | `min-inline-size: calc(var(--spacing) * <number>);` |
| `min-inline-<fraction>` | `min-inline-size: calc(<fraction> * 100%);` |
| `min-inline-3xs` | `min-inline-size: var(--container-3xs); /* 16rem (256px) */` |
| `min-inline-2xs` | `min-inline-size: var(--container-2xs); /* 18rem (288px) */` |
| `min-inline-xs` | `min-inline-size: var(--container-xs); /* 20rem (320px) */` |
| `min-inline-sm` | `min-inline-size: var(--container-sm); /* 24rem (384px) */` |
| `min-inline-md` | `min-inline-size: var(--container-md); /* 28rem (448px) */` |
| `min-inline-lg` | `min-inline-size: var(--container-lg); /* 32rem (512px) */` |
| `min-inline-xl` | `min-inline-size: var(--container-xl); /* 36rem (576px) */` |
| `min-inline-2xl` | `min-inline-size: var(--container-2xl); /* 42rem (672px) */` |
| `min-inline-3xl` | `min-inline-size: var(--container-3xl); /* 48rem (768px) */` |
| `min-inline-4xl` | `min-inline-size: var(--container-4xl); /* 56rem (896px) */` |
| `min-inline-5xl` | `min-inline-size: var(--container-5xl); /* 64rem (1024px) */` |
| `min-inline-6xl` | `min-inline-size: var(--container-6xl); /* 72rem (1152px) */` |
| `min-inline-7xl` | `min-inline-size: var(--container-7xl); /* 80rem (1280px) */` |
| `min-inline-auto` | `min-inline-size: auto;` |
| `min-inline-px` | `min-inline-size: 1px;` |
| `min-inline-full` | `min-inline-size: 100%;` |
| `min-inline-screen` | `min-inline-size: 100vw;` |
| `min-inline-dvw` | `min-inline-size: 100dvw;` |
| `min-inline-dvh` | `min-inline-size: 100dvh;` |
| `min-inline-lvw` | `min-inline-size: 100lvw;` |
| `min-inline-lvh` | `min-inline-size: 100lvh;` |
| `min-inline-svw` | `min-inline-size: 100svw;` |
| `min-inline-svh` | `min-inline-size: 100svh;` |
| `min-inline-min` | `min-inline-size: min-content;` |
| `min-inline-max` | `min-inline-size: max-content;` |
| `min-inline-fit` | `min-inline-size: fit-content;` |
| `min-inline-(<custom-property>)` | `min-inline-size: var(<custom-property>);` |
| `min-inline-[<value>]` | `min-inline-size: <value>;` |

## Notes

- Added in v4.2.0 (CHANGELOG 4.2.0).
- Spacing scale: `min-inline-<number>`. Percentage: `min-inline-full` or `min-inline-<fraction>`. Container scale: `min-inline-sm`, `min-inline-xl`.
- Custom value: `min-inline-[220px]`; for CSS variables `min-inline-(--my-min-inline-size)` (shorthand for `min-inline-[var(--my-min-inline-size)]`).
- Responsive: `inline-24 min-inline-full md:min-inline-0`.
- Theme: `min-inline-<number>` is driven by the `--spacing` theme variable (`@theme { --spacing: 1px; }`).
- Transcribed from `tailwindlabs/tailwindcss.com@7f92c22` `src/docs/min-inline-size.mdx` (fetched 2026-10-16).

```html
<div class="min-inline-[220px] ...">
  <!-- ... -->
</div>
<div class="inline-24 min-inline-full md:min-inline-0 ...">
  <!-- ... -->
</div>
```

## Related

- [inline-size](./inline-size.md)
- [max-inline-size](./max-inline-size.md)
- [min-width](./min-width.md)
