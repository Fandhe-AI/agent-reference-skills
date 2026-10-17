---
source: https://tailwindcss.com/docs/grid-template-rows
---

# grid-template-rows

Utilities for specifying the rows in a grid layout.

## Signature / Usage

```html
<div class="grid grid-flow-col grid-rows-4 gap-4">
  <div>01</div>
  <!-- ... -->
  <div>09</div>
</div>
```

## Options / Props

| Class | Styles |
| --- | --- |
| `grid-rows-<number>` | `grid-template-rows: repeat(<number>, minmax(0, 1fr));` |
| `grid-rows-none` | `grid-template-rows: none;` |
| `grid-rows-subgrid` | `grid-template-rows: subgrid;` |
| `grid-rows-[<value>]` | `grid-template-rows: <value>;` |
| `grid-rows-(<custom-property>)` | `grid-template-rows: var(<custom-property>);` |

## Notes

- Migration (v3 → v4): commas inside arbitrary values were previously replaced with spaces in `grid-rows-*`; this v2-compatibility behavior no longer exists in v4.0 and underscores must be used to represent spaces (see the `grid-cols-[max-content_auto]` example in the upgrade guide, section "Arbitrary values in grid and object-position utilities").
- Specifying the grid rows: `grid-rows-<number>` utilities like `grid-rows-2` and `grid-rows-4` create grids with _n_ equally sized rows.
- Implementing a subgrid: `grid-rows-subgrid` adopts the row tracks defined by the item's parent.

```html
<div class="grid grid-flow-col grid-rows-4 gap-4">
  <div>01</div>
  <!-- ... -->
  <div>05</div>
  <div class="row-span-3 grid grid-rows-subgrid gap-4">
    <div class="row-start-2">06</div>
  </div>
  <div>07</div>
  <!-- ... -->
  <div>10</div>
</div>
```

- Custom value: use the `grid-rows-[<value>]` syntax to set the rows based on a completely custom value:

```html
<div class="grid-rows-[200px_minmax(900px,1fr)_100px] ...">
  <!-- ... -->
</div>
```

For CSS variables, you can also use the `grid-rows-(<custom-property>)` syntax, which is just a shorthand for `grid-rows-[var(<custom-property>)]` that adds the `var()` function for you automatically:

```html
<div class="grid-rows-(--my-grid-rows) ...">
  <!-- ... -->
</div>
```

- Responsive design: prefix a `grid-template-rows` utility with a breakpoint variant like `md:` to only apply the utility at that breakpoint and above:

```html
<div class="grid grid-rows-2 md:grid-rows-6 ...">
  <!-- ... -->
</div>
```

- Transcribed from `tailwindlabs/tailwindcss.com@7f92c22` `src/docs/grid-template-rows.mdx` (fetched 2026-10-16).

## Related

- [grid-row](./grid-row.md)
- [grid-template-columns](./grid-template-columns.md)
- [grid-auto-rows](./grid-auto-rows.md)
- [grid-auto-flow](./grid-auto-flow.md)
