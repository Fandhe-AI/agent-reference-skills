# FaceDetector

Detects faces in a single `SoftwareBitmap`. Has no memory of previously processed frames; for efficient detection across a sequence of video frames, prefer `FaceTracker`, which reuses information from prior frames.

## Signature / Usage

```csharp
public sealed class FaceDetector
```

```csharp
if (!FaceDetector.IsSupported)
{
    return;
}

FaceDetector faceDetector = await FaceDetector.CreateAsync();

// The SoftwareBitmap must be in a format the detector supports on this device;
// check with GetSupportedBitmapPixelFormats()/IsBitmapPixelFormatSupported and Convert if needed.
BitmapPixelFormat detectorFormat = FaceDetector.GetSupportedBitmapPixelFormats().First();
SoftwareBitmap converted = SoftwareBitmap.Convert(inputBitmap, detectorFormat);
IList<DetectedFace> faces = await faceDetector.DetectFacesAsync(converted);
```

## Options / Props

| Name | Description |
|------|-------------|
| `FaceDetector.IsSupported` | Static property. Whether `FaceDetector` is supported on the current device. |
| `FaceDetector.CreateAsync()` | Static method. Creates a new `FaceDetector` instance. |
| `MaxDetectableFaceSize` / `MinDetectableFaceSize` | Get/set the maximum/minimum detectable face size, in pixels. |
| `FaceDetector.GetSupportedBitmapPixelFormats()` | Static method. Returns the list of `BitmapPixelFormat` values the detector supports on the current device. |
| `FaceDetector.IsBitmapPixelFormatSupported(BitmapPixelFormat)` | Static method. Queries whether a specific pixel format is supported. |
| `DetectFacesAsync(SoftwareBitmap image)` | Asynchronously detects faces in the provided `SoftwareBitmap`; returns an `IList<DetectedFace>`. |
| `DetectFacesAsync(SoftwareBitmap image, BitmapBounds searchArea)` | Asynchronously detects faces within `searchArea` of the provided `SoftwareBitmap`, instead of the whole image. |

## Notes

- Namespace: `Windows.Media.FaceAnalysis` (WinRT).
- The `SoftwareBitmap` passed to either `DetectFacesAsync` overload must already be in a pixel format the detector supports; use `GetSupportedBitmapPixelFormats()`/`IsBitmapPixelFormatSupported` to check which formats are supported on the current device, and `SoftwareBitmap.Convert` to convert if needed.
- Detects faces in a single still image with no memory of prior frames — for repeated detection across a sequence of video frames, `FaceTracker` is more efficient since it reuses information from previously processed frames.

## Related

- [FaceTracker](./face-tracker.md)
- [SoftwareBitmap](./software-bitmap.md)
