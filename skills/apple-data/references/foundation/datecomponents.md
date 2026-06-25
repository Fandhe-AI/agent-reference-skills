# DateComponents

A struct representing a date or time as individual calendar units (year, month, day, hour, etc.). Used to construct, decompose, and perform arithmetic with `Calendar`.

## Signature / Usage

```swift
var components = DateComponents()
components.year = 2024
components.month = 12
components.day = 25
components.hour = 10

// Create a Date from components
let calendar = Calendar.current
if let date = calendar.date(from: components) {
    print(date)
}
```

## Options / Props

| Property | Type | Description |
|----------|------|-------------|
| `calendar` | `Calendar?` | Calendar used to interpret values |
| `timeZone` | `TimeZone?` | Time zone context |
| `era` | `Int?` | Era |
| `year` | `Int?` | Year |
| `month` | `Int?` | Month (1–12) |
| `day` | `Int?` | Day of month |
| `dayOfYear` | `Int?` | Day of year (1–365/366) |
| `hour` | `Int?` | Hour |
| `minute` | `Int?` | Minute |
| `second` | `Int?` | Second |
| `nanosecond` | `Int?` | Nanosecond |
| `weekday` | `Int?` | Day of week |
| `weekOfYear` | `Int?` | Week of year |
| `quarter` | `Int?` | Quarter |
| `isLeapMonth` | `Bool?` | Whether this is a leap month |
| `date` | `Date?` | Computed `Date` using stored `calendar` |
| `isValidDate` | `Bool` | Whether components form a valid date |

## Notes

- Available iOS 8.0+, macOS 10.9+.
- All fields are optional (`nil` by default); only set fields you need.
- Use `value(for:)` / `setValue(_:for:)` for component access via `Calendar.Component` enum.
- Conforms to `Codable`, `Hashable`, `Sendable`.

## Related

- [Date](./date.md)
- [Calendar](./calendar.md)
- [TimeZone](./timezone.md)
