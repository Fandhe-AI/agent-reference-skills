---
source: https://tanstack.com/table/latest/docs/reference/index/type-aliases/RowModelFns
---

# RowModelFns / CachedRowModels

Feature-derived type maps for row model functions and cached row models.

## Signature / Usage

```ts
type RowModelFns<TFeatures, TData> = Partial<ExtractFeatureMapTypes<TFeatures, RowModelFns_FeatureMap<TFeatures, TData>>>;

type CachedRowModels<TFeatures, TData> = Partial<CachedRowModel_Core<TFeatures, TData>> & ExtractFeatureMapTypes<TFeatures, CachedRowModels_FeatureMap<TFeatures, TData>>;
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `TFeatures` | `TableFeatures` | Type parameter of both aliases |
| `TData` | `RowData` | Type parameter of both aliases |

## Notes

- Both types are assembled from the registered features via `ExtractFeatureMapTypes`; the official reference gives no further member documentation.
- `RowModelFns` is defined in `types/RowModelFns.ts`, `CachedRowModels` in `types/RowModel.ts`.

## Related

- [RowModel](./row-model.md)
- [TableFeatures (interface)](./table-features-interface.md)
