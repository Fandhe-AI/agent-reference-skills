# Migrate Camera1 to CameraX

Guide for migrating from the deprecated `android.hardware.Camera` ("Camera1") API to CameraX, with side-by-side scenarios (camera selection, preview, tap-to-focus, pinch-to-zoom, photo, video) using either `CameraController` or `CameraProvider`.

## Signature / Usage

```kotlin
// CameraX: set up a camera preview with a CameraController.

class MainActivity : AppCompatActivity() {
    private lateinit var viewBinding: ActivityMainBinding

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        viewBinding = ActivityMainBinding.inflate(layoutInflater)
        setContentView(viewBinding.root)

        // Create the CameraController and set it on the previewView.
        var cameraController = LifecycleCameraController(baseContext)
        cameraController.bindToLifecycle(this)
        val previewView: PreviewView = viewBinding.cameraPreview
        previewView.controller = cameraController
    }
}
```

```kotlin
// CameraX: pinch-to-zoom with CameraProvider
val scaleGestureDetector = ScaleGestureDetector(context,
    object : SimpleOnGestureListener() {
        override fun onScale(detector: ScaleGestureDetector): Boolean {
            val camera = camera ?: return
            val zoomState = camera.cameraInfo.zoomState
            val currentZoomRatio: Float = zoomState.value?.zoomRatio ?: 1f
            camera.cameraControl.setZoomRatio(
                detector.scaleFactor * currentZoomRatio
            )
        }
    }
)
```

```kotlin
// CameraX: create and bind a VideoCapture UseCase with CameraProvider.
val recorder = Recorder.Builder()
    .setQualitySelector(QualitySelector.from(Quality.FHD))
    .build()
videoCapture = VideoCapture.withOutput(recorder)

var camera = cameraProvider.bindToLifecycle(
    this, cameraSelector, preview, videoCapture)
```

## Options / Props

| Scenario | Camera1 | CameraX CameraController | CameraX CameraProvider |
|----------|---------|--------------------------|------------------------|
| Selecting a camera | `Camera.open(id)` | `CameraSelector` set on `cameraController.cameraSelector` | `CameraSelector.DEFAULT_FRONT_CAMERA` / `DEFAULT_BACK_CAMERA` passed to `bindToLifecycle()`; `getAvailableCameraInfos()` + `Camera2CameraInfo` for custom choice |
| Preview | custom `SurfaceView` + `SurfaceHolder.Callback` | `previewView.controller = cameraController` (Preview implied) | `Preview.Builder().build()` + `setSurfaceProvider()` |
| Tap-to-focus | `Camera.Area` + `setFocusAreas()` + `autoFocus()` | automatic; `setTapToFocusEnabled()` / `isTapToFocusEnabled()` / `getTapToFocusState()` | `MeteringPointFactory.createPoint()` -> `FocusMeteringAction` -> `cameraControl.startFocusAndMetering()` |
| Pinch-to-zoom | `Camera.Parameters.setZoom()` / `startSmoothZoom()` | automatic; `setPinchToZoomEnabled()` / `isPinchToZoomEnabled()` / `getZoomState()` | `ScaleGestureDetector` + `CameraControl.setZoomRatio()` |
| Photo | `Camera.takePicture()` + `PictureCallback` | `cameraController.takePicture(outputOptions, executor, OnImageSavedCallback)` | create/bind `ImageCapture`, then `imageCapture.takePicture(...)` |
| Video | `MediaRecorder` + `Camera.unlock()/lock()` in strict order | `setEnabledUseCases(VIDEO_CAPTURE)`, `startRecording()` / `stopRecording()` (before 1.3.0-alpha02; from 1.3.0-alpha02, use `stop()` on the `Recording` returned by `startRecording()`) | `Recorder.Builder` + `VideoCapture.withOutput(recorder)`, `prepareRecording().withAudioEnabled().start(...)` |

## Notes

- Camera1 (`Camera`) has been deprecated since Android 5.0 (API level 21). Android offers CameraX (Jetpack) and Camera2 (low-level framework API); the guide recommends CameraX for most cases.
- CameraX supports Android 5.0 (API level 21) and higher (the page states over 98% of existing devices) and is tested on over 150 physical devices in the CameraX Test Lab.
- CameraX has four use cases: `Preview`, `ImageCapture`, `VideoCapture`, `ImageAnalysis`. A shared `ViewPort` ensures all active use cases see the same pixels. Lifecycle, rotation, and scaling are handled automatically.
- `PreviewView` has `TextureView` and `SurfaceView` implementations; `PreviewView.ImplementationMode.COMPATIBLE` uses `TextureView`, `PERFORMANCE` uses `SurfaceView` (when possible).
- CameraX drives the camera stack on an `Executor` (default internal one, or set your own) and calls blocking platform APIs only from background threads. A camera limiter (e.g. `DEFAULT_BACK_CAMERA`) lets CameraX skip initializing unneeded cameras to cut setup latency on low-end devices.
- `CameraController` requires `PreviewView`; `CameraProvider` allows a custom `Surface` / `SurfaceProvider`.
- Coroutines: methods returning `ListenableFuture` can be awaited via `androidx.concurrent:concurrent-futures-ktx:1.1.0` (`await()`).
- CameraX 1.3.0-alpha02 or later: `startRecording()` on `CameraController` takes an additional `AudioConfig` parameter (microphone permission needed for audio), `stopRecording()` is removed, and `startRecording()` returns a `Recording` for pause / resume / stop.
- The source snippets are illustrative and contain inconsistencies (e.g. undefined `useCases`, `meteringPoint` vs `focusPoint`); treat them as sketches, not compilable code.

## Related

- [CameraX architecture](./camerax-architecture.md)
- [CameraController / LifecycleCameraController](./camera-controller.md)
- [ProcessCameraProvider](./process-camera-provider.md)
- [PreviewView](./preview-view.md)
- [ImageCapture](./image-capture.md)
- [VideoCapture](./video-capture.md)
