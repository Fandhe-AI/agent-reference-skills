---
source: https://tanstack.com/table/latest/docs/framework/react/examples/web-worker-row-models
---

# Web Worker Row Models (experimental)

Run the filtered, grouped and sorted row-model stages in a Web Worker so large datasets do not block the main thread.

```tsx
// tableConfig.tsx — shared between the main thread and the worker
import {
  columnFilteringFeature,
  createColumnHelper,
  createFilteredRowModel,
  createPaginatedRowModel,
  createSortedRowModel,
  filterFn_includesString,
  globalFilteringFeature,
  rowPaginationFeature,
  rowSortingFeature,
  sortFn_alphanumeric,
  sortFn_text,
  tableFeatures,
} from '@tanstack/react-table'
import { workerRowModelsFeature } from '@tanstack/react-table/experimental-worker-plugin'
import type { Person } from './makeData'

// This is where worker-based row models earn their keep: everything here must
// be thread-portable. Columns use accessorKeys or accessors defined in this
// module, headers/cells are only ever rendered on the main thread, and any
// custom sortFn/filterFn/getGroupingValue must be a plain function declared
// here (not a closure over app state) so BOTH threads resolve the same
// implementation.
export const sharedFeatures = tableFeatures({
  rowSortingFeature,
  columnFilteringFeature,
  globalFilteringFeature,
  rowPaginationFeature,
  workerRowModelsFeature,
  filteredRowModel: createFilteredRowModel(),
  sortedRowModel: createSortedRowModel(),
  paginatedRowModel: createPaginatedRowModel(),
  sortFns: {
    alphanumeric: sortFn_alphanumeric,
    text: sortFn_text,
  },
  filterFns: {
    includesString: filterFn_includesString,
  },
})

export const columnHelper = createColumnHelper<typeof sharedFeatures, Person>()

export const columns = columnHelper.columns([
  columnHelper.accessor('email', {
    header: 'Email',
    sortFn: 'alphanumeric',
  }),
])

// table.worker.ts — the entire worker: a headless shadow table running the real
// table-core row model pipeline off the main thread.
import { initTableWorker } from '@tanstack/react-table/experimental-worker-plugin'
import { columns, sharedFeatures } from './tableConfig'

initTableWorker({ features: sharedFeatures, columns })

// routes/index.tsx (main thread, excerpt)
import { useTable } from '@tanstack/react-table'
import {
  createTableWorker,
  createWorkerRowModel,
} from '@tanstack/react-table/experimental-worker-plugin'

// One handle per table worker; every offloaded stage shares it, so filtering,
// grouping, and sorting cost a single worker and one round trip per change.
const tableWorker = createTableWorker({
  createWorker: () =>
    new Worker(new URL('../table.worker.ts', import.meta.url), {
      type: 'module',
    }),
})

// Same features as the worker's shadow table, but with the filtered, grouped,
// and sorted stages swapped for worker-backed ones. Expanding and pagination
// stay on the main thread (cheap, downstream); row selection is pure state.
const features: typeof sharedFeatures = {
  ...sharedFeatures,
  filteredRowModel: createWorkerRowModel(tableWorker, 'filtered'),
  sortedRowModel: createWorkerRowModel(tableWorker, 'sorted'),
}

// A completely normal table: no manual* flags, no postMessage in app code.
const table = useTable(
  {
    features,
    columns,
    data,
    debugTable: true,
  },
  (state) => state, // default selector
)

const isPending = table.state.workerRowModels.isPending
```

## Notes

- Experimental API from `@tanstack/react-table/experimental-worker-plugin`; there is no `main.tsx` in this example, so the snippet joins `tableConfig.tsx`, `table.worker.ts` and an excerpt of `routes/index.tsx` (one block with file-header comments).
- Trimmed from the official example: grouping / aggregation / selection / expanding features, the multi-column definitions with custom `sortFn`s, SSR server function (`createServerFn`), the jank-meter demo and table markup. The official example also swaps in a `'grouped'` worker stage (`groupedRowModel: createWorkerRowModel(tableWorker, 'grouped')`) which is omitted here with the grouping feature. `router.tsx` in the example is plain TanStack Router setup and unrelated to the worker.
- Custom `sortFn` / `filterFn` / `getGroupingValue` functions must be plain functions declared in the shared module so both threads resolve the same implementation.
- `table.state.workerRowModels.isPending` reports in-flight worker work.

## Related

- [server-side.md](./server-side.md)
- [virtualized-rows.md](./virtualized-rows.md)
