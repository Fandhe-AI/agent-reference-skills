# MediaPlaybackItem

Represents a media item that can be played back. Acts as a wrapper around a `MediaSource` that exposes the audio tracks, video tracks, and timed metadata tracks included in the source.

## Signature / Usage

```csharp
MediaSource source = MediaSource.CreateFromUri(new Uri("https://example.com/video.mp4"));
var item = new MediaPlaybackItem(source);
item.TimedMetadataTracksChanged += (s, e) => { /* handle subtitle track availability */ };
mediaPlayer.Source = item;
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| MediaPlaybackItem(MediaSource) | constructor | Wraps the given `MediaSource`. Overloads accept `StartTime` and `DurationLimit`. |
| Source | MediaSource | The wrapped `MediaSource`. |
| AudioTracks / VideoTracks / TimedMetadataTracks | read-only lists | Tracks exposed by the underlying source. |
| StartTime / DurationLimit | TimeSpan | Position where playback begins / maximum playback duration. |
| CanSkip | Boolean | Whether the item can be skipped in a `MediaPlaybackList`. |
| IsDisabledInPlaybackList | Boolean | Whether the item is disabled within a `MediaPlaybackList`. |

## Notes

- Namespace: `Windows.Media.Playback`. Can be passed directly to `MediaPlayer`, `MediaPlayerElement`, or added to a `MediaPlaybackList` for playlist playback.
- Use `TimedMetadataTracks` together with `TimedTextSource`/`TimedMetadataTrack` to add and enable subtitle/caption tracks.
- `ApplyDisplayProperties` / `GetDisplayProperties` control the metadata (title, artist, thumbnail) shown by the System Media Transport Controls for this item.

## Related

- [MediaSource](./media-source.md)
- [MediaPlaybackList](./media-playback-list.md)
- [TimedMetadataTrack](./timed-metadata-track.md)
- [MediaPlayer](./media-player.md)
