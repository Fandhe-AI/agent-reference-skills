# ContinuousClock

A clock that measures time that always increments and does not stop incrementing while the system is asleep.

## Signature

```swift
struct ContinuousClock
```

Conforms to `Clock`, `Sendable`.

## Notes

- **Availability:** iOS 16.0+, macOS 13.0+, tvOS 16.0+, watchOS 9.0+, visionOS 1.0+
- Behaves like a stopwatch: the `Instant` reference frame may be bound to process launch, machine boot, or another locally defined point, so instants are only comparable within the same run.
- Suitable for high-resolution measurements of execution time.
- `Instant` is a nested type conforming to `InstantProtocol`; `now` returns the current continuous instant; `systemEpoch` exposes the epoch instant.
- Compare with `SuspendingClock`, which pauses while the system sleeps.

## Usage

```swift
let clock = ContinuousClock()
let start = clock.now
// ... work ...
print(clock.now - start)
```

## Related

- [Clock](./clock.md)
- [SuspendingClock](./suspendingclock.md)
- [Duration](./duration.md)
- [InstantProtocol](./instantprotocol.md)
