# XAML Islands (WinUI 3 / Windows App SDK)

Feature that lets non-WinUI 3 desktop applications (WPF, Windows Forms, Win32/C++) host `Microsoft.UI.Xaml.UIElement`-derived WinUI 3 controls inside a UI element associated with a window handle (HWND). Introduced in Windows App SDK 1.4 as the *Windows App SDK (WASDK) XAML hosting API*.

## Signature / Usage

```csharp
// Namespaces used by the WASDK XAML hosting API
using Microsoft.UI.Xaml.Hosting; // DesktopWindowXamlSource, WindowsXamlManager
using Microsoft.UI.Content;      // DesktopChildSiteBridge, DesktopSiteBridge
using Microsoft.UI;              // WindowId, Win32Interop
```

## Notes

- This is the WinUI 3 hosting API (`Microsoft.UI.Xaml.*`, `Microsoft.UI.Content.*`), distinct from the legacy *UWP XAML Islands* API (`Windows.UI.Xaml.Hosting.WindowsXamlManager`, `Windows.UI.Xaml.Hosting.DesktopWindowXamlSource`) that ships in the Windows 10 SDK and hosts `Windows.UI.Xaml.UIElement` (UWP XAML / WinUI 2) controls instead.
- Requires Windows App SDK 1.4 or later. The core hosting class is `Microsoft.UI.Xaml.Hosting.DesktopWindowXamlSource`; it wraps a `Microsoft.UI.Content.DesktopChildSiteBridge` (obtained via the `SiteBridge` property) that manages the actual HWND-based content island.
- Any control deriving from `Microsoft.UI.Xaml.UIElement` can be hosted, including custom WinUI 3 controls, as long as the host app has the Windows App SDK runtime installed (or is MSIX-packaged with the framework package).
- Supported host application types: WPF, Windows Forms, and Win32 (C++) desktop applications.
- The general pattern: create a `DesktopWindowXamlSource`, call `Initialize(WindowId)` with the host HWND's `WindowId`, set `Content` to the `UIElement` to host, then use the `SiteBridge` (a `DesktopChildSiteBridge`) to position/resize/show the resulting child HWND within the host window.

## Related

- [DesktopWindowXamlSource](./desktop-window-xaml-source.md)
- [DesktopChildSiteBridge](./desktop-child-site-bridge.md)
- [WindowsXamlManager](./windows-xaml-manager.md)
- [Hosting in WPF, WinForms, and Win32 apps](./hosting-wpf-winforms-win32.md)
- [Input and focus navigation](./input-focus-navigation.md)
- [DPI and sizing](./dpi-and-sizing.md)
- [UWP XAML Islands vs WinUI 3 XAML Islands](./uwp-vs-winui3-migration.md)
- [Limitations and known issues](./limitations.md)
