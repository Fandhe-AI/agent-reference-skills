# MediaRouteProvider and MediaRouteProviderService

Base class device/service manufacturers implement to publish custom playback routes (e.g. a proprietary receiver) into the `MediaRouter` framework, and the `Service` wrapper that makes such a provider discoverable by other apps system-wide. Package: `androidx.mediarouter.media`.

## Signature / Usage

```kotlin
class SampleMediaRouteProvider(context: Context) : MediaRouteProvider(context) {
    override fun onCreateRouteController(routeId: String): RouteController = SampleRouteController()

    private fun publishRoutes() {
        val routeDescriptor = MediaRouteDescriptor.Builder(ROUTE_ID, routeName)
            .addControlFilters(CONTROL_FILTERS_BASIC)
            .setPlaybackType(MediaRouter.RouteInfo.PLAYBACK_TYPE_REMOTE)
            .setVolumeHandling(MediaRouter.RouteInfo.PLAYBACK_VOLUME_VARIABLE)
            .setVolumeMax(VOLUME_MAX)
            .setVolume(currentVolume)
            .build()
        descriptor = MediaRouteProviderDescriptor.Builder()
            .addRoute(routeDescriptor)
            .build()
    }

    private inner class SampleRouteController : RouteController() {
        override fun onSelect() { /* prepare receiver */ }
        override fun onControlRequest(intent: Intent, callback: ControlRequestCallback?): Boolean {
            // dispatch on intent.action (ACTION_PLAY, ACTION_SEEK, ACTION_PAUSE, ...)
            return true
        }
        override fun onSetVolume(volume: Int) { /* apply absolute volume */ }
        override fun onUpdateVolume(delta: Int) { /* apply relative volume */ }
        override fun onUnselect() { /* release resources */ }
    }
}

class SampleMediaRouteProviderService : MediaRouteProviderService() {
    override fun onCreateMediaRouteProvider(): MediaRouteProvider = SampleMediaRouteProvider(this)
}
```

```xml
<!-- AndroidManifest.xml -->
<service android:name=".provider.SampleMediaRouteProviderService"
    android:label="@string/sample_media_route_provider_service"
    android:process=":mrp">
    <intent-filter>
        <action android:name="android.media.MediaRouteProviderService" />
    </intent-filter>
</service>
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `MediaRouteDescriptor.Builder` | builder | Route id/name, `addControlFilters(IntentFilter)`, `setPlaybackType`, `setPlaybackStream`, `setVolumeHandling`, `setVolumeMax`/`setVolume`. |
| `RouteController.onSelect()` / `onUnselect()` / `onRelease()` | callback | Route activation, deactivation, and final teardown. |
| `RouteController.onControlRequest(Intent, ControlRequestCallback)` | callback | Receives every non-volume command (`ACTION_PLAY`, `ACTION_SEEK`, `ACTION_PAUSE`, `ACTION_RESUME`, `ACTION_STOP`, `ACTION_GET_STATUS`, ...) matched against the route's control filters. |
| `RouteController.onSetVolume(int)` / `onUpdateVolume(int)` | callback | Absolute and relative (delta) volume changes when `setVolumeHandling(PLAYBACK_VOLUME_VARIABLE)`. |

## Notes

- A provider is scoped to the declaring app only when constructed and registered privately via `MediaRouter.addProvider()`; wrapping it in a `MediaRouteProviderService` with the `android.media.MediaRouteProviderService` intent-filter action makes it discoverable by every app on the device.
- All framework control requests except volume changes are funneled through the single `onControlRequest()` entry point; the provider is responsible for dispatching by `Intent` action/category itself.
- Route capabilities (media types, actions, playback type) are declared once via `IntentFilter`s on the `MediaRouteDescriptor` and re-published through `MediaRouteProviderDescriptor` whenever discovery criteria (`MediaRouteDiscoveryRequest`) or device state changes.

## Related

- [MediaRouter](./media-router.md)
- [MediaRouteSelector](./media-route-selector.md)
- [RemotePlaybackClient](./remote-playback-client.md)
