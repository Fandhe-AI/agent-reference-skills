# TimedMetadataTrack

Represents a timed metadata track. The track contains a list of `IMediaCue` objects (e.g. subtitle cues, chapter markers, custom data cues) and raises events at the beginning and end of the time window of each cue.

## Signature / Usage

```csharp
var track = new TimedMetadataTrack("id1", "en-US", TimedMetadataKind.Caption);
track.Label = "English Captions";
track.CueEntered += (s, e) => { /* show e.Cue */ };
track.CueExited += (s, e) => { /* hide cue */ };

var cue = new DataCue { StartTime = TimeSpan.FromSeconds(5), Duration = TimeSpan.FromSeconds(2) };
track.AddCue(cue);
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| TimedMetadataTrack(String, String, TimedMetadataKind) | constructor | Creates a track with id, language, and kind (Caption, Subtitle, Description, Chapter, Data, etc). |
| Cues / ActiveCues | read-only lists | All cues / cues currently within their time window. |
| Id / Label / Language | String | Track identity metadata. |
| TimedMetadataKind | TimedMetadataKind | The kind of metadata contained in the track. |
| PlaybackItem | MediaPlaybackItem | The item containing this track. |
| AddCue(IMediaCue) / RemoveCue(IMediaCue) | methods | Add/remove cues from the track. |
| CueEntered / CueExited | events | Raised when a cue's time window is entered/exited. |
| TrackFailed | event | Raised on track errors. |

## Notes

- Namespace: `Windows.Media.Core`. System-supported formats (e.g. embedded WebVTT, TTML cues, chapter data) populate tracks automatically via `MediaSource`/`MediaPlaybackItem`; custom tracks can be constructed and added programmatically for app-defined metadata cues.

## Related

- [TimedTextSource](./timed-text-source.md)
- [MediaPlaybackItem](./media-playback-item.md)
