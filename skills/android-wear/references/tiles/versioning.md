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

### Library release notes (security fixes)

- Tiles 1.6.1 (2026-07-01) fixed a potential `IllegalStateException` race condition in `TilesConnectionBinder` during service connection callbacks called from unexpected threads; Tiles 1.6.2 (2026-07-29) has no changes from 1.6.1.
- ProtoLayout 1.4.1 (2026-07-01): enforces a 2048px dimension limit and a 20MB raw size maximum on images; fixes a bug that let deep layouts skip layout depth enforcement during fingerprint optimizations; prevents an array bounds crash from unbounded gap parameters in `DashedArcLine`; replaces uncaught `IllegalArgumentException`s with error logging and node invalidation in the expression pipeline; fixes an uncaught `NullPointerException` on malformed image URIs.
- ProtoLayout 1.4.2 (2026-07-29): invalid cubic bezier parameters in animations fall back to a default interpolator instead of crashing the expression pipeline; the renderer wraps exception handling to guard against non-finite values or invalid animations.
- Current stable versions as of 2026-11-14: `androidx.wear.tiles` 1.6.2, `androidx.wear.protolayout` 1.4.2.
- Source: https://developer.android.com/jetpack/androidx/releases/wear-protolayout (fetched 2026-11-14)
- Source: https://developer.android.com/jetpack/androidx/releases/wear-tiles (fetched 2026-11-14)

## Related

- [tile-builders](./tile-builders.md)
- [layout-elements](./layout-elements.md)
- [animations](./animations.md)
