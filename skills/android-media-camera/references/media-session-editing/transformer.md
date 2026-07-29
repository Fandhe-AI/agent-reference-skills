# Transformer

Editing/transcoding API for exporting media: trims, concatenates, converts formats, and applies audio/video effects, using `MediaCodec` and OpenGL for hardware acceleration. Output is always MP4 by default, written via a pluggable `Muxer.Factory` (see Muxer / Muxer.Factory).

## Signature / Usage

```kotlin
val inputMediaItem = MediaItem.fromUri(inputUri)
val editedMediaItem = EditedMediaItem.Builder(inputMediaItem)
    .setRemoveAudio(true)
    .build()

val transformer = Transformer.Builder(context)
    .setVideoMimeType(MimeTypes.VIDEO_H265)
    .addListener(object : Transformer.Listener {
        override fun onCompleted(composition: Composition, result: ExportResult) {
            playOutput()
        }
        override fun onError(
            composition: Composition,
            result: ExportResult,
            exception: ExportException,
        ) {
            displayError(exception)
        }
    })
    .build()

transformer.start(editedMediaItem, outputPath)
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `Transformer.Builder(context)` | `Context` | — | Constructor. |
| `setVideoMimeType(mimeType)` | `String` | source format | Requested output video codec (e.g. `MimeTypes.VIDEO_H264`). Transmuxed (copied without re-encoding) if it already matches the input. |
| `setAudioMimeType(mimeType)` | `String` | source format | Requested output audio codec (e.g. `MimeTypes.AUDIO_AAC`). |
| `addListener(listener)` | `Transformer.Listener` | none | Receives `onCompleted`, `onError`, and progress-related callbacks. |
| `experimentalSetMp4EditListTrimEnabled(enabled)` | `Boolean` | `false` | Enables faster, edit-list-based trimming for trim-only edits. |
| `experimentalSetTrimOptimizationEnabled(enabled)` | `Boolean` | `false` | Reduces decode/encode work when only trimming. |
| `build()` | — | — | Returns the `Transformer`. |
| `start(editedMediaItem, outputPath)` | `(EditedMediaItem, String) -> Unit` | — | Starts an export; `EditedMediaItem` may be replaced by a `Composition` for multi-asset edits. |
| `getProgress(progressHolder)` | `(ProgressHolder) -> Int` | — | Returns `PROGRESS_STATE_*`; fills `progressHolder.progress` (0-100) when running. |
| `cancel()` | `() -> Unit` | — | Cancels the current export and frees resources. |

## Notes

- Package/artifact: `androidx.media3:media3-transformer` (plus `media3-effect` for `Effects`, `media3-common`).
- `EditedMediaItem` wraps a `MediaItem` with edit instructions: `setRemoveAudio()`, `setRemoveVideo()`, `setFrameRate()`, `setEffects(Effects(audioProcessors, videoEffects))`. Trimming is set on the wrapped `MediaItem` via `MediaItem.ClippingConfiguration` (`setStartPositionMs` / `setEndPositionMs`).
- `Composition` + `EditedMediaItemSequence` concatenate multiple `EditedMediaItem`s into one export (multi-asset editing).
- Video effects (e.g. `Presentation.createForHeight()`, `ScaleAndRotateTransformation`, crop/rotate transformations) are passed via `Effects.videoEffects`; audio `AudioProcessor`s via `Effects.audioProcessors`.
- The `Transformer` instance must be accessed from a single application thread; listener callbacks run on that same thread. Exports on one instance run sequentially; concurrent exports are not supported.
- This is Android Media3 `Transformer` (Kotlin, `androidx.media3.transformer`) — distinct from the ZMK keyboard-firmware input-processor `transformer` config of the same name.

## Related

- [MediaSession](./media-session.md)
- [Muxer / Muxer.Factory](./muxer-customization.md)
