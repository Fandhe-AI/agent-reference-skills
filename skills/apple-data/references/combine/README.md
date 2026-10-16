# Combine

| Name | Description | Path |
|------|-------------|------|
| AnyCancellable | A type-erasing cancellable object that automatically calls `cancel()` when deinitialized. Used to manage the lifetime of subscriptions. | [anycancellable.md](./anycancellable.md) |
| AnyPublisher | A type-erasing publisher that wraps another publisher, hiding its concrete type. Use to expose publishers across API boundaries without revealing implementation details. | [anypublisher.md](./anypublisher.md) |
| assign(to:on:) | Assigns each element from a publisher to a property on an object, identified by a key path. | [assign.md](./assign.md) |
| AsyncPublisher / AsyncThrowingPublisher | Publishers that expose their elements as an asynchronous sequence, so callers can receive values with the `for`-`await`-`in` syntax rather than attaching a `Subscriber`. | [async-publisher.md](./async-publisher.md) |
| Cancellable | A protocol indicating that an activity or action supports cancellation. Calling `cancel()` frees allocated resources and stops side effects such as timers, network access, or disk I/O. | [cancellable.md](./cancellable.md) |
| ConnectablePublisher | A publisher that provides an explicit means of connecting and canceling publication. Includes the related `makeConnectable()`, `multicast`, and `share()` operators. | [connectable-publisher.md](./connectable-publisher.md) |
| Convenience Publishers | Publishers for common one-off cases: `Just`, `Deferred`, `Empty`, `Fail`, `Record`. (`Future` has its own page.) | [convenience-publishers.md](./convenience-publishers.md) |
| CurrentValueSubject | A `Subject` that wraps a single value and publishes a new element whenever the value changes. New subscribers immediately receive the current value upon subscription. | [currentvaluesubject.md](./currentvaluesubject.md) |
| eraseToAnyPublisher() | Wraps a publisher in an `AnyPublisher`, hiding its concrete type. Used to expose clean API boundaries without revealing implementation details. | [erasetoanypublisher.md](./erasetoanypublisher.md) |
| Future | A publisher that eventually produces a single value and then finishes or fails. | [future.md](./future.md) |
| ObservableObject / ObservableObjectPublisher | A type of object with a publisher that emits before the object has changed, and the publisher class that publishes those changes. | [observable-object.md](./observable-object.md) |
| Combining Operators | Operators that merge or coordinate multiple publishers: `combineLatest`, `merge`, `zip`. | [operators-combining.md](./operators-combining.md) |
| Filtering Operators | Operators that selectively republish elements from an upstream publisher: `filter`, `removeDuplicates`, `compactMap` (see also Transforming Operators), `first`, `last`, `drop`, `prefix`, and related variants. | [operators-filtering.md](./operators-filtering.md) |
| Timing Operators | Operators that control the timing and rate of element delivery: `debounce`, `throttle`, `delay`, `timeout`. | [operators-timing.md](./operators-timing.md) |
| Transforming Operators | Operators that transform elements from an upstream publisher: `map`, `flatMap`, `compactMap`, `tryMap`, `scan`, and related variants. | [operators-transforming.md](./operators-transforming.md) |
| PassthroughSubject | A `Subject` that broadcasts elements to downstream subscribers without storing any value. Values are dropped if there are no subscribers or current demand is zero. | [passthroughsubject.md](./passthroughsubject.md) |
| @Published | A property wrapper that creates a `Publisher` for a class property, publishing a new element whenever the property's value changes. | [published.md](./published.md) |
| Publisher | A protocol that declares a type that can transmit a sequence of values over time. Publishers deliver elements to one or more `Subscriber` instances through a defined `Output` type and `Failure` error type. | [publisher.md](./publisher.md) |
| receive(on:options:) | Specifies the scheduler on which downstream subscribers receive elements from the publisher. Commonly used to switch delivery to the main thread for UI updates. | [receive-on.md](./receive-on.md) |
| Scheduler / ImmediateScheduler | `Scheduler` is a protocol that defines when and how to execute a closure. `ImmediateScheduler` is a scheduler for performing synchronous actions. | [scheduler.md](./scheduler.md) |
| sink | Attaches a subscriber with closure-based behavior. The most common way to consume values from a publisher. | [sink.md](./sink.md) |
| Subject | A publisher that exposes a method for outside callers to publish elements imperatively via `send(_:)`. Bridges imperative code into the Combine reactive model. | [subject.md](./subject.md) |
| Subscriber | A protocol that declares a type that can receive input from a publisher. Subscribers control the flow of elements via backpressure through `Subscribers.Demand`. | [subscriber.md](./subscriber.md) |
| Subscription | A protocol representing the connection of a subscriber to a publisher. Inherits from `Cancellable`. | [subscription.md](./subscription.md) |
