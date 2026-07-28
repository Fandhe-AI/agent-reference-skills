# mutableStateOf

Creates an observable `MutableState<T>`. Any write to `value` schedules recomposition of every composable function that read `value`.

## Signature / Usage

```kotlin
fun <T> mutableStateOf(
    value: T,
    policy: SnapshotMutationPolicy<T> = structuralEqualityPolicy(),
): MutableState<T>
```

```kotlin
// Three equivalent ways to declare a MutableState in a composable
val mutableState = remember { mutableStateOf(default) }
var value by remember { mutableStateOf(default) }
val (value, setValue) = remember { mutableStateOf(default) }
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `T` | — | Initial value held by the returned state. |
| `policy` | `SnapshotMutationPolicy<T>` | `structuralEqualityPolicy()` | Controls when a write is considered a change (and thus triggers recomposition), e.g. `referentialEqualityPolicy()` for reference comparison. |

## Notes

- Almost always wrapped in [remember](./remember.md) inside a composable, otherwise a new state is created on every recomposition.
- The `by` delegate syntax (`var value by remember { mutableStateOf(...) }`) requires the `getValue`/`setValue` operators imported from `androidx.compose.runtime`.
- Package: `androidx.compose.runtime`.

## Related

- [MutableState](./mutablestate.md)
- [State](./state.md)
- [remember](./remember.md)
- [mutableStateListOf](./mutablestatelistof.md)
- [mutableStateMapOf](./mutablestatemapof.md)
