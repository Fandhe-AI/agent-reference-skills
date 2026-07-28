# MediaSource and Factories

`MediaSource` defines a piece of playable media, loads it, and provides it for reading by the player. `MediaItem` instances are converted into `MediaSource`s by a `MediaSource.Factory`, typically `DefaultMediaSourceFactory`, which dispatches to the format-specific implementation (`ProgressiveMediaSource`, `DashMediaSource`, `HlsMediaSource`, `SsMediaSource`, `RtspMediaSource`).

## Signature / Usage

```kotlin
val mediaSourceFactory: MediaSource.Factory =
  DefaultMediaSourceFactory(context)
    .setDataSourceFactory(cacheDataSourceFactory)

val player = ExoPlayer.Builder(context).setMediaSourceFactory(mediaSourceFactory).build()

// Or bypass the factory and use MediaSource instances directly.
player.setMediaSources(listOfMediaSources)
player.addMediaSource(anotherMediaSource)
player.prepare()
player.play()
```

```kotlin
val mediaSource =
  ProgressiveMediaSource.Factory(customDataSourceFactory, customExtractorsFactory)
    .setLoadErrorHandlingPolicy(customLoadErrorHandlingPolicy)
    .createMediaSource(MediaItem.fromUri(streamUri))
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `DashMediaSource` | `MediaSource` | — | Used for DASH streams. |
| `HlsMediaSource` | `MediaSource` | — | Used for HLS streams (module `media3-exoplayer-hls`). |
| `ProgressiveMediaSource` | `MediaSource` | — | Used for regular/progressive files (mp4, mp3, etc.). |
| `SsMediaSource` | `MediaSource` | — | Used for SmoothStreaming (module `media3-exoplayer-smoothstreaming`). |
| `dataSourceFactory` | `DataSource.Factory` | `DefaultDataSource.Factory` | Supplies the underlying `DataSource` used to load media/manifest bytes; set via `setDataSourceFactory`. |
| `loadErrorHandlingPolicy` | `LoadErrorHandlingPolicy` | `DefaultLoadErrorHandlingPolicy` | Controls retry/back-off behavior on load errors. |

## Notes

- `DefaultMediaSourceFactory(context)` automatically selects the right `MediaSource` implementation based on the `MediaItem`'s URI/MIME type; each adaptive-format extension (`media3-exoplayer-dash`, `-hls`, `-smoothstreaming`) must be added as a dependency for its `MediaSource` to be available.
- The `MediaSource`-based playlist API (`setMediaSources` / `addMediaSource`) can be combined freely with the `MediaItem` API on the same playlist.
- Composition utilities exist for advanced cases: `ClippingMediaSource`, `FilteringMediaSource`, `MergingMediaSource`, `ConcatenatingMediaSource2`, `SilenceMediaSource`, `AdsMediaSource`, `ServerSideAdInsertionMediaSource`. For most needs, prefer `MediaItem.ClippingConfiguration`, `TrackSelectionParameters`, or `MediaItem.SubtitleConfiguration` instead of manual composition.
- Artifact: `androidx.media3:media3-exoplayer` (+ format-specific extension artifacts).
- Distinct from `com.google.android.exoplayer2.source.MediaSource` in the deprecated ExoPlayer2 library; Media3 supersedes ExoPlayer2.

## Related

- [MediaItem](./media-item.md)
- [Data sources and caching](./data-source-cache.md)
- [ExoPlayer](./exoplayer.md)
