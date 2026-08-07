# AppWindow

Represents a system-managed container for the content of an app (`Microsoft.UI.Windowing.AppWindow`). There's a 1:1 mapping between an `AppWindow` and a top-level HWND.

## Signature / Usage

```csharp
using Microsoft.UI;
using Microsoft.UI.Windowing;
using WinRT.Interop;

// Get AppWindow for a XAML Window (WASDK 1.4+)
AppWindow appWindow = this.AppWindow;

// Or via interop (WASDK < 1.4, or non-WinUI frameworks)
IntPtr hWnd = WindowNative.GetWindowHandle(this);
WindowId windowId = Win32Interop.GetWindowIdFromWindow(hWnd);
AppWindow appWindow2 = AppWindow.GetFromWindowId(windowId);

appWindow.Resize(new Windows.Graphics.SizeInt32(1200, 800));
appWindow.Move(new Windows.Graphics.PointInt32(100, 100));
appWindow.SetPresenter(AppWindowPresenterKind.Default);
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `Id` | `WindowId` (read-only) | Identifier for the app window. |
| `OwnerWindowId` | `WindowId` (read-only) | Identifier of the owner window, or 0 if not owned. |
| `Position` | `PointInt32` (read-only) | Current position in screen coordinates. |
| `Size` | `SizeInt32` (read-only) | Current size in screen coordinates. |
| `ClientSize` | `SizeInt32` (read-only) | Size of the client area in Win32 client coordinates. |
| `Presenter` | `AppWindowPresenter` (read-only) | Currently applied presenter. |
| `Title` | `string` | Displayed title of the app window. |
| `TitleBar` | `AppWindowTitleBar` (read-only) | Title bar of the app window. |
| `IsVisible` | `bool` (read-only) | Whether the window is shown. |
| `IsShownInSwitchers` | `bool` | Whether the window appears in ALT+TAB / taskbar. |
| `DispatcherQueue` | `DispatcherQueue` (read-only) | Dispatcher queue associated with the app window. |
| `PersistedStateId` | `Guid?` | Experimental. Identifier used to save/restore this window's placement across app sessions. |
| `PlacementRestorationBehavior` | `PlacementRestorationBehavior` | Experimental. Controls how the window's placement is restored when created (e.g. use saved placement or not). |

**Key methods**

| Name | Description |
|------|-------------|
| `Create()` / `Create(AppWindowPresenter[, WindowId[, DispatcherQueue]])` | Creates a new app window. |
| `GetFromWindowId(WindowId)` (static) | Returns the `AppWindow` for a `WindowId`, or `null`. |
| `Show()` / `Show(bool activate)` / `Hide()` | Shows or hides the window. |
| `ShowOnceWithRequestedStartupState()` | Shows the window once, with the default presenter, in the requested startup state. |
| `Destroy()` | Attempts to destroy the app window. |
| `AssociateWithDispatcherQueue(DispatcherQueue)` | Associates the app window with the specified dispatcher queue. |
| `Move(PointInt32)` | Moves the window to a screen point. |
| `Resize(SizeInt32)` | Resizes the window (outer bounds). |
| `ResizeClient(SizeInt32)` | Resizes so the client area matches the given size. |
| `MoveAndResize(RectInt32[, DisplayArea])` | Moves and resizes in one call. |
| `MoveInZOrderAtTop()` / `MoveInZOrderAtBottom()` / `MoveInZOrderBelow(WindowId)` | Changes Z-order. |
| `SetPresenter(AppWindowPresenter)` / `SetPresenter(AppWindowPresenterKind)` | Applies a presenter. |
| `SetIcon(string)` / `SetIcon(IconId)` | Sets the window icon. |
| `SetTaskbarIcon`, `SetTitleBarIcon` | Sets taskbar / title bar specific icons. |

**Window placement persistence (Experimental, `windows-app-sdk-2.0-experimental`)**

| Name | Description |
|------|-------------|
| `GetCurrentPlacement()` | Returns an `AppWindowPlacementDetails` snapshot of the window's current placement. |
| `SaveCurrentPlacement()` | Saves the window's current placement under its `PersistedStateId`. |
| `SaveCurrentPlacementForAllPersistedStateIds()` (static) | Saves the current placement for every window that has a `PersistedStateId` set. |
| `SetCurrentPlacement(AppWindowPlacementDetails, bool isFirstWindow)` | Applies the given placement details to the window; returns `bool` indicating success. |

**Events**: `Changed` (`AppWindowChangedEventArgs`: `DidPositionChange`, `DidSizeChange`, `DidPresenterChange`, `DidVisibilityChange`), `Closing`, `Destroying`.

## Notes

- Package: `Microsoft.UI.Windowing` (Windows App SDK / WinUI 3). Distinct from `System.Windows.Window` (WPF) and the JS/Compose `Window` concepts in other skills.
- Title bar customization APIs are partially supported on Windows 10 (since WASDK 1.2) and fully supported on Windows 11 — check `AppWindowTitleBar.IsCustomizationSupported()` first.
- The Windows App SDK doesn't provide methods for attaching UI framework content directly to an `AppWindow` created via `Create()`; for WinUI, get the system-created instance instead.
- Window placement persistence/restoration (`PersistedStateId`, `PlacementRestorationBehavior`, `GetCurrentPlacement`, `SaveCurrentPlacement`, `SaveCurrentPlacementForAllPersistedStateIds`, `SetCurrentPlacement`) is Experimental and available only on the `windows-app-sdk-2.0-experimental` moniker; `AssociateWithDispatcherQueue` is stable since 1.4.

## Related

- [AppWindowTitleBar](./app-window-titlebar.md)
- [AppWindowPresenter](./app-window-presenter.md)
- [WindowId](./window-id.md)
- [Win32 HWND interop](./win32-interop.md)
- [Microsoft.UI.Xaml.Window](./xaml-window.md)
