# TileService

Abstract `Service` subclass that Wear OS apps extend to provide tile content. The system binds to it and calls its lifecycle methods to request timelines, resources, and to report carousel/interaction events.

## Signature / Usage

```kotlin
class MyTileService : TileService() {

    override fun onTileRequest(
        requestParams: RequestBuilders.TileRequest
    ): ListenableFuture<TileBuilders.Tile> =
        Futures.immediateFuture(
            TileBuilders.Tile.Builder()
                .setResourcesVersion(RESOURCES_VERSION)
                .setTileTimeline(
                    TimelineBuilders.Timeline.fromLayoutElement(
                        materialScope(this, requestParams.deviceConfiguration) {
                            primaryLayout(
                                mainSlot = { text("Hello, World!".layoutString) }
                            )
                        }
                    )
                )
                .build()
        )

    override fun onTileResourcesRequest(
        requestParams: RequestBuilders.ResourcesRequest
    ): ListenableFuture<ResourceBuilders.Resources> =
        Futures.immediateFuture(
            ResourceBuilders.Resources.Builder().setVersion(RESOURCES_VERSION).build()
        )
}
```

Manifest declaration:

```xml
<service
    android:name=".MyTileService"
    android:label="@string/tile_label"
    android:description="@string/tile_description"
    android:icon="@mipmap/ic_launcher"
    android:exported="true"
    android:permission="com.google.android.wearable.permission.BIND_TILE_PROVIDER">
    <intent-filter>
        <action android:name="androidx.wear.tiles.action.BIND_TILE_PROVIDER" />
    </intent-filter>

    <meta-data
        android:name="androidx.wear.tiles.PREVIEW"
        android:resource="@drawable/tile_preview" />
</service>
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `onTileRequest(requestParams: TileRequest)` | `ListenableFuture<Tile>` | — | Mandatory. Called when the system requests a new timeline. Must complete within 10 seconds. |
| `onTileResourcesRequest(requestParams: ResourcesRequest)` | `ListenableFuture<Resources>` | — | Called when the system requests the resource bundle (images) referenced by the layout. |
| `onTileAddEvent(requestParams: TileAddEvent)` | `void` | no-op | Called when the tile is added to the carousel. |
| `onTileRemoveEvent(requestParams: TileRemoveEvent)` | `void` | no-op | Called when the tile is removed from the carousel. |
| `onRecentInteractionEventsAsync(events: List<TileInteractionEvent>)` | `ListenableFuture<Void>` | no-op | Called with a batch of interaction events (enter/leave/foreground) since the last invocation. |

## Notes

- `TileService.ACTION_BIND_TILE_PROVIDER` (`"androidx.wear.tiles.action.BIND_TILE_PROVIDER"`) is the intent-filter action tile providers must declare.
- `TileService.EXTRA_CLICKABLE_ID` (`"androidx.wear.tiles.extra.CLICKABLE_ID"`) carries the ID of the tapped `Clickable`.
- `TileService.METADATA_PREVIEW_KEY` (`"androidx.wear.tiles.PREVIEW"`) names the manifest `<meta-data>` drawable used as the carousel preview image.
- `TileService.getUpdater(context: Context): TileUpdateRequester` — obtains an updater to notify the renderer that new content is available (see `updating-tiles.md`).
- `TileService.getActiveTilesAsync(context: Context, executor: Executor): ListenableFuture<List<ActiveTileIdentifier>>` — lists tiles from this app currently present in the user's carousel.
- All `TileService` methods run on the main thread (`@MainThread`); service lifecycle methods (`onCreate`/`onBind`/`onDestroy`) run on a separate thread.
- For Kotlin coroutines instead of `ListenableFuture`, the Horologist library provides a `SuspendingTileService` wrapper.
- Package: `androidx.wear.tiles` (class), depends on `androidx.wear.tiles:tiles`, `androidx.wear.protolayout:protolayout`, `androidx.wear.protolayout:protolayout-material3`, `androidx.wear.protolayout:protolayout-expression`.
- Tiles use ProtoLayout, not Jetpack Compose, to describe UI — do not use `androidx.wear.compose.*` composables inside `onTileRequest`.

## Related

- [tile-builders](./tile-builders.md)
- [material3-layout](./material3-layout.md)
- [updating-tiles](./updating-tiles.md)
- [tile-preview-debugging](./tile-preview-debugging.md)
