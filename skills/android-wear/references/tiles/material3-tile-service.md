# Material3TileService

Kotlin-first base class for Material 3 tiles (`androidx.wear.tiles:tiles:1.6.0` and higher). Extend it instead of the lower-level `TileService` or Horologist's `SuspendingTileService`.

## Signature / Usage

```kotlin
class MyTileService : Material3TileService() {

    override suspend fun MaterialScope.tileResponse(requestParams: TileRequest): Tile =
        tile(
            timeline =
            Timeline.fromLayoutElement(
                primaryLayout(
                    mainSlot = {
                        text("Hello, World!".layoutString, typography = BODY_LARGE)
                    }
                )
            )
        )
}
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `MaterialScope.tileResponse(requestParams: TileRequest)` | `suspend fun`: `Tile` | Single suspending function to implement instead of `onTileRequest()` / `ListenableFuture`. Runs with `MaterialScope` as receiver. |
| `allowDynamicTheme`, `defaultColorScheme` | constructor parameters | Configure the pre-built `MaterialScope` (theming). |
| `ProtoLayoutScope` | built-in | Registers inline image resources automatically and returns the tile layout and resources in a single system binder call. |

## Notes

- Because `onTileResourcesRequest()` is `final` in `Material3TileService`, do not override it. Pass an `ImageResource` (such as `imageResource(androidImageResource(R.drawable.icon))`) directly to Material 3 components like `icon()` or `backgroundImage()`; resources are registered automatically.
- No redundant `materialScope()` call is needed inside `tileResponse()` because the scope is already the receiver.
- `Material3TileService` builds on the base `TileService`; the manifest registration is the same as for `TileService`. Low-level concepts in the guide (`onTileRequest()`, `onTileResourcesRequest()`) apply to the base class.
- `TileService` is a bound service: if you override bound-service lifecycle methods, avoid unintended interactions with the `TileService`-specific lifecycle methods, which are called in a separate asynchronous thread.
- Tiles use ProtoLayout, not Jetpack Compose, to describe UI. Do not use `androidx.wear.compose.*` composables in a tile.
- Source: https://developer.android.com/training/wearables/tiles/get_started; https://developer.android.com/jetpack/androidx/releases/wear-tiles (1.6.0)

## Related

- [tile-service](./tile-service.md)
- [material3-layout](./material3-layout.md)
- [migrate-tiles](./migrate-tiles.md)
