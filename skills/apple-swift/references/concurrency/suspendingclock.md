# SuspendingClock

A clock that measures time that always increments but stops incrementing while the system is asleep.

## Signature

```swift
struct SuspendingClock
```

Conforms to `Clock`, `Sendable`.

## Notes

- **Availability:** iOS 16.0+, macOS 13.0+, tvOS 16.0+, watchOS 9.0+, visionOS 1.0+
- Measures system awake time; the `Instant` reference frame may be bound to machine boot or another locally defined point, so instants are only comparable within the same booted session.
- Suitable for high-resolution measurements of execution time.
- `Instant` is a nested type conforming to `InstantProtocol`; `now` returns the current instant accounting for suspension; `systemEpoch` exposes the reference epoch.
- Compare with `ContinuousClock`, which keeps incrementing while the system is asleep.

## Usage

```swift
let clock = SuspendingClock()
let start = clock.now
try await clock.sleep(for: .seconds(1))
print(clock.now - start)
```

## Related

- [Clock](./clock.md)
- [ContinuousClock](./continuousclock.md)
- [Duration](./duration.md)
- [InstantProtocol](./instantprotocol.md)
