# SmoothStreaming

Playing SmoothStreaming content with ExoPlayer via `MediaItem` or `SsMediaSource`. Source: https://developer.android.com/media/media3/exoplayer/smoothstreaming

## Signature / Usage

```kotlin
implementation("androidx.media3:media3-exoplayer-smoothstreaming:1.11.1")
```

```kotlin
val player = ExoPlayer.Builder(context).build()
player.setMediaItem(MediaItem.fromUri(ssUri))
player.prepare()
```

```kotlin
val dataSourceFactory: DataSource.Factory = DefaultHttpDataSource.Factory()
val mediaSource: MediaSource =
  SsMediaSource.Factory(dataSourceFactory).createMediaSource(MediaItem.fromUri(ssUri))
player.setMediaSource(mediaSource)
player.prepare()
```

```kotlin
// Accessing the manifest
val manifest = player.currentManifest
if (manifest is SsManifest) {
  // Do something with the manifest.
}
```

## Options / Props

| Feature | Supported | Comments |
|---------|-----------|----------|
| FMP4 | YES | Demuxed streams only |
| TTML | YES | Embedded in FMP4 |
| PlayReady SL2000 | YES | Android TV only |
| Regular live playback | YES | |
| Common Media Client Data (CMCD) | YES | See the CMCD integration guide |

## Notes

- Media streams must be demuxed: video, audio and text must be defined in distinct `StreamIndex` elements.
- If the URI does not end with `.ism/Manifest`, pass `MimeTypes.APPLICATION_SS` to `MediaItem.Builder.setMimeType`.
- `Player.getCurrentManifest` returns an `SsManifest`; read it from `Player.Listener.onTimelineChanged`, which fires whenever the manifest is loaded.
- Artifact version shown (1.11.1) is as given on the source page.

## Related

- [MediaSource and Factories](./media-source.md)
- [DASH](./dash.md)
- [HLS](./hls.md)
- [CMCD](./cmcd.md)
