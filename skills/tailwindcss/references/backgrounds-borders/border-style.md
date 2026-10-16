---
source: https://tailwindcss.com/docs/border-style
---

# border-style

Utilities for controlling the style of an element's borders.

## Signature / Usage

```html
<div class="border-2 border-solid ..."></div>
<div class="border-2 border-dashed ..."></div>
<div class="border-2 border-dotted ..."></div>
<div class="border-4 border-double ..."></div>
```

## Options / Props

| Class | Styles |
|-------|--------|
| `border-solid` | `border-style: solid;` |
| `border-dashed` | `border-style: dashed;` |
| `border-dotted` | `border-style: dotted;` |
| `border-double` | `border-style: double;` |
| `border-hidden` | `border-style: hidden;` |
| `border-none` | `border-style: none;` |
| `divide-solid` | `& > :not(:last-child) { border-style: solid; }` |
| `divide-dashed` | `& > :not(:last-child) { border-style: dashed; }` |
| `divide-dotted` | `& > :not(:last-child) { border-style: dotted; }` |
| `divide-double` | `& > :not(:last-child) { border-style: double; }` |
| `divide-hidden` | `& > :not(:last-child) { border-style: hidden; }` |
| `divide-none` | `& > :not(:last-child) { border-style: none; }` |

## Notes

- `border-none` removes an existing border from an element; it is most commonly used to remove a border style that was applied at a smaller breakpoint.
- `divide-dashed` and `divide-dotted` control the border style between child elements (combine with `divide-x-3` / `divide-indigo-500`).
- Responsive: prefix with a breakpoint variant like `md:` (`border-solid md:border-dotted`).
- Transcribed from `tailwindlabs/tailwindcss.com@7f92c22` `src/docs/border-style.mdx` (fetched 2026-10-16).

```html
<div class="grid grid-cols-3 divide-x-3 divide-dashed divide-indigo-500">
  <div>01</div>
  <div>02</div>
  <div>03</div>
</div>
<div class="border-solid md:border-dotted ..."></div>
```

## Related

- [border-width](./border-width.md)
- [border-color](./border-color.md)
- [outline-style](./outline-style.md)
