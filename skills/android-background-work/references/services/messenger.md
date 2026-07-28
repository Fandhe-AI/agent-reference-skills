# Messenger

A cross-process binding technique that queues all incoming requests onto a single thread inside the service, avoiding manual thread-safety work while still supporting IPC.

## Signature / Usage

```kotlin
private const val MSG_SAY_HELLO = 1

// Service
class MessengerService : Service() {
    private lateinit var mMessenger: Messenger

    internal class IncomingHandler(context: Context) : Handler(Looper.getMainLooper()) {
        override fun handleMessage(msg: Message) {
            when (msg.what) {
                MSG_SAY_HELLO -> Toast.makeText(context, "hello!", Toast.LENGTH_SHORT).show()
                else -> super.handleMessage(msg)
            }
        }
    }

    override fun onBind(intent: Intent): IBinder {
        mMessenger = Messenger(IncomingHandler(this))
        return mMessenger.binder
    }
}

// Client
private var mService: Messenger? = null
private val mConnection = object : ServiceConnection {
    override fun onServiceConnected(className: ComponentName, service: IBinder) {
        mService = Messenger(service)
    }
    override fun onServiceDisconnected(className: ComponentName) {
        mService = null
    }
}

fun sayHello() {
    val msg = Message.obtain(null, MSG_SAY_HELLO, 0, 0)
    try {
        mService?.send(msg)
    } catch (e: RemoteException) {
        // handle
    }
}
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `Messenger(handler)` | constructor | — | Wraps a `Handler` so it can be used across process boundaries. |
| `Messenger.binder` | property | — | The `IBinder` to return from `onBind()` on the service side. |
| `Messenger(iBinder)` | constructor | — | Wraps a client-received `IBinder` for sending messages back to the service. |
| `Messenger.send(Message)` | method | — | Sends a `Message` to the service; can throw `RemoteException`. |

## Notes

- All requests are processed one at a time on the service's handler thread — no explicit synchronization needed, but no concurrency either.
- For services that must handle simultaneous calls with real multithreading, use [AIDL](./aidl.md) instead.

## Related

- [Bound service](./bound-service.md)
- [AIDL](./aidl.md)
