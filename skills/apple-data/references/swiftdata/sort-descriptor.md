# SortDescriptor

A serializable description of how to sort a collection of values by a key path. Used with `FetchDescriptor` and `@Query` in SwiftData.

## Signature / Usage

```swift
struct SortDescriptor<Compared>
```

```swift
// Ascending by name
let byName = SortDescriptor(\Trip.name)

// Descending by date
let byDateDesc = SortDescriptor(\Trip.startDate, order: .reverse)

// Use in FetchDescriptor
let descriptor = FetchDescriptor<Trip>(
    sortBy: [byDateDesc, byName]
)

// Use in @Query
@Query(sort: [SortDescriptor(\Trip.startDate, order: .forward)])
private var trips: [Trip]
```

## Options / Props

| Member | Type | Description |
|--------|------|-------------|
| `keyPath` | `PartialKeyPath<Compared>?` | Property used for comparison |
| `order` | `SortOrder` | `.forward` (ascending) or `.reverse` (descending) |
| `stringComparator` | `String.StandardComparator?` | Custom string comparator (string properties only) |

### Initializers

```swift
init<Value: Comparable>(_ keyPath: KeyPath<Compared, Value>, order: SortOrder = .forward)
init(_ keyPath: KeyPath<Compared, String>, comparator: String.StandardComparator, order: SortOrder = .forward)
```

## Notes

- Available in Foundation since iOS 15.0 / macOS 12.0; used in SwiftData (iOS 17.0+, macOS 14.0+)
- Multiple `SortDescriptor` values can be combined in an array; earlier descriptors take priority
- Conforms to `Codable`, `Equatable`, `Hashable`, `SortComparator`

## Related

- [FetchDescriptor](./fetch-descriptor.md)
- [@Query](./query-macro.md)
