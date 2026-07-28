# Preview

A use case that provides a camera preview stream for displaying on-screen.

## Signature / Usage

```kotlin
val preview = Preview.Builder()
    .build()
    .also {
        it.setSurfaceProvider(previewView.surfaceProvider)
    }

cameraProvider.bindToLifecycle(this as LifecycleOwner, cameraSelector, preview)
```

```kotlin
class Builder {
    fun setTargetRotation(rotation: Int): Builder
    fun setResolutionSelector(resolutionSelector: ResolutionSelector): Builder
    @Deprecated fun setTargetResolution(resolution: Size): Builder
    @Deprecated fun setTargetAspectRatio(aspectRatio: Int): Builder
    fun build(): Preview
}

fun setSurfaceProvider(surfaceProvider: SurfaceProvider?)
fun setSurfaceProvider(executor: Executor, surfaceProvider: SurfaceProvider?)
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `targetRotation` | `Int` | display rotation | `Surface.ROTATION_*` value; update dynamically via `preview.targetRotation = ...`. |
| `resolutionSelector` | `ResolutionSelector` | — | Preferred replacement for the deprecated `setTargetResolution`/`setTargetAspectRatio`. |
| `surfaceProvider` | `SurfaceProvider?` | `null` | Callback interface providing the `Surface` frames are rendered to; typically obtained from `PreviewView.getSurfaceProvider()`. |
| `executor` | `Executor` | main thread | Executor the `SurfaceProvider` callback runs on. |

## Notes

- `SurfaceProvider.onSurfaceRequested(SurfaceRequest)` is the single method of the functional interface; implement it manually only when not using `PreviewView`.
- When using `PreviewView`, you cannot separately create a `SurfaceTexture`/`TextureView`/`SurfaceView` surface and hand it to `Preview.SurfaceProvider`.
- Artifact: `androidx.camera:camera-core`.

## Related

- [PreviewView](./preview-view.md)
- [Compose viewfinder](./camera-compose-viewfinder.md)
- [Orientation and rotation](./orientation-rotation.md)
