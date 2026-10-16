# ContiguousArray

An array type that always stores its elements in a contiguous region of memory.

## Signature

```swift
@frozen struct ContiguousArray<Element>
```

## Usage

```swift
var handles = ContiguousArray<SomeClass>()
handles.append(SomeClass())
handles.withUnsafeBufferPointer { buffer in
    // direct pointer access guaranteed
}
```

## Options / Props

`ContiguousArray` exposes the same interface as `Array` (append, insert, remove, map, filter, sort, etc.). The following are APIs specific to or particularly relevant for `ContiguousArray`:

| Name | Description |
|------|-------------|
| `capacity` | Total elements the array can hold without reallocating |
| `reserveCapacity(_:)` | Pre-allocate storage |
| `withUnsafeBufferPointer(_:)` | Execute a closure with a pointer to contiguous storage (read-only) |
| `withUnsafeMutableBufferPointer(_:)` | Execute a closure with a mutable pointer to contiguous storage |
| `span` | Read-only span over the elements (iOS 12.2+ per its own page) |
| `mutableSpan` | Mutable span over the elements |
| `init(capacity:initializingWith:)` | Creates an array with the given capacity, then calls the closure with an `inout OutputSpan<Element>` covering the uninitialized memory |
| `append(addingCapacity:initializingWith:)` | Grows the array, then calls the closure with an `inout OutputSpan<Element>` |

## Notes

- Available on iOS 8.0+, macOS 10.10+, tvOS 9.0+, watchOS 2.0+, visionOS 1.0+.
- Conforms to `RandomAccessCollection`, `RangeReplaceableCollection`, `MutableCollection`, `Sendable`.
- Member availability in the table is taken from each member's own Apple page; `ContiguousArray.span` lists iOS 12.2+ there, whereas `Array.span` lists iOS 26.0+ (the source pages differ).
- Unlike `Array`, `ContiguousArray` **never** bridges to `NSArray`, so it always stores elements in contiguous memory regardless of element type.
- For class or `@objc` protocol element types, `ContiguousArray` may offer better and more predictable performance than `Array`.
- For struct or enum element types, `Array` and `ContiguousArray` have equivalent performance.

## Related

- [Array](./array.md)
- [Span](./span.md)
- [MutableSpan](./mutablespan.md)
- [OutputSpan](./outputspan.md)
