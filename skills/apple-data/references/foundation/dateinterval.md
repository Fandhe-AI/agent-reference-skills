# DateInterval

A struct representing a closed interval `[start, end]` between two `Date` values. Duration must be non-negative.

## Signature / Usage

```swift
let start = Date()
let end = Date(timeIntervalSinceNow: 3600)  // 1 hour later

let interval = DateInterval(start: start, end: end)
print(interval.duration)  // 3600.0

// Check containment and intersection
let midpoint = Date(timeIntervalSinceNow: 1800)
interval.contains(midpoint)  // true
```

## Options / Props

| Initializer / Property / Method | Type | Description |
|---------------------------------|------|-------------|
| `init()` | `DateInterval` | Zero-duration interval at current time |
| `init(start:end:)` | `DateInterval` | Interval from start to end date |
| `init(start:duration:)` | `DateInterval` | Interval from start for given seconds |
| `start` | `Date` | Start date |
| `end` | `Date` | End date |
| `duration` | `TimeInterval` | Length in seconds |
| `contains(_:)` | `Bool` | Whether a `Date` falls within the interval |
| `intersects(_:)` | `Bool` | Whether two intervals overlap |
| `intersection(with:)` | `DateInterval?` | Overlapping sub-interval, or `nil` |
| `compare(_:)` | `ComparisonResult` | Ordered comparison of two intervals |

## Notes

- Available iOS 10.0+, macOS 10.12+.
- Conforms to `Comparable`, `Hashable`, `Codable`, `Sendable`.
- Reverse intervals (end before start) are not supported; use positive duration only.

## Related

- [Date](./date.md)
- [Calendar](./calendar.md)
