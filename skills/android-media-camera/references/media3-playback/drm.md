# DRM (Digital Rights Management)

ExoPlayer plays DRM-protected content via Android's `MediaDrm` API, configured declaratively on `MediaItem.DrmConfiguration`. The player builds a `DefaultDrmSessionManager` automatically for most use cases.

## Signature / Usage

```kotlin
val mediaItem =
  MediaItem.Builder()
    .setUri(videoUri)
    .setDrmConfiguration(
      MediaItem.DrmConfiguration.Builder(C.WIDEVINE_UUID)
        .setLicenseUri(licenseUri)
        .setMultiSession(true)
        .setLicenseRequestHeaders(httpRequestHeaders)
        .build()
    )
    .build()
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| Widevine "cenc" | scheme (API 19+) | — | Supported on DASH, HLS (FMP4 only). |
| Widevine "cbcs" | scheme (API 25+) | — | Supported on DASH, HLS (FMP4 only). |
| ClearKey "cenc" | scheme (API 21+) | — | Supported on DASH. |
| PlayReady SL2000 "cenc" | scheme (Android TV) | — | Supported on DASH, SmoothStreaming, HLS (FMP4 only). |
| `setMultiSession(boolean)` | builder method | `false` | Enable for streams with key rotation, or when the license server returns only the requested key (rather than all keys) for multi-key content. |
| `setKeySetId(byte[])` | builder method | none | Loads a previously persisted offline key set for offline playback. |
| `forceSessionsForAudioAndVideoTracks(boolean)` | builder method | `false` | Keeps placeholder `DrmSessions` active across clear/encrypted transitions to avoid decoder recreation. |

## Notes

- Prefer license servers that return all keys for multi-key content in a single response — handled automatically and most efficiently by ExoPlayer, without `setMultiSession(true)`.
- Offline: only one offline key set can currently be specified per playback; offline multi-key playback requires a license server that returns all keys in one response.
- For a fully custom `DrmSessionManager`, provide a `DrmSessionManagerProvider` to `DefaultMediaSourceFactory.setDrmSessionManagerProvider { mediaItem -> customDrmSessionManager }`.
- Video stuttering with DRM content on Android 6.0-11 (API 23-30) can often be resolved by enabling asynchronous buffer queueing (`DefaultRenderersFactory.forceEnableMediaCodecAsynchronousQueueing()`), see [Customization](./customization.md).
- Artifact: `androidx.media3:media3-exoplayer` (`DrmSessionManager`); `MediaItem.DrmConfiguration` is in `androidx.media3:media3-common`.

## Related

- [MediaItem](./media-item.md)
- [MediaSource and factories](./media-source.md)
- [Customization](./customization.md)
