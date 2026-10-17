---
source: https://tanstack.com/table/latest/docs/framework/react/examples/basic-external-atoms
---

# External Atoms (useCreateAtom)

Own individual state slices as external atoms and pass them to the table via the `atoms` option.

```tsx
import React from 'react'
import { useCreateAtom } from '@tanstack/react-store'
import {
  createColumnHelper,
  createPaginatedRowModel,
  createSortedRowModel,
  rowPaginationFeature,
  rowSortingFeature,
  sortFn_alphanumeric,
  sortFn_text,
  tableFeatures,
  useTable,
} from '@tanstack/react-table'
import { makeData } from './makeData'
import type { PaginationState, SortingState } from '@tanstack/react-table'

type Person = {
  firstName: string
  lastName: string
  age: number
  visits: number
  status: string
  progress: number
}

const features = tableFeatures({
  rowPaginationFeature,
  rowSortingFeature,
  sortedRowModel: createSortedRowModel(),
  paginatedRowModel: createPaginatedRowModel(),
  sortFns: {
    alphanumeric: sortFn_alphanumeric,
    text: sortFn_text,
  },
})

const columnHelper = createColumnHelper<typeof features, Person>()

const columns = columnHelper.columns([
  columnHelper.accessor('firstName', {
    header: 'First Name',
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor('age', {
    header: 'Age',
  }),
])

function App() {
  const [data, setData] = React.useState(() => makeData(1_000))

  // Create stable external atoms for the individual state slices you want to
  // own. The table still creates internal base atoms for everything else.
  const sortingAtom = useCreateAtom<SortingState>([])
  const paginationAtom = useCreateAtom<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  })

  // Pass the per-slice external atoms directly. The React adapter subscribes
  // through table.store, so no separate useSelector call is needed here.
  const table = useTable(
    {
      key: 'basic-external-atoms', // needed for devtools
      features,
      columns,
      data,
      atoms: {
        sorting: sortingAtom,
        pagination: paginationAtom,
      },
      debugTable: true,
    },
    (state) => state, // default selector
  )

  // ... render with table.getHeaderGroups() / table.getRowModel() ...
  // read state back with table.state.pagination.pageIndex etc.
}
```

## Notes

- Trimmed from the official example: only two columns; table markup, pagination controls and devtools wiring omitted.
- Atoms must be stable references; create them with `useCreateAtom` from `@tanstack/react-store`.
- Compare with `basic-external-state`, which uses `state` + `onSortingChange` / `onPaginationChange` instead.

## Related

- [basic-external-state.md](./basic-external-state.md)
- [basic-subscribe.md](./basic-subscribe.md)
