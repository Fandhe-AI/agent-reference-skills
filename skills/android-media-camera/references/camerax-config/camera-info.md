# CameraInfo

Interface exposing read-only information about a bound camera: state, zoom, exposure, torch, sensor orientation, and capabilities. Retrieved from `Camera.cameraInfo` or from a `CameraSelector.filter(List<CameraInfo>)` call before binding.

## Signature / Usage

```kotlin
val cameraInfo: CameraInfo = camera.cameraInfo

cameraInfo.getZoomState().observe(lifecycleOwner) { zoomState ->
    // zoomState.zoomRatio, minZoomRatio, maxZoomRatio, linearZoom
}
cameraInfo.getCameraState().observe(lifecycleOwner) { state ->
    // state.type, state.error
}
val hasFlash = cameraInfo.hasFlashUnit()
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `getZoomState()` | `LiveData<ZoomState>` | — | Current zoom ratio/linear zoom and supported range. |
| `getTorchState()` | `LiveData<Integer>` | — | `TorchState.ON` / `TorchState.OFF`. |
| `getCameraState()` | `LiveData<CameraState>` | — | Current lifecycle state of the camera (`OPEN`, `CLOSED`, etc.) and any error. |
| `getExposureState()` | `ExposureState` | — | Current exposure compensation index, range, and step. |
| `getSensorRotationDegrees()` | `Int` | — | Sensor rotation relative to the device's natural orientation. |
| `getSensorRotationDegrees(relativeRotation: Int)` | `Int` | — | Sensor rotation relative to a given rotation value (e.g. `Surface.ROTATION_0`). |
| `hasFlashUnit()` | `Boolean` | — | Whether the camera has a flash unit. |
| `getLensFacing()` | `Int` | — | `CameraSelector.LENS_FACING_FRONT` / `LENS_FACING_BACK` / `LENS_FACING_EXTERNAL` / `LENS_FACING_UNKNOWN`. |
| `getCameraSelector()` | `CameraSelector` | — | A selector uniquely identifying this camera. |
| `getImplementationType()` | `String` | — | e.g. `IMPLEMENTATION_TYPE_CAMERA2`, `IMPLEMENTATION_TYPE_CAMERA2_LEGACY`. |
| `getIntrinsicZoomRatio()` | `Float` | — | Zoom ratio of this camera relative to the device's default camera. |
| `getSupportedFrameRateRanges()` | `Set<Range<Integer>>` | — | AE target FPS ranges supported by this camera. |

## Notes

- This is Android CameraX (Kotlin, `androidx.camera`) — distinct from the same-named AVFoundation / Three.js / Blender API.
- Values exposed as `LiveData` reflect live camera state and should be observed rather than read once.
- Artifact: `androidx.camera:camera-core`.

## Related

- [CameraControl](./camera-control.md)
- [CameraState](./camera-state.md)
- [ZoomState](./zoom-state.md)
- [ExposureState](./exposure-state.md)
