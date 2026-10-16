# Hosting WinUI 3 controls in WPF, WinForms, and Win32 apps

Procedure for embedding WinUI 3 content in an existing WPF, Windows Forms, or Win32 (C++) desktop application using the Windows App SDK XAML hosting API (`DesktopWindowXamlSource`).

## Signature / Usage

Core of a custom Windows Forms host control. It assumes the app has already initialized the Windows App SDK runtime, dispatcher queue, and XAML environment, and that `IslandView` is a WinUI `UserControl` from a referenced WinUI class library.

```csharp
#nullable enable

using System;
using System.ComponentModel;
using System.Windows.Forms;
using Microsoft.UI;
using Microsoft.UI.Xaml.Hosting;
using Windows.Graphics;

internal sealed class WinUIIslandHost : Control
{
    private DesktopWindowXamlSource? _xamlSource;

    protected override void OnHandleCreated(EventArgs e)
    {
        base.OnHandleCreated(e);

        if (DesignMode ||
            LicenseManager.UsageMode == LicenseUsageMode.Designtime)
        {
            return;
        }

        _xamlSource = new DesktopWindowXamlSource();
        _xamlSource.Initialize(Win32Interop.GetWindowIdFromWindow(Handle));
        _xamlSource.Content = new MyWinUILibrary.IslandView();
        ResizeIsland();
    }

    protected override void OnSizeChanged(EventArgs e)
    {
        base.OnSizeChanged(e);
        ResizeIsland();
    }

    private void ResizeIsland()
    {
        _xamlSource?.SiteBridge.MoveAndResize(
            new RectInt32(0, 0, ClientSize.Width, ClientSize.Height));
    }

    protected override void OnHandleDestroyed(EventArgs e)
    {
        ReleaseIsland();
        base.OnHandleDestroyed(e);
    }

    protected override void Dispose(bool disposing)
    {
        if (disposing)
        {
            ReleaseIsland();
        }

        base.Dispose(disposing);
    }

    private void ReleaseIsland()
    {
        _xamlSource?.Dispose();
        _xamlSource = null;
    }
}
```

## Notes

- **Host setup order**: initialize the Windows App SDK runtime, configure the UI thread as STA, create a dispatcher queue on that thread, then create a `Microsoft.UI.Xaml.Application`. Call `WindowsXamlManager.InitializeForCurrentThread` on the same UI thread before creating the island.
- For a C# host, implement `IXamlMetadataProvider`, add `XamlControlsXamlMetaDataProvider` and the generated metadata provider from each WinUI class library, and merge `XamlControlsResources` into the application resources. Without the library's generated provider, creating its XAML controls can throw `XamlParseException`.
- Put the XAML controls to host in a WinUI project (for example a WinUI class library) referenced from the host. Keep all XAML objects on the thread where XAML was initialized (thread affinity).
- **WPF**: wrap the pattern in an `HwndHost`-derived control. **Win32 (C++)**: create the parent HWND with `CreateWindowEx`, obtain its `WindowId` via `winrt::Microsoft::UI::GetWindowIdFromWindow` (interop header), then follow the same `Initialize` / `Content` / `SiteBridge` sequence. Details for obtaining the host window handle and integrating with the message loop differ by framework.
- The official Windows App SDK Islands sample is an unpackaged .NET 8 Windows Forms host. `WinUIIslandHost` here and `DesktopWindowXamlSourceControl` in the sample are application-defined helper controls, not Windows App SDK controls.
- A production integration must also connect the two frameworks' input and focus behavior (see `input-focus-navigation.md`) and resize `SiteBridge` whenever the host client area or DPI changes.
- The official WinUIIslandHost sample calls only `MoveAndResize`; if the island does not appear, also call `SiteBridge.Show()` (see desktop-child-site-bridge.md).
- **Cleanup order**: dispose every `DesktopWindowXamlSource` when its host control or window is destroyed. On process exit, release the islands before closing the XAML manager or shutting down the dispatcher queue. Keep references to the dispatcher queue controller and XAML manager while islands use them.
- **Deployment**: XAML Islands don't require package identity by themselves. In a framework-dependent unpackaged app, initialize the runtime before XAML. A typical .NET host sets `<WindowsPackageType>None</WindowsPackageType>` for automatic runtime initialization; use the bootstrapper API for explicit control, or ship the runtime via self-contained deployment.
- This is distinct from the legacy UWP XAML Islands hosting path, which for WPF/WinForms recommends the Windows Community Toolkit's `WindowsXamlHost` control (`Microsoft.Toolkit.Wpf.UI.XamlHost` / `Microsoft.Toolkit.Forms.UI.XamlHost` NuGet packages). The framework requirements in the legacy system XAML Islands documentation don't describe WinUI XAML Islands.
- Source: https://learn.microsoft.com/en-us/windows/apps/desktop/modernize/host-controls-existing-desktop-apps (en-us, fetched 2026-10-16)
- Official sample: https://github.com/microsoft/WindowsAppSDK-Samples/tree/f1be017f26a0feae4c8dc805748eab0a1f7b4fc6/Samples/Islands
- Sample metadata provider and resources: https://github.com/microsoft/WindowsAppSDK-Samples/blob/f1be017f26a0feae4c8dc805748eab0a1f7b4fc6/Samples/Islands/cs-winforms-unpackaged/XamlApp.cs
- Sample provider registration: https://github.com/microsoft/WindowsAppSDK-Samples/blob/f1be017f26a0feae4c8dc805748eab0a1f7b4fc6/Samples/Islands/cs-winforms-unpackaged/Program.cs

## Related

- [DesktopWindowXamlSource](./desktop-window-xaml-source.md)
- [DesktopChildSiteBridge](./desktop-child-site-bridge.md)
- [WindowsXamlManager](./windows-xaml-manager.md)
- [DPI and sizing](./dpi-and-sizing.md)
- [UWP XAML Islands vs WinUI 3 XAML Islands](./uwp-vs-winui3-migration.md)
