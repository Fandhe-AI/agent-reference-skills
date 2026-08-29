---
source: https://tanstack.com/table/latest/docs/overview
---

# Overview

TanStack Table is a headless UI library for building your own table and datagrid components with 100% control over design and markup — it is not a pre-built table component like AG Grid.

## Signature / Usage

```tsx
// Build your own markup from the table instance's state and APIs
const table = useTable({ features, columns, data })

return (
  <table className="anything-you-want">
    <thead>
      {table.getHeaderGroups().map((headerGroup) => ( /* ... */ ))}
    </thead>
    <tbody>
      {table.getRowModel().rows.map((row) => ( /* ... */ ))}
    </tbody>
  </table>
)
```

## What is "Headless" UI?

Headless UI libraries provide the logic, state, processing, and APIs for UI elements and interactions, but do not provide markup, styles, or pre-built implementations. This keeps state/event/data-processing logic modular and reusable while you retain full control over look and feel.

## Notes

- Core logic is framework-agnostic TypeScript (`@tanstack/table-core`); official adapters exist for React, Preact, Octane, Vue, Solid, Svelte, Angular, Ember, Lit, and Alpine, or use the core directly for vanilla JS.
- Design-system agnostic: works with Tailwind, Bootstrap, Material UI, ShadCN UI, or a custom system.
- The full v9 package is about 25 KB minified + Brotli-compressed; you register only the features/row models your table uses and bundlers tree-shake the rest.
- 17 built-in features: Cell Selection, Cell Spanning, Column Filtering, Column Grouping, Column Ordering, Column Pinning, Column Resizing, Column Sizing, Column Visibility, Faceting, Global Filtering, Row Aggregation, Row Expanding, Row Pagination, Row Pinning, Row Selection, Row Sorting — plus a custom feature (plugin) system.
- Composes with other TanStack libraries: Virtual (virtualize rows/columns), Query (fetch/cache server data), Form (editable cells), Pacer (debounce/throttle), Hotkeys (keyboard shortcuts), Store (already powers table state internally; provide your own atoms for full control).
- If upgrading from v8, start with the framework-specific migration guide.
- This library is headless — it ships no styled components. `ark-ui` / `chakra-ui` provide styled Table components and are a different concern from this reference.

## Related

- [Installation](./installation.md)
- [React Quick Start](./quick-start.md)
- [Migrating to v9](./migrating-to-v9.md)
