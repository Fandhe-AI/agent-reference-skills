---
source: https://tanstack.com/table/latest/docs/framework/react/reference/legacy/functions/useLegacyTable
---

# Legacy v8-Style Table (Migration Reference)

**v8 pattern, shown only for migration contrast** — do not use this as the starting point for new v9 tables; see `basic-table` for the current API.

```tsx
// v8-style, bridged via the deprecated v9 compatibility shim
import { useLegacyTable, legacyCreateColumnHelper, getCoreRowModel, getSortedRowModel } from '@tanstack/react-table'

const columnHelper = legacyCreateColumnHelper<Person>()

const columns = [
  columnHelper.accessor('firstName', { header: 'First Name' }),
  columnHelper.accessor('age', { header: 'Age' }),
]

const table = useLegacyTable({
  data,
  columns,
  getCoreRowModel: getCoreRowModel(),
  getSortedRowModel: getSortedRowModel(),
})

table.getState().sorting
```

```tsx
// v9 equivalent — the actively supported pattern
import {
  createSortedRowModel,
  rowSortingFeature,
  sortFn_alphanumeric,
  tableFeatures,
  useTable,
} from '@tanstack/react-table'

const features = tableFeatures({
  rowSortingFeature,
  sortedRowModel: createSortedRowModel(),
  sortFns: { alphanumeric: sortFn_alphanumeric },
})

const table = useTable({ features, columns, data })
table.state.sorting
```

## Notes

- `useLegacyTable` / `legacyCreateColumnHelper` / `getCoreRowModel()` / `getSortedRowModel()` etc. are **v9 compatibility shims for v8 code**, not v8 APIs re-exported as-is — v8's `getCoreRowModel` did real work, while the v9 stub is a no-op since the core row model is always available.
- In v9, features and their row models are explicitly declared via `tableFeatures({...})` and read via `table.state` / `table.atoms`; v8 features were implicit and state was read via `table.getState()`.
- Use this file only to recognize legacy code during a migration — all other samples in this directory use the current `useTable` + `tableFeatures` v9 API and must not be mixed with `useLegacyTable`.
- Full migration guide: `../references/getting-started/migrating-to-v9.md` in this skill.
