# HLS (incl. interstitials / HlsInterstitialsAdsLoader)

Playing HLS streams with ExoPlayer via `MediaItem` or `HlsMediaSource`, and HLS interstitials via `HlsInterstitialsAdsLoader`. Source: https://developer.android.com/media/media3/exoplayer/hls

## Signature / Usage

```kotlin
implementation("androidx.media3:media3-exoplayer-hls:1.11.1")
```

```kotlin
val player = ExoPlayer.Builder(context).build()
player.setMediaItem(MediaItem.fromUri(hlsUri))
player.prepare()
```

```kotlin
val dataSourceFactory: DataSource.Factory = DefaultHttpDataSource.Factory()
val hlsMediaSource =
  HlsMediaSource.Factory(dataSourceFactory).createMediaSource(MediaItem.fromUri(hlsUri))
player.setMediaSource(hlsMediaSource)
player.prepare()
```

Interstitials with the `MediaItem` playlist API:

```kotlin
val hlsInterstitialsAdsLoader = HlsInterstitialsAdsLoader(context)
val hlsMediaSourceFactory =
  HlsInterstitialsAdsLoader.AdsMediaSourceFactory(
    hlsInterstitialsAdsLoader,
    playerView,
    DefaultMediaSourceFactory(context),
  )
val player = ExoPlayer.Builder(context).setMediaSourceFactory(hlsMediaSourceFactory).build()
hlsInterstitialsAdsLoader.setPlayer(player)
playerView.setPlayer(player)

player.setMediaItem(
  MediaItem.Builder()
    .setUri("https://www.example.com/media.m3u8")
    .setAdsConfiguration(
      MediaItem.AdsConfiguration.Builder("hls://interstitials".toUri())
        .setAdsId("ad-tag-0") // must be unique within playlist
        .build()
    )
    .build()
)
player.prepare()
player.play()
```

Ad events listener and lifecycle:

```kotlin
class AdsLoaderListener : HlsInterstitialsAdsLoader.Listener {
  override fun onStart(mediaItem: MediaItem, adsId: Any, adViewProvider: AdViewProvider) {}
  override fun onMetadata(mediaItem: MediaItem, adsId: Any, adGroupIndex: Int, adIndexInAdGroup: Int, metadata: Metadata) {}
  override fun onAdCompleted(mediaItem: MediaItem, adsId: Any, adGroupIndex: Int, adIndexInAdGroup: Int) {}
  override fun onStop(mediaItem: MediaItem, adsId: Any, adPlaybackState: AdPlaybackState) {}
}
hlsInterstitialsAdsLoader.addListener(AdsLoaderListener())

// Resumption (VOD only): save on stop, restore on start
adsResumptionStates = hlsInterstitialsAdsLoader?.adsResumptionStates
hlsInterstitialsAdsLoader?.addAdResumptionState(state)
```

Disabling chunkless preparation:

```kotlin
val hlsMediaSource =
  HlsMediaSource.Factory(dataSourceFactory)
    .setAllowChunklessPreparation(false)
    .createMediaSource(MediaItem.fromUri(hlsUri))
```

## Options / Props

| Feature | Supported | Comments |
|---------|-----------|----------|
| MPEG-TS, FMP4/CMAF, ADTS (AAC), MP3 | YES | |
| CEA-608, CEA-708, WebVTT | YES | |
| ID3 metadata | YES | |
| SCTE-35 | NO | |
| AES-128 | YES | |
| Sample AES-128 | NO | |
| Widevine | YES | API 19+ ("cenc") and 25+ ("cbcs") |
| PlayReady SL2000 | YES | Android TV only |
| Delta updates, blocking playlist reload | YES | |
| Blocking load of preload hints | YES | Except for byteranges with undefined lengths |
| Server-guided ad insertion (Interstitials) | Partially | Only VOD with `X-ASSET-URI`. Live streams and `X-ASSET-LIST` will be added later. |
| IMA server-side and client-side ads | YES | See the ad insertion guide |
| Regular live playback | YES | |
| Low-latency HLS (Apple) | YES | |
| Low-latency HLS (Community) | NO | |
| Common Media Client Data (CMCD) | YES | See the CMCD integration guide |

## Notes

- If the URI does not end with `.m3u8`, pass `MimeTypes.APPLICATION_M3U8` to `MediaItem.Builder.setMimeType`. The URI may point to a media playlist or a multivariant playlist; with multiple `#EXT-X-STREAM-INF` tags ExoPlayer adapts between variants.
- `Player.getCurrentManifest` returns an `HlsManifest`; `onTimelineChanged` fires when the manifest is loaded.
- Interstitials are ignored by default; support is added with `HlsInterstitialsAdsLoader`. Not all spec features are supported; file a GitHub issue with a stream URI for missing support.
- `HlsInterstitialsAdsLoader.AdsMediaSourceFactory` works for any HLS stream; without an ads configuration the source plays as with `HlsMediaSource.Factory`. Alternatively, build the player with the default factory and call `AdsMediaSourceFactory.createMediaSource(...)` then `player.setMediaSource(...)`.
- The ads loader (or `AdsMediaSourceFactory`) can be reused across player instances (for example created in `Activity.onCreate`) as long as only one player uses it at a time. Call `release()` when no longer used.
- Ad resumption: `getAdsResumptionStates()` before releasing the player and `addAdResumptionState()` after recreation; `AdsResumptionState` is bundleable (`toBundle` / `fromBundle`) so it can go into `onSaveInstanceState`. Resumption is only supported for VOD streams.
- Chunkless preparation (default) uses only the multivariant playlist and works if `#EXT-X-STREAM-INF` tags contain `CODECS`. Disable it if segments contain muxed closed captions not declared with `#EXT-X-MEDIA:TYPE=CLOSED-CAPTIONS`; this increases start-up time, so declaring them in the multivariant playlist is preferable.
- Content guidelines: precise segment durations; a continuous media stream; `#EXT-X-INDEPENDENT-SEGMENTS`; prefer demuxed streams; include all information in the multivariant playlist. For live: `#EXT-X-PROGRAM-DATE-TIME`, `#EXT-X-DISCONTINUITY-SEQUENCE`, and a long live window (one minute or more).

## Related

- [MediaSource and Factories](./media-source.md)
- [Ad Insertion](./ad-insertion.md)
- [Live Streaming](./live-streaming.md)
- [CMCD](./cmcd.md)
- [DASH](./dash.md)
