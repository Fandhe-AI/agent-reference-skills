---
source: https://developer.apple.com/documentation/appintents/uniqueappentityquery
---

# UniqueAppEntityQuery

A query designed for only returning a single possible value, provided by `uniqueEntity`. Protocol extensions provide the other required query methods based on that.

## Signature / Usage

```swift
protocol UniqueAppEntityQuery : EnumerableEntityQuery where Self.Entity : UniqueAppEntity

associatedtype Unique
func uniqueEntity() async throws -> Self.Unique
```

## Options / Props

| Name | Declaration | Description |
| --- | --- | --- |
| `Unique` | `associatedtype Unique` (required) | The unique entity type (no abstract on the page). |
| `uniqueEntity()` | `func uniqueEntity() async throws -> Self.Unique` (required) | Returns the single entity (no abstract on the page). |

## Notes

- Platforms: iOS 18.0+, iPadOS 18.0+, Mac Catalyst 18.0+, macOS 15.0+, tvOS 18.0+, visionOS 2.0+, watchOS 11.0+.
- Inherits from `DynamicOptionsProvider`, `EntityQuery`, `EnumerableEntityQuery`, `PersistentlyIdentifiable`, `Sendable`, `SendableMetatype`. Conforming type: `UniqueAppEntityProvider`.
- For entities that have a single instance (`UniqueAppEntity`). Use `UniqueAppEntityProvider` as the simplified conforming type.
- The official page has no code listing; the snippet above is declarations only.

## Related

- [UniqueAppEntityProvider](./uniqueappentityprovider.md)
- [EnumerableEntityQuery](./enumerableentityquery.md)
- [EntityQuery](./entityquery.md)
