# Tile preview and debugging (@Preview, tiles-tooling, adb)

`androidx.wear.tiles.tooling.preview.Preview` renders a tile inside Android Studio without deploying to a device/emulator; `adb` broadcasts let you add/show/remove a tile on a running device or emulator for manual testing.

## Signature / Usage

```kotlin
@Preview(device = WearDevices.SMALL_ROUND)
@Preview(device = WearDevices.LARGE_ROUND)
fun tilePreview(context: Context) = TilePreviewData { request ->
    TilePreviewHelper.singleTimelineEntryTileBuilder(
        buildMyTileLayout(context, request.deviceConfiguration)
    ).build()
}

@Preview(device = WearDevices.SMALL_ROUND)
fun previewWithResources(context: Context) = TilePreviewData(
    onTileResourceRequest = { request ->
        ResourceBuilders.Resources.Builder()
            .setVersion(RESOURCES_VERSION)
            .addIdToImageMapping(myImageId, getImageById(R.drawable.animated_walk))
            .build()
    },
    onTileRequest = { request ->
        TilePreviewHelper.singleTimelineEntryTileBuilder(
            buildMyTileLayout(context, request.deviceConfiguration)
        ).build()
    }
)
```

Dependencies:

```kotlin
dependencies {
    implementation("androidx.wear.tiles:tiles-tooling-preview:1.6.1")
    debugImplementation("androidx.wear.tiles:tiles-tooling:1.6.1")
    implementation("androidx.wear:wear-tooling-preview:1.0.0")
    testImplementation("androidx.wear.tiles:tiles-testing:1.6.1")
}
```

Manipulating tiles via `adb` (`ComponentName` format: `package.name/fully.qualified.ServiceClass`):

```bash
# Add a tile, returns its carousel index
adb shell am broadcast -a com.google.android.wearable.app.DEBUG_SURFACE \
  --es operation add-tile --ecn component [COMPONENT_NAME]

# Show/activate the tile at a given index
adb shell am broadcast -a com.google.android.wearable.app.DEBUG_SYSUI \
  --es operation show-tile --ei index [TILE_INDEX]

# Remove all instances of the tile
adb shell am broadcast -a com.google.android.wearable.app.DEBUG_SURFACE \
  --es operation remove-tile --ecn component [COMPONENT_NAME]
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `@Preview(device = WearDevices.*)` | annotation | Marks a function returning `TilePreviewData` for rendering in Android Studio's Tile Preview panel; multiple `@Preview` annotations render multiple device sizes. |
| `TilePreviewData(onTileRequest, onTileResourceRequest = null, platformDataValues = null)` | constructor | Supplies the preview's `Tile`/`Resources` builders and optional platform-data overrides. |
| `TilePreviewHelper.singleTimelineEntryTileBuilder(layout)` | helper | Wraps a `LayoutElement` into a single-entry `Tile.Builder` for previews. |
| `platformDataValues = PlatformDataValues.of(key, DynamicDataBuilders.DynamicDataValue.fromFloat(...))` | param | Overrides a `PlatformHealthSources` key (e.g. heart rate) with a fixed value for preview/testing. |

## Notes

- Android Studio auto-creates a "Wear OS Tile" run configuration via the gutter run icon next to a `TileService`; it can also be added manually (run configuration type "Wear OS Tile").
- `adb` result codes: `result=0` no receiver (old Wear OS version or debug process not running), `result=1` success, `result>1` error.
- The `androidx.wear.tiles:tiles-testing` artifact (declared `testImplementation`) supports unit-testing tile-building logic outside the Preview panel.
- Package/dependency: `androidx.wear.tiles:tiles-tooling-preview`, `androidx.wear.tiles:tiles-tooling`, `androidx.wear:wear-tooling-preview`.

## Related

- [tile-service](./tile-service.md)
- [platform-data](./platform-data.md)
