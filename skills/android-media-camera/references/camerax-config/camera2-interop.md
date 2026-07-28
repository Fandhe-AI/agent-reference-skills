# Camera2 Interop (Camera2Interop, Camera2CameraControl, Camera2CameraInfo)

Utilities for interoperating with the underlying `android.hardware.camera2` APIs from CameraX: writing custom `CaptureRequest` options via `Camera2Interop.Extender` (build-time) or `Camera2CameraControl` (runtime), and reading `CameraCharacteristics` via `Camera2CameraInfo`.

## Signature / Usage

```kotlin
// Build-time: attach Camera2 options to a use case builder
val previewBuilder = Preview.Builder()
Camera2Interop.Extender(previewBuilder)
    .setCaptureRequestOption(CaptureRequest.CONTROL_AWB_MODE, CameraMetadata.CONTROL_AWB_MODE_CLOUDY_DAYLIGHT)

// Runtime: apply Camera2 options after binding, with priority over CameraX
val camera2Control = Camera2CameraControl.from(camera.cameraControl)
camera2Control.addCaptureRequestOptions(
    CaptureRequestOptions.Builder()
        .setCaptureRequestOption(CaptureRequest.CONTROL_AF_MODE, CameraMetadata.CONTROL_AF_MODE_OFF)
        .build()
)

// Read Camera2 characteristics
val hardwareLevel = Camera2CameraInfo.from(camera.cameraInfo)
    .getCameraCharacteristic(CameraCharacteristics.INFO_SUPPORTED_HARDWARE_LEVEL)
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `Camera2Interop.Extender(builder).setCaptureRequestOption(key, value)` | `Extender<T>` | — | Sets a `CaptureRequest.Key`/value pair on the use case builder, potentially overriding CameraX's internal settings. |
| `Extender.setCaptureRequestTemplate(templateType)` | `Extender<T>` | — | Sets the `CameraDevice` template type (mainly for `ImageCapture`). |
| `Extender.setStreamUseCase(streamUseCase)` | `Extender<T>` | — | Sets the stream use case flag for the surface. Requires API 33+. |
| `Extender.setDeviceStateCallback(stateCallback)` / `setSessionStateCallback(...)` / `setSessionCaptureCallback(...)` | `Extender<T>` | — | Registers raw Camera2 callbacks. |
| `Extender.setPhysicalCameraId(cameraId)` | `Extender<T>` | — | Targets output at a specific physical camera. Requires API 28+. |
| `Camera2CameraControl.from(cameraControl)` | static | — | Retrieves the Camera2-specific control; throws `IllegalArgumentException` if CameraX was not initialized with `Camera2Config`. |
| `addCaptureRequestOptions(bundle: CaptureRequestOptions)` | `ListenableFuture<Void?>` | — | Merges new options into the currently applied set (overwrites conflicts). |
| `clearCaptureRequestOptions()` | `ListenableFuture<Void?>` | — | Clears all options applied via `Camera2CameraControl`. |
| `getCaptureRequestOptions()` | `CaptureRequestOptions` | — | Returns currently applied options (excludes device/template/CameraX defaults). |
| `Camera2CameraInfo.from(cameraInfo)` | static | — | Retrieves Camera2-specific info; throws `IllegalArgumentException` if unavailable. |
| `getCameraCharacteristic(key)` | `T?` | — | Reads a `CameraCharacteristics.Key`, consistent with `CameraManager.getCameraCharacteristics()`. |
| `getCameraId()` | `String` | — | The underlying Camera2 camera ID; throws `IllegalStateException` if unavailable. |
| `CaptureRequestOptions.Builder.setCaptureRequestOption(key, value)` / `clearCaptureRequestOption(key)` | `Builder` | — | Builds a bundle of `CaptureRequest` key/value pairs. |

## Notes

- This is Android CameraX (Kotlin, `androidx.camera`) — distinct from the same-named AVFoundation / Three.js / Blender API.
- `Camera2CameraControl` options take priority over CameraX's own 3A control (e.g. `CameraControl.startFocusAndMetering`).
- All interop APIs are gated behind the `@ExperimentalCamera2Interop` opt-in annotation.
- Only usable when CameraX is initialized with the Camera2 implementation (`Camera2Config`), not `CameraPipeConfig`.
- Artifact: `androidx.camera:camera-camera2`.

## Related

- [CameraControl](./camera-control.md)
- [CameraInfo](./camera-info.md)
- [CameraXConfig](./camerax-config.md)
