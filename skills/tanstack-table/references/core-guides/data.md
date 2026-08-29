---
source: https://tanstack.com/table/latest/docs/guide/data
---

# Data Guide

`data` is the array of row objects passed to the table. Its shape drives the `TData` generic used across column, row, and cell types.

## Signature / Usage

```ts
type User = {
  firstName: string
  lastName: string
  age: number
}

const data: Array<User> = []
// or
const [data, setData] = React.useState<Array<User>>([])
```

Deep-keyed data can be accessed with dot-path `accessorKey` or an `accessorFn`:

```ts
const columns = [
  { header: 'First Name', accessorKey: 'name.first' },
  { header: 'Age', accessorFn: (row) => row.info.age },
]
```

Nested sub-rows (used by expanding features):

```ts
type User = {
  firstName: string
  lastName: string
  subRows?: Array<User>
}
```

Unknown-shape data (arbitrary API responses, CSV uploads) can be typed generically and have its columns generated at runtime — see [Dynamic Column Definitions](./column-defs.md).

```ts
type DynamicRow = Record<string, unknown>
const data: Array<DynamicRow> = await fetchWhoKnowsWhat()
```

Stable references, React example:

```tsx
const fallbackData: Array<User> = [] // stable empty fallback
const features = tableFeatures({}) // defined outside the component

export default function MyComponent() {
  const columns = useMemo(() => [/* ... */], [])
  const [data, setData] = useState<Array<User>>(() => [/* ... */])

  const table = useTable({ features, columns, data })
  return <table>...</table>
}
```

## Notes

- Periods in an object key are interpreted as a deep key path by `accessorKey`; use `accessorFn` if a key literally contains a period.
- In v9, table state lives in TanStack Store atoms and the table instance is created once, so an unstable `data`/`columns` reference no longer throws a v8-style infinite render loop by itself — but it still forces full row/column-structure recomputation on every render, and features like `autoResetPageIndex` can still cause render loops when combined with an unstable `data` reference.
- Memoize derived/filtered data (e.g. `data?.filter(...)`) separately — filtering inline destroys the stable reference even if the source `data` is already stable.
- `data` is never mutated by TanStack Table; transformations happen through accessors or row models (grouping, aggregation).
- Client-side row models are stress-tested up to 15 million rows after the Object Prototypes Refactor, but the practical limit depends on payload shape, features enabled, and target hardware — test with representative data.

## Related

- [Column Definitions](./column-defs.md)
- [Client-Side vs Server-Side](./client-side-vs-server-side.md)
- [Row Models](./row-models.md)
