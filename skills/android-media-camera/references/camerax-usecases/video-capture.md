# VideoCapture

A use case that provides a camera stream suitable for video recording. Paired with a `VideoOutput` implementation (typically `Recorder`) via the `withOutput()` factory.

## Signature / Usage

```kotlin
val qualitySelector = QualitySelector.fromOrderedList(
    listOf(Quality.UHD, Quality.FHD, Quality.HD, Quality.SD),
    FallbackStrategy.lowerQualityOrHigherThan(Quality.SD)
)

val recorder = Recorder.Builder()
    .setExecutor(cameraExecutor)
    .setQualitySelector(qualitySelector)
    .build()

val videoCapture = VideoCapture.withOutput(recorder)

cameraProvider.bindToLifecycle(this, CameraSelector.DEFAULT_BACK_CAMERA, preview, videoCapture)
```

```kotlin
// VideoCapture
fun <T : VideoOutput> withOutput(videoOutput: T): VideoCapture<T>

class Builder<T : VideoOutput>(videoOutput: T) {
    fun setMirrorMode(mirrorMode: Int): Builder<T>       // default MIRROR_MODE_OFF
    fun setTargetRotation(rotation: Int): Builder<T>
    fun setVideoStabilizationEnabled(enabled: Boolean): Builder<T>
    fun build(): VideoCapture<T>
}

// Recorder
class Builder {
    fun setExecutor(executor: Executor): Builder
    fun setQualitySelector(qualitySelector: QualitySelector): Builder
    fun setAspectRatio(aspectRatio: Int): Builder
    fun setTargetVideoEncodingBitRate(bitRate: Int): Builder
    fun build(): Recorder
}
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `videoOutput` | `T : VideoOutput` | — | Typically a `Recorder`; created via `Recorder.Builder()`. |
| `mirrorMode` | `Int` | `MIRROR_MODE_OFF` | `MIRROR_MODE_OFF`, `MIRROR_MODE_ON`, `MIRROR_MODE_ON_FRONT_ONLY` (mirror front-camera video to match preview, CameraX 1.3+). |
| `qualitySelector` | `QualitySelector` | — | `QualitySelector.fromOrderedList(listOf(Quality...), FallbackStrategy)` or `QualitySelector.from(Quality)`. `Quality` values: `UHD` (4K), `FHD` (1080p), `HD` (720p), `SD` (480p). |
| `executor` | `Executor` | internal executor | Executor used by the `Recorder` for callbacks. |
| `targetVideoEncodingBitRate` | `Int` | — | Target bitrate in bits per second. |

## Notes

- Query device-supported qualities with `QualitySelector.getSupportedQualities(cameraInfo)` before building a `qualitySelector` for a specific position.
- Requires `RECORD_AUDIO` permission if audio is enabled on the resulting `PendingRecording` — see `PendingRecording`/`Recording`.
- Artifact: `androidx.camera:camera-video`.

## Related

- [Recording and PendingRecording](./recording.md)
- [Camera permissions](./camera-permissions.md)
