# TimeZone

A struct defining the behavior of a time zone — mapping geographic regions to UTC offsets and handling daylight saving time transitions.

## Signature / Usage

```swift
// Current system time zone
let tz = TimeZone.current

// By identifier
let la = TimeZone(identifier: "America/Los_Angeles")

// Offset from GMT
let offset = TimeZone.current.secondsFromGMT(for: Date())

// DST check
let isDST = TimeZone.current.isDaylightSavingTime(for: Date())
```

## Options / Props

| Initializer / Property | Type | Description |
|------------------------|------|-------------|
| `TimeZone.current` (static) | `TimeZone` | System time zone (snapshot) |
| `TimeZone.autoupdatingCurrent` (static) | `TimeZone` | Tracks system time zone changes |
| `TimeZone.gmt` (static) | `TimeZone` | UTC/GMT time zone |
| `init?(identifier:)` | `TimeZone?` | Create from IANA identifier (e.g., `"America/New_York"`) |
| `init?(abbreviation:)` | `TimeZone?` | Create from abbreviation (e.g., `"PST"`) |
| `init?(secondsFromGMT:)` | `TimeZone?` | Create from fixed UTC offset |
| `identifier` | `String` | IANA time zone identifier |
| `abbreviation(for:)` | `String?` | Abbreviation at a given date |
| `secondsFromGMT(for:)` | `Int` | UTC offset in seconds at a given date |
| `isDaylightSavingTime(for:)` | `Bool` | Whether DST is in effect |
| `daylightSavingTimeOffset(for:)` | `TimeInterval` | DST offset in seconds |
| `nextDaylightSavingTimeTransition(after:)` | `Date?` | Next DST transition date |
| `localizedName(for:locale:)` | `String?` | Human-readable name in a locale |
| `knownTimeZoneIdentifiers` (static) | `[String]` | All known IANA identifiers |
| `abbreviationDictionary` (static) | `[String: String]` | Abbreviation → identifier map |

## Notes

- Available iOS 8.0+, macOS 10.10+.
- Conforms to `Codable`, `Hashable`, `Sendable`.
- Bridges to `NSTimeZone`.
- Identifiers use the IANA Time Zone Database (e.g., `"Europe/Paris"`), not abbreviations.

## Related

- [Date](./date.md)
- [Calendar](./calendar.md)
- [DateComponents](./datecomponents.md)
