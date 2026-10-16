# Process audio frames with MediaFrameReader

Use a `MediaFrameReader` with `MediaCapture` to get `AudioFrame` data from an audio media frame source such as a microphone. Available starting with Windows 10, version 1803.

## Signature / Usage

```csharp
// Outline assembled from the API names in the article (the article's full listing is a code include)
var mediaCapture = new MediaCapture();
// InitializeAsync with MediaCaptureInitializationSettings.StreamingCaptureMode set to audio
// Select a frame source whose MediaFrameSourceInfo.MediaStreamType is Audio
MediaFrameReader frameReader = await mediaCapture.CreateFrameReaderAsync(frameSource);
frameReader.FrameArrived += FrameReader_FrameArrived;
// StartAsync returns a status; anything other than Success means the reader failed to start
await frameReader.StartAsync();

void FrameReader_FrameArrived(MediaFrameReader sender, MediaFrameArrivedEventArgs args)
{
    using (MediaFrameReference frame = sender.TryAcquireLatestFrame()) // can be null
    {
        AudioMediaFrame audioMediaFrame = frame?.AudioMediaFrame;
        // AudioFrame, AudioBuffer -> IMemoryBufferReference -> IMemoryBufferByteAccess::GetBuffer
    }
}
```

## Notes

- Only available starting with Windows 10, version 1803.
- Declare the `webcam` capability; if capturing from an audio device, also declare the `microphone` device capability.
- Select a frame source after `MediaCapture.InitializeAsync` from the `MediaCapture.FrameSources` property, filtering on `MediaFrameSourceInfo.MediaStreamType` of `Audio`. Check `MediaFrameSource.CurrentFormat` and its `AudioEncodingProperties` to confirm the desired encoding (the article's example requires two channels of float data).
- By default, audio frames are acquired in buffered mode, making dropped frames less likely, although frames can still be dropped if processing is too slow and the system's allotted memory buffer fills.
- `TryAcquireLatestFrame` can return null; always check. For audio, read the underlying frame via `MediaFrameReference.AudioMediaFrame`; `AudioFrame` provides the timestamp and whether the frame is discontinuous.
- Reading sample data requires the `IMemoryBufferByteAccess` COM interface in a method marked `unsafe`; enable "Allow unsafe code" on the Build tab of the project properties.
- `MediaFrameSource.Controller` gives the associated `AudioDeviceController`, which can get or set stream properties or control the capture level. Muting keeps frames arriving but every sample is 0.
- An `AudioFrame` can be passed to `AudioFrameInputNode.AddFrame` to feed an `AudioGraph`.
- Source: https://learn.microsoft.com/en-us/windows/apps/develop/camera/process-audio-frames-with-mediaframereader (ms.date 04/18/2018).

## Related

- [MediaFrameReader](./media-frame-reader.md)
- [MediaFrameSourceGroup](./media-frame-source-group.md)
- [MediaCapture](./media-capture.md)
