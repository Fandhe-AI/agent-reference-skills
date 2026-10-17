---
source: https://developer.apple.com/documentation/appintents/uniqueappentity
---

# UniqueAppEntity

An AppEntity subtype for entities that only have a single instance.

## Signature / Usage

```swift
protocol UniqueAppEntity : AppEntity where Self.DefaultQuery : UniqueAppEntityQuery
```

```swift
struct MyEntity: UniqueAppEntity {
    static var defaultQuery = MyQuery()
}

struct MyQuery: UniqueAppEntityQuery {
    typealias Entity = MyEntity

    func uniqueEntity() -> Entity { ... }
}
```

```swift
struct MyEntity: UniqueAppEntity {
    static var defaultQuery = UniqueAppEntityProvider {
        ...
    }
}
```

## Notes

- iOS 18.0+, iPadOS 18.0+, Mac Catalyst 18.0+, macOS 15.0+, tvOS 18.0+, visionOS 2.0+, watchOS 11.0+
- If an entity type only ever has one value (for example app-global settings), use `UniqueAppEntity` and the related `UniqueAppEntityQuery`. The protocols implement several required methods for you and let the system present the entity differently in some contexts; for example, Shortcuts does not generate a "Find" action for that entity type.
- An entity conforming to `UniqueAppEntity` must have a `defaultQuery` type that conforms to `UniqueAppEntityQuery`, which has a single required method, `uniqueEntity`, and uses it to provide implementations of the other required query methods. The first snippet is the form to use when a separate query definition is needed (for example because it uses `@Dependency`).
- If the query type has no requirements other than `uniqueEntity`, use the simplified `UniqueAppEntityProvider` (second snippet). The provider instance calls the supplied block to get the entity value when needed.
- `UniqueAppEntityQuery` abstract: "A query designed for only returning a single possible value, provided by `uniqueEntity`. Protocol extensions will provide the other required query methods based on that."

## Related

- [AppEntity](./appentity.md)
- [TransientAppEntity](./transientappentity.md)
