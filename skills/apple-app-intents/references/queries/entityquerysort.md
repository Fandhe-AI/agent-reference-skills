---
source: https://developer.apple.com/documentation/appintents/entityquerysort
---

# EntityQuerySort

The properties to use to sort the results when the query runs.

## Signature / Usage

```swift
struct EntityQuerySort<Entity> where Entity : AppEntity

let by: PartialKeyPath<Entity>
let order: EntityQuerySort<Entity>.Ordering
```

## Options / Props

| Name | Declaration | Description |
| --- | --- | --- |
| `by` | `let by: PartialKeyPath<Entity>` | The key path of the property to sort by (no abstract on the page). |
| `order` | `let order: EntityQuerySort<Entity>.Ordering` | The sort order (no abstract on the page). |
| `Ordering` | `enum Ordering` | Nested ordering enum (cases not listed in the source page). |

## Notes

- Platforms: iOS 16.0+, iPadOS 16.0+, Mac Catalyst 16.0+, macOS 13.0+, tvOS 16.0+, visionOS (no introduced version listed on the page), watchOS 9.0+.
- Passed to `EntityPropertyQuery.entities(matching:mode:sortedBy:limit:)` as `sortedBy: [EntityQuerySort<Self.Entity>]` (the `Sort` type alias).
- The official page has no code listing; the snippet above is the declarations only.

## Related

- [EntityQuerySortingOptions](./entityquerysortingoptions.md)
- [EntityQuerySortableByProperty](./entityquerysortablebyproperty.md)
- [EntityPropertyQuery](./entitypropertyquery.md)
