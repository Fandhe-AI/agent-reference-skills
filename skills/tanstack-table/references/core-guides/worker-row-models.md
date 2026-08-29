---
source: https://tanstack.com/table/latest/docs/guide/worker-row-models
---

# Worker Row Models Guide (Experimental)

Offloads the expensive row-model stages (filtering, grouping with aggregation, sorting) into a dedicated Web Worker so heavy recomputation does not block the main thread. Intended for 100,000+ client-side rows; most tables at that scale are better served by server-side processing, pagination, and virtualization first.

## Signature / Usage

Shared config module (imported by both the app and the worker):

```ts
// tableConfig.ts
import {
  columnFilteringFeature, createColumnHelper, createFilteredRowModel,
  createPaginatedRowModel, createSortedRowModel, filterFns,
  rowPaginationFeature, rowSortingFeature, sortFns, tableFeatures,
} from '@tanstack/react-table'
import { workerRowModelsFeature } from '@tanstack/react-table/experimental-worker-plugin'

export const sharedFeatures = tableFeatures({
  rowSortingFeature,
  columnFilteringFeature,
  rowPaginationFeature,
  workerRowModelsFeature,
  filteredRowModel: createFilteredRowModel(),
  sortedRowModel: createSortedRowModel(),
  paginatedRowModel: createPaginatedRowModel(), // pagination stays on main thread
  sortFns,
  filterFns,
})

const columnHelper = createColumnHelper<typeof sharedFeatures, Person>()
export const columns = columnHelper.columns([/* accessorKey columns only */])
```

Worker entry file:

```ts
// table.worker.ts
import { initTableWorker } from '@tanstack/react-table/experimental-worker-plugin'
import { columns, sharedFeatures } from './tableConfig'

initTableWorker({ features: sharedFeatures, columns })
```

App wiring:

```ts
// App.tsx
import { createTableWorker, createWorkerRowModel } from '@tanstack/react-table/experimental-worker-plugin'
import { columns, sharedFeatures } from './tableConfig'

const tableWorker = createTableWorker({
  createWorker: () =>
    new Worker(new URL('./table.worker.ts', import.meta.url), { type: 'module' }),
})

const features: typeof sharedFeatures = {
  ...sharedFeatures,
  filteredRowModel: createWorkerRowModel(tableWorker, 'filtered'),
  sortedRowModel: createWorkerRowModel(tableWorker, 'sorted'),
}

const table = useTable({ features, columns, data })
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `createWorkerRowModel(tableWorker, stage)` | `stage: 'filtered' \| 'grouped' \| 'sorted' \| 'expanded'` | Row-model slot replacement backed by the worker |
| `table.state.workerRowModels.isPending` | `boolean` | True while a computation is in flight |
| `table.state.workerRowModels.lastComputeMs` / `lastRoundTripMs` | `number` | Timing diagnostics |

## Notes

- **Experimental**: API may change or be removed at any time; excluded from the stable surface.
- Offloaded stages must form a contiguous prefix of the pipeline (filtered → grouped → sorted → expanded); never offload `expanded`, and keep pagination on the main thread.
- Everything in the shared config module must be thread-portable: `accessorKey` columns (or module-level accessors), registry functions, no closures over app state.
- Only flat source data is supported (no `getSubRows`) currently.
- Grouping aggregates require both `rowAggregationFeature` and `columnGroupingFeature` in the shared feature set; computed eagerly for columns with an explicit `aggregationFn`/`aggregatedCell` only.
- Works with SSR: server renders unprocessed rows, client takes over after hydration.
- On worker failure, the plugin logs an error, keeps last results on screen, and stops updating; `tableWorker.terminate()` is a manual escape hatch (no automatic termination yet).
- Row selection, expansion, and pagination remain main-thread state, unaffected by this plugin.
- Entry point is tree-shakable and available per adapter: `@tanstack/react-table/experimental-worker-plugin`, `@tanstack/vue-table/experimental-worker-plugin`, etc.

## Related

- [Row Models](./row-models.md)
- [Client-Side vs Server-Side](./client-side-vs-server-side.md)
