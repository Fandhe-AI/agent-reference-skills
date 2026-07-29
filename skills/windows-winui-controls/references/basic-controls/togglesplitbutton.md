# ToggleSplitButton

A button with two parts that can be invoked separately: one part behaves like a toggle button that can be on or off, the other opens a flyout with additional options.

## Signature / Usage

```xaml
<ToggleSplitButton x:Name="ListButton"
                   ToolTipService.ToolTip="List style"
                   Click="ListButton_Click"
                   IsCheckedChanged="ListStyleButton_IsCheckedChanged">
    <TextBlock FontFamily="Segoe MDL2 Assets" FontSize="14" Text="&#xE8FD;"/>
    <ToggleSplitButton.Flyout>
        <Flyout>
            <ListView x:Name="ListStylesListView"
                      SelectionChanged="ListStylesListView_SelectionChanged"
                      SingleSelectionFollowsFocus="False"/>
        </Flyout>
    </ToggleSplitButton.Flyout>
</ToggleSplitButton>
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| IsChecked | bool | Gets or sets whether the toggle part of the button is checked. Unlike `ToggleButton.IsChecked`, this is a plain `bool`, not a nullable `bool`. |
| IsCheckedChanged | event | Occurs when the value of `IsChecked` changes. Handler signature: `(ToggleSplitButton sender, ToggleSplitButtonIsCheckedChangedEventArgs args)`. This is the only toggle-state event; there are no separate `Checked`/`Unchecked` events. |
| Flyout | FlyoutBase | Flyout opened by the secondary (drop-down) part of the button. Default `Placement` is `BottomEdgeAlignedLeft` and cannot be overridden. (Inherited from `SplitButton`.) |
| Command | ICommand | Command to invoke when the primary (toggle) part is pressed. (Inherited from `SplitButton`.) |
| CommandParameter | object | Parameter passed to `Command`. (Inherited from `SplitButton`.) |
| Content | object | Content of the primary (toggle) part. (Inherited from `ContentControl` via `SplitButton`.) |
| Click | event | Occurs when the primary part is invoked. (Inherited from `SplitButton`.) |

## Notes

- Package: `Microsoft.UI.Xaml.Controls` (WinUI 3). Derives directly from `SplitButton` (not from `ToggleButton`), so it has no `IsThreeState` property or `Indeterminate` state/event.
- Typical use: enable/disable a feature that also has multiple options to choose from (e.g. toggle list formatting on/off while the flyout selects the list style).
- With touch input, both halves invoke the flyout (drop-down-button behavior); with mouse/keyboard, the toggle half and the flyout half can be invoked separately. Because of this, the flyout content should include an option to toggle the button on/off for touch users.
- Set `SingleSelectionFollowsFocus="False"` on list/grid controls used inside the flyout so keyboard navigation works without prematurely invoking the item.

## Related

- [SplitButton](./splitbutton.md)
- [ToggleButton](./togglebutton.md)
- [DropDownButton](./dropdownbutton.md)
