# CurrentValueSubject

A `Subject` that wraps a single value and publishes a new element whenever the value changes. New subscribers immediately receive the current value upon subscription.

## Signature / Usage

```swift
final class CurrentValueSubject<Output, Failure> where Failure : Error
```

```swift
let subject = CurrentValueSubject<Int, Never>(0)
let cancellable = subject
    .sink { print("Value: \($0)") }
// Prints: Value: 0  (immediately on subscribe)

subject.send(1)   // Prints: Value: 1
subject.value = 2 // Prints: Value: 2  (direct property assignment)
```

## Options / Props

| Member | Type | Description |
|--------|------|-------------|
| `init(_:)` | `(Output)` | Creates the subject with the given initial value |
| `value` | `var value: Output` | The current wrapped value; setting it publishes to subscribers |

## Notes

- iOS 13.0+, macOS 10.15+, tvOS 13.0+, watchOS 6.0+, visionOS 1.0+
- Calling `send(_:)` is equivalent to setting `value` directly
- Unlike `PassthroughSubject`, replays the latest value to each new subscriber
- Useful for representing state that subscribers should have immediate access to

## Related

- [Subject](./subject.md)
- [PassthroughSubject](./passthroughsubject.md)
- [Published](./published.md)
