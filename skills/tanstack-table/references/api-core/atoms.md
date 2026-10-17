---
source: https://tanstack.com/table/latest/docs/reference/index/type-aliases/Atoms
---

# Atoms / BaseAtoms / ExternalAtoms

Three maps keyed by `TableState` slice: internal writable atoms (`BaseAtoms`), readonly derived atoms (`Atoms`), and optional consumer-supplied atoms (`ExternalAtoms`).

## Signature / Usage

```ts
type BaseAtoms<TFeatures> = { [K in keyof TableState<TFeatures>]-?: Atom<TableState<TFeatures>[K]> };

type Atoms<TFeatures> = { [K in keyof TableState<TFeatures>]-?: ReadonlyAtom<TableState<TFeatures>[K]> };

type ExternalAtoms<TFeatures> = Partial<{ [K in keyof TableState<TFeatures>]: Atom<TableState<TFeatures>[K]> }>;
```

`TFeatures extends TableFeatures` for all three.

## Notes

- `BaseAtoms`: internal writable atoms that the library always writes to via `makeStateUpdater`.
- `Atoms`: readonly derived atoms, one per slice. Each derives from its `baseAtom` plus, optionally, a per-slice external atom or external state value. Precedence: `options.atoms[key]` > `options.state[key]` > `baseAtoms[key]`.
- `ExternalAtoms`: consumers can provide their own writable atom for any state slice to take over ownership of that slice.
- Defined in `core/table/coreTablesFeature.types.ts` (`table-core`).

## Related

- [TableState](./table-state.md)
- [TableOptions](./table-options.md)
- [Table](./table.md)
