---
source: https://tailwindcss.com/docs/grid-template-columns
---

# grid-template-columns

Utilities for specifying the columns in a grid layout.

## Signature / Usage

```html
<div class="grid grid-cols-4 gap-4">
  <div>01</div>
  <!-- ... -->
  <div>09</div>
</div>
```

## Options / Props

| Class | Styles |
| --- | --- |
| `grid-cols-<number>` | `grid-template-columns: repeat(<number>, minmax(0, 1fr));` |
| `grid-cols-none` | `grid-template-columns: none;` |
| `grid-cols-subgrid` | `grid-template-columns: subgrid;` |
| `grid-cols-[<value>]` | `grid-template-columns: <value>;` |
| `grid-cols-(<custom-property>)` | `grid-template-columns: var(<custom-property>);` |

## Notes

- Migration (v3 → v4): commas inside arbitrary values were previously replaced with spaces in `grid-cols-*`; this v2-compatibility behavior no longer exists in v4.0 and underscores must be used to represent spaces:

```html
<div class="grid-cols-[max-content,auto]"></div>
<div class="grid-cols-[max-content_auto]"></div>
```

The first form is the v3 usage; the second is the v4 replacement.
- Specifying the grid columns: `grid-cols-<number>` utilities like `grid-cols-2` and `grid-cols-4` create grids with _n_ equally sized columns.
- Implementing a subgrid: `grid-cols-subgrid` adopts the column tracks defined by the item's parent.

```html
<div class="grid grid-cols-4 gap-4">
  <div>01</div>
  <!-- ... -->
  <div>05</div>
  <div class="col-span-3 grid grid-cols-subgrid gap-4">
    <div class="col-start-2">06</div>
  </div>
</div>
```

- Custom value: use the `grid-cols-[<value>]` syntax to set the columns based on a completely custom value:

```html
<div class="grid-cols-[200px_minmax(900px,_1fr)_100px] ...">
  <!-- ... -->
</div>
```

For CSS variables, you can also use the `grid-cols-(<custom-property>)` syntax, which is just a shorthand for `grid-cols-[var(<custom-property>)]` that adds the `var()` function for you automatically:

```html
<div class="grid-cols-(--my-grid-cols) ...">
  <!-- ... -->
</div>
```

- Responsive design: prefix a `grid-template-columns` utility with a breakpoint variant like `md:` to only apply the utility at that breakpoint and above:

```html
<div class="grid grid-cols-1 md:grid-cols-6 ...">
  <!-- ... -->
</div>
```

- Transcribed from `tailwindlabs/tailwindcss.com@7f92c22` `src/docs/grid-template-columns.mdx` (fetched 2026-10-16).

## Related

- [grid-column](./grid-column.md)
- [grid-template-rows](./grid-template-rows.md)
- [grid-auto-columns](./grid-auto-columns.md)
- [gap](./gap.md)
