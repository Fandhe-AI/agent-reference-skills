# Timing Operators

Operators that control the timing and rate of element delivery: `debounce`, `throttle`, `delay`, `timeout`.

## debounce(for:scheduler:options:)

Publishes an element only after a specified time interval elapses with no new elements from the upstream publisher.

```swift
func debounce<S>(
    for dueTime: S.SchedulerTimeType.Stride,
    scheduler: S,
    options: S.SchedulerOptions? = nil
) -> Publishers.Debounce<Self, S> where S : Scheduler
```

```swift
let subject = PassthroughSubject<String, Never>()
let cancellable = subject
    .debounce(for: .milliseconds(500), scheduler: RunLoop.main)
    .sink { print("Debounced: \($0)") }

// Rapid sends — only the last value after a 500ms pause is emitted
subject.send("H")
subject.send("He")
subject.send("Hello")
// After 500ms of silence, prints: "Debounced: Hello"
```

- Discards earlier elements when new ones arrive before the interval expires.
- Common use case: search-as-you-type field input.

## throttle(for:scheduler:latest:)

Publishes either the first or most-recent element within each time interval, regardless of how many elements arrive.

```swift
func throttle<S>(
    for interval: S.SchedulerTimeType.Stride,
    scheduler: S,
    latest: Bool
) -> Publishers.Throttle<Self, S> where S : Scheduler
```

```swift
let cancellable = subject
    .throttle(for: .seconds(1), scheduler: RunLoop.main, latest: true)
    .sink { print("Throttled: \($0)") }
```

- `latest: true` emits the most-recent element in each interval window.
- `latest: false` emits the first element in each interval window.
- Unlike `debounce`, emits on a fixed schedule regardless of pauses.

## delay(for:scheduler:options:)

Delays delivery of all elements by a fixed time interval.

```swift
func delay<S>(
    for interval: S.SchedulerTimeType.Stride,
    tolerance: S.SchedulerTimeType.Stride? = nil,
    scheduler: S,
    options: S.SchedulerOptions? = nil
) -> Publishers.Delay<Self, S> where S : Scheduler
```

## timeout(_:scheduler:options:customError:)

Terminates publishing if no element is received within the specified time interval.

```swift
func timeout<S>(
    _ interval: S.SchedulerTimeType.Stride,
    scheduler: S,
    options: S.SchedulerOptions? = nil,
    customError: (() -> Self.Failure)? = nil
) -> Publishers.Timeout<Self, S> where S : Scheduler
```

## Notes

- iOS 13.0+, macOS 10.15+, tvOS 13.0+, watchOS 6.0+, visionOS 1.0+
- All timing operators require a `Scheduler` (e.g., `RunLoop.main`, `DispatchQueue.main`)
- **debounce vs throttle**: debounce waits for a pause; throttle enforces a fixed emission rate

## Related

- [receive(on:options:)](./receive-on.md)
- [Filtering Operators](./operators-filtering.md)
- [Publisher](./publisher.md)
