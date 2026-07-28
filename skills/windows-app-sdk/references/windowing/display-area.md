# DisplayArea

Represents the area of a display in which a view can be shown to a user (`Microsoft.UI.Windowing.DisplayArea`) — a monitor or display region, used for positioning windows.

## Signature / Usage

```csharp
using Microsoft.UI.Windowing;

RectInt32? workArea = DisplayArea.GetFromWindowId(appWindow.Id, DisplayAreaFallback.Nearest)?.WorkArea;
if (workArea != null)
{
    appWindow.Move(new PointInt32(
        (workArea.Value.Width - appWindow.Size.Width) / 2,
        (workArea.Value.Height - appWindow.Size.Height) / 2));
}
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `DisplayId` | `DisplayId` (read-only) | Identifier for the display associated with this `DisplayArea`. |
| `IsPrimary` | `bool` (read-only) | Whether this `DisplayArea` is on the primary monitor. |
| `OuterBounds` | `RectInt32` (read-only) | Bounds of the `DisplayArea` in screen coordinates. |
| `WorkArea` | `RectInt32` (read-only) | Work area (excludes taskbar etc.), relative to the display area's bounds. |
| `Primary` | `DisplayArea` (static, read-only) | The primary `DisplayArea` for the desktop. |

**Methods**: `FindAll()` (static) — all display areas currently present; `GetFromDisplayId(DisplayId)`, `GetFromPoint(PointInt32, DisplayAreaFallback)`, `GetFromRect(RectInt32, DisplayAreaFallback)`, `GetFromWindowId(WindowId, DisplayAreaFallback)` (static) — resolve a `DisplayArea`; `CreateWatcher()` — creates a `DisplayAreaWatcher`.

## Notes

- Package: `Microsoft.UI.Windowing` (Windows App SDK / WinUI 3).

## Related

- [DisplayAreaWatcher](./display-area-watcher.md)
- [AppWindow](./app-window.md)
