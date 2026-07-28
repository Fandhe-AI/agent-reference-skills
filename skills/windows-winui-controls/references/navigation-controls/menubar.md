# MenuBar

Shows a set of multiple top-level menus in a horizontal row, typically positioned at the top of the app window (a traditional "File / Edit / View" menu bar).

## Signature / Usage

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
        <MenuFlyoutItem Text="Copy"/>
        <MenuFlyoutItem Text="Paste"/>
    </muxc:MenuBarItem>
</muxc:MenuBar>
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| (items) | `IList<MenuBarItem>` | Top-level menus; each `MenuBarItem` is added directly as a child element of `MenuBar`. |

## Notes

- Package: `Microsoft.UI.Xaml.Controls` (WinUI 3). Uses the same `MenuFlyoutItem` / `MenuFlyoutSubItem` / `ToggleMenuFlyoutItem` / `RadioMenuFlyoutItem` / `MenuFlyoutSeparator` building blocks as a single `MenuFlyout` (context menu).
- To show a single inline top-level menu (rather than a horizontal row of menus), use `MenuFlyout` instead.

## Related

- [MenuBarItem](./menubaritem.md)
