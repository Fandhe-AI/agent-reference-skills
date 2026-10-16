# Configuration / Configuration.Provider

Customizes WorkManager's initialization: executors, custom worker/input-merger factories, logging, and scheduler limits.

## Signature / Usage

```kotlin
public class Configuration internal constructor(builder: Builder) {
    public interface Provider {
        public val workManagerConfiguration: Configuration
    }

    public class Builder {
        public fun setWorkerFactory(workerFactory: WorkerFactory): Builder
        public fun setInputMergerFactory(inputMergerFactory: InputMergerFactory): Builder
        public fun setExecutor(executor: Executor): Builder
        public fun setTaskExecutor(taskExecutor: Executor): Builder
        public fun setJobSchedulerJobIdRange(minJobSchedulerId: Int, maxJobSchedulerId: Int): Builder
        public fun setMaxSchedulerLimit(maxSchedulerLimit: Int): Builder
        public fun setContentUriTriggerWorkersLimit(limit: Int): Builder
        public fun setMinimumLoggingLevel(loggingLevel: Int): Builder
        public fun setDefaultProcessName(processName: String): Builder
        public fun setRemoteSessionTimeoutMillis(@IntRange(from = 0, to = 1200000) timeoutMillis: Long): Builder
        @ExperimentalEventsApi
        public fun setExecutionEventListener(listener: ExecutionEventListener): Builder
        @ExperimentalEventsApi
        public fun setScheduleEventListener(listener: ScheduleEventListener): Builder
        @ExperimentalConfigurationApi
        public fun setGreedySchedulerEnabled(enabled: Boolean): Builder
        public fun build(): Configuration
    }
}
```

```kotlin
class MyApplication : Application(), Configuration.Provider {
    override val workManagerConfiguration: Configuration
        get() = Configuration.Builder()
            .setMinimumLoggingLevel(android.util.Log.INFO)
            .build()
}
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `setWorkerFactory(workerFactory)` | `(WorkerFactory) -> Builder` | default reflection-based factory | Custom logic for constructing `ListenableWorker` instances, e.g. for dependency injection. |
| `setInputMergerFactory(inputMergerFactory)` | `(InputMergerFactory) -> Builder` | default | Custom logic for constructing `InputMerger` instances. |
| `setExecutor(executor)` | `(Executor) -> Builder` | WorkManager default | Executor that runs `Worker.doWork()` (and optionally `CoroutineWorker`). |
| `setTaskExecutor(taskExecutor)` | `(Executor) -> Builder` | WorkManager default | Executor for WorkManager's internal book-keeping; should be a bounded pool. |
| `setJobSchedulerJobIdRange(min, max)` | `(Int, Int) -> Builder` | — | Restricts the `JobInfo` id range used by WorkManager; must span at least 1000 ids. |
| `setMaxSchedulerLimit(limit)` | `(Int) -> Builder` | platform default | Maximum simultaneous requests sent to `JobScheduler`/`AlarmManager`; minimum 20. |
| `setContentUriTriggerWorkersLimit(limit)` | `(Int) -> Builder` | — | Max number of workers with content URI triggers scheduled at once. |
| `setMinimumLoggingLevel(loggingLevel)` | `(Int) -> Builder` | `Log.INFO` | Minimum log level, using `android.util.Log` constants. |
| `setDefaultProcessName(processName)` | `(String) -> Builder` | main process | Designates which process WorkManager should schedule work in, for multi-process apps. |
| `setRemoteSessionTimeoutMillis(timeoutMillis)` | `(Long) -> Builder` | `RemoteWorkManager.DEFAULT_SESSION_TIMEOUT_MILLIS` | How long a `RemoteWorkManager` binding to the designated process stays active before unbinding; range 0 to 1200000 ms; 0 unbinds immediately after each call. Since 2.11.0. |
| `setExecutionEventListener(listener)` | `(ExecutionEventListener) -> Builder` | none | `@ExperimentalEventsApi`, since 2.12.0. Listens to work execution events for all workers; callbacks are invoked on a thread bound to `Configuration.taskExecutor`. |
| `setScheduleEventListener(listener)` | `(ScheduleEventListener) -> Builder` | none | `@ExperimentalEventsApi`, since 2.12.0. Listens to work scheduling events for all workers; callbacks are invoked on a thread bound to `Configuration.taskExecutor`. |
| `setGreedySchedulerEnabled(enabled)` | `(Boolean) -> Builder` | `true` | `@ExperimentalConfigurationApi`, since 2.12.0. Enabled by default and should only be disabled for experimental purposes. |

## Notes

- On-demand initialization: implement `Configuration.Provider` on your `Application` class and remove the default `WorkManagerInitializer` from the manifest (via `tools:node="remove"`) to move WorkManager init off the app-startup critical path.
- Before WorkManager 2.1.0, manual initialization used `WorkManager.initialize(context, configuration)` in `Application.onCreate()`.
- Always retrieve the instance via `WorkManager.getInstance(context)`.
- `@HiltWorker` / Hilt-based DI on top of `WorkerFactory` is documented in the `android-architecture` skill's `di-hilt` category.
- Since 2.12.0 the default configuration uses `Dispatchers.Default` instead of a custom thread pool (default executor: `Dispatchers.Default.limitedParallelism(...).asExecutor()`; default `taskExecutor`: `Dispatchers.Default.asExecutor()`).
- minSdk is API 24 since 2.12.0.
- Package: `androidx.work`.

## Related

- [Event listeners](./event-listeners.md)
- [Work analytics](./work-analytics.md)
- [WorkerFactory / DelegatingWorkerFactory](./worker-factory.md)
- [Data / workDataOf / InputMerger](./data.md)
- [Testing workers](./testing.md)
- [Multiprocess WorkManager](./multiprocess.md)
