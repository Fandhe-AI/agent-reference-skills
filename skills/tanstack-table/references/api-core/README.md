# api-core

| Name | Description | Path |
|------|-------------|------|
| AccessorFn / DeepKeys / DeepValue | Type utilities for reading cell values through an accessor and deep key paths | [accessor-fn-deep-keys.md](./accessor-fn-deep-keys.md) |
| AppCellContext / AppHeaderContext (React) | Enhanced `CellContext` / `HeaderContext` types for `createTableHook` apps | [app-cell-header-context.md](./app-cell-header-context.md) |
| AppColumnHelper (React) | Enhanced column helper returned by `createAppColumnHelper` | [app-column-helper.md](./app-column-helper.md) |
| Atoms / BaseAtoms / ExternalAtoms | Three maps keyed by `TableState` slice, covering internal writable and external atom state | [atoms.md](./atoms.md) |
| buildHeaderGroups | Constructs a nested header group structure for a table | [build-header-groups.md](./build-header-groups.md) |
| CellContext | Context object passed to a cell's render function | [cell-context.md](./cell-context.md) |
| Cell | Combines core cell functionality with feature-specific cell APIs | [cell.md](./cell.md) |
| ColumnDefBase / AccessorColumnDef / DisplayColumnDef / GroupColumnDef / ColumnDefTemplate | Type aliases that compose the `ColumnDef` union: base, accessor, display, group, and template variants | [column-def-variants.md](./column-def-variants.md) |
| ColumnDef | Union type representing one of three column definition variants | [column-def.md](./column-def.md) |
| ColumnHelper | Interface of helper methods for creating `ColumnDef` objects | [column-helper.md](./column-helper.md) |
| ColumnMeta | Extensible interface for attaching arbitrary custom metadata to columns | [column-meta.md](./column-meta.md) |
| Column | Combines a core column definition with feature-specific column APIs | [column.md](./column.md) |
| constructCell | Constructs a cell instance from normalized table internals | [construct-cell.md](./construct-cell.md) |
| constructColumn | Creates a column instance by wiring core properties to feature APIs | [construct-column.md](./construct-column.md) |
| constructHeader | Assembles a header instance by wiring core properties to feature APIs | [construct-header.md](./construct-header.md) |
| constructRow | Constructs a row instance from normalized table internals | [construct-row.md](./construct-row.md) |
| constructTable | Constructs a table instance from normalized table internals | [construct-table.md](./construct-table.md) |
| coreFeatures | The built-in core feature set required by every table | [core-features.md](./core-features.md) |
| createColumnHelper | Creates helper functions for authoring column definitions | [create-column-helper.md](./create-column-helper.md) |
| createCoreRowModel | Creates a memoized core row model factory | [create-core-row-model.md](./create-core-row-model.md) |
| createExpandedRowModel | Creates a memoized expanded row model factory | [create-expanded-row-model.md](./create-expanded-row-model.md) |
| createFacetedMinMaxValues | Creates a memoized faceted min/max values helper for columns | [create-faceted-min-max-values.md](./create-faceted-min-max-values.md) |
| createFacetedRowModel | Creates a memoized faceted row model factory | [create-faceted-row-model.md](./create-faceted-row-model.md) |
| createFacetedUniqueValues | Creates a memoized faceted unique values helper for columns | [create-faceted-unique-values.md](./create-faceted-unique-values.md) |
| createFilteredRowModel | Creates a memoized filtered row model factory | [create-filtered-row-model.md](./create-filtered-row-model.md) |
| createGroupedRowModel | Creates a memoized grouped row model factory | [create-grouped-row-model.md](./create-grouped-row-model.md) |
| createPaginatedRowModel | Creates a memoized paginated row model factory | [create-paginated-row-model.md](./create-paginated-row-model.md) |
| createSortedRowModel | Creates a memoized sorted row model factory | [create-sorted-row-model.md](./create-sorted-row-model.md) |
| createTableHook / CreateTableHookOptions (React) | Creates a custom table hook with pre-bound components | [create-table-hook.md](./create-table-hook.md) |
| DebugOptions | Debug flags accepted by table options. | [debug-options.md](./debug-options.md) |
| expandRows | Expands a row model according to the current expanded state | [expand-rows.md](./expand-rows.md) |
| flexRender / FlexRender | Adapter-provided utility (function `flexRender` / component `FlexRender`) that renders header, cell, and footer values | [flex-render.md](./flex-render.md) |
| getInitialTableState | Builds the initial table state from registered features | [get-initial-table-state.md](./get-initial-table-state.md) |
| HeaderContext | Context object passed to a header's render function | [header-context.md](./header-context.md) |
| HeaderGroup | A row of headers at a given depth in a (possibly multi-level) header structure | [header-group.md](./header-group.md) |
| Header | Combines core header functionality with feature-specific header APIs | [header.md](./header.md) |
| OnChangeFn / Updater | Callback and value types used by every `onXxxChange` table option | [on-change-fn-updater.md](./on-change-fn-updater.md) |
| @tanstack/react-table Exports | The React adapter package that re-exports all of `@tanstack/table-core` | [react-table-package.md](./react-table-package.md) |
| ReactTable / AppReactTable (React) | Table instance types for React (`ReactTable`, `AppReactTable`) | [react-table-type.md](./react-table-type.md) |
| RowData / CellData | Base constraint types for row objects and cell values. | [row-data-cell-data.md](./row-data-cell-data.md) |
| RowModelFns / CachedRowModels | Feature-derived type maps for row model functions and cached row models | [row-model-fns.md](./row-model-fns.md) |
| RowModel | The output shape of a row-model factory, such as core and filtered row models | [row-model.md](./row-model.md) |
| Row | Combines core row functionality with feature-specific row APIs | [row.md](./row.md) |
| Static Functions | In v9, most per-object methods (e.g. `table.getRowModel()`) are replaced by static functions | [static-functions.md](./static-functions.md) |
| stockFeatures | The complete set of stock optional table features | [stock-features.md](./stock-features.md) |
| Subscribe (React) | React component for opting into state re-renders for selected table slices | [subscribe.md](./subscribe.md) |
| TableFeature | Lifecycle hooks and defaults contributed by a table feature | [table-feature.md](./table-feature.md) |
| tableFeatures | Helper function to define the features to be imported into a table | [table-features-fn.md](./table-features-fn.md) |
| TableFeatures (interface) | Complete feature registry for a table, combining core and optional features | [table-features-interface.md](./table-features-interface.md) |
| TableMeta | Extensible interface for attaching arbitrary custom metadata to tables | [table-meta.md](./table-meta.md) |
| tableOptions | Runtime identity helper for `tableOptions` that returns its input | [table-options-helper.md](./table-options-helper.md) |
| TableOptions | Complete table options for a specific feature set | [table-options.md](./table-options.md) |
| TableState | Complete table state for a specific feature set | [table-state.md](./table-state.md) |
| Table | The table object that includes both the core table and feature APIs | [table.md](./table.md) |
| useTable | The v9 React adapter hook that creates a React table instance | [use-table.md](./use-table.md) |
