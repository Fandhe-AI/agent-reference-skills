# PreloadManager (BasePreloadManager, DefaultPreloadManager)

Preloads upcoming media in a playlist/carousel ahead of playback so switching to them starts faster. `DefaultPreloadManager` is the ready-made implementation for one-dimensional lists, prioritizing items by proximity to the currently playing one; `BasePreloadManager` is the abstract base for custom strategies. Package: `androidx.media3.exoplayer.source.preload`.

## Signature / Usage

```kotlin
class MyTargetPreloadStatusControl(var currentPlayingIndex: Int = 0) :
  TargetPreloadStatusControl<Int, DefaultPreloadManager.PreloadStatus> {

  override fun getTargetPreloadStatus(index: Int): DefaultPreloadManager.PreloadStatus? =
    when {
      abs(index - currentPlayingIndex) == 1 ->
        DefaultPreloadManager.PreloadStatus.specifiedRangeLoaded(/* durationMs= */ 3000L)
      abs(index - currentPlayingIndex) == 2 -> DefaultPreloadManager.PreloadStatus.PRELOAD_STATUS_TRACKS_SELECTED
      abs(index - currentPlayingIndex) <= 4 -> DefaultPreloadManager.PreloadStatus.PRELOAD_STATUS_SOURCE_PREPARED
      else -> null
    }
}

val preloadManagerBuilder = DefaultPreloadManager.Builder(context, MyTargetPreloadStatusControl())
val preloadManager = preloadManagerBuilder.build()
val player = preloadManagerBuilder.buildExoPlayer() // ExoPlayer built by the same builder

preloadManager.add(mediaItem, index) // rankingData used by TargetPreloadStatusControl
preloadManager.setCurrentPlayingIndex(index)
preloadManager.invalidate()
// ...
preloadManager.release()
```

```java
public static final class Builder {
  public Builder(Context context, TargetPreloadStatusControl<Integer, PreloadStatus> targetPreloadStatusControl);
  public ExoPlayer buildExoPlayer(); // builds an ExoPlayer sharing this manager's components
  public DefaultPreloadManager build();
}

void add(MediaItem mediaItem, Object rankingData);
void setCurrentPlayingIndex(int currentPlayingIndex);
void invalidate();
void reset();
void release();
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `targetPreloadStatusControl` (Builder ctor) | `TargetPreloadStatusControl<Int, PreloadStatus>` | — | Required; returns the target `PreloadStatus` for each ranked index, or `null` to skip preloading it. |
| `PreloadStatus.specifiedRangeLoaded(durationMs)` | factory | — | Load media data for `durationMs` from the item's default start position. |
| `PRELOAD_STATUS_TRACKS_SELECTED` | `PreloadStatus` | — | Load track information and select tracks, but do not load media data yet. |
| `PRELOAD_STATUS_SOURCE_PREPARED` | `PreloadStatus` | — | Prepare the underlying source (e.g. fetch/parse the manifest) only. |
| `PRELOAD_STATUS_NOT_PRELOADED` / `null` | `PreloadStatus?` | — | Do not preload this item. |

## Notes

- A `DefaultPreloadManager.Builder` can build only **one** `DefaultPreloadManager`; building a second with the same builder throws, even after the first is released. Call `builder.buildExoPlayer()` (not a method on the manager itself) to create every `ExoPlayer` that will play media managed by that preload manager, so they share its components and preloaded sources.
- `setCurrentPlayingIndex` updates preload priorities so `DefaultPreloadManager` shifts preloading toward items newly adjacent to the playing one; call `invalidate()` after playlist changes to recompute priorities.
- `BasePreloadManager` is the extension point for non-linear preload strategies (e.g. graph/tree navigation) beyond `DefaultPreloadManager`'s proximity-based list ranking.
- Call `release()` during cleanup to stop preloading and free resources.
- Artifact: `androidx.media3:media3-exoplayer` (preload APIs are `@UnstableApi`).

## Related

- [ExoPlayer](./exoplayer.md)
- [MediaSource and factories](./media-source.md)
- [DataSource.Factory and Caching](./data-source-cache.md)
