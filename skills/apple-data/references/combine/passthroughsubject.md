# PassthroughSubject

A `Subject` that broadcasts elements to downstream subscribers without storing any value. Values are dropped if there are no subscribers or current demand is zero.

## Signature / Usage

```swift
final class PassthroughSubject<Output, Failure> where Failure : Error
```

```swift
let subject = PassthroughSubject<Int, Never>()
let cancellable = subject
    .sink { print("Received: \($0)") }

subject.send(1)
subject.send(2)
subject.send(completion: .finished)
```

## Notes

- iOS 13.0+, macOS 10.15+, tvOS 13.0+, watchOS 6.0+, visionOS 1.0+
- Unlike `CurrentValueSubject`, has no initial value and does not replay the last value to new subscribers
- Values sent before subscription or when demand is zero are lost
- Common use case: bridging delegate callbacks or NotificationCenter events into Combine

## Related

- [Subject](./subject.md)
- [CurrentValueSubject](./currentvaluesubject.md)
- [AnyCancellable](./anycancellable.md)
