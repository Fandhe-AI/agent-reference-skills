# MaterialShapes

Sealed class whose companion object holds 30+ predefined Material Design shapes as normalized `RoundedPolygon`s (Circle, Cookie, Clover, Heart, Star, Burst, etc.), for use directly as component shapes or as endpoints in shape-morphing animations via `Morph`.

## Signature / Usage

```kotlin
@ExperimentalMaterial3ExpressiveApi
sealed class MaterialShapes {
    companion object {
        val Circle: RoundedPolygon
        val Square: RoundedPolygon
        val Slanted: RoundedPolygon
        val Arch: RoundedPolygon
        val Fan: RoundedPolygon
        val Cookie9Sided: RoundedPolygon
        val Clover8Leaf: RoundedPolygon
        val Heart: RoundedPolygon
        // + 20 more predefined RoundedPolygon shapes
    }
}

fun RoundedPolygon.toShape(startAngle: Int = 0): Shape

@Composable
fun RoundedPolygon.toPath(startAngle: Int = 0): Path
```

```kotlin
@OptIn(ExperimentalMaterial3ExpressiveApi::class)
Box(
    modifier = Modifier
        .clip(MaterialShapes.Cookie9Sided.toShape())
        .background(MaterialTheme.colorScheme.primaryContainer)
)
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `MaterialShapes.<Name>` | `RoundedPolygon` | One of 30+ predefined, normalized shapes (Circle, Square, Slanted, Arch, Fan, Arrow, SemiCircle, Oval, Pill, Triangle, Pentagon, Diamond, Sunny, VerySunny, Cookie4Sided–Cookie12Sided, Clover4Leaf–Clover8Leaf, Flower, Heart, Bun, Gem, Ghostish, Burst, Boom, Puffy, PixelCircle, PixelTriangle, ClamShell). |
| `RoundedPolygon.toShape(startAngle)` | extension fn returning `Shape` | Wraps a `RoundedPolygon` as a scalable, cached `Shape` (e.g. for `Modifier.clip`); `startAngle` rotates the polygon in degrees. |
| `RoundedPolygon.toPath(startAngle)` | `@Composable` extension fn returning `Path` | Converts a `RoundedPolygon` to a remembered `Path`, for drawing or as a `Morph` endpoint. |

## Notes

- Requires `@OptIn(ExperimentalMaterial3ExpressiveApi::class)`; not stable as of the source read (androidx-main, 2026-08).
- Distinct from `Shapes` (`shapes.md`): `Shapes` holds the five/eight named `CornerBasedShape` roles read via `MaterialTheme.shapes` for standard component corner rounding, while `MaterialShapes` is a separate library of decorative polygon shapes (not part of the `Shapes` role scale) primarily intended for shape-morphing (`Morph`) and expressive accents (e.g. `FloatingActionButtonMenu` item shapes, avatar/icon containers).
- Package: `androidx.compose.material3`. Built on `androidx.graphics.shapes.RoundedPolygon` / `Morph` (Android Graphics Shapes library).
- Source: `androidx/androidx` `androidx-main` branch, `compose/material3/material3/src/commonMain/kotlin/androidx/compose/material3/MaterialShapes.kt` (developer.android.com/reference is unfetchable; androidx-main source used per repository convention).

## Related

- [Shapes](./shapes.md)
- [MaterialExpressiveTheme](./material-expressive-theme.md)
