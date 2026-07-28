# camerax-usecases

| Name | Description | Path |
|------|-------------|------|
| ProcessCameraProvider | Singleton entry point binding use cases to a LifecycleOwner. | [process-camera-provider.md](./process-camera-provider.md) |
| CameraSelector | Requirements/priorities for selecting which camera to use. | [camera-selector.md](./camera-selector.md) |
| Preview | Use case streaming camera frames to a surface for display. | [preview.md](./preview.md) |
| PreviewView | View that renders the Preview stream with scaling/rotation handling. | [preview-view.md](./preview-view.md) |
| Compose viewfinder | Displaying camera preview in Jetpack Compose via CameraXViewfinder or AndroidView. | [camera-compose-viewfinder.md](./camera-compose-viewfinder.md) |
| ImageCapture | Use case for taking photos to memory, file, or MediaStore. | [image-capture.md](./image-capture.md) |
| ImageAnalysis | Use case providing CPU-accessible frames for analysis/ML. | [image-analysis.md](./image-analysis.md) |
| VideoCapture | Use case + Recorder for recording video/audio. | [video-capture.md](./video-capture.md) |
| Recording / PendingRecording | Configuring and controlling an active video recording. | [recording.md](./recording.md) |
| UseCaseGroup and ViewPort | Binding multiple use cases with a shared crop rect. | [use-case-group-viewport.md](./use-case-group-viewport.md) |
| CameraController | Simplified high-level API bundling common use cases and gestures. | [camera-controller.md](./camera-controller.md) |
| CameraEffect | Injecting a custom GPU effect into the CameraX pipeline. | [camera-effect.md](./camera-effect.md) |
| Orientation and rotation | Mapping display/sensor rotation to correctly-oriented output. | [orientation-rotation.md](./orientation-rotation.md) |
| Camera permissions | CAMERA/RECORD_AUDIO manifest declarations for CameraX. | [camera-permissions.md](./camera-permissions.md) |
