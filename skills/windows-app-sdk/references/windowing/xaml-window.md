# Microsoft.UI.Xaml.Window

Represents a window of the current `Application` (`Microsoft.UI.Xaml.Window`). Used to attach app content (`Content`) and manage the window's lifecycle; created explicitly with a constructor or `.xaml` subclass.

## Signature / Usage

```csharp
protected override void OnLaunched(Microsoft.UI.Xaml.LaunchActivatedEventArgs args)
{
    m_window = new MainWindow();
    m_window.Activate();
}
private Window m_window;

// Ad-hoc window
var window = new Window();
window.Content = new TextBlock { Text = "Hello" };
window.Activate();
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `AppWindow` | `AppWindow` (read-only) | The `AppWindow` associated with this XAML `Window` (WASDK 1.4+). |
| `Content` | `UIElement` | The visual root of the window. |
| `Title` | `string` | Window title text. |
| `Bounds` | `Rect` (read-only) | Height/width in effective (view) pixels. |
| `Visible` | `bool` (read-only) | Whether the window is visible. |
| `ExtendsContentIntoTitleBar` | `bool` | Hides the default title bar to create space for app content. |
| `SystemBackdrop` | `SystemBackdrop` | Backdrop (e.g., Mica/Acrylic) rendered behind window content. |
| `DispatcherQueue` | `DispatcherQueue` (read-only) | Dispatcher queue for the window. |
| `Compositor` | `Compositor` (read-only) | Compositor for this window. |
| `CoreWindow`, `Current`, `Dispatcher` | — | Carried over from UWP; always `null` in WinUI apps. |

**Methods**: `Activate()` — brings the window to the foreground and focuses it (required for initial display); `Close()` — closes/destroys the window; `SetTitleBar(UIElement)` — enables title bar drag behavior on an element when `ExtendsContentIntoTitleBar` is `true`.

**Events**: `Activated`, `Closed`, `SizeChanged`, `VisibilityChanged`.

## Notes

- Implements `IWindowNative` (`WindowHandle`) to interop with the window's HWND.
- You can create more than one `Window` per thread (requires Windows App SDK 1.0.1+); each shares the same UI thread/dispatcher.
- Package: `Microsoft.UI.Xaml` (Windows App SDK / WinUI 3). Distinct from `System.Windows.Window` (WPF) and the UWP `Windows.UI.Xaml.Window` class.

## Related

- [AppWindow](./app-window.md)
- [Multiple windows](./multiple-windows.md)
- [Win32 HWND interop](./win32-interop.md)
