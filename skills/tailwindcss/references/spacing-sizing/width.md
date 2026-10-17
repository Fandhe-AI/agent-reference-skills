---
source: https://tailwindcss.com/docs/width
---

# width

Utilities for setting the width of an element.

## Signature / Usage

```html
<div class="w-96 ...">w-96</div>
<div class="w-1/2 ...">w-1/2</div>
<div class="w-xl ...">w-xl</div>
<div class="size-16 ...">size-16</div>
```

## Options / Props

| Class | Styles |
|-------|--------|
| `w-<number>` | `width: calc(var(--spacing) * <number>);` |
| `w-<fraction>` | `width: calc(<fraction> * 100%);` |
| `w-3xs` | `width: var(--container-3xs); /* 16rem (256px) */` |
| `w-2xs` | `width: var(--container-2xs); /* 18rem (288px) */` |
| `w-xs` | `width: var(--container-xs); /* 20rem (320px) */` |
| `w-sm` | `width: var(--container-sm); /* 24rem (384px) */` |
| `w-md` | `width: var(--container-md); /* 28rem (448px) */` |
| `w-lg` | `width: var(--container-lg); /* 32rem (512px) */` |
| `w-xl` | `width: var(--container-xl); /* 36rem (576px) */` |
| `w-2xl` | `width: var(--container-2xl); /* 42rem (672px) */` |
| `w-3xl` | `width: var(--container-3xl); /* 48rem (768px) */` |
| `w-4xl` | `width: var(--container-4xl); /* 56rem (896px) */` |
| `w-5xl` | `width: var(--container-5xl); /* 64rem (1024px) */` |
| `w-6xl` | `width: var(--container-6xl); /* 72rem (1152px) */` |
| `w-7xl` | `width: var(--container-7xl); /* 80rem (1280px) */` |
| `w-auto` | `width: auto;` |
| `w-px` | `width: 1px;` |
| `w-full` | `width: 100%;` |
| `w-screen` | `width: 100vw;` |
| `w-dvw` | `width: 100dvw;` |
| `w-dvh` | `width: 100dvh;` |
| `w-lvw` | `width: 100lvw;` |
| `w-lvh` | `width: 100lvh;` |
| `w-svw` | `width: 100svw;` |
| `w-svh` | `width: 100svh;` |
| `w-min` | `width: min-content;` |
| `w-max` | `width: max-content;` |
| `w-fit` | `width: fit-content;` |
| `w-(<custom-property>)` | `width: var(<custom-property>);` |
| `w-[<value>]` | `width: <value>;` |
| `size-<number>` | `width: calc(var(--spacing) * <number>); height: calc(var(--spacing) * <number>);` |
| `size-<fraction>` | `width: calc(<fraction> * 100%); height: calc(<fraction> * 100%);` |
| `size-auto` | `width: auto; height: auto;` |
| `size-px` | `width: 1px; height: 1px;` |
| `size-full` | `width: 100%; height: 100%;` |
| `size-dvw` | `width: 100dvw; height: 100dvw;` |
| `size-dvh` | `width: 100dvh; height: 100dvh;` |
| `size-lvw` | `width: 100lvw; height: 100lvw;` |
| `size-lvh` | `width: 100lvh; height: 100lvh;` |
| `size-svw` | `width: 100svw; height: 100svw;` |
| `size-svh` | `width: 100svh; height: 100svh;` |
| `size-min` | `width: min-content; height: min-content;` |
| `size-max` | `width: max-content; height: max-content;` |
| `size-fit` | `width: fit-content; height: fit-content;` |
| `size-(<custom-property>)` | `width: var(<custom-property>); height: var(<custom-property>);` |
| `size-[<value>]` | `width: <value>; height: <value>;` |

## Notes

- Spacing scale: `w-<number>` utilities like `w-24` and `w-64` set a fixed width.
- Percentage: `w-full` or `w-<fraction>` like `w-1/2` and `w-2/5`.
- Container scale: `w-sm`, `w-xl`, etc.
- Viewport: `w-screen` spans the viewport width; `w-lvw`, `w-svw`, `w-dvw` match the large, small or dynamic viewports.
- Reset: `w-auto` removes an assigned width under a condition (`w-full md:w-auto`).
- Both dimensions: `size-px`, `size-4`, `size-full` set width and height at the same time.
- Custom value: `w-[5px]`; for CSS variables `w-(--my-width)` (shorthand for `w-[var(--my-width)]`).
- Responsive: `w-1/2 md:w-full`.
- Theme: `w-<number>` and `size-<number>` are driven by the `--spacing` theme variable (`@theme { --spacing: 1px; }`).
- Transcribed from `tailwindlabs/tailwindcss.com@7f92c22` `src/docs/width.mdx` (fetched 2026-10-16).

```html
<div class="w-full md:w-auto">
  <!-- ... -->
</div>
<div class="w-[5px] ...">
  <!-- ... -->
</div>
<div class="w-(--my-width) ...">
  <!-- ... -->
</div>
<div class="w-1/2 md:w-full ...">
  <!-- ... -->
</div>
```

```css
@theme {
  --spacing: 1px;
}
```

## Related

- [min-width](./min-width.md)
- [max-width](./max-width.md)
- [height](./height.md)
- [inline-size](./inline-size.md)
