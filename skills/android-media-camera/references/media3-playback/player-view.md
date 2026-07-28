# PlayerView

Views-based UI component that renders video, images, subtitles, album art, and playback controls for an attached `Player`. The primary component of `media3-ui`.

## Signature / Usage

```xml
<androidx.media3.ui.PlayerView
    android:id="@+id/player_view"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:keepScreenOn="true"
    app:show_buffering="when_playing"
    app:show_shuffle_button="true"/>
```

```kotlin
val playerView: PlayerView = findViewById(R.id.player_view)
val player = ExoPlayer.Builder(context).build()
playerView.player = player
player.setMediaItem(mediaItem)
player.prepare()
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `player` | `Player?` | `null` | Attached via `setPlayer(player)` / `player = player`; pass `null` to detach. |
| `app:surface_type` | enum | `surface_view` | `surface_view`, `texture_view`, `spherical_gl_surface_view` (360 video), `video_decoder_gl_surface_view` (extension renderers), or `none` (audio-only). |
| `app:show_buffering` | enum | `never` | When to show the buffering spinner, e.g. `when_playing`. |
| `app:show_shuffle_button` | `boolean` | `false` | Shows the shuffle toggle in the built-in `PlayerControlView`. |
| `android:keepScreenOn` | `boolean` | `false` | Recommended `true` to prevent the screen from sleeping during playback. |

## Notes

- Most XML attributes have corresponding runtime setter methods on `PlayerView`.
- `PlayerControlView` (progress bar + playback buttons) is a sub-component embedded within `PlayerView`; it can also be used standalone.
- For Compose UI, use `PlayerSurface` / `ContentFrame` (or the higher-level `media3-ui-compose-material3` composables) instead of embedding `PlayerView` via `AndroidView`.
- Artifact: `androidx.media3:media3-ui`.
- Distinct from `com.google.android.exoplayer2.ui.PlayerView` in the deprecated ExoPlayer2 library; Media3 supersedes ExoPlayer2.

## Related

- [Compose UI (PlayerSurface, ContentFrame)](./compose-ui.md)
- [Player](./player.md)
