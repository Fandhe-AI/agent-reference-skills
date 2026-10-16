# Progressive

Playing progressive (single-file) streams with ExoPlayer via `MediaItem` or `ProgressiveMediaSource`. Source: https://developer.android.com/media/media3/exoplayer/progressive

## Signature / Usage

```kotlin
// Create a player instance.
val player = ExoPlayer.Builder(context).build()
// Set the media item to be played.
player.setMediaItem(MediaItem.fromUri(progressiveUri))
// Prepare the player.
player.prepare()
```

```kotlin
// Create a data source factory.
val dataSourceFactory: DataSource.Factory = DefaultHttpDataSource.Factory()
// Create a progressive media source pointing to a stream uri.
val mediaSource: MediaSource =
  ProgressiveMediaSource.Factory(dataSourceFactory)
    .createMediaSource(MediaItem.fromUri(progressiveUri))
player.setMediaSource(mediaSource)
```

## Options / Props

Supported container formats (the contained audio/video sample formats must also be supported):

| Container | Supported | Comments |
|-----------|-----------|----------|
| MP4, M4A, FMP4, WebM, Matroska, WAV, MPEG-TS, MPEG-PS | YES | |
| MP3 | YES | Some streams only seekable using constant bitrate seeking |
| Ogg | YES | Containing Vorbis, Opus and FLAC |
| FLV | YES | Not seekable |
| ADTS (AAC) | YES | Only seekable using constant bitrate seeking |
| FLAC | YES | Using the FLAC library or the FLAC extractor in the ExoPlayer library |
| AMR | YES | Only seekable using constant bitrate seeking |

## Notes

- Constant bitrate seeking: the MP3, ADTS and AMR extractors have `FLAG_ENABLE_CONSTANT_BITRATE_SEEKING`, not enabled by default. The simplest way to enable it for all supporting extractors is `DefaultExtractorsFactory.setConstantBitrateSeekingEnabled`.
- FLV is not seekable because the container provides no seek metadata (for example, a sample index). If seeking is required, use a more appropriate container.
- The FLAC library extractor outputs raw audio (handled by the framework on all API levels). The ExoPlayer library FLAC extractor outputs FLAC frames and needs a FLAC decoder (a `MediaCodec` decoder, required from API level 27, or the FFmpeg library with FLAC enabled). `DefaultExtractorsFactory` uses the extension extractor if the app was built with the FLAC library, otherwise the ExoPlayer library extractor.
- For image formats see the Images page.

## Related

- [Images](./images.md)
- [MediaSource and Factories](./media-source.md)
- [Customization](./customization.md)
- [Troubleshooting](./troubleshooting.md)
