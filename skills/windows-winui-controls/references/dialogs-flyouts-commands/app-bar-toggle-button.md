# AppBarToggleButton

A templated button control, similar to `AppBarButton`, that can be switched between checked and unchecked states. Designed for use in an `AppBar`, `CommandBar`, or `CommandBarFlyout`.

## Signature / Usage

```xaml
<CommandBar>
    <AppBarToggleButton Icon="Shuffle" Label="Shuffle" Click="AppBarButton_Click"/>
    <AppBarToggleButton Icon="RepeatAll" Label="Repeat" Click="AppBarButton_Click"/>
</CommandBar>
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| Label | string | Text displayed on the button |
| Icon | IconElement | Image shown on the button (same icon types/sizing as `AppBarButton`) |
| IsChecked | bool | Whether the toggle button is currently checked |
| IsCompact | bool | Whether the label is hidden and padding reduced |
| LabelPosition | CommandBarLabelPosition | Placement/visibility of the label |

## Events

| Name | Description |
|------|-------------|
| Click | Occurs when the button is clicked, toggling `IsChecked` |
| Checked | Occurs when `IsChecked` becomes `true` |
| Unchecked | Occurs when `IsChecked` becomes `false` |

## Notes

- Package: `Microsoft.UI.Xaml.Controls` (WinUI 3). Distinct from Jetpack Compose `IconToggleButton` and the JS `@ark-ui/react` / `@chakra-ui/react` toggle primitives.
- Implements `ICommandBarElement`, so it can be added directly to `CommandBar` / `CommandBarFlyout` primary/secondary command collections.

## Related

- [AppBarButton](./app-bar-button.md)
- [AppBarSeparator](./app-bar-separator.md)
- [CommandBar](./command-bar.md)
