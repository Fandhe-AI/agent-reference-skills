# DataStore / DataStoreBatching

Protocols that let SwiftData read and write model data without knowledge of the underlying storage mechanism, enabling custom persistence backends beyond the built-in Core Data-based `DefaultStore`.

## Signature / Usage

```swift
protocol DataStore : AnyObject {
    associatedtype Configuration : DataStoreConfiguration
    associatedtype Snapshot : DataStoreSnapshot

    var configuration: Self.Configuration { get }
    var identifier: String { get }
    var schema: Schema { get }

    init(_ configuration: Self.Configuration, migrationPlan: (any SchemaMigrationPlan.Type)?) throws

    func fetch<T>(_ request: DataStoreFetchRequest<T>) throws -> DataStoreFetchResult<T, Self.Snapshot>
    func fetchCount<T>(_ request: DataStoreFetchRequest<T>) throws -> Int
    func fetchIdentifiers<T>(_ request: DataStoreFetchRequest<T>) throws -> [PersistentIdentifier]

    func save(_ request: DataStoreSaveChangesRequest<Self.Snapshot>) throws -> DataStoreSaveChangesResult<Self.Snapshot>

    func erase() throws

    func initializeState(for: EditingState)
    func cachedSnapshots(for: [PersistentIdentifier], editingState: EditingState) throws -> [PersistentIdentifier : Self.Snapshot]
    func invalidateState(for: EditingState)
}

protocol DataStoreBatching : DataStore {
    func delete<T>(_ request: DataStoreBatchDeleteRequest<T>) throws
}
```

## Options / Props

| Member | Type | Description |
|--------|------|-------------|
| `configuration` | `Self.Configuration` | Storage configuration conforming to `DataStoreConfiguration` |
| `identifier` | `String` | Unique identifier for the store |
| `schema` | `Schema` | Schema the store persists |
| `fetch(_:)` | `(DataStoreFetchRequest<T>) throws -> DataStoreFetchResult<T, Snapshot>` | Fetches model snapshots matching a request |
| `fetchCount(_:)` | `(DataStoreFetchRequest<T>) throws -> Int` | Returns the count of matching models without fetching them |
| `fetchIdentifiers(_:)` | `(DataStoreFetchRequest<T>) throws -> [PersistentIdentifier]` | Returns matching persistent identifiers only |
| `save(_:)` | `(DataStoreSaveChangesRequest<Snapshot>) throws -> DataStoreSaveChangesResult<Snapshot>` | Persists inserts, updates, and deletes |
| `erase()` | `() throws` | Deletes all data managed by the store |
| `delete(_:)` (DataStoreBatching) | `(DataStoreBatchDeleteRequest<T>) throws` | Performs a batch delete without materializing snapshots |

## Notes

- iOS 18.0+, iPadOS 18.0+, Mac Catalyst 18.0+, macOS 15.0+, tvOS 18.0+, visionOS 2.0+, watchOS 11.0+
- Implement `DataStore` to back a `ModelContainer` with a custom storage mechanism instead of the default Core Data-based `DefaultStore`
- Conform additionally to `DataStoreBatching` to support efficient batch deletes without fetching snapshots first
- Conform to `HistoryProviding` alongside `DataStore` to expose change history for the custom store

## Related

- [ModelContainer](./model-container.md)
- [History tracking](./history-tracking.md)
- [ModelDocument](./model-document.md)
