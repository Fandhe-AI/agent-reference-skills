# EditedMediaItem / Effects

Wraps a `MediaItem` with the edit instructions (audio/video removal, frame rate, effects) applied to it before export or preview. `Effects` groups the ordered `AudioProcessor`s and `VideoEffect`s applied to that item.

## Signature / Usage

```kotlin
val editedMediaItem = EditedMediaItem.Builder(MediaItem.fromUri(uri))
    .setRemoveAudio(true)
    .setEffects(
        Effects(
            /* audioProcessors= */ listOf(),
            /* videoEffects= */ listOf(Presentation.createForHeight(480)),
        )
    )
    .build()
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `EditedMediaItem.Builder(mediaItem)` | `MediaItem` | — | Constructor. Trimming is set on the wrapped `MediaItem` via `MediaItem.ClippingConfiguration` (`setStartPositionMs` / `setEndPositionMs`), not on the builder itself. |
| `setRemoveAudio(remove)` | `Boolean` | `false` | Drops the audio track from the output. |
| `setRemoveVideo(remove)` | `Boolean` | `false` | Drops the video track from the output. |
| `setFlattenForSlowMotion(flatten)` | `Boolean` | `false` | Flattens slow-motion metadata tracks recorded by supported camera apps into a normal-speed-equivalent track. |
| `setEffects(effects)` | `Effects` | `Effects(listOf(), listOf())` | Audio/video effects applied to this item only. |
| `setFrameRate(frameRate)` | `Int` | source rate | Target output frame rate; required to give a still image a video frame rate. |
| `setDurationUs(durationUs)` | `Long` | source duration | Explicit duration; required when the item is played by `CompositionPlayer` and the source duration is unknown ahead of time. |
| `build()` | — | — | Returns the `EditedMediaItem`. |

`Effects(audioProcessors, videoEffects)`:

| Name | Type | Description |
|------|------|-------------|
| `audioProcessors` | `List<AudioProcessor>` | Applied in order to raw PCM audio. Built-ins include `SonicAudioProcessor` (speed/pitch), `SpeedChangingAudioProcessor`, `ChannelMixingAudioProcessor`. |
| `videoEffects` | `List<VideoEffect>` | Applied in order, compiled into GL shader programs. Built-ins include `Presentation` (rescale/crop to a target size), `ScaleAndRotateTransformation`, `Crop`, `RgbFilter`, `OverlayEffect`, `TextOverlay`, `BitmapOverlay`. |

## Notes

- Package/artifact: `androidx.media3:media3-transformer` for `EditedMediaItem`; `androidx.media3:media3-effect` for the `Effects`/`VideoEffect` implementations.
- A still image is turned into a video clip by setting `MediaItem.Builder.setImageDurationMs()` on the source `MediaItem` and `setFrameRate()` on the `EditedMediaItem`.
- Multiple consecutive matrix-only video effects (e.g. several `ScaleAndRotateTransformation`s) are optimized by the framework into a single shader pass.
- Video effects set here can also be previewed directly on `ExoPlayer` via `ExoPlayer.setVideoEffects()`, without going through `Transformer`/`Composition`.

## Related

- [Transformer](./transformer.md)
- [Composition](./composition.md)
- [CompositionPlayer](./composition-player.md)
