# ProcessCameraProvider

Singleton used to bind the lifecycle of cameras to a `LifecycleOwner` within the app process. It is the main entry point for CameraX.

## Signature / Usage

```kotlin
val cameraProviderFuture = ProcessCameraProvider.getInstance(this)
cameraProviderFuture.addListener({
    val cameraProvider = cameraProviderFuture.get()
    val camera = cameraProvider.bindToLifecycle(
        this as LifecycleOwner,
        CameraSelector.DEFAULT_BACK_CAMERA,
        preview,
        imageCapture
    )
}, ContextCompat.getMainExecutor(this))
```

```kotlin
// Kotlin coroutine entry point (androidx.camera:camera-lifecycle 1.4.0+)
lifecycleScope.launch {
    val cameraProvider = ProcessCameraProvider.awaitInstance(context)
    cameraProvider.bindToLifecycle(
        this@MainActivity,
        CameraSelector.DEFAULT_BACK_CAMERA,
        preview,
        imageCapture
    )
}
```

```kotlin
fun getInstance(context: Context): ListenableFuture<ProcessCameraProvider>

suspend fun ProcessCameraProvider.Companion.awaitInstance(context: Context): ProcessCameraProvider

fun bindToLifecycle(
    lifecycleOwner: LifecycleOwner,
    cameraSelector: CameraSelector,
    vararg useCases: UseCase?
): Camera

fun bindToLifecycle(
    lifecycleOwner: LifecycleOwner,
    cameraSelector: CameraSelector,
    useCaseGroup: UseCaseGroup
): Camera

fun unbind(vararg useCases: UseCase?)
fun unbindAll()

fun hasCamera(cameraSelector: CameraSelector): Boolean
val availableCameraInfos: List<CameraInfo>
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `lifecycleOwner` | `LifecycleOwner` | — | Activity/Fragment whose lifecycle drives camera open/close. |
| `cameraSelector` | `CameraSelector` | — | Which camera to bind (e.g. `DEFAULT_BACK_CAMERA`). |
| `useCases` | `vararg UseCase?` | — | Up to one instance each of `Preview`, `ImageCapture`, `ImageAnalysis`, `VideoCapture`. |
| `useCaseGroup` | `UseCaseGroup` | — | Alternative overload for grouped use cases sharing a `ViewPort`. |

## Notes

- `awaitInstance(context)` is a suspend extension on `ProcessCameraProvider.Companion` (`androidx.camera:camera-lifecycle` 1.4.0+) that wraps `getInstance(context).await()`; prefer it over the `ListenableFuture`/`addListener` pattern in Kotlin coroutine code.
- Camera opens automatically when the lifecycle reaches `RESUMED` and closes on other transitions; no manual `onResume()`/`onPause()` calls needed.
- Only one instance each of `Preview`, `VideoCapture`, `ImageAnalysis`, `ImageCapture` can be bound concurrently.
- Call `unbindAll()` when the view and camera use cases have decoupled lifecycle owners (custom lifecycle, retained fragments).
- Artifact: `androidx.camera:camera-lifecycle`.

## Related

- [CameraSelector](./camera-selector.md)
- [UseCaseGroup and ViewPort](./use-case-group-viewport.md)
- [CameraController](./camera-controller.md)
