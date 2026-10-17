# camerax-usecases

| Name | Description | Path |
|------|-------------|------|
| Compose viewfinder | Displaying the CameraX preview in Jetpack Compose, either via the dedicated `CameraXViewfinder` composable or by wrapping `PreviewView` with `AndroidView`. | [camera-compose-viewfinder.md](./camera-compose-viewfinder.md) |
| CameraController / LifecycleCameraController | A high-level, simplified alternative to manual `ProcessCameraProvider` + `UseCase` wiring. | [camera-controller.md](./camera-controller.md) |
| CameraEffect | Injects a custom GPU effect (e.g. a portrait effect) into the CameraX pipeline for one or more targeted use cases, by supplying a `SurfaceProcessor` implementation. | [camera-effect.md](./camera-effect.md) |
| Camera permissions | Manifest declarations and the runtime permissions required before binding CameraX use cases: `CAMERA` for any capture, `RECORD_AUDIO` for `VideoCapture` recordings with audio enabled. | [camera-permissions.md](./camera-permissions.md) |
| CameraSelector | A set of requirements and priorities used to select a camera, or to filter a set of cameras. | [camera-selector.md](./camera-selector.md) |
| Migrate Camera1 to CameraX | Guide for migrating from the deprecated `android.hardware.Camera` ("Camera1") API to CameraX, with side-by-side scenarios (camera selection, preview, tap-to-focus, pinch-to-zoom, photo, video) using either `CameraController` or `CameraProvider`. | [camera1-to-camerax.md](./camera1-to-camerax.md) |
| CameraX architecture | Overview of CameraX structure (use cases), the API model (CameraController vs CameraProvider), lifecycle binding, concurrent use cases, requirements, dependency declaration, and Camera2 interop. | [camerax-architecture.md](./camerax-architecture.md) |
| ImageAnalysis | A use case providing CPU-accessible camera frames for analysis, computer vision, or ML inference, delivered to an `Analyzer` implementation. | [image-analysis.md](./image-analysis.md) |
| ImageCapture | A use case for taking a picture, either saved to a file/MediaStore or delivered in memory for immediate processing. | [image-capture.md](./image-capture.md) |
| MlKitAnalyzer | An `ImageAnalysis.Analyzer` implementation that runs one or more ML Kit `Detector`s (barcode scanning, face detection, pose detection, etc.) against each frame and optionally converts the results' coordinates into `PreviewView` display space automatically. | [mlkit-analyzer.md](./mlkit-analyzer.md) |
| Orientation and rotation | How CameraX maps device display rotation, target rotation, and camera sensor orientation to correctly-oriented output for `Preview`, `ImageCapture`, `ImageAnalysis`, and `VideoCapture`. | [orientation-rotation.md](./orientation-rotation.md) |
| PreviewView | A `View` that displays the camera feed for `Preview`, handling cropping, scaling, and rotation of the output automatically. | [preview-view.md](./preview-view.md) |
| Preview | A use case that provides a camera preview stream for displaying on-screen. | [preview.md](./preview.md) |
| ProcessCameraProvider | Singleton used to bind the lifecycle of cameras to a `LifecycleOwner` within the app process. It is the main entry point for CameraX. | [process-camera-provider.md](./process-camera-provider.md) |
| Recording / PendingRecording | `PendingRecording` configures a recording before it starts (transient, not cached); calling `start()` returns an active `Recording` that can be paused, resumed, muted, or stopped. Status is reported via `VideoRecordEvent`. | [recording.md](./recording.md) |
| Transform output | Every CameraX use case delivers output as a buffer plus separate transformation info (crop rect and rotation). | [transform-output.md](./transform-output.md) |
| UseCaseGroup and ViewPort | Bind multiple use cases together so CameraX guarantees their crop rects all point at the same area of the camera sensor (WYSIWYG output matching the preview). | [use-case-group-viewport.md](./use-case-group-viewport.md) |
| VideoCapture | A use case that provides a camera stream suitable for video recording. Paired with a `VideoOutput` implementation (typically `Recorder`) via the `withOutput()` factory. | [video-capture.md](./video-capture.md) |
| Zero-Shutter Lag (ZSL) | An experimental `ImageCapture` capture mode (`CAPTURE_MODE_ZERO_SHUTTER_LAG`) that minimizes shutter latency by continuously buffering recent frames and reprocessing the one closest to the moment `takePicture()` was called, instead of capturing a fresh frame on demand. | [zero-shutter-lag.md](./zero-shutter-lag.md) |
