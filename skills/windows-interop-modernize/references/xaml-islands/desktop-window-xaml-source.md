# DesktopWindowXamlSource

`Microsoft.UI.Xaml.Hosting.DesktopWindowXamlSource` is the primary class of the Windows App SDK XAML hosting API. It enables a desktop application to host WinUI 3 controls (anything deriving from `Microsoft.UI.Xaml.UIElement`) in any UI element associated with a window handle (HWND).

## Signature / Usage

```csharp
[Windows.Foundation.Metadata.ContractVersion(typeof(Microsoft.UI.Xaml.WinUIContract), 327680)]
[Windows.Foundation.Metadata.MarshalingBehavior(Windows.Foundation.Metadata.MarshalingType.Agile)]
[Windows.Foundation.Metadata.Threading(Windows.Foundation.Metadata.ThreadingModel.Both)]
public class DesktopWindowXamlSource : System.IDisposable
```

```csharp
var xamlSource = new DesktopWindowXamlSource();
var windowId = Win32Interop.GetWindowIdFromWindow(hwndHost);
xamlSource.Initialize(windowId);
xamlSource.Content = new MyWinUI3Control();

var bridge = xamlSource.SiteBridge; // DesktopChildSiteBridge
bridge.MoveAndResize(new Windows.Graphics.RectInt32(x, y, width, height));
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `Initialize(WindowId parentWindowId)` | method | Initializes the source and creates the hosted child HWND as a child of the given parent `WindowId`. |
| `Content` | `Microsoft.UI.Xaml.UIElement` (get/set) | The `UIElement` hosted in the desktop application. |
| `SiteBridge` | `Microsoft.UI.Content.DesktopSiteBridge` (get) | The `DesktopSiteBridge` (in practice a `DesktopChildSiteBridge`) associated with this source; used to position, resize, show/hide, and manage Z-order of the hosted content. |
| `HasFocus` | `bool` (get) | Whether the source currently has focus in the desktop application. |
| `ShouldConstrainPopupsToWorkArea` | `bool` (get/set) | Whether controls with popup-like behavior are constrained to the work area. |
| `SystemBackdrop` | `Microsoft.UI.Xaml.Media.SystemBackdrop` (get/set) | System backdrop (e.g. Mica, Acrylic) used to render the hosted content. |
| `NavigateFocus(XamlSourceFocusNavigationRequest request)` | method | Programmatically attempts to give focus to the source in the desktop application. |
| `TakeFocusRequested` | event | Raised when the host desktop application must take back focus from the source (for example, the user reaches the last focusable element inside the source and presses Tab). |
| `GotFocus` | event | Raised when the source gets focus in the desktop application (for example, Tab is pressed on the element preceding the source). |
| `Close()` / `Dispose()` | method | Closes and releases resources used by the source; recommended once hosting is finished. |

## Notes

- Namespace `Microsoft.UI.Xaml.Hosting` (Windows App SDK / WinUI 3). Do not confuse with `Windows.UI.Xaml.Hosting.DesktopWindowXamlSource`, the legacy UWP XAML Islands class with the same name.
- If `UIElement` objects are created before the `DesktopWindowXamlSource` that will host them, call `WindowsXamlManager.InitializeForCurrentThread()` first so the WinUI XAML framework is initialized on that thread; if the source is created first, the framework auto-initializes the elements on the same thread.
- Implements `IClosable`/`IDisposable` — call `Close()` (or `Dispose()` in .NET) when done hosting.
- For C# apps, obtain the parent `WindowId` via `Microsoft.UI.Win32Interop.GetWindowIdFromWindow(IntPtr hwnd)`; for C++ apps use `Microsoft::UI::Interop::GetWindowIdFromWindow`.

## Related

- [DesktopChildSiteBridge](./desktop-child-site-bridge.md)
- [WindowsXamlManager](./windows-xaml-manager.md)
- [Hosting in WPF, WinForms, and Win32 apps](./hosting-wpf-winforms-win32.md)
- [Input and focus navigation](./input-focus-navigation.md)
