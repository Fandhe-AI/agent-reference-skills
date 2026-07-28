# Modifier.transformable

High-level modifier that detects multitouch pan, zoom, and rotation gestures. Only detects the gesture and reports changes via `TransformableState`; transformations must be applied separately, typically with `Modifier.graphicsLayer`.

## Signature / Usage

```kotlin
fun Modifier.transformable(
    state: TransformableState,
    lockRotationOnZoomPan: Boolean = false,
    enabled: Boolean = true,
): Modifier
```

```kotlin
var scale by remember { mutableFloatStateOf(1f) }
var rotation by remember { mutableFloatStateOf(0f) }
var offset by remember { mutableStateOf(Offset.Zero) }

val state = rememberTransformableState { zoomChange, offsetChange, rotationChange ->
    scale *= zoomChange
    rotation += rotationChange
    offset += offsetChange
}

Box(
    Modifier
        .graphicsLayer(
            scaleX = scale,
            scaleY = scale,
            rotationZ = rotation,
            translationX = offset.x,
            translationY = offset.y,
        )
        .transformable(state = state)
)
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `state` | `TransformableState` | — | Reports `zoomChange` (multiplicative), `offsetChange` (pixels), and `rotationChange` (degrees); typically created with `rememberTransformableState { zoom, pan, rotation -> ... }`. |
| `lockRotationOnZoomPan` | `Boolean` | `false` | When `true`, disables rotation once a zoom/pan gesture starts. |
| `enabled` | `Boolean` | `true` | Whether the transform gesture is enabled. |

## Notes

- An overload adds a `canPan: (Offset) -> Boolean` parameter (before `lockRotationOnZoomPan`) to conditionally allow/deny panning per gesture, e.g. to only pan once zoomed in.
- Modifier order matters: apply `transformable` after `graphicsLayer` so the rendered transform reflects the latest state.
- Does not apply transformations automatically — always combine with `graphicsLayer` (or another rendering mechanism) to visualize the change.
- Package: `androidx.compose.foundation.gestures`.

## Related

- [detect-transform-gestures](./detect-transform-gestures.md)
