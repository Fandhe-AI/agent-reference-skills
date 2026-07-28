# Popup

Displays content on top of existing content, within the bounds of the application window. Low-level primitive that underlies `Flyout`, `MenuFlyout`, `ContentDialog`, and `TeachingTip`.

## Signature / Usage

```xaml
<Popup x:Name="MyPopup" HorizontalOffset="20" VerticalOffset="20" IsLightDismissEnabled="True">
    <Border Background="LightGray" Padding="12">
        <TextBlock Text="Popup content"/>
    </Border>
</Popup>
```

```csharp
MyPopup.IsOpen = true;
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| Child | UIElement | Content hosted in the popup |
| IsOpen | bool | Shows/hides the popup |
| HorizontalOffset / VerticalOffset | double | Distance from the left/top of the application window to the left/top of the popup |
| IsLightDismissEnabled | bool | Determines whether the popup can be dismissed via light-dismiss (tap outside, ESC, etc.) |
| XamlRoot | XamlRoot | The `XamlRoot` in which the popup is viewed (inherited from `UIElement`) |

## Events

| Name | Description |
|------|-------------|
| Opened | Fires when `IsOpen` is set to `true` |
| Closed | Fires when `IsOpen` is set to `false` |

## Notes

- Package: `Microsoft.UI.Xaml.Controls.Primitives` (WinUI 3). Distinct from `System.Windows.Controls.Primitives.Popup` (WPF) and Jetpack Compose `Popup`.
- Low-level primitive; prefer `Flyout`, `MenuFlyout`, `TeachingTip`, or `ContentDialog` for most scenarios — use `Popup` directly only for custom overlay UI not covered by those controls.
- As with other WinUI 3 top-level UI, `XamlRoot` typically needs to be set when the popup isn't already part of a XAML tree that provides it.

## Related

- [Flyout](./flyout.md)
- [ContentDialog](./content-dialog.md)
- [TeachingTip](./teaching-tip.md)
