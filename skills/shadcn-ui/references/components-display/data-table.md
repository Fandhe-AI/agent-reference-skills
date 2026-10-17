---
source: https://ui.shadcn.com/docs/components/base/data-table
---

# Data Table

Powerful table and datagrids built using TanStack Table. There is no single data-table component: the page is a guide for building your own on top of the `Table` component.

## Signature / Usage

```bash
npx shadcn@latest add table
npm install @tanstack/react-table
```

The guide uses TanStack Table v9. Suggested structure:

```txt
app
└── payments
    ├── columns.tsx
    ├── data-table-features.ts
    ├── data-table.tsx
    └── page.tsx
```

Declare the features the table uses; anything not registered is tree-shaken:

```tsx
import {
  columnFilteringFeature,
  columnVisibilityFeature,
  createFilteredRowModel,
  createPaginatedRowModel,
  createSortedRowModel,
  filterFn_includesString,
  rowPaginationFeature,
  rowSelectionFeature,
  rowSortingFeature,
  sortFn_alphanumeric,
  sortFn_text,
  tableFeatures,
} from "@tanstack/react-table"

export const features = tableFeatures({
  columnFilteringFeature,
  columnVisibilityFeature,
  rowPaginationFeature,
  rowSelectionFeature,
  rowSortingFeature,
  filteredRowModel: createFilteredRowModel(),
  paginatedRowModel: createPaginatedRowModel(),
  sortedRowModel: createSortedRowModel(),
  filterFns: { includesString: filterFn_includesString },
  sortFns: { alphanumeric: sortFn_alphanumeric, text: sortFn_text },
})

export type DataTableFeatures = typeof features
```

Table instance and rendering (from the page demo):

```tsx
const table = useTable({
  features,
  data,
  columns,
  onSortingChange: setSorting,
  onColumnFiltersChange: setColumnFilters,
  onColumnVisibilityChange: setColumnVisibility,
  onRowSelectionChange: setRowSelection,
  state: { sorting, columnFilters, columnVisibility, rowSelection },
})

// <table.FlexRender header={header} /> and <table.FlexRender cell={cell} />
```

Column definitions use `createColumnHelper<typeof features, Payment>()` with `columnHelper.columns([...])`, `columnHelper.display({...})` and `columnHelper.accessor("email", {...})`.

## Notes

- Guide sections: Set up Table Features, Basic Table, Cell Formatting, Row Actions, Pagination, Sorting, Filtering, Visibility, Row Selection, Reusable Components (column header, pagination, column toggle taken from the Tasks demo).
- Official note: the core row model is always included; row models for optional features are created with `create*RowModel()` and registered on the features object. There are no more `get*RowModel` table options.
- Built on TanStack Table; the table engine API is in skill tanstack-table.
- Radix variant: https://ui.shadcn.com/docs/components/radix/data-table ; React Aria variant: https://ui.shadcn.com/docs/components/aria/data-table
- This is the shadcn/ui copy-in component (source lives in your `components/ui/`), distinct from `@ark-ui/react` (skill ark-ui), `@chakra-ui/react` (skill chakra-ui) and the Rust fandhe-frontend crates (skill fandhe-frontend).

## Related

- [table](./table.md)
- [badge](./badge.md)
