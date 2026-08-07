# Effects for Video Capture (Video Stabilization)

Adds/removes `IVideoEffectDefinition` effects to a `MediaCapture` preview or record stream via `AddVideoEffectAsync`, and covers the built-in `VideoStabilizationEffect`, which crops frames to counteract handheld shake.

## Signature / Usage

```csharp
// Add an effect to the record (and optionally preview) stream
myRecordEffect = await m_mediaCapture.AddVideoEffectAsync(myEffectDefinition, MediaStreamType.VideoRecord);

// Remove a specific effect, or clear all effects from a stream
await m_mediaCapture.RemoveEffectAsync(myRecordEffect);
await m_mediaCapture.ClearEffectsAsync(MediaStreamType.VideoPreview);
```

```csharp
// Video stabilization
var stabilizerDefinition = new VideoStabilizationEffectDefinition();
m_videoStabilizationEffect =
    (VideoStabilizationEffect)await m_mediaCapture.AddVideoEffectAsync(
        stabilizerDefinition, MediaStreamType.VideoRecord);

m_videoStabilizationEffect.EnabledChanged += VideoStabilizationEffect_EnabledChanged;
await SetUpVideoStabilizationRecommendationAsync();
m_videoStabilizationEffect.Enabled = true;
```

## Methods

| Name | Description |
|------|-------------|
| `MediaCapture.AddVideoEffectAsync(definition, streamType)` | Adds a video effect to the preview or record stream; returns an `IMediaExtension` (e.g. `VideoStabilizationEffect`). |
| `MediaCapture.RemoveEffectAsync(effect)` | Removes a previously added effect; auto-detects which stream it was added to (Windows 10 1607+). |
| `MediaCapture.ClearEffectsAsync(streamType)` | Removes all effects from the specified stream. |
| `VideoStabilizationEffect.GetRecommendedStreamConfiguration(controller, video)` | Returns recommended input/output `VideoStreamConfiguration` to minimize upscaling/cropping loss from stabilization. |

## Notes

- If `MediaCaptureSettings.VideoDeviceCharacteristic` is `AllStreamsIdentical` or `PreviewRecordStreamsIdentical`, adding an effect to one stream affects both preview and record.
- Stabilization crops frame edges (pixels shift, and content just outside the frame is unknown); devices with hardware Optical Image Stabilization (OIS) don't need this cropping.
- Use `GetRecommendedStreamConfiguration` to bump the input resolution and adjust the output `MediaEncodingProfile.Video` so the stabilized output isn't upscaled from the cropped result.
- The system can auto-disable stabilization if pixel throughput is too high or performance drops; listen for `VideoStabilizationEffect.EnabledChanged` (reason `Programmatic` when you toggle it yourself) to update UI.
- On cleanup, call `RemoveEffectAsync`, restore any backed-up input/output encoding properties, and unregister the `EnabledChanged` handler.

## Related

- [MediaCapture](./media-capture.md)
- [Set format, resolution, and frame rate for MediaCapture](./set-media-encoding-properties.md)
