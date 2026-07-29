# FaceTracker

Detects faces in `VideoFrame` objects and tracks faces efficiently across a sequence of video frames, using information from previously processed frames to optimize detection. More efficient for video than repeatedly running `FaceDetector` (which detects faces in a single still image with no memory of prior frames).

## Signature / Usage

```csharp
public sealed class FaceTracker
```

```csharp
private FaceTracker _faceTracker;

_faceTracker = await FaceTracker.CreateAsync();

// Called periodically (e.g. from a DispatcherTimer) with a VideoFrame,
// such as one obtained from a MediaCapture preview stream.
const BitmapPixelFormat faceDetectionPixelFormat = BitmapPixelFormat.Nv12;

if (currentFrame.SoftwareBitmap.BitmapPixelFormat == faceDetectionPixelFormat)
{
    IList<DetectedFace> detectedFaces = await _faceTracker.ProcessNextFrameAsync(currentFrame);
}
```

## Options / Props

| Name | Description |
|------|-------------|
| `FaceTracker.CreateAsync()` | Static method. Creates a new `FaceTracker` instance. |
| `IsSupported` | Static property. Whether `FaceTracker` is supported on the current device. |
| `MaxDetectableFaceSize` / `MinDetectableFaceSize` | Get/set the maximum/minimum detectable face size, in pixels. |
| `GetSupportedBitmapPixelFormats()` | Returns the list of `BitmapPixelFormat` values the tracker supports on the current device. |
| `IsBitmapPixelFormatSupported(BitmapPixelFormat)` | Queries whether a specific pixel format is supported. |
| `ProcessNextFrameAsync(VideoFrame)` | Asynchronously processes a `VideoFrame` and returns an `IList<DetectedFace>` for that frame. |

## Notes

- Namespace: `Windows.Media.FaceAnalysis` (WinRT).
- Like `FaceDetector`, `FaceTracker` supports only a limited set of pixel formats; the documented sample checks for `BitmapPixelFormat.Nv12` and skips processing (rather than converting) when a `VideoFrame`'s `SoftwareBitmap` is not already in that format. Use `GetSupportedBitmapPixelFormats()`/`IsBitmapPixelFormatSupported` to check dynamically instead of hardcoding a format.
- `DetectedFace.FaceBox` (a `BitmapBounds`) gives the face rectangle in coordinates relative to the source frame's pixel dimensions.
- Distinct from the `FaceDetectionEffect` built into the `MediaCapture` preview pipeline: `FaceTracker` works on any `VideoFrame` you supply (e.g. from a picture file, `MediaFrameReader`, or a custom `IBasicVideoEffect`), while `FaceDetectionEffect` is registered directly on a `MediaCapture` stream via `AddVideoEffectAsync`.

## Related

- [SceneAnalysisEffect / FaceDetectionEffect](./scene-analysis-face-detection-effects.md)
- [SoftwareBitmap](./software-bitmap.md)
- [MediaFrameReader](./media-frame-reader.md)
