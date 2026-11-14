# BorrowingIteratorProtocol

A type that provides borrowed access to the values of a borrowing sequence.

## Signature / Usage

```swift
protocol BorrowingIteratorProtocol<Element, Failure> : ~Copyable, ~Escapable
```

Process the items of a container in bulk by iterating over its piecewise contiguous pieces of storage (verbatim from the `nextSpan(maxCount:)` page):

```swift
var it = items.makeBorrowingIterator()
while true {
  let span = it.nextSpan(maxCount: .max)
  if span.isEmpty { break }
  // Process items in `span`
}
```

## Options / Props

| Member | Signature | Description |
|--------|-----------|-------------|
| `Element` | `associatedtype Element : ~Copyable` | The element type. |
| `Failure` | `associatedtype Failure : Error = Never` | The error type thrown by the iterator; `Never` by default. |
| `nextSpan()` | `@export(implementation) mutating func nextSpan() throws(Self.Failure) -> Span<Self.Element>` | Returns a span over the next group of elements that are ready to be visited. |
| `nextSpan(maxCount:)` | `mutating func nextSpan(maxCount: Int) throws(Self.Failure) -> Span<Self.Element>` | Returns a span over the next group of elements that are ready to be visited, up to the specified maximum. |
| `skip(by:)` | `mutating func skip(by maxOffset: Int) throws(Self.Failure) -> Int` | Advances the position of this iterator by the specified offset, or until the end of the underlying type's elements. Returns the number of items skipped. |

## Notes

- Available on iOS 27.0+, iPadOS 27.0+, Mac Catalyst 27.0+, macOS 27.0+, tvOS 27.0+, visionOS 27.0+, watchOS 27.0+.
- Conforming types listed by Apple: `BorrowingIteratorAdapter` (wraps an `IteratorProtocol`, returned by `Sequence.makeBorrowingIterator()`) and `Span.BorrowingIterator`.
- `nextSpan(maxCount:)`: if the underlying type stores its elements in contiguous blocks, the returned span typically addresses one of those buffers; if elements are materialized on demand, it addresses a temporary buffer managed by the iterator. The span cannot survive beyond the next `nextSpan` call.
- At the end of the container `nextSpan(maxCount:)` returns an empty span without updating the position. Returned spans are not guaranteed to be disjoint.
- `skip(by:)`: if the returned count is less than `maxOffset`, the iterator's position is set to the end of the underlying type.
- Source: https://developer.apple.com/documentation/swift/borrowingiteratorprotocol (fetched 2026-11-14)
- Source: https://developer.apple.com/documentation/swift/borrowingiteratorprotocol/nextspan(maxcount:) (fetched 2026-11-14)
- Source: https://developer.apple.com/documentation/swift/borrowingiteratorprotocol/skip(by:) (fetched 2026-11-14)

## Related

- [Iterable](./iterable.md)
- [IteratorProtocol](./iteratorprotocol.md)
- [Span](../standard-library/span.md)
