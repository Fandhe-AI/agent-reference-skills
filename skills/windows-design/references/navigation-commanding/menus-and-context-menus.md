# Menus and context menus

Guidance on choosing between a menu and a context menu, and which control (`MenuFlyout` vs. `CommandBarFlyout`) to use for each.

## Signature / Usage

```xaml
<!-- Context menu: attached via ContextFlyout, invoked by right-click / press-and-hold -->
<TextBox>
    <TextBox.ContextFlyout>
        <MenuFlyout>
            <MenuFlyoutItem Text="Cut" Icon="Cut"/>
            <MenuFlyoutItem Text="Copy" Icon="Copy"/>
            <MenuFlyoutItem Text="Paste" Icon="Paste"/>
        </MenuFlyout>
    </TextBox.ContextFlyout>
</TextBox>
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| ContextFlyout | attached property | Associates a context menu (`MenuFlyout` or `CommandBarFlyout`) with an element; invoked by right-click or press-and-hold |
| Flyout / FlyoutBase.AttachedFlyout | property | Associates a menu with a button or element; invoked by left-click or tap |
| MenuFlyout | class | Single flyout menu control, used for menus and for simple context menus |
| CommandBarFlyout | class | Recommended for context menus with common commands (Copy/Cut/Paste, etc.); displays as a single horizontal row |
| MenuBar | class | Groups multiple top-level menus (e.g. File/Edit/View) in a horizontal row at the top of the window |

### When should you use a menu or a context menu?

- If the host element is a button or other command element whose primary role is to present additional commands, use a **menu**.
- If the host element's primary purpose is something else (presenting text or an image), use a **context menu** for secondary commands like Cut/Copy/Paste.

### Context menus

- Attached to a single element and display secondary commands.
- Invoked by right-clicking (or press-and-hold).
- Associated with an element via its `ContextFlyout` property.
- For common commands (Copy, Cut, Paste, Delete, Share, text selection), use `CommandBarFlyout` so they display as a single horizontal row; it's the recommended default over `MenuFlyout` because it offers more functionality and can still show only secondary commands.

### Menus

- Have a single, always-displayed entry point (e.g. a File menu).
- Usually attached to a button or a parent menu item.
- Invoked by left-clicking (or tapping).
- Associated via `Button.Flyout` / `FlyoutBase.AttachedFlyout`, or grouped in a `MenuBar` at the top of the window.
- Use `MenuFlyout` for a single top-level menu; use `MenuBar` when you need multiple top-level menus shown in a horizontal row.

## Notes

- If a command is used frequently and there's screen space, place it directly in its own element (e.g. a `CommandBar` button) instead of behind a menu.
- To display arbitrary content such as a notification or confirmation request, use a dialog or flyout instead of a menu.
- Package: `Microsoft.UI.Xaml.Controls` (WinUI 3): `MenuFlyout`, `CommandBarFlyout`, `ContextFlyout` property.

## Related

- [Menu flyout and menu bar](./menus.md)
- [Command bar](./command-bar.md)
- [Commanding](./commanding.md)
