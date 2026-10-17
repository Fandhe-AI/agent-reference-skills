# menus-tray

| Name | Description | Path |
|------|-------------|------|
| Dock (macOS) | Control your app in the macOS dock. Process: Main. This class is not exported from the `'electron'` module; it is only available as a return value of other methods in the Electron API (`app.dock`). | [dock.md](./dock.md) |
| globalShortcut | Detect keyboard events when the application does not have keyboard focus. Process: Main. | [global-shortcut.md](./global-shortcut.md) |
| MenuItem | Add items to native application menus and context menus. Process: Main. See Menu for examples. | [menu-item.md](./menu-item.md) |
| Menu | Create application menus and context menus. Process: Main. | [menu.md](./menu.md) |
| ShareMenu (macOS) | Create a Share Menu on macOS, used to share information from the current context to apps, social media accounts, and other services. Process: Main. | [share-menu.md](./share-menu.md) |
| Windows taskbar structures (JumpListCategory, JumpListItem, Task, ThumbarButton) | Object structures used by the Windows Jump List and thumbnail toolbar APIs (`app.setJumpList`, `app.setUserTasks`, `win.setThumbarButtons`). | [taskbar-structures.md](./taskbar-structures.md) |
| TouchBar items: Scrubber, SegmentedControl, Slider | Advanced TouchBar item classes. Process: Main. None of these classes is exported from the `'electron'` module; they are reached through `TouchBar` static properties. | [touch-bar-items-advanced.md](./touch-bar-items-advanced.md) |
| TouchBar items: Button, Label, ColorPicker, Group, Popover, Spacer, OtherItemsProxy | Basic TouchBar item classes. Process: Main. None of these classes is exported from the `'electron'` module; they are reached through `TouchBar` static properties. | [touch-bar-items-basic.md](./touch-bar-items-basic.md) |
| TouchBar (macOS) | Create TouchBar layouts for native macOS applications. Process: Main. | [touch-bar.md](./touch-bar.md) |
| Tray | Add icons and context menus to the system's notification area. Process: Main. `Tray` is an EventEmitter. | [tray.md](./tray.md) |
