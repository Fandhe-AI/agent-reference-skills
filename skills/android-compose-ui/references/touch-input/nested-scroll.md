# Modifier.nestedScroll

Enables an element to participate in the nested scrolling hierarchy: as a scrolling child dispatching events via `NestedScrollDispatcher`, and/or as an ancestor that intercepts/observes those events by providing a `NestedScrollConnection`. Used for pull-to-refresh, collapsing toolbars, and coordinating nested scrollable containers.

## Signature / Usage

```kotlin
fun Modifier.nestedScroll(
    connection: NestedScrollConnection,
    dispatcher: NestedScrollDispatcher? = null,
): Modifier

interface NestedScrollConnection {
    fun onPreScroll(available: Offset, source: NestedScrollSource): Offset = Offset.Zero
    fun onPostScroll(consumed: Offset, available: Offset, source: NestedScrollSource): Offset = Offset.Zero
    suspend fun onPreFling(available: Velocity): Velocity = Velocity.Zero
    suspend fun onPostFling(consumed: Velocity, available: Velocity): Velocity = Velocity.Zero
}
```

```kotlin
val nestedScrollConnection = remember {
    object : NestedScrollConnection {
        override fun onPreScroll(available: Offset, source: NestedScrollSource): Offset {
            // Consume part of the scroll before the child does, e.g. to collapse a toolbar.
            return Offset.Zero
        }
    }
}

Box(Modifier.nestedScroll(nestedScrollConnection)) {
    LazyColumn { /* ... */ }
}
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `connection` | `NestedScrollConnection` | — | Receives nested scroll/fling phases dispatched by a scrolling descendant. |
| `dispatcher` | `NestedScrollDispatcher?` | `null` | Used when this element is itself the scrolling child that dispatches events up the chain. |

## Notes

- `onPreScroll` / `onPreFling` run before the child consumes the delta/velocity (parent gets first chance); `onPostScroll` / `onPostFling` run after, receiving the leftover `available` amount.
- `LazyColumn`, `LazyRow`, `Modifier.scrollable`, and `Modifier.verticalScroll`/`horizontalScroll` all participate in nested scroll automatically as scrolling children.
- Package: `androidx.compose.ui.input.nestedscroll`.

## Related

- [scrollable](./scrollable.md)
