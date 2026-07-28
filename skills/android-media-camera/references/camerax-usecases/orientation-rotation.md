# Orientation and rotation

How CameraX maps device display rotation, target rotation, and camera sensor orientation to correctly-oriented output for `Preview`, `ImageCapture`, `ImageAnalysis`, and `VideoCapture`.

## Signature / Usage

```kotlin
val imageCapture = ImageCapture.Builder()
    .setTargetRotation(Surface.ROTATION_0)
    .build()

// update dynamically on rotation change
imageCapture.targetRotation = Surface.ROTATION_90
imageAnalysis.targetRotation = Surface.ROTATION_90
preview.targetRotation = Surface.ROTATION_90
```

```kotlin
val orientationEventListener = object : OrientationEventListener(context) {
    override fun onOrientationChanged(orientation: Int) {
        if (orientation == ORIENTATION_UNKNOWN) return
        val rotation = when (orientation) {
            in 45 until 135 -> Surface.ROTATION_270
            in 135 until 225 -> Surface.ROTATION_180
            in 225 until 315 -> Surface.ROTATION_90
            else -> Surface.ROTATION_0
        }
        imageAnalysis.targetRotation = rotation
        imageCapture.targetRotation = rotation
    }
}
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `targetRotation` | `Int` | current display rotation | `Surface.ROTATION_0/90/180/270`; the degrees to rotate the device clockwise to reach natural orientation. Settable on `Preview`, `ImageCapture`, `ImageAnalysis`, `VideoCapture`. |
| Image rotation formula | — | — | `(Sensor orientation − Target rotation + 360) % 360`; `ImageProxy.imageInfo.rotationDegrees` reports the clockwise rotation needed. |

## Notes

- `Preview` output rotates automatically via `PreviewView`/`transformationInfo` once `targetRotation` is set; no extra buffer rotation needed by the app.
- `ImageCapture` stores rotation in EXIF metadata (read via `Exif.createFromFile`/`createFromInputStream`); no in-memory buffer rotation is applied.
- `ImageAnalysis` reports rotation via `imageProxy.imageInfo.rotationDegrees`; the app must apply it when processing.
- Use `OrientationEventListener` (fine-grained, all orientations) or `DisplayManager.DisplayListener` (coarse, catches 180° flips) to keep `targetRotation` updated when the activity orientation is locked or overrides config changes.
- For `fullSensor` activities, use cases are recreated on `onCreate()` per rotation and don't need dynamic updates.
- For coordinate mapping between `ImageAnalysis` frames and `PreviewView` (e.g. drawing detection boxes), build a `Matrix` from `imageProxy.cropRect` and `rotationDegrees` via `Matrix.setPolyToPoly`.

## Related

- [Preview](./preview.md)
- [ImageCapture](./image-capture.md)
- [ImageAnalysis](./image-analysis.md)
- [UseCaseGroup and ViewPort](./use-case-group-viewport.md)
