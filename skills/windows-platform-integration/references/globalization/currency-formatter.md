# CurrencyFormatter

Formats and parses currency amounts, choosing between currency symbol or currency code display.

Namespace: `Windows.Globalization.NumberFormatting` (WinRT). Sealed class implementing `INumberRounderOption`, `ISignedZeroOption`, `ISignificantDigitsOption` (and, via base formatting behavior, currency string formatting/parsing).

## Signature / Usage

```csharp
var formatter = new Windows.Globalization.NumberFormatting.CurrencyFormatter(
    Windows.Globalization.CurrencyIdentifiers.USD);
string formatted = formatter.Format(19.99); // e.g. "$19.99"
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| Currency | `string` (get) | Currency identifier used for formatting/parsing. Read-only after Windows 8.1; create a new `CurrencyFormatter` to change it. |
| Mode | `CurrencyFormatterMode` (get/set) | Whether the currency is formatted with symbol or code. |
| FractionDigits / IntegerDigits | `int` (get/set) | Minimum digits for fraction / integer parts. |
| IsGrouped | `bool` (get/set) | Whether the integer part is grouped. Default `false`. |
| IsDecimalPointAlwaysDisplayed | `bool` (get/set) | Whether the decimal point is always shown. |
| NumberRounder | `INumberRounder` (get/set) | Rounding strategy. |
| NumeralSystem | `string` (get/set) | Numbering system used. |
| Languages | `IVectorView<string>` (get) | Priority language list. |
| GeographicRegion | `string` (get) | Region used for formatting/parsing. |

## Notes

- Constructors: `CurrencyFormatter(String currencyCode)`, or `CurrencyFormatter(String currencyCode, IIterable<String> languages, String geographicRegion)`.
- `ApplyRoundingForCurrency(RoundingAlgorithm)` applies a standard rounding algorithm to the formatter.
- Formatting methods mirror `DecimalFormatter`: `Format(Double)`, `FormatDouble`, `FormatInt`, `FormatUInt`; parsing via `ParseDouble`, `ParseInt`, `ParseUInt`.
- Use `CurrencyIdentifiers` for standard ISO 4217 currency codes.

## Related

- [DecimalFormatter](./decimal-formatter.md)
- [CurrencyIdentifiers](./currency-identifiers.md)
- [GeographicRegion](./geographic-region.md)
