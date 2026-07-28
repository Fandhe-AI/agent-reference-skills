# CameraEffect

Injects a custom GPU effect (e.g. a portrait effect) into the CameraX pipeline for one or more targeted use cases, by supplying a `SurfaceProcessor` implementation.

## Signature / Usage

```kotlin
// With ProcessCameraProvider: attach via UseCaseGroup
val useCaseGroup = UseCaseGroup.Builder()
    .addUseCase(preview)
    .addEffect(myCameraEffect)
    .build()
cameraProvider.bindToLifecycle(lifecycleOwner, cameraSelector, useCaseGroup)

// With CameraController
cameraController.setEffects(setOf(myCameraEffect))
```

```kotlin
class CameraEffect(
    targets: Int,             // combination of PREVIEW, VIDEO_CAPTURE, IMAGE_CAPTURE
    surfaceProcessor: SurfaceProcessor
)
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `targets` | `Int` bitmask | — | Which use cases the effect applies to: `CameraEffect.PREVIEW`, `VIDEO_CAPTURE`, `IMAGE_CAPTURE` (combinable). |
| `surfaceProcessor` | `SurfaceProcessor` | — | GPU implementation (OpenGL/Vulkan recommended) that processes each frame's `Surface`. |

## Notes

- For `Preview`/`VideoCapture`, process each frame within ~30 ms (30 fps input) to avoid frame drops.
- A separate `CameraEffect` constructor exists for still-image processing (`IMAGE_CAPTURE` target), where higher per-frame latency is acceptable.
- With `ProcessCameraProvider`, register effects via `UseCaseGroup.Builder.addEffect()`; with `CameraController`, pass effects to `setEffects()`.
- Artifact: `androidx.camera:camera-core`.

## Related

- [UseCaseGroup and ViewPort](./use-case-group-viewport.md)
- [CameraController](./camera-controller.md)
