# @Index

Specifies the key-paths that SwiftData uses to create one or more indices for a model, speeding up fetches and predicate filtering. Two overloads exist: one for binary indices only, and one that supports either binary or R-tree indices.

## Signature / Usage

```swift
// Binary indices
@freestanding(declaration)
macro Index<T>(_ indices: [PartialKeyPath<T>]...)
where T : PersistentModel

// Binary or R-tree indices
@freestanding(declaration)
macro Index<T>(_ indices: Schema.Index<T>.Types<T>...)
where T : PersistentModel
```

```swift
@Model
final class Trip {
    #Index<Trip>([\.name], [\.startDate, \.endDate])

    var name: String
    var startDate: Date
    var endDate: Date

    init(name: String, startDate: Date, endDate: Date) {
        self.name = name
        self.startDate = startDate
        self.endDate = endDate
    }
}
```

## Options / Props

| Parameter | Type | Description |
|-----------|------|-------------|
| `indices` (binary overload) | `[PartialKeyPath<T>]...` | One or more arrays of `PartialKeyPath<T>` defining which properties to index with binary indices |
| `indices` (typed overload) | `Schema.Index<T>.Types<T>...` | Variadic index configurations that can be either binary or R-tree indices |

## Notes

- iOS 18.0+, iPadOS 18.0+, Mac Catalyst 18.0+, macOS 15.0+, tvOS 18.0+, visionOS 1.0+, watchOS 11.0+
- Written as `#Index<T>(...)` inside a `@Model` class body
- R-tree indices are useful for spatial/range queries; binary indices suit equality and sort-order lookups

## Related

- [@Model](./model-macro.md)
- [@Unique](./unique-macro.md)
- [FetchDescriptor](./fetch-descriptor.md)
