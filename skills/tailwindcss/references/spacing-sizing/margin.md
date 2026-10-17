---
source: https://tailwindcss.com/docs/margin
---

# margin

Utilities for controlling an element's margin.

## Signature / Usage

```html
<div class="m-8 ...">m-8</div>
<div class="mt-6 ...">mt-6</div>
<div class="-mt-8 ...">-mt-8</div>
<div class="flex space-x-4 ...">
  <div>01</div>
  <div>02</div>
  <div>03</div>
</div>
```

## Options / Props

Margin prefixes (`<prefix>` and its CSS `<property>`):

| Prefix | Property |
|--------|----------|
| `m` | `margin` |
| `mx` | `margin-inline` |
| `my` | `margin-block` |
| `ms` | `margin-inline-start` |
| `me` | `margin-inline-end` |
| `mbs` | `margin-block-start` |
| `mbe` | `margin-block-end` |
| `mt` | `margin-top` |
| `mr` | `margin-right` |
| `mb` | `margin-bottom` |
| `ml` | `margin-left` |

Each margin prefix accepts these seven forms:

| Class | Styles |
|-------|--------|
| `<prefix>-<number>` | `<property>: calc(var(--spacing) * <number>);` |
| `-<prefix>-<number>` | `<property>: calc(var(--spacing) * -<number>);` |
| `<prefix>-auto` | `<property>: auto;` |
| `<prefix>-px` | `<property>: 1px;` |
| `-<prefix>-px` | `<property>: -1px;` |
| `<prefix>-(<custom-property>)` | `<property>: var(<custom-property>);` |
| `<prefix>-[<value>]` | `<property>: <value>;` |

Space-between utilities (`space-x` uses `margin-inline`, `space-y` uses `margin-block`). In the styles below `<prefix>` is `space-x` or `space-y` and `<property>` is the matching property:

| Class | Styles |
|-------|--------|
| `<prefix>-<number>` | `& > :not(:last-child) { --tw-<prefix>-reverse: 0; <property>-start: calc(calc(var(--spacing) * <number>) * var(--tw-<prefix>-reverse)); <property>-end: calc(calc(var(--spacing) * <number>) * calc(1 - var(--tw-<prefix>-reverse))); }` |
| `-<prefix>-<number>` | `& > :not(:last-child) { --tw-<prefix>-reverse: 0; <property>-start: calc(calc(var(--spacing) * -<number>) * var(--tw-<prefix>-reverse)); <property>-end: calc(calc(var(--spacing) * -<number>) * calc(1 - var(--tw-<prefix>-reverse))); }` |
| `<prefix>-px` | `& > :not(:last-child) { --tw-<prefix>-reverse: 0; <property>-start: calc(1px * var(--tw-<prefix>-reverse)); <property>-end: calc(1px * calc(1 - var(--tw-<prefix>-reverse))); }` |
| `-<prefix>-px` | `& > :not(:last-child) { --tw-<prefix>-reverse: 0; <property>-start: calc(-1px * var(--tw-<prefix>-reverse)); <property>-end: calc(-1px * calc(1 - var(--tw-<prefix>-reverse))); }` |
| `<prefix>-(<custom-property>)` | `& > :not(:last-child) { --tw-<prefix>-reverse: 0; <property>-start: calc(var(<custom-property>) * var(--tw-<prefix>-reverse)); <property>-end: calc(var(<custom-property>) * calc(1 - var(--tw-<prefix>-reverse))); }` |
| `<prefix>-[<value>]` | `& > :not(:last-child) { --tw-<prefix>-reverse: 0; <property>-start: calc(<value> * var(--tw-<prefix>-reverse)); <property>-end: calc(<value> * calc(1 - var(--tw-<prefix>-reverse))); }` |
| `space-x-reverse` | `& > :not(:last-child)) { --tw-space-x-reverse: 1; }` |
| `space-y-reverse` | `& > :not(:last-child)) { --tw-space-y-reverse: 1; }` |

## Notes

- Basic: `m-<number>` utilities like `m-4` and `m-8` control margin on all sides; `mt-<number>`, `mr-<number>`, `mb-<number>`, `ml-<number>` one side; `mx-<number>` horizontal; `my-<number>` vertical.
- Negative values: prefix the class name with a dash (`-mt-8`).
- Logical properties: `ms-<number>` / `me-<number>` set `margin-inline-start` / `margin-inline-end`. `mbs-<number>` / `mbe-<number>` set `margin-block-start` / `margin-block-end`, which map to the top or bottom side based on the writing mode (`mbs-*` / `mbe-*` introduced in v4.2.0 per CHANGELOG 4.2.0).
- Space between children: `space-x-<number>` / `space-y-<number>`. If elements are in reverse order (`flex-row-reverse` or `flex-col-reverse`), add `space-x-reverse` / `space-y-reverse` so the space is added to the correct side of each element.
- Limitations: the space utilities are a shortcut for adding margin to all-but-the-last-item in a group, and are not designed for grids, layouts that wrap, or children rendered in a complex custom order rather than DOM order. Use the gap utilities when possible, or add margin to every element with a matching negative margin on the parent. They are also not designed to work together with the divide utilities (see border-width, "between children"); add margin/padding utilities to the children instead.
- Migration (v3 → v4): the selector used by `space-x-*` / `space-y-*` changed from `.space-y-4 > :not([hidden]) ~ :not([hidden]) { margin-top: 1rem; }` to `.space-y-4 > :not(:last-child) { margin-bottom: 1rem; }` to address performance issues on large pages. You might see changes with inline elements or when adding other margins to child elements. The upgrade guide recommends migrating to a flex or grid layout with `gap` if it causes issues (`<div class="flex flex-col gap-4 p-4">`).
- Custom value: `m-[5px]`, `mx-[5px]`, `mb-[5px]`; for CSS variables use `m-(--my-margin)` (shorthand for `m-[var(--my-margin)]`).
- Responsive: prefix with a breakpoint variant like `md:` (`mt-4 md:mt-8`).
- Theme: `m-<number>` etc. are driven by the `--spacing` theme variable (`@theme { --spacing: 1px; }`).
- Transcribed from `tailwindlabs/tailwindcss.com@7f92c22` `src/docs/margin.mdx` (fetched 2026-10-16). The two `space-*-reverse` style cells are reproduced as written in the source, which contains an extra `)`; that selector is invalid CSS — the actual selector is `& > :not(:last-child)` (same as the other space rows).

```html
<div class="flex flex-row-reverse space-x-4 space-x-reverse ...">
  <div>01</div>
  <div>02</div>
  <div>03</div>
</div>
<div class="mt-4 md:mt-8 ...">
  <!-- ... -->
</div>
<div class="m-(--my-margin) ...">
  <!-- ... -->
</div>
```

```css
@theme {
  --spacing: 1px;
}
```

## Related

- [padding](./padding.md)
- [width](./width.md)
