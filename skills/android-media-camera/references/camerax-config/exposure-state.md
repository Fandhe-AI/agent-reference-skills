# ExposureState

Interface containing the camera exposure compensation-related information. Retrieved via `CameraInfo.getExposureState()`.

## Signature / Usage

```kotlin
val exposureState = cameraInfo.exposureState
if (exposureState.isExposureCompensationSupported) {
    val range = exposureState.exposureCompensationRange
    cameraControl.setExposureCompensationIndex(range.upper)
}
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `getExposureCompensationIndex()` | `Int` | — | Current exposure compensation index. |
| `getExposureCompensationRange()` | `Range<Integer>` | — | Minimum and maximum supported exposure compensation index. |
| `getExposureCompensationStep()` | `Rational` | — | Smallest step by which the exposure compensation can change (in EV). |
| `isExposureCompensationSupported()` | `Boolean` | — | Whether the camera supports exposure compensation at all. |

## Notes

- This is Android CameraX (Kotlin, `androidx.camera`) — distinct from the same-named AVFoundation / Three.js / Blender API.
- If `isExposureCompensationSupported()` returns `false`, `getExposureCompensationRange()` is `[0, 0]`.
- Set the index via `CameraControl.setExposureCompensationIndex(Int)`.
- Artifact: `androidx.camera:camera-core`.

## Related

- [CameraControl](./camera-control.md)
- [CameraInfo](./camera-info.md)
