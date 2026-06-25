# Subject

A publisher that exposes a method for outside callers to publish elements imperatively via `send(_:)`. Bridges imperative code into the Combine reactive model.

## Signature / Usage

```swift
protocol Subject<Output, Failure> : AnyObject, Publisher
```

```swift
let subject = PassthroughSubject<String, Never>()
let cancellable = subject.sink { print($0) }
subject.send("Hello")
subject.send(completion: .finished)
```

## Options / Props

| Method | Signature | Description |
|--------|-----------|-------------|
| `send(_:)` | `func send(_ value: Self.Output)` | Sends a value to downstream subscribers |
| `send(completion:)` | `func send(completion: Subscribers.Completion<Self.Failure>)` | Sends a completion signal |
| `send(subscription:)` | `func send(subscription: any Subscription)` | Sends a subscription to the subscriber |

## Notes

- iOS 13.0+, macOS 10.15+, tvOS 13.0+, watchOS 6.0+, visionOS 1.0+
- Conforming types: `PassthroughSubject`, `CurrentValueSubject`
- Use `eraseToAnyPublisher()` when exposing a subject publicly to prevent callers from using `send(_:)`

## Related

- [PassthroughSubject](./passthroughsubject.md)
- [CurrentValueSubject](./currentvaluesubject.md)
- [AnyPublisher](./anypublisher.md)
- [eraseToAnyPublisher](./erasetoanypublisher.md)
