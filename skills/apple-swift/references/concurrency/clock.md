# Clock

A mechanism to measure time and delay work until a given point in time.

## Signature

```swift
protocol Clock<Duration> : Sendable
```

## Associated Types

| Type | Description |
|---|---|
| `Duration` | Type representing time intervals (conforms to `DurationProtocol`) |
| `Instant` | A point in time (conforms to `InstantProtocol`) |

## Requirements

| Member | Description |
|---|---|
| `now` | The current instant (required) |
| `minimumResolution` | The minimum time resolution of the clock (required) |
| `sleep(until:tolerance:)` | Suspends execution until a deadline, with optional tolerance (required) |
| `sleep(for:tolerance:)` | Suspends for a given duration, with optional tolerance |
| `measure(_:)` | Measures elapsed time of a synchronous or asynchronous closure |

## Notes

- **Availability:** iOS 16.0+, macOS 13.0+, tvOS 16.0+, watchOS 9.0+, visionOS 1.0+
- `Clock.continuous` returns a `ContinuousClock`; `Clock.suspending` returns a `SuspendingClock`.
- Conforming types: `ContinuousClock`, `SuspendingClock`.

## Usage

```swift
let clock = ContinuousClock()
let start = clock.now
try await clock.sleep(for: .seconds(1))
print(clock.now - start)
```

## Related

- [ContinuousClock](./continuousclock.md)
- [SuspendingClock](./suspendingclock.md)
- [Duration](./duration.md)
- [InstantProtocol](./instantprotocol.md)
