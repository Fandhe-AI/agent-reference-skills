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

## Notes

- On-demand initialization: implement `Configuration.Provider` on your `Application` class and remove the default `WorkManagerInitializer` from the manifest (via `tools:node="remove"`) to move WorkManager init off the app-startup critical path.
- Before WorkManager 2.1.0, manual initialization used `WorkManager.initialize(context, configuration)` in `Application.onCreate()`.
- Always retrieve the instance via `WorkManager.getInstance(context)`.
- `@HiltWorker` / Hilt-based DI on top of `WorkerFactory` is documented in the `android-architecture` skill's `di-hilt` category.
- Package: `androidx.work`.

## Related

- [WorkerFactory / DelegatingWorkerFactory](./worker-factory.md)
- [Data / workDataOf / InputMerger](./data.md)
- [Testing workers](./testing.md)
