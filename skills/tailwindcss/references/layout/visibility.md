---
source: https://tailwindcss.com/docs/visibility
---

# visibility

Utilities for controlling the visibility of an element.

## Signature / Usage

```html
<div class="grid grid-cols-3 gap-4">
  <div>01</div>
  <div class="invisible ...">02</div>
  <div>03</div>
</div>
```

## Options / Props

| Class | Styles |
| --- | --- |
| `visible` | `visibility: visible;` |
| `invisible` | `visibility: hidden;` |
| `collapse` | `visibility: collapse;` |

## Notes

- `invisible` hides an element but maintains its place in the document, affecting the layout of other elements. To completely remove an element from the document, use `hidden` (display) instead.
- `collapse` hides table rows, row groups, columns, and column groups as if they were set to `display: none`, without impacting the size of other rows and columns. This makes it possible to dynamically toggle rows and columns without affecting the table layout:

```html
<tr class="collapse">
  <td>#101</td>
  <td>Kruger Industrial Smoothing</td>
  <td>$545.00</td>
</tr>
```

- `visible` makes an element visible; mostly useful for undoing `invisible` at different screen sizes.
- Responsive: `visible md:invisible`.
- Transcribed from `tailwindlabs/tailwindcss.com@7f92c22` `src/docs/visibility.mdx` (fetched 2026-10-16).

## Related

- [display](./display.md)
