# RemotePlaybackClient

Client-side helper that sends playback commands (play/seek/pause/resume/stop/status) to a selected `CATEGORY_REMOTE_PLAYBACK` route, without needing to know the receiver's underlying protocol. Package: `androidx.mediarouter.media`.

## Signature / Usage

```kotlin
val client = RemotePlaybackClient(context, route)

val itemCallback = object : RemotePlaybackClient.ItemActionCallback() {
    override fun onResult(data: Bundle, sessionId: String, sessionStatus: MediaSessionStatus?, itemId: String, itemStatus: MediaItemStatus) {
        // playback started on the receiver
    }
    override fun onError(error: String?, code: Int, data: Bundle?) {
        // handle failure
    }
}
client.play(mediaUri, mimeType, null, 0, null, itemCallback)

val sessionCallback = object : RemotePlaybackClient.SessionActionCallback() {
    override fun onResult(data: Bundle, sessionId: String, sessionStatus: MediaSessionStatus?) {
        // session state updated
    }
    override fun onError(error: String?, code: Int, data: Bundle?) {
        // handle failure
    }
}
client.pause(null, sessionCallback)
client.resume(null, sessionCallback)
client.seek(itemId, position, null, itemCallback)
client.release()
```

```java
public RemotePlaybackClient(Context context, MediaRouter.RouteInfo route);
public void play(Uri contentUri, String mimeType, Bundle metadata, long positionMillis, Bundle extras, ItemActionCallback callback);
public void pause(Bundle extras, SessionActionCallback callback);
public void resume(Bundle extras, SessionActionCallback callback);
public void seek(String itemId, long positionMillis, Bundle extras, ItemActionCallback callback);
public void stop(Bundle extras, SessionActionCallback callback);
public void release();
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `route` (constructor) | `MediaRouter.RouteInfo` | Must support `CATEGORY_REMOTE_PLAYBACK`; check via `route.supportsControlCategory()` before constructing. |
| `ItemActionCallback.onResult` | callback | `onResult(Bundle, String sessionId, MediaSessionStatus?, String itemId, MediaItemStatus)` — used by `play()`/`seek()`. |
| `SessionActionCallback.onResult` | callback | `onResult(Bundle, String sessionId, MediaSessionStatus?)` — used by `pause()`/`resume()`/`stop()`. |
| `ActionCallback.onError` | callback | Delivers an error string and machine-readable code on failure (shared by both callback types). |

## Notes

- Only routes selected via `MediaRouter.Callback.onRouteSelected()` that report `route.supportsControlCategory(MediaControlIntent.CATEGORY_REMOTE_PLAYBACK)` are valid to construct a client for.
- Call `release()` once playback is done or the route is unselected (typically in `onRouteUnselected()`) to free the underlying session.
- For Google Cast receivers specifically, Media3's `CastPlayer` is generally preferred over driving `RemotePlaybackClient` directly, since it exposes the same standard `Player` interface used for local `ExoPlayer` playback.

## Related

- [MediaRouter](./media-router.md)
- [MediaRouteProvider](./media-route-provider.md)
- [CastPlayer (media3-playback)](../media3-playback/cast-player.md)
