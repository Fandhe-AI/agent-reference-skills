---
source: https://tanstack.com/table/latest/docs/guide/headers
---

# Headers Guide

Headers are the `<thead>` equivalent of cells, retrieved from [Header Groups](./header-groups.md).

## Signature / Usage

```jsx
<thead>
  {table.getHeaderGroups().map((headerGroup) => (
    <tr key={headerGroup.id}>
      {headerGroup.headers.map((header) => (
        <th key={header.id} colSpan={header.colSpan}>
          {flexRender(header.column.columnDef.header, header.getContext())}
        </th>
      ))}
    </tr>
  ))}
</thead>
```

Row-spanning uneven header trees:

```jsx
{headerGroup.headers.map((header) =>
  header.rowSpan === 0 ? null : (
    <th key={header.id} colSpan={header.colSpan} rowSpan={header.rowSpan}>
      {flexRender(header.column.columnDef.header, header.getContext())}
    </th>
  ),
)}
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `header.id` | `string` | Equals parent `column.id` for simple headers; more complex for group/placeholder headers |
| `header.colSpan` | `number` | Number of columns the header spans |
| `header.rowSpan` | `number` | Vertical span for merging header cells; `0` on headers covered by a spanning placeholder above |
| `header.depth` | `number` | Header group "row index" |
| `header.index` | `number` | Position within its header group (left-to-right); distinct from `depth` |
| `header.isPlaceholder` | `boolean` | True for placeholder headers filling rows above a shallower leaf column |
| `header.placeholderId` | `string` | Unique id for the placeholder header |
| `header.subHeaders` | `Array<Header>` | Child headers; empty for leaf headers |
| `header.column` | `Column` | Parent column |

## Notes

- `table.getFlatHeaders()` is the most common flat-list accessor; column visibility/pinning add many more (`getStartLeafHeaders`, `getEndFlatHeaders`, ...).
- Header row spanning: a leaf column shallower than the deepest leaf produces a placeholder chain above its real header; the top placeholder reports the full `rowSpan`, everything it covers reports `0`. This recipe applies to `<thead>` only — `<tfoot>` renders header rows in reverse order, so use the `header.isPlaceholder` empty-cell pattern there instead.
- The body-cell equivalent of row spanning is the optional `cellSpanningFeature` (see [Cells](./cells.md)).
- Use `flexRender` (not direct calls) to render `header.column.columnDef.header`, since it may be a string, JSX, or a function.

## Related

- [Header Groups](./header-groups.md)
- [Columns](./columns.md)
- [Cells](./cells.md)
