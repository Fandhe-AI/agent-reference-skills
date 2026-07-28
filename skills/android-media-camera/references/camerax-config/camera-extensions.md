# CameraX Extensions (ExtensionsManager)

The CameraX Extensions API lets an app access device-manufacturer-implemented camera effects (Bokeh, HDR, Night, Face Retouch, Auto) on supported devices, via `ExtensionsManager` and `ExtensionMode`.

## Signature / Usage

```kotlin
val cameraProvider = ProcessCameraProvider.getInstance(context).get()
val extensionsManager = ExtensionsManager.getInstanceAsync(context, cameraProvider).get()

val baseSelector = CameraSelector.DEFAULT_BACK_CAMERA
if (extensionsManager.isExtensionAvailable(baseSelector, ExtensionMode.NIGHT)) {
    cameraProvider.unbindAll()
    val nightSelector = extensionsManager.getExtensionEnabledCameraSelector(
        baseSelector, ExtensionMode.NIGHT
    )
    cameraProvider.bindToLifecycle(lifecycleOwner, nightSelector, imageCapture, preview)
}
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `ExtensionsManager.getInstanceAsync(context, cameraProvider)` | `ListenableFuture<ExtensionsManager>` | — | Retrieves the `ExtensionsManager` asynchronously. |
| `isExtensionAvailable(cameraSelector, mode)` | `Boolean` | — | Whether the given extension mode is available for the camera(s) matched by the selector. |
| `getExtensionEnabledCameraSelector(cameraSelector, mode)` | `CameraSelector` | — | Returns a new selector that enables the given extension mode; throws if unsupported. |
| `ExtensionMode.NIGHT` / `HDR` / `AUTO` / `BOKEH` / `FACE_RETOUCH` | `Int` constants | — | Available extension modes. |

## Notes

- This is Android CameraX (Kotlin, `androidx.camera`) — distinct from the same-named AVFoundation / Three.js / Blender API.
- Extensions apply only to `Preview` and `ImageCapture` use cases, not `VideoCapture`.
- Must call `cameraProvider.unbindAll()` before switching to/from an extension-enabled selector.
- Both Camera2 and CameraX expose the same extension set; CameraX's `ExtensionsManager` is the higher-level, recommended entry point.
- CameraX Extensions support is being phased out on some devices for apps still on CameraX 1.5 or earlier starting November 1, 2026; use CameraX 1.6+.
- Artifact: `androidx.camera:camera-extensions` (requires matching versions of `camera-core`, `camera-camera2`, `camera-lifecycle`).

## Related

- [CameraSelector](../camerax-usecases/camera-selector.md)
- [ProcessCameraProvider](../camerax-usecases/process-camera-provider.md)
