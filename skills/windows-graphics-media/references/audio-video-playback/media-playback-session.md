# MediaPlaybackSession

Provides information about the state of the current playback session of a `MediaPlayer` and provides events for responding to changes in playback session state.

## Signature / Usage

```csharp
MediaPlaybackSession session = mediaPlayer.PlaybackSession;
session.PositionChanged += (s, e) => { /* update UI with s.Position */ };
double pct = session.BufferingProgress;
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| Position | TimeSpan | Current playback position within the media (get/set to seek). |
| PlaybackState | MediaPlaybackState | Current state (Buffering, Playing, Paused, etc). |
| PlaybackRate | Double | Current playback rate as a ratio to normal speed. |
| NaturalDuration | TimeSpan | Duration of the currently playing media at normal speed. |
| BufferingProgress | Double | Current buffering progress, expressed as a percentage. |
| CanPause / CanSeek | Boolean | Whether the media supports pausing / seeking. |
| NaturalVideoWidth / NaturalVideoHeight | UInt32 | Dimensions of the video in the currently playing item. |
| PlaybackRotation | MediaRotation | Rotation applied to video content during playback. |

## Notes

- Namespace: `Windows.Media.Playback`. Obtain an instance via `MediaPlayer.PlaybackSession` or `MediaBreakManager.PlaybackSession`.
- Preferred over the deprecated top-level `MediaPlayer` properties (`Position`, `PlaybackRate`, `CurrentState`, `NaturalDuration`, `BufferingProgress`, `CanPause`, `CanSeek`) that were altered/unavailable after Windows 10 version 1607.
- Methods `GetBufferedRanges()`, `GetPlayedRanges()`, `GetSeekableRanges()` return read-only time-range lists useful for building custom seek bars.

## Related

- [MediaPlayer](./media-player.md)
