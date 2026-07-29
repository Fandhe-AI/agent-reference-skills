# FrameExtractor

`androidx.media3.inspector.frame.FrameExtractor` extracts decoded video frames and thumbnails from a `MediaItem` asynchronously without blocking the main thread. It is useful for generating thumbnails, video-editor timeline previews, and frame-level content analysis without instantiating a full player.

## Signature / Usage

```kotlin
suspend fun extractFrames(context: Context, mediaItem: MediaItem) {
  try {
    // FrameExtractor implements AutoCloseable, so wrap it in
    // a Kotlin .use block, which calls close() automatically.
    FrameExtractor.Builder(context, mediaItem).build().use { extractor ->
      val frame = extractor.getFrame(5000L).await()
      val thumbnail = extractor.thumbnail.await()
      handleFrame(frame, thumbnail)
    }
  } catch (e: Exception) {
    handleFailure(e)
  }
}
```

## Options / Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `FrameExtractor.Builder(context, mediaItem)` | constructor | — | Builds an extractor for the given `MediaItem`. |
| `setEffects(effects)` | `FrameExtractor.Builder` | empty list | Sets the `Effect`s to apply to extracted video frames. |
| `setSeekParameters(seekParameters)` | `FrameExtractor.Builder` | `SeekParameters.DEFAULT` | Controls how seek operations are performed when locating the requested frame. |
| `setMediaCodecSelector(mediaCodecSelector)` | `FrameExtractor.Builder` | `MediaCodecSelector.PREFER_SOFTWARE` | Selects the `MediaCodec` instances used for decoding. |
| `setExtractHdrFrames(extractHdrFrames)` | `FrameExtractor.Builder` | `false` | Whether to extract HDR `Frame.bitmap` from HDR videos (API 34+) instead of tone-mapping to BT.709. |
| `setGlObjectsProvider(glObjectsProvider)` | `FrameExtractor.Builder` | `DefaultGlObjectsProvider` | Sets the `GlObjectsProvider` used by the effect processing pipeline. |
| `setMediaSourceFactory(mediaSourceFactory)` | `FrameExtractor.Builder` | `DefaultMediaSourceFactory` | Sets the `MediaSource.Factory` used to create the underlying media source. |
| `build()` | `FrameExtractor` | — | Builds the `FrameExtractor` instance. |
| `getFrame(positionMs)` | `ListenableFuture<Frame>` | — | Extracts a representative frame for the specified `positionMs` (milliseconds) in the `MediaItem`. |
| `getThumbnail()` | `ListenableFuture<Frame>` | — | Extracts a representative thumbnail frame for the media. |

## Notes

- Ships in its own `androidx.media3:media3-inspector-frame` artifact; it does not depend on (and does not require adding) `media3-inspector`, which is a separate artifact hosting `MediaExtractorCompat`.
- `FrameExtractor` instances must be accessed from a single application thread only.
- Implements `AutoCloseable` — use `.use { }` in Kotlin or try-with-resources in Java to release resources.
- Distinct from the platform `android.media.MediaMetadataRetriever.getFrameAtTime()`, which `FrameExtractor` replaces for Media3-based apps.

## Related

- [MetadataRetriever](./metadata-retriever.md)
- [MediaExtractorCompat](./media-extractor-compat.md)
- [MediaItem](../media3-playback/media-item.md)
