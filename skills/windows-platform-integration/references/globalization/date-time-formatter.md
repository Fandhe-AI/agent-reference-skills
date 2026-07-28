# DateTimeFormatter

Formats dates and times for a given language, calendar, and clock, using either a **format template** (component names such as `shortdate`, `longtime`) or a **format pattern** (explicit field placeholders such as `{month.integer}/{day.integer}/{year.full}`).

Namespace: `Windows.Globalization.DateTimeFormatting` (WinRT). Sealed class.

## Signature / Usage

```csharp
// Format a date via a string template. The order specified in the template does not
// determine output order -- the user's language/region preferences do.
var formatter = new Windows.Globalization.DateTimeFormatting.DateTimeFormatter("month day dayofweek year");
DateTime dateToFormat = DateTime.Now;
var mydate = formatter.Format(dateToFormat);
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| ShortDate / LongDate | `DateTimeFormatter` (get) | Preconfigured formatter for the user's short/long date pattern. |
| ShortTime / LongTime | `DateTimeFormatter` (get) | Preconfigured formatter for the user's short/long time pattern. |
| Template | `string` (get) | String representation of this formatter's format template. |
| Patterns | `IVectorView<string>` (get) | Patterns corresponding to this template. |
| Calendar | `string` (get) | Calendar used when formatting dates. |
| Clock | `string` (get) | Clock used when formatting times. |
| GeographicRegion | `string` (get/set) | Region used when formatting. |
| NumeralSystem | `string` (get/set) | Numbering system used. |
| Languages | `IVectorView<string>` (get) | Priority language list used for formatting. |

## Notes

- Constructors accept a format template string (e.g. `"shortdate"`, `"year month day"`), optionally with a language list, geographic region, calendar, and clock; or explicit `YearFormat`/`MonthFormat`/`DayFormat`/`DayOfWeekFormat`/`HourFormat`/`MinuteFormat`/`SecondFormat` enum values.
- Common templates: `longdate`, `shortdate`, `longtime`, `shorttime`, `dayofweek`, `day month year`, `hour minute second`, `timezone`, etc. Only combinations defined by the documented grammar are valid — components can't be combined arbitrarily.
- Format patterns use brace-delimited fields, e.g. `{day.integer(2)}/{month.integer(2)}/{year.full}`; `{openbrace}`/`{closebrace}` escape literal braces. `solo` forms (e.g. `month.solo.full`) request the nominative/standalone grammatical case where applicable.
- `Format(DateTime)` formats using the current settings; `Format(DateTime, String timeZoneId)` formats in a specific time zone.
- Note: this API required updates for the May 2019 Japanese era change; apps supporting the Japanese calendar should validate correct handling of new eras.

## Related

- [Calendar](./calendar.md)
- [ClockIdentifiers](./clock-identifiers.md)
