# ISO8601DateFormatter

A class that converts between `Date` values and their ISO 8601 string representations.

## Signature / Usage

```swift
let formatter = ISO8601DateFormatter()
formatter.formatOptions = [.withInternetDateTime, .withFractionalSeconds]
formatter.timeZone = TimeZone(secondsFromGMT: 0)

let str = formatter.string(from: Date())   // "2026-06-25T12:00:00.000Z"
let date = formatter.date(from: str)

// One-shot class method
let s = ISO8601DateFormatter.string(from: Date(), timeZone: .current, formatOptions: .withInternetDateTime)
```

## Options / Props

| Property / Method | Type | Description |
|-------------------|------|-------------|
| `init()` | `ISO8601DateFormatter` | Default formatter (UTC, full date + time) |
| `formatOptions` | `ISO8601DateFormatter.Options` | Which ISO 8601 components to include |
| `timeZone` | `TimeZone!` | Time zone (defaults to UTC/GMT) |
| `string(from:)` | `String` | Format `Date` → ISO 8601 string |
| `date(from:)` | `Date?` | Parse ISO 8601 string → `Date` |
| `string(from:timeZone:formatOptions:)` (class) | `String` | One-shot formatting |

**`ISO8601DateFormatter.Options` (common):**

| Option | Description |
|--------|-------------|
| `.withInternetDateTime` | Full date + time + timezone offset (e.g., `2026-06-25T12:00:00Z`) |
| `.withFullDate` | Date only (`2026-06-25`) |
| `.withFullTime` | Time with timezone offset |
| `.withFractionalSeconds` | Add milliseconds (`.000`) |
| `.withDashSeparatorInDate` | Dashes in date component |
| `.withColonSeparatorInTime` | Colons in time component |
| `.withTimeZone` | Timezone offset in output |

## Notes

- Available iOS 10.0+, macOS 10.12+.
- Inherits from `Formatter`; conforms to `NSCoding`, `NSCopying`.
- Default `timeZone` is GMT; explicitly set for other zones.
- For modern Swift, prefer `Date.ISO8601FormatStyle` (iOS 15+, macOS 12+) for better performance and caching.

## Related

- [Date](./date.md)
- [DateFormatter](./dateformatter.md)
- [TimeZone](./timezone.md)
