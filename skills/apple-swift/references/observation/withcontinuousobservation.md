# withContinuousObservation(options:apply:)

Continuously observes the `@Observable` properties read by the closure, re-observing automatically after coalesced events; returns a token that keeps the observation alive.

## Signature / Usage

```swift
func withContinuousObservation(
    options: ObservationTracking.Options,
    apply: @escaping @isolated(any) @Sendable (borrowing ObservationTracking.Event) -> Void
) -> ObservationTracking.Token
```

```swift
@MainActor
final class Controller {
  var view: MyView
  var model: MyObservable
  let synchronization: ObservationTracking.Token

  init(view: MyView, model: MyObservable) {
    synchronization = withContinuousObservationTracking(options: [.willSet]) { [view, model] event in
      view.label.text = model.someStringValue
    }
  }
}
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `options` | `ObservationTracking.Options` | Which events to receive: `.willSet`, `.didSet`, `.deinit` (non-exclusive). |
| `apply` | `@escaping @isolated(any) @Sendable (borrowing ObservationTracking.Event) -> Void` | Closure invoked for events; properties read inside it are tracked. |

## Notes

- The Apple page has no abstract; the explanation and example come from SE-0506 only. The SE-0506 text spells the function `withContinuousObservationTracking`, while the Apple page and this signature use `withContinuousObservation`; use the Apple spelling.
- Returns `ObservationTracking.Token`. Observation continues while the token is held; dropping it or calling `cancel()` stops observation and further callbacks.
- The closure is invoked after the event at the next suspension point of the isolating context: called from `@MainActor`, the closure always runs on the main actor.
- No default for `options` (the proposal rejected a `.willSet` default); pass options explicitly.
- Available: iOS 27.0+, iPadOS 27.0+, Mac Catalyst 27.0+, macOS 27.0+, tvOS 27.0+, visionOS 27.0+, watchOS 27.0+ (SE-0506, Implemented in Swift 6.4)
- Source: https://developer.apple.com/documentation/observation/withcontinuousobservation(options:apply:) ; swift-evolution commit f006bf3cf2594bdd4a972f9126f93bd1743ed524

## Related

- [ObservationTracking](./observationtracking.md)
- [withObservationTracking(options:_:onChange:)](./withobservationtracking-options.md)
- [Observations](./observations.md)
