# Hosting WinUI 3 controls in WPF, WinForms, and Win32 apps

Procedure for embedding WinUI 3 content in an existing WPF, Windows Forms, or Win32 (C++) desktop application using the Windows App SDK 1.4+ XAML hosting API.

## Signature / Usage

```csharp
// 1. (Optional) initialize the XAML framework on this thread if UIElements
//    are created before the DesktopWindowXamlSource.
WindowsXamlManager.InitializeForCurrentThread();

// 2. Create and initialize the source against the host window's HWND.
var xamlSource = new DesktopWindowXamlSource();
WindowId windowId = Win32Interop.GetWindowIdFromWindow(hostHwnd);
xamlSource.Initialize(windowId);

// 3. Set the WinUI 3 content to host.
xamlSource.Content = new MyWinUI3UserControl();

// 4. Position the resulting child HWND via the site bridge, and show it.
DesktopChildSiteBridge bridge = xamlSource.SiteBridge;
bridge.MoveAndResize(new Windows.Graphics.RectInt32(0, 0, width, height));
bridge.Show();

// 5. On host window resize / DPI change, call MoveAndResize again.
// 6. On teardown, dispose the source.
xamlSource.Dispose();
```

## Notes

- **WPF**: host the island inside an `HwndHost`-derived control (e.g. override `BuildWindowCore` to create/obtain the child HWND and call `Initialize`/`MoveAndResize` from there), or wrap the pattern in a reusable control. The Windows App SDK runtime must be installed (or referenced via MSIX/self-contained deployment) for the process to run.
- **Windows Forms**: similarly implement a wrapper around a `NativeWindow`/`Control` subclass that owns the parent HWND passed to `Initialize`.
- **Win32 (C++)**: create the parent HWND normally with `CreateWindowEx`, obtain its `WindowId` via `winrt::Microsoft::UI::GetWindowIdFromWindow` (interop header), then follow the same `Initialize` / `Content` / `SiteBridge` sequence.
- The application must have the Windows App SDK runtime available; for unpackaged apps, use the Windows App SDK bootstrapper API or ship the runtime via self-contained deployment.
- This is distinct from the legacy UWP XAML Islands hosting path, which for WPF/WinForms recommends the Windows Community Toolkit's `WindowsXamlHost` control (`Microsoft.Toolkit.Wpf.UI.XamlHost` / `Microsoft.Toolkit.Forms.UI.XamlHost` NuGet packages) instead of calling the hosting API directly.

## Related

- [DesktopWindowXamlSource](./desktop-window-xaml-source.md)
- [DesktopChildSiteBridge](./desktop-child-site-bridge.md)
- [WindowsXamlManager](./windows-xaml-manager.md)
- [DPI and sizing](./dpi-and-sizing.md)
- [UWP XAML Islands vs WinUI 3 XAML Islands](./uwp-vs-winui3-migration.md)
