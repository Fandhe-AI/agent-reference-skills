---
source: https://tanstack.com/table/latest/docs/reference/index/functions/createColumnHelper
---

# createColumnHelper

Creates helper functions for authoring column definitions with stronger value inference.

## Signature / Usage

```tsx
const helper = createColumnHelper<typeof features, Person>()
const columns = [
  helper.display({ id: 'actions', header: 'Actions' }),
  helper.accessor('firstName', {}),
  helper.accessor((row) => row.lastName, { id: 'lastName' }),
]
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `TFeatures` | `extends TableFeatures` | Enabled feature set |
| `TData` | `extends RowData` | Row data type |

## Notes

- Returns a `ColumnHelper` object (`accessor` / `display` / `group` / `columns`); helper methods return plain `ColumnDef` objects at runtime while improving type inference at author time.

## Related

- [ColumnHelper](./column-helper.md)
- [ColumnDef](./column-def.md)
