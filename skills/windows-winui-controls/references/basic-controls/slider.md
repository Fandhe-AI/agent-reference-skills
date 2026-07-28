# Slider

Lets the user select from a range of values by moving a thumb control along a track.

## Signature / Usage

```xaml
<Slider x:Name="volumeSlider" Header="Volume" Width="200"
        Minimum="0" Maximum="10" TickFrequency="2" TickPlacement="BottomRight"
        ValueChanged="Slider_ValueChanged"/>
```

```csharp
private void Slider_ValueChanged(object sender, RangeBaseValueChangedEventArgs e)
{
    media.Volume = ((Slider)sender).Value;
}
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| Value | double | Current value of the slider (inherited from `RangeBase`). |
| Minimum | double | Minimum possible value (inherited from `RangeBase`). |
| Maximum | double | Maximum possible value (inherited from `RangeBase`). |
| SmallChange | double | Amount added/subtracted for small increments (inherited from `RangeBase`). |
| LargeChange | double | Amount added/subtracted for large increments (inherited from `RangeBase`). |
| Orientation | Orientation | `Horizontal` (default) or `Vertical`. |
| StepFrequency | double | Value increment used for discrete steps. |
| TickFrequency | double | Increment of the value range at which tick marks are drawn. |
| TickPlacement | TickPlacement | Where tick marks are drawn relative to the track: `None`, `TopLeft`, `BottomRight`, `Outside`, `Inline`. |
| SnapsTo | SnapsTo | Whether the thumb conforms to step values or tick marks. |
| IsThumbToolTipEnabled | bool | Whether the current value is shown in a tooltip on the thumb. |
| IsDirectionReversed | bool | Reverses the direction of increasing value. |
| Header | object | Label content for the control. |
| ValueChanged | event | Occurs when `Value` changes (inherited from `RangeBase`). |

## Notes

- Package: `Microsoft.UI.Xaml.Controls` (WinUI 3). Inherits from `RangeBase`. Distinct from the JS `@ark-ui/react` / `@chakra-ui/react` `Slider` and Jetpack Compose `Slider`.
- Don't use a slider for binary settings — use `ToggleSwitch` instead. Don't use it as a progress indicator — use `ProgressBar` or `ProgressRing`.
- Use step points (`StepFrequency`) when arbitrary values between min and max shouldn't be allowed.

## Related

- [ProgressBar](./progressbar.md)
- [ToggleSwitch](./toggleswitch.md)
