# MediaRouter

Singleton service that discovers and tracks available media output routes (Bluetooth, Wi-Fi Display, Cast-compatible receivers, remote-playback devices) and lets an app select one. Package: `androidx.mediarouter.media`.

## Signature / Usage

```kotlin
class MediaActivity : AppCompatActivity() {
    private lateinit var mediaRouter: MediaRouter
    private lateinit var selector: MediaRouteSelector

    private val callback = object : MediaRouter.Callback() {
        override fun onRouteSelected(router: MediaRouter, route: MediaRouter.RouteInfo, reason: Int) {
            // switch playback to `route`
        }
        override fun onRouteUnselected(router: MediaRouter, route: MediaRouter.RouteInfo, reason: Int) {
            // fall back to local playback
        }
    }

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        mediaRouter = MediaRouter.getInstance(this)
        selector = MediaRouteSelector.Builder()
            .addControlCategory(MediaControlIntent.CATEGORY_REMOTE_PLAYBACK)
            .build()
    }

    override fun onStart() {
        super.onStart()
        mediaRouter.addCallback(selector, callback, MediaRouter.CALLBACK_FLAG_REQUEST_DISCOVERY)
    }

    override fun onStop() {
        mediaRouter.removeCallback(callback)
        super.onStop()
    }
}
```

```java
public static MediaRouter getInstance(Context context);
public void addCallback(MediaRouteSelector selector, Callback callback, int flags);
public void removeCallback(Callback callback);
public RouteInfo getSelectedRoute();
public void selectRoute(RouteInfo route);
public void unselect(int reason);
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `CALLBACK_FLAG_REQUEST_DISCOVERY` | `int` flag | — | Actively request route discovery while the callback is registered (drains battery; only set while UI showing routes is visible). |
| `CALLBACK_FLAG_PERFORM_ACTIVE_SCAN` | `int` flag | — | Perform an active (rather than passive) scan for routes. |
| `RouteInfo.isDefault` | `Boolean` | — | `true` for the built-in local speaker/output route. |
| `RouteInfo.connectionState` | `Int` | `CONNECTION_STATE_DISCONNECTED` | `CONNECTING` / `CONNECTED` / `DISCONNECTED`. |
| `RouteInfo.playbackType` | `Int` | — | `PLAYBACK_TYPE_LOCAL` or `PLAYBACK_TYPE_REMOTE`. |

## Notes

- `MediaRouter.getInstance()` returns a per-process singleton shared by every caller; `MediaRouteSelector` filters which routes each caller sees rather than creating a separate router.
- Register the `Callback` in `onStart()`/attach and remove it in `onStop()`/detach — an unremoved callback keeps active route discovery running and drains battery.
- Requires `androidx.appcompat:appcompat` (the host `Activity` must extend `AppCompatActivity`) and the `androidx.mediarouter:mediarouter` dependency.
- For Google Cast receivers specifically, Media3's `CastPlayer` (package `androidx.media3.cast`) wraps the Google Cast SDK directly and is generally preferred over building on `MediaRouter`/`RemotePlaybackClient` by hand; `MediaRouter` remains the framework for non-Cast route types (Bluetooth, Wi-Fi Display, custom `MediaRouteProvider` receivers) and for the shared route-selection UI (`MediaRouteButton`) that the Output Switcher builds on.

## Related

- [MediaRouteSelector](./media-route-selector.md)
- [MediaRouteButton and MediaRouteActionProvider](./media-route-button.md)
- [MediaRouteProvider](./media-route-provider.md)
- [RemotePlaybackClient](./remote-playback-client.md)
- [CastPlayer (media3-playback)](../media3-playback/cast-player.md)
