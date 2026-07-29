# Transform output

Every CameraX use case delivers output as a buffer plus separate transformation info (crop rect and rotation). How to apply that transformation — and how to map coordinates detected in one use case's buffer (e.g. `ImageAnalysis`) onto another use case's display surface (e.g. `PreviewView`) — depends on the use case and the buffer format.

## Signature / Usage

```kotlin
// Preview: transformation info arrives via a listener on the SurfaceRequest
preview.setSurfaceProvider { surfaceRequest ->
    surfaceRequest.setTransformationInfoListener(
        ContextCompat.getMainExecutor(context)
    ) { transformationInfo: SurfaceRequest.TransformationInfo ->
        val cropRect = transformationInfo.cropRect
        val rotationDegrees = transformationInfo.rotationDegrees
        // apply to a custom Surface/TextureView; PreviewView does this automatically
    }
}
```

```kotlin
// ImageAnalysis -> PreviewView: map detection coordinates (e.g. a face box) for overlay drawing
fun getCorrectionMatrix(imageProxy: ImageProxy, previewView: PreviewView): Matrix {
    val cropRect = imageProxy.cropRect
    val rotationDegrees = imageProxy.imageInfo.rotationDegrees
    val matrix = Matrix()

    val source = floatArrayOf(
        cropRect.left.toFloat(), cropRect.top.toFloat(),
        cropRect.right.toFloat(), cropRect.top.toFloat(),
        cropRect.right.toFloat(), cropRect.bottom.toFloat(),
        cropRect.left.toFloat(), cropRect.bottom.toFloat()
    )
    val destination = floatArrayOf(
        0f, 0f,
        previewView.width.toFloat(), 0f,
        previewView.width.toFloat(), previewView.height.toFloat(),
        0f, previewView.height.toFloat()
    )

    // Rotate destination vertices to account for the sensor/target rotation offset
    val vertexSize = 2
    val shiftOffset = rotationDegrees / 90 * vertexSize
    val tempArray = destination.clone()
    for (toIndex in source.indices) {
        val fromIndex = (toIndex + shiftOffset) % source.size
        destination[toIndex] = tempArray[fromIndex]
    }

    matrix.setPolyToPoly(source, 0, destination, 0, 4)
    return matrix
}

// apply it to a detected point
val point = floatArrayOf(x, y)
matrix.mapPoints(point)
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `SurfaceRequest.TransformationInfo.cropRect` | `Rect` | — | Region of the `Preview` buffer that should actually be shown; matches the `ViewPort` crop when one is set. |
| `SurfaceRequest.TransformationInfo.rotationDegrees` | `Int` | — | Clockwise rotation to apply to the buffer for correct display orientation. |
| `ImageProxy.cropRect` | `Rect` | full buffer | Region of the `ImageAnalysis` buffer to use; source rectangle for `Matrix.setPolyToPoly`. |

## Notes

- `ImageCapture` needs no manual work: the crop rect is applied before the file is saved and rotation is written to Exif metadata.
- `Preview`: use `PreviewView` to get transformation handled automatically. For a custom `Surface`/`TextureView`/OpenGL pipeline, register `SurfaceRequest.setTransformationInfoListener()` and apply `cropRect`/`rotationDegrees` yourself.
- `ImageAnalysis`: no automatic mapping is provided. Build a `Matrix` from `imageProxy.cropRect` and `imageProxy.imageInfo.rotationDegrees` via `Matrix.setPolyToPoly`, then call `matrix.mapPoints(...)` on detected coordinates to convert them into `PreviewView` display coordinates — the standard pattern for drawing face/object detection boxes over the preview.
- For ML Kit specifically, `MlKitAnalyzer` performs this coordinate mapping automatically when `targetCoordinateSystem` is set to `COORDINATE_SYSTEM_VIEW_REFERENCED`; see MlKitAnalyzer.
- Artifact: `androidx.camera:camera-core` (`androidx.camera:camera-view` for `PreviewView`).

## Related

- [Orientation and rotation](./orientation-rotation.md)
- [MlKitAnalyzer](./mlkit-analyzer.md)
- [PreviewView](./preview-view.md)
- [ImageAnalysis](./image-analysis.md)
