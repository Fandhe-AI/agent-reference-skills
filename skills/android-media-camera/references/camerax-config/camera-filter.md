# CameraFilter

Interface for custom camera filtering logic, attached to a `CameraSelector` via `Builder.addCameraFilter()` to narrow or reorder which cameras are eligible for selection.

## Signature / Usage

```kotlin
val cameraSelector = CameraSelector.Builder()
    .requireLensFacing(CameraSelector.LENS_FACING_BACK)
    .addCameraFilter { cameraInfos ->
        cameraInfos.filter { it.hasFlashUnit() }
    }
    .build()

val camera = cameraProvider.bindToLifecycle(lifecycleOwner, cameraSelector, preview)
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `CameraSelector.Builder.addCameraFilter(cameraFilter: CameraFilter)` | `Builder` | — | Adds a custom `CameraFilter` to the selector; filters apply in order, first match wins. |
| `filter(cameraInfos: List<CameraInfo>)` | `List<CameraInfo>` | — | Interface method: filters and orders cameras by priority (lower index = higher priority). May throw `IllegalArgumentException` if lens facing cannot be determined. |
| `getIdentifier()` | `Identifier` | `DEFAULT_ID` | Identifies the filter, e.g. to map to a `CameraConfig`. |
| `CameraXConfig.Builder.setAvailableCamerasLimiter(availableCameraSelector: CameraSelector)` | `Builder` | none | A `CameraSelector` (optionally carrying `CameraFilter`s) that restricts camera enumeration app-wide, reducing startup latency. |

## Notes

- This is Android CameraX (Kotlin, `androidx.camera`) — distinct from the same-named AVFoundation / Three.js / Blender API.
- `CameraSelector` itself is documented in the `camerax-usecases` category (`references/camerax-usecases/camera-selector.md`).
- `CameraFilter` is most often used either to add per-bind filtering logic via `CameraSelector.Builder.addCameraFilter()`, or app-wide via `CameraXConfig.Builder.setAvailableCamerasLimiter()`.
- Artifact: `androidx.camera:camera-core`.

## Related

- [CameraSelector](../camerax-usecases/camera-selector.md)
- [CameraXConfig](./camerax-config.md)
- [CameraInfo](./camera-info.md)
