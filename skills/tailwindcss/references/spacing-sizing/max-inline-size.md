---
source: https://tailwindcss.com/docs/max-inline-size
---

# max-inline-size

Utilities for setting the maximum inline size of an element.

## Signature / Usage

```html
<div class="inline-full max-inline-96 ...">max-inline-96</div>
<div class="max-inline-md ...">
  <!-- ... -->
</div>
```

## Options / Props

| Class | Styles |
|-------|--------|
| `max-inline-<number>` | `max-inline-size: calc(var(--spacing) * <number>);` |
| `max-inline-<fraction>` | `max-inline-size: calc(<fraction> * 100%);` |
| `max-inline-3xs` | `max-inline-size: var(--container-3xs); /* 16rem (256px) */` |
| `max-inline-2xs` | `max-inline-size: var(--container-2xs); /* 18rem (288px) */` |
| `max-inline-xs` | `max-inline-size: var(--container-xs); /* 20rem (320px) */` |
| `max-inline-sm` | `max-inline-size: var(--container-sm); /* 24rem (384px) */` |
| `max-inline-md` | `max-inline-size: var(--container-md); /* 28rem (448px) */` |
| `max-inline-lg` | `max-inline-size: var(--container-lg); /* 32rem (512px) */` |
| `max-inline-xl` | `max-inline-size: var(--container-xl); /* 36rem (576px) */` |
| `max-inline-2xl` | `max-inline-size: var(--container-2xl); /* 42rem (672px) */` |
| `max-inline-3xl` | `max-inline-size: var(--container-3xl); /* 48rem (768px) */` |
| `max-inline-4xl` | `max-inline-size: var(--container-4xl); /* 56rem (896px) */` |
| `max-inline-5xl` | `max-inline-size: var(--container-5xl); /* 64rem (1024px) */` |
| `max-inline-6xl` | `max-inline-size: var(--container-6xl); /* 72rem (1152px) */` |
| `max-inline-7xl` | `max-inline-size: var(--container-7xl); /* 80rem (1280px) */` |
| `max-inline-none` | `max-inline-size: none;` |
| `max-inline-px` | `max-inline-size: 1px;` |
| `max-inline-full` | `max-inline-size: 100%;` |
| `max-inline-dvw` | `max-inline-size: 100dvw;` |
| `max-inline-dvh` | `max-inline-size: 100dvh;` |
| `max-inline-lvw` | `max-inline-size: 100lvw;` |
| `max-inline-lvh` | `max-inline-size: 100lvh;` |
| `max-inline-svw` | `max-inline-size: 100svw;` |
| `max-inline-svh` | `max-inline-size: 100svh;` |
| `max-inline-screen` | `max-inline-size: 100vw;` |
| `max-inline-min` | `max-inline-size: min-content;` |
| `max-inline-max` | `max-inline-size: max-content;` |
| `max-inline-fit` | `max-inline-size: fit-content;` |
| `max-inline-(<custom-property>)` | `max-inline-size: var(<custom-property>);` |
| `max-inline-[<value>]` | `max-inline-size: <value>;` |

## Notes

- Added in v4.2.0 (CHANGELOG 4.2.0).
- Spacing scale: `max-inline-<number>`. Percentage: `max-inline-full` or `max-inline-<fraction>`. Container scale: `max-inline-sm`, `max-inline-xl`.
- Custom value: `max-inline-[220px]`; for CSS variables `max-inline-(--my-max-inline-size)` (shorthand for `max-inline-[var(--my-max-inline-size)]`).
- Responsive: `max-inline-sm md:max-inline-lg`.
- Theme: `max-inline-<number>` is driven by the `--spacing` theme variable (`@theme { --spacing: 1px; }`).
- Transcribed from `tailwindlabs/tailwindcss.com@7f92c22` `src/docs/max-inline-size.mdx` (fetched 2026-10-16).

```html
<div class="max-inline-[220px] ...">
  <!-- ... -->
</div>
<div class="max-inline-sm md:max-inline-lg ...">
  <!-- ... -->
</div>
```

## Related

- [inline-size](./inline-size.md)
- [min-inline-size](./min-inline-size.md)
- [max-width](./max-width.md)
