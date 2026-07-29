# MetadataRetriever

`androidx.media3.inspector.MetadataRetriever` retrieves high-level metadata (duration, video resolution, codecs, available tracks, sampling rates) from a `MediaItem` without instantiating a full player. It implements `AutoCloseable` and returns results asynchronously via `ListenableFuture`, making it suitable for building media libraries, prefetching UI details, or validating media files before playback.

## Signature / Usage

```kotlin
suspend fun retrieveMetadata(context: Context, mediaItem: MediaItem) {
  try {
    // MetadataRetriever implements AutoCloseable, so wrap it in
    // a Kotlin `.use` block, which calls close() automatically.
    MetadataRetriever.Builder(context, mediaItem).build().use { retriever ->
      val trackGroups = retriever.retrieveTrackGroups().await()
      val timeline = retriever.retrieveTimeline().await()
      val durationUs = retriever.retrieveDurationUs().await()
      handleMetadata(trackGroups, timeline, durationUs)
    }
  } catch (e: Exception) {
    handleFailure(e)
  }
}
```

## Options / Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `MetadataRetriever.Builder(context, mediaItem)` | constructor | — | Builds a retriever for the given `MediaItem`; accepts an optional custom `MediaSource.Factory` for advanced use cases. |
| `retrieveTrackGroups()` | `ListenableFuture<TrackGroupArray>` | — | Available track groups (video/audio/text) in the media. |
| `retrieveTimeline()` | `ListenableFuture<Timeline>` | — | The `Timeline` describing the media's playlist/period structure. |
| `retrieveDurationUs()` | `ListenableFuture<Long>` | — | Duration of the media in microseconds. |

## Notes

- Requires the `androidx.media3:media3-inspector` artifact.
- For image properties (height, width, rotation), use `androidx.exifinterface.media.ExifInterface` instead — `MetadataRetriever` targets Media3-supported playback formats.
- All retrieval methods run asynchronously; always close the retriever (via `.use` in Kotlin or try-with-resources in Java) to release underlying resources.
- Distinct from the platform `android.media.MediaMetadataRetriever` class, which `MetadataRetriever` replaces for Media3-based apps.

## Related

- [MediaItem](../media3-playback/media-item.md)
- [Timeline and Tracks](../media3-playback/timeline-tracks.md)
- [FrameExtractor](./frame-extractor.md)
- [MediaExtractorCompat](./media-extractor-compat.md)
