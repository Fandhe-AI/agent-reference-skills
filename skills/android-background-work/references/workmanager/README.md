# workmanager

| Name | Description | Path |
|------|-------------|------|
| BackoffPolicy and Retry | Retry backoff strategy applied when a worker returns `Result.retry()` or throws, configured via `WorkRequest.Builder.setBackoffCriteria`. | [backoffpolicy.md](./backoffpolicy.md) |
| Configuration / Configuration.Provider | Customizes WorkManager's initialization: executors, custom worker/input-merger factories, logging, and scheduler limits. | [configuration.md](./configuration.md) |
| Constraints / NetworkType | Optimal-condition requirements (network, charging, idle, storage, content URI triggers) that must be met before a `WorkRequest` runs. | [constraints.md](./constraints.md) |
| CoroutineWorker | Recommended `ListenableWorker` implementation for Kotlin, exposing a suspending `doWork()` function. | [coroutineworker.md](./coroutineworker.md) |
| Data / workDataOf / InputMerger | Persistable key-value container used for worker input/output, plus the strategies used to merge multiple parent outputs into one child input. | [data.md](./data.md) |
| Debug WorkManager / Background Task Inspector | Android Studio's Background Task Inspector lists, cancels, and graphs `WorkManager` workers (and Jobs/Alarms/Wakelocks) running on a connected device or emulator. | [debugging.md](./debugging.md) |
| ExistingWorkPolicy / ExistingPeriodicWorkPolicy | Conflict-resolution strategies applied when enqueueing unique work under a name that may already have pending work. | [existingworkpolicy.md](./existingworkpolicy.md) |
| ForegroundInfo and Long-Running Workers | Support for workers that run longer than 10 minutes under a foreground service managed by WorkManager, backed by a user-visible notification. | [foreground-work.md](./foreground-work.md) |
| Migrate from FirebaseJobDispatcher / GcmNetworkManager | Official mapping guides for moving off the two deprecated pre-WorkManager job schedulers onto `Worker`/`WorkRequest`. Both source libraries are deprecated; WorkManager is the only currently maintained option and already unifies `JobScheduler`/`AlarmManager`/Firebase JobDispatcher/GCMNetworkManager scheduling under one API back to API 14. | [migrate-legacy-schedulers.md](./migrate-legacy-schedulers.md) |
| Multiprocess WorkManager | APIs from the `androidx.work:work-multiprocess` artifact for multi-process apps: binding individual workers to a specific process, and enqueueing/querying/cancelling work from any process via `RemoteWorkManager`. Available since WorkManager 2.6 (`RemoteListenableWorker`/`RemoteCoroutineWorker`) and 2.7 (`RemoteWorkManager`). | [multiprocess.md](./multiprocess.md) |
| Operation | Return type of `WorkManager.enqueue*`, `cancel*`, and `pruneWork()` calls; represents the asynchronous WorkManager database write itself (not the eventual work execution). | [operation.md](./operation.md) |
| OutOfQuotaPolicy and Expedited Work | Fallback behavior for expedited work requests when the app has exhausted its expedited job quota. | [outofquotapolicy.md](./outofquotapolicy.md) |
| PeriodicWorkRequest | `WorkRequest` implementation for work that repeats on a fixed interval, optionally within a flex window. | [periodicworkrequest.md](./periodicworkrequest.md) |
| RxWorker | RxJava interoperability `ListenableWorker` implementation: override `createWork()` to return a `Single<Result>` instead of implementing a blocking or suspending `doWork()`. | [rxworker.md](./rxworker.md) |
| Testing WorkManager | Unit-testing individual workers with `TestWorkerBuilder` / `TestListenableWorkerBuilder`, and integration-testing full WorkManager behavior with `WorkManagerTestInitHelper`. | [testing.md](./testing.md) |
| Threading in WorkManager | Overview of how the four worker primitives (`Worker`, `CoroutineWorker`, `RxWorker`, `ListenableWorker`) execute in the background. | [threading.md](./threading.md) |
| WorkManager.updateWork() | Replaces the definition of an already-enqueued `WorkRequest` in place — preserving its enqueue time (and, for periodic work, its scheduling alignment) instead of cancelling and re-enqueueing a new request. Available since WorkManager 2.8.0. | [update-work.md](./update-work.md) |
| Worker / ListenableWorker / Result | Base classes for defining background work executed by WorkManager, and the result type returned from execution. | [worker.md](./worker.md) |
| WorkerFactory / DelegatingWorkerFactory | Pluggable factory for constructing `ListenableWorker` instances, used to support dependency injection into workers. | [worker-factory.md](./worker-factory.md) |
| WorkInfo / WorkInfo.State | Snapshot of a `WorkRequest`'s current status, output data, and progress, returned by WorkManager's query/observe APIs. | [workinfo.md](./workinfo.md) |
| WorkManager | Singleton entry point for enqueueing, chaining, querying, and cancelling scheduled work. | [workmanager.md](./workmanager.md) |
| WorkQuery | Specification for combined multi-criteria querying of `WorkRequest`s by ids, unique names, tags, and states in a single call, used with `WorkManager.getWorkInfos()` / `getWorkInfosLiveData()` / `getWorkInfosFlow()`. | [workquery.md](./workquery.md) |
| WorkRequest / OneTimeWorkRequest | Base class describing a unit of scheduled work (constraints, retry policy, tags, input data), and its non-repeating implementation. | [workrequest.md](./workrequest.md) |
| WorkContinuation | Represents a chain of dependent `OneTimeWorkRequest`s created via `WorkManager.beginWith()` / `beginUniqueWork()`. | [workcontinuation.md](./workcontinuation.md) |
