# TimePicker

A standardized control for picking a time value via a drop-down picker surface (hour/minute/AM-PM columns).

## Signature / Usage

```xaml
<TimePicker x:Name="arrivalTimePicker" Header="Arrival time"/>

<TimePicker Header="24HourClock" SelectedTime="18:21" ClockIdentifier="24HourClock"/>
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| SelectedTime | TimeSpan? | Nullable selected time; `null` by default. |
| Time | TimeSpan | Non-nullable counterpart to `SelectedTime`; defaults to `TimeSpan` of 0 when `SelectedTime` is `null`. |
| ClockIdentifier | string | `"12HourClock"` (default) or `"24HourClock"`. |
| MinuteIncrement | int | Increment shown in the minute picker (e.g. 15 shows only 00, 15, 30, 45). |
| SelectedTimeChanged / TimeChanged | event | Raised when the respective time property changes. |

## Notes

- Package: `Microsoft.UI.Xaml.Controls.TimePicker` (WinUI 3).
- `SelectedTime` is nullable and requires an explicit cast to use with `DateTime` arithmetic; `Time` does not.
- XAML attribute form for `SelectedTime` uses `Hh:Mm` string format (e.g. `"14:15"`; seconds are ignored).

## Related

- [DatePicker](./date-picker.md)
