# Calling WinRT APIs from WPF / WinForms

Windows Runtime (WinRT) APIs (`Windows.*` namespaces, plus `Microsoft.Windows.*` APIs shipped by the Windows App SDK) can be called directly from WPF, WinForms, and C++ Win32 desktop apps without adopting WinUI 3, once the project is configured with a Windows-version-specific Target Framework Moniker (TFM).

## Signature / Usage

```xml
<!-- .csproj: target a Windows-version-specific TFM to unlock WinRT API references -->
<TargetFramework>net8.0-windows10.0.19041.0</TargetFramework>
<SupportedOSPlatformVersion>10.0.17763.0</SupportedOSPlatformVersion>
```

```csharp
// HWND-based WinRT APIs (pickers, AppWindow, share) require the owner window handle.
// WPF:
var hwnd = new System.Windows.Interop.WindowInteropHelper(this).Handle;
// WinForms:
var hwnd = this.Handle;

var picker = new Windows.Storage.Pickers.FileOpenPicker();
WinRT.Interop.InitializeWithWindow.Initialize(picker, hwnd);
var file = await picker.PickSingleFileAsync();
```

## Options / Props

| Feature | Namespace | HWND interop needed? |
|---|---|---|
| App notifications | `Microsoft.Windows.AppNotifications.AppNotificationManager` (Windows App SDK) | No (COM activator registration for unpackaged apps) |
| Window management | `Microsoft.UI.Windowing.AppWindow` (Windows App SDK) | Yes — obtain via `AppWindow.GetFromWindowId` + `Win32Interop.GetWindowIdFromWindow(hwnd)` |
| File pickers | `Windows.Storage.Pickers.FileOpenPicker` / `FileSavePicker` / `FolderPicker` | Yes — `WinRT.Interop.InitializeWithWindow.Initialize(picker, hwnd)` |
| Share | `Windows.ApplicationModel.DataTransfer.DataTransferManager` | Yes — `DataTransferManager.GetForWindow(hwnd)` via interop helper |

## Notes

- WPF gets the owner HWND via `new System.Windows.Interop.WindowInteropHelper(window).Handle`; WinForms via `Control.Handle` directly — both are required because WinRT dialog/window APIs are not tied to a specific UI framework and need an explicit window handle.
- Several `Windows.UI.*` WinRT namespaces are unsupported when targeting .NET 6+; use the Windows App SDK's `Microsoft.UI.*` equivalents instead (e.g. `Microsoft.UI.Colors` instead of `Windows.UI.Colors`).
- Targeting a range of OS versions (TFM higher than `SupportedOSPlatformVersion`) requires runtime `ApiInformation`/`CA1416` guarded checks before calling APIs unavailable on older Windows versions.
- Adding these WinRT API calls does **not** require the Windows App SDK NuGet package for most `Windows.*` APIs; only `Microsoft.UI.Windowing.AppWindow` and other `Microsoft.*` Windows App SDK components require the `Microsoft.WindowsAppSDK` package — see `windows-app-sdk-existing-project.md`.

## Related

- [windows-app-sdk-existing-project.md](./windows-app-sdk-existing-project.md)
- [wpf-window.md](./wpf-window.md)
- [winforms-form-control.md](./winforms-form-control.md)
