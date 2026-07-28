# MediaSource

Represents a media source. Provides a common way to reference media from different sources (files, streams, URIs, adaptive streaming, frame sources) and exposes a common model for accessing media data regardless of the underlying media format.

## Signature / Usage

```csharp
MediaSource source = MediaSource.CreateFromUri(new Uri("https://example.com/video.mp4"));
var item = new MediaPlaybackItem(source);
mediaPlayer.Source = item;
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| CreateFromUri(Uri) | static MediaSource | Creates a `MediaSource` from a URI. |
| CreateFromStorageFile(IStorageFile) | static MediaSource | Creates a `MediaSource` from a local file. |
| CreateFromAdaptiveMediaSource(AdaptiveMediaSource) | static MediaSource | Creates a `MediaSource` from an HLS/DASH `AdaptiveMediaSource`. |
| CreateFromMediaStreamSource(MediaStreamSource) | static MediaSource | Creates a `MediaSource` from a custom `MediaStreamSource`. |
| CreateFromMediaBinder(MediaBinder) | static MediaSource | Creates a `MediaSource` with deferred binding via `MediaBinder`. |
| CreateFromMediaFrameSource(MediaFrameSource) | static MediaSource | Creates a `MediaSource` from a `MediaCapture` frame source (e.g. camera preview). |
| Duration | TimeSpan | Duration of the content. |
| ExternalTimedTextSources | IVector\<TimedTextSource\> | Collection of external subtitle/caption sources associated with the source. |
| State | MediaSourceState | Current state of the media source (opening, opened, failed, etc). |

## Notes

- Namespace: `Windows.Media.Core`. This is the common entry point for constructing playable content passed to `MediaPlayer`, `MediaPlayerElement`, or wrapped in `MediaPlaybackItem`.
- After creating a `MediaSource`, typically wrap it in a `MediaPlaybackItem` (to access tracks, add subtitles, or add to a `MediaPlaybackList`) before assigning to a player.
- `CreateFromMediaFrameSource` is the bridge point for using a `Windows.Media.Capture.MediaCapture` frame source (e.g. live camera feed) as a playable/recordable source.

## Related

- [MediaPlaybackItem](./media-playback-item.md)
- [MediaBinder](./media-binder.md)
- [AdaptiveMediaSource](./adaptive-media-source.md)
- [TimedTextSource](./timed-text-source.md)
- [MediaPlayer](./media-player.md)
