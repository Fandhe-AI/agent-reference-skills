# MediaItem / MediaItem.Builder

Represents a single piece of media (URI, metadata, DRM, subtitles, clipping, ads) to be played. Converted into a playable `MediaSource` by a `MediaSource.Factory`, typically `DefaultMediaSourceFactory`.

## Signature / Usage

```kotlin
// Simple.
val mediaItem = MediaItem.fromUri(videoUri)

// With metadata and options.
val mediaItem =
  MediaItem.Builder()
    .setMediaId(mediaId)
    .setUri(videoUri)
    .setMimeType(MimeTypes.APPLICATION_M3U8)
    .build()
```

```java
public static MediaItem fromUri(Uri uri)

public Builder setUri(@Nullable Uri uri)
public Builder setUri(@Nullable String uri)
public Builder setMediaId(String mediaId)
public Builder setMimeType(@Nullable String mimeType)
public Builder setDrmConfiguration(@Nullable DrmConfiguration drmConfiguration)
public Builder setSubtitleConfigurations(List<SubtitleConfiguration> subtitleConfigurations)
public Builder setClippingConfiguration(ClippingConfiguration clippingConfiguration)
public Builder setTag(@Nullable Object tag)
public Builder setImageDurationMs(long imageDurationMs)
public Builder setAdsConfiguration(@Nullable AdsConfiguration adsConfiguration)
public MediaItem build()
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `uri` | `Uri` / `String` | — | Location of the media. |
| `mediaId` | `String` | uri string | Unique identifier for the item. |
| `mimeType` | `String?` | inferred from URI | Required for adaptive content (DASH/HLS/SmoothStreaming) served with a non-standard file extension, e.g. `MimeTypes.APPLICATION_M3U8`. |
| `drmConfiguration` | `DrmConfiguration?` | `null` | Widevine/ClearKey/PlayReady config (license URI, `setMultiSession`, request headers). |
| `subtitleConfigurations` | `List<SubtitleConfiguration>` | empty | Sideloaded subtitle tracks, each with MIME type, language, and selection flags. |
| `clippingConfiguration` | `ClippingConfiguration` | unclipped | Start/end position (ms) to trim playback; align with keyframes to avoid decode delay. |
| `tag` | `Object?` | `null` | Opaque app data retrievable from the item later. |
| `imageDurationMs` | `long` | — | Required display duration for image media items. |
| `adsConfiguration` | `AdsConfiguration?` | `null` | Ad tag URI for client-side ad insertion. |

## Notes

- `MediaItem.fromUri(uri)` is the shortest path for simple playback; use `MediaItem.Builder()` when metadata or DRM/subtitle/clipping configuration is needed.
- DRM: `MediaItem.DrmConfiguration.Builder(C.WIDEVINE_UUID).setLicenseUri(...).setMultiSession(true).setLicenseRequestHeaders(...).build()`. See [DRM](./drm.md) for scheme support and key rotation.
- Artifact: `androidx.media3:media3-common`.
- Distinct from `com.google.android.exoplayer2.MediaItem` in the deprecated ExoPlayer2 library.

## Related

- [MediaMetadata](./media-metadata.md)
- [MediaSource and factories](./media-source.md)
- [DRM](./drm.md)
- [Player](./player.md)
