# Sequence

A type that provides sequential, iterated access to its elements.

## Signature

```swift
protocol Sequence<Element>
```

## Usage

```swift
struct Countdown: Sequence, IteratorProtocol {
    var count: Int

    mutating func next() -> Int? {
        guard count > 0 else { return nil }
        defer { count -= 1 }
        return count
    }
}

for n in Countdown(count: 3) { print(n) }
// 3, 2, 1
```

## Notes

- Availability: iOS 8.0+, macOS 10.10+, tvOS 9.0+, watchOS 2.0+, visionOS 1.0+
- Only required method: `makeIterator() -> Iterator`; a type may conform to both `Sequence` and `IteratorProtocol` simultaneously
- Provides default implementations for `map`, `filter`, `reduce`, `contains`, `first(where:)`, `prefix`, `suffix`, `sorted`, `forEach`, `enumerated`, and more
- Sequences are not guaranteed to be traversed more than once (use `Collection` for multi-pass)
- iOS 27.0+: `func makeBorrowingIterator() -> BorrowingIteratorAdapter<Self.Iterator>` adapts the iterator to the borrowing iteration interface of `Iterable`. Source: https://developer.apple.com/documentation/swift/sequence/makeborrowingiterator() (fetched 2026-11-14)

## Related

- [Collection](./collection.md)
- [IteratorProtocol](./iteratorprotocol.md)
- [Iterable](./iterable.md)
- [BorrowingIteratorProtocol](./borrowingiteratorprotocol.md)
