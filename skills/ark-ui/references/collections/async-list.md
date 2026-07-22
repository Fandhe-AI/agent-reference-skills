# Async List

`useAsyncList` is a hook for managing asynchronous data operations in list collections, including loading, filtering, sorting, and pagination. It manages state for items, loading indicators, and error handling, and supports request cancellation via `AbortSignal`.

## Signature / Usage

```tsx
import { useAsyncList } from "@ark-ui/react/collection"

const list = useAsyncList<User>({
  async load({ signal }) {
    const response = await fetch("/api/users", { signal })
    return { items: await response.json() }
  },
})
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `load` | `(params: LoadParams) => Promise<LoadResult>` | Async function that loads items; returns `{ items, cursor? }` |
| `sort` | `(descriptor) => LoadResult \| Promise<LoadResult>` | Optional function for client-side or server-side sorting |
| `autoReload` | `boolean` (default: `false`) | Automatically reload on mount |
| `initialItems` | `T[]` | Starting item array |
| `dependencies` | `unknown[]` | Triggers a reload when changed |
| `initialFilterText` | `string` | Starting filter value |
| `initialSortDescriptor` | `SortDescriptor` | Initial sort configuration |

## Return Value

| Name | Type | Description |
|------|------|-------------|
| `items` | `T[]` | Current list of items |
| `loading` | `boolean` | Whether an operation is in progress |
| `error` | `Error \| null` | Last operation error, if any |
| `cursor` | `string \| undefined` | Pagination cursor |
| `filterText` | `string` | Active filter text |
| `sortDescriptor` | `SortDescriptor` | Current sort settings |
| `reload()` | `() => void` | Restarts data loading |
| `loadMore()` | `() => void` | Fetches additional items using the cursor |
| `setFilterText()` | `(text: string) => void` | Updates the filter text and reloads |
| `sort()` | `(descriptor) => void` | Applies a sort configuration |

## Notes

- Supports infinite loading with pagination via `cursor` / `loadMore()`.
- `load` receives an `AbortSignal` for request cancellation on rapid re-triggering (e.g. filter debouncing).

## Related

- [List Collection](./list-collection.md)
- [List Selection](./list-selection.md)
