# Modifier.graphicsLayer

Makes content draw into a separate draw layer, enabling scale, rotation, translation, alpha, clip, shadow, render effects, and compositing-strategy control without redrawing the composable's own draw instructions.

## Signature / Usage

```kotlin
fun Modifier.graphicsLayer(
    scaleX: Float = 1.0f,
    scaleY: Float = 1.0f,
    alpha: Float = 1.0f,
    translationX: Float = 0f,
    translationY: Float = 0f,
    shadowElevation: Float = 0f,
    rotationX: Float = 0f,
    rotationY: Float = 0f,
    rotationZ: Float = 0f,
    cameraDistance: Float = DefaultCameraDistance,
    transformOrigin: TransformOrigin = TransformOrigin.Center,
    shape: Shape = RectangleShape,
    clip: Boolean = false,
    renderEffect: RenderEffect? = null,
    ambientShadowColor: Color = Color.Black,
    spotShadowColor: Color = Color.Black,
    compositingStrategy: CompositingStrategy = CompositingStrategy.Auto,
): Modifier
```

```kotlin
Image(
    painter = painterResource(id = R.drawable.sunset),
    contentDescription = "Sunset",
    modifier = Modifier.graphicsLayer {
        this.scaleX = 1.2f
        this.scaleY = 0.8f
        this.rotationZ = 45f
    },
)
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `scaleX` / `scaleY` | `Float` | `1.0f` | Horizontal/vertical scale factor. |
| `alpha` | `Float` | `1.0f` | Layer opacity. |
| `translationX` / `translationY` | `Float` | `0f` | Pixel offset applied post-layout. |
| `shadowElevation` | `Float` | `0f` | Elevation in pixels used to draw a shadow when `> 0f`. |
| `rotationX` / `rotationY` / `rotationZ` | `Float` | `0f` | Rotation in degrees around each axis. |
| `transformOrigin` | `TransformOrigin` | `TransformOrigin.Center` | Pivot point for scale/rotation, fractional coordinates. |
| `shape` | `Shape` | `RectangleShape` | Shape used for clipping and shadow outline. |
| `clip` | `Boolean` | `false` | Clips content to `shape` when `true`. |
| `renderEffect` | `RenderEffect?` | `null` | Visual effect (e.g. blur) applied to the rasterized layer. |
| `compositingStrategy` | `CompositingStrategy` | `Auto` | `Auto`, `Offscreen`, or `ModulateAlpha`; controls when content rasterizes to an offscreen buffer. |

## Notes

- `CompositingStrategy.Auto` rasterizes to an offscreen buffer only when `alpha < 1.0f` or a `renderEffect` is set.
- `CompositingStrategy.Offscreen` always rasterizes first, required for correct `BlendMode` compositing between overlapping draw calls within the same layer.
- `CompositingStrategy.ModulateAlpha` multiplies alpha per draw instruction without an offscreen buffer (unless `renderEffect` is set), faster but incorrect for overlapping semi-transparent content.
- Transformations set via `graphicsLayer` apply only at draw time, after layout.
- `rememberGraphicsLayer()` (Compose 1.7.0-alpha07+) plus `graphicsLayer.record { ... }` / `graphicsLayer.toImageBitmap()` captures composable content to a bitmap.
- Package: `androidx.compose.ui.draw` / `androidx.compose.ui.graphics`.

## Related

- [Modifier.shadow](./modifier-shadow.md)
- [Modifier.clip](./modifier-clip.md)
- [Modifier.alpha](./modifier-alpha.md)
- [RenderEffect](./render-effect.md)
- [BlendMode](./blend-mode.md)
