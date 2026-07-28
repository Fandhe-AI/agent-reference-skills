# Recording / PendingRecording

`PendingRecording` configures a recording before it starts (transient, not cached); calling `start()` returns an active `Recording` that can be paused, resumed, muted, or stopped. Status is reported via `VideoRecordEvent`.

## Signature / Usage

```kotlin
val mediaStoreOutput = MediaStoreOutputOptions.Builder(
    contentResolver, MediaStore.Video.Media.EXTERNAL_CONTENT_URI
).setContentValues(contentValues).build()

val recording = videoCapture.output
    .prepareRecording(context, mediaStoreOutput)
    .withAudioEnabled()
    .start(ContextCompat.getMainExecutor(this)) { event ->
        when (event) {
            is VideoRecordEvent.Status -> { /* file size, duration */ }
            is VideoRecordEvent.Finalize -> {
                if (event.hasError()) {
                    // handle event.error
                } else {
                    // event.outputResults.outputUri
                }
            }
        }
    }

recording.pause()
recording.resume()
recording.mute(true)
recording.stop()
```

```kotlin
// PendingRecording
fun withAudioEnabled(initialMuted: Boolean = false): PendingRecording
fun asPersistentRecording(): PendingRecording
fun start(listenerExecutor: Executor, listener: Consumer<VideoRecordEvent>): Recording

// Recording
fun pause()
fun resume()
fun stop()          // equivalent to close()
fun mute(muted: Boolean)
fun close()          // AutoCloseable; idempotent
fun isPersistent(): Boolean
fun isClosed(): Boolean
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `initialMuted` | `Boolean` | `false` | Passed to `withAudioEnabled()`; requires `RECORD_AUDIO` permission, else throws `SecurityException`. |
| `outputOptions` | `FileOutputOptions` \| `FileDescriptorOutputOptions` \| `MediaStoreOutputOptions` | — | Destination for the recording; all support `setFileSizeLimit()`. |
| `listenerExecutor` / `listener` | `Executor`, `Consumer<VideoRecordEvent>` | — | Receives `VideoRecordEvent.Start`, `.Status` (periodic stats), and `.Finalize` (final result, `hasError()`/`error`/`outputResults.outputUri`). |

## Notes

- Only one active `Recording` per `Recorder` at a time; start a new one only after the previous `stop()`/`close()`.
- `asPersistentRecording()` keeps recording across lifecycle events / `VideoCapture` unbinding, until explicitly stopped.
- `MediaStoreOutputOptions` is the recommended output for shared storage; see the `android-data` skill's `files-storage` category for MediaStore/scoped-storage conventions.
- Artifact: `androidx.camera:camera-video`.

## Related

- [VideoCapture](./video-capture.md)
- [Camera permissions](./camera-permissions.md)
