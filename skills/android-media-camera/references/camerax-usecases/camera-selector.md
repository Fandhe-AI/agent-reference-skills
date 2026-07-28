# CameraSelector

A set of requirements and priorities used to select a camera, or to filter a set of cameras.

## Signature / Usage

```kotlin
// Built-in selectors
CameraSelector.DEFAULT_BACK_CAMERA
CameraSelector.DEFAULT_FRONT_CAMERA

// Custom selection
val cameraSelector = CameraSelector.Builder()
    .requireLensFacing(CameraSelector.LENS_FACING_FRONT)
    .build()
```

```kotlin
class Builder {
    fun requireLensFacing(lensFacing: Int): Builder
    fun addCameraFilter(cameraFilter: CameraFilter): Builder
    fun build(): CameraSelector
}
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `lensFacing` | `Int` | — | One of `LENS_FACING_FRONT`, `LENS_FACING_BACK`, `LENS_FACING_EXTERNAL`, `LENS_FACING_UNKNOWN`. |
| `cameraFilter` | `CameraFilter` | — | Custom filter to select cameras by criteria beyond lens facing. |

## Notes

- `DEFAULT_BACK_CAMERA` / `DEFAULT_FRONT_CAMERA` are static `CameraSelector` instances covering the common case.
- `LENS_FACING_EXTERNAL` targets an external camera with no fixed facing; experimental, use cautiously.
- Combine with `CameraProvider.availableCameraInfos` and `Camera2CameraInfo.from(cameraInfo)` to inspect Camera2 characteristics (hardware level, etc.) — see the camerax-config category for `CameraInfo` details.
- Custom camera narrowing via `CameraFilter` implementations is documented in the `camerax-config` category (references/android-media-camera/camerax-config/).
- Artifact: `androidx.camera:camera-core`.

## Related

- [ProcessCameraProvider](./process-camera-provider.md)
- [CameraController](./camera-controller.md)
