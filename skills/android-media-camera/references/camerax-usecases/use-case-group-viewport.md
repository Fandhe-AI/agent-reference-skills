# UseCaseGroup and ViewPort

Bind multiple use cases together so CameraX guarantees their crop rects all point at the same area of the camera sensor (WYSIWYG output matching the preview).

## Signature / Usage

```kotlin
val viewPort = ViewPort.Builder(Rational(width, height), display.rotation).build()

val useCaseGroup = UseCaseGroup.Builder()
    .addUseCase(preview)
    .addUseCase(imageAnalysis)
    .addUseCase(imageCapture)
    .setViewPort(viewPort)
    .build()

cameraProvider.bindToLifecycle(lifecycleOwner, cameraSelector, useCaseGroup)
```

```kotlin
// Or reuse the ViewPort already computed by PreviewView
val viewPort = previewView.viewPort
```

```kotlin
class ViewPort.Builder(aspectRatio: Rational, rotation: Int) {
    fun build(): ViewPort
}

class UseCaseGroup.Builder {
    fun addUseCase(useCase: UseCase): Builder
    fun addEffect(effect: CameraEffect): Builder
    fun setViewPort(viewPort: ViewPort): Builder
    fun build(): UseCaseGroup
}
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `aspectRatio` | `Rational` | — | Desired viewport aspect ratio, e.g. `Rational(width, height)`. |
| `rotation` | `Int` | — | `Surface.ROTATION_*` value, typically `display.rotation`. |
| `useCases` | `UseCase` (repeatable `addUseCase`) | — | Use cases sharing the same crop rect. |
| `effects` | `CameraEffect` (repeatable `addEffect`) | — | Effects applied across the group; see `CameraEffect`. |
| `viewPort` | `ViewPort` | full buffer rect | When unset, each use case's crop rect defaults to its full buffer. |

## Notes

- CameraX computes the largest crop rect satisfying the viewport across all attached use cases.
- The simplest way to obtain a matching `ViewPort` is `previewView.viewPort`, which reflects the `PreviewView`'s current layout.
- With default `FILL_CENTER` scale type, all bound use cases' output then matches what `PreviewView` displays.
- Artifact: `androidx.camera:camera-core`.

## Related

- [Preview](./preview.md)
- [PreviewView](./preview-view.md)
- [CameraEffect](./camera-effect.md)
- [Output transformation](./orientation-rotation.md)
