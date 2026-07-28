# CameraStreamState

Enum defining the current state of a camera stream, exposed via `MediaCapture.CameraStreamState` and the `CameraStreamStateChanged` event.

## Signature / Usage

```csharp
public enum CameraStreamState
```

```csharp
mediaCapture.CameraStreamStateChanged += (sender, args) =>
{
    if (sender.CameraStreamState == CameraStreamState.BlockedForPrivacy)
    {
        // camera privacy shutter or setting is blocking frames
    }
};
```

## Options / Props

| Name | Value | Description |
|------|-------|-------------|
| `NotStreaming` | 0 | The camera stream is not currently streaming. |
| `Streaming` | 1 | The camera stream is currently streaming. |
| `BlockedForPrivacy` | 2 | Frames are being dropped for privacy reasons (e.g. hardware camera shutter or OS privacy setting). |
| `Shutdown` | 3 | The camera stream has been shut down. |

## Notes

- Namespace: `Windows.Media.Devices` (WinRT).

## Related

- [MediaCapture](./media-capture.md)
