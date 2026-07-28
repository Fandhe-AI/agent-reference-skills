# MediaPlayerElement

A XAML control that renders audio and video content using a `MediaPlayer`. The primary video-playback control for WinUI 3 apps.

## Signature / Usage

```xml
<MediaPlayerElement x:Name="myMediaPlayerElement"
                     AutoPlay="False"
                     AreTransportControlsEnabled="True"
                     Source="https://example.com/video.mp4" />
```

```csharp
myMediaPlayerElement.MediaPlayer.Play();
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| Source | IMediaPlaybackSource | The media source to display (bindable to a Uri via markup extension or set programmatically). |
| MediaPlayer | MediaPlayer | The underlying `MediaPlayer` instance driving playback; access it to control playback imperatively. |
| AreTransportControlsEnabled | Boolean | Whether the built-in `MediaTransportControls` UI is shown. |
| TransportControls | MediaTransportControls | The transport controls UI instance, for customizing which buttons are visible. |
| AutoPlay | Boolean | Whether playback starts automatically when a source is set. |
| Stretch | Stretch | How the video content is stretched to fill the control. |
| PosterSource | ImageSource | An image shown before playback starts. |

## Notes

- Namespace: `Microsoft.UI.Xaml.Controls` (Windows App SDK / WinUI 3). Distinct from the legacy UWP `Windows.UI.Xaml.Controls.MediaPlayerElement` and unrelated to Android ExoPlayer's `PlayerView` or Apple `AVPlayerViewController`.
- Use `MediaPlayerElement.MediaPlayer` to access the full `MediaPlayer` API (events, `PlaybackSession`, `CommandManager`) for imperative control beyond what XAML properties expose.

## Related

- [MediaPlayer](./media-player.md)
- [MediaTransportControls](./media-transport-controls.md)
