# Use OpenCV with MediaFrameReader

Read color frames with `MediaFrameReader`, blur each with OpenCV through a native `OpenCVBridge` Windows Runtime component, and display the result in a XAML `Image`.

## Signature / Usage

```csharp
// Outline assembled from the API names in the article (the article's full listing is a code include)
// 1. MediaFrameSourceGroup.FindAllAsync -> pick a group providing an RGB camera
// 2. MediaCaptureInitializationSettings: SourceGroup = group, MemoryPreference = MediaCaptureMemoryPreference.Cpu
// 3. mediaCapture.FrameSources -> RGB frame source
// 4. Optional BitmapSize argument resizes frames (article uses 640 x 480)
MediaFrameReader reader = await mediaCapture.CreateFrameReaderAsync(frameSource /*, format, bitmapSize */);
reader.FrameArrived += (sender, args) =>
{
    using (var frame = sender.TryAcquireLatestFrame())
    {
        if (frame == null) return;
        // SoftwareBitmap from frame.VideoMediaFrame; convert to Bgra8 + Premultiplied if needed
        // Create a target SoftwareBitmap with matching properties, call OpenCVHelper.Blur(src, dst)
    }
};
await reader.StartAsync();
```

## Notes

- `OpenCV.Win.Core` and `OpenCV.Win.ImgProc` NuGet packages are not regularly updated and do not pass Store compliance checks; intended for experimentation only. Build OpenCV from source before submitting to the Store.
- The `OpenCVHelper` technique needs image data in CPU memory, so set `MemoryPreference` to CPU in `MediaCaptureInitializationSettings`.
- The helper requires `SoftwareBitmap` in BGRA8 pixel format with premultiplied alpha; convert frames that arrive in another format.
- Builds on "Process media frames with MediaFrameReader" (which provides the `FrameRenderer` helper class) and "Process software bitmaps with OpenCV" (which creates the `OpenCVBridge` component).
- The article is a UWP-era article (`windows/uwp/audio-video-camera`); it uses `SoftwareBitmapSource` from `Windows.UI.Xaml.Media.Imaging` (UWP XAML).
- Full sample: Camera Frames + OpenCV Sample in the Windows-universal-samples repo.
- Source: https://learn.microsoft.com/en-us/windows/uwp/audio-video-camera/use-opencv-with-mediaframereader (ms.date 02/08/2017).

## Related

- [MediaFrameReader](./media-frame-reader.md)
- [MediaFrameSourceGroup](./media-frame-source-group.md)
- [SoftwareBitmap](./software-bitmap.md)
- [Process bitmaps with OpenCV](./process-software-bitmaps-with-opencv.md)
