# FullScreenPresenter

Displays an app window using a full-screen configuration (`Microsoft.UI.Windowing.FullScreenPresenter`). The window has no border or title bar, and hides the system taskbar by default.

## Signature / Usage

```csharp
using Microsoft.UI.Windowing;

appWindow.SetPresenter(FullScreenPresenter.Create());
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `Kind` | `AppWindowPresenterKind` (read-only, inherited) | Always `FullScreen`. |

**Methods**: `Create()` — creates a new instance.

## Notes

- Full-screen mode is not the same as maximized: the app takes up the entire screen, and title bar/status bar/taskbar are hidden. The user can still swipe to invoke taskbar, Task View, Action Center, or the title bar.
- Full-screen state is preserved across app switching.
- Package: `Microsoft.UI.Windowing` (Windows App SDK / WinUI 3).

## Related

- [AppWindowPresenter](./app-window-presenter.md)
- [CompactOverlayPresenter](./compact-overlay-presenter.md)
- [Title bar customization](./title-bar-customization.md)
