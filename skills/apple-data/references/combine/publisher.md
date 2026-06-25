# Publisher

A protocol that declares a type that can transmit a sequence of values over time. Publishers deliver elements to one or more `Subscriber` instances through a defined `Output` type and `Failure` error type.

## Signature / Usage

```swift
protocol Publisher<Output, Failure>
```

```swift
let cancellable = [1, 2, 3, 4, 5].publisher
    .filter { $0 % 2 == 0 }
    .map { $0 * 10 }
    .sink { print($0) }
// Prints: 20, 40
```

## Notes

- iOS 13.0+, macOS 10.15+, tvOS 13.0+, watchOS 6.0+, visionOS 1.0+
- Implement `receive(subscriber:)` when creating a custom publisher
- Operators return new publisher types (e.g., `Publishers.Map`, `Publishers.Filter`) — use `eraseToAnyPublisher()` to hide concrete types
- The subscriber's `Input` and `Failure` types must match the publisher's `Output` and `Failure`

## Related

- [Subscriber](./subscriber.md)
- [AnyPublisher](./anypublisher.md)
- [eraseToAnyPublisher](./erasetoanypublisher.md)
- [sink](./sink.md)
- [assign](./assign.md)
