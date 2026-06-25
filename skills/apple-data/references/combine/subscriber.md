# Subscriber

A protocol that declares a type that can receive input from a publisher. Subscribers control the flow of elements via backpressure through `Subscribers.Demand`.

## Signature / Usage

```swift
protocol Subscriber<Input, Failure> : CustomCombineIdentifierConvertible
```

```swift
// Typically used via sink or assign rather than implementing directly
let cancellable = publisher
    .sink(
        receiveCompletion: { completion in print("Done: \(completion)") },
        receiveValue: { value in print("Received: \(value)") }
    )
```

## Options / Props

| Method | Signature | Description |
|--------|-----------|-------------|
| `receive(subscription:)` | `func receive(subscription: any Subscription)` | Called when subscription is established |
| `receive(_:)` | `func receive(_ input: Self.Input) -> Subscribers.Demand` | Called for each element; returns demand for more |
| `receive(completion:)` | `func receive(completion: Subscribers.Completion<Self.Failure>)` | Called on normal or error completion |

## Notes

- iOS 13.0+, macOS 10.15+, tvOS 13.0+, watchOS 6.0+, visionOS 1.0+
- Conforming types: `AnySubscriber`, `Subscribers.Assign`, `Subscribers.Sink`
- Prefer `sink` or `assign` over implementing `Subscriber` directly

## Related

- [Publisher](./publisher.md)
- [Subscription](./subscription.md)
- [sink](./sink.md)
- [assign](./assign.md)
