# Shape

Defines a generic shape via `createOutline`. `androidx.compose.foundation.shape` provides `RoundedCornerShape`, `CutCornerShape`, and `CircleShape`; `GenericShape` builds an arbitrary shape from a `Path` lambda.

## Signature / Usage

```kotlin
interface Shape {
    fun createOutline(size: Size, layoutDirection: LayoutDirection, density: Density): Outline
}

class RoundedCornerShape(topStart: CornerSize, topEnd: CornerSize, bottomEnd: CornerSize, bottomStart: CornerSize) : CornerBasedShape
fun RoundedCornerShape(corner: CornerSize): RoundedCornerShape
fun RoundedCornerShape(size: Dp): RoundedCornerShape
fun RoundedCornerShape(size: Float): RoundedCornerShape
fun RoundedCornerShape(percent: Int): RoundedCornerShape
fun RoundedCornerShape(topStart: Dp = 0.dp, topEnd: Dp = 0.dp, bottomEnd: Dp = 0.dp, bottomStart: Dp = 0.dp): RoundedCornerShape
val CircleShape: RoundedCornerShape // = RoundedCornerShape(50)

class CutCornerShape(topStart: CornerSize, topEnd: CornerSize, bottomEnd: CornerSize, bottomStart: CornerSize) : CornerBasedShape
fun CutCornerShape(size: Dp): CutCornerShape
fun CutCornerShape(percent: Int): CutCornerShape
fun CutCornerShape(topStart: Dp = 0.dp, topEnd: Dp = 0.dp, bottomEnd: Dp = 0.dp, bottomStart: Dp = 0.dp): CutCornerShape

class GenericShape(builder: Path.(size: Size, layoutDirection: LayoutDirection) -> Unit) : Shape
```

```kotlin
Box(
    modifier = Modifier
        .size(120.dp)
        .clip(RoundedCornerShape(topStart = 16.dp, bottomEnd = 16.dp))
        .background(Color(0xFF80DEEA)),
)

val triangle = GenericShape { size, _ ->
    moveTo(size.width / 2f, 0f)
    lineTo(size.width, size.height)
    lineTo(0f, size.height)
}
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `topStart` / `topEnd` / `bottomEnd` / `bottomStart` | `Dp` / `Float` / `CornerSize` | `0.dp` | Per-corner size for `RoundedCornerShape` (rounding radius) or `CutCornerShape` (cut leg length). |
| `percent` | `Int` | — | Uniform corner size as a percentage of the shape's smaller side. |
| `builder` | `Path.(Size, LayoutDirection) -> Unit` | — | `GenericShape` lambda that draws the outline path; automatically closed. |

## Notes

- `RoundedCornerShape` and `CutCornerShape` automatically mirror corner sizes in `LayoutDirection.Rtl`; use `AbsoluteRoundedCornerShape` / `AbsoluteCutCornerShape` to opt out.
- `CircleShape` is defined as `RoundedCornerShape(50)` (50% corner radius on all sides).
- `Outline` returned by `createOutline` is one of `Outline.Rectangle`, `Outline.Rounded`, or `Outline.Generic` (arbitrary `Path`).
- The separate `androidx.graphics:graphics-shapes` library (`RoundedPolygon`, `Morph`, `CornerRounding`) builds and morphs polygonal shapes; wrap the resulting `Path` in a custom `Shape` implementation to use with `Modifier.clip`. See [RoundedPolygon / Morph / CornerRounding](./rounded-polygon-morph.md).
- Package: `androidx.compose.ui.graphics` (`Shape`, `GenericShape`) / `androidx.compose.foundation.shape` (`RoundedCornerShape`, `CutCornerShape`, `CircleShape`).

## Related

- [Modifier.clip](./modifier-clip.md)
- [Path](./path.md)
- [Modifier.shadow](./modifier-shadow.md)
- [RoundedPolygon / Morph / CornerRounding](./rounded-polygon-morph.md)
