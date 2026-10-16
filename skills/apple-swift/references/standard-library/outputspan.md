# OutputSpan

`OutputSpan` is a reference to a contiguous region of memory that starts with some number of initialized `Element` instances followed by uninitialized memory. It provides operations to access the items it stores, as well as to add new elements and to remove existing ones.

## Signature

```swift
@frozen struct OutputSpan<Element> where Element : ~Copyable
```

## Usage

`OutputSpan` delegates initialization of container storage to a closure. Initializer declared by SE-0485 for `Array`:

```swift
extension Array {
  public init<E: Error>(
    capacity: Int,
    initializingWith initializer: (inout OutputSpan<Element>) throws(E) -> Void
  ) throws(E)

  public mutating func append<E: Error>(
    addingCapacity: Int,
    initializingWith initializer: (inout OutputSpan<Element>) throws(E) -> Void
  ) throws(E)
}
```

## Options / Props

| Name | Description |
|------|-------------|
| `capacity` | The total number of elements that this output span can contain |
| `count` | The number of initialized elements in this span |
| `freeCapacity` | The number of additional elements that can be added |
| `isEmpty` / `isFull` | Whether the span is empty / full |
| `indices` | The range of initialized indices |
| `subscript(_:)` / `subscript(unchecked:)` | Accesses the element at the specified index |
| `span` | Borrow the initialized memory for read-only access (`Span<Element>`) |
| `mutableSpan` | Exclusively borrow the initialized memory for mutation (`MutableSpan<Element>`) |
| `append(_:)` | Append a single element (`consuming`) |
| `append(repeating:count:)` | Repeatedly append an element |
| `removeLast()` / `removeLast(_:)` | Remove the last element / the last n elements |
| `removeAll()` | Remove all elements, returning memory to the uninitialized state |
| `swapAt(_:_:)` / `swapAt(unchecked:unchecked:)` | Exchange the elements at the two given indices |
| `init()` | Create an `OutputSpan` with zero capacity |
| `init(buffer:initializedCount:)` | Unsafely create an `OutputSpan` over partly-initialized memory |
| `finalize(for:)` | Consume the output span and return the number of initialized elements |
| `withUnsafeMutableBufferPointer(_:)` | Call a closure with the unsafe buffer pointer and a mutable reference to the initialized count |

## Notes

- Availability on the documentation page: iOS 12.2+, iPadOS 12.2+, Mac Catalyst 12.2+, macOS 10.14.4+, tvOS 12.2+, visionOS 1.0+, watchOS 5.2+ (back-deployment). Standard library initializers that take an `OutputSpan` may carry later availability.
- Introduced by SE-0485 (status: Implemented, Swift 6.2; the "Extensions to standard library types" such as `Array.init(capacity:initializingWith:)` were listed as pending in the proposal text).
- `OutputRawSpan` is the untyped counterpart: a reference to a contiguous region of memory which starts with some number of initialized bytes, followed by uninitialized memory, with operations to access, append and remove bytes. It is not given its own page here.
- Conforms to `ContiguousBytes`, `Iterable` (when `Element` conforms to `Escapable`), `Sendable`, `SendableMetatype`.
- Source: https://developer.apple.com/documentation/swift/outputspan ; SE-0485, swift-evolution commit f006bf3cf2594bdd4a972f9126f93bd1743ed524

## Related

- [Span](./span.md)
- [MutableSpan](./mutablespan.md)
- [Array](./array.md)
- [ContiguousArray](./contiguous-array.md)
