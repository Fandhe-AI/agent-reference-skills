# withObservationTracking(_:onChange:)

Tracks access to properties of observable types and invokes a callback when any tracked property changes.

## Signature

```swift
func withObservationTracking<T>(
    _ apply: () -> T,
    onChange: @autoclosure () -> @Sendable () -> Void
) -> T
```

## Parameters

| Name | Type | Description |
|------|------|-------------|
| `apply` | `() -> T` | A closure containing property accesses to track. |
| `onChange` | `@autoclosure () -> @Sendable () -> Void` | Closure invoked once when any tracked property changes value. |

## Usage

```swift
func render() {
    withObservationTracking {
        for car in cars {
            print(car.name)   // only `name` is tracked
        }
    } onChange: {
        print("Schedule renderer.")
    }
}
```

## Notes

- The `onChange` closure fires **once** after any tracked property changes; call `withObservationTracking` again inside `onChange` to re-register tracking for subsequent updates.
- Only properties **read** inside the `apply` closure are tracked — unread properties on the same object are ignored.
- `onChange` is marked `@Sendable`, so captured values must be sendable or the closure must avoid data races.
- Returns the value returned by `apply`, allowing the tracked work to produce a result.
- Available: iOS 17.0+, iPadOS 17.0+, Mac Catalyst 17.0+, macOS 14.0+, tvOS 17.0+, visionOS 1.0+, watchOS 10.0+

## Related

- [@Observable macro](./observable-macro.md)
- [ObservationRegistrar](./observationregistrar.md)
- [Observable protocol](./observable-protocol.md)
