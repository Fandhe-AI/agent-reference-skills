# @ObservationIgnored

Disables observation tracking of a property within an `@Observable` type.

## Signature

```swift
@attached(accessor)
macro ObservationIgnored()
```

## Usage

```swift
@Observable
class AppModel {
    var trackedValue: Int = 0

    @ObservationIgnored
    var ignoredCache: [String: Any] = [:]  // changes here won't notify observers
}
```

## Notes

- By default every stored property of an `@Observable` type is tracked. Attach `@ObservationIgnored` to opt a specific property out of tracking.
- The property remains accessible; it simply won't trigger observer notifications when mutated.
- Useful for caches, identifiers, or any value whose changes should not drive UI updates.
- Available: iOS 17.0+, iPadOS 17.0+, Mac Catalyst 17.0+, macOS 14.0+, tvOS 17.0+, visionOS 1.0+, watchOS 10.0+

## Related

- [@Observable macro](./observable-macro.md)
- [@ObservationTracked](./observationtracked.md)
