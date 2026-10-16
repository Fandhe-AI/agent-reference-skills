---
source: https://developer.apple.com/documentation/appintents/entitycollection
---

# EntityCollection

An array of entity identifiers that you use to improve the efficiency of operations involving large numbers of entities.

## Signature / Usage

```swift
struct EntityCollection<Entity> where Entity : AppEntity
```

```swift
struct DisableAlarmsIntent: AppIntent {
    static var title: LocalizedStringResource = "Disable Alarms"

    @Parameter(title: "Alarms")
    var alarms: EntityCollection<AlarmEntity>

    func perform() async throws -> some IntentResult {
        // Use the identifiers in the database query without hydration.
        try await AlarmService.disable(alarms.identifiers)

        return .result()
    }
}
```

## Options / Props

| Name | Declaration | Description |
| --- | --- | --- |
| `init(entities:)` | `init(entities: [Entity])` | Creates a new entity identifier collection from entities. |
| `init(identifiers:)` | `init(identifiers: [Entity.ID])` | Creates a new entity identifier collection. |
| `count` | `var count: Int` | The number of entity identifiers in this collection. |
| `identifiers` | `var identifiers: [Entity.ID]` | The entity identifiers in the collection. |
| `isEmpty` | `var isEmpty: Bool` | A Boolean value that indicates whether the collection is empty. |
| `append(_:)` | `func append(Entity.ID)` / `func append(Entity)` | Adds the specified entity identifier (or the identifier for the specified entity) to the collection. |
| `append(contentsOf:)` | `func append(contentsOf: [Entity.ID])` / `func append(contentsOf: [Entity])` | Adds multiple entity identifiers (or the identifiers for multiple entities) to the collection. |
| `contains(_:)` | `func contains(Entity.ID) -> Bool` / `func contains(Entity) -> Bool` | Returns whether the collection contains the specified identifier (or the identifier for the specified entity). |
| `remove(_:)` | `func remove(Entity.ID)` / `func remove(Entity)` | Removes the specified entity identifier (or an entity's identifier) from the collection. |
| `resolvedEntities()` | `func resolvedEntities() async throws -> [Entity]` | Retrieves and returns the entity instances for each identifier in the collection. |
| `defaultResolverSpecification` | `static var defaultResolverSpecification: some ResolverSpecification` | Available when `Entity` conforms to `AppEntity`. |
| `Specification`, `UnwrappedType`, `ValueType` | type aliases | Available when `Entity` conforms to `AppEntity`. |

## Notes

- iOS 27.0+, iPadOS 27.0+, Mac Catalyst 27.0+, macOS 27.0+, tvOS 27.0+, visionOS 27.0+, watchOS 27.0+ (June 2026 updates)
- Use to manage large numbers of entities in an app intent or app entity. It stores only identifiers initially and can fetch full `AppEntity` instances later, saving memory and speeding up operations that do not need the full instance.
- As an intent parameter type, the system does not force resolution of each identifier to the full `AppEntity` instance during parameter resolution, which can save time and memory for parameters with hundreds of entities.
- `resolvedEntities()` uses the app's query types to find or create the entity instances, then caches them in the collection for future access.
- Conforms to: `Collection`, `Copyable`, `Equatable`, `Escapable`, `ExpressibleByArrayLiteral`, `Sendable`, `SendableMetatype`, `Sequence`.

## Related

- [AppEntity](./appentity.md)
- [EntityIdentifier](./entityidentifier.md)
