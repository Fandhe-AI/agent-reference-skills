# Ad Insertion (IMA extension)

Client-side VAST/VMAP ad insertion (pre-roll/mid-roll/post-roll) via `ImaAdsLoader`, wrapping Google's Interactive Media Ads (IMA) SDK. Declared per `MediaItem` via `AdsConfiguration` and wired into playback through `DefaultMediaSourceFactory`. Package: `androidx.media3.exoplayer.ima`.

## Signature / Usage

```kotlin
val mediaItem =
  MediaItem.Builder()
    .setUri(videoUri)
    .setAdsConfiguration(MediaItem.AdsConfiguration.Builder(adTagUri).build())
    .build()

val adsLoader = ImaAdsLoader.Builder(context).build()
val mediaSourceFactory: MediaSource.Factory =
  DefaultMediaSourceFactory(context).setLocalAdInsertionComponents({ adsLoader }, playerView)

val player = ExoPlayer.Builder(context).setMediaSourceFactory(mediaSourceFactory).build()
adsLoader.setPlayer(player)
```

```java
public static final class AdsConfiguration {
  public static final class Builder {
    public Builder(Uri adTagUri);
    public Builder setAdsId(@Nullable Object adsId);
  }
}

MediaSource.Factory setLocalAdInsertionComponents(
    AdsLoader.Provider adsLoaderProvider, AdViewProvider adViewProvider);
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `adTagUri` (`AdsConfiguration.Builder` ctor) | `Uri` | — | Required; URI of the VAST/VMAP ad tag to request. |
| `adsId` | `Object?` | `(mediaId, uri, adTagUri)` | Overrides the key used to persist ad playback state across `MediaItem` instances; e.g. set to just the ad tag URI so ads play once even when reused across items. |
| `adsLoaderProvider` | `AdsLoader.Provider` | — | Supplies the `ImaAdsLoader` instance to `DefaultMediaSourceFactory` for a given `MediaItem`. |
| `adViewProvider` | `AdViewProvider` | — | Typically `PlayerView`, which implements it; supplies the ad overlay view group. |

## Notes

- `DefaultMediaSourceFactory` wraps the content `MediaSource` in an `AdsMediaSource`, which obtains an `AdsLoader` from the `AdsLoader.Provider` and inserts ads per the item's `AdsConfiguration`.
- Call `ImaSdkFactory.initialize(context, imaSdkSettings)` as early as possible in the app lifecycle to give the IMA SDK more time to load resources before the first ad request.
- `PlayerView` hides transport controls during ad playback by default (configurable via `setControllerHideDuringAds`); IMA's own overlays (skip button, info links) cannot be customized per IAB requirements. Register app-added overlay views through `AdViewProvider.getAdOverlayInfos()` for correct viewability tracking.
- Pass companion ad slots via `ImaAdsLoader.Builder().setCompanionAdSlots(slots)`.
- Requires the separate `androidx.media3:media3-exoplayer-ima` Gradle dependency in addition to `media3-exoplayer`.

## Related

- [MediaItem](./media-item.md)
- [MediaSource and Factories](./media-source.md)
- [PlayerView](./player-view.md)
- [ExoPlayer](./exoplayer.md)
