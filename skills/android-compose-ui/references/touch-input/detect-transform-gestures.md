# detectTransformGestures

Low-level multitouch gesture detector for combining pan, zoom, and rotation with other custom pointer handling, used inside a [pointerInput](./pointer-input.md) block.

## Signature / Usage

```kotlin
suspend fun PointerInputScope.detectTransformGestures(
    panZoomLock: Boolean = false,
    onGesture: (centroid: Offset, pan: Offset, zoom: Float, rotation: Float) -> Unit,
)
```

```kotlin
Box(
    Modifier
        .pointerInput(Unit) {
            detectTransformGestures { centroid, pan, zoom, rotation ->
                scale *= zoom
                rotationState += rotation
                offset += pan
            }
        }
        .graphicsLayer(scaleX = scale, scaleY = scale, rotationZ = rotationState)
)
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `panZoomLock` | `Boolean` | `false` | When `true`, rotation is locked once panning/zooming starts to avoid unintentional rotation. |
| `onGesture` | `(centroid: Offset, pan: Offset, zoom: Float, rotation: Float) -> Unit` | — | Called for each frame with centroid position and accumulated deltas; consumes position changes after touch slop is reached. |

## Notes

- Does not apply the transformation itself — the caller must render the result (typically via `graphicsLayer`).
- Prefer the higher-level [transformable](./transformable.md) modifier unless you need to combine transform gestures with other custom pointer input in the same block.
- Package: `androidx.compose.foundation.gestures`.

## Related

- [transformable](./transformable.md)
- [pointer-input](./pointer-input.md)
