# CompositionPlayer

A `Player` implementation that renders a `Composition` directly for real-time preview (effects, trimming, compositing) without exporting to a file first, so edits can be validated before committing to a time-consuming `Transformer` export.

## Signature / Usage

```kotlin
val compositionPlayer = CompositionPlayer.Builder(context).build()
compositionPlayer.setComposition(composition)
compositionPlayer.prepare()
compositionPlayer.play()
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `CompositionPlayer.Builder(context)` | `Context` | — | Constructor. |
| `setVideoGraphFactory(factory)` | `VideoGraph.Factory` | `SingleInputVideoGraph.Factory` | Use `MultipleInputVideoGraph.Factory` when the `Composition` has more than one video/image sequence (e.g. picture-in-picture). |
| `build()` | — | — | Returns the `CompositionPlayer`. |
| `setComposition(composition)` | `Composition` | — | Sets the `Composition` to preview; every media item must have an explicit duration (`setDurationUs()` / `setImageDurationMs()`). |
| `prepare()` / `play()` | — | — | Standard `Player` playback controls, since `CompositionPlayer` implements `Player`. |

## Notes

- Package/artifact: `androidx.media3:media3-transformer`. Annotated `@ExperimentalApi`; early preview stage, API surface may change.
- Must be accessed from a single application thread (the `Looper` of the creation thread, main thread by default), same constraint as `Transformer`.
- Only `REPEAT_MODE_OFF` and `REPEAT_MODE_ALL` are supported (no `REPEAT_MODE_ONE`).
- Unlike `ExoPlayer`, which plays a `MediaItem`/playlist and applies effects via `setVideoEffects()` per playlist item, `CompositionPlayer` plays a whole `Composition` and derives its timeline from it; choose `ExoPlayer` for general/single-asset playback and `CompositionPlayer` for multi-asset edit preview.
- As of this writing, multi-asset preview (picture-in-picture, side-by-side, grid layouts) is still in active development; single-asset and single-video-plus-single-audio-sequence previews are supported today.
- Attach a `Player.Listener` and implement `onPlayerError()` to catch errors surfaced from the `Composition` or the `VideoGraph.Factory`.

## Related

- [Composition / EditedMediaItemSequence](./composition.md)
- [Transformer](./transformer.md)
