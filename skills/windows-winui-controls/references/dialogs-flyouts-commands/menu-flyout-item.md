# MenuFlyout / MenuFlyoutItem

`MenuFlyout` shows a single inline top-level menu of commands. `MenuFlyoutItem` represents an immediate-action command inside a `MenuFlyout` (or `MenuBar`). Related item types: `MenuFlyoutSubItem` (cascading submenu), `ToggleMenuFlyoutItem` (on/off), `RadioMenuFlyoutItem` (mutually exclusive group), `MenuFlyoutSeparator`.

## Signature / Usage

```xaml
<Rectangle Height="100" Width="100">
  <Rectangle.ContextFlyout>
    <MenuFlyout>
      <MenuFlyoutItem Text="Change color" Click="ChangeColorItem_Click" />
      <MenuFlyoutItem Text="Share">
        <MenuFlyoutItem.Icon>
          <FontIcon Glyph="&#xE72D;" />
        </MenuFlyoutItem.Icon>
      </MenuFlyoutItem>
      <MenuFlyoutItem Text="Copy" Icon="Copy" />
      <MenuFlyoutSeparator />
      <MenuFlyoutItem Text="Delete" Icon="Delete" />
    </MenuFlyout>
  </Rectangle.ContextFlyout>
</Rectangle>
```

```csharp
private void ChangeColorItem_Click(object sender, RoutedEventArgs e) { /* ... */ }
```

## Options / Props

`MenuFlyout` (inherits `FlyoutBase`, see Flyout):

| Name | Type | Description |
|------|------|-------------|
| Items | IList\<MenuFlyoutItemBase\> | Collection of `MenuFlyoutItem` / `MenuFlyoutSubItem` / `ToggleMenuFlyoutItem` / `RadioMenuFlyoutItem` / `MenuFlyoutSeparator` |
| LightDismissOverlayMode | LightDismissOverlayMode | Inherited from `FlyoutBase`; controls the Xbox dimming overlay |

`MenuFlyoutItem`:

| Name | Type | Description |
|------|------|-------------|
| Text | string | Text content of the menu item (content property, can be set as inner text) |
| Icon | IconElement | Graphic content shown at 16x16px; `SymbolIcon`/`FontIcon`/`PathIcon` scale automatically |
| Command | ICommand | Command to invoke when the item is pressed |
| CommandParameter | object | Parameter passed to `Command` |
| KeyboardAcceleratorTextOverride | string | Overrides the displayed text for the item's keyboard accelerator |

## Events

| Name | Description |
|------|-------------|
| Click | Occurs when the menu item is clicked |

## Notes

- Package: `Microsoft.UI.Xaml.Controls` (WinUI 3). Distinct from `System.Windows.Controls.MenuItem` (WPF) and the JS `@ark-ui/react` / `@chakra-ui/react` Menu APIs.
- Show a `MenuFlyout` as a context menu via the `ContextFlyout` attached property, or as a general flyout via `FlyoutBase.AttachedFlyout` + `FlyoutBase.ShowAttachedFlyout(element)`.
- `MenuFlyoutItem` is the parent class of `ToggleMenuFlyoutItem`; `RadioMenuFlyoutItem` and `SplitMenuFlyoutItem` also derive from it.
- To build a horizontal top-level menu bar (File/Edit/View style), group `MenuFlyoutItem`/`MenuFlyoutSubItem`/etc. inside `MenuBarItem` elements added to a `MenuBar`, instead of a `MenuFlyout`.
- Consider `CommandBarFlyout` instead of `MenuFlyout` when commands benefit from being shown as a single horizontal row of primary commands (e.g. text selection context menus).

## Related

- [Flyout](./flyout.md)
- [CommandBarFlyout](./command-bar-flyout.md)
- [CommandBar](./command-bar.md)
