# FetchDescriptor

Describes the criteria, sort order, and additional configuration for fetching persistent models.

## Signature / Usage

```swift
struct FetchDescriptor<T> where T: PersistentModel
```

```swift
var descriptor = FetchDescriptor<Recipe>(
    predicate: #Predicate { $0.isFavorite },
    sortBy: [SortDescriptor(\.createdAt, order: .reverse)]
)
descriptor.fetchLimit = 20
descriptor.fetchOffset = 0

let favorites = try context.fetch(descriptor)
```

## Options / Props

| Property | Type | Description |
|----------|------|-------------|
| `predicate` | `Predicate<T>?` | Filter condition |
| `sortBy` | `[SortDescriptor<T>]` | Sort order |
| `fetchLimit` | `Int?` | Maximum number of results to return |
| `fetchOffset` | `Int?` | Number of matching models to skip before returning results |
| `includePendingChanges` | `Bool` | Whether to include unsaved in-memory changes |
| `propertiesToFetch` | `[PartialKeyPath<T>]` | Subset of properties to load (partial fetch) |
| `relationshipKeyPathsForPrefetching` | `[PartialKeyPath<T>]` | Relationships to eagerly load |

### Initializer

```swift
init(predicate: Predicate<T>? = nil, sortBy: [SortDescriptor<T>] = [])
```

## Notes

- iOS 17.0+, macOS 14.0+, tvOS 17.0+, watchOS 10.0+, visionOS 1.0+
- Pass a `FetchDescriptor` directly to `@Query(_:)` for static, compile-time queries
- Use `ModelContext.fetchCount(_:)` when you need only the count to avoid loading objects

## Related

- [ModelContext](./model-context.md)
- [@Query](./query-macro.md)
- [SortDescriptor](./sort-descriptor.md)
- [Predicate / #Predicate](./predicate.md)
