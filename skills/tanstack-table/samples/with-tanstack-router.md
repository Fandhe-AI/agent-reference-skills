---
source: https://tanstack.com/table/latest/docs/framework/react/examples/with-tanstack-router
---

# With TanStack Router

Keep pagination, sorting and filter state in URL search params using a route's `validateSearch`, `useSearch` and `useNavigate`, with data from TanStack Query.

```tsx
// hooks/useFilters.ts
import { getRouteApi } from '@tanstack/react-router'
import { cleanEmptyParams } from '../utils/cleanEmptyParams'
import type { RegisteredRouter, RouteIds } from '@tanstack/react-router'

export function useFilters<T extends RouteIds<RegisteredRouter['routeTree']>>(
  routeId: T,
) {
  const routeApi = getRouteApi<T>(routeId)
  const navigate = routeApi.useNavigate()
  const filters = routeApi.useSearch()

  const setFilters = (partialFilters: Partial<typeof filters>) =>
    navigate({
      search: (prev) => cleanEmptyParams({ ...prev, ...partialFilters }),
      replace: true,
    } as Parameters<typeof navigate>[0])

  const resetFilters = () => {
    navigate({
      search: {},
      replace: true,
    } as Parameters<typeof navigate>[0])
  }

  return { filters, setFilters, resetFilters }
}

// routes/index.tsx (excerpt)
import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'
import { fetchUsers } from '../api/user'
import { useFilters } from '../hooks/useFilters'
import type { UserFilters } from '../api/user'

export const Route = createFileRoute('/')({
  component: UsersPage,
  validateSearch: () => ({}) as UserFilters,
})

function UsersPage() {
  const { filters, resetFilters, setFilters } = useFilters(Route.fullPath)

  const { data } = useQuery({
    queryKey: ['users', filters],
    queryFn: () => fetchUsers(filters),
    placeholderData: keepPreviousData,
  })

  const paginationState = {
    pageIndex: filters.pageIndex ?? DEFAULT_PAGE_INDEX,
    pageSize: filters.pageSize ?? DEFAULT_PAGE_SIZE,
  }
  // <Table ... pagination={paginationState} paginationOptions={{ onPaginationChange: ..., rowCount: data?.rowCount }} />
}

// App.tsx (excerpt)
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { RouterProvider, createRouter } from '@tanstack/react-router'
import { routeTree } from './routeTree.gen'

const router = createRouter({ routeTree })

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

const queryClient = new QueryClient()

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  )
}
```

## Notes

- Trimmed from the official example: `components/table.tsx` (the `useTable` setup), `utils/cleanEmptyParams.ts`, `utils/tableSortMapper.ts`, `utils/userColumns.tsx`, the sorting / filter wiring, devtools, and `DEFAULT_PAGE_INDEX` / `DEFAULT_PAGE_SIZE` (exported from `components/table`). The snippet joins `hooks/useFilters.ts`, an excerpt of `routes/index.tsx` and an excerpt of `App.tsx` in one block.
- The URL search params are the single source of truth for table state; `navigate({ search, replace: true })` avoids piling up history entries.
- See the `tanstack-router` and `tanstack-query` skills for those APIs.

## Related

- [with-tanstack-query.md](./with-tanstack-query.md)
- [server-side.md](./server-side.md)
