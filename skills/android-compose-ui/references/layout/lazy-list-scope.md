# LazyListScope (item / items / itemsIndexed / stickyHeader)

The DSL receiver used inside `LazyColumn` / `LazyRow` content blocks to declare items.

## Signature / Usage

```kotlin
public interface LazyListScope {
    fun item(key: Any? = null, contentType: Any? = null, content: @Composable LazyItemScope.() -> Unit)
}

public fun LazyListScope.items(
    count: Int,
    key: ((index: Int) -> Any)? = null,
    contentType: (index: Int) -> Any? = { null },
    itemContent: @Composable LazyItemScope.(index: Int) -> Unit,
)

public inline fun <T> LazyListScope.items(
    items: List<T>,
    noinline key: ((item: T) -> Any)? = null,
    noinline contentType: (item: T) -> Any? = { null },
    crossinline itemContent: @Composable LazyItemScope.(item: T) -> Unit,
)

public inline fun <T> LazyListScope.itemsIndexed(
    items: List<T>,
    noinline key: ((index: Int, item: T) -> Any)? = null,
    crossinline contentType: (index: Int, item: T) -> Any? = { _, _ -> null },
    crossinline itemContent: @Composable LazyItemScope.(index: Int, item: T) -> Unit,
)

public fun LazyListScope.stickyHeader(
    key: Any? = null,
    contentType: Any? = null,
    content: @Composable LazyItemScope.(Int) -> Unit,
)
```

```kotlin
LazyColumn {
    item { Text("Header") }
    items(messages, key = { it.id }) { message -> MessageRow(message) }
    itemsIndexed(messages) { index, message -> MessageRow(message) }
}
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `item(key, contentType, content)` | function | `null`, `null` | Adds a single item. |
| `items(count, key, contentType, itemContent)` | function | `null`, `{ null }` | Adds `count` index-driven items. |
| `items(items: List<T>, key, contentType, itemContent)` | function | `null`, `{ null }` | Adds items from a list. |
| `itemsIndexed(items: List<T>, key, contentType, itemContent)` | function | `null`, `{ _, _ -> null }` | Adds items from a list, exposing both index and item to `key`/`contentType`/content. |
| `stickyHeader(key, contentType, content)` | function | `null`, `null` | Adds a header item that stays pinned at the top while scrolling past it. |

## Notes

- `key` must be a stable, `Bundle`-compatible value (primitive, enum, `Parcelable`) to correctly preserve item state and `rememberSaveable` across reorderings.
- `contentType` groups items so Compose reuses compositions only between items of the same type, improving performance for heterogeneous lists.
- Use `Modifier.animateItem()` inside item content to animate additions, removals, and reordering (requires a stable `key`).
- Available equivalently on `LazyGridScope` (`LazyVerticalGrid`/`LazyHorizontalGrid`) and `LazyStaggeredGridScope`.
- Package: `androidx.compose.foundation.lazy`.

## Related

- [LazyColumn](./lazycolumn.md)
- [LazyRow](./lazyrow.md)
- [rememberLazyListState](./rememberlazyliststate.md)
