# JobScheduler

Platform API (`android.app.job`) for scheduling background jobs against system-defined constraints (network, charging, idle, etc.), implemented as a `JobService`.

## Signature / Usage

```java
public abstract class JobService extends Service {
    public abstract boolean onStartJob(JobParameters params);
    public abstract boolean onStopJob(JobParameters params);
    public final void jobFinished(JobParameters params, boolean wantsReschedule);
}
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `onStartJob(params)` | abstract method | — | Called on the main thread when the job's constraints are met; return `true` if work continues on another thread, `false` if already finished. |
| `onStopJob(params)` | abstract method | — | Called if the system must stop the job before completion (e.g. constraints no longer met); return `true` to reschedule, `false` to end it. |
| `jobFinished(params, wantsReschedule)` | method | — | Signals the job is complete and releases the held wakelock; `wantsReschedule = true` reschedules per backoff policy. |
| `PERMISSION_BIND` | `String` constant | — | `android.permission.BIND_JOB_SERVICE`, required by the `<service>` manifest entry for a `JobService`. |
| `JobInfo.Builder.setRequiredNetworkType(int)` | builder method | — | Requires a network type (e.g. any, unmetered, not-roaming) before the job runs. |
| `JobInfo.Builder.setRequiresCharging(boolean)` | builder method | `false` | Requires the device to be charging/on power. |
| `JobInfo.Builder.setRequiresDeviceIdle(boolean)` | builder method | `false` | Restricts execution to when the device is idle. |
| `JobInfo.Builder.setPeriodic(long)` / `setPeriodic(long, long)` | builder method | — | Configures a recurring job at the given interval (optionally with a flex window). |
| `JobInfo.Builder.setMinimumLatency(long)` | builder method | — | Minimum delay before a one-time job becomes eligible to run. |
| `JobInfo.Builder.setBackoffCriteria(long, int)` | builder method | — | Retry policy (`JobInfo.BACKOFF_POLICY_LINEAR` or `JobInfo.BACKOFF_POLICY_EXPONENTIAL`) with an initial backoff delay. |
| `JobScheduler.getPendingJobReasonsHistory(int jobId)` | method (API 36+) | — | Returns a `List<PendingJobReasonsInfo>` history of unsatisfied constraints for the given job id, to help diagnose why it has not executed; not persisted across reboots. |
| `STOP_REASON_TIMEOUT_ABANDONED` | `int` constant (API 36+) | — | Stop reason returned by `JobParameters.getStopReason()` when the job times out while its `JobParameters` has been garbage-collected without a `jobFinished()` call ("abandoned job"), instead of the generic `STOP_REASON_TIMEOUT`. |
| `JobInfo.Builder.setImportantWhileForeground(boolean)` | builder method | — | Deprecated since API 31; starting in Android 16 (API 36) the call is ignored entirely and `JobInfo#isImportantWhileForeground()` always returns `false`. |

## Notes

- Jobs run on the app's main thread; offload actual work to another thread and call `jobFinished()` when done.
- In most cases, prefer **WorkManager** over the raw `JobScheduler`/`JobInfo` API for background work; WorkManager provides backward compatibility and a more flexible constraint/chaining API. See the [workmanager README](../workmanager/README.md) for `Worker`/`Constraints`.
- User-initiated jobs must post a notification within about 10 seconds of starting to avoid an ANR-like penalty; see [User-initiated data transfer jobs](./user-initiated-data-transfer.md) for the `setUserInitiated`/stop-reason API surface.
- `JobScheduler`-scheduled jobs (and WorkManager, which is built on it) are deferred during Doze — see [Doze and App Standby](./doze-app-standby.md).
- On Android 16 (API 36), job runtime quotas are now enforced for jobs started while the app is in the top state and continuing after it becomes invisible, and for jobs executing concurrently with a foreground service; this change impacts tasks scheduled using WorkManager, JobScheduler, and `DownloadManager`. If you're leveraging jobs for user-initiated data transfer, consider using user-initiated data transfer jobs instead. Test the pre-Android-16 behavior via `adb shell am compat enable OVERRIDE_QUOTA_ENFORCEMENT_TO_TOP_STARTED_JOBS <package>` and `OVERRIDE_QUOTA_ENFORCEMENT_TO_FGS_JOBS <package>`.
- Also on Android 16, jobs that time out while their `JobParameters` has been garbage-collected without a `jobFinished()` call ("abandoned jobs") now get `STOP_REASON_TIMEOUT_ABANDONED` (visible via `JobParameters.getStopReason()`) instead of the generic `STOP_REASON_TIMEOUT`; use the new `getPendingJobReasonsHistory()` to understand why a job hasn't run.

## Related

- [Doze and App Standby](./doze-app-standby.md)
- [AlarmManager](./alarmmanager.md)
- [User-initiated data transfer jobs](./user-initiated-data-transfer.md)
