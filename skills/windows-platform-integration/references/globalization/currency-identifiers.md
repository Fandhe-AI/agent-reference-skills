# CurrencyIdentifiers

Static class containing currency identifiers for all supported currencies, exposed as static string properties keyed by ISO 4217 currency code (e.g. `USD`, `JPY`, `EUR`). Used with `CurrencyFormatter` and `CurrencyAmount`.

Namespace: `Windows.Globalization` (WinRT).

## Signature / Usage

```csharp
var formatter = new Windows.Globalization.NumberFormatting.CurrencyFormatter(
    Windows.Globalization.CurrencyIdentifiers.JPY);
string formatted = formatter.Format(1234.0);
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| USD, EUR, JPY, GBP, CNY, ... (one static property per ISO 4217 code) | `string` (static, get) | Currency identifier for the named currency, e.g. `USD` → "Gets the currency identifier for the United States Dollar." |
| XXX | `string` (static, get) | Identifier that represents no currency. |

## Notes

- Covers the full ISO 4217 list plus historical entries retained for compatibility (e.g. both `BYR` and `BYN` for Belarusian Ruble, both `MRO` and `MRU` for Mauritanian Ouguiya).
- Pass the resulting identifier string to `CurrencyFormatter`'s constructor or to `CurrencyAmount.CurrencyCode`.

## Related

- [CurrencyFormatter](./currency-formatter.md)
- [GeographicRegion](./geographic-region.md)
