# Duration

A representation of high precision time, expressed as an elapsed time value in integral form.

## Signature

```swift
@frozen struct Duration
```

Conforms to `AdditiveArithmetic`, `Comparable`, `Equatable`, `Hashable`, `Codable`, `CustomStringConvertible`, `Sendable`, `DurationProtocol`.

## Options

| Factory | Description |
|---|---|
| `.seconds(_:)` | Accepts `BinaryInteger` or `Double` |
| `.milliseconds(_:)` | Accepts `BinaryInteger` or `Double` |
| `.microseconds(_:)` | Accepts `BinaryInteger` or `Double` |
| `.nanoseconds(_:)` | Accepts `BinaryInteger` or `Double` |

## Notes

- **Availability:** iOS 16.0+, macOS 13.0+, tvOS 16.0+, watchOS 9.0+, visionOS 1.0+
- Precision spans attosecond scale, from sub-second durations to durations covering centuries, and can be negative.
- `attoseconds: Int128` and `components: (seconds: Int64, attoseconds: Int64)` expose the raw representation.
- Also constructible via `init(attoseconds:)` or `init(secondsComponent:attosecondsComponent:)`.

## Usage

```swift
var d: Duration = .seconds(3)
d += .milliseconds(33)
print(d) // 3.033 seconds
```

## Related

- [Clock](./clock.md)
- [ContinuousClock](./continuousclock.md)
- [SuspendingClock](./suspendingclock.md)
