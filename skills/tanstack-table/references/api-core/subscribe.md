---
source: https://tanstack.com/table/latest/docs/framework/react/reference/index/functions/Subscribe
---

# Subscribe (React)

React component for opting into state re-renders for specific parts of the table state. Also covers `SubscribeProps*` and `SubscribeSource`.

## Signature / Usage

```ts
function Subscribe<TSourceValue>(props: SubscribePropsWithSourceIdentity<TSourceValue>): ReactNode | Promise<ReactNode>;
function Subscribe<TSourceValue, TSelected>(props: SubscribePropsWithSourceWithSelector<TSourceValue, TSelected>): ReactNode | Promise<ReactNode>;
function Subscribe<TFeatures, TSelected>(props: SubscribePropsWithStore<TFeatures, TSelected>): ReactNode | Promise<ReactNode>;
```

```tsx
// As a standalone component — full store
<Subscribe source={table.store} selector={(state) => ({ rowSelection: state.rowSelection })}>
  {({ rowSelection }) => (
    <div>Selected rows: {Object.keys(rowSelection).length}</div>
  )}
</Subscribe>

// Entire source (atom or store) — no selector
<Subscribe source={table.atoms.rowSelection}>
  {(rowSelection) => <div>...</div>}
</Subscribe>

// Project source value (e.g. one row's selection)
<Subscribe
  source={table.atoms.rowSelection}
  selector={(rowSelection) => rowSelection?.[row.id]}
>
  {(selected) => <tr data-selected={!!selected}>...</tr>}
</Subscribe>

// As table.Subscribe (table instance method)
<table.Subscribe selector={(state) => ({ rowSelection: state.rowSelection })}>
  {({ rowSelection }) => (
    <div>Selected rows: {Object.keys(rowSelection).length}</div>
  )}
</table.Subscribe>
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `source` | `SubscribeSource<TSourceValue>` | Atom or store to subscribe to. For `SubscribePropsWithStore`, `SubscribeSource<TableState<TFeatures>>` |
| `selector` | `(state) => TSelected` | Projection. Required with `SubscribePropsWithStore` (receives full `TableState`; re-renders on shallow change) and `SubscribePropsWithSourceWithSelector` (receives the source value); `SubscribePropsWithSourceIdentity` has `selector?: undefined` |
| `children` | `((state) => ReactNode) \| ReactNode` | Render output; receives the selected / source value |

Related types:

```ts
type SubscribeSource<TValue> =
  | Atom<TValue>
  | ReadonlyAtom<TValue>
  | Store<TValue>
  | ReadonlyStore<TValue>;

type SubscribeProps<TFeatures, TSelected, TSourceValue> =
  | SubscribePropsWithStore<TFeatures, TSelected>
  | SubscribePropsWithSourceIdentity<TSourceValue>
  | SubscribePropsWithSourceWithSelector<TSourceValue, TSelected>;

type SubscribePropsWithSource<TSourceValue, TSelected> =
  | SubscribePropsWithSourceIdentity<TSourceValue>
  | SubscribePropsWithSourceWithSelector<TSourceValue, TSelected>;
```

## Notes

- `SubscribePropsWithStore`: subscribe to `table.store` (full table state); selector is required so you never subscribe to the whole store without an explicit projection.
- `SubscribePropsWithSourceIdentity`: subscribe to the full value of a source (e.g. `table.atoms.rowSelection` or `table.optionsStore`); omitting `selector` equals the identity selector.
- `SubscribePropsWithSourceWithSelector`: subscribe to a projected value; children receive `TSelected`.
- For `table.Subscribe` from `useTable`, prefer that API: it uses overloads so JSX contextual typing works. The standalone component uses a union `props` type.

## Related

- [ReactTable / AppReactTable](./react-table-type.md)
- [Atoms / BaseAtoms / ExternalAtoms](./atoms.md)
- [useTable](./use-table.md)
