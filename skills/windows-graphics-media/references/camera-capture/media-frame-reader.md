# MediaFrameReader

Provides access to frames from a `MediaFrameSource` and notifies the app when a new frame arrives. Used for advanced scenarios such as depth, infrared, and multi-camera frame processing.

## Signature / Usage

```csharp
public sealed class MediaFrameReader : System.IDisposable
```

```csharp
MediaFrameReader frameReader = await mediaCapture.CreateFrameReaderAsync(frameSource);
frameReader.FrameArrived += FrameReader_FrameArrived;
await frameReader.StartAsync();

void FrameReader_FrameArrived(MediaFrameReader sender, MediaFrameArrivedEventArgs args)
{
    using (var frame = sender.TryAcquireLatestFrame())
    {
        if (frame != null)
        {
            // process frame.VideoMediaFrame, frame.DepthMediaFrame, etc.
        }
    }
}
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `AcquisitionMode` | `MediaFrameReaderAcquisitionMode` | How the reader manages frames when a new frame arrives before the previous one was processed. |

## Methods

| Name | Description |
|------|-------------|
| `StartAsync()` | Asynchronously starts reading frames from the `MediaFrameSource`. |
| `StopAsync()` | Asynchronously stops reading frames. |
| `TryAcquireLatestFrame()` | Attempts to obtain a `MediaFrameReference` for the latest frame from the source. |
| `Close()` / `Dispose()` | Disposes the reader and its resources. |

## Events

| Name | Description |
|------|-------------|
| `FrameArrived` | Occurs when a new frame arrives from the associated `MediaFrameSource`. |

## Notes

- Namespace: `Windows.Media.Capture.Frames` (WinRT).
- Obtained by calling `MediaCapture.CreateFrameReaderAsync(MediaFrameSource, ...)` on a `MediaCapture` object initialized with the desired frame source (color, depth, or infrared).
- `MediaCapture.CreateMultiSourceFrameReaderAsync` creates a `MultiSourceMediaFrameReader` for time-correlated frames from multiple sources simultaneously.

## Related

- [MediaFrameSourceGroup](./media-frame-source-group.md)
- [MediaCapture](./media-capture.md)
