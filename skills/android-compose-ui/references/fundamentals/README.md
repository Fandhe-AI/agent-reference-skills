# fundamentals

| Name | Description | Path |
|------|-------------|------|
| Composable Functions | The `@Composable` annotation marks a Kotlin function as part of Compose's declarative UI model: it converts data into UI by emitting other composables. | [composable-functions.md](./composable-functions.md) |
| compositionLocalOf | Creates a tracked `ProvidableCompositionLocal` that passes a value down the Composition implicitly. | [compositionlocalof.md](./compositionlocalof.md) |
| CompositionLocalProvider | Binds values to `CompositionLocal` keys for a given hierarchy using the `provides` infix function. | [compositionlocalprovider.md](./compositionlocalprovider.md) |
| Custom Modifiers (Modifier.Node) | `Modifier.Node` is the low-level, high-performance API for authoring custom modifiers — the same API Compose's own built-in modifiers are implemented with. | [custom-modifiers.md](./custom-modifiers.md) |
| Modifier | A `Modifier` decorates or augments a composable: size, layout, behavior, appearance, accessibility, input handling, and interactions. | [modifier.md](./modifier.md) |
| movableContentOf | Wraps a `@Composable` lambda so that when the returned lambda is called from a new location in the Composition, the remembered state and layout nodes are moved. | [movablecontentof.md](./movablecontentof.md) |
| Phases of Compose | Compose renders each frame through three phases: **Composition** (what UI to show), **Layout** (where to place it), and **Drawing** (how it renders). | [phases.md](./phases.md) |
| Composition and Recomposition | A **Composition** is the tree describing the app's UI produced by running composables. **Recomposition** re-runs affected composables when state changes. | [recomposition.md](./recomposition.md) |
| SnapshotMutationPolicy | Factories controlling when a `MutableState`-backed value is treated as changed, and therefore whether readers are invalidated. | [snapshotmutationpolicy.md](./snapshotmutationpolicy.md) |
| Stability & Strong Skipping | A type is **stable** if Compose can be sure whether its value changed between recompositions. | [stability.md](./stability.md) |
| staticCompositionLocalOf | Creates an untracked `ProvidableCompositionLocal`. Reads of `.current` are not tracked individually by Compose. | [staticcompositionlocalof.md](./staticcompositionlocalof.md) |
