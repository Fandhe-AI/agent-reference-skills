# Downloading Media (DownloadManager, DownloadService, DownloadHelper)

APIs for downloading media so it can be played back offline. `DownloadManager` tracks and executes downloads backed by a `Cache`; `DownloadService` wraps it so downloads keep running while the app is backgrounded; `DownloadHelper` selects which tracks to download from an adaptive stream (DASH/HLS/SmoothStreaming); `DownloadNotificationHelper` builds the required foreground-service notifications. Package: `androidx.media3.exoplayer.offline`.

## Signature / Usage

```kotlin
val databaseProvider = StandaloneDatabaseProvider(context)
// NoOpCacheEvictor: downloaded content is never evicted by the cache itself.
val downloadCache = SimpleCache(downloadDirectory, NoOpCacheEvictor(), databaseProvider)

val downloadManager =
  DownloadManager(context, databaseProvider, downloadCache, DefaultHttpDataSource.Factory(), Executor(Runnable::run))
    .apply { maxParallelDownloads = 3 }

// Adaptive (DASH/HLS/SmoothStreaming): select tracks before building the request.
val downloadHelper = DownloadHelper.forMediaItem(context, mediaItem, renderersFactory, dataSourceFactory)
downloadHelper.prepare(
  object : DownloadHelper.Callback {
    override fun onPrepared(helper: DownloadHelper, tracksInfoAvailable: Boolean) {
      val downloadRequest = helper.getDownloadRequest(/* data= */ null)
      DownloadService.sendAddDownload(context, MyDownloadService::class.java, downloadRequest, /* foreground= */ false)
      helper.release()
    }
    override fun onPrepareError(helper: DownloadHelper, e: IOException) {}
  }
)

// Progressive (non-adaptive): build the request directly, no DownloadHelper needed.
val downloadRequest = DownloadRequest.Builder(contentId, contentUri).setMimeType(MimeTypes.VIDEO_MP4).build()
DownloadService.sendAddDownload(context, MyDownloadService::class.java, downloadRequest, /* foreground= */ false)
```

```java
public DownloadManager(
    Context context, DatabaseProvider databaseProvider, Cache cache,
    DataSource.Factory upstreamDataSourceFactory, Executor downloadExecutor);
public void addDownload(DownloadRequest request);
public void removeDownload(String id);
public void setRequirements(Requirements requirements);
public List<Download> getCurrentDownloads();
public DownloadIndex getDownloadIndex();

// DownloadService (subclass hooks)
protected abstract DownloadManager getDownloadManager();
@Nullable protected abstract Scheduler getScheduler();
protected abstract Notification getForegroundNotification(List<Download> downloads, @RequirementFlags int notMetRequirements);

public static void sendAddDownload(Context context, Class<? extends DownloadService> clazz, DownloadRequest downloadRequest, boolean foreground);
public static void sendRemoveDownload(Context context, Class<? extends DownloadService> clazz, String id, boolean foreground);
public static void sendSetStopReason(Context context, Class<? extends DownloadService> clazz, @Nullable String id, int stopReason, boolean foreground);
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `DownloadManager` ctor | `(Context, DatabaseProvider, Cache, DataSource.Factory, Executor)` | — | `cache` must use `NoOpCacheEvictor` (downloaded content must not be auto-evicted); `downloadExecutor` controls parallel-download throughput (e.g. `Runnable::run` for single-threaded). |
| `maxParallelDownloads` | `int` | `3` (`DEFAULT_MAX_PARALLEL_DOWNLOADS`) | Max simultaneous downloads; excess requests sit in `STATE_QUEUED`. |
| `requirements` | `Requirements` | — | Network type / idle / charging constraints; downloads pause in `STATE_QUEUED` until met (`setRequirements` / `getNotMetRequirements()`). |
| `DownloadManager.Listener.onDownloadChanged(manager, download, finalException)` | callback | — | Fires on state transitions (`STATE_QUEUED`/`STATE_DOWNLOADING`/`STATE_COMPLETED`/`STATE_FAILED`/`STATE_STOPPED`/`STATE_REMOVING`); does not report byte-level progress — poll `getCurrentDownloads()` for a progress UI. |
| `DownloadService` ctor `foregroundNotificationId` / `foregroundNotificationUpdateInterval` | `int` / `long` | — | Identifies the persistent foreground notification and how often `getForegroundNotification` is polled while downloading. |
| `DownloadHelper.forMediaItem(...)` | static factory | — | Prepares an adaptive `MediaItem` so its tracks can be inspected before choosing what to download; deprecated in favor of `DownloadHelper.Factory().create(mediaItem)`. |
| `DownloadHelper.getMappedTrackInfo(periodIndex)` / `addTrackSelection(periodIndex, params)` | methods | — | Inspect available track groups and add a `TrackSelectionParameters`-based selection per period before calling `getDownloadRequest(...)`. |
| `DownloadRequest.Builder(id, uri)` | ctor | — | `id` is the app-chosen key used to look up the `Download` later; `.setStreamKeys(...)` (adaptive) or the helper's `getDownloadRequest` fills in tracks; `.setKeySetId(...)` carries an offline DRM license key set. |
| `DownloadNotificationHelper(context, channelId)` | ctor | — | Builds `buildProgressNotification` / `buildDownloadCompletedNotification` / `buildDownloadFailedNotification` for use as the `DownloadService` foreground notification. |
| `DownloadIndex.getDownload(id)` / `getDownloads(states...)` | methods | — | Persisted download state, survives process death; `getDownloads()` returns a `DownloadCursor` to iterate all downloads (optionally filtered by `@Download.State`). |

## Notes

- `DownloadService` requires a foreground-service declaration in the manifest (`FOREGROUND_SERVICE`, and on Android 14+ a typed permission such as `FOREGROUND_SERVICE_DATA_SYNC`) plus an `androidx.media3.exoplayer.downloadService.action.RESTART` intent filter so the system can restart it.
- Adding/removing/controlling downloads goes through the `DownloadService.sendAddDownload` / `sendRemoveDownload` / `sendSetStopReason` / `sendSetRequirements` / `sendPauseDownloads` / `sendResumeDownloads` static helpers rather than calling `DownloadManager` directly, so the call is routed through the service and its foreground state is kept consistent.
- `sendSetStopReason(..., stopReason, ...)` persists a stop (any non-zero reason survives restarts and resumes only when reset to `Download.STOP_REASON_NONE`), whereas `sendPauseDownloads()` / `sendResumeDownloads()` is a non-persisted, manager-wide pause.
- For adaptive streams, always play back via `downloadRequest.toMediaItem()` (or `download.request.toMediaItem()`) so the player's `streamKeys` match exactly what was downloaded; playback then goes through a `CacheDataSource.Factory` pointed at the same `Cache` instance used for the download (see Data sources and caching), with `setCacheWriteDataSinkFactory(null)` for read-only playback of already-downloaded content.
- `DownloadHelper` is only needed for adaptive formats where track selection matters; progressive (single-track) content can build a `DownloadRequest` directly from a `MediaItem`/URI.
- Artifact: `androidx.media3:media3-exoplayer` (`DownloadManager`, `DownloadService`, `DownloadHelper`, `DownloadNotificationHelper`, `DownloadIndex`, `DownloadRequest`, all in `androidx.media3.exoplayer.offline`).

## Related

- [DataSource.Factory and Caching](./data-source-cache.md)
- [MediaItem](./media-item.md)
- [TrackSelector and TrackSelectionParameters](./track-selection.md)
- [DRM](./drm.md)
