# NumeralSystem values / NumeralSystemTranslator

`NumeralSystem` is a string property (values such as `"Latn"` for Latin digits or `"Arab"` for Arabic-Indic digits) exposed by `Calendar`, `CurrencyFormatter`, `DecimalFormatter`, `PercentFormatter`, `PermilleFormatter`, and `INumberFormatterOptions` in `Windows.Globalization` / `Windows.Globalization.NumberFormatting`. `NumeralSystemTranslator` is a separate sealed class in `Windows.Globalization.NumberFormatting` that converts a string already containing Latin digits into the digits of another numeral system, for native-digit locales (Arabic, Bengali, Devanagari, Thai, etc.) where the default formatters do not otherwise apply.

## Signature / Usage

```csharp
// Read/override NumeralSystem on an existing formatter
var formatter = new Windows.Globalization.NumberFormatting.DecimalFormatter();
formatter.NumeralSystem = "Arab"; // force Arabic-Indic digits regardless of locale

// Translate an already-formatted Latin-digit string to another numeral system
var translator = new Windows.Globalization.NumberFormatting.NumeralSystemTranslator();
string translated = translator.TranslateNumerals("2024"); // e.g. "٢٠٢٤" if resolved language uses Arab
```

## Options / Props

| NumeralSystem value | Description |
|------|-------------|
| Latn | Latin (0123456789) |
| Arab | Arabic-Indic |
| ArabExt | Extended Arabic-Indic |
| Beng | Bengali |
| Deva | Devanagari |
| FullWide | Full width |
| Guru | Gurmukhi |
| Khmr | Khmer |
| Mymr | Myanmar |
| Thai | Thai |
| Tibt | Tibetan |
| ... | See full Unicode code-point table in the official "NumeralSystem values" doc; ~35 systems total |

`NumeralSystemTranslator` members:

| Name | Type | Description |
|------|------|-------------|
| NumeralSystemTranslator() | constructor | Initializes using the current runtime user language list. |
| NumeralSystemTranslator(IIterable\<String\>) | constructor | Initializes using an explicit BCP-47 language list. |
| Languages | `IVectorView<string>` (get) | Language tag(s) used to initialize the object. |
| ResolvedLanguage | `string` (get) | Language actually used to determine the target numeral system. |
| NumeralSystem | `string` (get/set) | Numeral system that Latin digits are converted to on `TranslateNumerals`. Can be overridden after construction. |
| TranslateNumerals(String) | method | Converts a string containing Latin digits to the corresponding digits of `NumeralSystem`. |

## Notes

- Setting `NumeralSystem` on a formatter (`Calendar`, `CurrencyFormatter`, `DecimalFormatter`, `PercentFormatter`) forces that formatter to use the given numeral system for all subsequent formatting/parsing, overriding what the resolved language/region would otherwise select.
- `NumeralSystemTranslator` does not format numbers itself — it only substitutes digit glyphs in a string that is already formatted with Latin digits, which is useful for native-digit locales layered on top of formatters/UI that only emit Latin digits.
- The Windows 10 device family baseline API contract is `Windows.Foundation.UniversalApiContract` v1.0.

## Related

- [DecimalFormatter](./decimal-formatter.md)
- [CurrencyFormatter](./currency-formatter.md)
- [PercentFormatter](./percent-formatter.md)
- [Calendar](./calendar.md)
