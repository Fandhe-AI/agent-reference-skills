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
| `dates(byMatching:startingAt:in:matchingPolicy:repeatedTimePolicy:direction:)` | Sequence of dates matching (or most closely matching) the components. iOS 18.0+, iPadOS 18.0+, Mac Catalyst 18.0+, macOS 15.0+, tvOS 18.0+, visionOS 1.0+, watchOS 11.0+ |
| `dates(byAdding:startingAt:in:wrappingComponents:)` (`DateComponents`) | Sequence of dates made by repeatedly adding the components to a start date. Same availability |
| `dates(byAdding:value:startingAt:in:wrappingComponents:)` (`Calendar.Component`, `value: Int`) | Same, adding a single component value. Same availability |

```swift
func dates(
    byMatching components: DateComponents,
    startingAt start: Date,
    in range: Range<Date>? = nil,
    matchingPolicy: Calendar.MatchingPolicy = .nextTime,
    repeatedTimePolicy: Calendar.RepeatedTimePolicy = .first,
    direction: Calendar.SearchDirection = .forward
) -> some Sendable & Sequence<Date>

func dates(
    byAdding components: DateComponents,
    startingAt start: Date,
    in range: Range<Date>? = nil,
    wrappingComponents: Bool = false
) -> some Sendable & Sequence<Date>
```

## Notes

- Available iOS 8.0+, macOS 10.10+.
- Conforms to `Codable`, `Hashable`, `Sendable`.
- The `dates(...)` methods return a `Sequence`; with a `range`, the sequence terminates when the next result falls outside it (empty if the first result is outside). `direction: .backward` finds matches before the start date. With `wrappingComponents: true`, the component wraps around on overflow without incrementing higher components.
- `Calendar.Identifier` values include `.gregorian`, `.iso8601`, `.islamic`, `.hebrew`, `.chinese`, etc.

## Related

- [Date](./date.md)
- [DateComponents](./datecomponents.md)
- [TimeZone](./timezone.md)
- [DateInterval](./dateinterval.md)
