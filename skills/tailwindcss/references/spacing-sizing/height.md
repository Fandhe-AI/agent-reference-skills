---
source: https://tailwindcss.com/docs/height
---

# height

Utilities for setting the height of an element.

## Signature / Usage

```html
<div class="h-96 ...">h-96</div>
<div class="h-1/2 ...">h-1/2</div>
<div class="h-dvh">
  <!-- ... -->
</div>
<div class="size-16 ...">size-16</div>
```

## Options / Props

| Class | Styles |
|-------|--------|
| `h-<number>` | `height: calc(var(--spacing) * <number>);` |
| `h-<fraction>` | `height: calc(<fraction> * 100%);` |
| `h-auto` | `height: auto;` |
| `h-px` | `height: 1px;` |
| `h-full` | `height: 100%;` |
| `h-screen` | `height: 100vh;` |
| `h-dvh` | `height: 100dvh;` |
| `h-dvw` | `height: 100dvw;` |
| `h-lvh` | `height: 100lvh;` |
| `h-lvw` | `height: 100lvw;` |
| `h-svh` | `height: 100svh;` |
| `h-svw` | `height: 100svw;` |
| `h-min` | `height: min-content;` |
| `h-max` | `height: max-content;` |
| `h-fit` | `height: fit-content;` |
| `h-lh` | `height: 1lh;` |
| `h-(<custom-property>)` | `height: var(<custom-property>);` |
| `h-[<value>]` | `height: <value>;` |
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

- Spacing scale: `h-<number>` like `h-24` and `h-64`.
- Percentage: `h-full` or `h-<fraction>` like `h-1/2`, `h-2/5`.
- Viewport: `h-screen` spans the entire viewport height. `h-dvh` matches the viewport height as the browser UI expands or contracts (dynamic viewport); `h-lvh` is the largest possible viewport height; `h-svh` is the smallest possible viewport height.
- `h-lh` (`height: 1lh`) was added in v4.1.5 (CHANGELOG 4.1.5).
- Both dimensions: `size-px`, `size-4`, `size-full`.
- Custom value: `h-[32rem]`; for CSS variables `h-(--my-height)` (shorthand for `h-[var(--my-height)]`).
- Responsive: `h-1/2 md:h-full`.
- Theme: `h-<number>` and `size-<number>` are driven by the `--spacing` theme variable (`@theme { --spacing: 1px; }`).
- Transcribed from `tailwindlabs/tailwindcss.com@7f92c22` `src/docs/height.mdx` (fetched 2026-10-16).

```html
<div class="h-[32rem] ...">
  <!-- ... -->
</div>
<div class="h-(--my-height) ...">
  <!-- ... -->
</div>
<div class="h-1/2 md:h-full ...">
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
- [min-height](./min-height.md)
- [max-height](./max-height.md)
- [block-size](./block-size.md)
