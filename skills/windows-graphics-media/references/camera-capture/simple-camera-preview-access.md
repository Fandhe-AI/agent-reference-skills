# Camera Preview Access

Displays the camera preview stream in a WinUI 3 desktop app via `MediaPlayerElement`, and handles exclusive-control loss, window lifecycle (minimize/hide), and resource cleanup.

## Signature / Usage

```xaml
<MediaPlayerElement x:Name="PreviewElement" AutoPlay="True" HorizontalAlignment="Stretch" />
```

```csharp
_mediaCapture = new MediaCapture();
await _mediaCapture.InitializeAsync(new MediaCaptureInitializationSettings
{
    StreamingCaptureMode = StreamingCaptureMode.Video
});

var frameSource = _mediaCapture.FrameSources.FirstOrDefault(
    source => source.Value.Info.MediaStreamType == MediaStreamType.VideoPreview
        || source.Value.Info.SourceKind == MediaFrameSourceKind.Color);

PreviewElement.Source = Windows.Media.Core.MediaSource
    .CreateFromMediaFrameSource(frameSource.Value);
```

## Notes

- WinUI 3 has no `CaptureElement` control (unlike UWP). Connect `MediaCapture` to a `MediaPlayerElement` by creating a `MediaSource` from a `MediaFrameSource`.
- Register for the `MediaCapture.Failed` event to detect another app taking exclusive control of the camera, and stop the preview in response.
- The camera resource stays active even when a desktop window is minimized/hidden — stop the preview on `Window.VisibilityChanged` (`args.Visible == false`) and restart it when visible again.
- Use `DispatcherQueue.TryEnqueue` to marshal camera callbacks to the UI thread; the UWP `CoreDispatcher.RunAsync` is not available in WinUI 3.
- Stop the preview and `Dispose()` the `MediaCapture` instance on `Window.Closed`.

## Related

- [MediaCapture](./media-capture.md)
- [Handle device orientation with MediaCapture](./handle-device-orientation-with-mediacapture.md)
- [Get a preview frame from the camera](./get-a-preview-frame.md)
