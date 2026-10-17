---
source: https://tailwindcss.com/docs/display
---

# display

Utilities for controlling the display box type of an element.

## Signature / Usage

```html
<div class="flex items-center">
  <img src="path/to/image.jpg" />
  <div>
    <strong>Andrew Alfred</strong>
    <span>Technical advisor</span>
  </div>
</div>
```

## Options / Props

| Class | Styles |
| --- | --- |
| `inline` | `display: inline;` |
| `block` | `display: block;` |
| `inline-block` | `display: inline-block;` |
| `flow-root` | `display: flow-root;` |
| `flex` | `display: flex;` |
| `inline-flex` | `display: inline-flex;` |
| `grid` | `display: grid;` |
| `inline-grid` | `display: inline-grid;` |
| `contents` | `display: contents;` |
| `table` | `display: table;` |
| `inline-table` | `display: inline-table;` |
| `table-caption` | `display: table-caption;` |
| `table-cell` | `display: table-cell;` |
| `table-column` | `display: table-column;` |
| `table-column-group` | `display: table-column-group;` |
| `table-footer-group` | `display: table-footer-group;` |
| `table-header-group` | `display: table-header-group;` |
| `table-row-group` | `display: table-row-group;` |
| `table-row` | `display: table-row;` |
| `list-item` | `display: list-item;` |
| `hidden` | `display: none;` |
| `sr-only` | `position: absolute; width: 1px; height: 1px; padding: 0; margin: -1px; overflow: hidden; clip-path: inset(50%); white-space: nowrap; border-width: 0;` |
| `not-sr-only` | `position: static; width: auto; height: auto; padding: 0; margin: 0; overflow: visible; clip-path: none; white-space: normal;` |

## Notes

- `inline` wraps text normally; `inline-block` wraps the element so its text does not extend beyond its parent; `block` puts the element on its own line and fills its parent.
- `flow-root` creates a block-level element with its own block formatting context.
- `flex` creates a block-level flex container; `inline-flex` an inline flex container that flows with text.
- `grid` creates a grid container (e.g. `<div class="grid grid-cols-3 grid-rows-3 gap-4">`); `inline-grid` an inline grid container.
- `contents` creates a "phantom" container whose children act like direct children of the parent.
- `table`, `table-row`, `table-cell`, `table-caption`, `table-column`, `table-column-group`, `table-header-group`, `table-row-group`, and `table-footer-group` create elements that behave like their respective table elements.
- `hidden` removes an element from the document. To visually hide an element but keep it in the document, use `invisible` from the visibility page instead.
- `sr-only` hides an element visually without hiding it from screen readers; `not-sr-only` undoes it, e.g. `<span class="sr-only sm:not-sr-only">Settings</span>` hides the text on small screens and shows it on larger screens.
- Responsive: `flex md:inline-flex`.
- Transcribed from `tailwindlabs/tailwindcss.com@7f92c22` `src/docs/display.mdx` (fetched 2026-10-16).

## Related

- [visibility](./visibility.md)
- [box-sizing](./box-sizing.md)
- [position](./position.md)
