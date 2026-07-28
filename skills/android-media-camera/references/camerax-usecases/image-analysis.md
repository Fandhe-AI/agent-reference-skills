# ImageAnalysis

A use case providing CPU-accessible camera frames for analysis, computer vision, or ML inference, delivered to an `Analyzer` implementation.

## Signature / Usage

```kotlin
val imageAnalysis = ImageAnalysis.Builder()
    .setBackpressureStrategy(ImageAnalysis.STRATEGY_KEEP_ONLY_LATEST)
    .build()

imageAnalysis.setAnalyzer(executor) { imageProxy ->
    val rotationDegrees = imageProxy.imageInfo.rotationDegrees
    // ... analyze imageProxy.planes ...
    imageProxy.close()
}

cameraProvider.bindToLifecycle(lifecycleOwner, cameraSelector, imageAnalysis, preview)

// stop later
imageAnalysis.clearAnalyzer()
```

```kotlin
class Builder {
    fun setBackpressureStrategy(strategy: Int): Builder
    fun setImageQueueDepth(depth: Int): Builder
    fun setOutputImageFormat(format: Int): Builder
    fun setTargetRotation(rotation: Int): Builder
    fun setResolutionSelector(resolutionSelector: ResolutionSelector): Builder
    fun build(): ImageAnalysis
}

fun setAnalyzer(executor: Executor, analyzer: Analyzer)
fun clearAnalyzer()

fun interface Analyzer {
    fun analyze(image: ImageProxy)
}
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `backpressureStrategy` | `Int` | `STRATEGY_KEEP_ONLY_LATEST` | `STRATEGY_KEEP_ONLY_LATEST` (0, non-blocking, single-slot buffer overwritten by new frames); `STRATEGY_BLOCK_PRODUCER` (1, blocks the whole pipeline, including other use cases, when the queue is full). |
| `imageQueueDepth` | `Int` | — | Buffer depth used with `STRATEGY_BLOCK_PRODUCER`. |
| `outputImageFormat` | `Int` | `OUTPUT_IMAGE_FORMAT_YUV_420_888` | `OUTPUT_IMAGE_FORMAT_YUV_420_888` (1), `RGBA_8888` (2), `NV21` (3), `PRIVATE` (4, GPU-accessible `HardwareBuffer`). |
| `targetRotation` | `Int` | display rotation | `Surface.ROTATION_*`, also runtime-updatable via `imageAnalysis.targetRotation`. |
| `resolutionSelector` | `ResolutionSelector` | — | Preferred resolution/aspect-ratio configuration. |

## Notes

- Only one `Analyzer` can be active at a time; a later `setAnalyzer` call replaces the previous one.
- `imageProxy.close()` must always be called or the pipeline stalls / frames are dropped; do not call `Image.close()` directly on the wrapped `Media.Image`.
- For ML Kit integration, see the `ML Kit Analyzer` guide (`/training/camerax/mlkitanalyzer`) — not covered in this skill.
- Artifact: `androidx.camera:camera-core`.

## Related

- [ImageCapture](./image-capture.md)
- [Orientation and rotation](./orientation-rotation.md)
