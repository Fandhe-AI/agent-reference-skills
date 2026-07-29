# Composition / EditedMediaItemSequence

Timeline container for multi-asset editing: a `Composition` holds one or more `EditedMediaItemSequence`s, each a linear, back-to-back sequence of `EditedMediaItem`s. Sequences can overlap in time with each other (background audio under video, picture-in-picture). The same `Composition` is passed to `Transformer.start()` to export or to `CompositionPlayer.setComposition()` to preview.

## Signature / Usage

```kotlin
val video1 = EditedMediaItem.Builder(MediaItem.fromUri(video1Uri)).build()
val video2 = EditedMediaItem.Builder(MediaItem.fromUri(video2Uri)).build()
val videoSequence = EditedMediaItemSequence.withAudioAndVideoFrom(listOf(video1, video2))

val backgroundAudio = EditedMediaItem.Builder(MediaItem.fromUri(audioUri)).build()
val backgroundAudioSequence =
    EditedMediaItemSequence.withAudioFrom(listOf(backgroundAudio))
        .buildUpon()
        .setIsLooping(true) // loop audio through the duration of videoSequence
        .build()

val composition = Composition.Builder(videoSequence, backgroundAudioSequence).build()

transformer.start(composition, filePath)
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `EditedMediaItemSequence.withAudioAndVideoFrom(items)` | `List<EditedMediaItem>` | — | Factory: sequence carrying both audio and video from each item, played back-to-back. |
| `EditedMediaItemSequence.withAudioFrom(items)` | `List<EditedMediaItem>` | — | Factory: audio-only sequence (e.g. background music track). |
| `.buildUpon().setIsLooping(loop)` | `Boolean` | `false` | Loops the sequence for the duration of the other sequences in the `Composition` (typical for background audio under a longer video sequence). |
| `Composition.Builder(sequence, ...)` | `EditedMediaItemSequence...` | — | Constructor; takes one or more sequences making up the timeline. |
| `setEffects(effects)` | `Effects` | none | Effects applied across the whole composed output, in addition to any per-item effects. |
| `setHdrMode(mode)` | `Int` (`HDR_MODE_*`) | `HDR_MODE_KEEP_HDR` | Controls HDR handling/tone mapping when mixing HDR and SDR sequences; see Tone mapping. |
| `build()` | — | — | Returns the `Composition`. |

## Notes

- Package/artifact: `androidx.media3:media3-transformer`.
- A `Composition` (not a bare `EditedMediaItem`) is what `Transformer.start()` accepts for multi-asset exports; `Composition` is CompositionPlayer's only input.
- Overlapping sequences (e.g. video + looping background audio, or video-over-video for picture-in-picture) must all resolve to a well-defined total duration; items without a known duration need `EditedMediaItem.Builder.setDurationUs()` or `MediaItem.Builder.setImageDurationMs()` set explicitly.
- Crossfading between clips in a sequence is not supported as of this writing.
- SDR-to-HDR tone mapping is not supported, nor is a sequence that starts with an HDR asset followed by SDR-only tone-mapping targets.

## Related

- [EditedMediaItem / Effects](./edited-media-item.md)
- [CompositionPlayer](./composition-player.md)
- [Tone mapping](./tone-mapping.md)
- [Transformer](./transformer.md)
