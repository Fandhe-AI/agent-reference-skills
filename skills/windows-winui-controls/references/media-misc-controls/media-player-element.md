# MediaPlayerElement

A control to display video and image content, with built-in transport controls for play/pause, seek, volume, and captions.

## Signature / Usage

```xaml
<MediaPlayerElement x:Name="mediaPlayerElement"
                    Source="ms-appx:///Videos/video1.mp4"
                    Width="400"
                    AutoPlay="False"
                    AreTransportControlsEnabled="True"/>
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| Source | MediaSource | The audio/video source. Set via `MediaSource.CreateFromUri`, `CreateFromStorageFile`, or a relative `ms-appx:///` URI (packaged apps only). |
| AutoPlay | bool | Whether playback starts automatically when the page loads. Default `true`. |
| AreTransportControlsEnabled | bool | Shows/hides the built-in `MediaTransportControls` (play, stop, pause, volume, mute, seek, captions, audio track). |
| PosterSource | ImageSource | Image shown before media loads, while loading, when audio-only, or when streaming to another device. |
| Stretch | Stretch | `None`, `Uniform`, `UniformToFill`, or `Fill`. Controls how video/poster content fills the container. |
| MediaPlayer | MediaPlayer | The underlying `Windows.Media.Playback.MediaPlayer`; exposes `PlaybackSession`, `RealTimePlayback`, `Play()`. |

## Notes

- Package: `Microsoft.UI.Xaml.Controls.MediaPlayerElement` (WinUI 3). Distinct from the WPF `MediaElement`, HTML5 `<video>`, and other frameworks' media components.
- Automatically integrates with system media transport controls (hardware media keys).
- Set `MediaPlayer.RealTimePlayback = true` for low-latency scenarios (two-way communication, gaming); more resource intensive.
- Use `DisplayRequest.RequestActive()` / `RequestRelease()` to keep the screen on during video playback.
- Setting `Source` to a relative `ms-appx:///` URI requires a Windows Application Packaging Project; otherwise convert to a fully resolved `file:///` URI.

## Related

- [Image](./image.md)
- [TitleBar](./title-bar.md)
