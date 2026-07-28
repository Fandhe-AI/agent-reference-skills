# TimedTextSource

Represents a source of timed text data (subtitles/captions), such as SRT, WebVTT, or TTML files.

## Signature / Usage

```csharp
TimedTextSource textSource = TimedTextSource.CreateFromUri(new Uri("https://example.com/subtitles.vtt"));
MediaSource source = MediaSource.CreateFromUri(new Uri("https://example.com/video.mp4"));
source.ExternalTimedTextSources.Add(textSource);
var item = new MediaPlaybackItem(source);
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| CreateFromUri(Uri, String) | static TimedTextSource | Creates a source from a URI, optionally specifying the default language. |
| CreateFromStream(IRandomAccessStream, String) | static TimedTextSource | Creates a source from a stream. |
| CreateFromStreamWithIndex / CreateFromUriWithIndex | static TimedTextSource | Creates an image-based subtitle source (image + index streams/URIs), for formats like VobSub. |
| Resolved | event | Occurs when the `TimedTextSource` finishes resolving. |

## Notes

- Namespace: `Windows.Media.Core`. Add instances to `MediaSource.ExternalTimedTextSources` to populate the source's `ExternalTimedMetadataTracks` collection with subtitle/caption tracks.
- After adding, tracks appear in `MediaPlaybackItem.TimedMetadataTracks`; toggle a track's `IsActive` (via `PresentationMode`) to display it during playback.

## Related

- [TimedMetadataTrack](./timed-metadata-track.md)
- [MediaSource](./media-source.md)
