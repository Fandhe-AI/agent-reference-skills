# Date

A struct representing a specific point in time, independent of any calendar or time zone. Internally stored as seconds since 2001-01-01 00:00:00 UTC.

## Signature / Usage

```swift
let now = Date()
let tomorrow = Date(timeIntervalSinceNow: 86400)

// Comparison
if tomorrow > now { print("future") }

// Arithmetic
let later = now + 3600  // 1 hour later

// Formatting
let str = now.formatted(date: .abbreviated, time: .standard)
```

## Options / Props

| Initializer / Property | Type | Description |
|------------------------|------|-------------|
| `init()` | `Date` | Current date and time |
| `init(timeIntervalSinceNow:)` | `Date` | Offset from now in seconds |
| `init(timeIntervalSince1970:)` | `Date` | Unix timestamp |
| `init(timeIntervalSinceReferenceDate:)` | `Date` | Offset from 2001-01-01 |
| `now` (static) | `Date` | Current date at access time |
| `distantPast` (static) | `Date` | A date in the distant past |
| `distantFuture` (static) | `Date` | A date in the distant future |
| `timeIntervalSinceNow` | `TimeInterval` | Seconds between this date and now |
| `timeIntervalSince1970` | `TimeInterval` | Unix timestamp value |
| `timeIntervalSince(_:)` | `TimeInterval` | Seconds between two dates |
| `addingTimeInterval(_:)` | `Date` | Returns a new date offset by seconds |
| `formatted(date:time:)` | `String` | Localized string representation |

## Notes

- Available iOS 8.0+, macOS 10.10+.
- Conforms to `Comparable`, `Hashable`, `Codable`, `Sendable`.
- Bridges to `NSDate`.
- For calendar-aware operations (year, month, day), use `Calendar` and `DateComponents`.

## Related

- [DateComponents](./datecomponents.md)
- [Calendar](./calendar.md)
- [TimeZone](./timezone.md)
- [DateInterval](./dateinterval.md)
- [DateFormatter](./dateformatter.md)
- [ISO8601DateFormatter](./iso8601dateformatter.md)
