# Set

An unordered collection of unique elements.

## Signature

```swift
@frozen struct Set<Element> where Element : Hashable
```

## Usage

```swift
let ingredients: Set = ["cocoa beans", "sugar", "cocoa butter", "salt"]
if ingredients.contains("sugar") {
    print("contains sugar")
}
let vegan = ingredients.subtracting(["milk", "butter"])
```

## Key APIs

| Name | Description |
|------|-------------|
| `init()` | Creates an empty set |
| `init(minimumCapacity:)` | Creates with pre-allocated space |
| `init(_:)` | Creates from a `Sequence` (duplicates are discarded) |
| `isEmpty` / `count` / `capacity` | Inspection properties |
| `contains(_:)` | `true` if the element is a member |
| `first` | An arbitrary element (optional) |
| `randomElement()` | A random element (optional) |
| `insert(_:)` | Insert an element; returns `(inserted: Bool, memberAfterInsert: Element)` |
| `update(with:)` | Insert unconditionally, returning old member if replaced |
| `remove(_:)` | Remove an element; returns removed element or `nil` |
| `removeFirst()` / `remove(at:)` / `removeAll(keepingCapacity:)` | Removal variants |
| `reserveCapacity(_:)` | Pre-allocate storage |
| `union(_:)` / `formUnion(_:)` | Elements from both sets |
| `intersection(_:)` / `formIntersection(_:)` | Elements common to both sets |
| `symmetricDifference(_:)` / `formSymmetricDifference(_:)` | Elements in either but not both |
| `subtract(_:)` / `subtracting(_:)` | Remove elements present in another set |
| `isSubset(of:)` / `isStrictSubset(of:)` | Subset predicates |
| `isSuperset(of:)` / `isStrictSuperset(of:)` | Superset predicates |
| `isDisjoint(with:)` | `true` if sets share no elements |
| `filter(_:)` | Return set keeping elements matching a predicate |

## Notes

- Available on iOS 8.0+, macOS 10.10+, tvOS 9.0+, watchOS 2.0+, visionOS 1.0+.
- Conforms to `Collection`, `Hashable` (when `Element: Hashable`), `Codable` (when `Element: Codable`), `Sendable`.
- Iteration order is unordered. Use `sorted()` when a stable order is needed.
- Set operations have O(n) time complexity.

## Related

- [Array](./array.md)
- [Dictionary](./dictionary.md)
