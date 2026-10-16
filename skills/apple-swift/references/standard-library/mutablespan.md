# MutableSpan

`MutableSpan<Element>` represents a contiguous region of memory which contains initialized instances of `Element`, and allows mutation of those elements.

## Signature

```swift
@frozen struct MutableSpan<Element> where Element : ~Copyable
```

## Usage

A `MutableSpan` obtained from `mutableSpan` represents a mutation of the instance that provided it; the source cannot be accessed while the span exists (from SE-0467).

```swift
var array = [1, 2, 3, 4, 5]
var span1 = array.mutableSpan
var span2 = span1.extracting(3..<5)
// neither array nor span1 can be accessed here
span2.swapAt(0, 1)
_ = consume span2 // explicitly end scope for `span2`
span1.swapAt(0, 1)
_ = consume span1 // explicitly end scope for `span1`
print(array) // [2, 1, 3, 5, 4]
```

## Key APIs

| Name | Description |
|------|-------------|
| `count` | The number of elements in the span |
| `isEmpty` | A Boolean value indicating whether the span is empty |
| `indices` | The range of valid indices for subscripting the span |
| `Index` | The type that represents an index in a `MutableSpan` |
| `subscript(_:)` | Accesses the element at the specified index |
| `subscript(unchecked:)` | Accesses the element without bounds checking |
| `span` | Borrow the underlying initialized memory for read-only access (`Span<Element>`) |
| `bytes` | A raw span over the memory represented by this span (`RawSpan`) |
| `mutableBytes` | A mutable raw span over the memory (`MutableRawSpan`) |
| `init()` | Create an empty span |
| `init(mutating:)` | Mutate untyped memory as a typed span (from `inout MutableRawSpan`) |
| `init(mutableBytes:)` | Convert a raw span to a typed span (from `consuming MutableRawSpan`) |
| `swapAt(_:_:)` / `swapAt(unchecked:unchecked:)` | Exchange the elements at the two given indices |
| `update(repeating:)` | Update every element of this span to the given value |
| `extracting(...)` | Sub-span methods (range, first, last, droppingFirst, droppingLast, unchecked) |
| `withUnsafeBufferPointer(_:)` | Call a closure with a pointer to the viewed contiguous storage |
| `withUnsafeMutableBufferPointer(_:)` | Call a closure with a pointer to the viewed mutable contiguous storage |
| `withUnsafeBytes(_:)` | Calls a closure with a pointer to the underlying bytes (`Element: BitwiseCopyable`) |
| `withUnsafeMutableBytes(_:)` | Calls a closure with a mutable pointer to the underlying bytes (`Element: BitwiseCopyable`) |

## Notes

- Availability on the documentation page: iOS 12.2+, iPadOS 12.2+, Mac Catalyst 12.2+, macOS 10.14.4+, tvOS 12.2+, visionOS 1.0+, watchOS 5.2+ (back-deployment). The `mutableSpan` property on `Array` is documented as iOS 26.0+; check the vending type's own availability.
- The documentation page marks every `extracting(...)` overload as deprecated. The SE-0467 proposal text shows `extracting` as the sub-span API, so confirm the replacement in the current SDK before relying on it.
- `mutableSpan` is the safe, composable replacement for `withUnsafeMutableBufferPointer`. For copy-on-write types, obtaining a `MutableSpan` starts the mutation and may copy the backing buffer if it is not uniquely referenced.
- `init(mutating:)` and `init(mutableBytes:)` are available when `Element` conforms to `ConvertibleFromBytes` and `ConvertibleToBytes`; `mutableBytes` has overloads for `BitwiseCopyable` and for `ConvertibleFromBytes` + `ConvertibleToBytes`.
- Conforms to `ContiguousBytes`, `Iterable` (when `Element` conforms to `Escapable`), `Sendable`, `SendableMetatype`. Does not conform to `Collection`.

## Related

- [Span](./span.md)
- [RawSpan](./rawspan.md)
- [MutableRawSpan](./mutablerawspan.md)
- [OutputSpan](./outputspan.md)
- [Array](./array.md)
