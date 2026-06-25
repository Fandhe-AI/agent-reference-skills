# Subscription

A protocol representing the connection of a subscriber to a publisher. Inherits from `Cancellable`.

## Signature / Usage

```swift
protocol Subscription : Cancellable, CustomCombineIdentifierConvertible
```

```swift
// Subscription is typically managed automatically via AnyCancellable
var cancellables = Set<AnyCancellable>()
publisher
    .sink { value in print(value) }
    .store(in: &cancellables)
```

## Options / Props

| Method | Signature | Description |
|--------|-----------|-------------|
| `request(_:)` | `func request(Subscribers.Demand)` | Tells the publisher it may send more values |
| `cancel()` | `func cancel()` | Cancels the subscription (inherited from `Cancellable`) |

## Notes

- iOS 13.0+, macOS 10.15+, tvOS 13.0+, watchOS 6.0+, visionOS 1.0+
- Class-constrained: subscriptions have identity tied to the moment a subscriber attached to a publisher
- `cancel()` must be thread-safe and can only be called once
- Canceling frees any resources allocated when the subscriber was attached
- `Subscribers.Demand` controls backpressure: `.unlimited`, `.max(n)`, or `.none`

## Related

- [Subscriber](./subscriber.md)
- [Cancellable](./cancellable.md)
- [AnyCancellable](./anycancellable.md)
