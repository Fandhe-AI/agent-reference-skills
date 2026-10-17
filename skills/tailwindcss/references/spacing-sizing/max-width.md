---
source: https://tailwindcss.com/docs/max-width
---

# max-width

Utilities for setting the maximum width of an element.

## Signature / Usage

```html
<div class="w-full max-w-96 ...">max-w-96</div>
<div class="max-w-md ...">
  <!-- ... -->
</div>
<div class="container mx-auto px-4">
  <!-- ... -->
</div>
```

## Options / Props

| Class | Styles |
|-------|--------|
| `max-w-<number>` | `max-width: calc(var(--spacing) * <number>);` |
| `max-w-<fraction>` | `max-width: calc(<fraction> * 100%);` |
| `max-w-3xs` | `max-width: var(--container-3xs); /* 16rem (256px) */` |
| `max-w-2xs` | `max-width: var(--container-2xs); /* 18rem (288px) */` |
| `max-w-xs` | `max-width: var(--container-xs); /* 20rem (320px) */` |
| `max-w-sm` | `max-width: var(--container-sm); /* 24rem (384px) */` |
| `max-w-md` | `max-width: var(--container-md); /* 28rem (448px) */` |
| `max-w-lg` | `max-width: var(--container-lg); /* 32rem (512px) */` |
| `max-w-xl` | `max-width: var(--container-xl); /* 36rem (576px) */` |
| `max-w-2xl` | `max-width: var(--container-2xl); /* 42rem (672px) */` |
| `max-w-3xl` | `max-width: var(--container-3xl); /* 48rem (768px) */` |
| `max-w-4xl` | `max-width: var(--container-4xl); /* 56rem (896px) */` |
| `max-w-5xl` | `max-width: var(--container-5xl); /* 64rem (1024px) */` |
| `max-w-6xl` | `max-width: var(--container-6xl); /* 72rem (1152px) */` |
| `max-w-7xl` | `max-width: var(--container-7xl); /* 80rem (1280px) */` |
| `max-w-none` | `max-width: none;` |
| `max-w-px` | `max-width: 1px;` |
| `max-w-full` | `max-width: 100%;` |
| `max-w-dvw` | `max-width: 100dvw;` |
| `max-w-dvh` | `max-width: 100dvh;` |
| `max-w-lvw` | `max-width: 100lvw;` |
| `max-w-lvh` | `max-width: 100lvh;` |
| `max-w-svw` | `max-width: 100svw;` |
| `max-w-svh` | `max-width: 100svh;` |
| `max-w-screen` | `max-width: 100vw;` |
| `max-w-min` | `max-width: min-content;` |
| `max-w-max` | `max-width: max-content;` |
| `max-w-fit` | `max-width: fit-content;` |
| `container` | `width: 100%; @media (width >= 40rem) { max-width: 40rem; } @media (width >= 48rem) { max-width: 48rem; } @media (width >= 64rem) { max-width: 64rem; } @media (width >= 80rem) { max-width: 80rem; } @media (width >= 96rem) { max-width: 96rem; }` |
| `max-w-(<custom-property>)` | `max-width: var(<custom-property>);` |
| `max-w-[<value>]` | `max-width: <value>;` |

## Notes

- Spacing scale: `max-w-<number>` like `max-w-24` and `max-w-64`.
- Percentage: `max-w-full` or `max-w-<fraction>` like `max-w-1/2`, `max-w-2/5`.
- Container scale: `max-w-sm`, `max-w-xl`, etc.
- Breakpoints container: the `container` utility sets the maximum width of an element to match the `min-width` of the current breakpoint, useful if you prefer to design for a fixed set of screen sizes instead of a fully fluid viewport. Unlike containers in other frameworks, Tailwind's container does not center itself automatically and has no built-in horizontal padding; use `mx-auto` and `px-<number>` utilities.
- Migration (v3 → v4): in v3 the `container` utility had configuration options like `center` and `padding` that no longer exist in v4. To customize it, extend it with the `@utility` directive (`@utility container { margin-inline: auto; padding-inline: 2rem; }`; see the upgrade guide "Container configuration").
- Custom value: `max-w-[220px]`; for CSS variables `max-w-(--my-max-width)` (shorthand for `max-w-[var(--my-max-width)]`).
- Responsive: `max-w-sm md:max-w-lg`.
- Theme: `max-w-<number>` is driven by the `--spacing` theme variable (`@theme { --spacing: 1px; }`).
- Transcribed from `tailwindlabs/tailwindcss.com@7f92c22` `src/docs/max-width.mdx` (fetched 2026-10-16).

```css
@utility container {
  margin-inline: auto;
  padding-inline: 2rem;
}
```

```html
<div class="max-w-[220px] ...">
  <!-- ... -->
</div>
<div class="max-w-(--my-max-width) ...">
  <!-- ... -->
</div>
<div class="max-w-sm md:max-w-lg ...">
  <!-- ... -->
</div>
```

## Related

- [width](./width.md)
- [min-width](./min-width.md)
- [max-inline-size](./max-inline-size.md)
