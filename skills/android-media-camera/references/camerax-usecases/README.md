# camerax-usecases

| Name | Description | Path |
|------|-------------|------|
| Camera permissions | CAMERA/RECORD_AUDIO manifest declarations for CameraX. | [camera-permissions.md](./camera-permissions.md) |
| CameraController | Simplified high-level API bundling common use cases and gestures. | [camera-controller.md](./camera-controller.md) |
| CameraEffect | Injecting a custom GPU effect into the CameraX pipeline. | [camera-effect.md](./camera-effect.md) |
| Compose viewfinder | Displaying camera preview in Jetpack Compose via CameraXViewfinder or AndroidView. | [camera-compose-viewfinder.md](./camera-compose-viewfinder.md) |
| CameraSelector | Requirements/priorities for selecting which camera to use. | [camera-selector.md](./camera-selector.md) |
| ImageAnalysis | Use case providing CPU-accessible frames for analysis/ML. | [image-analysis.md](./image-analysis.md) |
| ImageCapture | Use case for taking photos to memory, file, or MediaStore. | [image-capture.md](./image-capture.md) |
| MlKitAnalyzer | An `ImageAnalysis.Analyzer` implementation that runs ML Kit `Detector`s on each frame. | [mlkit-analyzer.md](./mlkit-analyzer.md) |
| Orientation and rotation | Mapping display/sensor rotation to correctly-oriented output. | [orientation-rotation.md](./orientation-rotation.md) |
| Preview | Use case streaming camera frames to a surface for display. | [preview.md](./preview.md) |
| PreviewView | View that renders the Preview stream with scaling/rotation handling. | [preview-view.md](./preview-view.md) |
| ProcessCameraProvider | Singleton entry point binding use cases to a LifecycleOwner. | [process-camera-provider.md](./process-camera-provider.md) |
| Recording / PendingRecording | Configuring and controlling an active video recording. | [recording.md](./recording.md) |
| Transform output | How to apply output transformation and map coordinates between use cases. | [transform-output.md](./transform-output.md) |
| UseCaseGroup and ViewPort | Binding multiple use cases with a shared crop rect. | [use-case-group-viewport.md](./use-case-group-viewport.md) |
| VideoCapture | Use case + Recorder for recording video/audio. | [video-capture.md](./video-capture.md) |
| Zero-Shutter Lag (ZSL) | Experimental capture mode that minimizes shutter latency by buffering and reprocessing. | [zero-shutter-lag.md](./zero-shutter-lag.md) |
