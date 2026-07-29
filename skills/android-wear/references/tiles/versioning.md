# Tile versioning & renderer-schema compatibility

Tiles are rendered by a system component (the ProtoLayout renderer) that is versioned and updated independently of the app's `androidx.wear.tiles`/`androidx.wear.protolayout` library, so the same code can hit renderers of different capability on different devices. Check `getRendererSchemaVersion()` and any `@RequiresSchemaVersion` annotation before relying on newer layout/modifier APIs.

## Signature / Usage

```kotlin
override fun onTileRequest(
    requestParams: RequestBuilders.TileRequest
): ListenableFuture<Tile> {
    val rendererVersion = requestParams.deviceConfiguration.rendererSchemaVersion

    val arcElement = if (
        rendererVersion.major > 1 ||
        (rendererVersion.major == 1 && rendererVersion.minor >= 500)
    ) {
        // DashedArcLine is annotated @RequiresSchemaVersion(major = 1, minor = 500)
        DashedArcLine.Builder()
            .setLength(degrees(270f))
            .setThickness(8f)
            .setLinePattern(
                LayoutElementBuilders.DashedLinePattern.Builder()
                    .setGapSize(8f)
                    .setGapInterval(10f)
                    .build()
            )
            .build()
    } else {
        // Fallback for renderers below 1.500
        ArcLine.Builder()
            .setLength(degrees(270f))
            .setThickness(dp(8f))
            .build()
    }
    // ...build and return Tile using arcElement
}
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `DeviceParameters.getRendererSchemaVersion()` (Kotlin: `deviceConfiguration.rendererSchemaVersion`) | `VersionInfo` | Returns the on-device ProtoLayout renderer's schema version, read from `TileRequest.deviceConfiguration` inside `onTileRequest`. |
| `VersionInfo.major` / `.minor` | `Int` | Major/minor components of the renderer schema version, compared against a method's `@RequiresSchemaVersion` to decide whether it is safe to call. |
| `@RequiresSchemaVersion(major, minor)` | annotation | Marks the minimum renderer schema version a ProtoLayout builder method needs; present on newer APIs (e.g. `DashedArcLine.setLinePattern`). |

## Notes

- Two independently versioned components are involved: the Jetpack Tiles/ProtoLayout libraries compiled into the app (`androidx.wear.tiles:tiles`, `androidx.wear.protolayout:protolayout`, `androidx.wear.protolayout:protolayout-material3`), and the system's ProtoLayout renderer, which updates via Play Store/system updates independently of the app and can vary across devices with identical hardware.
- Calling a method whose `@RequiresSchemaVersion` exceeds the device's renderer schema does not crash — the unsupported content is silently not displayed (or the feature is ignored), so always gate on `rendererSchemaVersion` rather than relying on a try/catch.
- Prefer builder-level fallbacks where available (e.g. `ImageResource.Builder().setAndroidLottieResourceByResId(...).setAndroidResourceByResId(...)` renders the static image when Lottie isn't supported) over manual version branching when both paths are simple.
- Test across renderer versions using different Wear OS emulator system images and Android Studio's Tile Preview (which can target different embedded ProtoLayout renderer versions); physical devices cannot be forced to a specific renderer version.
- Package: `androidx.wear.protolayout.DeviceParametersBuilders.DeviceParameters`, `androidx.wear.protolayout.expression.VersionInfo`, `androidx.wear.protolayout.expression.RequiresSchemaVersion`.

## Related

- [tile-builders](./tile-builders.md)
- [layout-elements](./layout-elements.md)
- [animations](./animations.md)
