# eraseToAnyPublisher()

Wraps a publisher in an `AnyPublisher`, hiding its concrete type. Used to expose clean API boundaries without revealing implementation details.

## Signature / Usage

```swift
func eraseToAnyPublisher() -> AnyPublisher<Self.Output, Self.Failure>
```

```swift
class Store {
    private let _changes = PassthroughSubject<String, Never>()

    // Expose as AnyPublisher — callers cannot use send(_:)
    var changes: AnyPublisher<String, Never> {
        _changes.eraseToAnyPublisher()
    }
}
```

## Notes

- iOS 13.0+, macOS 10.15+, tvOS 13.0+, watchOS 6.0+, visionOS 1.0+
- Enables changing the underlying publisher type over time without breaking API clients
- Without type erasure, callers can cast to the concrete type (e.g., `PassthroughSubject`) and call `send(_:)`, breaking encapsulation
- Particularly useful at module boundaries and in public APIs

## Related

- [AnyPublisher](./anypublisher.md)
- [Publisher](./publisher.md)
- [Subject](./subject.md)
