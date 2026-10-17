---
source: https://tailwindcss.com/docs/min-width
---

# min-width

Utilities for setting the minimum width of an element.

## Signature / Usage

```html
<div class="w-20 ...">
  <div class="min-w-80 ...">min-w-80</div>
  <div class="min-w-sm ...">min-w-sm</div>
</div>
<div class="flex ...">
  <div class="min-w-3/4 ...">min-w-3/4</div>
  <div class="w-full ...">w-full</div>
</div>
```

## Options / Props

| Class | Styles |
|-------|--------|
| `min-w-<number>` | `min-width: calc(var(--spacing) * <number>);` |
| `min-w-<fraction>` | `min-width: calc(<fraction> * 100%);` |
| `min-w-3xs` | `min-width: var(--container-3xs); /* 16rem (256px) */` |
| `min-w-2xs` | `min-width: var(--container-2xs); /* 18rem (288px) */` |
| `min-w-xs` | `min-width: var(--container-xs); /* 20rem (320px) */` |
| `min-w-sm` | `min-width: var(--container-sm); /* 24rem (384px) */` |
| `min-w-md` | `min-width: var(--container-md); /* 28rem (448px) */` |
| `min-w-lg` | `min-width: var(--container-lg); /* 32rem (512px) */` |
| `min-w-xl` | `min-width: var(--container-xl); /* 36rem (576px) */` |
| `min-w-2xl` | `min-width: var(--container-2xl); /* 42rem (672px) */` |
| `min-w-3xl` | `min-width: var(--container-3xl); /* 48rem (768px) */` |
| `min-w-4xl` | `min-width: var(--container-4xl); /* 56rem (896px) */` |
| `min-w-5xl` | `min-width: var(--container-5xl); /* 64rem (1024px) */` |
| `min-w-6xl` | `min-width: var(--container-6xl); /* 72rem (1152px) */` |
| `min-w-7xl` | `min-width: var(--container-7xl); /* 80rem (1280px) */` |
| `min-w-auto` | `min-width: auto;` |
| `min-w-px` | `min-width: 1px;` |
| `min-w-full` | `min-width: 100%;` |
| `min-w-screen` | `min-width: 100vw;` |
| `min-w-dvw` | `min-width: 100dvw;` |
| `min-w-dvh` | `min-width: 100dvh;` |
| `min-w-lvw` | `min-width: 100lvw;` |
| `min-w-lvh` | `min-width: 100lvh;` |
| `min-w-svw` | `min-width: 100svw;` |
| `min-w-svh` | `min-width: 100svh;` |
| `min-w-min` | `min-width: min-content;` |
| `min-w-max` | `min-width: max-content;` |
| `min-w-fit` | `min-width: fit-content;` |
| `min-w-(<custom-property>)` | `min-width: var(<custom-property>);` |
| `min-w-[<value>]` | `min-width: <value>;` |

## Notes

- Spacing scale: `min-w-<number>` like `min-w-24` and `min-w-64`.
- Percentage: `min-w-full` or `min-w-<fraction>` like `min-w-1/2`, `min-w-2/5`.
- Container scale: `min-w-sm`, `min-w-xl`, etc.
- Custom value: `min-w-[220px]`; for CSS variables `min-w-(--my-min-width)` (shorthand for `min-w-[var(--my-min-width)]`).
- Responsive: `w-24 min-w-full md:min-w-0`.
- Theme: `min-w-<number>` is driven by the `--spacing` theme variable (`@theme { --spacing: 1px; }`).
- Transcribed from `tailwindlabs/tailwindcss.com@7f92c22` `src/docs/min-width.mdx` (fetched 2026-10-16).

```html
<div class="min-w-[220px] ...">
  <!-- ... -->
</div>
<div class="min-w-(--my-min-width) ...">
  <!-- ... -->
</div>
<div class="w-24 min-w-full md:min-w-0 ...">
  <!-- ... -->
</div>
```

```css
@theme {
  --spacing: 1px;
}
```

## Related

- [width](./width.md)
- [max-width](./max-width.md)
- [min-inline-size](./min-inline-size.md)
