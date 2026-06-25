# receive(on:options:)

Specifies the scheduler on which downstream subscribers receive elements from the publisher. Commonly used to switch delivery to the main thread for UI updates.

## Signature / Usage

```swift
func receive<S>(
    on scheduler: S,
    options: S.SchedulerOptions? = nil
) -> Publishers.ReceiveOn<Self, S> where S : Scheduler
```

```swift
let cancellable = URLSession.shared.dataTaskPublisher(for: url)
    .map(\.data)
    .receive(on: DispatchQueue.main)
    .sink(
        receiveCompletion: { _ in },
        receiveValue: { data in self.updateUI(with: data) }
    )
```

## Options / Props

| Parameter | Type | Description |
|-----------|------|-------------|
| `scheduler` | `S: Scheduler` | The scheduler on which to deliver elements to subscribers |
| `options` | `S.SchedulerOptions?` | Optional scheduler-specific options |

## Notes

- iOS 13.0+, macOS 10.15+, tvOS 13.0+, watchOS 6.0+, visionOS 1.0+
- Affects **downstream** messages (element and completion delivery) only
- Does **not** affect the scheduler used to call `receive(subscription:)`
- Pair with `subscribe(on:)` to control both upstream and downstream schedulers:
  ```swift
  publisher
      .subscribe(on: DispatchQueue.global())   // upstream work on background
      .receive(on: DispatchQueue.main)          // delivery on main thread
  ```

## Related

- [Timing Operators](./operators-timing.md)
- [Publisher](./publisher.md)
