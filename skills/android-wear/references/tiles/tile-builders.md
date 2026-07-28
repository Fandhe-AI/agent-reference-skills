# TileBuilders.Tile / RequestBuilders / ResourceBuilders.Resources

Core data objects exchanged between the system and a `TileService`: the `Tile` returned from `onTileRequest`, the `TileRequest` / `ResourcesRequest` passed in, and the `Resources` returned from `onTileResourcesRequest`.

## Signature / Usage

```kotlin
override fun onTileRequest(
    requestParams: RequestBuilders.TileRequest
): ListenableFuture<TileBuilders.Tile> =
    Futures.immediateFuture(
        TileBuilders.Tile.Builder()
            .setResourcesVersion(RESOURCES_VERSION)
            .setFreshnessIntervalMillis(60 * 60 * 1000)
            .setTileTimeline(TimelineBuilders.Timeline.fromLayoutElement(myLayout))
            .setState(StateBuilders.State.Builder().build())
            .build()
    )

override fun onTileResourcesRequest(
    requestParams: RequestBuilders.ResourcesRequest
): ListenableFuture<ResourceBuilders.Resources> =
    Futures.immediateFuture(
        ResourceBuilders.Resources.Builder()
            .setVersion(requestParams.version)
            .addIdToImageMapping(
                "image_id",
                ResourceBuilders.ImageResource.Builder()
                    .setAndroidResourceByResId(
                        ResourceBuilders.AndroidImageResourceByResId.Builder()
                            .setResourceId(R.drawable.ic_walk)
                            .build()
                    )
                    .build()
            )
            .build()
    )
```

## Options / Props

### `TileBuilders.Tile.Builder`

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `setResourcesVersion` | `String` | — | Developer-defined version tag; must match the version returned from `onTileResourcesRequest`, used for resource caching. |
| `setTileTimeline` | `TimelineBuilders.Timeline` | — | Timeline of layouts (with optional validity windows) shown in the carousel. |
| `setFreshnessIntervalMillis` | `long` | `0` (no auto-refresh) | Milliseconds after which the system re-invokes `onTileRequest`. Should not be used to refresh more than once a minute; the system may throttle. |
| `setState` | `StateBuilders.State` | — | Key/value state map available to dynamic expressions and read back via `TileRequest.currentState`. |

### `RequestBuilders.TileRequest`

| Name | Type | Description |
|------|------|-------------|
| `deviceConfiguration` | `DeviceParameters` | Screen size, density, renderer schema version, etc. of the requesting device. |
| `currentState` | `StateBuilders.State` | State to use when building the tile (from the previous `Tile.state` or a `loadAction`). |
| `tileId` | `Int` | Instance ID allocated when the tile is added to the carousel. |
| `lastVisibleTime` | `Instant` | Last time the tile was visible. |

### `RequestBuilders.ResourcesRequest`

| Name | Type | Description |
|------|------|-------------|
| `version` | `String` | Version of resources being fetched; echo into `Resources.Builder().setVersion(...)`. |
| `resourceIds` | `List<String>` | Specific resource IDs the renderer needs (may be empty to request all). |
| `deviceConfiguration` | `DeviceParameters` | Requesting device parameters. |
| `tileId` | `Int` | Tile instance ID. |

### `ResourceBuilders.Resources.Builder`

| Name | Type | Description |
|------|------|-------------|
| `setVersion` | `String` | Must match the tile's `resourcesVersion` / the incoming `ResourcesRequest.version`. |
| `addIdToImageMapping` | `(id: String, image: ImageResource)` | Registers an image resource under an ID referenced by `Image.setResourceId(id)`. |

`ResourceBuilders.ImageResource.Builder` accepts one of:

| Setter | Description |
|--------|-------------|
| `setAndroidResourceByResId(AndroidImageResourceByResId)` | Maps to an `R.drawable` resource id. |
| `setInlineResource(InlineImageResource)` | Embeds raw image bytes (`setData`, `setWidthPx`, `setHeightPx`, `setFormat` — width/height/format required for formats like `IMAGE_FORMAT_RGB_565` that lack embedded size data). |
| `setAndroidLottieResourceByResId(AndroidLottieResourceByResId)` | Plays a Lottie animation raw resource; supports `setAndroidResourceByResId(...)` as a static fallback for unsupported renderers. |

## Notes

- `TileRequest.deviceConfiguration.rendererSchemaVersion` (major/minor) indicates the on-device ProtoLayout renderer capability; check it before using APIs annotated `@RequiresSchemaVersion` (e.g. `DashedArcLine` requires 1.500+).
- Package: `androidx.wear.tiles` (`TileBuilders`, `RequestBuilders`, `ResourceBuilders`), with the Kotlin migration surface under `androidx.wear.protolayout`.

## Related

- [tile-service](./tile-service.md)
- [updating-tiles](./updating-tiles.md)
- [platform-data](./platform-data.md)
