# Support for Long-Running Workers

How-to guide for workers that run longer than 10 minutes, walking through `setForeground`/`setForegroundAsync`, manifest declarations, and per-API-level foreground service type requirements.

## Signature / Usage

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
            .setOngoing(true)
            .addAction(android.R.drawable.ic_delete, "Cancel", cancel)
            .build()
        return ForegroundInfo(NOTIFICATION_ID, notification,
            FOREGROUND_SERVICE_TYPE_LOCATION or FOREGROUND_SERVICE_TYPE_MICROPHONE)
    }
}
```

```xml
<service
   android:name="androidx.work.impl.foreground.SystemForegroundService"
   android:foregroundServiceType="location|microphone"
   tools:node="merge" />
```

## Options / Props

| API Level | Requirement |
|-----------|-------------|
| Android 10+ (API 29) | Foreground service type required if accessing **location**. |
| Android 11+ (API 30) | Foreground service type required if accessing **camera** or **microphone**. |
| Android 14+ (API 34) | Foreground service type declaration is **required** both in the manifest and via the 3-arg `ForegroundInfo` constructor at runtime. |
| Android 16 | Long-running workers using foreground services now consume the app's job quota; if exhausted, launch the foreground service directly, or use a user-initiated data transfer job for transfer use cases. |

## Notes

- Use cases: bulk uploads/downloads that cannot be chunked, local ML model processing, and other tasks important enough to interrupt Doze/background restrictions.
- WorkManager manages the underlying foreground service (`androidx.work.impl.foreground.SystemForegroundService`) for you and shows a configurable notification while the worker runs.
- The `ForegroundInfo` type, `setForeground`/`setForegroundAsync` signatures, and `createCancelPendingIntent` are already documented on [ForegroundInfo and Long-Running Workers](./foreground-work.md); this page is the task-oriented how-to walkthrough (manifest wiring, per-API-level type requirements, Android 16 quota guidance) for the same feature.
- Package: `androidx.work`.

## Related

- [ForegroundInfo and Long-Running Workers](./foreground-work.md)
- [CoroutineWorker](./coroutineworker.md)
- [OutOfQuotaPolicy and Expedited Work](./outofquotapolicy.md)
