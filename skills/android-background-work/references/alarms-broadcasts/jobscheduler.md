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
| `JobInfo.Builder.setBackoffCriteria(long, int)` | builder method | — | Retry policy (`LINEAR` or `EXPONENTIAL`) with an initial backoff delay. |

## Notes

- Jobs run on the app's main thread; offload actual work to another thread and call `jobFinished()` when done.
- In most cases, prefer **WorkManager** over the raw `JobScheduler`/`JobInfo` API for background work; WorkManager provides backward compatibility and a more flexible constraint/chaining API. See the [workmanager README](../workmanager/README.md) for `Worker`/`Constraints`.
- User-initiated jobs must post a notification within about 10 seconds of starting to avoid an ANR-like penalty; see [User-initiated data transfer jobs](./user-initiated-data-transfer.md) for the `setUserInitiated`/stop-reason API surface.
- `JobScheduler`-scheduled jobs (and WorkManager, which is built on it) are deferred during Doze — see [Doze and App Standby](./doze-app-standby.md).

## Related

- [Doze and App Standby](./doze-app-standby.md)
- [AlarmManager](./alarmmanager.md)
- [User-initiated data transfer jobs](./user-initiated-data-transfer.md)
