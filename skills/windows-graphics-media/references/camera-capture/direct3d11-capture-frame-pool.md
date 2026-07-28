# Direct3D11CaptureFramePool

Stores frames captured by a `GraphicsCaptureSession` for the application to consume, and raises an event whenever a new frame is stored.

## Signature / Usage

```csharp
public sealed class Direct3D11CaptureFramePool : System.IDisposable
```

```csharp
var framePool = Direct3D11CaptureFramePool.Create(
    d3dDevice,
    DirectXPixelFormat.B8G8R8A8UIntNormalized,
    2,
    item.Size);

framePool.FrameArrived += (pool, args) =>
{
    using (var frame = pool.TryGetNextFrame())
    {
        // process frame.Surface
    }
};

GraphicsCaptureSession session = framePool.CreateCaptureSession(item);
session.StartCapture();
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `DispatcherQueue` | `DispatcherQueue` | The dispatcher queue used by the frame pool. |

## Methods

| Name | Description |
|------|-------------|
| `Create(IDirect3DDevice, DirectXPixelFormat, Int32, SizeInt32)` (static) | Creates a frame pool with the given device, pixel format, buffer count, and frame size. |
| `CreateFreeThreaded(IDirect3DDevice, DirectXPixelFormat, Int32, SizeInt32)` (static) | Creates a frame pool without a `DispatcherQueue` dependency; `FrameArrived` fires on an internal worker thread. |
| `CreateCaptureSession(GraphicsCaptureItem)` | Creates a `GraphicsCaptureSession` bound to this frame pool and the given capture item. |
| `TryGetNextFrame()` | Retrieves the next captured frame from the pool, or `null` if none is available. |
| `Recreate(IDirect3DDevice, DirectXPixelFormat, Int32, SizeInt32)` | Recreates the frame pool, e.g. after a size change. |
| `Close()` / `Dispose()` | Disposes the frame pool and releases its resources. |

## Events

| Name | Description |
|------|-------------|
| `FrameArrived` | Raised when a new captured frame is stored in the pool. |

## Notes

- Namespace: `Windows.Graphics.Capture` (WinRT).
- Recreate the frame pool (via `Recreate`) when the size of the capture target changes, typically detected in the `FrameArrived` handler by comparing frame content size to the pool's configured size.

## Related

- [GraphicsCaptureItem](./graphics-capture-item.md)
- [GraphicsCaptureSession](./graphics-capture-session.md)
