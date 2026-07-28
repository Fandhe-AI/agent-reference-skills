# Command bar

Gives users easy access to an app's most common tasks. Can hold both simple commands (`AppBarButton`, `AppBarToggleButton`, `AppBarSeparator`) and complex content, and can be used with any navigation pattern.

## Signature / Usage

```xaml
<CommandBar>
    <AppBarToggleButton Icon="Shuffle" Label="Shuffle" Click="AppBarButton_Click" />
    <AppBarSeparator/>
    <AppBarButton Icon="Play" Label="Play" Click="AppBarButton_Click"/>

    <CommandBar.SecondaryCommands>
        <AppBarButton Label="Like" Click="AppBarButton_Click"/>
    </CommandBar.SecondaryCommands>

    <CommandBar.Content>
        <TextBlock Text="Now playing..." Margin="12,14"/>
    </CommandBar.Content>
</CommandBar>
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| PrimaryCommands | collection | Commands shown directly in the bar, in order of importance; move to overflow as space shrinks |
| SecondaryCommands | collection | Commands shown only in the overflow ("see more" `...`) menu |
| Content | object | Arbitrary content aligned to the left side of the bar |
| DefaultLabelPosition | enum | Position of `AppBarButton` labels, e.g. `Right` on wide windows for better legibility |
| ClosedDisplayMode | AppBarClosedDisplayMode | `Compact` (default, icons + overflow button), `Minimal` (thin bar only), or `Hidden` |
| IsDynamicOverflowEnabled | bool | Whether primary commands move into overflow automatically as width changes |
| IsSticky | bool | Keeps the bar open until explicitly closed instead of light-dismissing |

## Placement

- Small handheld devices: position at the bottom of the screen for reachability.
- Larger screens: position near the top for noticeability and discoverability.
- Command bars can also be placed inline in a layout control (e.g. a `Grid` row).
- If the command bar must stay visible when the on-screen keyboard (SIP) appears, assign it to `Page.BottomAppBar`.

## Notes

- Package: `Microsoft.UI.Xaml.Controls.CommandBar`, `AppBarButton`, `AppBarToggleButton`, `AppBarSeparator` (WinUI 3). On the smallest screens (320 epx), a maximum of 4 primary commands fit before overflowing.
- We recommend placing Accept/Yes/OK to the left of Reject/No/Cancel for consistency with user expectations.

## Related

- [Commanding](./commanding.md)
- [Menu flyout and menu bar](./menus.md)
- [Menus and context menus](./menus-and-context-menus.md)
- [Access keys](./access-keys.md)
