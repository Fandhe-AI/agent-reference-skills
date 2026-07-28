# MediaCapture integration

Describes how the audio/video playback and editing APIs interoperate with `Windows.Media.Capture.MediaCapture` (camera/microphone capture), allowing live capture streams to be played back, recorded, or fed into an `AudioGraph`.

## Signature / Usage

```csharp
// Play a live camera frame source through the playback pipeline
MediaFrameSource frameSource = mediaCapture.FrameSources[frameSourceId];
MediaSource source = MediaSource.CreateFromMediaFrameSource(frameSource);
mediaPlayer.Source = source;

// Feed a MediaCapture-backed MediaSource into an AudioGraph
CreateMediaSourceAudioInputNodeResult result =
    await audioGraph.CreateMediaSourceAudioInputNodeAsync(source);
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| MediaSource.CreateFromMediaFrameSource(MediaFrameSource) | static MediaSource | Wraps a `MediaCapture` frame source (camera/video/audio) as a playable `MediaSource`. |
| AudioGraph.CreateMediaSourceAudioInputNodeAsync(MediaSource) | Task | Feeds a `MediaSource` (including `MediaCapture`-derived sources) into an `AudioGraph` as an input node. |

## Notes

- Namespace: `Windows.Media.Capture` (`MediaCapture`, `MediaFrameSource`) combined with `Windows.Media.Core` (`MediaSource`) and `Windows.Media.Audio` (`AudioGraph`). `MediaCapture` itself is out of scope for this reference category; see the camera/capture reference for its own APIs.
- `MediaComposition`/`MediaClip` (`Windows.Media.Editing`) do not consume `MediaCapture` sources directly — capture output is typically recorded to a file via `MediaCapture.StartRecordToStorageFileAsync` first, then that file is used with `MediaClip.CreateFromFileAsync`.

## Related

- [MediaSource](./media-source.md)
- [AudioGraph](./audio-graph.md)
