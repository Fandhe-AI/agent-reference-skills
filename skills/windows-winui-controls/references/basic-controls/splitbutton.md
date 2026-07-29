# SplitButton

A button with two parts that can be invoked separately: one side behaves like a standard button and invokes an immediate action, the other opens a flyout with additional options.

## Signature / Usage

```xaml
<SplitButton ToolTipService.ToolTip="Foreground color" Click="BrushButtonClick">
    <Border x:Name="SelectedColorBorder" Width="20" Height="20"/>
    <SplitButton.Flyout>
        <Flyout x:Name="BrushFlyout">
            <GridView ItemsSource="{x:Bind ColorOptions}"
                      SelectionChanged="BrushSelectionChanged"
                      SingleSelectionFollowsFocus="False"/>
        </Flyout>
    </SplitButton.Flyout>
</SplitButton>
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| Flyout | FlyoutBase | Flyout opened by the secondary (drop-down) part of the button. Default `Placement` is `BottomEdgeAlignedLeft` and cannot be overridden. |
| Command | ICommand | Command to invoke when the primary (button) part is pressed. |
| CommandParameter | object | Parameter passed to `Command`. |
| Content | object | Content of the primary (button) part. |
| Click | event | Occurs when the primary part is invoked. |

## Notes

- Package: `Microsoft.UI.Xaml.Controls` (WinUI 3). Inherits directly from `ContentControl`, not `Button`.
- With touch input, both halves invoke the flyout (drop-down-button behavior); with mouse/keyboard, the two halves can be invoked separately.
- `ToggleSplitButton` (derived class, two-state variant of `SplitButton`) is documented separately.
- Set `SingleSelectionFollowsFocus="False"` on list/grid controls used inside the flyout so keyboard navigation works without prematurely invoking the item.

## Related

- [ToggleSplitButton](./togglesplitbutton.md)
- [DropDownButton](./dropdownbutton.md)
- [Button](./button.md)
