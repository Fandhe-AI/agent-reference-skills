# Iterable

A type that provides sequential, borrowing access to its elements.

## Signature / Usage

```swift
protocol Iterable<Element, Failure> : ~Copyable, ~Escapable
```

Adapted (not in the official docs): minimal usage composed from the declarations on the `Iterable` and `BorrowingIteratorProtocol` pages (compiled with Swift 6.4.2 against the macOS 27.2 SDK).

```swift
@available(macOS 27.0, *)
func countElements(_ items: borrowing UniqueArray<Int>) -> Int {
    var it = items.makeBorrowingIterator()
    var total = 0
    while true {
        let span = it.nextSpan(maxCount: .max)
        if span.isEmpty { break }
        total += span.count
    }
    return total
}
```

## Options / Props

| Member | Signature | Description |
|--------|-----------|-------------|
| `BorrowingIterator` | `associatedtype BorrowingIterator : BorrowingIteratorProtocol, ~Copyable, ~Escapable` | A type that provides the sequence's iteration interface and encapsulates its iteration state. |
| `Element` | `associatedtype Element : ~Copyable where Self.Element == Self.BorrowingIterator.Element` | A type representing the sequence's elements. |
| `Failure` | `associatedtype Failure = Never where Self.Failure == Self.BorrowingIterator.Failure` | The error type thrown while iterating; `Never` by default. |
| `underestimatedCount` | `var underestimatedCount: Int { get }` | A value less than or equal to the number of elements in the sequence, calculated nondestructively. |
| `makeBorrowingIterator()` | `func makeBorrowingIterator() -> Self.BorrowingIterator` | Returns a borrowing iterator over the elements of this sequence. |

## Notes

- Available on iOS 27.0+, iPadOS 27.0+, Mac Catalyst 27.0+, macOS 27.0+, tvOS 27.0+, visionOS 27.0+, watchOS 27.0+.
- Conforming types listed by Apple: `InlineArray`, `MutableRawSpan`, `MutableSpan`, `OutputRawSpan`, `OutputSpan`, `RawSpan`, `Span`, `UniqueArray`.
- The `Iterable` page has no overview text beyond the abstract. The `Sequence` page lists `makeBorrowingIterator()` as an iOS 27.0 member (declared `func makeBorrowingIterator() -> BorrowingIteratorAdapter<Self.Iterator>`).
- Apple's iteration entry point on this protocol is the borrowing iterator; see `BorrowingIteratorProtocol` for `nextSpan()` and `skip(by:)`.
- Source: https://developer.apple.com/documentation/swift/iterable (fetched 2026-11-14)
- Source: https://developer.apple.com/documentation/swift/sequence/makeborrowingiterator() (fetched 2026-11-14)

## Related

- [BorrowingIteratorProtocol](./borrowingiteratorprotocol.md)
- [Sequence](./sequence.md)
- [IteratorProtocol](./iteratorprotocol.md)
- [Span](../standard-library/span.md)
- [UniqueArray](../standard-library/uniquearray.md)
