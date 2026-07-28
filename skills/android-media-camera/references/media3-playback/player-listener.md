# Player.Listener

Callback interface for observing `Player` state changes: playback state, playing status, playlist transitions, errors, and track changes. All methods have empty default implementations, so only the ones needed require overriding.

## Signature / Usage

```kotlin
player.addListener(
  object : Player.Listener {
    override fun onIsPlayingChanged(isPlaying: Boolean) {
      // Active playback vs. paused/ended/suppressed/buffering/stopped/failed.
    }

    override fun onPlaybackStateChanged(@Player.State state: Int) {
      // STATE_IDLE / STATE_BUFFERING / STATE_READY / STATE_ENDED
    }

    override fun onPlayerError(error: PlaybackException) {
      val cause = error.cause
      if (cause is HttpDataSourceException) {
        // Handle HTTP error.
      }
    }
  }
)
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `onPlaybackStateChanged` | `(state: Int) -> Unit` | no-op | Called when `Player.STATE_*` changes. |
| `onIsPlayingChanged` | `(isPlaying: Boolean) -> Unit` | no-op | Called when actively-playing status changes (see `Player.isPlaying()`). |
| `onPlayWhenReadyChanged` | `(playWhenReady: Boolean, reason: Int) -> Unit` | no-op | Called when the user-intention-to-play flag changes. |
| `onMediaItemTransition` | `(mediaItem: MediaItem?, reason: Int) -> Unit` | no-op | Called on transition to a new item: automatic advance, seek, repetition, or playlist change. |
| `onMediaMetadataChanged` | `(mediaMetadata: MediaMetadata) -> Unit` | no-op | Called when `player.getCurrentMediaMetadata()` changes (transition, in-stream update, or mid-playback item update). |
| `onTracksChanged` | `(tracks: Tracks) -> Unit` | no-op | Called when the available/selected tracks change. |
| `onPlayerError` | `(error: PlaybackException) -> Unit` | no-op | Called immediately before the state transitions to `STATE_IDLE` due to a failure. |
| `onPositionDiscontinuity` | `(oldPosition, newPosition, reason: Int) -> Unit` | no-op | Called after `seekTo()`, e.g. with `reason = DISCONTINUITY_REASON_SEEK`. |
| `onEvents` | `(player: Player, events: Player.Events) -> Unit` | no-op | Called once after one or more individual callbacks fire together in the same update. |

## Notes

- Prefer individual callbacks (`onPlaybackStateChanged`, etc.) when interested in *why* something changed or when reporting to analytics.
- Prefer `onEvents` when the same reaction (e.g. a UI refresh) is triggered by multiple event types, or when the `Player` instance is needed to trigger further calls (e.g. seeking) in response.
- For detailed diagnostics on `ExoPlayer`, register an `AnalyticsListener` (e.g. `player.addAnalyticsListener(EventLogger())`).
- Use `player.createMessage { type, payload -> ... }.setPosition(itemIndex, positionMs).send()` (`PlayerMessage`) to fire a callback at a specific playback position instead of polling.
- Package: `androidx.media3.common` (nested in `Player`).

## Related

- [Player](./player.md)
- [PlaybackException and error handling](./playback-exception.md)
- [Timeline and Tracks](./timeline-tracks.md)
