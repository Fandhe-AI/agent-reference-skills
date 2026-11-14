# DataStore.Builder

`DataStore.Builder<T>` is the modern, scalable alternative to `DataStoreFactory`, introduced in DataStore 1.3.0-alpha07 and public in 1.3.0. It takes a `CoroutineContext` instead of a `CoroutineScope`.

## Signature / Usage

Adapted (not in the official docs): the official release notes have no code sample for `DataStore.Builder`, so the fence below quotes the release-note text instead of a signature. Signatures are not published on a fetchable page (reference pages cannot be fetched).

```text
DataStore.Builder<T> as the modern, scalable alternative to DataStoreFactory. It requires a CoroutineContext instead of a CoroutineScope for improved structured concurrency.
With this new API, users now have a way to provide their own corruption logic via setCorruptionHandler.
Ensure that the CoroutineContext provided to the Builder has a Job, and that it is application-scoped. If the context is canceled, DataStore's internal operations will be terminated prematurely.
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `setCorruptionHandler` | builder method | — | Provides your own corruption logic. |
| `CoroutineContext` | `CoroutineContext` | — | Execution behavior (e.g. a Dispatcher) without binding DataStore to the lifecycle of the caller's scope. Must contain a `Job` and be application-scoped. |

## Notes

- The release notes recommend migrating from `DataStoreFactory` to `DataStore.Builder`: requiring a `CoroutineContext` keeps DataStore operations from being bound to short-lived UI lifecycles (e.g. `viewModelScope`), preventing premature cancellation and potential data loss.
- `DataStore.Builder`, `ReThrowCorruptionHandler` and `InterProcessCoordinator` were made public in 1.3.0.
- 1.3.0-alpha04 added a utility `copy` function for updating data in Preferences DataStore.
- Source: https://developer.android.com/jetpack/androidx/releases/datastore (1.3.0 and 1.3.0-alpha07 sections, retrieved 2026-11-14)

## Related

- [DataStore](./datastore.md)
- [DataStoreFactory / MultiProcessDataStoreFactory](./datastore-factory.md)
- [CorruptionHandler](./corruption-handler.md)
