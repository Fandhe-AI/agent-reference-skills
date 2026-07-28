# PagingConfig

Object used to configure loading behavior within a `Pager`, as it loads content from a `PagingSource`.

## Signature / Usage

```kotlin
public class PagingConfig @JvmOverloads constructor(
    val pageSize: Int,
    val prefetchDistance: Int = pageSize,
    val enablePlaceholders: Boolean = true,
    val initialLoadSize: Int = pageSize * 3,
    val maxSize: Int = MAX_SIZE_UNBOUNDED,
    val jumpThreshold: Int = COUNT_UNDEFINED,
)
```

```kotlin
PagingConfig(pageSize = 20, enablePlaceholders = true)
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `pageSize` | `Int` | — | Items loaded at once from the `PagingSource`. Should be several times the number of visible items on screen; smaller improves memory, larger improves throughput. |
| `prefetchDistance` | `Int` | `pageSize` | Distance from the edge of loaded content at which to trigger further loading. `0` disables preloading until specifically requested. |
| `enablePlaceholders` | `Boolean` | `true` | Whether `null` placeholders are allowed for unloaded content, when the `PagingSource` can count all items. |
| `initialLoadSize` | `Int` | `pageSize * 3` | Requested load size for the initial `PagingSource` fetch, typically larger than `pageSize` to cover small scrolls near the start. |
| `maxSize` | `Int` | `MAX_SIZE_UNBOUNDED` | Maximum items loaded before pages are dropped. Must be `>= pageSize + 2 * prefetchDistance`. |
| `jumpThreshold` | `Int` | `COUNT_UNDEFINED` | Scroll distance past loaded bounds beyond which a `REFRESH` invalidation is triggered. `COUNT_UNDEFINED` disables this behavior. |

## Notes

- Package: `androidx.paging`.

## Related

- [Pager](./pager.md)
