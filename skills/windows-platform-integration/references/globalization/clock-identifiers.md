# ClockIdentifiers

Static class containing the clock identifiers for the supported clocks, for use anywhere a clock identifier string is required (e.g. `Calendar.ChangeClock`, `DateTimeFormatter` constructors).

Namespace: `Windows.Globalization` (WinRT).

## Signature / Usage

```csharp
var calendar = new Windows.Globalization.Calendar();
calendar.ChangeClock(Windows.Globalization.ClockIdentifiers.TwentyFourHour);
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| TwelveHour | `string` (static, get) | Identifier for a 12-hour clock. |
| TwentyFourHour | `string` (static, get) | Identifier for a 24-hour clock. |

## Related

- [Calendar](./calendar.md)
- [DateTimeFormatter](./date-time-formatter.md)
