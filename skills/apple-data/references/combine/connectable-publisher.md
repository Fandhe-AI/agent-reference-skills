# ConnectablePublisher

A publisher that provides an explicit means of connecting and canceling publication. Includes the related `makeConnectable()`, `multicast`, and `share()` operators.

## Signature / Usage

```swift
protocol ConnectablePublisher<Output, Failure> : Publisher
```

```swift
let cancellable = Timer.publish(every: 1, on: .main, in: .default)
    .autoconnect()
    .sink() { date in
        print ("Date now: \(date)")
     }
```

- Use a `ConnectablePublisher` when you need to perform additional configuration or setup prior to producing any elements.
- The publisher doesn't produce any elements until you call its `connect()` method.
- Conforming types include `Publishers.MakeConnectable` and `Publishers.Multicast`.

### connect()

Connects to the publisher, allowing it to produce elements, and returns an instance with which to cancel publishing. The returned `Cancellable` instance is used to cancel publishing, and must be retained.

```swift
func connect() -> any Cancellable
```

### autoconnect()

Automates the process of connecting or disconnecting from this connectable publisher. Returns a publisher which automatically connects to its upstream connectable publisher.

```swift
func autoconnect() -> Publishers.Autoconnect<Self>
```

### makeConnectable()

Creates a connectable wrapper around the publisher. Available when `Failure` is `Never`. Returns a `ConnectablePublisher` wrapping this publisher.

```swift
func makeConnectable() -> Publishers.MakeConnectable<Self>
```

### multicast(_:) / multicast(subject:)

Use a multicast publisher when you have multiple downstream subscribers, but you want upstream publishers to only process one `receive(_:)` call per event. This is useful when upstream publishers are doing expensive work you don't want to duplicate, like performing network requests.

```swift
func multicast<S>(_ createSubject: @escaping () -> S) -> Publishers.Multicast<Self, S>
    where S : Subject, Self.Failure == S.Failure, Self.Output == S.Output

func multicast<S>(subject: S) -> Publishers.Multicast<Self, S>
    where S : Subject, Self.Failure == S.Failure, Self.Output == S.Output
```

- `multicast(_:)`: applies a closure to create a subject that delivers elements to subscribers; the closure creates a new `Subject` each time a subscriber attaches to the multicast publisher.
- `multicast(subject:)`: provides a subject (to deliver elements to downstream subscribers) that is shared among all the downstream subscribers, in contrast with `multicast(_:)`.

```swift
let pub = ["First", "Second", "Third"].publisher
    .map( { return ($0, Int.random(in: 0...100)) } )
    .print("Random")
    .multicast(subject: PassthroughSubject<(String, Int), Never>())

cancellable1 = pub
    .sink { print ("Stream 1 received: \($0)")}
cancellable2 = pub
    .sink { print ("Stream 2 received: \($0)")}
pub.connect()
```

- Because the multicast publisher is a `ConnectablePublisher`, publishing only begins after a call to `connect()`. The `print` operator receives each random value only one time, and then sends the value to both subscribers.

### share()

Shares the output of an upstream publisher with multiple subscribers. Returns a class instance (`Publishers.Share`) that shares elements received from its upstream to multiple subscribers; all subscribers receive unchanged elements and completion states from the upstream publisher.

```swift
func share() -> Publishers.Share<Self>
```

```swift
let pub = (1...3).publisher
    .delay(for: 1, scheduler: DispatchQueue.main)
    .map( { _ in return Int.random(in: 0...100) } )
    .print("Random")
    .share()

cancellable1 = pub
    .sink { print ("Stream 1 received: \($0)")}
cancellable2 = pub
    .sink { print ("Stream 2 received: \($0)")}
```

- `Publishers.Share` is effectively a combination of `Publishers.Multicast` and `PassthroughSubject`, with an implicit `autoconnect()`.
- The example uses `delay(for:scheduler:)` only to prevent the first subscriber from exhausting the sequence publisher immediately; an asynchronous publisher wouldn't need this. Without `share()`, stream 1 receives three random values, followed by stream 2 receiving three different random values.
- `Publishers.Share` is a class rather than a structure like most other publishers, so it gives reference semantics.

## Notes

- `ConnectablePublisher`, `connect()`, `autoconnect()`, `makeConnectable()`, `multicast`, `share()`: iOS 13.0+, iPadOS 13.0+, Mac Catalyst 13.0+, macOS 10.15+, tvOS 13.0+, visionOS 1.0+, watchOS 6.0+
- Use `makeConnectable()` to create a `ConnectablePublisher` from any publisher whose failure type is `Never`.
- Related articles in the official docs: "Controlling Publishing with Connectable Publishers", "Replacing Foundation Timers with Timer Publishers".

## Related

- [Publisher](./publisher.md)
- [Subject](./subject.md)
- [PassthroughSubject](./passthroughsubject.md)
- [Cancellable](./cancellable.md)
- [AnyCancellable](./anycancellable.md)
