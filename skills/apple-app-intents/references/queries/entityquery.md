---
source: https://developer.apple.com/documentation/appintents/entityquery
---

# EntityQuery

An interface for locating app entity instances by identifier.

## Signature / Usage

```swift
protocol EntityQuery : DynamicOptionsProvider, PersistentlyIdentifiable, Sendable
```

```swift
struct MyPhotoQuery: EntityQuery {
    func entities(for identifiers: [UUID]) async throws -> [MyPhoto] {
        myPhotoStore.filter { identifiers.contains($0.id) }
    }
}
```

## Options / Props

| Name | Declaration | Description |
| --- | --- | --- |
| `init()` | `init()` (required) | Creates a query. |
| `Entity` | `associatedtype Entity : AppEntity = Self.Result.Result.ValueType` (required) | The entity type that this query knows how to resolve. |
| `Result` | `associatedtype Result = [Self.Entity]` (required) | The result collection type. |
| `entities(for:)` | `func entities(for: [Self.Entity.ID]) async throws -> [Self.Entity]` (required, 1 default implementation) | Retrieves instances by identifier. |
| `suggestedEntities()` | `func suggestedEntities() async throws -> Self.Result` (required, 3 default implementations) | Returns the initial results to display when the system presents options backed by this query. |
| `displayRepresentations(for:)` | `func displayRepresentations(for: [Self.Entity.ID]) async throws -> [Self.Entity.ID : DisplayRepresentation]` (required, 1 default implementation) | Returns display representations by identifier. |
| `allowedExecutionTargets` | `static var allowedExecutionTargets: IntentExecutionTargets` (required, 1 default implementation) | A set of targets that can run this query. |
| `ExecutionTargets` | `typealias ExecutionTargets` | Type alias (no abstract on the page). |

## Notes

- Platforms: iOS 16.0+, iPadOS 16.0+, Mac Catalyst 16.0+, macOS 13.0+, tvOS 16.0+, visionOS (no introduced version listed on the page), watchOS 9.0+.
- An entity query defines how Apple Intelligence, Siri, and the Shortcuts app retrieve instances of a specific `AppEntity` type, and implements the lookup logic.
- Resolve by identifier: Apple Intelligence may already know which entity the person means and needs the instance for its identifier. In `entities(for:)`, first look up whether the instance already exists in memory; if not, make asynchronous calls (for example, disk or a backend service). If the entity for a provided identifier is no longer available, omit it from the returned array.
- Inherited by: `EntityPropertyQuery`, `EntityStringQuery`, `EnumerableEntityQuery`, `IndexedEntityQuery`, `UniqueAppEntityQuery`. Conforming type: `UniqueAppEntityProvider`.
- Official overview article: "Defining app entities for your custom data types" (not reproduced here).

## Related

- [IndexedEntityQuery](./indexedentityquery.md)
- [EnumerableEntityQuery](./enumerableentityquery.md)
- [EntityStringQuery](./entitystringquery.md)
- [EntityPropertyQuery](./entitypropertyquery.md)
- [UniqueAppEntityQuery](./uniqueappentityquery.md)
