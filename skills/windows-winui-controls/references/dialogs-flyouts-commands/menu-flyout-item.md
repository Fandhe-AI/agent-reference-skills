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

`SplitMenuFlyoutItem` (derives from `MenuFlyoutItem`; requires Windows App SDK 1.8.6 or later; see [Menus - Add a split menu item](https://learn.microsoft.com/en-us/windows/apps/develop/ui/controls/menus#add-a-split-menu-item) and the [SplitMenuFlyoutItem API](https://learn.microsoft.com/en-us/windows/windows-app-sdk/api/winrt/microsoft.ui.xaml.controls.splitmenuflyoutitem)):

| Name | Type | Description |
|------|------|-------------|
| Items | IList\<MenuFlyoutItemBase\> | Submenu items (XAML content property). Accepts `MenuFlyoutItem`, `MenuFlyoutSeparator`, and nested `SplitMenuFlyoutItem`. When empty, the secondary part is disabled. |
| SubMenuPresenterStyle | Style | Style for the submenu's presenter |
| SubMenuItemStyle | Style | Style for the items in the submenu |
| Click / Command | event / ICommand | Inherited from `MenuFlyoutItem`; run the default action of the primary part |

Split menu item with a default action and variations:

```xaml
<MenuFlyout>
    <SplitMenuFlyoutItem Text="Save" Click="SplitMenuFlyoutItem_Click">
        <SplitMenuFlyoutItem.Icon>
            <FontIcon Glyph="&#xE74E;" />
        </SplitMenuFlyoutItem.Icon>
        <MenuFlyoutItem Text="Save as .docx" Click="SplitMenuFlyoutItem_Click" />
        <MenuFlyoutItem Text="Save as .pdf" Click="SplitMenuFlyoutItem_Click" />
        <MenuFlyoutItem Text="Save as .txt" Click="SplitMenuFlyoutItem_Click" />
    </SplitMenuFlyoutItem>
</MenuFlyout>
```

## Events

| Name | Description |
|------|-------------|
| Click | Occurs when the menu item is clicked |

## Notes

- Package: `Microsoft.UI.Xaml.Controls` (WinUI 3). Distinct from `System.Windows.Controls.MenuItem` (WPF) and the JS `@ark-ui/react` / `@chakra-ui/react` Menu APIs.
- Show a `MenuFlyout` as a context menu via the `ContextFlyout` attached property, or as a general flyout via `FlyoutBase.AttachedFlyout` + `FlyoutBase.ShowAttachedFlyout(element)`.
- `MenuFlyoutItem` is the parent class of `ToggleMenuFlyoutItem`; `RadioMenuFlyoutItem` also derives from it.
- `SplitMenuFlyoutItem` (Windows App SDK 1.8.6+) is a split-button experience in a menu: the primary part performs a default action (`Click` / `Command`, like `MenuFlyoutItem`), the secondary part opens a submenu (like `MenuFlyoutSubItem`). Use it when a command has a common default action and a few variations (e.g. save in different formats). Because it derives from `MenuFlyoutItem`, one `Click` handler can serve both.
- `SplitMenuFlyoutItem` keyboard: on the primary part, Enter/Space runs the action and Right arrow moves to the secondary part; on the secondary part, Enter/Right arrow opens the submenu; Esc/Left arrow closes it. Screen readers announce the two parts separately.
- To build a horizontal top-level menu bar (File/Edit/View style), group `MenuFlyoutItem`/`MenuFlyoutSubItem`/etc. inside `MenuBarItem` elements added to a `MenuBar`, instead of a `MenuFlyout`.
- Consider `CommandBarFlyout` instead of `MenuFlyout` when commands benefit from being shown as a single horizontal row of primary commands (e.g. text selection context menus).

## Related

- [Flyout](./flyout.md)
- [CommandBarFlyout](./command-bar-flyout.md)
- [CommandBar](./command-bar.md)
