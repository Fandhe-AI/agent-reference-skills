# AnalyticsListener, PlaybackStatsListener, and EventLogger

`AnalyticsListener` is a lower-level counterpart to `Player.Listener` for `ExoPlayer` that delivers detailed, timestamped playback events (including internal renderer/loading events) for analytics and diagnostics. `PlaybackStatsListener` aggregates those events into `PlaybackStats`; `EventLogger` is a ready-made `AnalyticsListener` for `Logcat` diagnostics. Package: `androidx.media3.exoplayer.analytics`.

## Signature / Usage

```kotlin
exoPlayer.addAnalyticsListener(EventLogger())

exoPlayer.addAnalyticsListener(
  PlaybackStatsListener(/* keepHistory= */ true) { eventTime, playbackStats ->
    Log.d(
      "DEBUG",
      "play time = ${playbackStats.totalPlayTimeMs}, rebuffers = ${playbackStats.totalRebufferCount}",
    )
  }
)
```

```java
void addAnalyticsListener(AnalyticsListener listener);
void removeAnalyticsListener(AnalyticsListener listener);

// AnalyticsListener (subset)
void onPlaybackStateChanged(EventTime eventTime, @Player.State int state);
void onDroppedVideoFrames(EventTime eventTime, int droppedFrames, long elapsedMs);

// PlaybackStatsListener
public PlaybackStatsListener(boolean keepHistory, @Nullable Callback callback);
public PlaybackStats getPlaybackStats();
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `EventTime` | class | — | Associates an `AnalyticsListener` callback with `realtimeMs`, the `Timeline`, `windowIndex`, and `mediaPeriodId` (e.g. distinguishes an ad period from content) at the time of the event. |
| `keepHistory` (`PlaybackStatsListener` ctor) | `boolean` | — | If `true`, retains full event history (`playbackStateHistory`, `mediaTimeHistory`, `videoFormatHistory`, `fatalErrorHistory`, …); costs memory. Set `false` if only final aggregated stats are needed. |
| `PlaybackStats.getTotalPlayTimeMs()` | `long` | — | Total time spent actively playing. |
| `PlaybackStats.totalRebufferCount` | `int` | — | Number of rebuffers during the session (public field). |
| `PlaybackStats.getMeanVideoFormatBitrate()` | `int` | — | Average video bitrate across the session. |
| `PlaybackStats.getMeanTimeBetweenRebuffers()` | `float` | — | Average time between rebuffer events. |

## Notes

- Distinct from `Player.Listener` (in `player-listener.md`): `Player.Listener` covers the public playback-state surface; `AnalyticsListener` additionally exposes internal loading/rendering events keyed by `EventTime`, intended for metrics pipelines rather than UI updates.
- `PlaybackStatsListener` is itself an `AnalyticsListener` registered via the same `addAnalyticsListener` call; its callback fires once analytics for a playback session (started at a given `EventTime`) are finalized.
- Combine stats from multiple playback sessions with `PlaybackStats.merge(stats1, stats2, ...)`, or call `playbackStatsListener.getCombinedPlaybackStats()`.
- Associate stats with app-level identifiers by reading `eventTime.timeline.getWindow(eventTime.windowIndex, Timeline.Window()).mediaItem.localConfiguration.tag`, set earlier via `MediaItem.Builder.setTag()`.
- Advanced: subclass `DefaultAnalyticsCollector` and inject it via `ExoPlayer.Builder.setAnalyticsCollector(...)` to emit custom analytics events alongside the built-in ones.
- Artifact: `androidx.media3:media3-exoplayer`.

## Related

- [Player.Listener](./player-listener.md)
- [ExoPlayer](./exoplayer.md)
- [MediaItem](./media-item.md)
