# DatePicker

A standardized control for picking a localized date value via a drop-down picker surface (day/month/year columns).

## Signature / Usage

```xaml
<DatePicker x:Name="arrivalDatePicker" Header="Arrival date"/>
```

```csharp
arrivalDatePicker.SelectedDateChanged += arrivalDatePicker_SelectedDateChanged;
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| SelectedDate | DateTimeOffset? | Nullable selected date; `null` by default (shows field names instead of a date). |
| Date | DateTimeOffset | Non-nullable counterpart to `SelectedDate`; defaults to 12/31/1600 when `SelectedDate` is `null`. |
| DayVisible / MonthVisible / YearVisible | bool | Show/hide individual fields. All `true` by default. |
| DayFormat / MonthFormat / YearFormat | string | `DateTimeFormatter` format template/pattern for each field. |
| MinYear / MaxYear | DateTimeOffset | Bounds of selectable years. Defaults to ±100 years from today. |
| SelectedDateChanged / DateChanged | event | Raised when the respective date property changes. |

## Notes

- Package: `Microsoft.UI.Xaml.Controls.DatePicker` (WinUI 3).
- Date properties can't be set as a plain XAML attribute string (no string-to-date conversion); construct `DateTime`/`DateTimeOffset` in code or bind via `{x:Bind}`.
- For a calendar-context picker, use CalendarDatePicker or CalendarView instead.

## Related

- [TimePicker](./time-picker.md)
- [CalendarDatePicker](./calendar-date-picker.md)
