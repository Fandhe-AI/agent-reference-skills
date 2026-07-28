# snapshotFlow

Converts Compose `Snapshot` state reads (e.g. `MutableState` objects) into a cold `Flow`. Runs `block` on collection and re-runs it whenever any state object read inside changes, emitting the new result if it differs from the last emitted value.

## Signature / Usage

```kotlin
fun <T> snapshotFlow(block: () -> T): Flow<T>
```

```kotlin
val listState = rememberLazyListState()

LaunchedEffect(listState) {
    snapshotFlow { listState.firstVisibleItemIndex }
        .map { index -> index > 0 }
        .distinctUntilChanged()
        .filter { it }
        .collect { MyAnalyticsService.sendScrolledPastFirstItemEvent() }
}
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `block` | `() -> T` | — | Reads one or more Compose `State`/`Snapshot` values and returns the current result. |

## Notes

- Must be collected from a `CoroutineScope`, typically inside [LaunchedEffect](./launchedeffect.md) or `rememberCoroutineScope()`.
- Supports standard `Flow` operators such as `map`, `filter`, and `distinctUntilChanged()` to react to state changes outside Composition.
- Package: `androidx.compose.runtime`.

## Related

- [derivedStateOf](./derivedstateof.md)
- [LaunchedEffect](./launchedeffect.md)
- [collectAsState](./collectasstate.md)
