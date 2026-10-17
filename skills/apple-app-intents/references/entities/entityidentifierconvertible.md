---
source: https://developer.apple.com/documentation/appintents/entityidentifierconvertible
---

# EntityIdentifierConvertible

An interface for converting between an entity's identifier and its string representation.

## Signature / Usage

```swift
protocol EntityIdentifierConvertible
```

```swift
extension MusicItemID: EntityIdentifierConvertible {
    public var entityIdentifierString: String {
        rawValue
    }

    public init?(entityIdentifierString: String) {
        self = MusicItemID(entityIdentifierString)
    }
}
```

## Options / Props

| Name | Declaration | Description |
| --- | --- | --- |
| `entityIdentifier(for:)` | `static func entityIdentifier(for: String) -> Self?` (required) | Identifiers should be able to initialize via a `String` format. |
| `entityIdentifierString` | `var entityIdentifierString: String` (required) | The `AppEntity`'s identifier value as a `String`. |

## Notes

- iOS 16.0+, iPadOS 16.0+, Mac Catalyst 16.0+, macOS 13.0+, tvOS 16.0+, watchOS 9.0+ (visionOS: no `introducedAt` in the source JSON)
- Every entity provides a stable, unique identifier that the framework uses as a concrete reference to the entity; `AppEntity` inherits `Identifiable` to enforce this.
- Wherever possible use `String`, `Int`, or `UUID` for an identifier's type. For other types (for example `MusicItemID` from MusicKit), extend the type with this protocol.
- Keep `entityIdentifierString` to 4096 characters or fewer. Otherwise the framework truncates the value, and you might not be able to convert the truncated value back to its originating type.
- The usage example above is quoted verbatim from the official page; it implements `init?(entityIdentifierString:)`, but the protocol's required members are `entityIdentifierString` and `static func entityIdentifier(for: String) -> Self?` — a conforming type must implement `entityIdentifier(for:)` (the initializer alone does not satisfy the requirement).
- Conforming types listed on the page: `FileEntityIdentifier`, `SyncableEntityIdentifier`.

## Related

- [EntityIdentifier](./entityidentifier.md)
- [AppEntity](./appentity.md)
- [PersistentlyIdentifiable](./persistentlyidentifiable.md)
