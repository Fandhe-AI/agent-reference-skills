# Bound service

A service that offers a client-server interface via `bindService()`, allowing components (activities, other services) to send requests, receive responses, and perform IPC. A purely bound service runs only while at least one client is bound.

## Signature / Usage

```kotlin
// Service: returns a Binder subclass for same-process (local) binding
class LocalService : Service() {
    private val binder = LocalBinder()
    val randomNumber: Int get() = (0..99).random()

    inner class LocalBinder : Binder() {
        fun getService(): LocalService = this@LocalService
    }

    override fun onBind(intent: Intent): IBinder = binder
}

// Client
class BindingActivity : Activity() {
    private lateinit var mService: LocalService
    private var mBound = false

    private val connection = object : ServiceConnection {
        override fun onServiceConnected(className: ComponentName, service: IBinder) {
            val binder = service as LocalService.LocalBinder
            mService = binder.getService()
            mBound = true
        }
        override fun onServiceDisconnected(arg0: ComponentName) {
            mBound = false
        }
    }

    override fun onStart() {
        super.onStart()
        Intent(this, LocalService::class.java).also { intent ->
            bindService(intent, connection, Context.BIND_AUTO_CREATE)
        }
    }

    override fun onStop() {
        super.onStop()
        unbindService(connection)
    }
}
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `Context.bindService(intent, connection, flags)` | method | — | Asynchronously binds to a service; use an explicit `Intent`. Returns `false` if the service doesn't exist or access is denied (still call `unbindService()` in that case). |
| `Context.unbindService(connection)` | method | — | Disconnects from the service. |
| `ServiceConnection.onServiceConnected(name, binder)` | callback | — | Delivers the `IBinder` once the connection is established. |
| `ServiceConnection.onServiceDisconnected(name)` | callback | — | Called only when the connection is unexpectedly lost (service crashed/killed); not called on explicit unbind. |
| `IBinder` | interface | — | Programming interface returned from `onBind()`; defines how a client talks to the service. |
| `Binder` | class | — | Base class to subclass for same-process (local) binding; the service can return itself directly. |
| `Context.BIND_AUTO_CREATE` | flag | — | Creates the service if it isn't already running. |

## Notes

- Three binding techniques exist: extend `Binder` for same-process/local use (simplest, not inherently thread-safe), use [Messenger](./messenger.md) for cross-process IPC without manual threading, or use [AIDL](./aidl.md) for cross-process IPC requiring true multithreading.
- `onBind()` is called on the UI thread, but methods on the returned interface run on a thread pool and may be invoked concurrently by multiple clients — they must be implemented thread-safe.
- A purely bound service is destroyed when the last client unbinds. If the service was also started (`startService()`), it keeps running after all clients unbind and must be stopped explicitly with `stopSelf()`/`stopService()`.
- Bind/unbind in `onStart()`/`onStop()` (or `onCreate()`/`onDestroy()` if background access is needed) — never in `onResume()`/`onPause()`, which fire too frequently.
- The system caches a single `IBinder` per service; multiple clients receive the same instance, and objects are reference-counted across processes.

## Related

- [Service](./service.md)
- [Messenger](./messenger.md)
- [AIDL](./aidl.md)
