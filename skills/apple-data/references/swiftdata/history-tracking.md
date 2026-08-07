# History tracking (HistoryDescriptor / HistoryToken / HistoryTransaction / HistoryChange / HistoryObserver)

Types for fetching and observing time-based changes to persisted model data, used to sync a local store with remote changes or replay recent edits.

## Signature / Usage

```swift
struct HistoryDescriptor<TransactionType> where TransactionType : HistoryTransaction {
    init(predicate: Predicate<TransactionType>?)
    init(predicate: Predicate<TransactionType>?, sortBy: [SortDescriptor<TransactionType>])

    var predicate: Predicate<TransactionType>?
    var sortBy: [SortDescriptor<TransactionType>]
    var fetchLimit: UInt64
}

protocol HistoryTransaction : Hashable, Identifiable, Sendable {
    associatedtype TokenType : Comparable, Hashable, Identifiable, Sendable
    associatedtype TransactionIdentifier : Comparable, Hashable, Sendable

    var author: String? { get }
    var changes: [HistoryChange] { get }
    var storeIdentifier: String { get }
    var timestamp: Date { get }
    var token: Self.TokenType { get }
    var transactionIdentifier: Self.TransactionIdentifier { get }
}

protocol HistoryToken : Comparable, Decodable, Encodable, Hashable, Identifiable, Sendable {
    associatedtype TokenType : Decodable, Encodable, Hashable, Sendable
    var tokenValue: Self.TokenType? { get }
}

enum HistoryChange {
    case insert(any HistoryInsert)
    case update(any HistoryUpdate)
    case delete(any HistoryDelete)

    var changedPersistentIdentifier: PersistentIdentifier { get }
}

final class HistoryObserver {
    convenience init(
        historyTokens: [String : any HistoryToken]? = nil,
        observedModels: [any PersistentModel.Type] = [],
        authors: Set<String> = [],
        modelContainer: ModelContainer,
        isolation: isolated (any Actor)? = nil
    ) throws

    var eventCounter: Int { get }
    let modelContainer: ModelContainer
    let observedModels: [any PersistentModel.Type]
    let authors: Set<String>
}
```

```swift
// Fetch history transactions since a saved token
let descriptor = HistoryDescriptor<DefaultHistoryTransaction>(
    predicate: #Predicate { $0.author == "sync-engine" }
)
let transactions = try context.fetchHistory(descriptor)

// Observe remote changes as they happen
let observer = try HistoryObserver(
    observedModels: [Trip.self],
    modelContainer: container
)
```

## Options / Props

| Member | Type | Description |
|--------|------|-------------|
| `HistoryDescriptor.predicate` | `Predicate<TransactionType>?` | Filters transactions when fetching history |
| `HistoryDescriptor.sortBy` | `[SortDescriptor<TransactionType>]` | Sort order applied to fetched history |
| `HistoryDescriptor.fetchLimit` | `UInt64` | Maximum number of transactions to retrieve |
| `HistoryTransaction.changes` | `[HistoryChange]` | Individual inserts/updates/deletes in the transaction |
| `HistoryTransaction.token` | `Self.TokenType` | Position marker for incremental history fetching |
| `HistoryToken.tokenValue` | `Self.TokenType?` | Underlying token value used to resume from a point in history |
| `HistoryObserver` `historyTokens` | `[String : any HistoryToken]?` | Per-store tokens marking the last processed position |
| `HistoryObserver` `observedModels` | `[any PersistentModel.Type]` | Model types to filter transactions for; empty observes all |
| `HistoryObserver` `authors` | `Set<String>` | Transaction authors to filter for |
| `HistoryObserver.eventCounter` | `Int` | Increments each time a relevant change is detected |

## Notes

- `HistoryDescriptor`, `HistoryTransaction`, `HistoryToken`, `HistoryChange` (plus `HistoryInsert`/`HistoryUpdate`/`HistoryDelete`/`HistoryTombstone` and their `Default*` implementations): iOS 18.0+, iPadOS 18.0+, Mac Catalyst 18.0+, macOS 15.0+, tvOS 18.0+, visionOS 2.0+, watchOS 11.0+
- `HistoryObserver` is Beta: iOS 27.0+, iPadOS 27.0+, Mac Catalyst 27.0+, macOS 27.0+, tvOS 27.0+, visionOS 27.0+, watchOS 27.0+
- `HistoryObserver` listens for `ModelContainer.remoteChange` notifications and is `@Observable`, so SwiftUI views can react to `eventCounter` changes directly
- A custom `DataStore` must additionally conform to `HistoryProviding` to expose transaction history for these types

## Related

- [ModelContainer](./model-container.md)
- [ModelContext](./model-context.md)
- [DataStore / DataStoreBatching](./data-store-protocol.md)
- [ResultsObserver](./results-observer.md)
