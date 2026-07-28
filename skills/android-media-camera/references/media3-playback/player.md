# Player

Core playback interface implemented by `ExoPlayer`, `MediaController`, and `CastPlayer`. Exposes playback control, playlist management, and state query methods. Package: `androidx.media3.common`.

## Signature / Usage

```kotlin
val player = ExoPlayer.Builder(context).build()

val mediaItem = MediaItem.fromUri(videoUri)
player.setMediaItem(mediaItem)
player.prepare()
player.play()
```

```java
void prepare();
void play();
void pause();
void stop();
void seekTo(long positionMs);
void seekTo(int mediaItemIndex, long positionMs);
void setMediaItem(MediaItem mediaItem);
void setMediaItem(MediaItem mediaItem, long startPositionMs);
void setMediaItems(List<MediaItem> mediaItems);
void addMediaItem(MediaItem mediaItem);
void addMediaItem(int index, MediaItem mediaItem);
long getCurrentPosition();
long getDuration();
long getBufferedPosition();
void setRepeatMode(@RepeatMode int repeatMode);
@RepeatMode int getRepeatMode();
void setShuffleModeEnabled(boolean shuffleModeEnabled);
void setPlaybackParameters(PlaybackParameters playbackParameters);
@State int getPlaybackState();
boolean isPlaying();
boolean getPlayWhenReady();
void addListener(Listener listener);
void removeListener(Listener listener);
void seekToNext();
void seekToPrevious();
void setPlaybackSpeed(float speed); // must only be called if COMMAND_SET_SPEED_AND_PITCH is available
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `STATE_IDLE` | `int` (`1`) | — | Initial/stopped state, or state after playback failure. Player holds only limited resources. |
| `STATE_BUFFERING` | `int` (`2`) | — | Player cannot immediately play from the current position; more data must be loaded. |
| `STATE_READY` | `int` (`3`) | — | Player can immediately play from the current position. |
| `STATE_ENDED` | `int` (`4`) | — | Player finished playing all media. |
| `REPEAT_MODE_OFF` / `REPEAT_MODE_ONE` / `REPEAT_MODE_ALL` | `int` | `REPEAT_MODE_OFF` | Controls looping behavior via `setRepeatMode`. |

## Notes

- `player.setMediaItem(mediaItem)` + `prepare()` + `play()` is the minimal single-item playback flow; `addMediaItem` builds a playlist.
- `isPlaying()` is `true` only when `getPlaybackState() == STATE_READY`, `getPlayWhenReady() == true`, and playback is not suppressed (e.g. by transient audio focus loss).
- `MediaSource`-based playlist APIs (`setMediaSources` / `addMediaSource`) can be combined with the `MediaItem` API; both add to the same playlist.
- Must be accessed from a single application thread (typically main); wrong-thread access throws `IllegalStateException`.
- Always call `player.release()` when done to free decoder resources.
- `MediaController` (in the `media-session-editing` category) also implements `Player`, so any code written against this interface works unchanged against a session-hosted player.
- Artifact: `androidx.media3:media3-common` (interface), implemented by `androidx.media3:media3-exoplayer` (`ExoPlayer`).
- Distinct from `com.google.android.exoplayer2.Player` in the deprecated ExoPlayer2 (`com.google.android.exoplayer2`) library; Media3 supersedes ExoPlayer2.

## Related

- [ExoPlayer](./exoplayer.md)
- [Player.Listener](./player-listener.md)
- [MediaItem](./media-item.md)
- [PlaybackParameters](./playback-parameters.md)
- [Timeline and Tracks](./timeline-tracks.md)
- [MediaController (media-session-editing)](../media-session-editing/media-controller.md)
