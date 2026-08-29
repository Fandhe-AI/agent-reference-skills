---
source: https://tanstack.com/table/latest/docs/reference/static-functions/index
---

# Static Functions

In v9, most per-object methods (`table.getRowModel()`, `column.getCanSort()`, `row.getVisibleCells()`, etc.) are implemented as standalone functions bound onto the table/column/row/cell/header objects by `tableFeatures()`/`constructTable()` when a feature is enabled, rather than being fixed methods on a single class. This page is a name-only inventory of that ~270-entry static-function surface (`table_*`, `column_*`, `row_*`, `cell_*`, `header_*`, plus `getDefault*State` and small helpers), grouped by the object they attach to. Consult each object's own reference page (`Table`, `Column`, `Row`, `Cell`, `Header`) and the corresponding feature guide for behavior; per-function pages exist at `reference/static-functions/functions/<name>.md` but are not individually distilled here due to volume.

## Signature / Usage

```ts
// tableFeatures()/constructTable() bind these onto the object; call as a normal method
table.getRowModel() // === table_getRowModel(table)
column.getCanSort() // === column_getCanSort(column)
```

## table_*

table_autoResetCellSelection, table_autoResetExpanded, table_autoResetPageIndex, table_autoResetSorting, table_extendCellSelection, table_firstPage, table_getAllColumns, table_getAllFlatColumns, table_getAllFlatColumnsById, table_getAllLeafColumns, table_getAllLeafColumnsById, table_getBottomRows, table_getCanLastPage, table_getCanNextPage, table_getCanPreviousPage, table_getCanSomeRowsExpand, table_getCellSelectionBounds, table_getCellSelectionColumnIds, table_getCellSelectionColumnIndexes, table_getCellSelectionMergeBounds, table_getCellSelectionRowIds, table_getCellSpanIndex, table_getCenterFlatHeaders, table_getCenterFooterGroups, table_getCenterHeaderGroups, table_getCenterLeafColumns, table_getCenterLeafHeaders, table_getCenterRows, table_getCenterTotalSize, table_getCenterVisibleLeafColumns, table_getColumn, table_getColumnIndexes, table_getColumnOffsets, table_getCoreRowModel, table_getDefaultColumnDef, table_getEndFlatHeaders, table_getEndFooterGroups, table_getEndHeaderGroups, table_getEndLeafColumns, table_getEndLeafHeaders, table_getEndTotalSize, table_getEndVisibleLeafColumns, table_getExpandedDepth, table_getExpandedRowModel, table_getFilteredRowModel, table_getFilteredSelectedRowModel, table_getFlatHeaders, table_getFocusedCell, table_getFooterGroups, table_getGlobalAutoFilterFn, table_getGlobalFacetedMinMaxValues, table_getGlobalFacetedRowModel, table_getGlobalFacetedUniqueValues, table_getGlobalFilterFn, table_getGroupedRowModel, table_getGroupedSelectedRowModel, table_getHeaderGroups, table_getIsAllColumnsVisible, table_getIsAllPageRowsSelected, table_getIsAllRowsExpanded, table_getIsAllRowsSelected, table_getIsSomeColumnsPinned, table_getIsSomeColumnsVisible, table_getIsSomePageRowsSelected, table_getIsSomeRowsExpanded, table_getIsSomeRowsPinned, table_getIsSomeRowsSelected, table_getLeafHeaders, table_getMaxSubRowDepth, table_getOrderColumnsFn, table_getPageCount, table_getPageOptions, table_getPaginatedRowModel, table_getPinnedLeafColumns, table_getPinnedVisibleLeafColumns, table_getPreExpandedRowModel, table_getPreFilteredRowModel, table_getPreGroupedRowModel, table_getPrePaginatedRowModel, table_getPreSelectedRowModel, table_getPreSortedRowModel, table_getRow, table_getRowCount, table_getRowId, table_getRowModel, table_getRowsInDisplayOrder, table_getSelectedCellCount, table_getSelectedCellIds, table_getSelectedCellRangesData, table_getSelectedRowIds, table_getSelectedRowModel, table_getSortedRowModel, table_getStartFlatHeaders, table_getStartFooterGroups, table_getStartHeaderGroups, table_getStartLeafColumns, table_getStartLeafHeaders, table_getStartTotalSize, table_getStartVisibleLeafColumns, table_getToggleAllColumnsVisibilityHandler, table_getToggleAllPageRowsSelectedHandler, table_getToggleAllRowsExpandedHandler, table_getToggleAllRowsSelectedHandler, table_getTopRows, table_getTotalSize, table_getVisibleFlatColumns, table_getVisibleLeafColumns, table_lastPage, table_mergeOptions, table_moveCellSelection, table_nextPage, table_previousPage, table_publishExternalState, table_reset, table_resetCellSelection, table_resetColumnFilters, table_resetColumnOrder, table_resetColumnPinning, table_resetColumnSizing, table_resetColumnVisibility, table_resetExpanded, table_resetGlobalFilter, table_resetGrouping, table_resetHeaderSizeInfo, table_resetPageIndex, table_resetPageSize, table_resetPagination, table_resetRowPinning, table_resetRowSelection, table_resetSorting, table_selectAllCells, table_selectCellRange, table_setCellSelection, table_setColumnFilters, table_setColumnOrder, table_setColumnPinning, table_setColumnResizing, table_setColumnSizing, table_setColumnVisibility, table_setExpanded, table_setFocusedCell, table_setGlobalFilter, table_setGrouping, table_setOptions, table_setPageIndex, table_setPageSize, table_setPagination, table_setRowPinning, table_setRowSelection, table_setSorting, table_syncExternalStateToBaseAtoms, table_toggleAllColumnsVisible, table_toggleAllPageRowsSelected, table_toggleAllRowsExpanded, table_toggleAllRowsSelected

## column_*

column_clearSorting, column_getAfter, column_getAggregationFns, column_getAggregationValue, column_getAutoAggregationFn, column_getAutoFilterFn, column_getAutoSortDir, column_getAutoSortFn, column_getCanFilter, column_getCanGlobalFilter, column_getCanGroup, column_getCanHide, column_getCanMultiSort, column_getCanPin, column_getCanResize, column_getCanSort, column_getCanSpan, column_getFacetedMinMaxValues, column_getFacetedRowModel, column_getFacetedUniqueValues, column_getFilterFn, column_getFilterIndex, column_getFilterValue, column_getFirstSortDir, column_getFlatColumns, column_getGroupedIndex, column_getIndex, column_getIsFiltered, column_getIsFirstColumn, column_getIsGrouped, column_getIsLastColumn, column_getIsPinned, column_getIsResizing, column_getIsSorted, column_getIsVisible, column_getLeafColumns, column_getNextSortingOrder, column_getPinnedIndex, column_getSize, column_getSortFn, column_getSortIndex, column_getStart, column_getToggleGroupingHandler, column_getToggleSortingHandler, column_getToggleVisibilityHandler, column_pin, column_resetSize, column_setFilterValue, column_toggleGrouping, column_toggleSorting, column_toggleVisibility

## row_*

row_getAllCells, row_getAllCellsByColumnId, row_getCanExpand, row_getCanMultiSelect, row_getCanPin, row_getCanSelect, row_getCanSelectSubRows, row_getCenterVisibleCells, row_getDisplayIndex, row_getEndVisibleCells, row_getGroupingValue, row_getIsAllParentsExpanded, row_getIsAllSubRowsSelected, row_getIsExpanded, row_getIsGrouped, row_getIsPinned, row_getIsSelected, row_getIsSomeSelected, row_getLeafRows, row_getParentRow, row_getParentRows, row_getPinnedIndex, row_getStartVisibleCells, row_getToggleExpandedHandler, row_getToggleSelectedHandler, row_getUniqueValues, row_getValue, row_getVisibleCells, row_getVisibleCellsByColumnId, row_pin, row_renderValue, row_toggleExpanded, row_toggleSelected

## cell_*

cell_getCanSelect, cell_getColSpan, cell_getContext, cell_getIsAggregated, cell_getIsCovered, cell_getIsFocused, cell_getIsGrouped, cell_getIsPlaceholder, cell_getIsSelected, cell_getRowSpan, cell_getSelectionEdges, cell_getSelectionExtendHandler, cell_getSelectionStartHandler, cell_getTabIndex, cell_getValue, cell_renderValue

## header_*

header_getContext, header_getLeafHeaders, header_getResizeHandler, header_getSize, header_getStart

## Default-state and misc helpers

aggregateColumnValue, formatAggregatedCellValue, getDefaultCellSelectionState, getDefaultColumnFiltersState, getDefaultColumnOrderState, getDefaultColumnPinningState, getDefaultColumnResizingState, getDefaultColumnSizingColumnDef, getDefaultColumnSizingState, getDefaultColumnVisibilityState, getDefaultExpandedState, getDefaultGroupingState, getDefaultPaginationState, getDefaultRowPinningState, getDefaultRowSelectionState, getDefaultSortingState, isRowSelected, isSubRowSelected, isTouchStartEvent, normalizeAggregationRows, normalizeUniqueAggregationRows, orderColumns, passiveEventSupported, selectRowsFn, shouldAutoRemoveFilter

## Notes

- Distinct from `ark-ui` / `chakra-ui` / Android Compose / WinUI `Table` `Column` `Row` `Cell` — this is a headless, JSX-less data-grid state library, not a UI component kit.
- `flexRender` and framework-bound `useReactTable` / legacy `getCoreRowModel` etc. live under `framework/<adapter>/**` in the doc site (e.g. `framework/react/reference/index/functions/FlexRender-1`, `framework/react/reference/legacy/functions/getCoreRowModel`), not under this core `reference/index/**` path — see the adapter-specific scope for those pages.

## Related

- [Table](./table.md)
- [Column](./column.md)
- [Row](./row.md)
- [Cell](./cell.md)
- [Header](./header.md)
