# InstantProtocol

A protocol that represents an instant in time, used for measuring durations relative to a `Clock`.

## Signature

```swift
protocol InstantProtocol<Duration> : Comparable, Hashable, Sendable
```

## Associated Types

| Type | Description |
|---|---|
| `Duration` | Conforms to `DurationProtocol` |

## Requirements

| Member | Description |
|---|---|
| `advanced(by:)` | Returns an instant offset by the given duration (required) |
| `duration(to:)` | Returns the duration between this instant and another (required) |

## Notes

- **Availability:** iOS 16.0+, macOS 13.0+, tvOS 16.0+, watchOS 9.0+, visionOS 1.0+
- There is no standalone `Instant` type in Swift's Concurrency module; each `Clock` defines its own nested `Instant` type conforming to this protocol.
- Conforming types: `ContinuousClock.Instant`, `SuspendingClock.Instant`.

## Related

- [Clock](./clock.md)
- [ContinuousClock](./continuousclock.md)
- [SuspendingClock](./suspendingclock.md)
- [Duration](./duration.md)
