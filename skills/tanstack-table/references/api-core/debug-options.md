---
source: https://tanstack.com/table/latest/docs/reference/index/type-aliases/DebugOptions
---

# DebugOptions

Debug flags accepted by table options.

## Signature / Usage

```ts
type DebugOptions<TFeatures> = object & DebugKeysFor<CoreFeatures & TFeatures>;
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `debugAll` | `boolean` | Optional |
| `debugCache` | `boolean` | Optional |
| `debugCells` | `boolean` | Optional |
| `debugColumns` | `boolean` | Optional |
| `debugHeaders` | `boolean` | Optional |
| `debugRows` | `boolean` | Optional |
| `debugTable` | `boolean` | Optional |

## Notes

- `TFeatures extends TableFeatures`. The intersection with `DebugKeysFor<CoreFeatures & TFeatures>` means feature-specific debug keys can also appear depending on the registered features.
- Defined in `types/TableOptions.ts` (`table-core`).

## Related

- [TableOptions](./table-options.md)
- [TableFeatures (interface)](./table-features-interface.md)
