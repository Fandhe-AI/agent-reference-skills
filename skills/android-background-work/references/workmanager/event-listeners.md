# ExecutionEventListener / ScheduleEventListener

Experimental listener interfaces that receive callbacks for work execution events (started / stopped / finished / exception) and work scheduling events (enqueued / updated / unblocked / cancelled / prerequisite failed) for all workers.

## Signature / Usage

```kotlin
@ExperimentalEventsApi
public interface ExecutionEventListener {
    public suspend fun onStarted(workInfo: WorkInfo)
    public suspend fun onStopped(@StopReason stopReason: Int, workInfo: WorkInfo)
    public suspend fun onFinished(result: Result, workInfo: WorkInfo)
    public suspend fun onException(throwable: Throwable, workInfo: WorkInfo)
}

@ExperimentalEventsApi
public interface ScheduleEventListener {
    public suspend fun onEnqueued(workInfo: WorkInfo) {}
    public suspend fun onUpdated(oldWorkInfo: WorkInfo, updatedWorkInfo: WorkInfo) {}
    public suspend fun onUnblocked(workInfo: WorkInfo) {}
    public suspend fun onCancelled(workInfo: WorkInfo) {}
    public suspend fun onPrerequisiteFailed(workInfo: WorkInfo) {}
}
```

Register on `Configuration.Builder`:

```kotlin
Configuration.Builder()
    .setExecutionEventListener(executionListener)
    .setScheduleEventListener(scheduleListener)
    .build()
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `ExecutionEventListener.onStarted` | `suspend (WorkInfo)` | Called when a work request starts executing, i.e. `ListenableWorker.startWork`. |
| `ExecutionEventListener.onStopped` | `suspend (Int, WorkInfo)` | Called when the system stops the work after it has started; `stopReason` is the reason why work stopped. |
| `ExecutionEventListener.onFinished` | `suspend (Result, WorkInfo)` | Called when the worker finishes and returns a value. |
| `ExecutionEventListener.onException` | `suspend (Throwable, WorkInfo)` | Called when the work request fails from an exception after it has started. |
| `ScheduleEventListener.onEnqueued` | `suspend (WorkInfo)` | Called when a work request is enqueued from the app, e.g. `WorkManager.enqueue`. |
| `ScheduleEventListener.onUpdated` | `suspend (WorkInfo, WorkInfo)` | Called when a work request is updated from the app, e.g. `WorkManager.updateWork`; receives the info before and after the update. |
| `ScheduleEventListener.onUnblocked` | `suspend (WorkInfo)` | Called when a work request is no longer waiting on any prerequisite work; with no prerequisites it is called immediately after `onEnqueued`. |
| `ScheduleEventListener.onCancelled` | `suspend (WorkInfo)` | Called when a work request is canceled from the app, e.g. `WorkManager.cancelWorkById`. |
| `ScheduleEventListener.onPrerequisiteFailed` | `suspend (WorkInfo)` | Called when a work request fails because a prerequisite work fails. |
| `Configuration.Builder.setExecutionEventListener` | `(ExecutionEventListener) -> Builder` | Sets the listener for execution events of any worker. |
| `Configuration.Builder.setScheduleEventListener` | `(ScheduleEventListener) -> Builder` | Sets the listener for scheduling events of any worker. |

## Notes

- Both interfaces and the builder setters are annotated `@ExperimentalEventsApi` (opt-in, warning level).
- `ExecutionEventListener` methods have no default bodies; all `ScheduleEventListener` methods default to empty.
- A given work request may have multiple executions due to stops and retries.
- Callbacks are invoked on a thread bound to `Configuration.taskExecutor`.
- `Configuration` exposes `getExecutionEventListener()` / `getScheduleEventListener()`.
- `WorkMetricsInfoRepository` (work-analytics) implements both interfaces.
- Source: androidx `work-runtime` at AOSP commit `cbf5ea2a1e5a`; listed under WorkManager 2.12.0 at https://developer.android.com/jetpack/androidx/releases/work#2.12.0.

## Related

- [Configuration](./configuration.md)
- [WorkInfo](./workinfo.md)
- [Work Metrics](./work-analytics.md)
