# WinRT.Interop: Retrieving and Passing a Window Handle (HWND)

Some WinRT objects (file pickers, dialogs, share UI) need a window handle (HWND) before they work in a desktop app. `WinRT.Interop.WindowNative.GetWindowHandle` retrieves the HWND of a WinUI 3 `Window`, and `WinRT.Interop.InitializeWithWindow.Initialize` passes that HWND to a WinRT object that implements `IInitializeWithWindow` so it knows which window owns it. Both are .NET projections of WinRT COM interop interfaces (`IWindowNative`, `IInitializeWithWindow`), available as static classes in `WinRT.Interop` — no manual COM `QueryInterface` code required.

## Signature / Usage

```csharp
private async void myButton_Click(object sender, RoutedEventArgs e)
{
    // Create a folder picker.
    var folderPicker = new Windows.Storage.Pickers.FolderPicker();

    // 1. Retrieve the window handle (HWND) of the current WinUI window.
    var hWnd = WinRT.Interop.WindowNative.GetWindowHandle(this);

    // 2. Initialize the folder picker with the window handle (HWND).
    WinRT.Interop.InitializeWithWindow.Initialize(folderPicker, hWnd);

    // Use the folder picker as usual.
    folderPicker.FileTypeFilter.Add("*");
    var folder = await folderPicker.PickSingleFolderAsync();
}
```

## Options / Props

| Member | Description |
| --- | --- |
| `WinRT.Interop.WindowNative.GetWindowHandle(object)` | Projects `IWindowNative::get_WindowHandle`. Takes a WinUI 3 `Microsoft.UI.Xaml.Window` instance, returns its HWND as `IntPtr`. WinUI-only — for WPF use `System.Windows.Interop.WindowInteropHelper(this).Handle`; for WinForms use `this.Handle` (`NativeWindow.Handle`). |
| `WinRT.Interop.InitializeWithWindow.Initialize(object, IntPtr)` | Projects `IInitializeWithWindow::Initialize`. Takes the WinRT object to initialize (e.g. a picker) and the owner HWND. Requires .NET 6 SDK or later and a TFM targeting Windows 10, version 1809+. |

## Notes

- Requires the .NET 6 SDK or later and a version-specific TFM (e.g. `net8.0-windows10.0.19041.0`); see [Microsoft.Windows.SDK.NET.Ref and TargetFramework](./sdk-net-ref-targetframework.md).
- In a WinUI 3 project these classes are available out of the box. In WPF or WinForms projects, only the TFM configuration is required (no extra Windows App SDK reference) for the `IInitializeWithWindow`-based classes.
- `WinRT.Interop` also provides interop classes for other WinRT COM interop interfaces that need an HWND or similar handle: `AccountsSettingsPaneInterop`, `DragDropManagerInterop`, `InputPaneInterop`, `PlayToManagerInterop`, `PrintManagerInterop`, `RadialControllerInterop`, `RadialControllerConfigurationInterop`, `SpatialInteractionManagerInterop`, `SystemMediaTransportControlsInterop`, `UIViewSettingsInterop`, `UserConsentVerifierInterop`, `WebAuthenticationCoreManagerInterop`. All are static and available via the TFM approach.
- Do not confuse `WinRT.Interop.WindowNative` (WinUI 3 `Microsoft.UI.Xaml.Window`) with `Microsoft.UI.Win32Interop` (Windows App SDK class for `WindowId`/`DisplayId`/monitor conversions) — they serve different purposes and live in different namespaces.
- For calling raw Win32 APIs (kernel32, user32, etc.) instead of WinRT COM interop interfaces, use CsWin32, not the classes described here.
- Previously (.NET Framework / .NET Core, pre-.NET 5), you could define an interop interface directly with `[ComImport]` and cast a projected class to it. `[ComImport]` still works for `IUnknown`-based interfaces, but not for `IInspectable`-based WinRT interfaces — see [COM Interop with ComImport and ComWrappers](./com-interop.md).

## Related

- [COM Interop with ComImport and ComWrappers](./com-interop.md)
- [Microsoft.Windows.SDK.NET.Ref and TargetFramework](./sdk-net-ref-targetframework.md)
- [WinRT APIs Not Supported in Desktop Apps](./winrt-api-desktop-support.md)
