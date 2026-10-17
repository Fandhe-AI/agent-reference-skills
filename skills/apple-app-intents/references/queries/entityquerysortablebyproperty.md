---
source: https://developer.apple.com/documentation/appintents/entityquerysortablebyproperty
---

# EntityQuerySortableByProperty

Details about a specific property you use to sort the query results.

## Signature / Usage

```swift
struct EntityQuerySortableByProperty<Entity> where Entity : AppEntity

init<Property>(KeyPath<Entity, Property>)
```

## Options / Props

| Name | Declaration | Description |
| --- | --- | --- |
| `init(_:)` | `init<Property>(KeyPath<Entity, Property>)` | Creates the sort option from a key path to an entity property (no abstract on the page). |

## Notes

- Platforms: iOS 16.0+, iPadOS 16.0+, Mac Catalyst 16.0+, macOS 13.0+, tvOS 16.0+, visionOS (no introduced version listed on the page), watchOS 9.0+.
- Elements of `EntityQuerySortingOptions`.
- The official page has no code listing; the snippet above is the declaration only.

## Related

- [EntityQuerySortingOptions](./entityquerysortingoptions.md)
- [EntityQuerySort](./entityquerysort.md)
