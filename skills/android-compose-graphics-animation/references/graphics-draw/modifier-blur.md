# Modifier.blur

Draws content blurred with the specified radii.

## Signature / Usage

```kotlin
fun Modifier.blur(radius: Dp, edgeTreatment: BlurredEdgeTreatment = BlurredEdgeTreatment.Rectangle): Modifier
fun Modifier.blur(radiusX: Dp, radiusY: Dp, edgeTreatment: BlurredEdgeTreatment = BlurredEdgeTreatment.Rectangle): Modifier
```

```kotlin
Box(
    modifier = Modifier
        .size(150.dp)
        .blur(radius = 16.dp),
)
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `radius` | `Dp` | — | Uniform blur radius applied on both axes. |
| `radiusX` / `radiusY` | `Dp` | — | Independent horizontal/vertical blur radii (two-arg overload). |
| `edgeTreatment` | `BlurredEdgeTreatment` | `BlurredEdgeTreatment.Rectangle` | `Rectangle` clips the blur to the layer's rectangular bounds; `Unbounded` samples transparent black outside bounds without clipping. |

## Notes

- Only supported on Android 12 (API 31) and above; on lower API levels the modifier has no visible effect.
- `BlurredEdgeTreatment` is a value class wrapping an optional `Shape` used for the clip bound.
- Package: `androidx.compose.ui.draw`.

## Related

- [Modifier.graphicsLayer](./modifier-graphics-layer.md)
- [RenderEffect](./render-effect.md)
