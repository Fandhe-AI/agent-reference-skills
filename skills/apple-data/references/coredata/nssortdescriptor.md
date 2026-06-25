# NSSortDescriptor

Immutable specification of how to order a collection by a property. Assigned to `NSFetchRequest.sortDescriptors` to control the order of Core Data query results.

## Signature / Usage

```swift
class NSSortDescriptor : NSObject

// Type-safe key path (recommended in Swift)
let byName = NSSortDescriptor(keyPath: \MyEntity.name, ascending: true)

// String key (Objective-C compatible)
let byDate = NSSortDescriptor(key: "createdAt", ascending: false)

// With locale-aware comparator
let byTitle = NSSortDescriptor(
    key: "title",
    ascending: true,
    selector: #selector(NSString.localizedStandardCompare(_:))
)

fetchRequest.sortDescriptors = [byDate, byName]
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `key` | `String?` | Property key path string |
| `keyPath` | `AnyKeyPath?` | Swift key path (type-safe) |
| `ascending` | `Bool` | `true` for A→Z / smallest-first |
| `selector` | `Selector?` | Comparison selector for strings |
| `comparator` | `Comparator` | Custom block comparator |

## Notes

- iOS 2.0+, macOS 10.0+, tvOS 9.0+, watchOS 2.0+, visionOS 1.0+ (Foundation framework)
- `NSFetchedResultsController` requires at least one sort descriptor.
- Multiple descriptors are evaluated left-to-right; later descriptors break ties.
- Use `reversedSortDescriptor` to flip an existing descriptor's order.
- Block-based comparators cannot be serialized; avoid them with store-backed fetch requests.

## Related

- [NSFetchRequest](./nsfetchrequest.md)
- [NSFetchedResultsController](./nsfetchedresultscontroller.md)
