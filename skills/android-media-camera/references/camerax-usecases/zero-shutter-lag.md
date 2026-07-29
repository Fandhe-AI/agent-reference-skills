# Zero-Shutter Lag (ZSL)

An experimental `ImageCapture` capture mode (`CAPTURE_MODE_ZERO_SHUTTER_LAG`) that minimizes shutter latency by continuously buffering recent frames and reprocessing the one closest to the moment `takePicture()` was called, instead of capturing a fresh frame on demand.

## Signature / Usage

```kotlin
val imageCapture = ImageCapture.Builder()
    .setCaptureMode(ImageCapture.CAPTURE_MODE_ZERO_SHUTTER_LAG)
    .build()

// check device support before relying on true ZSL behavior
if (camera.cameraInfo.isZslSupported) {
    // ZSL will actually be used; otherwise CameraX silently falls back
}
```

```kotlin
val CAPTURE_MODE_ZERO_SHUTTER_LAG: Int // ImageCapture.Builder.setCaptureMode() value
val CameraInfo.isZslSupported: Boolean
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `captureMode` | `Int` | `CAPTURE_MODE_MINIMIZE_LATENCY` | Set to `ImageCapture.CAPTURE_MODE_ZERO_SHUTTER_LAG` to request ZSL. |
| `isZslSupported` | `Boolean` (on `CameraInfo`) | — | `true` if the device supports `PRIVATE` camera2 reprocessing (Android 6.0+/API 23+ and `REQUEST_AVAILABLE_CAPABILITIES_PRIVATE_REPROCESSING`); check before relying on ZSL behavior. |

## Notes

- Internally keeps a ring buffer of the three most recent frames and uses camera2 `PRIVATE` reprocessing to produce the final JPEG from the frame closest to the capture request timestamp.
- Falls back automatically to `CAPTURE_MODE_MINIMIZE_LATENCY` when the device doesn't support it, or when flash (`FLASH_MODE_ON`/`FLASH_MODE_AUTO`) is active, since flash requires a fresh capture.
- Incompatible with Camera Extensions and not intended for use alongside `VideoCapture`.
- Experimental API; available since CameraX 1.2.
- Artifact: `androidx.camera:camera-core`.

## Related

- [ImageCapture](./image-capture.md)
