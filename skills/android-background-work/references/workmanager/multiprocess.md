# Multiprocess WorkManager (RemoteWorkManager / RemoteListenableWorker / RemoteCoroutineWorker)

APIs from the `androidx.work:work-multiprocess` artifact for multi-process apps: binding individual workers to a specific process, and enqueueing/querying/cancelling work from any process via `RemoteWorkManager`. `RemoteWorkManager` is available since WorkManager 2.5.0; `RemoteListenableWorker`/`RemoteCoroutineWorker` since 2.6.0.

## Signature / Usage

```kotlin
public abstract class RemoteWorkManager {
    public abstract fun enqueue(request: WorkRequest): ListenableFuture<Void>
    public abstract fun enqueueUniqueWork(
        uniqueWorkName: String,
        existingWorkPolicy: ExistingWorkPolicy,
        work: List<OneTimeWorkRequest>,
    ): ListenableFuture<Void>
    public abstract fun enqueueUniquePeriodicWork(
        uniqueWorkName: String,
        existingPeriodicWorkPolicy: ExistingPeriodicWorkPolicy,
        periodicWork: PeriodicWorkRequest,
    ): ListenableFuture<Void>
    public abstract fun cancelWorkById(id: UUID): ListenableFuture<Void>
    public abstract fun cancelAllWorkByTag(tag: String): ListenableFuture<Void>
    public abstract fun cancelUniqueWork(uniqueWorkName: String): ListenableFuture<Void>
    public abstract fun cancelAllWork(): ListenableFuture<Void>
    public abstract fun getWorkInfos(workQuery: WorkQuery): ListenableFuture<List<WorkInfo>>

    public companion object {
        public fun getInstance(context: Context): RemoteWorkManager
    }
}

// A worker bound to run in a specific remote process
public abstract class RemoteCoroutineWorker(context: Context, params: WorkerParameters) :
    RemoteListenableWorker(context, params)
```

```kotlin
// AndroidManifest.xml: declare a process for each remote worker service
// <service
//     android:name="androidx.work.multiprocess.RemoteWorkerService"
//     android:exported="false"
//     android:process=":worker1" />

val componentName = ComponentName(packageName, RemoteWorkerService::class.java.name)
val data = Data.Builder()
    .putString(RemoteListenableWorker.ARGUMENT_PACKAGE_NAME, componentName.packageName)
    .putString(RemoteListenableWorker.ARGUMENT_CLASS_NAME, componentName.className)
    .build()

val request = OneTimeWorkRequestBuilder<ExampleRemoteCoroutineWorker>()
    .setInputData(data)
    .build()

// Enqueues via the process designated by RemoteWorkerService, regardless of the caller's process
RemoteWorkManager.getInstance(context).enqueue(request)
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `RemoteWorkManager.getInstance(context)` | static | — | Obtains the singleton; the counterpart of `WorkManager.getInstance()` for multi-process apps. |
| `RemoteWorkManager.enqueue* / cancel* / getWorkInfos` | subset of `WorkManager` | — | Same semantics as their `WorkManager` equivalents, but every call is dispatched (via AIDL binding) to the process designated by the target worker's `RemoteWorkerService`, returning `ListenableFuture<Void>` instead of `Operation`. |
| `RemoteListenableWorker.ARGUMENT_PACKAGE_NAME` | `Data` key | — | Package name of the process running the remote worker's `RemoteWorkerService`; required input data. |
| `RemoteListenableWorker.ARGUMENT_CLASS_NAME` | `Data` key | — | Fully qualified class name of the `RemoteWorkerService` to bind to; required input data. |
| `RemoteCoroutineWorker` | class | — | Kotlin-coroutine counterpart of `RemoteListenableWorker`; use this over `RemoteListenableWorker` directly when the worker body is written in Kotlin. |

## Notes

- Motivation: with a single default-process `WorkManager` instance, apps that run components across multiple processes suffer SQLite lock contention and duplicate job reconciliation. `work-multiprocess` designates one process to own the WorkManager database and routes all other processes' calls to it over AIDL.
- Each remote worker needs its own `RemoteWorkerService` (or a subclass) declared in the manifest with `android:process` set to the target process, matching `ARGUMENT_CLASS_NAME`/`ARGUMENT_PACKAGE_NAME`.
- `Configuration.Builder.setDefaultProcessName()` (see [Configuration](./configuration.md)) designates the single process that owns the default `WorkManager` database; `work-multiprocess` builds on top of that to reach it from other processes.
- Gradle: `androidx.work:work-multiprocess:<version>`, in addition to `work-runtime`/`work-runtime-ktx`.
- Package: `androidx.work.multiprocess`.

## Related

- [Configuration / Configuration.Provider](./configuration.md)
- [Threading in WorkManager](./threading.md)
- [WorkQuery](./workquery.md)
