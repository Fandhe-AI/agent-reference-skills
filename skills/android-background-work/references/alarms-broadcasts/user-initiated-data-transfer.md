# User-Initiated Data Transfer Jobs

`JobScheduler` job type (Android 14 / API 34+) for user-initiated, long-running data transfers (e.g. large file downloads/uploads) that must start immediately and run under a mandatory foreground notification rather than waiting for standard `JobScheduler` constraints.

## Signature / Usage

```kotlin
val jobInfo = JobInfo.Builder(jobId, ComponentName(context, CustomTransferService::class.java))
    .setUserInitiated(true)
    .setRequiredNetwork(networkRequestBuilder.build())
    .setEstimatedNetworkBytes(1024 * 1024 * 1024, 1024 * 1024 * 1024)
    .build()

context.getSystemService(JobScheduler::class.java).schedule(jobInfo)
```

```kotlin
class CustomTransferService : JobService() {
    override fun onStartJob(params: JobParameters): Boolean {
        val notification = Notification.Builder(applicationContext, NOTIFICATION_CHANNEL_ID)
            .setContentTitle("My user-initiated data transfer job")
            .setSmallIcon(android.R.mipmap.myicon)
            .build()
        setNotification(params, NOTIFICATION_ID, notification,
            JobService.JOB_END_NOTIFICATION_POLICY_DETACH)
        scope.launch { doDownload(params) }
        return true
    }

    override fun onStopJob(params: JobParameters): Boolean {
        val stopReason = params.stopReason
        return true // reschedule
    }
}
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `JobInfo.Builder.setUserInitiated(boolean)` | builder method | `false` | Marks the job as user-initiated data transfer (UIDT); requires API 34+. The job runs immediately rather than waiting on standard `JobScheduler` scheduling constraints. |
| `JobService.setNotification(params, notificationId, notification, notificationPolicy)` | method | — | Must be called within about 10 seconds of `onStartJob()` starting, or the system treats the job like it never posted a required notification. |
| `JobService.JOB_END_NOTIFICATION_POLICY_DETACH` | constant | — | Leaves the notification visible/detached from the job's lifecycle after the job ends. |
| `JobParameters.getStopReason()` | method | — | Returns the `STOP_REASON_*` int explaining why the system stopped the job; call from `onStopJob()` to log/handle the interruption. |
| `android.permission.RUN_USER_INITIATED_JOBS` | manifest permission | — | Required to schedule a UIDT job. |
| `JobInfo.Builder.setEstimatedNetworkBytes(download, upload)` | builder method | — | Declares expected transfer size; `updateEstimatedNetworkBytes()` can refine it later if the size becomes known mid-transfer. |

## Notes

- No Jetpack/WorkManager support as of this writing; apps must gate on `Build.VERSION.SDK_INT >= Build.VERSION_CODES.UPSIDE_DOWN_CAKE` and fall back to a WorkManager long-running (foreground-service) worker on older versions. See [ForegroundInfo and Long-Running Workers](../workmanager/foreground-work.md) for that fallback.
- Allowed `JobInfo.Builder` constraints are narrower than plain `JobScheduler` jobs: `setBackoffCriteria`, `setClipData`, `setEstimatedNetworkBytes`/`updateEstimatedNetworkBytes`, `setMinimumNetworkChunkBytes`, `setPersisted`, `setNamespace`, `setRequiredNetwork`/`setRequiredNetworkType`, `setRequiresBatteryNotLow`, `setRequiresCharging`, `setRequiresStorageNotLow`.
- Test with `adb shell cmd jobscheduler run -f <package> <jobId>` to force-run, or `adb shell cmd jobscheduler timeout <package> <jobId>` to simulate a system-initiated stop.

## Related

- [JobScheduler](./jobscheduler.md)
- [Doze and App Standby](./doze-app-standby.md)
