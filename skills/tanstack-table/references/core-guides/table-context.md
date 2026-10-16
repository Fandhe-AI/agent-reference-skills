---
source: https://tanstack.com/table/latest/docs/framework/react/guide/table-context
---

# Table Context

Components registered with `createTableHook` read the current table, cell, or header from React context instead of props. This guide covers how that context is provided, typed, and isolated.

## Signature / Usage

```tsx
function PaginationControls() {
  const table = useTableContext() // the table provided by <table.AppTable>
  return <button onClick={() => table.nextPage()}>Next</button>
}

function TextCell() {
  const cell = useCellContext<string>() // the cell provided by <table.AppCell>
  return <span>{cell.getValue()}</span>
}

function SortIndicator() {
  const header = useHeaderContext() // the header provided by <table.AppHeader>
  return header.column.getIsSorted() ? '🔼' : null
}
```

Isolated (scoped) contexts for nested table setups:

```tsx
export const {
  tableContext,
  cellContext,
  headerContext,
  useTableContext,
  useCellContext,
  useHeaderContext,
} = createTableHookContexts<typeof features>()

export const { useAppTable } = createTableHook({
  features,
  tableContext,
  cellContext,
  headerContext,
  tableComponents: {/* ... */},
})
```

## Options / Props

| Provider | Provides |
|----------|----------|
| `<table.AppTable>` | The current table instance |
| `<table.AppCell cell={cell}>` | The current cell instance |
| `<table.AppHeader header={header}>` / `<table.AppFooter header={footer}>` | The current header instance |

## Notes

- The instance read back is already extended with `App*` components and registered components (`table.PaginationControls`, `cell.TextCell`, `cell.FlexRender`).
- Every `cell`, `header`, `row`, `column` carries `table` (`cell.table`, etc.) and links to related instances, so context is often unnecessary inside cells and headers; use `useTableContext()` for components with no instance to start from (standalone toolbar, pagination).
- For best typing import the hooks from the `createTableHook` result; hooks from `createTableHookContexts` are typed with `TFeatures` only (no component maps) — use them only where the `createTableHook` result cannot be imported.
- `createTableHookContexts` also works standalone to avoid prop drilling: `column`, `row`, `cell`, `header` instances are stable references, so a context holding them does not re-render consumers on state changes. State-dependent reads (`header.column.getIsSorted()`, `cell.row.getIsSelected()`, `cell.getValue()`) go stale unless wrapped in `Subscribe` or rendered from a `useSelector` value.
- The `table` from `useTable` is not stable (fresh React-facing reference when selected state changes); to pass a stable handle, provide `table.store` or an atom such as `table.atoms.rowSelection`, or keep the core table in a ref.
- By default a shared module-scoped context is used (stable across HMR); independent tables stay isolated by normal provider scoping. Scoped contexts are only needed when nesting one table's provider inside another's. Each `createTableHookContexts` call returns brand-new contexts.

## Related

- [Composable Tables](./composable-tables.md)
- [React Compiler](./react-compiler.md)
