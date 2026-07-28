# CommandBarFlyout

A floating toolbar of commands related to an element on the UI canvas. Derives from `FlyoutBase`, and like `CommandBar` exposes `PrimaryCommands` and `SecondaryCommands`. Has two display modes: *collapsed* (primary commands only) and *expanded* (primary + secondary commands).

## Signature / Usage

```xaml
<Grid>
    <Grid.Resources>
        <CommandBarFlyout x:Name="ImageCommandsFlyout">
            <AppBarButton Label="Favorite" Icon="OutlineStar" ToolTipService.ToolTip="Favorite"/>
            <AppBarButton Label="Copy" Icon="Copy" ToolTipService.ToolTip="Copy"/>
            <AppBarButton Label="Share" Icon="Share" ToolTipService.ToolTip="Share"/>
            <CommandBarFlyout.SecondaryCommands>
                <AppBarButton Label="Rotate" Icon="Rotate"/>
                <AppBarButton Label="Delete" Icon="Delete"/>
            </CommandBarFlyout.SecondaryCommands>
        </CommandBarFlyout>
    </Grid.Resources>

    <Image Source="Assets/image1.png" Width="300"
           Tapped="Image_Tapped"
           FlyoutBase.AttachedFlyout="{x:Bind ImageCommandsFlyout}"
           ContextFlyout="{x:Bind ImageCommandsFlyout}"/>
</Grid>
```

```csharp
private void Image_Tapped(object sender, TappedRoutedEventArgs e)
{
    var flyout = FlyoutBase.GetAttachedFlyout((FrameworkElement)sender);
    var options = new FlyoutShowOptions()
    {
        Position = e.GetPosition((FrameworkElement)sender),
        ShowMode = FlyoutShowMode.Transient // opens collapsed, without taking focus
    };
    flyout?.ShowAt((FrameworkElement)sender, options);
}
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| PrimaryCommands | IObservableVector\<ICommandBarElement\> | Commands visible in both collapsed and expanded modes; do not auto-overflow (may be truncated) |
| SecondaryCommands | IObservableVector\<ICommandBarElement\> | Commands visible only in expanded mode, shown as a menu |
| AlwaysExpanded | bool | Keeps secondary commands visible at all times and hides the "see more" [...] button |
| Placement | FlyoutPlacementMode | Inherited from `FlyoutBase` |
| ShowMode | FlyoutShowMode | `Standard` (expanded, takes focus — reactive/context-menu use) or `Transient` / `TransientWithDismissOnPointerMoveAway` (collapsed, no focus — proactive use) |
| LightDismissOverlayMode | LightDismissOverlayMode | Inherited from `FlyoutBase` |

## Notes

- Package: `Microsoft.UI.Xaml.Controls` (WinUI 3). Distinct from the JS `@ark-ui/react` / `@chakra-ui/react` Menu/Toolbar APIs.
- Recommended control for context menus: assign to `UIElement.ContextFlyout` for reactive invocation (right-click), or show programmatically for proactive invocation (e.g. on text selection).
- `TextCommandBarFlyout` is a specialized subclass automatically used by text controls (`TextBox`, `TextBlock`, `RichEditBox`, `RichTextBlock`, `PasswordBox`) for Cut/Copy/Paste/etc.; assign a custom `CommandBarFlyout` to `SelectionFlyout` or `ContextFlyout` to replace it.
- `PrimaryCommands`/`SecondaryCommands` accept `AppBarButton`, `AppBarToggleButton`, `AppBarSeparator` directly, or other elements wrapped in `AppBarElementContainer`.

## Related

- [CommandBar](./command-bar.md)
- [Flyout](./flyout.md)
- [MenuFlyout / MenuFlyoutItem](./menu-flyout-item.md)
