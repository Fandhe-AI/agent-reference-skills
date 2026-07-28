# DecimalFormatter

Formats and parses decimal numbers according to the user's or specified languages and geographic region.

Namespace: `Windows.Globalization.NumberFormatting` (WinRT). Sealed class implementing `INumberFormatter`, `INumberFormatter2`, `INumberFormatterOptions`, `INumberParser`, `INumberRounderOption`, `ISignedZeroOption`, `ISignificantDigitsOption`.

## Signature / Usage

```csharp
var formatter = new Windows.Globalization.NumberFormatting.DecimalFormatter();
formatter.IsGrouped = true;
formatter.FractionDigits = 2;
string formatted = formatter.Format(1234.5); // e.g. "1,234.50" for en-US
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| FractionDigits | `int` (get/set) | Minimum digits to display for the fraction part. |
| IntegerDigits | `int` (get/set) | Minimum digits to display for the integer part. |
| IsDecimalPointAlwaysDisplayed | `bool` (get/set) | Whether the decimal point is always shown. |
| IsGrouped | `bool` (get/set) | Whether the integer part is grouped (thousands separators). |
| IsZeroSigned | `bool` (get/set) | Whether -0 is formatted as "-0" or "0". |
| NumberRounder | `INumberRounder` (get/set) | Rounding strategy applied when formatting. |
| NumeralSystem | `string` (get/set) | Numbering system used to format/parse. |
| Languages | `IVectorView<string>` (get) | Priority language list used for formatting/parsing. |
| GeographicRegion | `string` (get) | Region used for formatting/parsing. |

## Notes

- Constructors: `DecimalFormatter()` (defaults), or `DecimalFormatter(IIterable<String> languages, String geographicRegion)`.
- Formatting methods: `Format(Double)`, `FormatDouble(Double)`, `FormatInt(Int64)`, `FormatUInt(UInt64)`. Parsing: `ParseDouble(String)`, `ParseInt(String)`, `ParseUInt(String)`.

## Related

- [CurrencyFormatter](./currency-formatter.md)
- [PercentFormatter](./percent-formatter.md)
