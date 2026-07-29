# DownloadManager

A system service (`android.app.DownloadManager`) that handles long-running HTTP/HTTPS downloads in the background, outside the app's own process lifecycle. It queues requests, retries across connectivity changes, and can show a system notification with progress, making it a good fit for large-file downloads (APKs, media, backups) that must survive the app being killed.

## Signature / Usage

```kotlin
val manager = getSystemService(Context.DOWNLOAD_SERVICE) as DownloadManager

val request = DownloadManager.Request(Uri.parse("https://example.com/file.zip"))
    .setTitle("My Download")
    .setDescription("Downloading file...")
    .setNotificationVisibility(DownloadManager.Request.VISIBILITY_VISIBLE_NOTIFY_COMPLETED)
    .setDestinationInExternalFilesDir(context, Environment.DIRECTORY_DOWNLOADS, "file.zip")
    .setAllowedNetworkTypes(DownloadManager.Request.NETWORK_WIFI or DownloadManager.Request.NETWORK_MOBILE)

val downloadId = manager.enqueue(request)
```

```kotlin
// Listen for completion via broadcast
val receiver = object : BroadcastReceiver() {
    override fun onReceive(context: Context, intent: Intent) {
        val id = intent.getLongExtra(DownloadManager.EXTRA_DOWNLOAD_ID, -1)
        if (id == downloadId) {
            // query() the id for COLUMN_STATUS / COLUMN_LOCAL_URI
        }
    }
}
ContextCompat.registerReceiver(
    context,
    receiver,
    IntentFilter(DownloadManager.ACTION_DOWNLOAD_COMPLETE),
    ContextCompat.RECEIVER_EXPORTED,
)
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `DownloadManager.Request(uri)` | class | — | Describes one download; `uri` is the source. |
| `.setDestinationInExternalFilesDir(context, dir, subpath)` / `.setDestinationUri(uri)` | method | — | Sets where the completed file is written; required on API levels that restrict `setDestinationInExternalPublicDir`. |
| `.setNotificationVisibility(visibility)` | method | `VISIBILITY_VISIBLE` | `VISIBILITY_HIDDEN`, `VISIBILITY_VISIBLE`, or `VISIBILITY_VISIBLE_NOTIFY_COMPLETED`. |
| `.setAllowedNetworkTypes(flags)` | method | both | Bitmask of `NETWORK_WIFI` / `NETWORK_MOBILE`. |
| `.setAllowedOverRoaming(allowed)` | method | `true` | Whether the download may proceed while roaming. |
| `.addRequestHeader(name, value)` | method | — | Adds a request header (e.g. `Authorization`). |
| `manager.enqueue(request)` | method | — | Queues the download; returns a `Long` download ID. |
| `manager.query(Query().setFilterById(id))` | method | — | Returns a `Cursor` with columns such as `COLUMN_STATUS`, `COLUMN_REASON`, `COLUMN_BYTES_DOWNLOADED_SO_FAR`, `COLUMN_TOTAL_SIZE_BYTES`, `COLUMN_LOCAL_URI`. |
| `manager.remove(vararg ids)` | method | — | Cancels/removes downloads and deletes their files. |
| `manager.getUriForDownloadedFile(id)` | method | — | Returns a content `Uri` for a completed download. |
| `ACTION_DOWNLOAD_COMPLETE` | broadcast | — | Sent when a download finishes (success or failure); carries `EXTRA_DOWNLOAD_ID`. |

## Notes

- Downloads run in a separate system process, so they continue even if the requesting app is killed; this is the key difference from doing the transfer with Retrofit/OkHttp/Cronet directly in-process.
- `STATUS_SUCCESSFUL`, `STATUS_FAILED`, `STATUS_PAUSED`, `STATUS_PENDING`, `STATUS_RUNNING` are read from the `COLUMN_STATUS` column of the `query()` cursor; `COLUMN_REASON` gives an error/pause reason code when the status is `STATUS_FAILED` or `STATUS_PAUSED`.
- On Android 14 (API 34)+, registering a receiver for a broadcast an app does not itself send requires declaring whether it is exported; use `ContextCompat.registerReceiver(context, receiver, filter, ContextCompat.RECEIVER_EXPORTED)` so the call also compiles below API 33.
- For downloads the app fully controls in-process (retry policy, progress callbacks tied to a ViewModel), prefer WorkManager driving Retrofit/OkHttp instead; `DownloadManager` is best when the OS-managed queue, notification UI, and cross-process persistence are wanted as-is.
- Not related to Jetpack; it is a platform service available since API 9 with no AndroidX equivalent.
- Distinct from `androidx.media3.exoplayer.offline.DownloadManager`, Media3's own offline-download coordinator (covered in android-media-camera); this page is the platform `android.app.DownloadManager` system service.

## Related

- [OkHttp](./okhttp.md)
- [Retrofit](./retrofit.md)
- [Caching, Timeouts, Error Handling, and Retries](./caching-and-retry.md)
