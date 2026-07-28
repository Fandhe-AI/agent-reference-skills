# CalendarDatePicker

A drop-down control optimized for picking a single date from a contextual calendar view (e.g. day-of-week or calendar fullness matters).

## Signature / Usage

```xaml
<CalendarDatePicker x:Name="arrivalCalendarDatePicker" Header="Calendar"/>
```

```csharp
myCalendarDatePicker.Date = new DateTime(1977, 1, 5);
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| Date | DateTimeOffset? | Selected date; `null` by default. Constrained by `MinDate`/`MaxDate` when set in code. |
| DateChanged | event | Raised when `Date` changes. |
| MinDate / MaxDate | DateTimeOffset | Bounds of selectable dates. |
| Header / PlaceholderText | object / string | Label and watermark text (default placeholder: "select a date"). |
| IsTodayHighlighted / FirstDayOfWeek | bool / DayOfWeek | Forwarded to the internal `CalendarView`. |

## Notes

- Package: `Microsoft.UI.Xaml.Controls.CalendarDatePicker` (WinUI 3).
- Internally wraps a `CalendarView`, but its `SelectionMode` can't be changed to `Multiple`; use CalendarView directly for multi-date selection.
- For a known-date scenario (e.g. birth date) where calendar context isn't needed, use DatePicker instead.

## Related

- [CalendarView](./calendar-view.md)
- [DatePicker](./date-picker.md)
