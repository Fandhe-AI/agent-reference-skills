# Mapping UWP APIs to the Windows App SDK

Namespace, class, and member mapping from UWP (`Windows.*`) to their Windows App SDK (`Microsoft.*`) equivalents. If a class isn't listed, only its containing namespace changed; if a namespace isn't listed, its name didn't change.

## Signature / Usage

```text
Windows.UI.Xaml                                -> Microsoft.UI.Xaml
Windows.UI.Composition                         -> Microsoft.UI.Composition
Windows.UI.Core.CoreDispatcher                 -> Microsoft.UI.Dispatching.DispatcherQueue
Windows.ApplicationModel.Resources.Core         -> Microsoft.Windows.ApplicationModel.Resources
```

## Options / Props

| UWP | Windows App SDK |
|------|-------------|
| `Windows.ApplicationModel.Activation.LaunchActivatedEventArgs` | `Microsoft.UI.Xaml.LaunchActivatedEventArgs` (used in `App.OnLaunched`) |
| `Windows.ApplicationModel.Background.BackgroundTaskBuilder` | `Microsoft.Windows.ApplicationModel.Background.BackgroundTaskBuilder` |
| `Windows.ApplicationModel.Core.CoreApplication.CreateNewView` | `Microsoft.UI.Windowing.AppWindow.Create` |
| `Windows.ApplicationModel.Core.CoreApplicationViewTitleBar` | `Microsoft.UI.Windowing.AppWindowTitleBar` |
| `Windows.ApplicationModel.Resources.Core` (namespace) | `Microsoft.Windows.ApplicationModel.Resources` (see MRT to MRT Core migration) |
| `Windows.ApplicationModel.Resources.Core.ResourceContext.GetForCurrentView` / `.GetForViewIndependentUse` | `Microsoft.Windows.ApplicationModel.Resources.ResourceManager.CreateResourceContext` |
| `Windows.ApplicationModel.Resources.Core.ResourceManager.Current` | new `Microsoft.Windows.ApplicationModel.Resources.ResourceManager()` |
| `Windows.ApplicationModel.Resources.Core.ResourceQualifierObservableMap.MapChanged` | No replacement — detect environment changes yourself |
| `Windows.Graphics.Printing.PrintManager` | Not supported in Windows App SDK 1.0 |
| `Windows.Media.Capture.CameraCaptureUI` | `Microsoft.Windows.Media.Capture.CameraCaptureUI` |
| `Windows.Security.Authentication.Web.WebAuthenticationBroker` | `Microsoft.Security.Authentication.OAuth.OAuth2Manager` (1.7+) |
| `Windows.Storage.Pickers.FileOpenPicker` / `FileSavePicker` / `FolderPicker` | Supported, but must use `IInitializeWithWindow` to set the owning HWND |
| `Windows.System.Display.DisplayRequest` | Not supported in Windows App SDK 1.0 |
| `Windows.UI.Composition` (namespace) | `Microsoft.UI.Composition` |
| `Windows.UI.Core.CoreDispatcher` | `Microsoft.UI.Dispatching.DispatcherQueue` |
| `Windows.UI.Core.CoreDispatcher.RunAsync` | `Microsoft.UI.Dispatching.DispatcherQueue.TryEnqueue` |
| `Windows.UI.Core.CoreWindow` | `Microsoft.UI.Windowing.AppWindow` |
| `Windows.UI.Core.CoreWindow.Bounds` | `Microsoft.UI.Windowing.AppWindow.Size` |
| `Windows.UI.Core.CoreWindow.GetForCurrentThread` | No direct 1:1 mapping — cache/expose `Window`/`AppWindow` on the `App` object instead |
| `Windows.UI.Core.CoreWindow.Activate` | `Microsoft.UI.Windowing.AppWindow.Show` |
| `Windows.UI.Core.CoreWindow.Dispatcher` | `Microsoft.UI.Xaml.Window.DispatcherQueue` |
| `Windows.UI.Core.CoreWindow.SizeChanged` | `Microsoft.UI.Windowing.AppWindowChangedEventArgs.DidSizeChange` |
| `Windows.UI.Core.SystemNavigationManager` (global back button) | Not supported — implement your own back button UI |
| `Windows.UI.Core.WindowSizeChangedEventArgs` | `Microsoft.UI.Xaml.WindowSizeChangedEventArgs` |
| `Windows.UI.Popups.MessageDialog` | Supported, but requires `IInitializeWithWindow` |
| `Windows.UI.Text.Core.CoreTextServicesManager` | Supported only on Windows 11 |
| `Windows.UI.ViewManagement.AccessibilitySettings.HighContrastChanged` | `Microsoft.UI.System.ThemeSettings.Changed` |
| `Windows.UI.ViewManagement.ApplicationView` | `Microsoft.UI.Windowing.AppWindow` |
| `Windows.UI.ViewManagement.ApplicationView.Title` | `Microsoft.UI.Windowing.AppWindow.Title` |
| `Windows.UI.ViewManagement.ApplicationView.TryConsolidateAsync` | `Microsoft.UI.Windowing.AppWindow.Destroy` |
| `Windows.UI.ViewManagement.ApplicationView.TryEnterFullScreenMode` | `Microsoft.UI.Windowing.AppWindow.SetPresenter(AppWindowPresenterKind.FullScreen)` |
| `Windows.UI.ViewManagement.ApplicationView.TryEnterViewModeAsync(CompactOverlay)` | `Microsoft.UI.Windowing.AppWindow.SetPresenter(AppWindowPresenterKind.CompactOverlay)` |
| `Windows.UI.ViewManagement.ApplicationView.TryResizeView` | `Microsoft.UI.Windowing.AppWindow.Resize` |
| `Windows.UI.WindowManagement.AppWindow` (UWP preview) | `Microsoft.UI.Windowing.AppWindow` |
| `Windows.UI.Xaml` (namespace) | `Microsoft.UI.Xaml` |
| `Windows.UI.Xaml.Application.OnActivated` / `OnBackgroundActivated` / `OnFileActivated` / etc. | Use `AppInstance.GetActivatedEventArgs` in `App.OnLaunched` (see applifecycle guide) |
| `Windows.UI.Xaml.Window.Current` | Deprecated, returns `null` — use `App.Window` static property instead |
| `Windows.UI.Xaml.Window.Dispatcher` | `Microsoft.UI.Xaml.Window.DispatcherQueue` |
| `Windows.UI.Xaml.Controls.ContentDialog` | Supported, but must set `XamlRoot` |
| `Windows.UI.Xaml.Controls.InkCanvas` | Not supported in Windows App SDK 1.0 (experimental only as of 2.0 Experimental 1) |
| `Windows.UI.Xaml.Controls.MediaElement` | Not supported in Windows App SDK 1.0 — use `MediaPlayerElement` instead |
| `Windows.UI.Xaml.Controls.Maps.MapControl` | `Microsoft.UI.Xaml.Controls.MapControl` (1.5+) |
| `Windows.UI.Xaml.Controls.Primitives.Popup` | Supported, but must set `XamlRoot` |
| `Windows.UI.Xaml.Media.AcrylicBrush.BackgroundSource` | Removed — `AcrylicBrush` always samples app content |
| C++/WinRT `co_await winrt::resume_foreground(this->Dispatcher())` | `co_await wil::resume_foreground(this->DispatcherQueue())` |
| OneDrive SDK (third-party) | Microsoft Graph SDK |

## Notes

- `Windows.UI.Xaml.*` maps to `Microsoft.UI.Xaml.*` (WinUI 3) — this is a distinct namespace/API from `System.Windows.Controls.*` (WPF) and `System.Windows.Forms.*` (WinForms); do not mix them when porting code.
- If your namespace/class member isn't listed here, first search by member name, then by class name, then by namespace — an unlisted item means only a straightforward namespace rename is required.
- For a condensed quick-reference substitution table intended for AI-assisted migration (plus agent-specific gotchas like `x:Bind` defaulting to `OneTime`), see [AI-assisted migration](./ai-assisted-migration.md).

## Related

- [Mapping UWP features to the Windows App SDK](./feature-mapping.md)
- [What's supported when migrating from UWP to WinUI](./what-is-supported.md)
- [Windowing functionality migration](./windowing-migration.md)
- [Threading functionality migration](./threading-migration.md)
- [MRT to MRT Core migration](./mrtcore-migration.md)
- [User interface migration (including WinUI)](./winui3-ui-migration.md)
