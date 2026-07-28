# Service

An application component that performs long-running operations in the background without a user interface. A `Service` continues running even after the user switches to another app.

## Signature / Usage

```kotlin
class ExampleService : Service() {
    override fun onCreate() {
        // One-time setup when the service is first created.
    }

    override fun onStartCommand(intent: Intent, flags: Int, startId: Int): Int {
        // Called each time a component starts the service via startService()/startForegroundService().
        return START_STICKY
    }

    override fun onBind(intent: Intent): IBinder? {
        // Called when a component binds via bindService(). Return null if binding is not supported.
        return null
    }

    override fun onUnbind(intent: Intent): Boolean {
        // Called when all clients have unbound.
        return false
    }

    override fun onDestroy() {
        // Clean up resources before the service is destroyed.
    }
}
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `onCreate()` | callback | — | One-time initialization when the service is first created. |
| `onStartCommand(intent, flags, startId)` | callback | — | Entry point for a started service; invoked once per `startService()`/`startForegroundService()` call. Return value controls restart behavior. |
| `onBind(intent)` | callback returning `IBinder?` | — | Entry point for a bound service; return the interface clients use to communicate. Return `null` to disallow binding. |
| `onUnbind(intent)` | callback returning `Boolean` | `false` | Called when all clients have unbound. Return `true` to receive a later `onRebind()` call. |
| `onDestroy()` | callback | — | Final cleanup before the service is removed. |

## Notes

- Services run on the **main thread** by default; blocking work inside `onStartCommand()` or bound methods must be moved to a worker thread (`HandlerThread`, coroutine, etc.) to avoid ANR. See [Processes and threads](./processes-and-threads.md).
- A `Service` can be **started** (`startService()`/`startForegroundService()`), **bound** (`bindService()`), or both at once; see [startService / startForegroundService / stopSelf / stopService](./start-stop-service.md) and [Bound service](./bound-service.md).
- `IntentService` and `androidx.core.app.JobIntentService` are both deprecated; do not use either in new code. For deferrable background work use `WorkManager` (see the `workmanager` category), and for one-off foreground work, implement `Service` directly and promote it via [Foreground service](./foreground-service.md).
- Must be declared in the manifest before use; see [`<service>` manifest element](./service-manifest.md).
- `androidx.lifecycle.LifecycleService` is a lifecycle-aware `Service` base class; its full API could not be verified against a rendered doc page during this pass (reference page returned navigation-only content), so it is intentionally not documented here as its own page.

## Related

- [`<service>` manifest element](./service-manifest.md)
- [startService / startForegroundService / stopSelf / stopService](./start-stop-service.md)
- [onStartCommand() return values](./start-command-return-values.md)
- [Bound service](./bound-service.md)
- [Foreground service](./foreground-service.md)
- [Processes and threads](./processes-and-threads.md)
