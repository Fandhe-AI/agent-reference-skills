# DataSource.Factory and Caching

`DataSource.Factory` creates the `DataSource` instances used to load media, manifest, and license bytes over HTTP or from disk cache. `SimpleCache` and `CacheDataSource` provide on-disk caching for streaming and offline (downloaded) playback.

## Signature / Usage

```kotlin
// Custom request headers on every load.
val dataSourceFactory = DataSource.Factory {
  val dataSource = httpDataSourceFactory.createDataSource()
  dataSource.setRequestProperty("Header", "Value")
  dataSource
}

// Reading/writing through a disk cache.
val databaseProvider = StandaloneDatabaseProvider(context)
val cache = SimpleCache(cacheDir, LeastRecentlyUsedCacheEvictor(maxBytes), databaseProvider)
val cacheDataSourceFactory: DataSource.Factory =
  CacheDataSource.Factory()
    .setCache(cache)
    .setUpstreamDataSourceFactory(DefaultHttpDataSource.Factory())

val player =
  ExoPlayer.Builder(context)
    .setMediaSourceFactory(DefaultMediaSourceFactory(context).setDataSourceFactory(cacheDataSourceFactory))
    .build()
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `cache` | `Cache` | — | Backing store, typically `SimpleCache(dir, CacheEvictor, DatabaseProvider)` (`CacheDataSource.Factory.setCache`). |
| `upstreamDataSourceFactory` | `DataSource.Factory` | — | Source used on cache miss, e.g. `DefaultHttpDataSource.Factory()` (`setUpstreamDataSourceFactory`). |
| `cacheWriteDataSinkFactory` | `DataSink.Factory?` | writes to cache | Pass `null` to disable writing (read-only playback of already-downloaded content). |
| `cacheEvictor` | `CacheEvictor` | — | `NoOpCacheEvictor` (never evict, used for downloads) or `LeastRecentlyUsedCacheEvictor(maxBytes)` (bounded streaming cache). |

## Notes

- For offline downloads, `DownloadManager` (`DownloadService` + `SimpleCache` with `NoOpCacheEvictor`) manages persisted download state; play back downloaded content through a `CacheDataSource.Factory` pointed at the same cache, never by reading files directly from the download directory.
- `ResolvingDataSource.Factory(upstream) { dataSpec -> dataSpec.withRequestHeaders(...) }` supports just-in-time header injection or URI resolution per request.
- Adaptive downloads (DASH/HLS/SmoothStreaming) use `DownloadHelper` to select which tracks to download; when playing back, apply the same `streamKeys` as the download (`downloadRequest.toMediaItem()` handles this automatically).
- Artifact: `androidx.media3:media3-datasource` (`DataSource`, `SimpleCache`, `CacheDataSource`, `LeastRecentlyUsedCacheEvictor` in `androidx.media3.datasource.cache`); `DownloadManager` / `DownloadService` are in `androidx.media3:media3-exoplayer` (`androidx.media3.exoplayer.offline`), both pulled in transitively by `media3-exoplayer`.

## Related

- [MediaSource and factories](./media-source.md)
- [Customization](./customization.md)
