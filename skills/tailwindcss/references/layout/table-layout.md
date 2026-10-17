---
source: https://tailwindcss.com/docs/table-layout
---

# table-layout

Utilities for controlling the table layout algorithm.

## Signature / Usage

```html
<table class="table-auto">
  <thead>
    <tr>
      <th>Song</th>
      <th>Artist</th>
      <th>Year</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>The Sliding Mr. Bones (Next Stop, Pottersville)</td>
      <td>Malcolm Lockyer</td>
      <td>1961</td>
    </tr>
  </tbody>
</table>
```

## Options / Props

| Class | Styles |
| --- | --- |
| `table-auto` | `table-layout: auto;` |
| `table-fixed` | `table-layout: fixed;` |

## Notes

- `table-auto` automatically sizes table columns to fit the contents of its cells.
- `table-fixed` ignores the content of table cells and uses fixed widths for each column. You can manually set widths for some columns; the rest of the available width is divided evenly amongst columns without an explicit width. The widths set in the first row set the column width for the whole table.
- Responsive: `table-auto md:table-fixed`.
- Transcribed from `tailwindlabs/tailwindcss.com@7f92c22` `src/docs/table-layout.mdx` (fetched 2026-10-16).

## Related

- [border-collapse](./border-collapse.md)
- [caption-side](./caption-side.md)
