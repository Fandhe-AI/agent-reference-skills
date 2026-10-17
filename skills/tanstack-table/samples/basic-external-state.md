---
source: https://tanstack.com/table/latest/docs/framework/react/examples/basic-external-state
---

# External State (React useState)

Own the sorting and pagination state in React `useState` and feed it back into the table with `state` and `onXChange`.

```tsx
import React from 'react'
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

  // Manage sorting state with React.useState (although react state causes more re-renders here than necessary compared to using a store)
  const [sorting, setSorting] = React.useState<SortingState>([])

  // Manage pagination state with React.useState (although react state causes more re-renders here than necessary compared to using a store)
  const [pagination, setPagination] = React.useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  })

  // Create the table and pass state + onChange handlers
  const table = useTable(
    {
      key: 'basic-external-state', // needed for devtools
      debugTable: true,
      features,
      columns,
      data,
      state: {
        sorting, // connect our sorting state back down to the table
        pagination, // connect our pagination state back down to the table
      },
      onSortingChange: setSorting, // raise sorting state changes to our own state management
      onPaginationChange: setPagination, // raise pagination state changes to our own state management
    },
    (state) => state, // default selector
  )

  // ... render with table.getHeaderGroups() / table.getRowModel() ...
}
```

## Notes

- Trimmed from the official example: only two columns, and the table markup, pagination controls and devtools wiring are omitted.
- Only the slices passed in `state` are controlled; other state stays internal to the table.
- See `basic-external-atoms` for the atom-based alternative that avoids extra React re-renders.

## Related

- [basic-external-atoms.md](./basic-external-atoms.md)
- [sorting.md](./sorting.md)
- [pagination.md](./pagination.md)
