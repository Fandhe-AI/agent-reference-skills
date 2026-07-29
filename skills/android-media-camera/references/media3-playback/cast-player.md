# CastPlayer

`Player` implementation that controls playback on a Cast-compatible receiver device (Chromecast, Cast-enabled TVs/speakers) instead of playing locally. Package: `androidx.media3.cast`.

## Signature / Usage

```kotlin
val exoPlayer = ExoPlayer.Builder(context).build()
val castPlayer = CastPlayer.Builder(context).setLocalPlayer(exoPlayer).build()

val mediaSession = MediaSession.Builder(context, castPlayer).build()
```

```java
public static final class Builder {
  public Builder(Context context);
  public Builder setLocalPlayer(Player localPlayer);
  public CastPlayer build();
}
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `context` (Builder ctor) | `Context` | — | Required; used to obtain the shared `CastContext`. |
| `localPlayer` | `Player` | `null` | Local `ExoPlayer` (or other `Player`) to which playback automatically hands back when the Cast session ends. |

## Notes

- Implements the standard `Player` interface, so existing playback code (play/pause/seek/listeners) works unchanged against a `CastPlayer` — no separate remote-control API to learn.
- When both a `CastPlayer` (with `setLocalPlayer`) and a `MediaSession` are wired up, Media3 uses the system Output Switcher to move playback between local (`ExoPlayer`) and remote (`CastPlayer`) automatically as the user selects/deselects a Cast device; no manual player-swap code is required.
- Observe `Player.Listener.onDeviceInfoChanged(DeviceInfo)` and check `DeviceInfo.playbackType` (`PLAYBACK_TYPE_LOCAL` vs `PLAYBACK_TYPE_REMOTE`) to update UI when playback moves between local and remote.
- Requires the Google Cast SDK; a `CastOptionsProvider` (default or custom) must be declared for the app so `CastContext` can be resolved. Customize receiver app ID and discovery options via `CastOptions` in that provider.
- Artifact: `androidx.media3:media3-cast`.
- Distinct from `com.google.android.exoplayer2.ext.cast.CastPlayer` in the deprecated ExoPlayer2 (`com.google.android.exoplayer2`) library; Media3 supersedes ExoPlayer2.

## Related

- [Player](./player.md)
- [Player.Listener](./player-listener.md)
- [MediaController (media-session-editing)](../media-session-editing/media-controller.md)
