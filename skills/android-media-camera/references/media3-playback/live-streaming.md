# Live Streaming

`Player` and `MediaItem` APIs specific to live content: querying how far playback trails real time, and configuring the target/min/max live offset and the speed adjustments used to converge on it. Package: `androidx.media3.common`.

## Signature / Usage

```kotlin
val mediaItem =
  MediaItem.Builder()
    .setUri(liveStreamUri)
    .setLiveConfiguration(
      MediaItem.LiveConfiguration.Builder()
        .setTargetOffsetMs(5_000)
        .setMaxPlaybackSpeed(1.02f)
        .build()
    )
    .build()
player.setMediaItem(mediaItem)
```

```java
public static final class LiveConfiguration {
  public static final class Builder {
    public Builder setTargetOffsetMs(long targetOffsetMs);
    public Builder setMinOffsetMs(long minOffsetMs);
    public Builder setMaxOffsetMs(long maxOffsetMs);
    public Builder setMinPlaybackSpeed(float minPlaybackSpeed);
    public Builder setMaxPlaybackSpeed(float maxPlaybackSpeed);
  }
}

long getCurrentLiveOffset();
boolean isCurrentMediaItemLive();
boolean isCurrentMediaItemDynamic();
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `targetOffsetMs` | `long` | from media/manifest | Live offset (distance behind the live edge) the player tries to maintain. |
| `minOffsetMs` / `maxOffsetMs` | `long` | from media/manifest | Bounds within which the live offset is allowed to drift before the player adjusts. |
| `minPlaybackSpeed` / `maxPlaybackSpeed` | `float` | `C.RATE_UNSET` | Range of playback speed the player may use to converge the live offset toward `targetOffsetMs`; unset means the value comes from the media/manifest (with `DefaultLivePlaybackSpeedControl`'s fallback speeds applied for low-latency streams). Explicitly setting both to `1.0f` disables the speed adjustment. |
| `player.getCurrentLiveOffset()` | `long` | — | Current offset between real time and the playback position, or `C.TIME_UNSET` if not live/unknown. |
| `player.isCurrentMediaItemLive()` | `boolean` | — | Whether the current item is a live stream (stays `true` even after the stream has ended). |
| `player.isCurrentMediaItemDynamic()` | `boolean` | — | Whether the current item's timeline is still being updated (typically `true` while a live stream is ongoing). |

## Notes

- Configuration precedence: per-`MediaItem` `LiveConfiguration` overrides global defaults set via `DefaultMediaSourceFactory` (e.g. `setLiveTargetOffsetMs`), which in turn override values parsed from the media/manifest itself.
- Tune the speed-adjustment behavior with `ExoPlayer.Builder.setLivePlaybackSpeedControl(DefaultLivePlaybackSpeedControl.Builder()...build())` — parameters include `fallbackMinPlaybackSpeed`/`fallbackMaxPlaybackSpeed`, `proportionalControlFactor`, and `targetLiveOffsetIncrementOnRebufferMs`.
- `player.seekTo(positionMs)` seeks within the live window relative to its start; `player.seekToDefaultPosition()` seeks back to the live edge.
- Handle falling out of the live window (e.g. after a long pause) by checking `PlaybackException.errorCode == ERROR_CODE_BEHIND_LIVE_WINDOW` in `onPlayerError` and recovering with `seekToDefaultPosition()` + `prepare()`.
- Older docs/code reference `isCurrentWindowLive` / `isCurrentWindowDynamic`; current `Player` exposes the same checks as `isCurrentMediaItemLive()` / `isCurrentMediaItemDynamic()`.
- Artifact: `androidx.media3:media3-common` (`MediaItem.LiveConfiguration`, `Player`), `androidx.media3:media3-exoplayer` (`DefaultLivePlaybackSpeedControl`).

## Related

- [Player](./player.md)
- [MediaItem](./media-item.md)
- [PlaybackException and Error Handling](./playback-exception.md)
- [MediaSource and Factories](./media-source.md)
