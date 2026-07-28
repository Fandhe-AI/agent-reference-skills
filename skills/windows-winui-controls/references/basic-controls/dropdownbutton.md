# DropDownButton

A button that shows a chevron indicating it has an attached flyout with more options. Behaves like `Button` with a `Flyout`; only the appearance differs.

## Signature / Usage

```xaml
<DropDownButton ToolTipService.ToolTip="Alignment">
    <TextBlock FontFamily="Segoe MDL2 Assets" FontSize="14" Text="&#xE8E4;"/>
    <DropDownButton.Flyout>
        <MenuFlyout Placement="BottomEdgeAlignedLeft">
            <MenuFlyoutItem Text="Left" Click="AlignmentMenuFlyoutItem_Click"/>
            <MenuFlyoutItem Text="Center" Click="AlignmentMenuFlyoutItem_Click"/>
        </MenuFlyout>
    </DropDownButton.Flyout>
</DropDownButton>
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| Flyout | FlyoutBase | Flyout that opens automatically when the button is clicked (inherited from Button). Set `Placement` on the flyout since the default placement algorithm may not fit. |
| Content | object | The content of the button (inherited from ContentControl). |
| Click | event | Inherited from `ButtonBase`, but typically unused; use the flyout's item invocations instead. |

## Notes

- Package: `Microsoft.UI.Xaml.Controls` (WinUI 3). Inherits from `Button`.
- Use when the button's primary purpose is opening a flyout with more options; the chevron is the visual affordance.

## Related

- [SplitButton](./splitbutton.md)
- [Button](./button.md)
