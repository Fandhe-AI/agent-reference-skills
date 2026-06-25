# AsyncSequence

A type that provides asynchronous, sequential, iterated access to its elements.

## Signature

```swift
protocol AsyncSequence<Element, Failure> {
    associatedtype Element
    associatedtype Failure = any Error
    associatedtype AsyncIterator : AsyncIteratorProtocol

    func makeAsyncIterator() -> AsyncIterator
}
```

## Notes

- **Availability:** iOS 13.0+, macOS 10.15+, tvOS 13.0+, watchOS 6.0+, visionOS 1.0+
- Iterate with `for await element in sequence { }` (or `for try await` if `Failure != Never`).
- All higher-order operations (`map`, `filter`, `reduce`, etc.) are provided as default implementations.
- Breaking out of a `for await` loop cancels the underlying iteration.

### Higher-order operations (selected)

| Method | Returns |
|---|---|
| `map(_:)` | `AsyncMapSequence` |
| `compactMap(_:)` | `AsyncCompactMapSequence` |
| `flatMap(_:)` | `AsyncFlatMapSequence` |
| `filter(_:)` | `AsyncFilterSequence` |
| `prefix(_:)` | `AsyncPrefixSequence` |
| `drop(while:)` | `AsyncDropWhileSequence` |
| `reduce(_:_:)` | Single accumulated value |
| `contains(_:)` | `Bool` |
| `first(where:)` | `Element?` |

## Usage

```swift
// Conforming a custom type
struct Counter: AsyncSequence {
    typealias Element = Int
    let max: Int

    struct AsyncIterator: AsyncIteratorProtocol {
        var current = 1
        let max: Int
        mutating func next() async -> Int? {
            guard current <= max else { return nil }
            defer { current += 1 }
            return current
        }
    }

    func makeAsyncIterator() -> AsyncIterator { AsyncIterator(max: max) }
}

for await n in Counter(max: 5) {
    print(n)  // 1 2 3 4 5
}
```

## Related

- [AsyncStream](./asyncstream.md)
- [AsyncThrowingStream](./asyncthrowingstream.md)
- [TaskGroup](./taskgroup.md)
