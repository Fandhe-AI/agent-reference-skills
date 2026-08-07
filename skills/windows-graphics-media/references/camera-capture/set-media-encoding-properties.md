# Set Media Encoding Properties

Uses `IMediaEncodingProperties` (via `VideoDeviceController`) to enumerate and set the resolution and frame rate of the camera preview, photo, and video-record streams, and to keep the preview and capture aspect ratios matched.

## Signature / Usage

```csharp
// Enumerate available encoding properties for a stream type
IEnumerable<IMediaEncodingProperties> props =
    m_mediaCapture.VideoDeviceController.GetAvailableMediaStreamProperties(MediaStreamType.VideoRecord);

// Set the desired properties (requires exclusive camera access)
await m_mediaCapture.VideoDeviceController.SetMediaStreamPropertiesAsync(
    MediaStreamType.VideoPreview, encodingProperties);

// Read the current properties for a stream type
var previewProps = m_mediaCapture.VideoDeviceController
    .GetMediaStreamProperties(MediaStreamType.VideoPreview);
```

## Notes

- `GetAvailableMediaStreamProperties` may return `ImageEncodingProperties` or `VideoEncodingProperties` regardless of the requested `MediaStreamType` — always check/cast the type.
- On some devices the preview and capture streams share the same hardware pin; check `MediaCaptureSettings.VideoDeviceCharacteristic` for `AllStreamsIdentical` / `PreviewRecordStreamsIdentical` to know whether setting one stream's properties affects the other.
- `SetMediaStreamPropertiesAsync` requires the app to have exclusive control of the capture device.
- Mismatched preview/capture aspect ratios cause frame cropping that can show content in captured media that wasn't visible in the preview — match aspect ratios within a small tolerance (the article uses `0.015`), even if resolutions differ.
- Camera profiles (`MediaCaptureVideoProfile`) offer a simpler, higher-level alternative for discovering/selecting stream properties, but aren't supported on all devices.

## Related

- [MediaCapture](./media-capture.md)
- [VideoDeviceController](./video-device-controller.md)
- [Camera profiles (MediaCaptureVideoProfile)](./camera-profiles.md)
