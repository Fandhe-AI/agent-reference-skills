# Menu flyout and menu bar

`MenuFlyout` shows a single, inline top-level menu (with items and sub-menus), used as either a menu or a context menu. `MenuBar` shows a set of multiple top-level menus in a horizontal row (typically at the top of the app window).

## Signature / Usage

```xaml
<Rectangle Height="100" Width="100">
  <Rectangle.ContextFlyout>
    <MenuFlyout>
      <MenuFlyoutItem Text="Change color" Click="ChangeColorItem_Click" />
    </MenuFlyout>
  </Rectangle.ContextFlyout>
</Rectangle>
```

```xaml
<muxc:MenuBar>
    <muxc:MenuBarItem Title="File">
        <MenuFlyoutItem Text="Open..."/>
        <MenuFlyoutItem Text="Save"/>
        <MenuFlyoutSeparator />
        <MenuFlyoutItem Text="Exit"/>
    </muxc:MenuBarItem>
    <muxc:MenuBarItem Title="Edit">
        <MenuFlyoutItem Text="Undo"/>
        <MenuFlyoutItem Text="Cut"/>
    </muxc:MenuBarItem>
</muxc:MenuBar>
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| MenuFlyoutItem | element | Performs an immediate action |
| MenuFlyoutSubItem | element | Contains a cascading list of menu items |
| ToggleMenuFlyoutItem | element | Switches an option on or off |
| RadioMenuFlyoutItem | element | Switches between mutually exclusive items (set `GroupName`) |
| MenuFlyoutSeparator | element | Visually separates menu items |
| UIElement.ContextFlyout | property | Attaches a `MenuFlyout` as a context menu |
| FlyoutBase.AttachedFlyout | attached property | Attaches a `MenuFlyout` to show programmatically via `FlyoutBase.ShowAttachedFlyout` |
| LightDismissOverlayMode | enum | `Auto` (default; dims on Xbox only), `On`, or `Off` |

## Icons

Provide icons for the most commonly used items, items with a standard or well-known icon, or items whose icon clearly illustrates the command. Don't add icons just to fill space — cryptic icons create clutter. `MenuFlyoutItem` icons render at 16x16px.

## Notes

- Package: `Microsoft.UI.Xaml.Controls.MenuFlyout`, `MenuBar`, `MenuBarItem` (WinUI 3). Distinct from Ark UI / Chakra UI `Menu`, and HTML `<menu>`.
- To decide when to use a menu flyout vs. a context menu vs. a `CommandBarFlyout`, see [Menus and context menus](./menus-and-context-menus.md).

## Related

- [Menus and context menus](./menus-and-context-menus.md)
- [Commanding](./commanding.md)
- [Command bar](./command-bar.md)
