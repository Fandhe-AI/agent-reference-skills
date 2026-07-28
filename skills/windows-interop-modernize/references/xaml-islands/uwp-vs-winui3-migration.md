# UWP XAML Islands vs WinUI 3 XAML Islands

Windows has two generations of the XAML Islands hosting feature, with distinct namespaces, distinct hosted control types, and no drop-in compatibility between them.

## Signature / Usage

```csharp
// Legacy UWP XAML Islands (Windows 10 SDK, 1903+)
using Windows.UI.Xaml.Hosting;      // WindowsXamlManager, DesktopWindowXamlSource
using Windows.UI.Xaml.Controls;     // hosts Windows.UI.Xaml.UIElement (UWP XAML / WinUI 2)

// WinUI 3 XAML Islands (Windows App SDK 1.4+)
using Microsoft.UI.Xaml.Hosting;    // WindowsXamlManager, DesktopWindowXamlSource
using Microsoft.UI.Xaml.Controls;   // hosts Microsoft.UI.Xaml.UIElement (WinUI 3)
```

## Options / Props

| Aspect | UWP XAML Islands | WinUI 3 XAML Islands |
|--------|-------------------|------------------------|
| Namespace | `Windows.UI.Xaml.Hosting` | `Microsoft.UI.Xaml.Hosting` |
| Hosted element type | `Windows.UI.Xaml.UIElement` (UWP XAML / WinUI 2 for UWP) | `Microsoft.UI.Xaml.UIElement` (WinUI 3) |
| Minimum requirement | Windows 10, version 1903 SDK | Windows App SDK 1.4+ |
| Recommended WPF/WinForms surface | Windows Community Toolkit `WindowsXamlHost` control / wrapped controls (`Microsoft.Toolkit.Wpf.UI.XamlHost`, `Microsoft.Toolkit.Forms.UI.XamlHost`) | Direct use of `DesktopWindowXamlSource` + `DesktopChildSiteBridge` (no wrapper control shipped as of Windows App SDK 1.4–2.0) |
| Root/context accessor | `Windows.UI.Xaml.XamlRoot` (not `CoreWindow`/`ApplicationView`/`Window`) | Standard WinUI 3 windowing (`AppWindow`, `Microsoft.UI.WindowId`) |
| .NET Framework support | Not supported (requires .NET Core 3.x+ for WPF/WinForms) | Requires an app targeting a Windows App SDK–supported .NET version |

## Notes

- The two APIs are not interchangeable: a `Windows.UI.Xaml.Hosting.DesktopWindowXamlSource` can only host `Windows.UI.Xaml.UIElement` content, and `Microsoft.UI.Xaml.Hosting.DesktopWindowXamlSource` can only host `Microsoft.UI.Xaml.UIElement` content. Migrating a host app from UWP XAML Islands to WinUI 3 XAML Islands means switching both the hosting classes and the hosted controls' namespace/library.
- UWP XAML Islands' `WindowsXamlHost` / wrapped controls (from the Windows Community Toolkit) have no direct WinUI 3 equivalent shipped by Microsoft; WinUI 3 hosting is done by using `DesktopWindowXamlSource` and `DesktopChildSiteBridge` directly, as described in this category's other pages.
- Both generations share the same conceptual constraints: content lives in a separate child HWND, keyboard focus must be handed off explicitly, and the host app must keep the child HWND's bounds in sync with the host window.

## Related

- [XAML Islands overview](./overview.md)
- [DesktopWindowXamlSource](./desktop-window-xaml-source.md)
- [Limitations and known issues](./limitations.md)
