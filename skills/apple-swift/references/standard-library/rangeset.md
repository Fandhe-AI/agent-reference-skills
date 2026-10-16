# RangeSet

A set of values of any comparable type, represented by ranges. Commonly used to represent multiple subranges of a collection by storing ranges of the collection's index type.

## Signature

```swift
struct RangeSet<Bound> where Bound : Comparable
```

## Usage

```swift
var numbers = [10, 12, -5, 14, -3, -9, 15]
let negativeSubranges = numbers.indices(where: { $0 < 0 })
// numbers[negativeSubranges].count == 3

numbers.moveSubranges(negativeSubranges, to: 0)
// numbers == [-5, -3, -9, 10, 12, 14, 15]
```

## Key APIs

| Name | Description |
|------|-------------|
| `init()` | Creates an empty range set |
| `init(_:)` | From a `Range<Bound>`, a sequence of `Range<Bound>`, or (when `Bound` is `Int`) an `IndexSet` |
| `init(_:within:)` | Ranges containing only the specified indices in the given collection |
| `isEmpty` | Whether the range set is empty |
| `ranges` | A collection (`RangeSet.Ranges`) of the ranges that make up the set |
| `contains(_:)` | Whether the given value is contained by the ranges in the set |
| `insert(contentsOf:)` / `remove(contentsOf:)` | Insert / remove the given range |
| `insert(_:within:)` / `remove(_:within:)` | Insert / remove a range containing only the specified index |
| `union(_:)` / `formUnion(_:)` | Set union |
| `intersection(_:)` / `formIntersection(_:)` | Set intersection |
| `subtracting(_:)` / `subtract(_:)` | Set difference |
| `symmetricDifference(_:)` / `formSymmetricDifference(_:)` | Symmetric difference |
| `isSubset(of:)` / `isSuperset(of:)` / `isStrictSubset(of:)` / `isStrictSuperset(of:)` / `isDisjoint(_:)` | Set relations |
| `isValid(within:)` | Whether the set is valid for an attributed string (when `Bound` is `AttributedString.Index`) |

## Notes

- Available on iOS 18.0+, iPadOS 18.0+, Mac Catalyst 18.0+, macOS 15.0+, tvOS 18.0+, visionOS 2.0+, watchOS 11.0+.
- Introduced by SE-0270, "Add Collection Operations on Noncontiguous Elements". Subscripting a collection with a `RangeSet` of its indices returns a `DiscontiguousSlice`.
- Conforms to `Copyable`, `CustomStringConvertible`, `Equatable`, `Escapable`, `Hashable`, `Sendable`, `SendableMetatype` (each conditional on `Bound`).

## Related

- [DiscontiguousSlice](./discontiguousslice.md)
- [Range](./range.md)
- [Array](./array.md)
