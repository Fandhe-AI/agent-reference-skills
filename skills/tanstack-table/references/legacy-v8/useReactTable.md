---
source: https://tanstack.com/table/v8/docs/framework/react/react-table
---

# useReactTable

The v8 React adapter hook. Takes an `options` object and returns a table instance. Most of its job is managing state the "react" way and providing the rendering implementation of cell/header/footer templates.

## Signature / Usage

```tsx
import { useReactTable } from '@tanstack/react-table'

function App() {
  const table = useReactTable(options)

  // ...render your table
}
```

## Notes

- **v9 status: removed.** Not exported by v9; renamed to `useTable`, which additionally requires an explicit `features` option. For a v8-compatible bridge, see `useLegacyTable`.

## Related

- [useLegacyTable](./useLegacyTable.md)
- [flexRender](./flexRender.md)
