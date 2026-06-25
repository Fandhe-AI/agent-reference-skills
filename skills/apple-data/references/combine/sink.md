# sink

Attaches a subscriber with closure-based behavior. The most common way to consume values from a publisher.

## Signature / Usage

```swift
// With completion handler
func sink(
    receiveCompletion: @escaping (Subscribers.Completion<Self.Failure>) -> Void,
    receiveValue: @escaping (Self.Output) -> Void
) -> AnyCancellable

// Without completion handler (only available when Failure == Never)
func sink(
    receiveValue: @escaping (Self.Output) -> Void
) -> AnyCancellable
```

```swift
let cancellable = (0...3).publisher
    .sink(
        receiveCompletion: { print("completion: \($0)") },
        receiveValue: { print("value: \($0)") }
    )
// Prints:
//  value: 0
//  value: 1
//  value: 2
//  value: 3
//  completion: finished
```

## Options / Props

| Parameter | Type | Description |
|-----------|------|-------------|
| `receiveCompletion` | `(Subscribers.Completion<Failure>) -> Void` | Called on `.finished` or `.failure(error)` |
| `receiveValue` | `(Output) -> Void` | Called for each published element |

## Notes

- iOS 13.0+, macOS 10.15+, tvOS 13.0+, watchOS 6.0+, visionOS 1.0+
- Requests `.unlimited` demand immediately upon subscription
- The returned `AnyCancellable` must be retained; discarding it immediately cancels the subscription
- Use `store(in:)` on the result to manage lifetime with a `Set<AnyCancellable>`

## Related

- [AnyCancellable](./anycancellable.md)
- [assign](./assign.md)
- [Publisher](./publisher.md)
