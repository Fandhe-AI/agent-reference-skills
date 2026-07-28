# LowLagMediaRecording

Provides methods for performing a low-lag media recording, allowing recording to be started, paused, resumed, and stopped with minimal latency.

## Signature / Usage

```csharp
public sealed class LowLagMediaRecording
```

```csharp
MediaEncodingProfile profile = MediaEncodingProfile.CreateMp4(VideoEncodingQuality.Auto);
StorageFile file = await KnownFolders.VideosLibrary.CreateFileAsync("video.mp4", CreationCollisionOption.GenerateUniqueName);

LowLagMediaRecording recording = await mediaCapture.PrepareLowLagRecordToStorageFileAsync(profile, file);

await recording.StartAsync();
// ... recording ...
await recording.StopAsync();
await recording.FinishAsync();
```

## Methods

| Name | Description |
|------|-------------|
| `StartAsync()` | Asynchronously starts the low lag media recording. |
| `StopAsync()` | Asynchronously stops the recording; can be restarted with `StartAsync()`. |
| `PauseAsync(MediaCapturePauseBehavior)` | Pauses an ongoing recording. |
| `ResumeAsync()` | Resumes a paused recording. |
| `FinishAsync()` | Releases the `LowLagMediaRecording` object and its resources. A new object must be prepared via one of the `MediaCapture.PrepareLowLagRecord*Async` methods to record again. |

## Notes

- Namespace: `Windows.Media.Capture` (WinRT).
- Obtained via one of `MediaCapture.PrepareLowLagRecordToStreamAsync`, `PrepareLowLagRecordToStorageFileAsync`, or `PrepareLowLagRecordToCustomSinkAsync`, all of which must be called before `StartAsync()`.
- If the media type changes or an effect is added/removed, re-prepare a new `LowLagMediaRecording` object.

## Related

- [MediaCapture](./media-capture.md)
- [LowLagPhotoCapture](./low-lag-photo-capture.md)
