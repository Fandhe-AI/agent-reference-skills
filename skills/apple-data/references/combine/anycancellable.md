# AnyCancellable

A type-erasing cancellable object that automatically calls `cancel()` when deinitialized. Used to manage the lifetime of subscriptions.

## Signature / Usage

```swift
final class AnyCancellable
```

```swift
var cancellables = Set<AnyCancellable>()

publisher
    .sink { print($0) }
    .store(in: &cancellables)
// Subscription lives as long as cancellables holds the instance
```

## Options / Props

| Member | Signature | Description |
|--------|-----------|-------------|
| `init(_:)` | `init(() -> Void)` | Creates a cancellable with a cancel closure |
| `store(in:)` | `func store(in: inout Set<AnyCancellable>)` | Stores the instance in a `Set` for lifetime management |
| `store(in:)` | `func store<C>(in: inout C)` | Stores in any `RangeReplaceableCollection` |

## Notes

- iOS 13.0+, macOS 10.15+, tvOS 13.0+, watchOS 6.0+, visionOS 1.0+
- Automatically cancels on `deinit` — always retain the returned `AnyCancellable` or use `store(in:)`
- Conforms to: `Cancellable`, `Equatable`, `Hashable`

## Related

- [Cancellable](./cancellable.md)
- [sink](./sink.md)
- [assign](./assign.md)
