# ZoomState

Interface containing the zoom-related information from a camera. Retrieved via `CameraInfo.getZoomState()` as a `LiveData<ZoomState>`.

## Signature / Usage

```kotlin
cameraInfo.zoomState.observe(lifecycleOwner) { zoomState ->
    val ratio = zoomState.zoomRatio
    val linear = zoomState.linearZoom
    val range = zoomState.minZoomRatio..zoomState.maxZoomRatio
}
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `getZoomRatio()` | `Float` | `1.0f` | Current zoom ratio. |
| `getMaxZoomRatio()` | `Float` | — | Maximum zoom ratio supported by the camera. |
| `getMinZoomRatio()` | `Float` | — | Minimum zoom ratio; typically `1.0f`, but can be less on devices supporting zoom-out (API 30+). |
| `getLinearZoom()` | `Float` | — | Zoom on a `[0..1]` linear scale; `0` is minimum zoom, `1` is maximum zoom. |

## Notes

- This is Android CameraX (Kotlin, `androidx.camera`) — distinct from the same-named AVFoundation / Three.js / Blender API.
- Set zoom via `CameraControl.setZoomRatio()` (ratio-based) or `CameraControl.setLinearZoom()` (perceptually uniform).
- Artifact: `androidx.camera:camera-core`.

## Related

- [CameraControl](./camera-control.md)
- [CameraInfo](./camera-info.md)
