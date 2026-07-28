# CalendarView

A control that presents an always-visible calendar for a user to view and interact with, navigable by month, year, or decade. Supports single or multiple date selection.

## Signature / Usage

```xaml
<CalendarView/>
```

```csharp
calendarView1.SelectedDates.Add(DateTimeOffset.Now);
calendarView1.MinDate = new DateTime(2000, 1, 1);
calendarView1.MaxDate = new DateTime(2099, 12, 31);
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| DisplayMode | CalendarViewDisplayMode | Startup view: month, year, or decade. |
| SelectionMode | CalendarViewSelectionMode | `Single` (default), `None`, or `Multiple`. |
| SelectedDates | IObservableVector<DateTime> | Collection of selected dates; add/remove `DateTime`/`DateTimeOffset` objects programmatically for `Multiple` mode. |
| SelectedDatesChanged | event | Raised when `SelectedDates` changes. |
| MinDate / MaxDate | DateTimeOffset | Bounds of selectable dates. Defaults to ±100 years from today. |
| NumberOfWeeksInView | int | Weeks shown in month view (2-8, default 6). |
| CalendarViewDayItemChanging | event | Enables phased rendering of `CalendarViewDayItem` objects (blackout dates, density bars, etc.). |

## Notes

- Package: `Microsoft.UI.Xaml.Controls.CalendarView` (WinUI 3). Distinct from other frameworks' calendar components.
- `CalendarViewDayItem` objects (the individual day cells) can't be re-templated, but many appearance properties (blackout via `IsBlackout`, density bars via `SetDensityColors`) are available.
- Use `SetYearDecadeDisplayDimensions(rows, columns)` to change the year/decade grid layout (default 4x4).
- For a drop-down picker instead of an always-visible calendar, use CalendarDatePicker or DatePicker.

## Related

- [CalendarDatePicker](./calendar-date-picker.md)
- [DatePicker](./date-picker.md)
