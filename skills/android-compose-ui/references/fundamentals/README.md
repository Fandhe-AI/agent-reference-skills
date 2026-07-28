# fundamentals

| Name | Description | Path |
|------|-------------|------|
| Composable Functions | `@Composable` functions: declarative UI model, statelessness, idempotency rules. | [composable-functions.md](./composable-functions.md) |
| Composition and Recomposition | Composition tree, call site identity, `key()`, skipping, stable types. | [recomposition.md](./recomposition.md) |
| Modifier | Chained decorators for size/layout/behavior/appearance; order-matters, scoped modifiers. | [modifier.md](./modifier.md) |
| Phases of Compose | Composition/Layout/Drawing phases and phase-local state reads for performance. | [phases.md](./phases.md) |
| compositionLocalOf | Tracked `ProvidableCompositionLocal` factory. | [compositionlocalof.md](./compositionlocalof.md) |
| staticCompositionLocalOf | Untracked `ProvidableCompositionLocal` factory for rarely-changing values. | [staticcompositionlocalof.md](./staticcompositionlocalof.md) |
| CompositionLocalProvider | Binds values to `CompositionLocal` keys for a subtree. | [compositionlocalprovider.md](./compositionlocalprovider.md) |
| SnapshotMutationPolicy | `structuralEqualityPolicy` / `referentialEqualityPolicy` / `neverEqualPolicy` factories for `MutableState` equivalence. | [snapshotmutationpolicy.md](./snapshotmutationpolicy.md) |
| movableContentOf | Wraps a composable lambda so its remembered state/nodes move instead of being disposed and recreated. | [movablecontentof.md](./movablecontentof.md) |
