---
source: https://tanstack.com/table/latest/docs/framework/react/reference/index/index, https://tanstack.com/table/latest/docs/framework/react/reference/legacy
---

# @tanstack/react-table Exports

The React adapter package. Re-exports all of `@tanstack/table-core` plus React-specific bindings under two reference trees: `reference/index` (v9-native) and `reference/legacy` (v8-compatibility bridge).

## Signature / Usage

```tsx
import { useTable, flexRender, FlexRender, tableFeatures } from '@tanstack/react-table'
// v8-compatible bridge:
import { useLegacyTable, getCoreRowModel, getSortedRowModel } from '@tanstack/react-table'
```

## Options / Props

| Export (`reference/index`) | Kind | Description |
|------|------|-------------|
| `useTable` | function | v9 hook; requires explicit `features` | see [use-table.md](./use-table.md) |
| `flexRender` / `FlexRender` | function / component | JSX-safe cell/header/footer rendering | see [flex-render.md](./flex-render.md) |
| `createTableHook`, `createTableHookContexts` | function | Builds typed `AppTable`/`AppCell`/`AppHeader` components bound to a fixed feature set, analogous to TanStack Form's `createFormHook` |
| `Subscribe` | component | Subscribes to a slice of table state without re-rendering the whole table |
| `ReactTable`, `AppReactTable`, `Renderable`, `FlexRenderProps` | type | Supporting types for the above |

| Export (`reference/legacy`) | Kind | Description |
|------|------|-------------|
| `useLegacyTable` | function | v8-signature-compatible table hook | see `legacy-v8/useLegacyTable.md` |
| `legacyCreateColumnHelper` | function | v8-compatible column helper | see `legacy-v8/legacyCreateColumnHelper.md` |
| `getCoreRowModel`, `getFilteredRowModel`, `getSortedRowModel`, `getGroupedRowModel`, `getExpandedRowModel`, `getPaginationRowModel`, `getFacetedRowModel`, `getFacetedMinMaxValues`, `getFacetedUniqueValues` | function | v8-signature stub factories for `useLegacyTable` | see corresponding pages in `legacy-v8/` |
| `LegacyTable`, `LegacyColumn`, `LegacyRow`, `LegacyCell`, `LegacyHeader`, `LegacyHeaderGroup`, `LegacyColumnDef`, `LegacyTableOptions`, `LegacyReactTable`, `LegacyFeatures`, `LegacyRowModelOptions`, `RowModelFactory`, `FacetedRowModelFactory`, `FacetedMinMaxValuesFactory`, `FacetedUniqueValuesFactory` | type | v8-shaped types for the legacy bridge | see corresponding pages in `legacy-v8/` |

## Notes

- All `reference/legacy` exports are fully distilled as individual pages under `legacy-v8/` (this skill's v8-compatibility category); this page only indexes them by export name for discoverability from the React-adapter angle.
- `createTableHook`/`Subscribe`/`AppTable*` (typed-component-factory pattern) are not distilled as separate per-item pages here — they are an advanced opt-in layer on top of `useTable`; consult the source page (`framework/react/reference/index/index`) directly if needed.
- Non-React frameworks (Solid/Vue/Svelte/Angular/etc.) expose the same `table-core` surface through their own adapter entry point (`createTable`, `injectTable`, ...) instead of `useTable`.

## Related

- [use-table.md](./use-table.md)
- [flex-render.md](./flex-render.md)
- [table-features-fn.md](./table-features-fn.md)
