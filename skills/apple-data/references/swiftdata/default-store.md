# DefaultStore

A data store that uses Core Data as its undelying storage mechanism. (Typo "undelying" is verbatim from the official abstract.)

## Signature / Usage

```swift
final class DefaultStore
```

```swift
enum DataStoreSnapshotCodingKey {
    case persistentIdentifier
    case modeledProperty(String)
}
```

## Options / Props

| Member | Type | Description |
|--------|------|-------------|
| `name` | `let name: String` | Store information (listed under "Accessing store information") |
| `DefaultSnapshot` | `struct DefaultSnapshot` | Snapshot type used when processing fetch requests |
| `DefaultStore.TokenType` | `typealias TokenType` | History token type, listed under "Managing model change history" |

DataStoreSnapshotCodingKey (the key space to use when implementing custom coders and decoders for data store snapshots)

| Case | Description |
|------|-------------|
| `persistentIdentifier` | A value that represents a persistent identifier |
| `modeledProperty(_:)` | A value that represents the name of the modeled property |

## Notes

- iOS 18.0+, iPadOS 18.0+, Mac Catalyst 18.0+, macOS 15.0+, tvOS 18.0+, visionOS 2.0+, watchOS 11.0+, Swift 5.9+
- `DefaultStore` conforms to `Copyable`, `DataStore`, `DataStoreBatching`, `Escapable`, `HistoryProviding`
- `DataStoreSnapshotCodingKey`: iOS 18.0+, macOS 15.0+, visionOS 2.0+, watchOS 11.0+; conforms to `CodingKey`, `CustomDebugStringConvertible`, `CustomStringConvertible`, `Sendable`, `SendableMetatype`
- The official page gives no descriptions for `name`, `DefaultSnapshot`, or `TokenType` beyond their declarations
- Source: https://developer.apple.com/documentation/swiftdata/defaultstore (fetched 2026-10-16, iOS 27 SDK docs)

## Related

- [DataStore / DataStoreBatching](./data-store-protocol.md)
- [History tracking](./history-tracking.md)
- [ModelDocument](./model-document.md)
- [Errors](./errors.md)
