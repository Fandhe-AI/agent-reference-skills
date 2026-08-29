---
source: https://tanstack.com/table/latest/docs/guide/tables
---

# Table Instance Guide

The `table` instance is the core object that coordinates table state and APIs — not a literal `<table>` element. It is created via your framework adapter's table creation function (`useTable`, `createTable`, `injectTable`, `constructTable`, ...).

## Signature / Usage

```ts
import { tableFeatures, useTable } from '@tanstack/react-table'

const features = tableFeatures({}) // declare which features this table uses

const table = useTable({
  features,
  columns,
  data,
})
```

Reading/writing state (v9 uses TanStack Store atoms internally):

```ts
table.atoms.rowSelection.get()      // read current row-selection state
table.store.state.rowSelection      // read current table state snapshot
table.setRowSelection((old) => ({ ...old }))
table.resetRowSelection()
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `features` | `TableFeatures` (from `tableFeatures()`) | Declares which optional features/row models this table uses; required |
| `columns` | `ColumnDef<typeof features, TData>[]` | Column definitions; must share `TData` with `data` |
| `data` | `Array<TData>` | Stable-reference row data array; required |

## Notes

- Three required options: `columns`, `data`, and `features`. The core row model is always included automatically; add row-model factories (e.g. `sortedRowModel: createSortedRowModel()`) as slots inside `tableFeatures()` to enable client-side filtering, sorting, pagination, etc.
- Every framework adapter (`useTable`, `createTable`, `injectTable`, `TableController`, `constructTable`, ...) accepts the same core options.
- `table.baseAtoms` are internal writable atoms; `table.atoms` are public readonly atoms per state slice; `table.store` is a readonly flat snapshot derived from `table.atoms`.
- `table.getRowModel()` (see [Row Models](./row-models.md)) is the primary API for reading rows to render.

## Related

- [Row Models](./row-models.md)
- [Column Definitions](./column-defs.md)
- [Type Helpers](./helpers.md)
