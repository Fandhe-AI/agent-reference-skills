# workmanager

| Name | Description | Path |
|------|-------------|------|
| Worker / ListenableWorker / Result | Base classes for defining background work and the result returned from `doWork()`. | [worker.md](./worker.md) |
| CoroutineWorker | Recommended Kotlin coroutine-based `ListenableWorker` implementation. | [coroutineworker.md](./coroutineworker.md) |
| WorkRequest / OneTimeWorkRequest | Base request type and its non-repeating implementation, with retry/constraint/tag options. | [workrequest.md](./workrequest.md) |
| PeriodicWorkRequest | Repeating `WorkRequest` implementation with minimum interval and flex window. | [periodicworkrequest.md](./periodicworkrequest.md) |
| WorkManager | Singleton entry point for enqueueing, chaining, querying, and cancelling work. | [workmanager.md](./workmanager.md) |
| Constraints / NetworkType | Execution-condition requirements (network, charging, idle, storage, content URI). | [constraints.md](./constraints.md) |
| BackoffPolicy and retry | Retry backoff strategy for `Result.retry()`. | [backoffpolicy.md](./backoffpolicy.md) |
| Data / workDataOf / InputMerger | Worker input/output container and strategies for merging multiple parent outputs. | [data.md](./data.md) |
| WorkInfo / WorkInfo.State | Status snapshot returned by WorkManager's query/observe APIs. | [workinfo.md](./workinfo.md) |
| WorkContinuation | Chain of dependent `OneTimeWorkRequest`s built via `beginWith()` / `then()`. | [workcontinuation.md](./workcontinuation.md) |
| ExistingWorkPolicy / ExistingPeriodicWorkPolicy | Conflict-resolution policies for uniquely-named work. | [existingworkpolicy.md](./existingworkpolicy.md) |
| ForegroundInfo and long-running workers | Running workers over 10 minutes as a foreground service with a notification. | [foreground-work.md](./foreground-work.md) |
| OutOfQuotaPolicy and expedited work | Fallback behavior for expedited work requests when quota is exhausted. | [outofquotapolicy.md](./outofquotapolicy.md) |
| Configuration / Configuration.Provider | Customizes WorkManager initialization, executors, and factories. | [configuration.md](./configuration.md) |
| WorkerFactory / DelegatingWorkerFactory | Pluggable factory for constructing `ListenableWorker` instances (DI support). | [worker-factory.md](./worker-factory.md) |
| Threading in WorkManager | How Worker/CoroutineWorker/RxWorker/ListenableWorker execute in the background. | [threading.md](./threading.md) |
| Testing WorkManager | Unit- and integration-testing workers with `TestListenableWorkerBuilder` / `WorkManagerTestInitHelper`. | [testing.md](./testing.md) |
