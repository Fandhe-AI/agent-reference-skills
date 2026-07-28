# GraphicsCaptureItem

Represents the target of a screen capture — a window, display, or visual — chosen via `GraphicsCapturePicker` or created directly from a window/display ID.

## Signature / Usage

```csharp
public sealed class GraphicsCaptureItem
```

```csharp
var picker = new GraphicsCapturePicker();
GraphicsCaptureItem item = await picker.PickSingleItemAsync();

if (item != null)
{
    // item.DisplayName, item.Size
    item.Closed += (sender, args) => { /* target closed */ };
}
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `DisplayName` | `String` | Display name of the capture target (e.g. application title). |
| `Size` | `SizeInt32` | Size of the capture target. |

## Methods

| Name | Description |
|------|-------------|
| `CreateFromVisual(Visual)` (static) | Constructs a `GraphicsCaptureItem` representing the given Composition `Visual`. |
| `TryCreateFromDisplayId(DisplayId)` (static) | Attempts to create an item for the display with the specified `DisplayId`. |
| `TryCreateFromWindowId(WindowId)` (static) | Attempts to create an item for the window with the specified `WindowId`. |

## Events

| Name | Description |
|------|-------------|
| `Closed` | Raised when the target of the capture has been closed (e.g. the captured window was closed). |

## Notes

- Namespace: `Windows.Graphics.Capture` (WinRT). Screen/window capture API, distinct from the `Windows.Media.Capture` camera APIs and from any browser or Android `MediaProjection` screen capture API.

## Related

- [GraphicsCapturePicker](./graphics-capture-picker.md)
- [Direct3D11CaptureFramePool](./direct3d11-capture-frame-pool.md)
- [GraphicsCaptureSession](./graphics-capture-session.md)
