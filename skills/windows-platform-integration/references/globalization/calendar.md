# Calendar

Manipulates the representation of a `DateTime` within a given calendar system (e.g. Gregorian, Japanese, Hijri) and clock (12-hour or 24-hour).

Namespace: `Windows.Globalization` (WinRT). Sealed class.

## Signature / Usage

```csharp
var calendar = new Windows.Globalization.Calendar();
calendar.SetToNow();
string year = calendar.YearAsString();
string month = calendar.MonthAsString();
string day = calendar.DayAsString();
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| Year / Month / Day / Hour / Minute / Second / Nanosecond | `int` (get/set) | Current component values. |
| Era | `int` (get/set) | Current era. |
| Period | `int` (get/set) | Current period of the day. |
| Languages | `IVectorView<string>` (get) | Priority list of language identifiers used when formatting components as strings. |
| NumeralSystem | `string` (get/set) | Numbering system used when formatting components. |
| ResolvedLanguage | `string` (get) | Language most recently used for formatting/operations. |

## Notes

- Constructors: `Calendar()` (current date/time, default language/calendar/clock), or overloads accepting a language list plus optional calendar, clock, and time zone identifier.
- Methods include `AddYears`/`AddMonths`/`AddDays`/etc. for arithmetic, `ChangeCalendarSystem(String)` / `ChangeClock(String)` / `ChangeTimeZone(String)` for switching systems, `GetDateTime()` to build a `DateTime`, `SetDateTime(DateTime)` to populate from one, and per-component `*AsString()` / `*AsPaddedString(Int32)` formatting methods (e.g. `MonthAsString()`, `DayOfWeekAsSoloString()`).
- Use `CalendarIdentifiers` (static identifier class) with `ChangeCalendarSystem` to select calendars such as Japanese, Hijri, or Korean.
- Language tags support the `ca-` Unicode extension to influence the calendar used.

## Related

- [ClockIdentifiers](./clock-identifiers.md)
- [DateTimeFormatter](./date-time-formatter.md)
- [Language](./language.md)
