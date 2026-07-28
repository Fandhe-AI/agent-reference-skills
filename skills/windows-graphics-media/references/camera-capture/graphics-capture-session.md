# GraphicsCaptureSession

Allows the application to take screen captures — starts and manages an active screen/window capture bound to a `Direct3D11CaptureFramePool` and `GraphicsCaptureItem`.

## Signature / Usage

```csharp
public sealed class GraphicsCaptureSession : System.IDisposable
```

```csharp
GraphicsCaptureSession session = framePool.CreateCaptureSession(item);
session.IsCursorCaptureEnabled = false;
session.IsBorderRequired = true;
session.StartCapture();

// later
session.Dispose();
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `IsCursorCaptureEnabled` | `Boolean` | Whether the cursor is included in the captured content. |
| `IsBorderRequired` | `Boolean` | Whether a colored border must be drawn around the captured window/display to indicate capture is in progress. |
| `IncludeSecondaryWindows` | `Boolean` | Whether secondary windows are included in the capture. |

## Methods

| Name | Description |
|------|-------------|
| `StartCapture()` | Starts the capture session, allowing frames to be produced into the bound frame pool. |
| `IsSupported()` (static) | Returns whether screen capture is supported on the current device. |
| `Close()` / `Dispose()` | Closes the session and releases resources. |

## Notes

- Namespace: `Windows.Graphics.Capture` (WinRT).
- Created via `Direct3D11CaptureFramePool.CreateCaptureSession(GraphicsCaptureItem)`.
- Setting `IsBorderRequired = false` requires the `screenCapturePermissionBorderless` (or equivalent) restricted capability and OS support; otherwise the border cannot be suppressed.

## Related

- [GraphicsCaptureItem](./graphics-capture-item.md)
- [Direct3D11CaptureFramePool](./direct3d11-capture-frame-pool.md)
