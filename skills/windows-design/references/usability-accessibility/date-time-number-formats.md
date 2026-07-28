# Globalize your date/time/number formats

Format dates, times, numbers, phone numbers, and currencies appropriately so the app is global-ready before later adapting it for additional cultures, regions, and languages.

## Signature / Usage

Use `DateTimeFormatter` for date/time and `CurrencyFormatter`/`NumberFormatting` classes for numbers and currency; both default to the app runtime language list unless a specific language list is supplied.

```csharp
var shortDateFormatter = new Windows.Globalization.DateTimeFormatting.DateTimeFormatter("shortdate");
var shortTimeFormatter = new Windows.Globalization.DateTimeFormatting.DateTimeFormatter("shorttime");

var shortDate = shortDateFormatter.Format(DateTime.Now);
var shortTime = shortTimeFormatter.Format(DateTime.Now);
```

```csharp
var userCurrency = Windows.System.UserProfile.GlobalizationPreferences.Currencies[0];
var userCurrencyFormatter = new Windows.Globalization.NumberFormatting.CurrencyFormatter(userCurrency);
var userCurrencyValue = userCurrencyFormatter.Format(12345.67);

// Specific currency (ISO 4217 code) with the current user's default number formatting.
var currencyFormatUSD = new Windows.Globalization.NumberFormatting.CurrencyFormatter("USD");
```

## Options / Props

| API | Description |
|------|-------------|
| `DateTimeFormatter(string template)` | Constructs a formatter from a culture-agnostic **format template** (e.g. `"month day"`); component order is resolved per current language automatically |
| `DateTimeFormatter(string pattern)` | Constructs from a culture-specific **format pattern** (e.g. `"{month.full} {day.integer}"`); order is fixed and may be culturally inappropriate for other languages |
| `NumberFormatting.CurrencyFormatter` | Formats decimal values as currency, either per user profile or for an explicit ISO 4217 currency code / region |
| `Windows.Globalization.Calendar` | Culturally appropriate calendar representation (e.g. Japanese era, Arabic lunar) for a given culture/region/calendar type |
| `PhoneNumberFormatting.PhoneNumberFormatter` | Formats a string of digits (including partial input) per current or explicit region |
| `Windows.System.UserProfile.GlobalizationPreferences` | Access to the user's current region, preferred languages, and preferred currencies |

## Notes

- Prefer **format templates** over **format patterns**: templates guarantee a culturally-appropriate, valid standard format per language-region; patterns are invariant/explicit and are not guaranteed to be correct across cultures.
- Use standard [calendar, date, and time controls](../../develop/ui/controls/date-and-time) when letting the user pick a date/time — they automatically use the best format for the app runtime language list.
- If formatting only per the *user profile* language list (rather than the app's translated language list), a user without a corresponding translation may see accurately-formatted dates alongside untranslated surrounding text.

## Related

- [Globalization and localization](./globalization-localization.md)
- [Adjust layout and fonts, and support RTL](./rtl-layout.md)
