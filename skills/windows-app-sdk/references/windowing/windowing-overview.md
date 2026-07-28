# Windowing overview

Windowing functionality in a WinUI app is provided by a combination of the XAML `Window` class and the `AppWindow` class, both based on the Win32 HWND model. `AppWindow` represents a high-level abstraction of the HWND, with a 1:1 mapping between an `AppWindow` and a top-level HWND.

## Signature / Usage

```csharp
// AppWindow uses physical device pixels (Window Coordinate System);
// XAML Window uses effective pixels (epx).
Microsoft.UI.Xaml.Window xamlWindow;      // attach content, manage lifecycle
Microsoft.UI.Windowing.AppWindow appWindow = xamlWindow.AppWindow; // WASDK 1.4+
```

## Notes

- The XAML `Window` object is created first; the HWND is created when `Window.Activate` is called; `AppWindow` shares the same lifetime as the HWND.
- `AppWindow` APIs work with any UI framework the Windows App SDK supports: WinUI, WPF, WinForms, or Win32.
- Starting in Windows App SDK 1.4, use `Window.AppWindow` to get the `AppWindow` for a XAML `Window`. For earlier versions, use the Win32 interop functions (`Win32Interop.GetWindowIdFromWindow` + `AppWindow.GetFromWindowId`).
- `AppWindow` is responsible for the non-client portion of the window (size, position, title bar, presenter); XAML `Window` is responsible for content and appearance (`SystemBackdrop`, `Content`).
- Package: `Microsoft.UI.Windowing` / `Microsoft.UI.Xaml` (Windows App SDK / WinUI 3). Distinct from `System.Windows.Window` (WPF), `System.Windows.Forms.Form` (WinForms), UWP `Windows.UI.Xaml.Window`, and unrelated `Window` concepts in apple-swiftui / android-* skills.

## Related

- [AppWindow](./app-window.md)
- [Microsoft.UI.Xaml.Window](./xaml-window.md)
- [Multiple windows](./multiple-windows.md)
- [Win32 HWND interop](./win32-interop.md)
