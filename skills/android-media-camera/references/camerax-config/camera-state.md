# CameraState

Represents the state of a camera device (open/closed/opening/closing) and any associated error. Retrieved as a `LiveData<CameraState>` via `CameraInfo.getCameraState()`.

## Signature / Usage

```kotlin
cameraInfo.cameraState.observe(lifecycleOwner) { cameraState ->
    when (cameraState.type) {
        CameraState.Type.OPEN -> { /* camera ready */ }
        CameraState.Type.CLOSED -> { /* camera closed */ }
        else -> {}
    }
    cameraState.error?.let { error ->
        when (error.code) {
            CameraState.ERROR_CAMERA_IN_USE -> { /* handle */ }
            CameraState.ERROR_MAX_CAMERAS_IN_USE -> { /* handle */ }
        }
    }
}
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `getType()` | `CameraState.Type` | — | One of `PENDING_OPEN`, `OPENING`, `OPEN`, `CLOSING`, `CLOSED`. |
| `getError()` | `CameraState.StateError?` | `null` | Error that caused a state transition, if any. |
| `StateError.getCode()` | `Int` | — | One of the `ERROR_*` constants below. |
| `StateError.getCause()` | `Throwable?` | `null` | Underlying platform exception, if available. |
| `StateError.getType()` | `ErrorType` | — | `RECOVERABLE` (CameraX will retry) or `CRITICAL` (requires app/user action). |

`StateError` error codes: `ERROR_MAX_CAMERAS_IN_USE` (1), `ERROR_CAMERA_IN_USE` (2), `ERROR_OTHER_RECOVERABLE_ERROR` (3), `ERROR_STREAM_CONFIG` (4), `ERROR_CAMERA_DISABLED` (5), `ERROR_CAMERA_FATAL_ERROR` (6), `ERROR_DO_NOT_DISTURB_MODE_ENABLED` (7), `ERROR_CAMERA_REMOVED` (8).

## Notes

- This is Android CameraX (Kotlin, `androidx.camera`) — distinct from the same-named AVFoundation / Three.js / Blender API.
- CameraX includes an internal `Quirks` compatibility layer that normalizes device-specific behavior differences (resolution/aspect-ratio compromises, retry timing, etc.) so `CameraState` transitions stay consistent across OEMs; app code does not need to special-case devices directly.
- CameraX supports Android 5.0 (API 21) and higher. If inconsistent behavior is observed on a specific device, file an issue against the CameraX component with device details.
- Artifact: `androidx.camera:camera-core`.

## Related

- [CameraInfo](./camera-info.md)
- [CameraXConfig](./camerax-config.md)
