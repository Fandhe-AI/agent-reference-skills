# ImageCapture

A use case for taking a picture, either saved to a file/MediaStore or delivered in memory for immediate processing.

## Signature / Usage

```kotlin
val imageCapture = ImageCapture.Builder()
    .setCaptureMode(ImageCapture.CAPTURE_MODE_MINIMIZE_LATENCY)
    .setTargetRotation(view.display.rotation)
    .build()

cameraProvider.bindToLifecycle(lifecycleOwner, cameraSelector, imageCapture, preview)

val outputFileOptions = ImageCapture.OutputFileOptions.Builder(
    File(outputDirectory, "image.jpg")
).build()

imageCapture.takePicture(
    outputFileOptions,
    cameraExecutor,
    object : ImageCapture.OnImageSavedCallback {
        override fun onImageSaved(outputFileResults: ImageCapture.OutputFileResults) { /* ... */ }
        override fun onError(exception: ImageCaptureException) { /* ... */ }
    }
)
```

```kotlin
class Builder {
    fun setCaptureMode(captureMode: Int): Builder
    fun setFlashMode(flashMode: Int): Builder
    fun setTargetRotation(rotation: Int): Builder
    fun setJpegQuality(quality: Int): Builder   // 1..100
    fun setIoExecutor(executor: Executor): Builder
    fun build(): ImageCapture
}

// takePicture overloads
fun takePicture(executor: Executor, callback: OnImageCapturedCallback)
fun takePicture(outputFileOptions: OutputFileOptions, executor: Executor, callback: OnImageSavedCallback)
fun takePicture(jpegOutputFileOptions: OutputFileOptions, rawOutputFileOptions: OutputFileOptions, executor: Executor, callback: OnImageSavedCallback)
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `captureMode` | `Int` | `CAPTURE_MODE_MINIMIZE_LATENCY` | `CAPTURE_MODE_MAXIMIZE_QUALITY` (0), `CAPTURE_MODE_MINIMIZE_LATENCY` (1), `CAPTURE_MODE_ZERO_SHUTTER_LAG` (2, see Zero-Shutter Lag). |
| `flashMode` | `Int` | `FLASH_MODE_OFF` | `FLASH_MODE_AUTO` (0), `FLASH_MODE_ON` (1), `FLASH_MODE_OFF` (2), `FLASH_MODE_SCREEN` (3). |
| `targetRotation` | `Int` | display rotation | `Surface.ROTATION_*`; also updatable at runtime via `imageCapture.targetRotation`. |
| `jpegQuality` | `Int` | — | 1–100 JPEG compression quality. |
| `ioExecutor` | `Executor` | internal IO executor | Executor for file I/O during save. |
| `outputFileOptions` | `OutputFileOptions` | — | Built via `OutputFileOptions.Builder(File)`, `Builder(ContentResolver, Uri, ContentValues)`, or `Builder(OutputStream)`; `setMetadata()` attaches EXIF/location metadata. |

## Notes

- Three `takePicture` overloads: in-memory (`OnImageCapturedCallback` → `ImageProxy`), single-file save (`OnImageSavedCallback` → `OutputFileResults`), and simultaneous RAW+JPEG save (two `OutputFileOptions`).
- `OnImageCapturedCallback.onCaptureSuccess(ImageProxy)` — caller must call `image.close()`.
- For MediaStore output, use `OutputFileOptions.Builder(ContentResolver, Uri, ContentValues)`; see the `android-data` skill's `files-storage` category for MediaStore/scoped-storage details.
- Artifact: `androidx.camera:camera-core`.

## Related

- [ImageAnalysis](./image-analysis.md)
- [Orientation and rotation](./orientation-rotation.md)
- [CameraController](./camera-controller.md)
- [Zero-Shutter Lag](./zero-shutter-lag.md)
