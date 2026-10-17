---
source: https://tanstack.com/table/latest/docs/reference/index/type-aliases/ColumnDefBase
---

# ColumnDefBase / AccessorColumnDef / DisplayColumnDef / GroupColumnDef / ColumnDefTemplate

Type aliases that compose the `ColumnDef` union: the shared base, accessor / display / group variants, and the renderable template type.

## Signature / Usage

```ts
type ColumnDefBase<TFeatures, TData, TValue> = ColumnDefBase_Core<TFeatures, TData, TValue> & ExtractFeatureMapTypes<TFeatures, ColumnDef_FeatureMap<TFeatures, TData, TValue>>;

type AccessorColumnDef<TFeatures, TData, TValue> =
  | AccessorKeyColumnDef<TFeatures, TData, TValue>
  | AccessorFnColumnDef<TFeatures, TData, TValue>;

type DisplayColumnDef<TFeatures, TData, TValue> = ColumnDefBase<TFeatures, TData, TValue> & ColumnIdentifiers<TFeatures, TData, TValue>;

type GroupColumnDef<TFeatures, TData, TValue> = GroupColumnDefBase<TFeatures, TData, TValue> & ColumnIdentifiers<TFeatures, TData, TValue>;

type ColumnDefTemplate<TProps> = string | ((props) => any);
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `TFeatures` | `TableFeatures` | Type parameter of all variants |
| `TData` | `RowData` | Row data type |
| `TValue` | `CellData` (default `CellData`) | Cell value type |
| `TProps` | `object` | `ColumnDefTemplate` only: the context type passed to the template function |

## Notes

- `ColumnDefTemplate`: a renderable column template value. Strings render directly; functions receive the relevant cell/header context and can return framework-specific render output.
- `ColumnDefBase` merges core column options with the options contributed by the registered features.
- Defined in `types/ColumnDef.ts` (`table-core`).

## Related

- [ColumnDef](./column-def.md)
- [createColumnHelper](./create-column-helper.md)
- [AccessorFn / DeepKeys / DeepValue](./accessor-fn-deep-keys.md)
- [RowData / CellData](./row-data-cell-data.md)
