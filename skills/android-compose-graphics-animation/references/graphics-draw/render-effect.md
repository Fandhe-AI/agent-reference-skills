# RenderEffect

Visual effect applied to the rasterized content of a `graphicsLayer`, such as blurring or offsetting pixels after drawing.

## Signature / Usage

```kotlin
fun BlurEffect(radiusX: Float, radiusY: Float, edgeTreatment: TileMode = TileMode.Clamp): BlurEffect
fun OffsetEffect(offsetX: Float, offsetY: Float): OffsetEffect
```

```kotlin
Box(
    modifier = Modifier
        .size(150.dp)
        .graphicsLayer {
            renderEffect = BlurEffect(24f, 24f)
        },
)
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `radiusX` / `radiusY` | `Float` | — | Blur radius in pixels along each axis for `BlurEffect`. |
| `edgeTreatment` | `TileMode` | `TileMode.Clamp` | Sampling behavior at the edge of the blurred content. |
| `offsetX` / `offsetY` | `Float` | — | Pixel offset applied to content for `OffsetEffect`. |

## Notes

- Assigned via `Modifier.graphicsLayer { renderEffect = ... }`.
- Requires the compositing layer to rasterize offscreen; setting `renderEffect` implicitly forces this regardless of `CompositingStrategy`.
- Package: `androidx.compose.ui.graphics`.

## Related

- [Modifier.graphicsLayer](./modifier-graphics-layer.md)
- [Modifier.blur](./modifier-blur.md)
- [BlendMode](./blend-mode.md)
