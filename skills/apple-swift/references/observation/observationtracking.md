# ObservationTracking

Namespace for advanced observation tracking: options, events, and tokens used by `withObservationTracking(options:_:onChange:)` and `withContinuousObservation(options:apply:)`.

## Signature / Usage

```swift
struct ObservationTracking
```

```swift
withObservationTracking(options: [.willSet]) {
  print(myObject.foo + myObject.bar)
} onChange: { event in
  if event.matches(\MyObject.foo) {
    print("got a change of foo")
  }
  if event.matches(\MyObject.bar) {
    print("got a change of bar")
  }
}

myObject.bar += 1
```

## Options / Props

Nested types (SE-0506 signatures):

| Member | Signature | Description |
|--------|-----------|-------------|
| `Options` | `struct Options: SetAlgebra, Sendable` with `init()` | Which kinds of events the observer wants. Not an `OptionSet` (internals are private); `SetAlgebra` is used instead. |
| `Options.willSet` | `static var willSet: Options { get }` | Receive events before a property is set. |
| `Options.didSet` | `static var didSet: Options { get }` | Receive events after a property is set. |
| `Options.deinit` | `static var `deinit`: Options { get }` | Receive an event when a tracked observable is deinitialized. |
| `Event` | `struct Event: ~Copyable` | Passed to the `onChange` / `apply` closure. |
| `Event.kind` | `var kind: Kind { get }` | The kind of event. |
| `Event.matches(_:)` | `func matches(_ keyPath: PartialKeyPath<some Observable>) -> Bool` | Whether the event relates to a key path; applies to `willSet` / `didSet` events, never `deinit`. |
| `Event.cancel()` | `func cancel()` | Cancel the observation; no further events fire (a `willSet` cancel suppresses the matching `didSet`). |
| `Event.Kind` | `struct Kind: Equatable, Sendable` | Static values `initial`, `willSet`, `didSet`, `deinit`. |
| `Token` | `struct Token: ~Copyable` with `consuming func cancel()` | Returned by `withContinuousObservation`; hold it to keep observing. |

Event kinds in use:

```swift
_ = withObservationTracking(options: [.willSet, .didSet, .deinit]) {
  observable.property
} onChange: { event in
  switch event.kind {
  case .initial: print("initial event")
  case .willSet: print("property will set")
  case .didSet: print("property did set")
  case .deinit: print("an Observable instance deallocated")
  }
}
```

## Notes

- `ObservationTracking` itself: iOS 17.0+, iPadOS 17.0+, Mac Catalyst 17.0+, macOS 14.0+, tvOS 17.0+, visionOS 1.0+, watchOS 10.0+. Conforms to `Sendable`, `SendableMetatype`.
- Nested `Options`, `Event`, `Event.Kind` and `Token` (and their members) are iOS 27.0+ per the Apple pages; SE-0506 (Implemented in Swift 6.4) promotes `ObservationTracking` from SPI to API.
- At `.willSet` the new value is not yet stored; at `.didSet` it is. On `.deinit`, weak references are `nil` but the object may or may not be fully deinitialized yet.
- Token: dropping it or calling `cancel()` unregisters the continuous observation.
- This is an advanced API aimed at middleware and widget-system infrastructure; most code should use `@Observable` and `Observations`.
- Source: https://developer.apple.com/documentation/observation/observationtracking ; SE-0506, swift-evolution commit f006bf3cf2594bdd4a972f9126f93bd1743ed524

## Related

- [withObservationTracking(options:_:onChange:)](./withobservationtracking-options.md)
- [withContinuousObservation(options:apply:)](./withcontinuousobservation.md)
- [withObservationTracking(_:onChange:)](./withobservationtracking.md)
- [Observations](./observations.md)
