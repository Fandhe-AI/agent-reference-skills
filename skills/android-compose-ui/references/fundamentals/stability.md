# Stability & Strong Skipping

A type is **stable** if Compose can be sure whether its value changed between recompositions; a composable with only stable, unchanged parameters can be **skipped** during recomposition. `@Stable`/`@Immutable` let you assert a stability contract the compiler cannot infer on its own, and **strong skipping mode** relaxes the skipping requirement further so unstable parameters no longer block skipping outright.

## Signature / Usage

```kotlin
// Immutable: all `val` properties, referentially-transparent equals().
@Immutable
data class Contact(val name: String, val number: String)

// Stable: properties may change, but every change is guaranteed to notify
// Compose (e.g. via a State delegate) — a hard contract to uphold manually.
@Stable
class MutableContact(name: String, number: String) {
    var name by mutableStateOf(name)
    var number by mutableStateOf(number)
}
```

## Options / Props

| Inference rule | Result |
| --- | --- |
| Primitives, `String`, function types | Always stable |
| `data class` with only `val` properties of stable types | Inferred stable |
| Class with any `var` property | Unstable, unless annotated `@Stable` and the notify contract holds |
| `List` / `Set` / `Map` (standard collections) | Always unstable (interfaces could be backed by a mutable implementation) — use `kotlinx.collections.immutable`'s `ImmutableList`/`persistentListOf()` instead |
| Type from a module compiled without the Compose compiler | Always unstable |
| `MutableState<T>`, `SnapshotStateList`, `SnapshotStateMap` | Stable (built-in, notify Compose on write) |

## Notes

- Without strong skipping, a composable is skippable only if **every** parameter is stable; one unstable parameter disables skipping for the whole call.
- **Strong skipping mode** is enabled by default since **Kotlin 2.0.20** (with the Compose Compiler Gradle plugin); on older versions enable it explicitly via `composeCompiler { enableStrongSkippingMode = true }`. With it on: all restartable composables become skippable regardless of parameter stability, unstable parameters are compared by instance (`===`) instead of `equals()`, and lambdas are automatically wrapped in `remember` keyed to their captures so recreating them doesn't defeat skipping.
- Diagnose inferred stability with the Compose compiler's metrics/report output (`reportsDestination` / `metricsDestination` compiler args), which lists each function as `skippable`/`restartable` and each type as `stable`/`unstable`/`immutable`.
- Prefer fixing the underlying type (immutable `val`s, `ImmutableList`, wrapping external types) over reaching for `@Stable`/`@Immutable`; the annotations are an unchecked promise to the compiler and a false one causes silent bugs (stale UI that never recomposes).

## Related

- [Composition and Recomposition](./recomposition.md)
