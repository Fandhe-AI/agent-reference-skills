# MediaSession

Connects a `Player` (e.g. ExoPlayer) to the outside world, letting the app advertise playback externally and receive playback commands from system UI, Bluetooth devices, Android Auto, and other clients.

## Signature / Usage

```kotlin
val player = ExoPlayer.Builder(context).build()
mediaSession = MediaSession.Builder(context, player)
    .setCallback(MyCallback())
    .setSessionActivity(pendingIntent)
    .build()
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `MediaSession.Builder(context, player)` | `Context, Player` | — | Constructor; `player` must implement the `Player` interface. |
| `setId(id)` | `String` | `""` | Unique session ID. Required if hosting multiple sessions in one process. |
| `setSessionActivity(pendingIntent)` | `PendingIntent` | `null` | Activity launched when the user taps the session's notification/UI. |
| `setCallback(callback)` | `MediaSession.Callback` | default callback | Handles connection requests, custom commands, and playlist mutation requests. |
| `setExtras(tokenExtras)` | `Bundle` | `Bundle.EMPTY` | Extras attached to the `SessionToken`. |
| `setSessionExtras(sessionExtras)` | `Bundle` | `Bundle.EMPTY` | Extras broadcast to all connected controllers. |
| `setBitmapLoader(bitmapLoader)` | `BitmapLoader` | `CacheBitmapLoader` | Loads artwork bitmaps from URIs/byte arrays. |
| `setCustomLayout(customLayout)` | `List<CommandButton>` | `[]` | Deprecated in favor of `setMediaButtonPreferences`; buttons shown alongside standard playback controls. |
| `setMediaButtonPreferences(buttons)` | `List<CommandButton>` | `[]` | Ordered custom `CommandButton`s shown in system media controls / notification. |
| `setCommandButtonsForMediaItems(buttons)` | `List<CommandButton>` | `[]` | Command buttons associated with individual media items (e.g. "Add to playlist" per item). |
| `setPeriodicPositionUpdateEnabled(enabled)` | `Boolean` | `true` | Enables periodic position update broadcasts to controllers. |
| `setShowPlayButtonIfPlaybackIsSuppressed(show)` | `Boolean` | `true` | Shows the play button in system UI even when playback is suppressed. |
| `build()` | — | — | Returns the `MediaSession`. Throws `IllegalStateException` if a session with the same ID already exists. |

## Notes

- Package/artifact: `androidx.media3:media3-session`.
- Hosting a `MediaSession` inside an `Activity` only keeps it alive while the activity is alive; use `MediaSessionService` for background playback.
- Migrating from the legacy `MediaSessionCompat` / `MediaBrowserServiceCompat`: `SessionToken` and `MediaController` in Media3 can connect to legacy sessions transparently; new apps should build directly on `MediaSession` / `MediaSessionService` rather than the compat classes.
- Release the session (and the player) in `onDestroy()`: call `player.release()` then `mediaSession.release()`.

## Related

- [MediaSessionCallback](./media-session-callback.md)
- [MediaSessionService](./media-session-service.md)
- [MediaController](./media-controller.md)
- [CommandButton](./command-button.md)
