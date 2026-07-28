# ExoPlayer / ExoPlayer.Builder

Default `Player` implementation for local and streamed media playback. Built via `ExoPlayer.Builder`, which injects the customizable components (`RenderersFactory`, `TrackSelector`, `LoadControl`, `MediaSource.Factory`).

## Signature / Usage

```kotlin
val player = ExoPlayer.Builder(context).build()
```

```java
public Builder(Context context)

@CanIgnoreReturnValue
public Builder setRenderersFactory(RenderersFactory renderersFactory)

@CanIgnoreReturnValue
public Builder setMediaSourceFactory(MediaSource.Factory mediaSourceFactory)

@CanIgnoreReturnValue
public Builder setTrackSelector(TrackSelector trackSelector)

@CanIgnoreReturnValue
public Builder setLoadControl(LoadControl loadControl)

@CanIgnoreReturnValue
public Builder setAudioAttributes(AudioAttributes audioAttributes, boolean handleAudioFocus)

@CanIgnoreReturnValue
public Builder setHandleAudioBecomingNoisy(boolean handleAudioBecomingNoisy)

@CanIgnoreReturnValue
public Builder setWakeMode(@C.WakeMode int wakeMode)

@CanIgnoreReturnValue
public Builder setSeekBackIncrementMs(@IntRange(from = 1) long seekBackIncrementMs)

@CanIgnoreReturnValue
public Builder setSeekForwardIncrementMs(@IntRange(from = 1) long seekForwardIncrementMs)

public ExoPlayer build()
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `renderersFactory` | `RenderersFactory` | `DefaultRenderersFactory` | Creates the renderers used to play tracks (`setRenderersFactory`). |
| `mediaSourceFactory` | `MediaSource.Factory` | `DefaultMediaSourceFactory` | Converts `MediaItem` into `MediaSource` (`setMediaSourceFactory`). |
| `trackSelector` | `TrackSelector` | `DefaultTrackSelector` | Selects tracks to be consumed by renderers (`setTrackSelector`). |
| `loadControl` | `LoadControl` | `DefaultLoadControl` | Controls buffering behavior (`setLoadControl`). |
| `audioAttributes`, `handleAudioFocus` | `AudioAttributes`, `boolean` | `AudioAttributes.DEFAULT`, `false` | Audio usage/content type and whether the player manages audio focus automatically. |
| `handleAudioBecomingNoisy` | `boolean` | `false` | Pauses playback automatically when audio output becomes noisy (e.g. headphones unplugged). |
| `wakeMode` | `@C.WakeMode int` | `C.WAKE_MODE_NONE` | Acquires a `WifiLock`/`WakeLock` while playing. |
| `seekBackIncrementMs` / `seekForwardIncrementMs` | `long` | `C.DEFAULT_SEEK_BACK_INCREMENT_MS` / `C.DEFAULT_SEEK_FORWARD_INCREMENT_MS` | Increment used by `seekBack()` / `seekForward()`. |

## Notes

- Other injectable `Builder` constructors accept `RenderersFactory`, `MediaSource.Factory`, `TrackSelector`, `LoadControl`, `BandwidthMeter`, and `AnalyticsCollector` directly for advanced dependency injection.
- Custom components (`Renderer`, `TrackSelector`, `LoadControl`, `Extractor`, `MediaSource`, `MediaSource.Factory`, `DataSource`) can all be swapped in for full customization; see the `customization` guide.
- Artifact: `androidx.media3:media3-exoplayer` (plus `media3-exoplayer-dash` / `-hls` / `-smoothstreaming` for adaptive formats).
- Distinct from `com.google.android.exoplayer2.ExoPlayer` in the deprecated ExoPlayer2 library; migrate via the Media3 migration guide.

## Related

- [Player](./player.md)
- [MediaSource and factories](./media-source.md)
- [Customization (renderers, load control)](./customization.md)
- [AudioAttributes and audio focus](./audio-attributes.md)
- [MediaSessionService for background playback (media-session-editing)](../media-session-editing/media-session-service.md)
