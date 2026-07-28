# derivedStateOf

Creates a `State` object whose value is the result of `calculation`, recomputed only when one of the state objects read inside `calculation` changes, and only recomposes readers when the computed result itself changes.

## Signature / Usage

```kotlin
fun <T> derivedStateOf(calculation: () -> T): State<T>

fun <T> derivedStateOf(policy: SnapshotMutationPolicy<T>, calculation: () -> T): State<T>
```

```kotlin
val listState = rememberLazyListState()

val showButton by remember {
    derivedStateOf { listState.firstVisibleItemIndex > 0 }
}
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `calculation` | `() -> T` | — | Reads one or more `State` objects and derives a new value from them. |
| `policy` | `SnapshotMutationPolicy<T>` | `structuralEqualityPolicy()` | Controls when the derived value is considered changed. |

## Notes

- Only use it to reduce recomposition frequency when an input changes more often than the derived UI needs to update (e.g. filtering scroll position against a threshold). Do not use it for a cheap combination like string concatenation — plain computation is enough and `derivedStateOf` adds overhead.
- Must be wrapped in [remember](./remember.md) to avoid recreating the `State` object on every recomposition.
- Package: `androidx.compose.runtime`.

## Related

- [State](./state.md)
- [snapshotFlow](./snapshotflow.md)
