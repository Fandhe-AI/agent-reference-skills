# AnyPublisher

A type-erasing publisher that wraps another publisher, hiding its concrete type. Use to expose publishers across API boundaries without revealing implementation details.

## Signature / Usage

```swift
@frozen struct AnyPublisher<Output, Failure> where Failure : Error
```

```swift
// Wrap a subject to prevent callers from using send(_:)
class Store {
    private let _updates = PassthroughSubject<String, Never>()
    var updates: AnyPublisher<String, Never> {
        _updates.eraseToAnyPublisher()
    }
}
```

## Options / Props

| Member | Signature | Description |
|--------|-----------|-------------|
| `init(_:)` | `init<P>(_ publisher: P)` | Creates a type-erasing wrapper around any publisher |

## Notes

- iOS 13.0+, macOS 10.15+, tvOS 13.0+, watchOS 6.0+, visionOS 1.0+
- Prefer `eraseToAnyPublisher()` operator over calling `init` directly
- Allows changing the underlying publisher implementation without breaking API clients
- Conforms to: `Publisher`, `CustomPlaygroundDisplayConvertible`, `CustomStringConvertible`

## Related

- [eraseToAnyPublisher](./erasetoanypublisher.md)
- [Publisher](./publisher.md)
- [Subject](./subject.md)
