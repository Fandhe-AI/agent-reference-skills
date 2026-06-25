# Locale

A struct encapsulating linguistic, cultural, and regional conventions used for formatting numbers, dates, currencies, and more.

## Signature / Usage

```swift
// Current locale
let locale = Locale.current
print(locale.identifier)          // e.g., "en-US"
print(locale.currencyCode)        // e.g., "USD"
print(locale.decimalSeparator)    // e.g., "."

// Specific locale
let de = Locale(identifier: "de-DE")
```

## Options / Props

| Initializer / Property | Type | Description |
|------------------------|------|-------------|
| `init(identifier:)` | `Locale` | Create from BCP 47 identifier (e.g., `"en-US"`) |
| `Locale.current` (static) | `Locale` | User's current locale (snapshot) |
| `Locale.autoupdatingCurrent` (static) | `Locale` | Tracks locale preference changes |
| `identifier` | `String` | Locale identifier (e.g., `"en-US"`) |
| `languageCode` | `String?` | ISO 639 language code |
| `regionCode` | `String?` | ISO 3166 region code |
| `scriptCode` | `String?` | ISO 15924 script code |
| `currencyCode` | `String?` | ISO 4217 currency code |
| `currencySymbol` | `String?` | Currency symbol (e.g., `"$"`) |
| `decimalSeparator` | `String?` | Decimal point character |
| `groupingSeparator` | `String?` | Thousands separator character |
| `calendar` | `Calendar` | Calendar for this locale |
| `timeZone` | `TimeZone?` | Time zone if defined by locale |
| `language` | `Locale.Language` | Language properties |
| `currency` | `Locale.Currency` | Currency system |
| `measurementSystem` | `Locale.MeasurementSystem` | Metric vs. US |
| `hourCycle` | `Locale.HourCycle` | 12h vs. 24h |
| `firstDayOfWeek` | `Locale.Weekday` | First day of week |
| `preferredLanguages` (static) | `[String]` | User's preferred language codes |
| `availableIdentifiers` (static) | `[String]` | All known locale identifiers |
| `localizedString(forLanguageCode:)` | `String?` | Localized language name |
| `localizedString(forRegionCode:)` | `String?` | Localized region name |
| `localizedString(forCurrencyCode:)` | `String?` | Localized currency name |

## Notes

- Available iOS 8.0+, macOS 10.10+.
- Conforms to `Codable`, `Hashable`, `Sendable`.
- Bridges to `NSLocale`.
- Use `Locale(identifier: "en_US_POSIX")` for fixed-format parsing (e.g., RFC 3339 dates) to avoid locale-sensitive behavior.

## Related

- [Calendar](./calendar.md)
- [TimeZone](./timezone.md)
- [NumberFormatter](./numberformatter.md)
- [DateFormatter](./dateformatter.md)
