# DateFormatter

A class that converts between `Date` values and their string representations. Supports localized styles and custom `dateFormat` strings.

## Signature / Usage

```swift
// Localized display
let formatter = DateFormatter()
formatter.dateStyle = .medium
formatter.timeStyle = .short
let display = formatter.string(from: Date())  // e.g., "Jun 25, 2026, 3:45 PM"

// Fixed format (RFC 3339 / ISO 8601 subset)
let rfc3339 = DateFormatter()
rfc3339.locale = Locale(identifier: "en_US_POSIX")
rfc3339.dateFormat = "yyyy-MM-dd'T'HH:mm:ssZZZZZ"
rfc3339.timeZone = TimeZone(secondsFromGMT: 0)
let date = rfc3339.date(from: "2024-06-25T12:00:00Z")
```

## Options / Props

| Property / Method | Type | Description |
|-------------------|------|-------------|
| `dateStyle` | `DateFormatter.Style` | Style for the date portion |
| `timeStyle` | `DateFormatter.Style` | Style for the time portion |
| `dateFormat` | `String!` | Custom unicode date format pattern |
| `locale` | `Locale!` | Locale used for formatting |
| `timeZone` | `TimeZone!` | Time zone for conversion |
| `calendar` | `Calendar!` | Calendar system |
| `isLenient` | `Bool` | Heuristic parsing of ambiguous strings |
| `doesRelativeDateFormatting` | `Bool` | Use "Today", "Tomorrow" etc. |
| `setLocalizedDateFormatFromTemplate(_:)` | `Void` | Set locale-appropriate format from template (e.g., `"MMMMd"`) |
| `string(from:)` | `String` | Format `Date` → `String` |
| `date(from:)` | `Date?` | Parse `String` → `Date` |
| `localizedString(from:dateStyle:timeStyle:)` (class) | `String` | One-shot localized formatting |

**`DateFormatter.Style` cases:** `.none`, `.short`, `.medium`, `.long`, `.full`

## Notes

- Available iOS 2.0+, macOS 10.0+.
- Thread-safe on iOS 7+ / macOS 10.9+ (64-bit).
- **Always set `locale = Locale(identifier: "en_US_POSIX")`** when using `dateFormat` for fixed-format parsing; otherwise locale-specific characters may cause failures.
- For modern Swift, prefer `Date.FormatStyle` (iOS 15+, macOS 12+). Use `ISO8601DateFormatter` for ISO 8601.

## Related

- [Date](./date.md)
- [ISO8601DateFormatter](./iso8601dateformatter.md)
- [Locale](./locale.md)
- [TimeZone](./timezone.md)
