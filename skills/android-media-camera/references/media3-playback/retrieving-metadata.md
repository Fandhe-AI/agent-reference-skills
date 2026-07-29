# Retrieving In-Stream Metadata

Embedded/in-stream metadata (e.g. ICY or ID3 frames carried inside the media stream, or container format metadata) is delivered during playback via `Player.Listener.onMetadata`, separate from the `MediaMetadata` attached to a `MediaItem`. Package: `androidx.media3.common`.

## Signature / Usage

```kotlin
player.addListener(
  object : Player.Listener {
    override fun onMetadata(metadata: Metadata) {
      for (i in 0 until metadata.length()) {
        val entry = metadata[i]
        // e.g. cast entry to Id3Frame / EventMessage / etc. depending on source.
      }
    }
  }
)
```

```java
void onMetadata(Metadata metadata);
```

```kotlin
// Without playback, e.g. to inspect a file before deciding to play it.
MetadataRetriever.Builder(context, mediaItem).build().use { retriever ->
  val trackGroups = retriever.retrieveTrackGroups().await()
  val durationUs = retriever.retrieveDurationUs().await()
}
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `Metadata` | class | Container of `Metadata.Entry` objects delivered by `onMetadata`; entry subtype depends on source format (e.g. ID3 frames, HLS `EventMessage`). |
| `Player.getMediaMetadata()` | `MediaMetadata` | Convenience aggregate populated from both static format metadata and dynamic in-stream metadata; use for general fields (title, artist) rather than raw entries. |
| `MetadataRetriever` | class (`androidx.media3.inspector`) | Extracts track groups/timeline/duration from a `MediaItem` without building or preparing a full player. |

## Notes

- Distinct from [MediaMetadata](./media-metadata.md): that page covers the `MediaMetadata` data class you attach to a `MediaItem` and read via `Player.Listener.onMediaMetadataChanged` / `player.getCurrentMediaMetadata()`; this page covers the lower-level, format-specific entries (e.g. ID3) surfaced via `onMetadata` as the stream is decoded.
- Static (non-changing) format metadata is also reachable via `TrackSelections#getFormat` without waiting for an `onMetadata` callback.
- `MotionPhotoMetadata` entries (image/video part offsets and lengths for motion photos) are obtained the same way, typically via `MetadataRetriever` rather than during live playback.
- Artifact: `androidx.media3:media3-common` (`Metadata`), `androidx.media3:media3-inspector` (`MetadataRetriever`; superseded the older `androidx.media3.exoplayer.MetadataRetriever`, now deprecated).

## Related

- [MediaMetadata](./media-metadata.md)
- [Player.Listener](./player-listener.md)
- [Timeline and Tracks](./timeline-tracks.md)
