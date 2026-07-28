# OverlappedPresenter

Displays an app window using an overlapped configuration (`Microsoft.UI.Windowing.OverlappedPresenter`) — the standard window that can overlap and be overlapped by other windows, resized, repositioned, maximized, minimized, and restored. This is the default presenter for new windows, in the `Restored` state.

## Signature / Usage

```csharp
using Microsoft.UI.Windowing;

OverlappedPresenter presenter = OverlappedPresenter.Create();
presenter.PreferredMinimumWidth = 420;
presenter.PreferredMinimumHeight = 550;
appWindow.SetPresenter(presenter);

presenter.SetBorderAndTitleBar(hasBorder: true, hasTitleBar: true);
presenter.Maximize();
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `HasBorder` | `bool` (read-only) | Whether the window has a border. Set via `SetBorderAndTitleBar`. |
| `HasTitleBar` | `bool` (read-only) | Whether the window has a title bar. Set via `SetBorderAndTitleBar`. |
| `IsAlwaysOnTop` | `bool` | Whether the window stays on top of other windows. |
| `IsMaximizable` | `bool` | Whether the window can be maximized (hides the button if `false`). |
| `IsMinimizable` | `bool` | Whether the window can be minimized (hides the button if `false`). |
| `IsModal` | `bool` | Whether the window is modal (requires an owner window; throws otherwise). |
| `IsResizable` | `bool` | Whether the window can be resized by the user. |
| `PreferredMaximumHeight` / `PreferredMaximumWidth` | `int?` | Constrains max resize size (also constrains maximized state). |
| `PreferredMinimumHeight` / `PreferredMinimumWidth` | `int?` | Constrains min resize size. |
| `RequestedStartupState` | `OverlappedPresenterState` (read-only) | State applied when `AppWindow.ShowOnceWithRequestedStartupState` is called. |
| `State` | `OverlappedPresenterState` (read-only) | Current state (`Maximized`, `Minimized`, `Restored`). |

**Methods**: `Create()`, `CreateForContextMenu()`, `CreateForDialog()`, `CreateForToolWindow()` (pre-populated property sets), `Maximize()`, `Minimize([bool activate])`, `Restore([bool activate])`, `SetBorderAndTitleBar(bool hasBorder, bool hasTitleBar)`.

## Notes

- An `OverlappedPresenter` cannot have `HasTitleBar = true` while `HasBorder = false` — throws "Invalid combination: Border=false, TitleBar=true."
- Setting `IsMaximizable`/`IsMinimizable`/`IsResizable` to `false` only hides UI affordances; it does not block programmatic `Maximize()`/`Minimize()`/`AppWindow.Resize()` calls.
- `IsModal = true` requires an owner window to be set (via Win32 interop), otherwise throws "The window should have an owner when IsModal=true."
- Package: `Microsoft.UI.Windowing` (Windows App SDK / WinUI 3).

## Related

- [AppWindowPresenter](./app-window-presenter.md)
- [AppWindow](./app-window.md)
