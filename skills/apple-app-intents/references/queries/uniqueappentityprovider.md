---
source: https://developer.apple.com/documentation/appintents/uniqueappentityprovider
---

# UniqueAppEntityProvider

A simplified query type conforming to `UniqueAppEntityQuery`. Use this as the value of the `defaultQuery` of an entity conforming to `UniqueAppEntity`.

## Signature / Usage

```swift
struct UniqueAppEntityProvider<Entity> where Entity : UniqueAppEntity

init(() async throws -> Entity)
```

## Options / Props

| Name | Declaration | Description |
| --- | --- | --- |
| `init(_:)` | `init(() async throws -> Entity)` | Creates a provider from an asynchronous closure that returns the single entity (no abstract on the page). |

## Notes

- Platforms: iOS 18.0+, iPadOS 18.0+, Mac Catalyst 18.0+, macOS 15.0+, tvOS 18.0+, visionOS 2.0+, watchOS 11.0+.
- Conforms to `DynamicOptionsProvider`, `EntityQuery`, `EnumerableEntityQuery`, `PersistentlyIdentifiable`, `Sendable`, `SendableMetatype`, `UniqueAppEntityQuery`.
- `UniqueAppEntity` is "An AppEntity subtype for entities that only have a single instance."
- The official page has no code listing; the snippet above is declarations only.

## Related

- [UniqueAppEntityQuery](./uniqueappentityquery.md)
- [EnumerableEntityQuery](./enumerableentityquery.md)
- [EntityQuery](./entityquery.md)
