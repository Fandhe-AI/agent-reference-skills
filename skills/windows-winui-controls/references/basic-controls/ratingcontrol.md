# RatingControl

Lets users view and set ratings that reflect degrees of satisfaction with content or services. Supports touch, pen, mouse, gamepad, and keyboard interaction.

## Signature / Usage

```xaml
<RatingControl x:Name="MyRating" ValueChanged="RatingChanged"/>
```

```csharp
private void RatingChanged(RatingControl sender, object args)
{
    if (sender.Value == null)
    {
        MyRating.Caption = "(" + SomeWebService.HowManyPreviousRatings() + ")";
    }
    else
    {
        MyRating.Caption = "Your rating";
    }
}
```

Read-only display:

```xaml
<RatingControl IsReadOnly="True"/>
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| Value | double? | The rating value set by the user, or `null` if unset. |
| PlaceholderValue | double | Rating displayed until the value is changed by user interaction or another operation (e.g. an average rating). |
| MaxRating | int | Maximum allowed rating value (default 5). |
| IsClearEnabled | bool | Whether the user can remove/clear the rating. |
| IsReadOnly | bool | Whether the user can change the rating; set `true` to only display a rating. |
| Caption | object | Text label for the control. |
| ValueChanged | event | Occurs when `Value` changes. |

## Notes

- Package: `Microsoft.UI.Xaml.Controls` (WinUI 3). Distinct from the JS `@ark-ui/react` / `@chakra-ui/react` `Rating` and Jetpack Compose community rating components.
- Use `IsReadOnly="True"` for ratings displayed in large virtualized lists, both for UI clarity and performance.
- Additional customization (spacing, `ItemInfo` for custom icons, animation control) is available via the full API reference beyond the properties above.

## Related

- [Slider](./slider.md)
