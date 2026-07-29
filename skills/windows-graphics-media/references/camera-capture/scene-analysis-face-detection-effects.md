# SceneAnalysisEffect / FaceDetectionEffect

Built-in video effects that analyze the `MediaCapture` preview stream in real time. `SceneAnalysisEffect` evaluates whether HDR processing would improve the current scene; `FaceDetectionEffect` reports the bounding box of each detected face and can drive auto-focus/auto-exposure on the detected face.

## Signature / Usage

```csharp
// Scene analysis (HDR recommendation)
private SceneAnalysisEffect m_sceneAnalysisEffect;

var definition = new SceneAnalysisEffectDefinition();
m_sceneAnalysisEffect = (SceneAnalysisEffect)await m_mediaCapture.AddVideoEffectAsync(definition, MediaStreamType.VideoPreview);
m_sceneAnalysisEffect.SceneAnalyzed += (sender, args) =>
{
    double hdrCertainty = args.ResultFrame.HighDynamicRange.Certainty; // 0.0-1.0
};
m_sceneAnalysisEffect.HighDynamicRangeAnalyzer.Enabled = true;

// Face detection
FaceDetectionEffect m_faceDetectionEffect;

var faceDefinition = new FaceDetectionEffectDefinition
{
    SynchronousDetectionEnabled = false,
    DetectionMode = FaceDetectionMode.HighPerformance
};
m_faceDetectionEffect = (FaceDetectionEffect)await m_mediaCapture.AddVideoEffectAsync(faceDefinition, MediaStreamType.VideoPreview);
m_faceDetectionEffect.DesiredDetectionInterval = TimeSpan.FromMilliseconds(33);
m_faceDetectionEffect.FaceDetected += (sender, args) =>
{
    foreach (Windows.Media.FaceAnalysis.DetectedFace face in args.ResultFrame.DetectedFaces)
    {
        BitmapBounds faceRect = face.FaceBox;
    }
};
m_faceDetectionEffect.Enabled = true;
```

## Options / Props

| Name | Description |
|------|-------------|
| `SceneAnalysisEffectDefinition` | Effect definition passed to `MediaCapture.AddVideoEffectAsync`; returns a `SceneAnalysisEffect` instance. |
| `SceneAnalysisEffect.SceneAnalyzed` | Event raised with a `SceneAnalyzedEventArgs` containing the analysis result (`ResultFrame.HighDynamicRange.Certainty`, 0.0-1.0). |
| `SceneAnalysisEffect.HighDynamicRangeAnalyzer.Enabled` | `bool`; currently the only analyzer the effect supports. Must be set `true` to receive HDR recommendations. |
| `FaceDetectionEffectDefinition.DetectionMode` | `FaceDetectionMode`; trades detection speed vs. accuracy (e.g. `HighPerformance`). |
| `FaceDetectionEffectDefinition.SynchronousDetectionEnabled` | `bool`; `false` avoids delaying preview frames while detection runs. |
| `FaceDetectionEffect.Enabled` | `bool`; starts/stops detection. Can be toggled while capture is ongoing. |
| `FaceDetectionEffect.DesiredDetectionInterval` | `TimeSpan`; how often the preview stream is analyzed. Can be adjusted while capture is ongoing. |
| `FaceDetectionEffect.FaceDetected` | Event raised with `FaceDetectedEventArgs.ResultFrame.DetectedFaces`, a list of `Windows.Media.FaceAnalysis.DetectedFace` with a `FaceBox` (`BitmapBounds`) relative to the preview stream. |

## Notes

- Namespace: `Windows.Media.Core` (`SceneAnalysisEffect`, `FaceDetectionEffect`, and their definitions/event args). `DetectedFace` comes from `Windows.Media.FaceAnalysis`.
- Both effects are added via `MediaCapture.AddVideoEffectAsync(definition, MediaStreamType.VideoPreview)`, then the returned `IMediaExtension` is cast to the concrete effect type. Remove effects with `MediaCapture.ClearEffectsAsync(MediaStreamType.VideoPreview)` before disposing `MediaCapture`.
- If `SceneAnalysisEffect` recommends HDR, capture it with `AdvancedPhotoCapture` (`AdvancedPhotoMode.Hdr`), `HdrVideoControl` for video, or a custom `VariablePhotoSequence` composite.
- Face-based auto-focus/auto-exposure support can be checked via `mediaCapture.VideoDeviceController.RegionsOfInterestControl` (`MaxRegions > 0` and `AutoExposureSupported`/`AutoFocusSupported`).
- Distinct from the standalone `FaceTracker` (`Windows.Media.FaceAnalysis`), which operates on arbitrary `VideoFrame` objects rather than being wired directly into a `MediaCapture` preview stream.

## Related

- [MediaCapture](./media-capture.md)
- [FaceTracker](./face-tracker.md)
- [AdvancedPhotoCapture](./advanced-photo-capture.md)
- [VariablePhotoSequence](./variable-photo-sequence.md)
