# compositionLocalOf

Creates a tracked `ProvidableCompositionLocal` that passes a value down the Composition implicitly. Reads of `.current` are tracked, so only the content that actually reads the value is invalidated when it changes.

## Signature / Usage

```kotlin
fun <T> compositionLocalOf(
    policy: SnapshotMutationPolicy<T> = structuralEqualityPolicy(),
    defaultFactory: () -> T,
): ProvidableCompositionLocal<T>
```

```kotlin
val LocalElevations = compositionLocalOf { Elevations() }

@Composable
fun SomeComposable() {
    MyCard(elevation = LocalElevations.current.card) { /* ... */ }
}
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `policy` | `SnapshotMutationPolicy<T>` | `structuralEqualityPolicy()` | Determines when a new provided value is considered a change. |
| `defaultFactory` | `() -> T` | — | Produces the value used when no `CompositionLocalProvider` supplies one. |

## Notes

- Use when the value is likely to change during recomposition (e.g. theme colors, typography) — only readers of `.current` recompose.
- Prefer explicit parameter passing for composable dependencies; reserve `CompositionLocal` for tree-scoped, cross-cutting concerns with a sensible default.
- Package: `androidx.compose.runtime`.

## Related

- [staticCompositionLocalOf](./staticcompositionlocalof.md)
- [CompositionLocalProvider](./compositionlocalprovider.md)
- [SnapshotMutationPolicy](./snapshotmutationpolicy.md)
