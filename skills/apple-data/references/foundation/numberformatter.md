# NumberFormatter

A class that converts between numeric values and their localized string representations. Supports decimal, currency, percent, scientific, spell-out, and ordinal styles.

## Signature / Usage

```swift
let formatter = NumberFormatter()
formatter.numberStyle = .currency
formatter.locale = Locale(identifier: "en_US")

let str = formatter.string(from: 1234.5)  // "$1,234.50"
let num = formatter.number(from: "$1,234.50")  // 1234.5
```

## Options / Props

| Property / Method | Type | Description |
|-------------------|------|-------------|
| `numberStyle` | `NumberFormatter.Style` | Predefined format style |
| `locale` | `Locale!` | Locale for formatting |
| `minimumFractionDigits` | `Int` | Minimum decimal places |
| `maximumFractionDigits` | `Int` | Maximum decimal places |
| `minimumIntegerDigits` | `Int` | Minimum digits before decimal |
| `usesGroupingSeparator` | `Bool` | Enable thousands separator |
| `groupingSeparator` | `String!` | Thousands separator character |
| `decimalSeparator` | `String!` | Decimal point character |
| `currencyCode` | `String!` | ISO 4217 currency code |
| `currencySymbol` | `String!` | Currency symbol |
| `positivePrefix` / `negativeSuffix` | `String!` | Custom affixes |
| `string(from:)` | `String?` | Format `NSNumber` → `String` |
| `number(from:)` | `NSNumber?` | Parse `String` → `NSNumber` |

**`NumberFormatter.Style` cases:**

| Case | Example |
|------|---------|
| `.decimal` | `1,234.57` |
| `.currency` | `$1,234.57` |
| `.percent` | `57.50%` |
| `.scientific` | `1.23E3` |
| `.spellOut` | `one thousand two hundred…` |
| `.ordinal` | `1st`, `2nd` |
| `.currencyISOCode` | `USD 1,234.57` |
| `.currencyPlural` | `1,234.57 US dollars` |

## Notes

- Available iOS 2.0+, macOS 10.0+.
- Thread-safe on iOS 7+ / macOS 10.9+ (64-bit).
- Inherits from `Formatter`.
- For better Swift ergonomics, prefer `Int.FormatStyle`, `Double.FormatStyle`, or `Decimal.FormatStyle` (iOS 15+, macOS 12+).

## Related

- [Locale](./locale.md)
- [DateFormatter](./dateformatter.md)
