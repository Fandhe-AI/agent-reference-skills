# MlKitAnalyzer

An `ImageAnalysis.Analyzer` implementation that runs one or more ML Kit `Detector`s (barcode scanning, face detection, pose detection, etc.) against each frame and optionally converts the results' coordinates into `PreviewView` display space automatically.

## Signature / Usage

```kotlin
val options = BarcodeScannerOptions.Builder()
    .setBarcodeFormats(Barcode.FORMAT_QR_CODE)
    .build()
val barcodeScanner = BarcodeScanning.getClient(options)

cameraController.setImageAnalysisAnalyzer(
    ContextCompat.getMainExecutor(context),
    MlKitAnalyzer(
        listOf(barcodeScanner),
        COORDINATE_SYSTEM_VIEW_REFERENCED,
        ContextCompat.getMainExecutor(context)
    ) { result: MlKitAnalyzer.Result? ->
        val barcodes = result?.getValue(barcodeScanner)
        // coordinates in barcodes are already mapped to previewView's coordinate space
    }
)
```

```kotlin
class MlKitAnalyzer(
    detectors: List<Detector<*>>,
    targetCoordinateSystem: Int,
    executor: Executor,
    consumer: Consumer<MlKitAnalyzer.Result>
) : ImageAnalysis.Analyzer

class Result {
    fun <T> getValue(detector: Detector<T>): T?
    fun getTransformationMatrix(detector: Detector<*>): Matrix
    fun getThrowable(detector: Detector<*>): Throwable?
}
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `detectors` | `List<Detector<*>>` | — | ML Kit detectors (e.g. `BarcodeScanner`, `FaceDetector`) invoked sequentially on each frame. |
| `targetCoordinateSystem` | `Int` | — | `COORDINATE_SYSTEM_ORIGINAL` (raw `ImageAnalysis` buffer coordinates) or `COORDINATE_SYSTEM_VIEW_REFERENCED` (auto-mapped to the bound `PreviewView`'s coordinates; requires use with `CameraController`). |
| `executor` | `Executor` | — | Executor the `consumer` callback is invoked on. |
| `consumer` | `Consumer<MlKitAnalyzer.Result>` | — | Receives a `Result` per analyzed frame. |

## Notes

- Set via `CameraController.setImageAnalysisAnalyzer()`; `COORDINATE_SYSTEM_VIEW_REFERENCED` only auto-transforms coordinates when used through `CameraController`, since it owns the `PreviewView` binding. With a plain `ImageAnalysis` use case, coordinates stay in `COORDINATE_SYSTEM_ORIGINAL` and must be mapped manually (see Transform output).
- `Result.getTransformationMatrix(detector)` exposes the `Matrix` used for the mapping if manual adjustment is needed.
- Detectors run in list order on the same thread; a slow detector delays the rest.
- Artifact: `androidx.camera:camera-mlkit-vision`.

## Related

- [Transform output](./transform-output.md)
- [ImageAnalysis](./image-analysis.md)
- [CameraController](./camera-controller.md)
