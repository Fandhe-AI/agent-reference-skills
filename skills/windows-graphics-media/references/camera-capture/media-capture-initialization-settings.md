# MediaCaptureInitializationSettings

Contains initialization settings for the `MediaCapture` object, passed to `MediaCapture.InitializeAsync`.

## Signature / Usage

```csharp
public sealed class MediaCaptureInitializationSettings
```

```csharp
var settings = new Windows.Media.Capture.MediaCaptureInitializationSettings();
settings.AudioDeviceId = "";
settings.VideoDeviceId = deviceList[0].Id;
settings.StreamingCaptureMode = Windows.Media.Capture.StreamingCaptureMode.AudioAndVideo;
settings.PhotoCaptureSource = Windows.Media.Capture.PhotoCaptureSource.VideoPreview;

await mediaCapture.InitializeAsync(settings);
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `VideoDeviceId` | `String` | The `DeviceInformation.Id` of the video camera to use. |
| `AudioDeviceId` | `String` | The `DeviceInformation.Id` of the microphone to use. |
| `StreamingCaptureMode` | `StreamingCaptureMode` | Whether to capture `Audio`, `Video`, or `AudioAndVideo`. |
| `PhotoCaptureSource` | `PhotoCaptureSource` | The stream used for photo capture (e.g. `VideoPreview`, `Photo`, `Auto`). |
| `MediaCategory` | `MediaCategory` | The media category (e.g. `Communications` for low-latency audio). |
| `SharingMode` | `MediaCaptureSharingMode` | `ExclusiveControl` (can change camera configuration) or `SharedReadOnly` (view/capture only; some settings become unconfigurable). |
| `SourceGroup` | `MediaFrameSourceGroup` | The `MediaFrameSourceGroup` to initialize with; defines a set of frame sources usable simultaneously (e.g. color + depth + infrared). |
| `MemoryPreference` | `MediaCaptureMemoryPreference` | Preferred memory location (CPU/GPU/`Auto`) for frames acquired from a `MediaFrameSource`. |
| `VideoProfile` | `MediaCaptureVideoProfile` | A video profile providing hints to the driver to optimize for a capture scenario. |
| `AlwaysPlaySystemShutterSound` | `Boolean` | Whether the system should always play a shutter sound on photo capture. |
| `DeviceUri` | `Uri` | URI of a remote (IP) capture device to initialize. |
| `DeviceUriPasswordCredential` | `PasswordCredential` | Credentials for accessing the remote capture device. |

## Notes

- Namespace: `Windows.Media.Capture` (WinRT).
- When `SharingMode` is `SharedReadOnly`, some properties of this settings object cannot be configured.
- Assigning a `MediaFrameSourceGroup` via `SourceGroup` is the standard way to initialize `MediaCapture` for multi-source scenarios such as depth/infrared cameras.

## Related

- [MediaCapture](./media-capture.md)
- [MediaFrameSourceGroup and MediaFrameReader](./media-frame-reader.md)
