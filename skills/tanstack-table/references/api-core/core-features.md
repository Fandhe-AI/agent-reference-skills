---
source: https://tanstack.com/table/latest/docs/reference/index/variables/coreFeatures
---

# coreFeatures

The built-in core feature set required by every table (table, column, row, header, cell, and core row-model functionality), operating as the foundation before any optional feature plugins are integrated.

## Signature / Usage

```ts
const coreFeatures: CoreFeatures;
```

## Notes

- `coreFeatures` aggregates six core feature variables, each typed `TableFeature` and defined under `packages/table-core/src/core/`:

| Variable | Role (core module) |
| --- | --- |
| `coreCellsFeature` | Core cell APIs (`core/cells/`) |
| `coreColumnsFeature` | Core column APIs (`core/columns/`) |
| `coreHeadersFeature` | Core header APIs (`core/headers/`) |
| `coreRowModelsFeature` | Core row model APIs (`core/row-models/`) |
| `coreRowsFeature` | Core row APIs (`core/rows/`) |
| `coreTablesFeature` | Core table APIs such as reset and option setting (`core/table/`) |

- The typedoc pages for these variables give only the `TableFeature` type and source location; the roles above are taken from the module each is defined in.

## Related

- [stockFeatures](./stock-features.md)
- [tableFeatures](./table-features-fn.md)
