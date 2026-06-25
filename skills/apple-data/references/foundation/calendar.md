# Calendar

A struct encapsulating a calendrical system (Gregorian, Islamic, Hebrew, etc.) and providing operations for date arithmetic, component extraction, and date comparisons.

## Signature / Usage

```swift
let calendar = Calendar.current

// Extract components
let components = calendar.dateComponents([.year, .month, .day], from: Date())

// Add one month
let nextMonth = calendar.date(byAdding: .month, value: 1, to: Date())

// Check if same day
let isSameDay = calendar.isDate(date1, inSameDayAs: date2)
```

## Options / Props

| Method / Property | Description |
|-------------------|-------------|
| `Calendar.current` (static) | The user's current calendar (snapshot) |
| `Calendar.autoupdatingCurrent` (static) | Tracks user calendar preference changes |
| `init(identifier:)` | Create a specific calendar (e.g., `.gregorian`, `.islamic`) |
| `identifier` | The calendar system identifier |
| `locale` | Locale for symbol names |
| `timeZone` | Time zone used by this calendar |
| `firstWeekday` | First day of week (1 = Sunday) |
| `component(_:from:)` | Extract a single component from a date |
| `dateComponents(_:from:)` | Extract multiple components |
| `dateComponents(_:from:to:)` | Difference between two dates as components |
| `date(from:)` | Construct a `Date` from `DateComponents` |
| `date(byAdding:value:to:)` | Add a component value to a date |
| `date(byAdding:to:)` | Add `DateComponents` to a date |
| `startOfDay(for:)` | Midnight of the given date |
| `isDateInToday(_:)` | Check if date is today |
| `isDateInWeekend(_:)` | Check if date falls on a weekend |
| `isDate(_:inSameDayAs:)` | Compare two dates at day granularity |
| `isDate(_:equalTo:toGranularity:)` | Compare at any granularity |
| `compare(_:to:toGranularity:)` | Ordered comparison at granularity |
| `dateInterval(of:for:)` | Start/duration of a calendar unit |
| `range(of:in:for:)` | Valid range of a smaller unit within a larger |
| `weekdaySymbols` | Localized weekday names |
| `monthSymbols` | Localized month names |

## Notes

- Available iOS 8.0+, macOS 10.10+.
- Conforms to `Codable`, `Hashable`, `Sendable`.
- `Calendar.Identifier` values include `.gregorian`, `.iso8601`, `.islamic`, `.hebrew`, `.chinese`, etc.

## Related

- [Date](./date.md)
- [DateComponents](./datecomponents.md)
- [TimeZone](./timezone.md)
- [DateInterval](./dateinterval.md)
