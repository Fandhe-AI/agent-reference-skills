# WindowId

Defines an identifier for a top-level window (`Microsoft.UI.WindowId`, a struct). Identifies both the `AppWindow` and the top-level Win32 HWND it's associated with; used to track window instances (e.g., in a `Dictionary<WindowId, Window>`).

## Signature / Usage

```csharp
using Microsoft.UI;

WindowId windowId = this.XamlRoot.ContentIslandEnvironment.AppWindowId;

// From HWND via interop
WindowId fromHwnd = Win32Interop.GetWindowIdFromWindow(hWnd);

var activeWindows = new Dictionary<WindowId, Microsoft.UI.Xaml.Window>();
activeWindows.Add(window.AppWindow.Id, window);
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `Value` | `ulong` | The identifier value for a top-level window. |

## Notes

- Created automatically; there is no way to construct one directly other than from an existing window/HWND.
- Access from a visual element via `UIElement.XamlRoot` → `XamlRoot.ContentIslandEnvironment` → `ContentIslandEnvironment.AppWindowId`.
- Package: `Microsoft.UI` (Windows App SDK).

## Related

- [AppWindow](./app-window.md)
- [Win32 HWND interop](./win32-interop.md)
- [Multiple windows](./multiple-windows.md)
