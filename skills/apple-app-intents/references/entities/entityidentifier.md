---
source: https://developer.apple.com/documentation/appintents/entityidentifier
---

# EntityIdentifier (FileEntityIdentifier / SyncableEntityIdentifier / Attributed* in Notes)

A type that uniquely identifies a specific instance of an app entity.

## Signature / Usage

```swift
struct EntityIdentifier
```

```swift
struct Song: AppEntity {
    let id = UUID()
}
```

## Options / Props

| Name | Declaration | Description |
| --- | --- | --- |
| `init(for:)` | `init<Entity>(for: Entity)` | Creates an identifier for the specified entity. |
| `init(for:identifier:)` | `init<Entity>(for: Entity.Type, identifier: Entity.ID)` | Creates an `EntityIdentifier` representing an instance of the specified entity type backed by the specified identifier value. |
| `init(activityIdentifier:)` | `init?(activityIdentifier: String)` | No abstract in the source. |
| `identifier` | `let identifier: String` | Value uniquely identifying the entity instance within its type. |
| `entityType` | `let entityType: any AppEntity.Type` | The type of `AppEntity` represented by this identifier. |
| `valueMaximumLength` | `static let valueMaximumLength: Int` | Maximum allowed length for the `identifier` value; a system constraint that forces truncation if the identifier exceeds it. |
| `==(_:_:)` / `hash(into:)` | `static func == (EntityIdentifier, EntityIdentifier) -> Bool` / `func hash(into: inout Hasher)` | Compares / hashes entity identifiers. |
| `defaultResolverSpecification` | `static var defaultResolverSpecification: EmptyResolverSpecification<EntityIdentifier>` | |
| `Specification`, `UnwrappedType`, `ValueType` | type aliases | |

## Notes

- iOS 16.0+, iPadOS 16.0+, Mac Catalyst 16.0+, macOS 13.0+, tvOS 16.0+, watchOS 9.0+ (visionOS: no `introducedAt` in the source JSON)
- The value used should be unique across all entities of the given type. Entities that are relevant across executions of the app should have stable identifiers that persist across executions.
- Entities conform to `Identifiable`; use for `id` a type that conforms to `EntityIdentifierConvertible`. Default implementations for `String`, `UUID` and `Int` are provided.
- Cross-device stable identifiers (the source text uses the underscore-prefixed names `_SyncableEntity`, `_SyncableEntityIdentifier`, `_SyncableEntityIdentifierProviding`):
  - Passthrough case: if the entity ID is already stable across devices (like server UUIDs), adopt `_SyncableEntity` with no other changes; the framework uses the ID as both local and stable identifier.
  - Mapped case: if local and stable identifiers differ, use `_SyncableEntityIdentifier` as the ID type; the framework extracts the stable ID from the wrapper.
  - Custom identifier case: a custom ID type conforming to `_SyncableEntityIdentifierProviding`; the framework extracts the stable ID via its `stableIdentifierString` property.
  - Apps never interact with `EntityIdentifier.stableIdentifier` directly. The stable identifier is NOT used for equality or hashing; two `EntityIdentifier` instances are equal if they have the same type and local identifier.
- See the SyncableEntity page for the public-facing `SyncableEntity` protocol and `SyncableEntityIdentifier` ("A type-safe wrapper you use to specify different local and stable identifiers for an entity").
- Conforms to: `Copyable`, `CustomStringConvertible`, `Equatable`, `Escapable`, `Hashable`, `Sendable`, `SendableMetatype`.
- Related "Entity identity" types listed under this page (abstracts only; no member pages were saved in the source set):
  - `FileEntityIdentifier`: an identifier for an app entity that refers to a document or other file (the `ID` type required by `FileEntity`).
  - `SyncableEntityIdentifier`: a type-safe wrapper you use to specify different local and stable identifiers for an entity.
  - `AttributedEntityIdentifier`: a unique identifier for an app entity instance within an application.
  - `AttributedTypeIdentifier`: a unique identifier for an app entity or transient app entity type within an application bundle.

## Related

- [EntityIdentifierConvertible](./entityidentifierconvertible.md)
- [PersistentlyIdentifiable](./persistentlyidentifiable.md)
- [AppEntityAnnotatable](./appentityannotatable.md)
- [SyncableEntity](./syncableentity.md)
- [FileEntity](./fileentity.md)
