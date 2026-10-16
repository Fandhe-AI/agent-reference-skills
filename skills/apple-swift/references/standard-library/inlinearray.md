# InlineArray

A fixed-size array that stores its elements inline, without a separate memory allocation.

## Signature

```swift
@frozen struct InlineArray<let count: Int, Element> where Element : ~Copyable
```

## Usage

When copied, all elements are copied eagerly, like those of a tuple. Initialize all elements with an array literal and read or modify them via subscript.

```swift
let a: InlineArray<3, Int> = [1, 2, 3]
let b: InlineArray<_, Int> = [1, 2, 3]
let c: InlineArray<3, _>   = [1, 2, 3]
let d: InlineArray         = [1, 2, 3]

var values: InlineArray<3, Double> = [1, 1.5, 2]
print(values[0])  // Prints "1.0"
values[1] -= 0.25
print(values[1])  // Prints "1.25"

for index in values.indices {
    print(values[index])
}
```

## Key APIs

| Name | Description |
|------|-------------|
| `init(_:)` | Initializes every element by calling the given closure with each index |
| `init(first:next:)` | Initializes every element by calling the closure with each preceding element |
| `init(initializingWith:)` | Initializes the elements through an `inout OutputSpan<Element>` closure |
| `init(repeating:)` | Initializes every element to a copy of the given value |
| `count` | The number of elements in the array |
| `isEmpty` | Whether the array is empty |
| `indices` | The indices that are valid for subscripting, in ascending order |
| `startIndex` / `endIndex` | First position / "past the end" position |
| `index(after:)` / `index(before:)` | Position immediately after / before the given index |
| `subscript(_:)` | Accesses the element at the specified position (bounds-checked) |
| `subscript(unchecked:)` | Memory-unsafe access without bounds checking |
| `swapAt(_:_:)` | Exchanges the values at the specified indices |
| `span` | A `Span<Element>` over the elements |
| `mutableSpan` | A `MutableSpan<Element>` over the elements |

## Notes

- Available on iOS 26.0+, iPadOS 26.0+, Mac Catalyst 26.0+, macOS 26.0+, tvOS 26.0+, visionOS 26.0+, watchOS 26.0+.
- Out-of-bounds subscripting triggers a runtime error (except `subscript(unchecked:)`).
- `Element` may be noncopyable; then the `InlineArray` itself is also not copyable and ownership must be moved or consumed explicitly.
- Memory layout: elements are stored contiguously. As a stored property of a class it is allocated on the heap with the class; otherwise generally on the stack. A non-empty `InlineArray`'s size and stride are `count` times the `Element` stride, and its alignment equals the `Element` alignment. An empty one has size zero and stride and alignment of one byte.
- Introduced by SE-0453 (status: Implemented, Swift 6.2).
- Conforms to `BitwiseCopyable`, `ContiguousBytes`, `ConvertibleFromBytes`, `ConvertibleToBytes`, `Copyable`, `Escapable`, `Iterable`, `Sendable`, `SendableMetatype` (each conditional on the `Element` conformances).

## Related

- [Array](./array.md)
- [Span](./span.md)
- [MutableSpan](./mutablespan.md)
- [OutputSpan](./outputspan.md)
