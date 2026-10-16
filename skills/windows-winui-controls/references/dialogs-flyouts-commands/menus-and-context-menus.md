# Menus and context menus

Guidance on choosing between a menu and a context menu. Both display an organized list of commands or options and save space by hiding until the user needs them, but they differ in how they are created and how the user invokes them.

## Signature / Usage

```text
Context menu: UIElement.ContextFlyout -> CommandBarFlyout (preferred) or MenuFlyout
Menu:         Button.Flyout / FlyoutBase.AttachedFlyout -> MenuFlyout
              (multiple top-level menus: MenuBar)
```

## Options / Props

| Aspect | Context menu | Menu |
|--------|--------------|------|
| Attached to | A single element; displays secondary commands | A button or parent menu item; has a single always-displayed entry point (e.g. a File menu at the top of the screen) |
| Invoked by | Right-click, or equivalent (press and hold) | Left-click, or equivalent (tap) |
| Associated via | `UIElement.ContextFlyout` | `Button.Flyout`, `FlyoutBase.AttachedFlyout`, or grouped in a menu bar at the top of the app window |
| Host element | An element whose primary purpose is something else (text, image) | A command element whose primary role is to present additional commands |
| Control to use | `CommandBarFlyout` (preferred) or `MenuFlyout` | `MenuFlyout` for a single top-level menu; `MenuBar` for multiple top-level menus in a horizontal row |

## Notes

- Package: `Microsoft.UI.Xaml.Controls` (WinUI 3). Distinct from the JS `@ark-ui/react` / `@chakra-ui/react` Menu APIs.
- Menus and context menus are for organizing commands. To display arbitrary content, such as a notification or confirmation request, use a dialog or a flyout.
- If a command is used frequently and space is available, place it directly in its own element instead of behind a menu.
- Context menu with common commands (Copy, Cut, Paste, Delete, Share, text selection): use `CommandBarFlyout` and group them as primary commands so they show as a single horizontal row.
- Context menu without common commands: either `CommandBarFlyout` or `MenuFlyout` works. `CommandBarFlyout` is recommended because it provides more functionality and can match `MenuFlyout` look and behavior using only secondary commands.
- For apps needing more organization or grouping, a menu bar is a quick way to show multiple top-level menus. Each `MenuFlyout` can host menu items and sub-menus.
- Source: https://learn.microsoft.com/en-us/windows/apps/develop/ui/controls/menus-and-context-menus (ms.date 2026-10-13).

## Related

- [CommandBarFlyout](./command-bar-flyout.md)
- [MenuFlyout / MenuFlyoutItem](./menu-flyout-item.md)
- [Flyout](./flyout.md)
- [ContentDialog](./content-dialog.md)
