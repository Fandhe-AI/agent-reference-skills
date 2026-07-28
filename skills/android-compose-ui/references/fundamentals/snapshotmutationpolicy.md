# SnapshotMutationPolicy

Factories controlling when a `MutableState`-backed value (e.g. from `mutableStateOf`, `compositionLocalOf`, `derivedStateOf`, `produceState`) is treated as changed, and therefore whether readers are invalidated.

## Signature / Usage

```kotlin
fun <T> structuralEqualityPolicy(): SnapshotMutationPolicy<T>
fun <T> referentialEqualityPolicy(): SnapshotMutationPolicy<T>
fun <T> neverEqualPolicy(): SnapshotMutationPolicy<T>
```

```kotlin
val LocalElevations = compositionLocalOf(structuralEqualityPolicy()) { Elevations() }
```

## Notes

- `structuralEqualityPolicy()` treats two values as equivalent if they are structurally (`==`) equal. Default policy used by `mutableStateOf` and `compositionLocalOf`.
- `referentialEqualityPolicy()` treats two values as equivalent only if they are referentially (`===`) equal.
- `neverEqualPolicy()` never treats two values as equivalent — every write is reported as a change, even to an `==` value.
- Package: `androidx.compose.runtime`.

## Related

- [compositionLocalOf](./compositionlocalof.md)
- [derivedStateOf](../state-lifecycle/derivedstateof.md)
- [produceState](../state-lifecycle/producestate.md)
