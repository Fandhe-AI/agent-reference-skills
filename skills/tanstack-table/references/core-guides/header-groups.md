---
source: https://tanstack.com/table/latest/docs/guide/header-groups
---

# Header Groups Guide

Header groups are simply "rows" of headers. Most tables have one header group; nested/grouped columns produce multiple header groups (rows).

## Signature / Usage

```jsx
<thead>
  {table.getHeaderGroups().map((headerGroup) => (
    <tr key={headerGroup.id}>
      {headerGroup.headers.map((header) => (
        <th key={header.id} colSpan={header.colSpan}>
          {/* ... */}
        </th>
      ))}
    </tr>
  ))}
</thead>
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `id` | `string` | Unique id, generated from depth |
| `depth` | `number` | Zero-indexed header row index |
| `headers` | `Array<Header>` | [Header](./headers.md) objects belonging to this row |

## Notes

- `table.getHeaderGroups()` is the most common accessor; column pinning adds `table.get[Start/Center/End]HeaderGroups`.

## Related

- [Headers](./headers.md)
- [Rows](./rows.md)
