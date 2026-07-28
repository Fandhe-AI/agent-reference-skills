# CameraControl

Interface for controlling camera operations such as torch, zoom, exposure compensation, and focus/metering. Retrieved from the `Camera` object returned by `ProcessCameraProvider.bindToLifecycle()`.

## Signature / Usage

```kotlin
val camera: Camera = cameraProvider.bindToLifecycle(
    lifecycleOwner, cameraSelector, preview, imageCapture
)
val cameraControl: CameraControl = camera.cameraControl

// Torch
cameraControl.enableTorch(true)

// Zoom
cameraControl.setZoomRatio(2.0f)
cameraControl.setLinearZoom(0.5f)

// Exposure compensation
cameraControl.setExposureCompensationIndex(2)
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `enableTorch(torch: Boolean)` | `ListenableFuture<Void>` | — | Turns the torch on/off. Fails if `CameraInfo#hasFlashUnit()` is `false`. |
| `enableLowLightBoostAsync(lowLightBoost: Boolean)` | `ListenableFuture<Void>` | — | Enables/disables low-light boost (default method). |
| `startFocusAndMetering(action: FocusMeteringAction)` | `ListenableFuture<FocusMeteringResult>` | — | Starts a focus/metering action, e.g. tap-to-focus. |
| `cancelFocusAndMetering()` | `ListenableFuture<Void>` | — | Cancels the current `startFocusAndMetering` operation and resets to the default metering behavior. |
| `setZoomRatio(ratio: Float)` | `ListenableFuture<Void>` | — | Sets zoom by ratio; valid range is `CameraInfo.getZoomState().value.minZoomRatio` to `maxZoomRatio`. |
| `setLinearZoom(linearZoom: Float)` | `ListenableFuture<Void>` | — | Sets zoom on a linear `[0..1]` scale, where the perceived zoom change is uniform across the range. |
| `setExposureCompensationIndex(value: Int)` | `ListenableFuture<Integer>` | — | Sets exposure compensation index; must be within `ExposureState#getExposureCompensationRange()`. |
| `setTorchStrengthLevel(torchStrengthLevel: Int)` | `ListenableFuture<Void>` | — | Sets torch brightness level (default method), `@IntRange(from = 1)`. |

## Notes

- This is Android CameraX (Kotlin, `androidx.camera`) — distinct from the same-named AVFoundation / Three.js / Blender API.
- All setter methods are asynchronous and return a `ListenableFuture`; a returned future may complete exceptionally with `CameraControl.OperationCanceledException` if superseded by a newer call or if the camera is closed.
- Artifact: `androidx.camera:camera-core`.

## Related

- [CameraInfo](./camera-info.md)
- [FocusMeteringAction](./focus-metering-action.md)
- [ZoomState](./zoom-state.md)
- [ExposureState](./exposure-state.md)
