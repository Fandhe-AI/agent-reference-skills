# Images

Playing images in an ExoPlayer playlist, motion photos, and integrating external image loading libraries (Glide, Coil). Source: https://developer.android.com/media/media3/exoplayer/images

## Signature / Usage

```kotlin
val player = ExoPlayer.Builder(context).build()
// imageDurationMs is required: how long the image is displayed.
player.setMediaItem(MediaItem.Builder().setUri(imageUri).setImageDurationMs(2000).build())
player.prepare()
```

```kotlin
// External image loader: explicit MIME type
val mediaItem =
  MediaItem.Builder()
    .setUri(imageUri)
    .setMimeType(MimeTypes.APPLICATION_EXTERNALLY_LOADED_IMAGE)
    .build()

// Decoder (Glide example) via DefaultRenderersFactory.getImageDecoderFactory
val glideImageDecoderFactory: ImageDecoder.Factory =
  ExternallyLoadedImageDecoder.Factory { request: ExternalImageRequest ->
    val displaySize = Util.getCurrentDisplayModeSize(context)
    GlideFutures.submit(
      Glide.with(context).asBitmap().load(request.uri).override(max(displaySize.x, displaySize.y))
    )
  }

// Preloader via DefaultMediaSourceFactory.setExternalImageLoader
val glidePreloader = ExternalLoader { request: LoadRequest ->
  GlideFutures.submit(
    Glide.with(context)
      .asFile()
      .apply(
        RequestOptions.diskCacheStrategyOf(DiskCacheStrategy.DATA)
          .priority(Priority.HIGH)
          .skipMemoryCache(true)
      )
      .load(request.uri)
  )
}
val player: Player =
  ExoPlayer.Builder(context)
    .setMediaSourceFactory(DefaultMediaSourceFactory(context).setExternalImageLoader(glidePreloader))
    .build()
```

## Options / Props

| Image format | Supported | Notes |
|--------------|-----------|-------|
| BMP, JPEG, PNG, WebP, HEIF/HEIC | YES | |
| GIF | NO | No Extractor support |
| JPEG Motion Photo | YES | Still image and video supported |
| JPEG Ultra HDR | YES | Falls back to SDR before Android 14 or on non-HDR displays |
| HEIC Motion Photo | YES | |
| AVIF (baseline) | YES | Decoded on Android 14+ only |

## Notes

- `MediaItem` must have an `imageDurationMs` for image playback. A `ProgressiveMediaSource` can also be built from such a `MediaItem` for more customization.
- Motion photos: if the image duration is defined, the photo is shown for that duration as a still image; if undefined, it is played as a video.
- External loading needs 3 steps: a `MediaItem` with `APPLICATION_EXTERNALLY_LOADED_IMAGE`, an image decoder returning a `Bitmap` (override `DefaultRenderersFactory.getImageDecoderFactory`), and an `ExternalLoader` to trigger caching and preloading. The loader must be provided even if it does nothing.
- The player requests preload of the next image once the previous playlist item has fully loaded.

## Related

- [Progressive](./progressive.md)
- [MediaItem](./media-item.md)
- [MediaSource and Factories](./media-source.md)
- [Customization](./customization.md)
