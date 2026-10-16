# DASH

Playing DASH streams with ExoPlayer via `MediaItem` or `DashMediaSource`. Source: https://developer.android.com/media/media3/exoplayer/dash

## Signature / Usage

```kotlin
implementation("androidx.media3:media3-exoplayer-dash:1.11.1")
```

```kotlin
val player = ExoPlayer.Builder(context).build()
player.setMediaItem(MediaItem.fromUri(dashUri))
player.prepare()
```

```kotlin
val dataSourceFactory: DataSource.Factory = DefaultHttpDataSource.Factory()
val mediaSource: MediaSource =
  DashMediaSource.Factory(dataSourceFactory).createMediaSource(MediaItem.fromUri(dashUri))
player.setMediaSource(mediaSource)
player.prepare()
```

```kotlin
// Accessing the manifest
player.addListener(
  object : Player.Listener {
    override fun onTimelineChanged(timeline: Timeline, @Player.TimelineChangeReason reason: Int) {
      val manifest = player.currentManifest
      if (manifest is DashManifest) {
        // Do something with the manifest.
      }
    }
  }
)
```

## Options / Props

| Feature | Supported | Comments |
|---------|-----------|----------|
| FMP4, WebM, Matroska | YES | Demuxed streams only |
| MPEG-TS | NO | No support planned |
| TTML, WebVTT | YES | Raw, or embedded in FMP4 according to ISO/IEC 14496-30 |
| CEA-608, CEA-708 | YES | Embedded in FMP4 when signalled using SCTE Accessibility descriptors |
| EMSG metadata | YES | Embedded in FMP4 |
| Widevine | YES | "cenc" scheme: API 19+; "cbcs" scheme: API 25+ |
| PlayReady SL2000 | YES | Android TV, "cenc" scheme only |
| ClearKey | YES | API 21+, "cenc" scheme only |
| Multi-period playback | YES | |
| Server-guided ad insertion (xlinks) | NO | |
| IMA server-side and client-side ads | YES | See the ad insertion guide |
| Regular live playback | YES | |
| Ultra low-latency CMAF live playback | YES | |
| Common Media Client Data (CMCD) | YES | See the CMCD integration guide |

## Notes

- Streams must be demuxed: video, audio and text must be defined in distinct `AdaptationSet` elements (CEA-608 is an exception).
- If the URI does not end with `.mpd`, pass `MimeTypes.APPLICATION_MPD` to `MediaItem.Builder.setMimeType`.
- ExoPlayer automatically adapts between representations, taking bandwidth and device capabilities into account.
- `Player.getCurrentManifest` returns a `DashManifest` for DASH; `onTimelineChanged` is called whenever the manifest is loaded (once for on-demand, possibly many times for live).
- Artifact version shown (1.11.1) is as given on the source page.

## Related

- [MediaSource and Factories](./media-source.md)
- [Ad Insertion](./ad-insertion.md)
- [CMCD](./cmcd.md)
- [DRM](./drm.md)
- [Live Streaming](./live-streaming.md)
