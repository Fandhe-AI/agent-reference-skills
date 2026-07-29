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
| `setOutputSize(width, height)` | `FrameExtractor.Builder` | source size | Sets the output size (px) that extracted frames/thumbnails are scaled to. |
| `getFrame(timestampUs)` | `ListenableFuture<Frame>` | — | Extracts the decoded frame nearest `timestampUs` (microseconds). |
| `getThumbnail()` | `ListenableFuture<Frame>` | — | Extracts a representative thumbnail frame for the media. |

## Notes

- Requires the `androidx.media3:media3-inspector-frame` artifact (in addition to `media3-inspector`).
- `FrameExtractor` instances must be accessed from a single application thread only.
- Implements `AutoCloseable` — use `.use { }` in Kotlin or try-with-resources in Java to release resources.
- Distinct from the platform `android.media.MediaMetadataRetriever.getFrameAtTime()`, which `FrameExtractor` replaces for Media3-based apps.

## Related

- [MetadataRetriever](./metadata-retriever.md)
- [MediaExtractorCompat](./media-extractor-compat.md)
- [MediaItem](../media3-playback/media-item.md)
