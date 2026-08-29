---
source: https://tanstack.com/table/latest/docs/reference/index/interfaces/HeaderGroup
---

# HeaderGroup

A row of headers at a given depth in a (possibly multi-level) header structure.

## Signature / Usage

```ts
interface HeaderGroup<TFeatures, TData> {
  depth: number
  headers: Header<TFeatures, TData, unknown>[]
  id: string
}
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `depth` | `number` | Depth level of this header group |
| `headers` | `Header<TFeatures, TData, unknown>[]` | Headers in this group |
| `id` | `string` | Header group identifier |

## Notes

- There is no separate "HeaderGroup API" reference section in v9; `HeaderGroup` lives under the Header API group.

## Related

- [Header](./header.md)
- [buildHeaderGroups](./build-header-groups.md)
