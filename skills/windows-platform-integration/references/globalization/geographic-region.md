# GeographicRegion

Describes a region, usually a country but possibly a macroregion. Provides its identifiers, display/native names, and the currencies in use there.

Namespace: `Windows.Globalization` (WinRT). Sealed class.

## Signature / Usage

```csharp
// Get the user's geographic region and its display name.
var geographicRegion = new Windows.Globalization.GeographicRegion();
var displayName = geographicRegion.DisplayName;
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| Code | `string` (get) | Best available identifier representing the region. |
| CodeTwoLetter / CodeThreeLetter / CodeThreeDigit | `string` (get) | Two-letter, three-letter, and three-digit identifiers. |
| DisplayName | `string` (get) | Localized display name. |
| NativeName | `string` (get) | Name in the primary language spoken in the region. |
| CurrenciesInUse | `IVectorView<string>` (get) | Set of currency identifiers in use in this region. |

## Notes

- Constructors: `GeographicRegion()` defaults to the user's home region; `GeographicRegion(String geographicRegionCode)` creates one for a specific region code.
- `IsSupported(String)` (static) checks whether a region identifier is supported.
- For the standard country/region codes used by Microsoft, see the Official Country/Region List referenced from the docs.

## Related

- [CurrencyIdentifiers](./currency-identifiers.md)
- [CurrencyFormatter](./currency-formatter.md)
