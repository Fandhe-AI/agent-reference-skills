# PagingData transforms (map / filter / insertSeparators)

Extension functions on `PagingData<T>` for transforming items as they load: type conversion, filtering, flattening, and inserting separator/header/footer items. Apply them inside an outer `Flow.map { pagingData -> ... }` call on the `Pager.flow`.

## Signature / Usage

```kotlin
public fun <T : Any, R : Any> PagingData<T>.map(transform: suspend (T) -> R): PagingData<R>
public fun <T : Any, R : Any> PagingData<T>.flatMap(transform: suspend (T) -> Iterable<R>): PagingData<R>
public fun <T : Any> PagingData<T>.filter(predicate: suspend (T) -> Boolean): PagingData<T>
public fun <T : R, R : Any> PagingData<T>.insertSeparators(
    terminalSeparatorType: TerminalSeparatorType = TerminalSeparatorType.FULLY_COMPLETE,
    generator: suspend (T?, T?) -> R?,
): PagingData<R>
public fun <T : Any> PagingData<T>.insertHeaderItem(
    terminalSeparatorType: TerminalSeparatorType = TerminalSeparatorType.FULLY_COMPLETE,
    item: T,
): PagingData<T>
public fun <T : Any> PagingData<T>.insertFooterItem(
    terminalSeparatorType: TerminalSeparatorType = TerminalSeparatorType.FULLY_COMPLETE,
    item: T,
): PagingData<T>
```

```kotlin
pager.flow // Flow<PagingData<User>>
    .map { pagingData ->
        pagingData
            .filter { user -> !user.hiddenFromUi }
            .map { user -> UiModel.UserModel(user) }
            .insertSeparators { before, after ->
                when {
                    before == null -> UiModel.SeparatorModel("HEADER")
                    after == null -> UiModel.SeparatorModel("FOOTER")
                    shouldSeparate(before, after) -> UiModel.SeparatorModel("...")
                    else -> null
                }
            }
    }
    .cachedIn(viewModelScope)
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `transform` (map) | `suspend (T) -> R` | — | Converts each item to a new type as it is loaded. |
| `transform` (flatMap) | `suspend (T) -> Iterable<R>` | — | Expands each item into zero or more items. |
| `predicate` (filter) | `suspend (T) -> Boolean` | — | Removes items that do not match. |
| `generator` (insertSeparators) | `suspend (T?, T?) -> R?` | — | Returns a separator between two adjacent items (`before`/`after`), or `null` for none. `null` on both ends marks the list's terminal boundary. |
| `item` (insertHeaderItem / insertFooterItem) | `T` | — | Static item inserted once the corresponding boundary is fully loaded. |
| `terminalSeparatorType` | `TerminalSeparatorType` | `FULLY_COMPLETE` | Controls whether the header/footer/terminal separator waits for the full list boundary to be reached. |

## Notes

- Place these calls inside the outer `Flow.map { pagingData -> ... }`, not directly on the `Pager.flow` collection result.
- Apply `cachedIn()` after these transforms to avoid redoing the work on recomposition/configuration change.
- Package: `androidx.paging`.

## Related

- [PagingData](./pagingdata.md)
- [cachedIn](./cachedin.md)
