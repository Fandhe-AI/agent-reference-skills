# PagingData

Container for paged data from a single generation of loads. Each refresh of data (pushed by local storage, or pulled from the network) has a separate corresponding `PagingData` instance. `PagingData` flows through the reactive stream from `Pager` to the UI layer.

## Signature / Usage

```kotlin
public class PagingData<T : Any> {
    public companion object {
        public fun <T : Any> empty(): PagingData<T>
        public fun <T : Any> empty(
            sourceLoadStates: LoadStates,
            mediatorLoadStates: LoadStates? = null,
        ): PagingData<T>
        public fun <T : Any> from(
            data: List<T>,
            placeholdersBefore: Int = 0,
            placeholdersAfter: Int = 0,
        ): PagingData<T>
        public fun <T : Any> from(
            data: List<T>,
            sourceLoadStates: LoadStates,
            mediatorLoadStates: LoadStates? = null,
            placeholdersBefore: Int = 0,
            placeholdersAfter: Int = 0,
        ): PagingData<T>
    }
}
```

```kotlin
pager.flow // Flow<PagingData<User>>
    .map { pagingData -> pagingData.map { user -> UiModel(user) } }
    .cachedIn(viewModelScope)
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `data` | `List<T>` | — | Static list to present (used with `from`). |
| `sourceLoadStates` | `LoadStates` | — | Custom `PagingSource` load states to attach. |
| `mediatorLoadStates` | `LoadStates?` | `null` | Custom `RemoteMediator` load states to attach. |
| `placeholdersBefore` / `placeholdersAfter` | `Int` | `0` | Placeholder counts around the static data (no-op for scroll-triggered loads). |

## Notes

- Each `PagingData` instance is designed to be collected only once by default; use `cachedIn()` to multicast and reuse it (e.g. across configuration changes).
- Transform with `map` / `filter` / `flatMap` / `insertSeparators` inside an outer `Flow.map { pagingData -> ... }` call.
- Package: `androidx.paging`.

## Related

- [Pager](./pager.md)
- [cachedIn](./cachedin.md)
- [PagingData transforms (map / filter / insertSeparators)](./pagingdata-transforms.md)
