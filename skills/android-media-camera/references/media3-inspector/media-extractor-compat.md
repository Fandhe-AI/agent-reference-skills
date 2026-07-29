# MediaExtractorCompat

`androidx.media3.inspector.MediaExtractorCompat` is a drop-in replacement for the platform `android.media.MediaExtractor`, providing an identical API for demuxing container files (MP4, MKV) into individual tracks and reading raw, encoded samples (compressed frames or audio blocks) along with their metadata.

## Signature / Usage

```kotlin
fun extractSamples(context: Context, mediaPath: String) {
  val extractor = MediaExtractorCompat(context)
  try {
    // 1. Set up the extractor and select tracks.
    extractor.setDataSource(mediaPath)
    for (i in 0 until extractor.trackCount) {
      val format = extractor.getTrackFormat(i)
      extractor.selectTrack(i)
    }

    // 2. Read encoded samples.
    val buffer = ByteBuffer.allocate(10 * 1024 * 1024)
    while (true) {
      val bytesRead = extractor.readSampleData(buffer, 0)
      if (bytesRead < 0) break

      val trackIndex = extractor.sampleTrackIndex
      val presentationTimeUs = extractor.sampleTime
      val sampleSize = extractor.sampleSize

      extractor.advance()
    }
  } catch (e: IOException) {
    handleFailure(e)
  } finally {
    // 3. Release the extractor.
    extractor.release()
  }
}
```

## Options / Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `setDataSource(path: String)` | `Unit` | — | Sets the data source to extract from. |
| `trackCount` | `Int` | — | Number of available tracks in the container. |
| `getTrackFormat(index)` | `MediaFormat` | — | Format information for the given track. |
| `selectTrack(index)` | `Unit` | — | Selects a track for sample extraction. |
| `readSampleData(buffer, offset)` | `Int` | — | Reads the current encoded sample into `buffer`; returns bytes read or `-1` at end of stream. |
| `sampleTrackIndex` | `Int` | — | Track index of the current sample. |
| `sampleTime` | `Long` | — | Presentation timestamp of the current sample, in microseconds. |
| `sampleSize` | `Long` | — | Size in bytes of the current sample. |
| `advance()` | `Boolean` | — | Advances to the next sample; returns `false` at end of stream. |
| `release()` | `Unit` | — | Releases the extractor's resources. |

## Notes

- Requires the `androidx.media3:media3-inspector` artifact.
- API surface intentionally mirrors the platform `android.media.MediaExtractor` class — `MediaExtractorCompat` is a Media3-based drop-in replacement for it, not a new abstraction.
- Typical uses: transcoding/remuxing, selective track extraction (e.g. audio-only), and low-level sample debugging.
- Not `AutoCloseable`; call `release()` explicitly in a `finally` block.

## Related

- [MetadataRetriever](./metadata-retriever.md)
- [FrameExtractor](./frame-extractor.md)
