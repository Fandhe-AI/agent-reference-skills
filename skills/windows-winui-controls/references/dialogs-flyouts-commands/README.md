# Dialogs, Flyouts & Commands

| Name | Description | Path |
|------|-------------|------|
| AppBarButton | A templated button control designed to be displayed in an `AppBar`, `CommandBar`, or `CommandBarFlyout`. | [app-bar-button.md](./app-bar-button.md) |
| AppBarSeparator | A vertical line element used to visually separate items in an `AppBar`, `CommandBar`, or `CommandBarFlyout`. | [app-bar-separator.md](./app-bar-separator.md) |
| AppBarToggleButton | A templated button control, similar to `AppBarButton`, that can be switched between checked and unchecked states. Designed for use in an `AppBar`, `CommandBar`, or `CommandBarFlyout`. | [app-bar-toggle-button.md](./app-bar-toggle-button.md) |
| CommandBarFlyout | A floating toolbar of commands related to an element on the UI canvas. Derives from `FlyoutBase`, and like `CommandBar` exposes `PrimaryCommands` and `SecondaryCommands`. | [command-bar-flyout.md](./command-bar-flyout.md) |
| CommandBar | A general-purpose, flexible app bar that gives users easy access to an app's most common tasks, showing app-level or page-specific commands via `AppBarButton`, `AppBarToggleButton`, and `AppBarSeparator` elements. | [command-bar.md](./command-bar.md) |
| ContentDialog | Customizable modal dialog box that can contain checkboxes, hyperlinks, buttons, and any other XAML content. Inherits from `ContentControl`. | [content-dialog.md](./content-dialog.md) |
| Flyout | A light-dismiss container that shows arbitrary XAML content. Inherits from `FlyoutBase`. Flyouts can be nested to create cascading experiences. | [flyout.md](./flyout.md) |
| InfoBadge | A small piece of UI (dot, icon, or number) that draws non-intrusive attention to an area of the app, such as a `NavigationViewItem` or any standalone control. | [info-badge.md](./info-badge.md) |
| InfoBar | An inline, non-intrusive notification for app-wide status messages. Unlike a dialog or flyout, an `InfoBar` takes up space in the layout like any other child element instead of floating on top of content. | [info-bar.md](./info-bar.md) |
| MenuFlyout / MenuFlyoutItem | `MenuFlyout` shows a single inline top-level menu of commands. `MenuFlyoutItem` represents an immediate-action command inside a `MenuFlyout` (or `MenuBar`). | [menu-flyout-item.md](./menu-flyout-item.md) |
| Menus and context menus | Guidance on choosing between a menu and a context menu. Both display an organized list of commands or options and save space by hiding until the user needs them, but they differ in how they are created and how the user invokes them. | [menus-and-context-menus.md](./menus-and-context-menus.md) |
| MessageDialog | Legacy UWP dialog for showing simple messages/questions to the user. Part of `Windows.UI.Popups`. | [message-dialog.md](./message-dialog.md) |
| Popup | Displays content on top of existing content, within the bounds of the application window. Low-level primitive that underlies `Flyout`, `MenuFlyout`, `ContentDialog`, and `TeachingTip`. | [popup.md](./popup.md) |
| TeachingTip | A semi-persistent, content-rich flyout used to inform, remind, or teach users about important or new features. Can target a specific UI element with a tail, or be shown without a target. | [teaching-tip.md](./teaching-tip.md) |
| ToolTip / ToolTipService | `ToolTip` is a popup that shows supplemental info about another control; it must be assigned to an owner element. `ToolTipService` provides the attached property and static methods used to assign and control tooltips. | [tool-tip.md](./tool-tip.md) |
