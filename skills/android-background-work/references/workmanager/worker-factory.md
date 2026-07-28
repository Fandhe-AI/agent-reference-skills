# WorkerFactory / DelegatingWorkerFactory

Pluggable factory for constructing `ListenableWorker` instances, used to support dependency injection into workers.

## Signature / Usage

```kotlin
public abstract class WorkerFactory {
    public abstract fun createWorker(
        appContext: Context,
        workerClassName: String,
        workerParameters: WorkerParameters,
    ): ListenableWorker?
}

public open class DelegatingWorkerFactory : WorkerFactory() {
    public fun addFactory(workerFactory: WorkerFactory)
    final override fun createWorker(
        appContext: Context,
        workerClassName: String,
        workerParameters: WorkerParameters,
    ): ListenableWorker?
}
```

```kotlin
class MyWorkerFactory : WorkerFactory() {
    override fun createWorker(
        appContext: Context,
        workerClassName: String,
        workerParameters: WorkerParameters,
    ): ListenableWorker? {
        return if (workerClassName == MyWorker::class.java.name) {
            MyWorker(appContext, workerParameters, myDependency)
        } else {
            null // delegate to the default factory
        }
    }
}
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `createWorker(appContext, workerClassName, workerParameters)` | `(Context, String, WorkerParameters) -> ListenableWorker?` | — | Override to implement custom worker construction; return `null` to delegate to the default reflection-based factory. |
| `DelegatingWorkerFactory.addFactory(workerFactory)` | `(WorkerFactory) -> Unit` | — | Registers a `WorkerFactory` as a delegate; delegates are invoked in registration order until one returns non-null. |

## Notes

- Throwing from `createWorker` prevents worker creation entirely; returning `null` instead allows fallback to the next delegate or the default factory.
- The returned worker instance must be newly created and never previously returned/invoked, or WorkManager throws `IllegalStateException`.
- Register via `Configuration.Builder.setWorkerFactory(...)` (see [Configuration](./configuration.md)).
- `@HiltWorker` / Hilt integration on top of `WorkerFactory` is covered by the `di-hilt` category of the `android-architecture` skill; only mentioned here.
- Package: `androidx.work`.

## Related

- [Configuration / Configuration.Provider](./configuration.md)
- [Worker / ListenableWorker / Result](./worker.md)
