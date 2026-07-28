# PercentFormatter

Formats and parses percentages according to the user's or specified languages and geographic region. (`PermilleFormatter` is the sibling class for permille/‰ values.)

Namespace: `Windows.Globalization.NumberFormatting` (WinRT). Sealed class implementing `INumberFormatter`, `INumberFormatter2`, `INumberFormatterOptions`, `INumberParser`, `INumberRounderOption`, `ISignedZeroOption`, `ISignificantDigitsOption`.

## Signature / Usage

```csharp
using Windows.Globalization.NumberFormatting;

double randomNumber = new Random().NextDouble();
PercentFormatter defaultPercentFormatter = new PercentFormatter();
string percentFormatted = defaultPercentFormatter.Format(randomNumber);

// Language-specific formatter
PercentFormatter languagePercentFormatter = new PercentFormatter(new[] { "fr-FR" }, "ZZ");
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| FractionDigits | `int` (get/set) | Minimum digits to display for the fraction part. |
| IntegerDigits | `int` (get/set) | Minimum digits to display for the integer part. |
| IsDecimalPointAlwaysDisplayed | `bool` (get/set) | Whether the decimal point is always shown. |
| IsGrouped | `bool` (get/set) | Whether the integer part is grouped. |
| IsZeroSigned | `bool` (get/set) | Whether -0 is formatted as "-0" or "0". |
| NumberRounder | `INumberRounder` (get/set) | Rounding strategy. |
| NumeralSystem | `string` (get/set) | Numbering system used. |
| Languages | `IVectorView<string>` (get) | Priority language list. |

## Notes

- Constructors: `PercentFormatter()`, or `PercentFormatter(IIterable<String> languages, String geographicRegion)`.
- Formatting methods: `Format(Double)`, `FormatDouble`, `FormatInt`, `FormatUInt`; parsing via `ParseDouble`, `ParseInt`, `ParseUInt`. The formatted value already includes the `%` (or `‰` for `PermilleFormatter`), so pass the raw fraction (e.g. `0.5` for 50%).

## Related

- [DecimalFormatter](./decimal-formatter.md)
- [CurrencyFormatter](./currency-formatter.md)
