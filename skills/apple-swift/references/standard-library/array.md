# Array

An ordered, random-access collection that stores elements of a single type.

## Signature

```swift
@frozen struct Array<Element>
```

## Usage

```swift
let oddNumbers = [1, 3, 5, 7, 9]
var fruits = ["Apple", "Banana"]
fruits.append("Cherry")
fruits.sort()
print(fruits.first ?? "empty")
```

## Key APIs

| Name | Description |
|------|-------------|
| `init()` | Creates an empty array |
| `init(repeating:count:)` | Creates an array with a repeated value |
| `init(_:)` | Creates from any `Sequence` |
| `isEmpty` | `true` when there are no elements |
| `count` | Number of elements |
| `capacity` | Allocated storage size |
| `first` / `last` | First or last element (optional) |
| `subscript(_:)` | Access element or range by index |
| `randomElement()` | Return a random element (optional) |
| `append(_:)` | Add an element at the end |
| `append(contentsOf:)` | Add a sequence of elements at the end |
| `insert(_:at:)` | Insert at a specific index |
| `remove(at:)` | Remove and return the element at an index |
| `removeFirst()` / `removeLast()` | Remove and return endpoint elements |
| `popLast()` | Remove and return last element, or `nil` if empty |
| `removeAll(keepingCapacity:)` | Clear the array |
| `reserveCapacity(_:)` | Pre-allocate storage |
| `contains(_:)` | `true` if the collection contains the element |
| `firstIndex(of:)` / `lastIndex(of:)` | Index of an element |
| `first(where:)` / `last(where:)` | First or last element matching a predicate |
| `min()` / `max()` | Minimum or maximum element |
| `allSatisfy(_:)` | `true` if all elements satisfy a predicate |
| `map(_:)` | Transform each element |
| `compactMap(_:)` | Transform, discarding `nil` results |
| `flatMap(_:)` | Transform and flatten |
| `filter(_:)` | Keep elements satisfying a predicate |
| `reduce(_:_:)` | Combine elements into a single value |
| `sort()` / `sorted()` | Sort in place or return sorted copy |
| `reverse()` / `reversed()` | Reverse in place or return reversed view |
| `shuffle()` / `shuffled()` | Randomize order in place or return shuffled copy |
| `partition(by:)` | Reorder so elements not satisfying the predicate come first |
| `enumerated()` | Pair each element with its index |
| `zip(_:_:)` | Create pairs from two sequences |

## Notes

- Available on iOS 8.0+, macOS 10.10+, tvOS 9.0+, watchOS 2.0+, visionOS 1.0+.
- Conforms to `RandomAccessCollection`, `RangeReplaceableCollection`, `MutableCollection`, `Hashable` (when `Element: Hashable`), `Codable` (when `Element: Codable`), `Sendable`.
- Uses copy-on-write semantics — copies share storage until mutation.
- Bridges to `NSArray` when `Element` is a class or `@objc` protocol. For guaranteed contiguous storage with class elements, use `ContiguousArray`.

## Related

- [ContiguousArray](./contiguous-array.md)
- [Dictionary](./dictionary.md)
- [Set](./set.md)
- [Range](./range.md)
