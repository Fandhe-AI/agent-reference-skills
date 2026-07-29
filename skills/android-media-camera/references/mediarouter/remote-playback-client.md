# RemotePlaybackClient

Client-side helper that sends playback commands (play/seek/pause/resume/stop/status) to a selected `CATEGORY_REMOTE_PLAYBACK` route, without needing to know the receiver's underlying protocol. Package: `androidx.mediarouter.media`.

## Signature / Usage

```kotlin
val client = RemotePlaybackClient(context, route)

client.play(mediaUri, mimeType, null, 0, null, object : RemotePlaybackClient.ItemActionCallback() {
    override fun onResult(data: Bundle, sessionId: String?, itemId: String?, itemStatus: MediaItemStatus?) {
        // playback started on the receiver
    }
    override fun onError(error: String?, code: Int, data: Bundle?) {
        // handle failure
    }
})

client.pause(null, callback)
client.resume(null, callback)
client.seek(itemId, position, null, callback)
client.release()
```

```java
public RemotePlaybackClient(Context context, MediaRouter.RouteInfo route);
public void play(Uri contentUri, String mimeType, Bundle metadata, long positionMillis, Bundle extras, ItemActionCallback callback);
public void pause(Bundle extras, ItemActionCallback callback);
public void resume(Bundle extras, ItemActionCallback callback);
public void seek(String itemId, long positionMillis, Bundle extras, ItemActionCallback callback);
public void stop(Bundle extras, ItemActionCallback callback);
public void release();
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `route` (constructor) | `MediaRouter.RouteInfo` | Must support `CATEGORY_REMOTE_PLAYBACK`; check via `route.supportsControlCategory()` before constructing. |
| `ItemActionCallback.onResult` | callback | Delivers `MediaItemStatus` and session/item ids on success. |
| `ItemActionCallback.onError` | callback | Delivers an error string and machine-readable code on failure. |

## Notes

- Only routes selected via `MediaRouter.Callback.onRouteSelected()` that report `route.supportsControlCategory(MediaControlIntent.CATEGORY_REMOTE_PLAYBACK)` are valid to construct a client for.
- Call `release()` once playback is done or the route is unselected (typically in `onRouteUnselected()`) to free the underlying session.
- For Google Cast receivers specifically, Media3's `CastPlayer` is generally preferred over driving `RemotePlaybackClient` directly, since it exposes the same standard `Player` interface used for local `ExoPlayer` playback.

## Related

- [MediaRouter](./media-router.md)
- [MediaRouteProvider](./media-route-provider.md)
- [CastPlayer (media3-playback)](../media3-playback/cast-player.md)
