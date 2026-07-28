# Offline-First Apps

An offline-first app can perform all or a critical subset of its core functionality without a network connection, presenting local data immediately and syncing with the network opportunistically.

## Signature / Usage

```kotlin
class UserDataRepository(
    private val localDataSource: UserDataLocalDataSource,
    private val networkDataSource: UserDataNetworkDataSource,
) {
    val userData: Flow<UserData> = localDataSource.userData

    suspend fun synchronize() {
        val remote = networkDataSource.fetchUserData()
        localDataSource.saveUserData(remote)
    }
}
```

## Notes

- The local data source (database/DataStore/files) is the canonical source of truth; reads come from it via `Flow`, never directly from the network.
- Minimum two data sources per repository: local (fast, canonical) and network (slow, represents true app state, synced to local when possible).
- Writes use `suspend` functions with one of three strategies: online-only (network write must succeed before local update), queued (local queue drained via `WorkManager` with backoff, for non-critical data), or lazy (local write first, network notified later, requires conflict resolution).
- Synchronization strategies: pull-based (fetch on demand, e.g. paging), push-based (proactively mirror the network, better for relational/offline-indefinite data), or a hybrid per data type.
- Conflict resolution commonly uses last-write-wins based on timestamps.
- Use `WorkManager` with `NetworkType.CONNECTED` constraints to drive startup sync and drain queued writes.

## Related

- [data-layer](./data-layer.md)
- [layers](./layers.md)
