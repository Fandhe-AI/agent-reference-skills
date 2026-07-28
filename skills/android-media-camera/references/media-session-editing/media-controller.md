# MediaController

Client-side handle that connects to a `MediaSession` via its `SessionToken` and implements the `Player` interface, letting a remote app query and control playback.

## Signature / Usage

```kotlin
val sessionToken = SessionToken(context, ComponentName(context, PlaybackService::class.java))
val controllerFuture = MediaController.Builder(context, sessionToken).buildAsync()
controllerFuture.addListener(
    {
        val controller = controllerFuture.get()
        controller.play()
    },
    MoreExecutors.directExecutor(),
)
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `MediaController.Builder(context, token)` | `Context, SessionToken` | — | Constructor. |
| `setListener(listener)` | `MediaController.Listener` | none | Receives nonfatal `onError`, custom layout/command changes, and other session-level callbacks. |
| `setApplicationLooper(looper)` | `Looper` | current/main looper | Looper on which `Player` calls and listener callbacks run. |
| `setConnectionHints(bundle)` | `Bundle` | `Bundle.EMPTY` | Extra data sent to `MediaSession.Callback.onConnect()`; ignored when connecting to a legacy `MediaSessionCompat`. |
| `setBitmapLoader(bitmapLoader)` | `BitmapLoader` | `CacheBitmapLoader` | Loads artwork bitmaps. |
| `setMaxCommandsForMediaItems(max)` | `Int` | `0` | Maximum per-item `CommandButton`s to request. |
| `buildAsync()` | — | — | Returns `ListenableFuture<MediaController>`; connection happens asynchronously. |
| `MediaController.releaseFuture(future)` (static) | `Future<? extends MediaController>` | — | Cancels/releases a controller future and its underlying controller when done. |

## Notes

- Package/artifact: `androidx.media3:media3-session`.
- `MediaController` implements the `Player` interface directly (`play()`, `pause()`, `seekTo()`, `Player.Listener`, ...); see the `media3-playback` category for `Player` itself.
- Only commands granted by the session in `onConnect()` (`ConnectionResult.setAvailablePlayerCommands` / `setAvailableSessionCommands`) can be invoked; ungranted calls are no-ops.
- Always release via `MediaController.releaseFuture()` (or `controller.release()`) to avoid leaking the connection.

## Related

- [SessionToken](./session-token.md)
- [MediaBrowser](./media-browser.md)
- [MediaSessionCallback](./media-session-callback.md)
