# ConcurrentCamera / CompositionSettings

Since Android 11, `ConcurrentCamera` lets an app stream from multiple cameras simultaneously (e.g. front + back), returned after binding a list of `SingleCameraConfig`s via `ProcessCameraProvider.bindToLifecycle(List<SingleCameraConfig>)`. `CompositionSettings` optionally lets CameraX composite the streams into a single output.

## Signature / Usage

```kotlin
val availableConfigs = cameraProvider.availableConcurrentCameraInfos
// pick a front + back pair from availableConfigs, then:

val primary = ConcurrentCamera.SingleCameraConfig(
    backSelector, useCaseGroup,
    CompositionSettings.Builder().setAlpha(1.0f).setZOrder(0).build(),
    lifecycleOwner
)
val secondary = ConcurrentCamera.SingleCameraConfig(
    frontSelector, useCaseGroup2,
    CompositionSettings.Builder()
        .setAlpha(1.0f)
        .setOffset(0.3f, -0.3f)
        .setScale(0.3f, 0.3f)
        .setZOrder(1)
        .build(),
    lifecycleOwner
)

val concurrentCamera = cameraProvider.bindToLifecycle(listOf(primary, secondary))
val cameras = concurrentCamera.cameras
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `SingleCameraConfig(cameraSelector, useCaseGroup, lifecycleOwner)` | constructor | default `CompositionSettings` | Config for one camera in the concurrent set, without custom composition. |
| `SingleCameraConfig(cameraSelector, useCaseGroup, compositionSettings, lifecycleOwner)` | constructor | — | Same, with explicit composition settings for stream compositing. |
| `ConcurrentCamera.getCameras()` | `List<Camera>` | — | The bound `Camera` instances, one per `SingleCameraConfig`. |
| `ConcurrentCamera.setCompositionSettings(settingsList)` | `Unit` | — | Dynamically updates composition (position/size/layering) at runtime; throws if not in composition mode or list size mismatches bound cameras. |
| `CompositionSettings.Builder.setAlpha(alpha: Float)` | `Builder` | `1.0f` | Blend alpha, `[0, 1]`. |
| `CompositionSettings.Builder.setOffset(offsetX, offsetY: Float)` | `Builder` | `(0.0f, 0.0f)` | Position offset, `[-1, 1]` each axis. |
| `CompositionSettings.Builder.setScale(scaleX, scaleY: Float)` | `Builder` | `(1.0f, 1.0f)` | Width/height scale. |
| `CompositionSettings.Builder.setRoundedCornerRatio(ratio: Float)` | `Builder` | `0.0f` | Corner rounding, `[0, 1]`. |
| `CompositionSettings.Builder.setBorderWidthRatio(ratio: Float)` | `Builder` | `0.0f` | Border width, `[0, 1]`. |
| `CompositionSettings.Builder.setBorderColor(color: Int)` | `Builder` | `Color.WHITE` | Border color. |
| `CompositionSettings.Builder.setZOrder(zOrder: Int)` | `Builder` | `0` | Stacking order among composited streams. |

## Notes

- This is Android CameraX (Kotlin, `androidx.camera`) — distinct from the same-named AVFoundation / Three.js / Blender API.
- Dual concurrent camera supports at most 2 `UseCase`s per camera and a maximum resolution of 720p or 1440p, depending on device.
- Check `ProcessCameraProvider.getAvailableConcurrentCameraInfos()` first to discover which camera combinations support concurrent streaming (commonly one front + one back camera).
- Since CameraX 1.5.0-alpha01, passing `CompositionSettings` to `SingleCameraConfig` lets CameraX handle composing the streams automatically instead of the app compositing manually.
- Artifact: `androidx.camera:camera-core`.

## Related

- [CameraSelector](../camerax-usecases/camera-selector.md)
- [ProcessCameraProvider](../camerax-usecases/process-camera-provider.md)
