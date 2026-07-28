# CameraController / LifecycleCameraController

A high-level, simplified alternative to manual `ProcessCameraProvider` + `UseCase` wiring. Handles camera initialization, use case configuration, device-rotation sensing, tap-to-focus, and pinch-to-zoom in a single class. `LifecycleCameraController` additionally binds to a `LifecycleOwner`. Must be used together with a `PreviewView` (its layout drives the crop rect for WYSIWYG output).

## Signature / Usage

```kotlin
val cameraController = LifecycleCameraController(baseContext)
cameraController.bindToLifecycle(this)
cameraController.cameraSelector = CameraSelector.DEFAULT_BACK_CAMERA
previewView.controller = cameraController
```

```kotlin
class LifecycleCameraController(context: Context) : CameraController {
    fun bindToLifecycle(lifecycleOwner: LifecycleOwner)
    fun unbind()
}

// CameraController (abstract base)
fun setEnabledUseCases(enabledUseCases: Int)   // bitmask of IMAGE_CAPTURE, IMAGE_ANALYSIS, VIDEO_CAPTURE
var cameraSelector: CameraSelector

fun takePicture(executor: Executor, callback: ImageCapture.OnImageCapturedCallback)
fun takePicture(outputFileOptions: ImageCapture.OutputFileOptions, executor: Executor, callback: ImageCapture.OnImageSavedCallback)

fun setImageAnalysisAnalyzer(executor: Executor, analyzer: ImageAnalysis.Analyzer)
fun clearImageAnalysisAnalyzer()

fun startRecording(
    outputOptions: MediaStoreOutputOptions,
    audioConfig: AudioConfig,
    executor: Executor,
    listener: Consumer<VideoRecordEvent>
): Recording
fun isRecording(): Boolean

fun setPinchToZoomEnabled(enabled: Boolean)
fun setTapToFocusEnabled(enabled: Boolean)
fun setLinearZoom(value: Float)
fun setZoomRatio(ratio: Float)
fun enableTorch(torchOn: Boolean)
val torchState: LiveData<Int>

val initializationFuture: ListenableFuture<Void>
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `enabledUseCases` | `Int` bitmask | `IMAGE_CAPTURE \| IMAGE_ANALYSIS` (via `Preview`, `ImageCapture`, `ImageAnalysis` default set) | Combination of `CameraController.IMAGE_CAPTURE` (1), `IMAGE_ANALYSIS` (1 shl 1), `VIDEO_CAPTURE` (1 shl 2). |
| `cameraSelector` | `CameraSelector` | back camera | Which camera to use. |
| `pinchToZoomEnabled` | `Boolean` | `true` | Enables pinch-to-zoom gesture on the bound `PreviewView`. |
| `tapToFocusEnabled` | `Boolean` | `true` | Enables tap-to-focus gesture on the bound `PreviewView`. |
| `startRecording` overloads also accept | `FileOutputOptions`, `FileDescriptorOutputOptions` | — | Same trio of output destinations as `Recorder`/`PendingRecording`. |

## Notes

- `previewView.controller = cameraController` is required — `CameraController` does not work without a bound `PreviewView`.
- Default use cases are `Preview`, `ImageCapture`, and `ImageAnalysis`; enable `VIDEO_CAPTURE` explicitly via `setEnabledUseCases`.
- `initializationFuture` completes once camera initialization succeeds/fails; wait on it before calling controller methods that need camera info (e.g. zoom ranges).
- Artifact: `androidx.camera:camera-view`.

## Related

- [ProcessCameraProvider](./process-camera-provider.md)
- [PreviewView](./preview-view.md)
- [ImageCapture](./image-capture.md)
- [VideoCapture](./video-capture.md)
