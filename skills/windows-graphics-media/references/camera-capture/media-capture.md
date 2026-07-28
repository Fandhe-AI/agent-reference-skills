# MediaCapture

Provides functionality for capturing photos, audio, and videos from a capture device, such as a webcam. The core class for programmatic camera and microphone access.

## Signature / Usage

```csharp
public sealed class MediaCapture : System.IDisposable
```

```csharp
Windows.Media.Capture.MediaCapture captureManager;

async private void InitCamera_Click(object sender, RoutedEventArgs e)
{
    captureManager = new MediaCapture();
    await captureManager.InitializeAsync();
}

async private void StartCapturePreview_Click(object sender, RoutedEventArgs e)
{
    capturePreview.Source = captureManager;
    await captureManager.StartPreviewAsync();
}

async private void StopCapturePreview_Click(object sender, RoutedEventArgs e)
{
    await captureManager.StopPreviewAsync();
}
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `VideoDeviceController` | `VideoDeviceController` | Gets an object that controls settings for the video camera (focus, exposure, zoom, white balance, flash, etc). |
| `AudioDeviceController` | `AudioDeviceController` | Gets an object that controls settings for the microphone. |
| `CameraStreamState` | `CameraStreamState` | Gets the current stream state of the camera stream (`NotStreaming`, `Streaming`, `BlockedForPrivacy`, `Shutdown`). |
| `FrameSources` | `IMapView<String, MediaFrameSource>` | Read-only dictionary of `MediaFrameSource` objects that can be used simultaneously to acquire media frames. |
| `MediaCaptureSettings` | `MediaCaptureSettings` | Gets the configuration settings for the `MediaCapture` object. |
| `ThermalStatus` | `MediaCaptureThermalStatus` | Gets the current thermal status of the capture device. |

## Methods

| Name | Description |
|------|-------------|
| `InitializeAsync()` | Initializes the object using default settings. Must be called before previewing or capturing. |
| `InitializeAsync(MediaCaptureInitializationSettings)` | Initializes the object with the specified settings. Launches a consent prompt for camera/microphone access. |
| `StartPreviewAsync()` | Starts the preview stream. |
| `StopPreviewAsync()` | Stops the preview stream. |
| `StartRecordToStorageFileAsync(MediaEncodingProfile, IStorageFile)` | Starts recording asynchronously to a storage file. |
| `StartRecordToStreamAsync(MediaEncodingProfile, IRandomAccessStream)` | Starts recording to a random-access stream. |
| `StopRecordAsync()` | Stops recording. |
| `CapturePhotoToStorageFileAsync(ImageEncodingProperties, IStorageFile)` | Captures a photo to a storage file. |
| `CapturePhotoToStreamAsync(ImageEncodingProperties, IRandomAccessStream)` | Captures a photo to a random-access stream. |
| `CreateFrameReaderAsync(MediaFrameSource)` | Creates a `MediaFrameReader` to acquire frames from a `MediaFrameSource`. |
| `PrepareLowLagPhotoCaptureAsync(ImageEncodingProperties)` | Initializes low shutter lag photo capture, returning a `LowLagPhotoCapture` object. |
| `PrepareLowLagRecordToStorageFileAsync(MediaEncodingProfile, IStorageFile)` | Initializes low lag recording to a file, returning a `LowLagMediaRecording` object. |
| `Close()` / `Dispose()` | Closes the media capture object and releases resources. |

## Events

| Name | Description |
|------|-------------|
| `Failed` | Raised when an error occurs during media capture. Provides `MediaCaptureFailedEventArgs` with `Code` and `Message`. |
| `CameraStreamStateChanged` | Occurs when the state of the camera stream changes. |
| `RecordLimitationExceeded` | Occurs when the record limit is exceeded. |
| `ThermalStatusChanged` | Occurs when the thermal status of the capture device changes. |

## Notes

- Namespace: `Windows.Media.Capture` (WinRT). Distinct from Android CameraX (`androidx.camera.*`) and Apple AVFoundation (`AVCaptureSession`).
- `InitializeAsync` must be called before starting preview or capture; in C#/C++ apps it should be called from the STA/UI thread. It triggers the OS consent prompt for camera/microphone access.
- Apps must declare the `webcam` / `microphone` app capabilities in the package manifest when using `MediaCapture` directly (unlike `CameraCaptureUI`, which must NOT declare them).
- Apps must handle app suspension/termination by disposing the `MediaCapture` object and associated resources.
- `MediaCapture` only supports one-pass CBR encoding; JPEG capture types are passthrough only.
- This class is not agile — consider its threading model when marshaling across threads.

## Related

- [MediaCaptureInitializationSettings](./media-capture-initialization-settings.md)
- [CameraCaptureUI](./camera-capture-ui.md)
- [LowLagPhotoCapture](./low-lag-photo-capture.md)
- [LowLagMediaRecording](./low-lag-media-recording.md)
- [MediaFrameReader](./media-frame-reader.md)
- [VideoDeviceController](./video-device-controller.md)
- [Camera device enumeration](./device-enumeration.md)
- [Camera capabilities and privacy](./camera-capabilities-privacy.md)
