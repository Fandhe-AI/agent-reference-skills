# Span

`Span<Element>` represents a contiguous region of memory which contains initialized instances of `Element`.

## Signature

```swift
@frozen struct Span<Element> where Element : ~Copyable
```

## Usage

`Span` does not conform to `Collection` or `Sequence`, so it is not directly supported by `for` loops. Iterate through its indices instead (from SE-0447).

```swift
for i in mySpan.indices {
  calculation(mySpan[i])
}
```

## Key APIs

| Name | Description |
|------|-------------|
| `count` | The number of elements in the span |
| `isEmpty` | A Boolean value indicating whether the span is empty |
| `indices` | The indices that are valid for subscripting the span, in ascending order |
| `Index` | Type alias for the index representation (`Int`) |
| `subscript(_:)` | Accesses the element at the specified index (bounds-checked) |
| `subscript(unchecked:)` | Accesses the element without bounds checking |
| `bytes` | A raw span (`RawSpan`) over the memory represented by this span |
| `init()` | Create an empty span |
| `init(viewing:)` | View initialized raw memory as a typed span (`RawSpan` argument) |
| `extracting(_:)` | New span over a range / range expression / all items |
| `extracting(first:)` / `extracting(last:)` | Initial or trailing elements, up to the given maximum length |
| `extracting(droppingFirst:)` / `extracting(droppingLast:)` | All but the given number of initial or trailing elements |
| `extracting(unchecked:)` | Unchecked variants of range extraction |
| `indices(of:)` | Indices within this span where another span's memory is located, or `nil` |
| `isIdentical(to:)` | Whether two instances refer to the same memory region |
| `isTriviallyIdentical(to:)` | Whether two instances refer to the same memory region |
| `withUnsafeBufferPointer(_:)` | Calls a closure with a pointer to the viewed contiguous storage |
| `withUnsafeBytes(_:)` | Calls a closure with a pointer to the underlying bytes (`Element: BitwiseCopyable`) |

## Notes

- A `Span` is a non-owning, non-escaping view into memory. When created, it inherits the lifetime of the container owning the contiguous memory (temporal safety); operations are bounds-checked (spatial safety).
- Availability on the documentation page: iOS 12.2+, iPadOS 12.2+, Mac Catalyst 12.2+, macOS 10.14.4+, tvOS 12.2+, visionOS 1.0+, watchOS 5.2+. These versions reflect back-deployment; the `span` property on `Array` itself is documented as iOS 26.0+ (and equivalent OS 26 releases), so check each vending type's availability.
- Conforms to `BitwiseCopyable`, `ContiguousBytes`, `Iterable` (when `Element` conforms to `Escapable`), `Sendable` and `SendableMetatype` (when `Element` conforms to `Escapable` and `Sendable`).
- Introduced by SE-0447 (status: Implemented, Swift 6.2). It is intended as the currency type for local processing over contiguous memory, replacing many uses of `Array`, `UnsafeBufferPointer` and `Data` that do not need to escape the owning container.
- Safe Memory Access family: `RawSpan`, `MutableSpan`, `MutableRawSpan`, `OutputSpan`, `OutputRawSpan`, `UTF8Span`.

## Related

- [MutableSpan](./mutablespan.md)
- [RawSpan](./rawspan.md)
- [OutputSpan](./outputspan.md)
- [UTF8Span](./utf8span.md)
- [Array](./array.md)
- [ContiguousArray](./contiguous-array.md)
