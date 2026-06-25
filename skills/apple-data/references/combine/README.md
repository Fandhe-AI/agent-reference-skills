# Combine

| Name | Description | Path |
|------|-------------|------|
| Publisher | Protocol for types that transmit a sequence of values over time | [publisher.md](./publisher.md) |
| Subscriber | Protocol for types that receive input from a publisher | [subscriber.md](./subscriber.md) |
| Subscription | Protocol representing the connection between a subscriber and publisher | [subscription.md](./subscription.md) |
| Subject | Publisher protocol with imperative `send(_:)` injection | [subject.md](./subject.md) |
| PassthroughSubject | Subject that broadcasts elements without storing state | [passthroughsubject.md](./passthroughsubject.md) |
| CurrentValueSubject | Subject that stores and replays the latest value to new subscribers | [currentvaluesubject.md](./currentvaluesubject.md) |
| AnyPublisher | Type-erasing wrapper for publishers | [anypublisher.md](./anypublisher.md) |
| AnyCancellable | Type-erasing cancellable; auto-cancels on deinit | [anycancellable.md](./anycancellable.md) |
| Cancellable | Protocol for activities that support cancellation | [cancellable.md](./cancellable.md) |
| @Published | Property wrapper that publishes changes to a class property | [published.md](./published.md) |
| sink | Closure-based subscriber operator | [sink.md](./sink.md) |
| assign(to:on:) | Assigns published values to an object property via key path | [assign.md](./assign.md) |
| Transforming Operators | map, flatMap, compactMap, scan and variants | [operators-transforming.md](./operators-transforming.md) |
| Filtering Operators | filter, removeDuplicates, drop, prefix, first, last | [operators-filtering.md](./operators-filtering.md) |
| Combining Operators | combineLatest, merge, zip | [operators-combining.md](./operators-combining.md) |
| Timing Operators | debounce, throttle, delay, timeout | [operators-timing.md](./operators-timing.md) |
| receive(on:options:) | Delivers elements on the specified scheduler (e.g., main thread) | [receive-on.md](./receive-on.md) |
| eraseToAnyPublisher() | Wraps a publisher as AnyPublisher for type erasure | [erasetoanypublisher.md](./erasetoanypublisher.md) |
