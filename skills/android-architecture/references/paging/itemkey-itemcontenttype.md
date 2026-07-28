# itemKey / itemContentType

Extension functions on `LazyPagingItems<T>` that produce index-based key/content-type factories for the standard Compose foundation `LazyListScope.items(count, key, contentType) { ... }` overload (there is no Paging-specific `items()` extension; the generic foundation `items()` is used together with these factories).

## Signature / Usage

```kotlin
public fun <T : Any> LazyPagingItems<T>.itemKey(
    key: ((item: T) -> Any)? = null,
): (index: Int) -> Any

public fun <T : Any> LazyPagingItems<T>.itemContentType(
    contentType: ((item: T) -> Any?)? = null,
): (index: Int) -> Any?
```

```kotlin
LazyColumn {
    items(
        count = lazyPagingItems.itemCount,
        key = lazyPagingItems.itemKey { it.id },
        contentType = lazyPagingItems.itemContentType { "user" },
    ) { index ->
        val user = lazyPagingItems[index]
        if (user != null) UserRow(user) else UserPlaceholder()
    }
}
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `key` | `((T) -> Any)?` | `null` | Derives a stable, unique key per item (e.g. an ID) for use with recomposition/animation. |
| `contentType` | `((T) -> Any?)?` | `null` | Derives a content type per item so compositions of the same type can be reused more efficiently. |

## Notes

- Both factories automatically supply a placeholder key/content-type for `null` items (unloaded placeholders).
- Package: `androidx.paging.compose`.

## Related

- [collectAsLazyPagingItems / LazyPagingItems](./collectaslazypagingitems.md)
