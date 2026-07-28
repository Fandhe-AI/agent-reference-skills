# PagingDataAdapter

View-system (`RecyclerView`) counterpart to `collectAsLazyPagingItems`: a convenience wrapper around `AsyncPagingDataDiffer` for presenting paginated data, with built-in diffing and load-state access.

## Signature / Usage

```kotlin
public abstract class PagingDataAdapter<T : Any, VH : RecyclerView.ViewHolder>(
    diffCallback: DiffUtil.ItemCallback<T>,
    mainDispatcher: CoroutineContext = Dispatchers.Main,
    workerDispatcher: CoroutineContext = Dispatchers.Default,
) : RecyclerView.Adapter<VH>()
```

```kotlin
class UserAdapter(diffCallback: DiffUtil.ItemCallback<User>) :
    PagingDataAdapter<User, UserViewHolder>(diffCallback) {
    override fun onBindViewHolder(holder: UserViewHolder, position: Int) {
        val user = getItem(position)
        holder.bind(user)
    }
    // onCreateViewHolder(...) omitted
}

lifecycleScope.launch {
    viewModel.userPagingFlow.collectLatest { pagingData ->
        adapter.submitData(pagingData)
    }
}
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `diffCallback` | `DiffUtil.ItemCallback<T>` | — | Item-level diffing used on refresh. |
| `mainDispatcher` | `CoroutineContext` | `Dispatchers.Main` | Dispatcher for UI-facing event dispatch. |
| `workerDispatcher` | `CoroutineContext` | `Dispatchers.Default` | Dispatcher for background list diffing. |

### Key members

| Name | Type | Description |
|------|------|-------------|
| `submitData(pagingData)` | `suspend fun submitData(pagingData: PagingData<T>)` | Present new paged data (suspends until fully applied). |
| `submitData(lifecycle, pagingData)` | `fun submitData(lifecycle: Lifecycle, pagingData: PagingData<T>)` | Present new paged data, tied to a `Lifecycle`. |
| `retry()` | `fun retry()` | Retry failed loads in the current `PagingData` generation. |
| `refresh()` | `fun refresh()` | Trigger a new `PagingData` generation from a new `PagingSource`. |
| `getItem(position)` | `protected fun getItem(position: Int): T?` | Retrieve an item, notifying Paging of the access. |
| `peek(index)` | `fun peek(index: Int): T?` | Retrieve an item without triggering a load. |
| `snapshot()` | `fun snapshot(): ItemSnapshotList<T>` | Current presented items, including placeholders. |
| `loadStateFlow` | `Flow<CombinedLoadStates>` | Emits combined loading state changes. |
| `addLoadStateListener(listener)` | `fun addLoadStateListener(listener: (CombinedLoadStates) -> Unit)` | Registers a load-state observer. |

## Notes

- Package: `androidx.paging` (module `paging-runtime`).
- Prefer `collectAsLazyPagingItems` for Compose UIs; use `PagingDataAdapter` for `RecyclerView`-based View system UIs.

## Related

- [collectAsLazyPagingItems / LazyPagingItems](./collectaslazypagingitems.md)
- [LoadState / CombinedLoadStates](./loadstate.md)
