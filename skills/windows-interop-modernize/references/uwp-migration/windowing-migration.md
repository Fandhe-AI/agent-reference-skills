# Windowing functionality migration

Migration guidance for window management: moving from UWP's `ApplicationView`/`CoreWindow` or preview `AppWindow` to the Windows App SDK's `Microsoft.UI.Windowing.AppWindow`, which is based on the Win32 HWND model.

## Signature / Usage

```csharp
// UWP: detect modifier key state
using Windows.System;
using Windows.UI.Core;

var ctrlState = CoreWindow.GetForCurrentThread().GetKeyState(VirtualKey.Control);
bool isControlPressed = (ctrlState & CoreVirtualKeyStates.Down) == CoreVirtualKeyStates.Down;
```

```csharp
// Windows App SDK equivalent — CoreWindow is not supported for desktop apps
using Windows.System;
using Microsoft.UI.Input;

var ctrlState = InputKeyboardSource.GetKeyStateForCurrentThread(VirtualKey.Control);
bool isControlPressed = (ctrlState & CoreVirtualKeyStates.Down) == CoreVirtualKeyStates.Down;
```

## Options / Props

| UWP ApplicationView/CoreWindow | UWP AppWindow (preview) | Windows App SDK |
|------|-------------|------|
| `CoreApplication.CreateNewView` / `CoreWindow.GetForCurrentThread` | `AppWindow.TryCreateAsync` | `AppWindow.Create` |
| `CoreWindow.Activate` | `AppWindow.TryShowAsync` | `AppWindow.Show` |
| `ApplicationView.TryConsolidateAsync` | `AppWindow.CloseAsync` | `AppWindow.Destroy` |
| `ApplicationView.TryResizeView` | `AppWindow.RequestSize` | `AppWindow.Resize` |
| `CoreWindow.Bounds` (often `CoreWindow.GetForCurrentThread.Bounds`) | `AppWindowPlacement.Size` | `AppWindow.Size` |
| Not possible | `AppWindow.GetPlacement` | `AppWindow.Position` |
| Not possible | `Appwindow.RequestMoveXxx` | `AppWindow.Move` |
| `ApplicationView.Title` | `AppWindow.Title` | `AppWindow.Title` |
| `ApplicationViewMode.CompactOverlay` | `AppWindowPresentationKind.CompactOverlay` | `AppWindowPresenterKind.CompactOverlay` via `AppWindow.SetPresenter` |
| `ApplicationViewWindowingMode.FullScreen` | `AppWindowPresentationKind.FullScreen` | `AppWindowPresenterKind.FullScreen` via `AppWindow.SetPresenter` |
| `CoreWindow.SizeChanged` | `AppWindowChangedEventArgs.DidSizeChange` | `AppWindowChangedEventArgs.DidSizeChange` |
| `CoreWindow.GetForCurrentThread().GetKeyState` | — | `Microsoft.UI.Input.InputKeyboardSource.GetKeyStateForCurrentThread` |

## Notes

- `CoreWindow` and related APIs are **not supported** in Windows App SDK 2.0. Alternatives: `Microsoft.UI.Windowing.AppWindow` for window management, and HWND-based interop APIs (for example `IInitializeWithWindow`) for UI objects that need an owning window.
- **No splash screen by default**: unlike UWP, Win32 apps don't automatically show a splash screen on launch — implement a custom transition if your app relies on this.
- **Close semantics differ**: UWP's *consolidation* concept (`ApplicationView.TryConsolidateAsync`) doesn't exist in Win32; the default Win32 behavior is Close > Hide > Destroy.
- Title bar customization APIs (`AppWindowTitleBar`) work on **Windows 11 only** — check `AppWindowTitleBar.IsCustomizationSupported` before calling them.
- **MainPage vs. MainWindow**: new Windows App SDK projects provide a `MainWindow` (`Microsoft.UI.Xaml.Window`) with no `Page` and no navigation code by default, unlike the UWP template's `MainPage` + navigation. Simple single-page apps can copy XAML/code-behind directly into `MainWindow`, but `Window` is not a `DependencyObject` — it has no `Resources`, `DataContext`, `Load`/`Unload` events.
- `CoreWindow.Dispatcher` migrates to `Microsoft.UI.Xaml.Window.DispatcherQueue`, **not** to `Window.Dispatcher` (which always returns `null`). See [Threading functionality migration](./threading-migration.md).
- Applies to `Microsoft.UI.Windowing.AppWindow` (Windows App SDK, HWND-based) — distinct from `Windows.UI.WindowManagement.AppWindow` (UWP preview) despite the identical short name; also distinct from any `Window`/`AppWindow` concept in WPF or WinForms.

## Related

- [Mapping UWP APIs to the Windows App SDK](./namespace-mapping.md)
- [Threading functionality migration](./threading-migration.md)
- [User interface migration (including WinUI)](./winui3-ui-migration.md)
- [What's supported when migrating from UWP to WinUI](./what-is-supported.md)
