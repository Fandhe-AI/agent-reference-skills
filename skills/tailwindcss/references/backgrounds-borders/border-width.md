---
source: https://tailwindcss.com/docs/border-width
---

# border-width

Utilities for controlling the width of an element's borders.

## Signature / Usage

```html
<div class="border border-indigo-600 ..."></div>
<div class="border-2 border-indigo-600 ..."></div>
<div class="border-t-4 border-indigo-500 ..."></div>
<div class="grid grid-cols-3 divide-x-4">
  <div>01</div>
  <div>02</div>
  <div>03</div>
</div>
```

## Options / Props

Each border prefix below accepts the same four forms: `<prefix>`, `<prefix>-<number>`, `<prefix>-(length:<custom-property>)`, `<prefix>-[<value>]`. `<property>` is the CSS width property for that prefix.

| Prefix | Property |
|--------|----------|
| `border` | `border-width` |
| `border-x` | `border-inline-width` |
| `border-y` | `border-block-width` |
| `border-s` | `border-inline-start-width` |
| `border-e` | `border-inline-end-width` |
| `border-bs` | `border-block-start-width` |
| `border-be` | `border-block-end-width` |
| `border-t` | `border-top-width` |
| `border-r` | `border-right-width` |
| `border-b` | `border-bottom-width` |
| `border-l` | `border-left-width` |

| Class | Styles |
|-------|--------|
| `<prefix>` | `<property>: 1px;` |
| `<prefix>-<number>` | `<property>: <number>px;` |
| `<prefix>-(length:<custom-property>)` | `<property>: var(<custom-property>);` |
| `<prefix>-[<value>]` | `<property>: <value>;` |

Expanded, for example: `border-x-<number>` is `border-inline-width: <number>px;`, `border-be-[<value>]` is `border-block-end-width: <value>;`.

Divide utilities (applied to `& > :not(:last-child)`):

| Class | Styles |
|-------|--------|
| `divide-x` | `border-inline-start-width: 0px; border-inline-end-width: 1px;` |
| `divide-x-<number>` | `border-inline-start-width: 0px; border-inline-end-width: <number>px;` |
| `divide-x-(length:<custom-property>)` | `border-inline-start-width: 0px; border-inline-end-width: var(<custom-property>);` |
| `divide-x-[<value>]` | `border-inline-start-width: 0px; border-inline-end-width: <value>;` |
| `divide-y` | `border-top-width: 0px; border-bottom-width: 1px;` |
| `divide-y-<number>` | `border-top-width: 0px; border-bottom-width: <number>px;` |
| `divide-y-(length:<custom-property>)` | `border-top-width: 0px; border-bottom-width: var(<custom-property>);` |
| `divide-y-[<value>]` | `border-top-width: 0px; border-bottom-width: <value>;` |
| `divide-x-reverse` | `--tw-divide-x-reverse: 1;` |
| `divide-y-reverse` | `--tw-divide-y-reverse: 1;` |

## Notes

- All sides: `border`, `border-2`, `border-4`, `border-8`. One side: `border-t-4`, `border-r-4`, `border-b-4`, `border-l-4`. Two sides: `border-x-4`, `border-y-4`.
- Logical properties: `border-s` / `border-e-4` set `border-inline-start-width` / `border-inline-end-width`, which map to the left or right border based on the text direction. `border-bs-<number>` / `border-be-<number>` set `border-block-start-width` / `border-block-end-width`, which map to the top or bottom border based on the writing mode. `border-bs-*` and `border-be-*` were added in v4.2.0 (CHANGELOG 4.2.0).
- Between children: `divide-x` and `divide-y-4` add borders between child elements. If the elements are in reverse order (`flex-row-reverse` or `flex-col-reverse`), use `divide-x-reverse` or `divide-y-reverse` so the border lands on the correct side of each element.
- Custom value: `border-[2vw]`; for CSS variables `border-(length:--my-border-width)`, shorthand for `border-[length:var(--my-border-width)]`.
- Responsive: prefix with a breakpoint variant like `md:` (`border-2 md:border-t-4`).
- Migration (v3 → v4): the selector used by `divide-x-*` and `divide-y-*` changed for performance, from `.divide-y-4 > :not([hidden]) ~ :not([hidden]) { border-top-width: 4px; }` to `.divide-y-4 > :not(:last-child) { border-bottom-width: 4px; }`. Results can differ if you used these utilities with inline elements, added margins/padding to child elements to tweak their spacing, or adjusted the borders of specific child elements.
- Transcribed from `tailwindlabs/tailwindcss.com@7f92c22` `src/docs/border-width.mdx` (fetched 2026-10-16).

```html
<div class="flex flex-col-reverse divide-y-4 divide-y-reverse divide-gray-200">
  <div>01</div>
  <div>02</div>
  <div>03</div>
</div>
<div class="border-s-4 ..."></div>
<div class="border-bs-4 ..."></div>
<div class="border-[2vw] ..."></div>
<div class="border-(length:--my-border-width) ..."></div>
```

## Related

- [border-color](./border-color.md)
- [border-style](./border-style.md)
- [border-radius](./border-radius.md)
- [outline-width](./outline-width.md)
