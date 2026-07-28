# Win32 HWND interop (Win32Interop)

Interop functions bridging `WindowId`/`AppWindow` and Win32 `HWND`. C# apps use the `Microsoft.UI.Win32Interop` wrapper class; C++ apps use the `microsoft.ui.interop.h` (or `winrt/Microsoft.ui.interop.h`) functions directly.

## Signature / Usage

```csharp
using Microsoft.UI;
using Microsoft.UI.Windowing;
using WinRT.Interop;

// Retrieve HWND for a WinUI Window
IntPtr hWnd = WindowNative.GetWindowHandle(this);

// HWND -> WindowId -> AppWindow
WindowId windowId = Win32Interop.GetWindowIdFromWindow(hWnd);
AppWindow appWindow = AppWindow.GetFromWindowId(windowId);

// WindowId -> HWND
IntPtr hWndBack = Win32Interop.GetWindowFromWindowId(windowId);
```

```cppwinrt
// pch.h
#include "microsoft.ui.xaml.window.h" // IWindowNative
#include <winrt/Microsoft.UI.Interop.h> // WindowId, GetWindowIdFromWindow

auto windowNative{ this->m_inner.as<::IWindowNative>() };
HWND hWnd{ 0 };
windowNative->get_WindowHandle(&hWnd);
Microsoft::UI::WindowId windowId = Microsoft::UI::GetWindowIdFromWindow(hWnd);
Microsoft::UI::Windowing::AppWindow appWindow = Microsoft::UI::Windowing::AppWindow::GetFromWindowId(windowId);
```

## Options / Props

| Name | Description |
|------|-------------|
| `WindowNative.GetWindowHandle(object)` | (C# `WinRT.Interop`) Gets the HWND for a WinUI XAML `Window`. |
| `IWindowNative::get_WindowHandle` | (C++/WinRT) Same, via the `IWindowNative` interface implemented by `Window`. |
| `Win32Interop.GetWindowIdFromWindow(IntPtr hwnd)` | Gets the `WindowId` for the given HWND. |
| `Win32Interop.GetWindowFromWindowId(WindowId)` | Gets the HWND for the given `WindowId`. |
| `Win32Interop.GetIconIdFromIcon(HICON)` / `GetIconFromIconId(IconId)` | Converts between `HICON` and `IconId`. |
| `Win32Interop.GetDisplayIdFromMonitor(HMONITOR)` / `GetMonitorFromDisplayId(DisplayId)` | Converts between `HMONITOR` and `DisplayId`. |

## Notes

- `GetWindowIdFromWindow` + `AppWindow.GetFromWindowId` is the recipe for getting an `AppWindow` from any framework's window object (WPF, WinForms, Win32) or when not using Windows App SDK 1.3+ (where `Window.AppWindow` is available directly).
- C# wrappers live in `Microsoft.UI.Win32Interop`; the underlying C headers are `microsoft.ui.interop.h` (C) and `winrt/Microsoft.ui.interop.h` (C++/WinRT, no `microsoft.ui.h` dependency).
- `UIElement.XamlRoot` → `XamlRoot.ContentIslandEnvironment` → `ContentIslandEnvironment.AppWindowId` is an alternative way to get a `WindowId` from a visual element without an HWND round-trip.
- Package: `Microsoft.UI` interop headers / `WinRT.Interop` (Windows App SDK).

## Related

- [AppWindow](./app-window.md)
- [WindowId](./window-id.md)
- [Microsoft.UI.Xaml.Window](./xaml-window.md)
