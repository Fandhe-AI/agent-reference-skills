---
source: https://tailwindcss.com/docs/grid-auto-flow
---

# grid-auto-flow

Utilities for controlling how elements in a grid are auto-placed.

## Signature / Usage

```html
<div class="grid grid-flow-row-dense grid-cols-3 grid-rows-3 ...">
  <div class="col-span-2">01</div>
  <div class="col-span-2">02</div>
  <div>03</div>
  <div>04</div>
  <div>05</div>
</div>
```

## Options / Props

| Class | Styles |
| --- | --- |
| `grid-flow-row` | `grid-auto-flow: row;` |
| `grid-flow-col` | `grid-auto-flow: column;` |
| `grid-flow-dense` | `grid-auto-flow: dense;` |
| `grid-flow-row-dense` | `grid-auto-flow: row dense;` |
| `grid-flow-col-dense` | `grid-auto-flow: column dense;` |

## Notes

- Basic example: utilities like `grid-flow-col` and `grid-flow-row-dense` control how the auto-placement algorithm works for a grid layout.
- Responsive design: prefix a `grid-auto-flow` utility with a breakpoint variant like `md:` to only apply the utility at that breakpoint and above:

```html
<div class="grid grid-flow-col md:grid-flow-row ...">
  <!-- ... -->
</div>
```

- Transcribed from `tailwindlabs/tailwindcss.com@7f92c22` `src/docs/grid-auto-flow.mdx` (fetched 2026-10-16).

## Related

- [grid-auto-columns](./grid-auto-columns.md)
- [grid-auto-rows](./grid-auto-rows.md)
- [grid-template-columns](./grid-template-columns.md)
