# withObservationTracking(options:_:onChange:)

Tracks the observable properties read in a closure with explicit control over which events (`willSet`, `didSet`, `deinit`) are delivered, passing an `ObservationTracking.Event` to `onChange`.

## Signature / Usage

```swift
func withObservationTracking<Result, Failure>(
    options: ObservationTracking.Options,
    _ apply: () throws(Failure) -> Result,
    onChange: @escaping @Sendable (borrowing ObservationTracking.Event) -> Void
) throws(Failure) -> Result where Failure : Error, Result : ~Copyable
```

```swift
var myObject: MyObject? = MyObject()

withObservationTracking(options: [.deinit]) {
  if let myObject {
    print(myObject.foo + myObject.bar)
  }
} onChange: { event in
  print("got a deinit event")
}

myObject = nil
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `options` | `ObservationTracking.Options` | Non-exclusive `.willSet`, `.didSet`, `.deinit`. Tracking all three fires a `willSet` and a `didSet` per set, plus one event on deinit. |
| `apply` | `() throws(Failure) -> Result` | Closure whose property reads are tracked; its result is returned. |
| `onChange` | `@escaping @Sendable (borrowing ObservationTracking.Event) -> Void` | Receives the event; use `event.kind`, `event.matches(_:)`, `event.cancel()`. |

## Notes

- The Apple page has no abstract; description and examples come from SE-0506.
- Unlike `withObservationTracking(_:onChange:)`, this overload delivers immediate, non-coalesced events and can observe `didSet` and `deinit`. The non-options form behaves like this one with `.willSet` only.
- `event.matches(_:)` works for `willSet` / `didSet` events, not `deinit`.
- Available: iOS 27.0+, iPadOS 27.0+, Mac Catalyst 27.0+, macOS 27.0+, tvOS 27.0+, visionOS 27.0+, watchOS 27.0+ (SE-0506, Implemented in Swift 6.4)
- Source: https://developer.apple.com/documentation/observation/withobservationtracking(options:_:onchange:) ; swift-evolution commit f006bf3cf2594bdd4a972f9126f93bd1743ed524

## Related

- [withObservationTracking(_:onChange:)](./withobservationtracking.md)
- [ObservationTracking](./observationtracking.md)
- [withContinuousObservation(options:apply:)](./withcontinuousobservation.md)
