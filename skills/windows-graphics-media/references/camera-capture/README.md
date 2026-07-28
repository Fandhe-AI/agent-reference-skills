# Camera and Screen Capture

| Name | Description | Path |
|------|-------------|------|
| MediaCapture | Core class for programmatic photo, audio, and video capture from a camera/microphone | [media-capture.md](./media-capture.md) |
| MediaCaptureInitializationSettings | Settings passed to `MediaCapture.InitializeAsync` (device IDs, sharing mode, source group) | [media-capture-initialization-settings.md](./media-capture-initialization-settings.md) |
| CameraCaptureUI | Ready-made full-window UI for simple photo/video capture | [camera-capture-ui.md](./camera-capture-ui.md) |
| LowLagPhotoCapture | Low shutter-lag photo capture | [low-lag-photo-capture.md](./low-lag-photo-capture.md) |
| LowLagMediaRecording | Low-lag start/stop/pause video recording | [low-lag-media-recording.md](./low-lag-media-recording.md) |
| MediaFrameReader | Reads frames (including depth/infrared) from a MediaFrameSource | [media-frame-reader.md](./media-frame-reader.md) |
| MediaFrameSourceGroup | Groups of simultaneously usable frame sources (color, depth, infrared) | [media-frame-source-group.md](./media-frame-source-group.md) |
| DeviceInformation.FindAllAsync (camera enumeration) | Enumerate available cameras via `DeviceClass.VideoCapture` | [device-enumeration.md](./device-enumeration.md) |
| VideoDeviceController | Manual camera controls: focus, exposure, white balance, zoom, flash, ISO | [video-device-controller.md](./video-device-controller.md) |
| CameraStreamState | Enum for camera stream state (streaming, blocked, shutdown) | [camera-stream-state.md](./camera-stream-state.md) |
| GraphicsCaptureItem | Target of a screen capture (window/display), chosen via the picker | [graphics-capture-item.md](./graphics-capture-item.md) |
| GraphicsCapturePicker | System picker UI for choosing a screen capture target | [graphics-capture-picker.md](./graphics-capture-picker.md) |
| Direct3D11CaptureFramePool | Frame pool storing captured screen frames | [direct3d11-capture-frame-pool.md](./direct3d11-capture-frame-pool.md) |
| GraphicsCaptureSession | Active screen capture session bound to a frame pool and capture item | [graphics-capture-session.md](./graphics-capture-session.md) |
| Camera capabilities and privacy | Manifest `webcam`/`microphone` capabilities and privacy setting handling | [camera-capabilities-privacy.md](./camera-capabilities-privacy.md) |
| Windows Studio Effects | Hardware/NPU-accelerated AI camera and microphone effects | [windows-studio-effects.md](./windows-studio-effects.md) |
