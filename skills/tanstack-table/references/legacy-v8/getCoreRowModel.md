---
source: https://tanstack.com/table/latest/docs/framework/react/reference/legacy/functions/getCoreRowModel
---

# getCoreRowModel

Stub function for v8 API compatibility with `useLegacyTable`. Does nothing — the core row model is always available in v9.

## Signature / Usage

```tsx
function getCoreRowModel<TData extends RowData>(): RowModelFactory<TData>
```

## Notes

- **v9 status: present as a deprecated no-op stub.** The core row model is always created automatically in v9, so there is no direct v9 replacement — calling this function does nothing.

## Related

- [LegacyRowModelOptions](./LegacyRowModelOptions.md)
- [RowModelFactory](./RowModelFactory.md)
