# DiscontiguousSlice

A collection wrapper that provides access to the elements of a collection, indexed by a set of indices.

## Signature

```swift
struct DiscontiguousSlice<Base> where Base : Collection
```

## Usage

Subscripting a collection with a `RangeSet` of its indices returns a `DiscontiguousSlice` (declarations from SE-0270).

```swift
extension Collection {
    public subscript(subranges: RangeSet<Index>) -> DiscontiguousSlice<Self> { get }
}

var numbers = [10, 12, -5, 14, -3, -9, 15]
let negativeSubranges = numbers.indices(where: { $0 < 0 })
// numbers[negativeSubranges].count == 3
```

## Options / Props

| Name | Description |
|------|-------------|
| `base` | The collection that the indexed collection wraps |
| `subranges` | The set (`RangeSet<Base.Index>`) of subranges available through this slice |
| `subscript(_:)` | Accesses the element at the specified position (available when `Base` conforms to `MutableCollection`) |

## Notes

- Available on iOS 18.0+, iPadOS 18.0+, Mac Catalyst 18.0+, macOS 15.0+, tvOS 18.0+, visionOS 2.0+, watchOS 11.0+.
- Conforms to `Collection` and `Sequence`, `BidirectionalCollection` (when `Base` does), `Equatable` / `Hashable` (when `Base.Element` does), `Sendable` (when `Base` and `Base.Index` are `Sendable`), `CustomStringConvertible`, `Copyable`, `Escapable`.
- SE-0270 states that an earlier draft's `MutableCollection` conformance for `DiscontiguousSlice` was removed because of unclear semantics; the documentation page lists a `subscript(_:)` that is available when `Base` conforms to `MutableCollection`.
- Introduced by SE-0270, "Add Collection Operations on Noncontiguous Elements".
- Source: https://developer.apple.com/documentation/swift/discontiguousslice ; SE-0270, swift-evolution commit f006bf3cf2594bdd4a972f9126f93bd1743ed524

## Related

- [RangeSet](./rangeset.md)
- [Array](./array.md)
- [Range](./range.md)
