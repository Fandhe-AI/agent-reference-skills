---
source: https://developer.apple.com/documentation/appintents/entityquerysortingoptions
---

# EntityQuerySortingOptions

The potential properties you can use to sort the results of a query.

## Signature / Usage

```swift
struct EntityQuerySortingOptions<Entity> where Entity : AppEntity
```

```swift
init(content: () -> [EntityQuerySortableByProperty<Entity>])
init()
subscript(Int) -> EntityQuerySortableByProperty<Entity>
```

## Options / Props

| Name | Declaration | Description |
| --- | --- | --- |
| `init(content:)` | `init(content: () -> [EntityQuerySortableByProperty<Entity>])` | Creates the sorting options (no abstract on the page). |
| `init()` | `init()` | Creates an empty set of options (no abstract on the page). |
| `EntityQuerySortingOptionsBuilder` | `enum EntityQuerySortingOptionsBuilder` | A result builder that allows you to declaratively describe the sorting options for an entity query. |
| `subscript(_:)` | `subscript(Int) -> EntityQuerySortableByProperty<Entity>` | Gets a sorting option by index (no abstract on the page). |

## Notes

- Platforms: iOS 16.0+, iPadOS 16.0+, Mac Catalyst 16.0+, macOS 13.0+, tvOS 16.0+, visionOS (no introduced version listed on the page), watchOS 9.0+.
- Declared as the `sortingOptions` of an `EntityPropertyQuery` (`static var sortingOptions: Self.SortingOptions`).
- The official page has no code listing; the snippets above are declarations only.

## Related

- [EntityQuerySortableByProperty](./entityquerysortablebyproperty.md)
- [EntityQuerySort](./entityquerysort.md)
- [EntityPropertyQuery](./entitypropertyquery.md)
