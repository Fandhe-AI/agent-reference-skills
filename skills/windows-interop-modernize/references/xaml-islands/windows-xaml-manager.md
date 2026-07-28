# WindowsXamlManager

`Microsoft.UI.Xaml.Hosting.WindowsXamlManager` represents the WinUI XAML framework in a non-Windows App SDK (WASDK) desktop application (WPF, Windows Forms, or Win32) and controls its initialization/shutdown lifetime on a given thread.

## Signature / Usage

```csharp
[Windows.Foundation.Metadata.ContractVersion(typeof(Microsoft.UI.Xaml.WinUIContract), 327680)]
public sealed class WindowsXamlManager : System.IDisposable
```

```csharp
// Call before creating any UIElement objects on this thread, if they are
// created before the DesktopWindowXamlSource that will host them.
WindowsXamlManager manager = WindowsXamlManager.InitializeForCurrentThread();
manager.XamlShutdownCompletedOnThread += (s, e) =>
{
    // Cleanup after the XAML runtime finishes shutting down on this thread.
};
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `InitializeForCurrentThread()` | static method | Initializes the WinUI XAML framework on the current thread for a non-WASDK desktop application. |
| `GetForCurrentThread()` | static method | Gets the `WindowsXamlManager` associated with the current thread, if any. |
| `Close()` | method | Closes and asynchronously releases resources used by this manager. |
| `Dispose()` | method | Performs application-defined cleanup of unmanaged resources. |
| `XamlShutdownCompletedOnThread` | event | Raised when the XAML runtime finishes its shutdown process on the current thread. |

## Notes

- Namespace `Microsoft.UI.Xaml.Hosting` (Windows App SDK / WinUI 3). Distinct from the legacy `Windows.UI.Xaml.Hosting.WindowsXamlManager` used by UWP XAML Islands.
- Behavior changed between Windows App SDK 1.4 and 1.5+:
  - **1.4**: the XAML runtime shuts down asynchronously on a thread once all `WindowsXamlManager` and `DesktopWindowXamlSource` objects on that thread are closed/destroyed, or the thread's `DispatcherQueue` shuts down; `InitializeForCurrentThread()` returns a **new** object on every call.
  - **1.5 and later**: the XAML runtime shuts down on a thread **only** when that thread's `DispatcherQueue` shuts down; `InitializeForCurrentThread()` returns the **same** instance until the `DispatcherQueue` shuts down.
- Typically only needed explicitly when `UIElement` objects must be created before the hosting `DesktopWindowXamlSource`; otherwise `DesktopWindowXamlSource` initializes the framework implicitly.

## Related

- [DesktopWindowXamlSource](./desktop-window-xaml-source.md)
