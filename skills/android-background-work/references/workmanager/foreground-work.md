# ForegroundInfo and Long-Running Workers

Support for workers that run longer than 10 minutes under a foreground service managed by WorkManager, backed by a user-visible notification.

## Signature / Usage

```java
public final class ForegroundInfo {
    public ForegroundInfo(int notificationId, Notification notification)
    public ForegroundInfo(int notificationId, Notification notification, int foregroundServiceType)
}
```

```kotlin
class DownloadWorker(context: Context, parameters: WorkerParameters) :
    CoroutineWorker(context, parameters) {

    override suspend fun doWork(): Result {
        val inputUrl = inputData.getString(KEY_INPUT_URL) ?: return Result.failure()
        setForeground(createForegroundInfo("Starting Download"))
        download(inputUrl)
        return Result.success()
    }

    private fun createForegroundInfo(progress: String): ForegroundInfo {
        val cancel = WorkManager.getInstance(applicationContext).createCancelPendingIntent(id)
        val notification = NotificationCompat.Builder(applicationContext, CHANNEL_ID)
            .setContentTitle("Downloading")
            .setContentText(progress)
            .setSmallIcon(R.drawable.ic_work_notification)
            .setOngoing(true)
            .addAction(android.R.drawable.ic_delete, "Cancel", cancel)
            .build()
        return ForegroundInfo(NOTIFICATION_ID, notification)
    }
}
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `ForegroundInfo(notificationId, notification)` | constructor | `foregroundServiceType = 0` | Notification shown while the worker runs as a foreground service; on API 29+ prefer the 3-arg constructor to declare a service type. |
| `ForegroundInfo(notificationId, notification, foregroundServiceType)` | constructor | — | Same as above, explicitly declaring the foreground service type (see `android.app.Service#startForeground`). |
| `CoroutineWorker.setForeground(foregroundInfo)` | `suspend (ForegroundInfo) -> Unit` | — | Marks the worker as long-running; throws `IllegalStateException` if the process is subject to foreground service restrictions. |
| `Worker` / `ListenableWorker.setForegroundAsync(foregroundInfo)` | `(ForegroundInfo) -> ListenableFuture<Void>` | — | Same as `setForeground`, for non-coroutine workers. |
| `WorkManager.createCancelPendingIntent(id)` | `(UUID) -> PendingIntent` | — | Produces a `PendingIntent` that cancels the worker, for use as a notification action. |

## Notes

- Use cases: bulk uploads/downloads that cannot be chunked, local ML processing, and other tasks important enough to interrupt Doze/background restrictions.
- Notification channels (Android 8+, API 26+) are required before posting the notification.
- Targeting Android 14 (API 34)+ requires declaring the foreground service type both in the manifest (`android:foregroundServiceType` on `androidx.work.impl.foreground.SystemForegroundService`) and at runtime via the 3-arg `ForegroundInfo` constructor.
- On Android 16, long-running workers using foreground services consume the app's job quota; consider user-initiated data transfer jobs for user-initiated transfers instead.
- For notification content construction itself (`NotificationCompat`), see the `notifications` category of the `android-platform-core` skill.
- Package: `androidx.work`.

## Related

- [Worker / ListenableWorker / Result](./worker.md)
- [CoroutineWorker](./coroutineworker.md)
- [OutOfQuotaPolicy and expedited work](./outofquotapolicy.md)
