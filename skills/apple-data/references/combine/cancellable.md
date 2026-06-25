# Cancellable

A protocol indicating that an activity or action supports cancellation. Calling `cancel()` frees allocated resources and stops side effects such as timers, network access, or disk I/O.

## Signature / Usage

```swift
protocol Cancellable
```

```swift
let cancellable: AnyCancellable = publisher.sink { print($0) }
// Later:
cancellable.cancel()
```

## Options / Props

| Method | Signature | Description |
|--------|-----------|-------------|
| `cancel()` | `func cancel()` | Cancels the activity and frees resources |

## Notes

- iOS 13.0+, macOS 10.15+, tvOS 13.0+, watchOS 6.0+, visionOS 1.0+
- Conforming types: `AnyCancellable`, `Subscribers.Assign`, `Subscribers.Sink`
- `Subscription` inherits from `Cancellable`

## Related

- [AnyCancellable](./anycancellable.md)
- [Subscription](./subscription.md)
