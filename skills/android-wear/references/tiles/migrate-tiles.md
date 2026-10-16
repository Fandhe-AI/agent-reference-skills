# Migrate to Tiles 1.5 / ProtoLayout 1.3 (Material 3 Expressive) and Tiles 1.2 / ProtoLayout 1.0

Two migration guides from the tile versioning page: moving M2.5 tiles to Material 3 Expressive (Tiles 1.5 / ProtoLayout 1.3), and moving to the `androidx.wear.protolayout` namespace (Tiles 1.2 / ProtoLayout 1.0).

## Signature / Usage

```kotlin
// In build.gradle.kts

//val tilesVersion = "1.4.1"
//val protoLayoutVersion = "1.2.1"

// Use these versions for M3.
val tilesVersion = "1.5.0"
val protoLayoutVersion = "1.3.0"

 dependencies {
     implementation("androidx.wear.tiles:tiles:$tilesVersion")
     implementation("androidx.wear.protolayout:protolayout:$protoLayoutVersion")
     // implementation("androidx.wear.protolayout:protolayout-material:$protoLayoutVersion")
     implementation("androidx.wear.protolayout:protolayout-material3:$protoLayoutVersion")
     implementation("androidx.wear.protolayout:protolayout-expression:$protoLayoutVersion")
     debugImplementation("androidx.wear.tiles:tiles-renderer:$tilesVersion")
     testImplementation("androidx.wear.tiles:tiles-testing:$tilesVersion")
 }
```

M2.5 vs M3 layout:

```kotlin
// M2.5
fun myLayout(context: Context, deviceConfiguration: DeviceParametersBuilders.DeviceParameters) =
    PrimaryLayout.Builder(deviceConfiguration)
        .setResponsiveContentInsetEnabled(true)
        .setContent(
            Text.Builder(context, "Hello World!")
                .setTypography(Typography.TYPOGRAPHY_BODY1)
                .build()
        )
        .build()

// M3
fun myLayout(context: Context, deviceConfiguration: DeviceParametersBuilders.DeviceParameters) =
    materialScope(context, deviceConfiguration) {
        primaryLayout(mainSlot = { text("Hello, World!".layoutString) })
    }
```

## Options / Props

M2.5 to M3 component mapping:

| M2.5 | M3 |
|------|----|
| `Button` / `Chip` | Buttons: `button()`, `avatarButton()`, `compactButton()`, `iconEdgeButton()`, `imageButton()`, `textButton()`, `textEdgeButton()`. Cards: `card()`, `appCard()`, `graphicDataCard()`, `iconDataCard()`, `textDataCard()`, `titleCard()` |
| `Text` | `text()` |
| `CircularProgressIndicator` | `circularProgressIndicator()` or `segmentedCircularProgressIndicator()` |
| `PrimaryLayout` / `EdgeContentLayout` | `primaryLayout()` |
| — | `buttonGroup()` |
| — | `icon()`, `avatarImage()`, `backgroundImage()` |

Namespace and method renames (Tiles 1.2 / ProtoLayout 1.0):

| Class | Old | New |
|-------|-----|-----|
| `TileBuilders` | `getTimeline()` / `setTimeline()` | `getTileTimeline()` / `setTileTimeline()` |
| `TileService` | `onResourcesRequest()` | `onTileResourcesRequest()` |
| `RequestBuilders.TileRequest` | `getDeviceParameters()` / `setDeviceParameters()` | `getDeviceConfiguration()` / `setDeviceConfiguration()` |
| `RequestBuilders.TileRequest` | `getState()` / `setState()` | `getCurrentState()` / `setCurrentState()` |

## Notes

- Tiles 1.5 / ProtoLayout 1.3 add a Compose-like API for describing the UI, Material 3 Expressive components (including the bottom-hugging edge button), and enhanced visuals (Lottie animations, more gradient types, new arc line styles). Some of these features can be used without migrating to the new API.
- Recommendation: migrate all tiles simultaneously. Material 3 components live in a separate artifact (`androidx.wear.protolayout:protolayout-material3`), so mixing M2.5 and M3 tiles in one app is technically possible but strongly discouraged unless necessary.
- Recommendation: use the existing samples (`WearTilesKotlin` in `android/wear-os-samples`) as design starting points; test across screen and font sizes using Android Studio's tile preview and multiple real devices; prefer prebuilt components with little customization to avoid text overflow and clipping.
- `TileService` implementation (including resource loading) should need minimal to no changes. Exception: if you use `onTileEnterEvent()` / `onTileLeaveEvent()`, migrate to `onRecentInteractionEventsAsync()`; starting with API 36 these events are batched.
- Layout: `onTileRequest()` still returns a `TileBuilders.Tile` containing a `Timeline` and `LayoutElement`, but the `LayoutElement` is now built with slots (top to bottom): `titleSlot` (optional), `mainSlot` (mandatory), `bottomSlot` (optional), through `primaryLayout()`. `primaryLayout()` draws the tile's icon at the top of the screen, so remove code that draws your logo there.
- `materialScope()` and `primaryLayout()` are mandatory and must each be called exactly once per layout. Builders for Material UI components are replaced by declarative functions; non-UI types (String / Color / Modifiers) get new Kotlin wrappers. `Row` / `Column` from `LayoutElementBuilders` keep the builder pattern; a small helper (`fun column(builder: Column.Builder.() -> Unit) = Column.Builder().apply(builder).build()`) gives a Compose-like style.
- Theming: dynamic theming is on by default (system-provided theme, depending on device and configuration). Color tokens increase from 4 to 29 (`ColorScheme`). Use predefined `Typography` constants rather than explicit font sizes. On Wear OS 6 (API level 36) and higher, all tiles in a carousel use the same font, which may vary across devices. Most M3 components also vary by shape (`Shapes`, e.g. `full`, `small`).
- Modifiers: M3 uses Compose-like `LayoutModifier` (for example `LayoutModifier.opacity(0.5F)`), orthogonal to the M3 components; builder-style modifiers and `LayoutModifier` can be mixed. Convert with `toProtoLayoutModifiers()`.
- Tiles 1.2 / ProtoLayout 1.0: most Tiles layout APIs live in `androidx.wear.protolayout`. Remove `androidx.wear.tiles:tiles-material`; add `protolayout`, `protolayout-material`, `protolayout-expression` (the guide shows `1.4.2`) and update `androidx.wear.tiles:tiles` (the guide shows `1.6.2`).
- Replace `androidx.wear.tiles.material.*` (and `.material.layouts`) imports with `androidx.wear.protolayout.material.*`; replace most other `androidx.wear.tiles.*` imports with `androidx.wear.protolayout.*`. Imports for `EventBuilders`, `RequestBuilders`, `TileBuilders` and `TileService` stay the same.
- From library 1.2, `TileBuilders` has its own `getState()` / `setState()` (the correct ones to use), different from `RequestBuilders.getState()` / `setState()`.
- Source page last updated 2026-09-22 UTC.

## Related

- [versioning](./versioning.md)
- [material3-tile-service](./material3-tile-service.md)
- [material3-layout](./material3-layout.md)
- [modifiers](./modifiers.md)
