---
source: https://developer.apple.com/documentation/appintents/syncableentity
---

# SyncableEntity

An interface that indicates your entity has an identifier that's consistent across devices.

## Signature / Usage

```swift
protocol SyncableEntity : AppEntity
```

```swift
struct Article: AppEntity, SyncableEntity {
    var id: UUID  // No changes needed!
    var title: String
}
```

```swift
struct Photo: AppEntity, SyncableEntity {
    var id: SyncableEntityIdentifier<String, String>
    var creationDate: Date

    init(localID: String, stableID: String, creationDate: Date) {
        self.id = SyncableEntityIdentifier(local: localID, stable: stableID)
        self.creationDate = creationDate
    }
}
```

## Notes

- iOS 27.0+, iPadOS 27.0+, Mac Catalyst 27.0+, macOS 27.0+, tvOS 27.0+, visionOS 27.0+, watchOS 27.0+
- Adopt `SyncableEntity` when your entity has an identifier that is the same across devices. It tells the system it can refer to the entity consistently across devices; for example, Siri uses this to transfer a conversation from one device to another.
- If entities are already initialized with a cross-device identifier (for example a server-provided UUID), adopt the protocol without other changes.
- If the entity keeps different local and stable identifiers, set the identifier type to `SyncableEntityIdentifier` ("A type-safe wrapper you use to specify different local and stable identifiers for an entity") and initialize `id` with both values. Use the local identifier when referring to an entity in your code.
- Listed in the June 2026 updates (see updates/appintents).

## Related

- [AppEntity](./appentity.md)
- [EntityIdentifier](./entityidentifier.md)
- [OwnershipProvidingEntity](./ownershipprovidingentity.md)
