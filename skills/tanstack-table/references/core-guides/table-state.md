---
source: https://tanstack.com/table/latest/docs/framework/react/guide/table-state
---

# Table State (React)

TanStack Table is a state-management coordinator for table states. Without `initialState`, `atoms`, `state`, or `on[State]Change`, the table manages its own state; React can read, subscribe to, or own individual slices.

## Signature / Usage

```tsx
const table = useTable(
  { features, columns, data },
  (state) => ({
    pagination: state.pagination,
  }),
)

table.state.pagination
table.atoms.pagination.get() // read without subscribing
```

Subscribe at a specific place in the tree:

```tsx
<table.Subscribe
  source={table.atoms.rowSelection}
  selector={(rowSelection) => rowSelection[row.id]}
>
  {(isSelected) => (
    <input
      type="checkbox"
      checked={!!isSelected}
      onChange={row.getToggleSelectedHandler()}
    />
  )}
</table.Subscribe>
```

External atoms (recommended way to own a slice):

```tsx
import { useCreateAtom, useSelector } from '@tanstack/react-store'

const paginationAtom = useCreateAtom<PaginationState>({
  pageIndex: 0,
  pageSize: 10,
})
const pagination = useSelector(paginationAtom)

const table = useTable({
  features,
  columns,
  data,
  atoms: { pagination: paginationAtom },
  manualPagination: true,
})
```

External state (classic, still supported):

```tsx
const table = useTable({
  features,
  columns,
  data,
  state: { sorting },
  onSortingChange: setSorting,
})
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `table.baseAtoms` | writable atoms | Internal writable atoms created from the resolved initial state |
| `table.atoms` | readonly derived atoms | One per registered state slice |
| `table.store` | readonly flat TanStack Store | All registered `table.atoms` derived together |
| `table.state` | selected state (React only) | Value returned by the selector passed as the second argument to `useTable` |
| `initialState` | object | Starting values for registered slices; also used by reset APIs |
| `atoms` | object of atoms | External atoms that own slices; no `on[State]Change` needed |
| `state` | object | External state; pair with the matching `on[State]Change` |
| `on[State]Change` | `(updater) => void` | Updater is a raw value or a function of the previous value |

## Notes

- State slices exist only for features registered in `features`; `table.atoms.rowSelection` is a TypeScript error unless `rowSelectionFeature` is registered.
- `table.atoms.x.get()` and `table.store.state` reads are not React subscriptions.
- The default `useTable` selector selects all registered state; the React adapter compares selected values shallowly. Passing `() => null` opts the parent out of state re-renders; read state inside `table.Subscribe`.
- Without a `source` prop, `table.Subscribe` subscribes to `table.store` and requires a selector.
- Prefer feature APIs (`table.nextPage()`, `table.setSorting(...)`, `row.toggleSelected()`) over writing state. Direct writes go to `table.baseAtoms.<slice>.set(...)`; if a slice is owned by an external atom, write that atom instead.
- `initialState` changes after the first render do not reset state. Reset APIs default to `table.initialState`; `resetPagination(true)` resets to blank/default.
- Provide a slice in only one place (`initialState`, `atoms`, or `state`). External atoms take precedence over external `state`.
- `table.reset()` resets internal base atoms only; it is not the way to reset externally owned atoms.
- v8-style `onStateChange` (single global callback) is removed in v9 and unsupported by `useTable` and `useLegacyTable`; use per-slice callbacks, `atoms`, or subscribe to `table.store`.
- An `on[State]Change` callback needs the matching `state.<slice>`.
- `TableState<typeof features>` is inferred from registered features; prefer `SortingState`, `PaginationState`, `RowSelectionState` for single slices.

## Related

- [React Compiler](./react-compiler.md)
- [Table Context](./table-context.md)
- [Tables](./tables.md)
